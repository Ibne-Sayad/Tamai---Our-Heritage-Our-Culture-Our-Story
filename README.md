# Tamai

**Our Heritage, Our Culture, Our Story**

A bilingual public heritage frontend for Tamai, Belkuchi, Sirajganj, Bangladesh. The eight public routes preserve the established woven design, shared header/footer and English/Bangla language system. Collection spaces and sample records are explicitly marked; no people, quotations, photographs or local historical records have been invented.

## Development

Use the supported Node.js version for the installed Next.js release (this project was checked with Node.js 22).

```sh
npm install
npm run dev
npm run typecheck
npm run build
```

Open http://localhost:3000. The production build exports to `out/`. There is no `npm start` command for this static export; use a static file server to preview the output.

Next.js App Router, TypeScript, React and Tailwind CSS 4 remain the stack. No new dependencies, backend, database, authentication, upload service or paid APIs were added.

## Public routes

| Route | Content |
| --- | --- |
| / | Village introduction and links into the archive |
| /history | Research outline, source labels and history collection spaces |
| /culture | Cultural themes, life events, food, recreation and a Then & Now framework |
| /lungi-textile | Textile identity, general process, pattern studies and collection spaces |
| /institutions | Institution categories, reusable example record and disabled directory preview |
| /people-stories | Six story categories, reusable story record, oral history and generations framework |
| /gallery | Seven collection placeholders, working category filters and native dialog previews |
| /contribute | Eight contribution types, frontend form, future account workflow and moderation guidance |

All header/footer links point to the public routes. Existing contribution CTAs now open `/contribute`. The homepage retains its original informational disclosure and anchor for older links. A bilingual custom 404 provides a route back home.

## Language and design

`src/components/language-provider.tsx` remains the only language system. Dictionaries are composed in `src/content/translations.ts`; the new public-page content is in `src/content/public.ts`. Language selection persists in local storage when available and updates the document language without changing routes.

Initial HTML and metadata are English. Bangla is selected client-side; separate indexable Bangla URLs are not implemented. English uses Cormorant Garamond and Inter; Bangla uses Hind Siliguri. The free Google Fonts are downloaded by Next.js at build time and self-hosted for visitors. Building needs access to those font files.

The new styles in `src/app/public-pages.css` are scoped to the public-page components. Existing page designs remain intact. Woven graphics, striped borders, archive frames and photo placeholders use CSS; the social graphic is branded artwork, not photography.

## Reusable archive components

- `PublicShell`, `PublicHero`, `PublicCTA`, `ArchiveVisual` and `ArchiveStatusBadge` in `public-shared.tsx`.
- `StoryRecord` in `story-record.tsx` accepts a typed name, profile image, relationship, title, summary, full story, period, role, source type, contributor, review status and supporting images/documents (attachments have a URL, title and optional image preview).
- `src/types/archive.ts` defines story/gallery records and stable category/status identifiers. Real gallery items can supply an image with alt text, caption, approximate year, location, source, contributor, status and optional related story.
- Gallery placeholders never imply that real archive items exist. The displayed count describes collection spaces. Story search and filters are explicitly disabled pending reviewed content.
- Existing institution and history models retain their established source/review semantics.

The modal uses native `dialog`, supports Escape, keeps Tab within available controls and returns focus to its opener. Images should be added only with appropriate permission, descriptions and source context.

## Contribution behavior

The form is a frontend preview. Native validation checks required fields and email format. Upload areas are explanatory placeholders, with no file input or transfer. Submission only shows the exact bilingual message that information has not been sent or saved.

`ContributionDraftProvider` keeps form entries in React memory across client-side navigation and language changes. It does not write personal data to local/session storage, submit requests or save drafts. Reloading or closing the tab clears entries; the form explains this before entry. The permission checkbox records intended permission only; there are no attachments in this phase.

Account creation, draft storage, moderation, publication and review tracking are explanatory future workflows. No contribution automatically becomes public.

## Deployment URL and public metadata

Copy `.env.example` to `.env.local` for local configuration, or set this environment variable in the deployment settings before building:

```text
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Replace that local value with the real HTTPS Vercel origin after it is assigned. Do not include a path, query, credentials or fragment. Rebuild after changing it: static export resolves metadata at build time.

`src/lib/site.ts` generates each page's title, description, canonical URL, Open Graph and Twitter metadata. It uses the configured origin, with the explicit safe fallback `http://localhost:3000`. `robots.txt` and the eight-route `sitemap.xml` use the same value. The sitemap omits fabricated modification dates. Set the production origin before public indexing or social sharing.

`public/social-preview.svg` is the editable branded source; `public/social-preview.png` is the 1200 × 630 sharing image. No stock or generated historical photography is used.

The site remains a static frontend suitable for the requested free hosting approach. No deployment was performed in this pass. Import the repository into Vercel and use the project's Next.js build; the export output is `out/`. GitHub can host the repository without additional services. Future Supabase integration is not required to run this frontend.

## Validation

- Production build and independent TypeScript check.
- All eight public routes in English and Bangla at 320, 390, 768, 1440 and 1920 pixels.
- Desktop/mobile navigation, active states, language persistence, page titles, canonical and sharing metadata.
- Every rendered internal link and anchor target.
- Gallery filtering, modal open/close, keyboard containment and focus restoration.
- Form required/email validation, exact bilingual no-save message, no POST requests, in-memory retention and no personal-data browser storage.
- Custom 404, robots, sitemap, social image, and keyboard skip link.
- Visual review of desktop and Bangla mobile layouts.

Browser QA scripts and screenshots are local development artifacts in the ignored `.qa/` directory.

## Next phase, after frontend review

Gather real community material with sources and permissions. Then design the Supabase data model, authentication, storage policies and moderation workflow within the requested free-service constraints. Backend implementation has not begun.
