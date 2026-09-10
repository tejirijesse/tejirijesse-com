import { defineConfig } from 'astro/config';
import contentDiscipline from './scripts/content-discipline.mjs';
import rehypeCredits from './scripts/rehype-credits.mjs';

/*
 * Clause 14. Static output, no adapter, no integrations that ship runtime
 * JavaScript. The only integration here is the build-time content check,
 * which adds nothing to the page and refuses the build when clause 05 or
 * clause 15 is violated.
 *
 * The deliverable is Vercel on the apex domain, per clause 14. GitHub Pages
 * serves a preview of the same commit from a subpath, which needs `base` set
 * or every asset resolves against the wrong root. That is a property of the
 * preview host, not of the site, so it comes from the environment rather than
 * being written into the config — a hard-coded base would silently break the
 * apex deployment.
 */
const previewBase = process.env.PAGES_BASE;

export default defineConfig({
  site: previewBase
    ? `https://tejirijesse.github.io${previewBase}`
    : 'https://tejirijesse.com',
  base: previewBase,
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [contentDiscipline()],
  markdown: { rehypePlugins: [rehypeCredits] },
  image: { formats: ['avif', 'webp'] },
  devToolbar: { enabled: false },
  prefetch: false,
});
