#!/usr/bin/env node
/**
 * Clause 15: "A build-time check fails the build if any of the fourteen
 * headings is missing, or if any image in the body lacks both alt text and a
 * caption."
 *
 * It also reports, without failing, everything clause 17 still needs before
 * the site can be submitted: unwritten passages, pending assets, placeholder
 * copy. Those are not build errors — the site is meant to be readable while
 * it is being written, and a hole that renders is more honest than one that
 * blocks. They are freeze blockers, which is a different thing.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

const ROOT = dirname(new URL(import.meta.url).pathname).replace(/\/scripts$/, '');
const CONTENT = join(ROOT, 'src', 'content');

/** Clause 05, in fixed order. All fourteen, every time. */
export const SECTIONS = [
  'Context',
  'Problem',
  'People',
  'Evidence',
  'What I believed',
  'System map',
  'The design question',
  'Experiments',
  'Where it broke',
  'What changed',
  'Outcome',
  'Consequences',
  'Credits',
  'What I still cannot answer',
];

const strip = (s) => s.replace(/\*\*/g, '').trim();

export function checkContent() {
  const errors = [];
  const blockers = [];

  const projects = readdirSync(CONTENT, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  if (projects.length === 0) errors.push('No projects found in src/content.');

  for (const slug of projects) {
    const file = join(CONTENT, slug, 'index.md');
    if (!existsSync(file)) {
      errors.push(`${slug}: no index.md`);
      continue;
    }
    const raw = readFileSync(file, 'utf8');
    const fmEnd = raw.indexOf('\n---', 4);
    const frontmatter = raw.slice(0, fmEnd + 4);
    const body = raw.slice(fmEnd + 4);

    // --- Clause 05: all fourteen headings, in order. ---------------------
    const headings = [...body.matchAll(/^##\s+(.+)$/gm)].map((m) => strip(m[1]));

    for (const section of SECTIONS) {
      if (!headings.includes(section)) {
        errors.push(`${slug}: missing section "${section}" (clause 05)`);
      }
    }
    const known = headings.filter((h) => SECTIONS.includes(h));
    const expected = SECTIONS.filter((s) => known.includes(s));
    if (known.join('|') !== expected.join('|')) {
      errors.push(`${slug}: the fourteen sections are out of order (clause 05)`);
    }
    for (const heading of headings) {
      if (!SECTIONS.includes(heading)) {
        errors.push(`${slug}: unexpected section "${heading}" (clause 05 fixes the set)`);
      }
    }

    // --- Rule 05.3: every body image carries alt text and a caption. -----
    // Markdown images in the body are only used for figures that carry both;
    // anything without is a violation rather than a style choice.
    for (const m of body.matchAll(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g)) {
      const [, alt, src, caption] = m;
      if (!alt.trim()) errors.push(`${slug}: image ${src} has no alt text (clause 12)`);
      if (!caption?.trim()) errors.push(`${slug}: image ${src} has no caption (rule 05.3)`);
    }

    // --- Clause 16: index photograph must actually be on disk. -----------
    const indexImage = frontmatter.match(/^indexImage:\s*(.+)$/m)?.[1]?.trim();
    if (indexImage) {
      const path = join(CONTENT, slug, indexImage.replace(/^\.\//, ''));
      if (!existsSync(path)) {
        errors.push(`${slug}: indexImage ${indexImage} does not exist (clause 16.1)`);
      } else if (readFileSync(path).includes(Buffer.from('ASSET PENDING'))) {
        blockers.push(`${slug}: index photograph is still the placeholder (clause 16.1)`);
      }
    }

    // --- Clause 17 freeze blockers, reported not thrown. -----------------
    const passages = (body.match(/TO WRITE/g) ?? []).length;
    const assets = (body.match(/ASSET PENDING/g) ?? []).length;
    if (passages) blockers.push(`${slug}: ${passages} unwritten passage${passages > 1 ? 's' : ''}`);
    if (assets) blockers.push(`${slug}: ${assets} pending asset set${assets > 1 ? 's' : ''}`);
    if (/PENDING —/.test(frontmatter)) blockers.push(`${slug}: placeholder text in frontmatter`);
    if (/\[to (supply|confirm|write)\]/i.test(frontmatter)) {
      blockers.push(`${slug}: unresolved [to supply] fields in frontmatter`);
    }

    // --- Clause 09: no image in the body of a case study may be a bare
    //     <img>, because that path skips astro:assets and the size budget.
    if (/<img\b/.test(body)) {
      errors.push(`${slug}: raw <img> in body — use FigureBleed or FigureInline (clause 13)`);
    }
  }

  // --- Owner-supplied copy ----------------------------------------------
  const copy = readFileSync(join(ROOT, 'src', 'copy.ts'), 'utf8');
  const pendingCopy = (copy.match(/'PENDING —/g) ?? []).length;
  if (pendingCopy) blockers.push(`copy.ts: ${pendingCopy} owner-supplied string${pendingCopy > 1 ? 's' : ''} not yet written`);

  if (!existsSync(join(ROOT, 'public', 'cv', 'oghenetejiri-jesse-cv.pdf'))) {
    blockers.push('public/cv/oghenetejiri-jesse-cv.pdf missing (clause 07)');
  }

  return { errors, blockers, projects };
}

// Run directly: report and exit non-zero on a clause 05 or 15 violation.
if (process.argv[1] && process.argv[1].endsWith('check-content.mjs')) {
  const { errors, blockers, projects } = checkContent();

  console.log(`\n${projects.length} projects: ${projects.join(', ')}\n`);

  if (errors.length) {
    console.error('BUILD FAILS — clause 05 / 15:\n');
    for (const e of errors) console.error(`  ✗ ${e}`);
    console.error('');
  } else {
    console.log('Clause 05 and 15: all fourteen sections present and in order,');
    console.log('every body image captioned, every index photograph on disk.\n');
  }

  if (blockers.length) {
    console.log(`Clause 17 freeze blockers (${blockers.length}) — the site builds, but`);
    console.log('it cannot be submitted until these are cleared:\n');
    for (const b of blockers) console.log(`  · ${b}`);
    console.log('');
  }

  process.exit(errors.length ? 1 : 0);
}
