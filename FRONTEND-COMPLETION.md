# Public frontend completion

Created: /people-stories, /gallery and /contribute, plus a bilingual custom 404. The five existing pages retain their approved design.

Completed: bilingual navigation and active states, reusable story/archive components, gallery category filtering and keyboard-accessible previews, an honest frontend contribution form with in-memory retention, planned account/review guidance, configurable canonical and social metadata, robots.txt, sitemap.xml and branded social artwork.

Shared components: PublicShell, PublicHero, PublicCTA, ArchiveVisual, ArchiveStatusBadge, StoryRecord and ContributionDraftProvider.

## Files added in this pass

- .env.example
- public/social-preview.svg
- public/social-preview.png
- src/app/people-stories/page.tsx
- src/app/gallery/page.tsx
- src/app/contribute/page.tsx
- src/app/not-found.tsx
- src/app/robots.ts
- src/app/sitemap.ts
- src/app/public-pages.css
- src/components/public-shared.tsx
- src/components/story-record.tsx
- src/components/people-stories-page.tsx
- src/components/gallery-page.tsx
- src/components/contribute-page.tsx
- src/components/contribution-draft-provider.tsx
- src/components/not-found-page.tsx
- src/content/public.ts
- src/types/archive.ts
- src/lib/routes.ts
- src/lib/site.ts
- FRONTEND-COMPLETION.md

## Existing files updated in this pass

- README.md
- src/app/layout.tsx
- src/app/history/page.tsx
- src/app/culture/page.tsx
- src/app/lungi-textile/page.tsx
- src/app/institutions/page.tsx
- src/components/home.tsx
- src/components/site-shell.tsx
- src/components/history-page.tsx
- src/components/culture-page.tsx
- src/components/textile-heritage.tsx
- src/components/institutions-page.tsx
- src/content/translations.ts

Earlier uncommitted page work was preserved. Local QA scripts and screenshots live in the ignored .qa directory.

## Validation

Production build, independent TypeScript check and whitespace checks passed. All eight routes were tested in English and Bangla at 320, 390, 768, 1440 and 1920 pixels (80 route/language/layout combinations).

Browser checks covered desktop/mobile navigation, active states, language persistence, every rendered internal link/anchor, page metadata, gallery filters, modal keyboard containment and focus restoration, required/email form validation, exact bilingual no-save messages, retained entries across navigation, no submission POST requests, no personal data in local/session storage, custom 404 and keyboard skip access.

Robots, sitemap and the branded social image returned successfully and are present in the static export. Configurable metadata origin, local fallback and invalid URL handling were checked independently. Desktop and Bangla mobile screenshots were visually reviewed. No fake people, quotations, local facts or historical images were introduced.

## Known limitations

- Collection content remains explicitly marked placeholders; story search is disabled pending reviewed records.
- Submission, uploads and accounts are not operational. Form entries exist only in memory and clear on reload or tab closure, as explained on the form.
- Set NEXT_PUBLIC_SITE_URL to the real Vercel origin and rebuild before public launch. It currently falls back to http://localhost:3000.
- Initial HTML/metadata are English; Bangla is selected client-side.
- This pass did not deploy the site or implement a backend.

## Recommended next phase

After frontend review, gather sourced community content and design the Supabase data model, authentication, storage permissions and moderation workflow. No backend implementation has begun.
