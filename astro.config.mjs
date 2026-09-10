import { defineConfig } from 'astro/config';
import contentDiscipline from './scripts/content-discipline.mjs';
import rehypeCredits from './scripts/rehype-credits.mjs';

// Clause 14. Static output, no adapter, no integrations that ship runtime
// JavaScript. The only integration here is the build-time content check,
// which adds nothing to the page and refuses the build when clause 05 or
// clause 15 is violated.
export default defineConfig({
  site: 'https://tejirijesse.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  integrations: [contentDiscipline()],
  markdown: { rehypePlugins: [rehypeCredits] },
  image: { formats: ['avif', 'webp'] },
  devToolbar: { enabled: false },
  prefetch: false,
});
