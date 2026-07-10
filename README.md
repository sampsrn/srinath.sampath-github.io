# srinath.sampath-github.io

Personal portfolio website for **Srinath Sampath** — a static, data-driven site built with **Astro v4** + **Tailwind v3**, hosted on **Vercel** at [`srinath-sampath.com`](https://srinath-sampath.com).

- **Live (production):** https://srinath-sampath.com *(once the domain is attached — see [Vercel](#vercel-hosting--manual-steps))*
- **Vercel preview:** https://srinath-sampath.vercel.app
- **Spec:** [`spec_files/PRD.md`](spec_files/PRD.md) · **Agent guide:** [`AGENTS.md`](AGENTS.md)

---

## Quick start (run locally)

Requires **Node 18+** and npm.

```bash
npm install      # install dependencies (first time only)
npm run dev      # local preview at http://localhost:4321
npm run build    # static output to ./dist  (run to verify changes)
npm run preview  # serve the production build locally
```

Open **http://localhost:4321** in your browser. The dev server hot-reloads as you edit.

> **Note:** Tailwind theme changes (`tailwind.config.mjs`) require restarting `npm run dev` to take effect.

---

## Managing content

**All editable content lives in data/config files — you never need to touch markup or write code.** Edit a file, save, and the page updates.

| What you want to change | Edit this file |
|---|---|
| Name, tagline, bio, location, profile photo, links | [`src/config.ts`](src/config.ts) |
| Work experience | [`src/data/experience.json`](src/data/experience.json) |
| Tech interests | [`src/data/interests.json`](src/data/interests.json) |
| Hobbies ("Beyond Work") | [`src/data/hobbies.json`](src/data/hobbies.json) |
| LinkedIn posts (curated) | [`src/data/linkedin.ts`](src/data/linkedin.ts) |
| Colors / fonts | [`tailwind.config.mjs`](tailwind.config.mjs) |
| Canonical site URL | [`astro.config.mjs`](astro.config.mjs) (`site`) |

### Data shapes (match exactly)

**`experience.json`** — array of:
```json
{ "role": "...", "company": "...", "period": "2022 – Present", "summary": "...", "tags": ["AWS", "Python"] }
```

**`interests.json` / `hobbies.json`** — array of:
```json
{ "name": "...", "note": "..." }
```

**`linkedin.ts`** — array of `Post` (keep **newest first**):
```ts
{ type: "mine" | "shared", author: "Name", date: "Jun 2026", blurb: "Why it matters.", url: "https://www.linkedin.com/..." }
```
- `type: "mine"` = your own post · `"shared"` = someone else's (rendered with distinct badges).
- Add an optional `embed` (a LinkedIn iframe URL) to render the post inline instead of a link card.

### Change the profile photo

The site ships with an "SS" monogram placeholder at [`public/me.svg`](public/me.svg). To use a real photo:

1. Drop your image in `public/` (e.g. `public/me.jpg`).
2. In [`src/config.ts`](src/config.ts), set `profile.photo` to its filename: `photo: 'me.jpg'`.

That's the only change needed — image paths go through the `asset()` helper so they stay correct at the domain root.

### Update links

In `src/config.ts`, `profile.links` has `linkedin`, `github`, and `email`. **Set any value to an empty string `''` to hide that link.** The LinkedIn URL currently uses a placeholder (`https://www.linkedin.com/in/srinath-sampath`) — update it to your real profile URL.

---

## Deploying changes

The repo is connected to Vercel's Git integration, so deploys are automatic:

- **Push to a branch / open a PR** → Vercel builds a **preview deployment** automatically (a unique `*.vercel.app` URL).
- **Push/merge to `main`** → Vercel builds a **production deployment** and serves it at the custom domain.

Typical flow:
```bash
git checkout -b my-content-update
# ...edit files in src/config.ts or src/data/*...
npm run build                 # verify zero errors locally
git add -A && git commit -m "Update content"
git push -u origin my-content-update
# open a PR; review the Vercel preview; merge to main to go live
```

You can also deploy manually with the Vercel CLI (already authenticated on this machine):
```bash
vercel deploy          # preview deployment
vercel deploy --prod   # production deployment
```

---

## Vercel hosting & manual steps

The Vercel project (`srinath26/srinath-sampath`) is **created and linked**, the GitHub repo is **connected**, and Astro is auto-detected (build `astro build`, output `dist`). Two one-time steps remain to go fully live at the custom domain:

### Manual step 1 — First production deploy
```bash
cd C:\DEV\Claude\Projects\srinath_website
vercel deploy --prod
```
This publishes the current `main`/local state to production. (After this, pushes to `main` deploy automatically.)

### Manual step 2 — Attach the custom domain
The domain `srinath-sampath.com` is already registered in the Vercel account, so attaching it is quick:
```bash
vercel domains add srinath-sampath.com srinath-sampath
vercel domains add www.srinath-sampath.com srinath-sampath
```
- The apex (`srinath-sampath.com`) serves the site; `www` redirects to the apex.
- Because the domain is Vercel-managed, **DNS records and HTTPS certificates provision automatically** — no manual `A`/`CNAME` edits.

> Prefer the dashboard? The same two steps are available at **vercel.com → Project `srinath-sampath` → Deployments / Settings → Domains**.

### Notes
- **No `public/CNAME` file** and **no GitHub Actions workflow** are needed — those are GitHub Pages mechanisms; this site uses Vercel.
- `.vercel/` and `.env.local` (project link + OIDC token) are git-ignored and must **not** be committed.
- Authentication: the Vercel CLI is signed in as `sampsrn-6665`. If a token expires, run `vercel login` to re-authenticate.

---

## Project structure

```
src/
  config.ts            # THE edit point — name, photo, tagline, bio, links
  data/
    experience.json    # work history
    interests.json     # tech interests
    hobbies.json       # "Beyond Work"
    linkedin.ts        # curated LinkedIn posts
  layouts/Base.astro   # html shell, self-hosted fonts, global styles
  pages/index.astro    # assembles all sections (layout only — no content)
public/me.svg          # profile photo (monogram placeholder)
astro.config.mjs       # site (canonical URL)
tailwind.config.mjs    # navy-blue theme + fonts
```

## Tech notes
- **Static, zero client JS** by default (Astro). Keep it that way unless a feature truly needs it.
- **Self-hosted fonts** (Fraunces / Inter / JetBrains Mono via `@fontsource-variable/*`) — no external Google Fonts request.
- **Accessibility:** visible keyboard focus, image alt text, `prefers-reduced-motion`, responsive down to 375px.
- **No LinkedIn API/scraping** — the LinkedIn section is manual curation only.

See [`AGENTS.md`](AGENTS.md) for the full contributor/agent guide and [`spec_files/PRD.md`](spec_files/PRD.md) for the product spec.
