# Supabase setup — Phase 2

The repository contains the integration and migration. No hosted Supabase project has been created, modified or deployed by this implementation.

## 1. Configuration after review

Create or select a Supabase Free project when you are ready. Copy `.env.example` to the ignored `.env.local` and fill in:

```text
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Use the project's actual URL and public publishable key. Never use a secret or service-role key. The build rejects recognizable secret/service-role keys before bundling. No service-role key is used anywhere in this app.

Set the site URL to the real Vercel origin before deployment. Restart the dev server or rebuild after changing public environment variables. Missing configuration intentionally shows a bilingual setup state, without making fake requests or claiming anything was saved.

## 2. Apply the schema

Review `migrations/202609140001_community.sql`. Run the full migration once in the Supabase SQL Editor against a new project, or apply it with the Supabase CLI migration workflow. It is transactional and is not intended to be rerun as a collection of individual statements.

Then apply `migrations/202609140002_profile_details.sql` once. It adds profession and current address, updates signup/profile saving, and keeps current addresses out of the public directory. Existing projects that already applied the first migration only need this second migration.

It creates:

| Table | Purpose |
| --- | --- |
| profiles | Account profile, explicit directory opt-in and controlled role |
| paras | Administrator-supplied bilingual para options; starts empty |
| contributions | Owner drafts and the submission/review/publication lifecycle |
| contribution_media | Registered private image/PDF references |
| review_events | Append-only review decisions and reviewer identity |

An Auth trigger creates a profile on signup. Role is always `user`, irrespective of signup metadata. Profiles collect no email, phone or exact address; Auth manages email separately.

Register a new user after migration. Existing Auth users from an older project are not automatically backfilled by this initial migration; review and backfill them separately before enabling this app.

## 3. Authentication settings

Enable email/password signup and email confirmation in Supabase Authentication. Set the Auth Site URL to the local origin for development, then to the real production origin when ready.

Allow the exact callback destinations used by the app, including:

- `http://localhost:3000/auth/callback`
- `http://localhost:3000/auth/callback?next=/auth/reset-password`
- `http://localhost:3000/auth/confirm`
- Equivalent paths on `http://127.0.0.1:3000` if you use that local hostname
- Equivalent paths on the real production origin after it is assigned

The cookie-based clients, token refresh proxy and verified server guards follow the [Supabase SSR guidance](https://supabase.com/docs/guides/auth/server-side/creating-a-client?framework=nextjs). Protected pages use a fresh `getUser()` check, not an unverified session payload. Staff role is read from the database, not user-editable Auth metadata.

### Email templates

Use these links in the relevant Supabase email templates for the server confirmation route:

Confirm signup:

```html
<a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&amp;type=email">Confirm your email / ইমেইল যাচাই করুন</a>
```

Reset password:

```html
<a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&amp;type=recovery">Reset password / পাসওয়ার্ড পুনর্নির্ধারণ করুন</a>
```

This follows Supabase's [server-side email template approach](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs). The separate `/auth/callback` route also supports the PKCE code exchange. Invalid/expired links return to a bilingual sign-in message. Redirect destinations are restricted to known account routes.

Supabase's default mail sender is restricted to project-team addresses and has restrictive sending limits. Public registration therefore needs a suitable sender configuration within your free-service requirement; no SMTP provider or paid service has been installed or configured here. Review [Supabase's SMTP documentation](https://supabase.com/docs/guides/auth/auth-smtp) before opening registration to the community.

## 4. Assign the initial administrator

First register and verify an account normally. In the SQL Editor, identify its UUID under Authentication > Users. Then run, replacing the placeholder:

```sql
update public.profiles
set role = 'admin', updated_at = now()
where id = 'REPLACE_WITH_VERIFIED_USER_UUID';
```

Use `moderator` for a reviewer account. Role assignment is intentionally unavailable through the browser. The normal API cannot update roles, including through crafted profile payloads.

The `paras` table starts empty. Add only real, confirmed para labels through the SQL Editor/Table Editor with `name_en` and `name_bn`. Leave unknown values as Other / Not listed. No para or school names have been invented. A browser admin interface for para management is reserved for later.

## 5. Storage

The migration creates three **private** buckets:

| Bucket | File types | Maximum original upload |
| --- | --- | --- |
| avatars | JPEG, PNG, WebP | 2 MiB |
| contribution-images | JPEG, PNG, WebP | 5 MiB |
| contribution-documents | PDF | 10 MiB |

Images are resized in the browser to a maximum dimension of 480px for avatars or 1600px for contributions, then encoded as WebP where supported. This removes original image metadata. Client checks validate file signatures and size; bucket MIME/size limits and storage RLS also apply. This is not a malware-scanning service.

Paths are owner-specific: `user-id/random-id.webp` for avatars and `user-id/contribution-id/random-id.ext` for evidence. A contribution may register up to seven attachments. New UUID paths avoid overwriting reviewed files.

Owners can remove unfinished uploads. Contribution files become immutable to the owner after submission until changes are requested. Moderators can read submitted evidence but cannot silently overwrite it. Public access is allowed only for an opted-in profile's current avatar or a registered attachment of a published contribution. See [Supabase Storage access control](https://supabase.com/docs/guides/storage/security/access-control).

The UI uses 60-second signed URLs, refreshed while previews are mounted. Opting out removes new public access immediately, but an already issued signed link may remain usable until it expires. Replaced saved avatars are removed where the storage operation succeeds. Failed/cancelled uploads can leave private orphan objects; inspect unused objects in the Storage dashboard periodically. No automated paid cleanup service is used.

## 6. Authorization and privacy model

RLS is enabled on every application table. All direct API mutation privileges are revoked on application tables. Authenticated changes go through narrowly scoped functions with fixed search paths and explicit identity/state checks:

- `save_profile`: edits only the caller's allowed profile fields; ignores role/owner changes and validates avatar ownership and para IDs.
- `save_contribution`: creates owner drafts, edits draft/needs-changes entries, or submits them after required content/rights checks.
- `register_media` / `remove_media`: validate ownership, draft/editable state, storage path and attachment count.
- `review_contribution`: requires a database staff role, disallows self-review, locks the record and enforces transitions.
- `community_members`: paginated public projection restricted to `public_profile = true`; omits roles, private fields and Auth data.
- `published_contributions`: paginated published-only projection; omits user ID, reviewer notes and additional/private notes.

Authenticated users can select their own records. Staff can read profiles and submitted records needed for review, but cannot inspect other users' drafts. Anonymous users cannot select the private base tables; the public functions deliberately return only whitelisted fields. Directory filters are server-side and return 12 records plus one look-ahead row per request.

Workflow:

```text
draft → submitted → under_review → approved → published
                    ↘ needs_changes → owner edit → submitted
                    ↘ rejected
```

Submitted records may also be returned for changes or rejected. Approved records can be returned for changes/rejected before publication. Rejection and change requests require notes. Every staff decision creates an immutable review event. Published content is shown only on `/archive`; existing heritage pages are not automatically modified. Community-authored text remains in its original language.

The archive currently presents published text and source context. Media records and public storage policies are ready for later gallery integration.

## 7. Local run and Vercel configuration

```sh
npm install
npm run dev
npm run test:security
npm run test:guards
npm run typecheck
npm run build
npm start
```

Do not use the old `out/` export: authentication callbacks and protected pages now require Next.js server rendering. On Vercel, use the Next.js preset and remove any prior output-directory override pointing to `out`. Set the three environment variables and rebuild only after project/setup review. There are no paid APIs, realtime subscriptions or required service-role secrets.

## 8. Validation and remaining live checks

Automated local tests execute the migration in an embedded PostgreSQL engine, with minimal Auth/Storage schema stubs. They exercise role escalation, owner isolation, public opt-in/out, draft privacy, review transitions, attachment rights, file-access policies and published-field projections. Separate mocked server-helper tests check guest/user/staff guards and redirect safety. These tests do not simulate Supabase email delivery, JWT infrastructure or real file transfers.

Browser checks cover all public/new routes without credentials, English/Bangla, four widths, setup states, privacy defaults, registration field behavior, account navigation, and image/file validation. Production build and TypeScript checks pass.

After configuring a test project, manually verify:

1. Signup and confirmation email, duplicate email handling, sign-in, sign-out and session refresh.
2. Password reset from its email, including expired links.
3. Edit profile and avatar; opt in, check a second signed-out browser, then opt out.
4. Two normal users cannot read or modify one another's private profiles/drafts.
5. Save draft, attach an image/PDF, submit, and inspect the status in the dashboard.
6. A normal user cannot enter /admin or call review functions.
7. A separate moderator requests changes, reviews a resubmission, approves and publishes.
8. Anonymous archive access reveals only published content and public fields.

No production project has been configured, no migration applied to a hosted database, and no deployment performed.
