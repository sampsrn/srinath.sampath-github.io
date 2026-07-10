// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Served from the custom domain at the root — no `base`.
// `site` is the canonical URL used for sitemap/meta.
export default defineConfig({
  site: 'https://srinath-sampath.com',
  integrations: [tailwind()],
});
