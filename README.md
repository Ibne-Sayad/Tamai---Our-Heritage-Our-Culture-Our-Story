# Tamai

**Our Heritage, Our Culture, Our Story**

A bilingual community heritage homepage for Tamai, Belkuchi, Sirajganj, Bangladesh. It introduces the village, textile heritage, archive categories, institutions, community contributions and a future photo archive. All images are clearly identified CSS illustrations or placeholders; no historical records or institution names have been invented.

## Stack

Next.js App Router, TypeScript, React and Tailwind CSS 4. Static export, no backend, accounts, database, paid dependencies or required API keys.

## Local development

Use Node.js 22 LTS or newer supported LTS and npm.

```sh
npm install
npm run dev
```

Open http://localhost:3000. Validate with `npm run typecheck` and `npm run build`. The production static site is generated in `out/`. `npm start` is not used for static exports; preview `out/` using any static file server.

## Structure

- `src/app/`: homepage entry, root metadata, favicon and global design tokens/styles.
- `src/components/`: homepage sections, shared icons and language context.
- `src/content/translations.ts`: typed English/Bangla homepage content. Add matching keys in both dictionaries when extending content.

The EN / বাংলা switch updates all homepage copy and the document language, and remembers the selection in local storage when available. Initial HTML is English; Bangla is selected client-side. Bengali uses installed Bengali-capable system fonts (`Nirmala UI` / `Vrinda` with system fallback). Future language-specific routes can provide localized metadata and indexed Bengali pages.

Navigation uses homepage section anchors. Unpopulated collections and institution cards explicitly identify their pending status. The contribution button leads to an expandable information placeholder; no submissions are accepted yet.

## Free deployment

Import this repository into Vercel using its free Hobby plan for this non-commercial community project. Choose the Next.js preset, build command `npm run build`, and static output directory `out`. No environment variables or Supabase connection are needed. This implementation requires no paid services. Deployment is a separate step and has not been performed.

## Future roadmap — not implemented

- Verified history, sourced community stories and real photographs with permission and attribution.
- Dedicated bilingual pages and localized SEO.
- Supabase Free for database, community login and image storage.
- Moderation and review before publishing community submissions.
- Image uploads, institution contributions and suggested corrections.
- A self-hosted Bengali font if consistent cross-device typography is needed.

Keep future services within free-tier limits. Review current hosting/service eligibility and quotas before launch; no backend work is included in this foundation.
