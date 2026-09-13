# Tamai

**Our Heritage, Our Culture, Our Story**

A bilingual heritage website for Tamai, Belkuchi, Sirajganj, Bangladesh. Public frontend V1 is complete. Phase 2 adds Supabase authentication, opt-in community profiles, contributions, private uploads and moderation while retaining the existing public design.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. Missing Supabase configuration shows a clear setup state; public heritage pages remain available.

```sh
npm run test:security
npm run test:guards
npm run typecheck
npm run build
npm start
```

The app now uses normal Next.js server output. Static export was removed for cookie-based auth, callbacks and protected pages. Do not serve the old `out/` directory.

## Supabase setup

Copy `.env.example` to `.env.local`, then set the real project values:

```text
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

No credentials are supplied or committed. Only a public anon/publishable key belongs in this variable; no service-role key is required.

After reviewing this phase:

1. Create/select a Supabase Free project.
2. Apply `supabase/migrations/202609140001_community.sql` once.
3. Enable email/password authentication and confirmation; configure Site URL, callback allowlist and confirmation/reset email templates.
4. Register a verified account and assign its admin role in the SQL Editor.
5. Add genuine bilingual para options if available; the list starts empty.
6. Verify the three private Storage buckets and their MIME/size limits.
7. Test with separate normal and moderator accounts before launch.

The [Supabase setup guide](supabase/README.md) gives the exact email templates, role SQL, RLS behavior, storage limits, testing steps and outstanding live checks. Supabase's built-in email sender is restricted; see the guide before inviting public users. No production configuration or deployment has been performed.

For Vercel, retain the Next.js preset and remove the old `out` output override. Set the environment variables and real site origin before rebuilding. The implementation adds no paid service or API.

## Routes

Public heritage routes remain: `/`, `/history`, `/culture`, `/lungi-textile`, `/institutions`, `/people-stories`, `/gallery`, `/contribute`.

New public routes: `/community` for opted-in members and `/archive` for published community records.

Account routes: `/auth/sign-up`, `/auth/sign-in`, `/auth/forgot-password`, `/auth/reset-password`, plus verification/callback handlers.

Protected routes: `/dashboard`, `/dashboard/profile`, `/dashboard/contributions/new`, `/dashboard/contributions/[id]`, `/admin`, `/admin/[id]`.

## Architecture and security

- Next.js App Router, TypeScript, React and Tailwind remain the foundation.
- Official `@supabase/supabase-js` and `@supabase/ssr` clients use cookies; a proxy refreshes sessions and server guards verify users and roles.
- Database mutations go through validated functions. RLS, privilege restrictions and public projections enforce ownership, privacy and review state independently of the UI.
- Directory visibility defaults off. Public responses exclude email, phone, roles, private notes and Auth records.
- Drafts save to the database when configured. Submitted entries are locked until changes are requested. No contribution automatically becomes public.
- Images/PDFs use private owner-specific storage paths, file restrictions and short-lived signed URLs. Images are resized in the browser.
- Public heritage pages are not automatically populated by submissions. Published records appear in the separate archive, without invented translations.
- No new paid service, automatic AI generation or realtime subscription is used.

## Bilingual content and design

The existing `LanguageProvider` is still the only language system. New labels and friendly errors are in `src/content/community.ts`. The user’s language persists across navigation; community-authored text is never automatically translated.

Cormorant Garamond, Inter and Hind Siliguri remain the typography. Next.js downloads these free fonts at build time and serves them locally. Woven CSS motifs and the original palette remain intact. The smooth-scroll navigation fix and body-scoped extension hydration compatibility are retained.

## Tests and limitations

`npm run test:security` executes the migration and security scenarios in embedded PostgreSQL with minimal Auth/Storage stubs. `npm run test:guards` checks server authorization, redirect safety and key configuration. Neither substitutes for live Supabase Auth/Storage testing.

Build, TypeScript and credential-free bilingual/responsive browser checks pass. Hosted signup, email verification/reset, session refresh and real upload/download end-to-end checks await actual credentials and setup. The detailed guide lists these explicitly.

The V1 history is preserved in `FRONTEND-COMPLETION.md`. Current Phase 2 files, validation and remaining setup are listed in `PHASE2-COMPLETION.md`.
