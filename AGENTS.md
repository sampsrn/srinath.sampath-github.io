# AGENTS.md

Guidance for AI agents (Claude Code) working in this repo. Read before editing.

## What this is
Static personal portfolio site. Astro v4 + Tailwind v3, deployed to **Vercel** (Git integration) at the custom domain `srinath-sampath.com`. See `PRD.md` for full spec.

## Golden rules
1. **Content lives in data, not markup.** To change text/posts/photo, edit `src/config.ts` or `src/data/*` — never hardcode content into `.astro` files.
2. **Keep it static.** No backend, no client JS unless asked. Astro ships zero JS by default; preserve that.
3. **Use `asset()` for asset URLs.** Image/asset URLs must go through `asset()` in `src/config.ts`. The site serves at the domain root (no `base`), but `asset()` keeps paths portable.
4. **No LinkedIn API/scraping.** The LinkedIn section is manual curation only (`src/data/linkedin.ts`).
5. **Verify before done:** run `npm run build` and confirm zero errors.

## Setup
```bash
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # static output to ./dist  (run this to verify changes)
```

## Where things are
| Task | File |
|---|---|
| Name / photo / tagline / bio / links | `src/config.ts` |
| Work experience | `src/data/experience.json` |
| Tech interests | `src/data/interests.json` |
| Hobbies | `src/data/hobbies.json` |
| LinkedIn posts (curated) | `src/data/linkedin.ts` |
| Page layout / section order | `src/pages/index.astro` |
| Fonts / global shell | `src/layouts/Base.astro` |
| Colors / fonts config | `tailwind.config.mjs` |
| Canonical site URL | `astro.config.mjs` (`site`) |
| Deploy | Vercel Git integration (auto on push to `main`); optional `vercel.json` |

## Data contracts (match exactly)
**experience.json** — `{ role, company, period, summary, tags: string[] }`
**interests.json / hobbies.json** — `{ name, note }`
**linkedin.ts `Post`** — `{ type: 'mine'|'shared', author, date, blurb, url, embed? }`
- `embed` present → render LinkedIn iframe; absent → render link card.
- Keep newest-first order.

## Common tasks

### Add a LinkedIn post
Append to `posts` in `src/data/linkedin.ts`:
```ts
{ type: "shared", author: "Name", date: "Jun 2026", blurb: "Why it matters.", url: "https://www.linkedin.com/posts/..." }
```

### Add a job
Append to `src/data/experience.json` matching the contract above.

### Add a new section
1. Add a data file under `src/data/`.
2. Import it in `src/pages/index.astro`.
3. Render with the same card/grid pattern as existing sections.
4. Keep Tailwind classes consistent with neighbors.

### Change hosting / domain
Hosting and domain are managed in the **Vercel dashboard** (Project → Settings → Domains), not in the repo. In code, only `astro.config.mjs` `site` (canonical URL) reflects the domain — keep it in sync per `PRD.md` §9. No `public/CNAME` or GitHub Actions workflow (those are GitHub Pages mechanisms).

## Constraints
- Tailwind: use existing theme tokens (`accent`, `ink`, `slate`, `paper`, fonts `display`/`sans`/`mono`). Don't introduce new color systems without reason.
- Accessibility floor: keep visible focus styles, alt text on images, mobile responsiveness, `prefers-reduced-motion`.
- Don't add dependencies unless the task requires it; justify any new package.

## Definition of done
- [ ] `npm run build` passes, zero errors.
- [ ] Content change came from a data/config file, not markup.
- [ ] Mobile layout checked (≤375px).
- [ ] Matches the relevant acceptance criteria in `PRD.md` §10.
