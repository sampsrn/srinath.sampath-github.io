# PRD: Personal Portfolio Website

**Version:** v1 (implemented) · **Status:** Shipped to branch `feat/portfolio-site` · **Last updated:** 2026-06-26

> **Implementation note (v1):** The site is built and verified locally (`npm run build` passes, zero errors; all 8 sections render; responsive at 375px). This document reflects the as-built v1. Deltas from the original spec are called out inline as **[v1]**.

## 1. Summary
Static personal website showcasing work experience, tech interests, hobbies, and a manually-curated LinkedIn feed (own posts + others' posts). Single parameterized config drives bio/photo/tagline. Hosted free on **Vercel** from the repo [`sampsrn/srinath.sampath-github.io`](https://github.com/sampsrn/srinath.sampath-github.io), served at the custom domain root URL **`https://srinath-sampath.com/`** (registered via Vercel), shared via LinkedIn.

> **Hosting note:** domain and DNS both live in Vercel, so hosting the site on Vercel keeps everything in one place — no `CNAME` file, no manual DNS records, no GitHub Actions workflow. Vercel auto-detects Astro, builds on push to `main`, and serves the custom domain with automatic HTTPS.

## 2. Goals
- Showcase experience, tech interests, hobbies.
- Display curated LinkedIn posts: own (`mine`) and others' (`shared`).
- Photo + bio editable from one config file; tagline/description swappable as focus changes.
- Free hosting on Vercel, auto-deploy on push to `main`.
- Maintainable via Claude Code with plain data-file edits (no code changes for content).

## 3. Non-Goals
- No live LinkedIn API / scraping (LinkedIn has no public feed API). Curation is manual.
- No backend, database, or auth.
- No CMS — content lives in typed data files.

## 4. Stack
| Layer | Choice |
|---|---|
| Framework | Astro v4 (static output, zero JS by default) |
| Styling | Tailwind CSS v3 — **[v1]** navy-blue accent theme (`accent` `#1e3a8a`) |
| Fonts | **[v1]** Self-hosted via `@fontsource-variable/*` (Fraunces / Inter / JetBrains Mono) — no external Google Fonts request; faster, privacy-friendly, offline-safe |
| Content | TS config + JSON/TS data files |
| Hosting | Vercel (repo `sampsrn/srinath.sampath-github.io`) + custom domain |
| CI/CD | Vercel Git integration (build + deploy on push to `main`) |
| Live URL | `https://srinath-sampath.com/` (custom domain via Vercel) |

## 5. File Structure
```
src/
  config.ts            # name, photo, tagline, description, location, links (THE edit point)
  data/
    experience.json    # [{role, company, period, summary, tags[]}]
    interests.json     # [{name, note}]
    hobbies.json       # [{name, note}]
    linkedin.ts        # Post[] — {type:'mine'|'shared', author, date, blurb, url, embed?}
  layouts/Base.astro   # html shell, self-hosted font imports, global styles
  pages/index.astro    # assembles all sections
public/me.svg          # [v1] profile photo — "SS" monogram placeholder (was me.jpg)
astro.config.mjs       # site (canonical URL); no base — served at domain root
tailwind.config.mjs    # colors (navy accent), fonts
tsconfig.json          # [v1] extends astro/tsconfigs/strict; resolveJsonModule
.claude/launch.json    # [v1] local dev/preview server configs (not deployed)
vercel.json            # optional: build/output overrides (Astro auto-detected)
```

**[v1] Photo note:** shipped as `public/me.svg` (a crisp monogram) rather than `me.jpg` — a `.jpg` file holding SVG content would not render. To use a real photo: drop the file in `/public` and set `profile.photo` in `config.ts` to its filename (the only change needed).

## 6. Data Contracts
**config.ts** — `profile`: `name, photo, tagline, description, location, links{linkedin,github,email}`. Empty link string hides that link. `asset(path)` helper prefixes `import.meta.env.BASE_URL` (resolves to `/` at the domain root) so asset paths stay portable.

**linkedin.ts** — `Post`: `type:'mine'|'shared'`, `author`, `date`, `blurb`, `url`, optional `embed` (LinkedIn iframe). If `embed` present → render iframe; else → link card. Newest first.

**experience.json** — array of `{role, company, period, summary, tags[]}`.
**interests.json / hobbies.json** — array of `{name, note}`.

## 7. Sections (index.astro, in order)
1. Hero — name, tagline, location, photo.
2. Description — `profile.description` blurb.
3. Links nav — LinkedIn / GitHub / Email (conditional).
4. Experience — timeline from `experience.json`.
5. Interests — grid from `interests.json`.
6. LinkedIn — cards from `linkedin.ts`, `mine`/`shared` badge.
7. Hobbies — grid from `hobbies.json`.
8. Footer — year + attribution.

## 8. Requirements
- **R1** All user-editable content lives in `config.ts` or `data/*`; no markup edits to change content.
- **R2** Photo path resolves at the domain root via `asset()`.
- **R3** LinkedIn entries support both link-card and iframe-embed render paths.
- **R4** Responsive to mobile; visible keyboard focus; `prefers-reduced-motion` respected.
- **R5** `npm run build` produces static `dist/` with zero errors.
- **R6** Push to `main` triggers a Vercel deploy to the custom domain.

## 9. Vercel Hosting Config (astro.config.mjs)
Served from a **custom domain** at the root with **no base path**:
```js
// astro.config.mjs
export default defineConfig({
  site: 'https://srinath-sampath.com', // canonical URL for sitemap/meta
  // no `base` — custom domain serves at root
  // ...
});
```
- Astro builds static output; Vercel auto-detects the framework (build = `astro build`, output = `dist`). No `vercel.json` required unless overriding defaults.
- `asset()` in `config.ts` prefixes `import.meta.env.BASE_URL` (resolves to `/`), so paths stay correct and portable.

### Connect repo to Vercel (one-time)
1. In the Vercel dashboard → **Add New → Project → Import Git Repository**, select `sampsrn/srinath.sampath-github.io` (authorize the GitHub app if prompted).
2. Framework preset auto-detects **Astro**; leave build/output defaults. Click **Deploy**.
3. Every push to `main` triggers a production deploy; pull requests get preview deployments automatically.

### Attach the custom domain (one-time)
Domain `srinath-sampath.com` is already registered in Vercel, so attaching it is one step:
1. Project → **Settings → Domains → Add** → `srinath-sampath.com` (and `www.srinath-sampath.com`, set to redirect to the apex).
2. Because the domain is Vercel-managed, DNS records are configured automatically — no manual `A`/`CNAME` edits. HTTPS certs provision automatically.
3. No `public/CNAME` file and no GitHub Actions workflow are needed (those are GitHub Pages mechanisms).

## 10. Acceptance Criteria
Locally verified for **v1**; deploy/domain items remain pending Vercel setup.
- [x] Build succeeds, outputs single static page.
- [x] Editing `config.ts` tagline/description updates hero + meta.
- [x] Adding a `linkedin.ts` entry renders a new card with correct badge.
- [x] `mine` vs `shared` visually distinct.
- [x] Photo displays; broken-path safe alt text present.
- [x] Mobile layout intact at 375px width.
- [ ] Push to `main` triggers a Vercel deploy live at `https://srinath-sampath.com/` within ~2 min. *(pending Vercel connection)*
- [ ] Custom domain resolves with automatic HTTPS; `www` redirects to apex. *(pending Vercel domain attach)*
- [ ] Pull requests generate Vercel preview deployments. *(pending Vercel connection)*

## 11. Future (out of scope v1)
Dark-mode toggle, projects section, RSS, view counter — all follow the same data-file pattern.
