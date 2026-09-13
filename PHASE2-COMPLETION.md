# Phase 2 completion

Implemented the Supabase community integration without configuring or deploying a hosted project.

## Database and security

The migration supplies five tables: profiles, paras, contributions, contribution_media and review_events. It includes indexes, an Auth profile trigger, table RLS, restricted grants, validated save/review/media functions and public directory/archive projections.

Profiles default to private and role user. The public directory returns only opted-in fields. Users cannot change roles or another user's records. Drafts are private; staff review excludes other users' drafts. Submission, revision, approval and publication transitions are enforced in the database, with reviewer audit events. Only published records are available through the public archive projection.

Private Storage buckets: avatars (2 MiB), contribution-images (5 MiB) and contribution-documents (10 MiB). Allowed formats are JPEG/PNG/WebP and PDF. Images are resized, paths are owner-specific and previews use short-lived signed URLs. Up to seven attachments can be registered per contribution.

## Features and routes

Authentication supports sign-up, sign-in, sign-out, email confirmation, password recovery/reset and cookie persistence. Protected server guards validate identity and staff roles. Registration stays short; school, current city/country and photo are optional profile edits afterward.

Routes added:
- /community and /archive
- /auth/sign-up, /auth/sign-in, /auth/forgot-password, /auth/reset-password
- /auth/callback and /auth/confirm
- /dashboard and /dashboard/profile
- /dashboard/contributions/new and /dashboard/contributions/[id]
- /admin and /admin/[id]

The real contribution editor replaces the simulated form. Newly saved contributions use their permanent dashboard URL. Existing public designs and bilingual architecture are retained. Community text is not automatically translated.

## Required environment variables

NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY

No service-role key is required. Recognizable secret/service-role keys in the public variable are rejected before bundling.

## Manual setup after review

1. Create/select a Supabase Free project.
2. Apply supabase/migrations/202609140001_community.sql.
3. Configure email authentication, Site URL, redirect allowlist and verification/reset templates.
4. Register/verify an account and assign admin or moderator through SQL.
5. Add only genuine bilingual para options, if known.
6. Verify private Storage buckets and policies.
7. Set environment variables, restart locally and perform live tests.
8. When deployment is later approved, use normal Next.js hosting; remove the former Vercel out/ override.

Exact steps and email-delivery limitations are in [supabase/README.md](supabase/README.md). Supabase's default sender is not a general public email service; see the linked official SMTP guidance there. No paid mail provider was added.

## Validation

Passed production build and TypeScript. Local PostgreSQL tests execute the migration and exercise privacy, ownership, role escalation rejection, status transitions, file policies, review audit and published-only projections. Server-helper tests check guest/expired/user/staff guards, redirect safety and public-key restrictions.

Browser checks covered 18 existing/new routes, English and Bangla, widths 320/390/768/1440, registration field behavior, privacy defaults, setup states, account links and image/PDF validation. The prior top-of-page navigation and extension hydration fixes passed regression checks. Desktop/Bangla mobile screenshots were reviewed.

No actual Supabase credentials were available. Real email delivery, hosted sign-in/sign-out/session refresh, live profile updates, file transfers and full multi-account moderation still need end-to-end testing after setup. Local PostgreSQL uses minimal Auth/Storage stubs, not Supabase's hosted services. No credentials were added to source, no hosted migration was run and no deployment was performed.

## Files added
- src/app/admin/[id]/page.tsx
- src/app/admin/page.tsx
- src/app/archive/page.tsx
- src/app/auth/callback/route.ts
- src/app/auth/confirm/route.ts
- src/app/auth/forgot-password/page.tsx
- src/app/auth/reset-password/page.tsx
- src/app/auth/sign-in/page.tsx
- src/app/auth/sign-up/page.tsx
- src/app/community.css
- src/app/community/page.tsx
- src/app/dashboard/contributions/[id]/page.tsx
- src/app/dashboard/contributions/new/page.tsx
- src/app/dashboard/page.tsx
- src/app/dashboard/profile/page.tsx
- src/components/account-editor-page.tsx
- src/components/account-navigation.tsx
- src/components/admin-queue.tsx
- src/components/auth-form.tsx
- src/components/auth-provider.tsx
- src/components/community-directory.tsx
- src/components/community-shared.tsx
- src/components/contribution-editor.tsx
- src/components/dashboard-page.tsx
- src/components/profile-form.tsx
- src/components/published-archive.tsx
- src/components/review-panel.tsx
- src/content/community.ts
- src/lib/auth-redirect.ts
- src/lib/supabase/client.ts
- src/lib/supabase/config.ts
- src/lib/supabase/errors.ts
- src/lib/supabase/guards.ts
- src/lib/supabase/server.ts
- src/lib/supabase/uploads.ts
- src/proxy.ts
- src/types/community.ts
- src/types/database.ts
- supabase/README.md
- supabase/migrations/202609140001_community.sql
- tests/community-guards.cjs
- tests/community-security.cjs
- PHASE2-COMPLETION.md

## Files changed or removed
- .env.example
- README.md
- next.config.ts
- package-lock.json
- package.json
- src/app/contribute/page.tsx
- src/app/layout.tsx
- src/app/robots.ts
- src/app/sitemap.ts
- src/components/contribute-page.tsx
- src/components/contribution-draft-provider.tsx (removed; obsolete preview draft provider)
- src/components/home.tsx
- src/components/site-shell.tsx
- src/content/translations.ts

Local screenshots and browser test scripts remain in ignored .qa/. Repeatable database and guard tests are version-controlled in tests/.

Stop point: Phase 2 implementation is ready for review and test-project configuration. No production project or further phase has been started.
