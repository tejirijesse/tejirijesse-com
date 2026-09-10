/**
 * Clause 16.1 photographs are owner-supplied and are the critical path. These
 * placeholders exist only so the site can be read and reviewed before the
 * field photographs arrive. Each is stamped with what belongs there and
 * carries "ASSET PENDING" in its JPEG comment, so check-content.mjs keeps
 * reporting it as a freeze blocker until it is replaced.
 *
 * Run: node scripts/make-placeholders.mjs
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const W = 3000;
const H = 1688;

const frames = [
  ['axk', 'axk-cooperative-2026-03.jpg', 'AXK', 'Cooperative, collection point or warehouse. People handling goods.', 'Field trips — Rwanda / Kenya / Uganda / Tanzania'],
  ['justly', 'justly-interview-2026-02.jpg', 'Justly', 'A law firm interview in progress.', 'Existing interview photography'],
  ['rovify', 'rovify-launch-cup-2026-04.jpg', 'Rovify', 'An athlete performing in Rovify kit.', 'RYA Launch Cup, Mpano Recreation Center, April 2026'],
  ['garejesse', 'garejesse-crew-2026.jpg', 'Gare Jesse', 'A frame from client work, or the two-man crew shooting.', 'Existing film stills'],
  ['otj', 'otj-desk-2026.jpg', 'OTJ Capital', 'Only if the sixth frame is kept. Owner to decide.', 'Clause 03 — optional sixth frame'],
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

for (const [slug, file, name, subject, source] of frames) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <pattern id="h" width="28" height="28" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="28" stroke="#ddd9d2" stroke-width="10"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="#f1efeb"/>
  <rect width="100%" height="100%" fill="url(#h)"/>
  <rect x="120" y="120" width="${W - 240}" height="${H - 240}" fill="#faf9f7" stroke="#ddd9d2" stroke-width="4"/>
  <text x="200" y="300" font-family="monospace" font-size="46" letter-spacing="10" fill="#6b6660">ASSET PENDING · CLAUSE 16.1</text>
  <text x="200" y="470" font-family="sans-serif" font-size="96" font-weight="500" fill="#111111">${esc(name)}</text>
  <text x="200" y="600" font-family="sans-serif" font-size="56" fill="#111111">${esc(subject)}</text>
  <text x="200" y="720" font-family="monospace" font-size="40" fill="#6b6660">${esc(source)}</text>
  <text x="200" y="${H - 260}" font-family="monospace" font-size="40" fill="#6b6660">Minimum 3000px long edge · sRGB · unretouched · landscape</text>
  <text x="200" y="${H - 190}" font-family="monospace" font-size="40" fill="#6b6660">Never a screenshot, never a logo, never a device mockup (rule 04.1)</text>
</svg>`;

  const dir = join('src', 'content', slug, 'media');
  mkdirSync(dir, { recursive: true });
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 82, chromaSubsampling: '4:4:4' })
    .withMetadata({ comment: 'ASSET PENDING — clause 16.1 placeholder, replace before freeze' })
    .toFile(join(dir, file));
  console.log(`  ${slug}/media/${file}`);
}
