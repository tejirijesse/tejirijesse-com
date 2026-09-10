# tejirijesse.com

Built to *tejirijesse.com — Build Specification v1.0*, issued 10 September 2026.
Clause numbers in comments throughout the source refer to that document.

Astro, static output, zero JavaScript shipped. The stack is deliberately dull:
rule 14.1 says the site must never become a project.

## Commands

```
npm run dev      # localhost:4321
npm run build    # static output to ./dist
npm run check    # content discipline, clause 05 / 15 / 17
```

## What the build refuses to do

`scripts/check-content.mjs` runs on every dev start and every build. It **fails
the build** when:

- any of the fourteen sections in clause 05 is missing, out of order, or joined
  by a fifteenth;
- a body image lacks alt text or a caption (clause 12, rule 05.3);
- an `indexImage` names a file that is not on disk (clause 16.1);
- a case study uses a raw `<img>`, which would skip `astro:assets` and the
  clause 13 size budget.

It **reports without failing** everything clause 17 still needs before the site
can be submitted: unwritten passages, pending assets, placeholder copy, the
missing CV PDF. A hole that renders is more honest than one that blocks, and
the site is meant to be readable while it is being written.

## Structure

```
src/content/[project]/index.md      one collection, clause 15 schema
src/content/[project]/media/        images, clause 14
src/components/                     the eight components of clause 10
src/copy.ts                         owner-supplied strings, clause 04 / 06
src/pages/[slug].astro              one case study template, clause 05
scripts/check-content.mjs           the build-time check of clause 15
scripts/rehype-credits.mjs          frontmatter credits into the Credits section
```

Routes are flat, per clause 03: `/axk`, `/justly`, `/rovify`, `/garejesse`,
`/otj`, `/about`, `/cv`. There is no `/work` index; the home page is it.

## Decisions a later reader might want to undo, and why not to

- **Two font files, not three.** Clause 09 asks for mono 500 on metadata.
  IBM Plex Mono has no variable release, so a third weight would be a third
  file and clause 13 caps it at two. Metadata ships at mono 400; the uppercase
  and the 0.08em tracking carry the weight instead.
- **Project names on the index are `<h2>`,** so the index has a heading
  structure a screen reader can traverse. They are still inside the link, and
  they still look like labels.
- **Full-bleed is `margin-inline: calc(50% - 50vw)`,** not `margin-left: 50%`
  plus a transform. The transform version was in the first build and a
  component's `figure { margin: 0 }` silently cancelled it, throwing the image
  640px off-screen. Components style bleed figures with `margin-block` only.
- **The skip link is clipped, not parked at `left: -9999px`.** An off-screen
  element is a common cause of the horizontal scroll clause 12 forbids.
- **`html { overflow-x: clip }`** guards the same requirement without turning
  the page into a scroll container.
- **The film embed writes its iframe on click.** Nothing third-party loads
  until a reader asks for it, which is what clause 13's privacy-mode embed and
  clause 14's no-third-party-scripts rule together require.

## Verified

- Zero JavaScript files in `dist`. CSS fully inlined.
- No third-party requests. The only external URLs are the footer links.
- One `h1` per page; headings in order; every image has alt text.
- Contrast on `#FAF9F7`: body 17.95:1, muted 5.40:1, accent 7.00:1. AA is 4.5.
- No horizontal scroll at 1280, 640 (= 200% zoom) or 375.
- Keyboard focus ring renders: 2px solid accent, 3px offset, `:focus-visible`.
- Motion audit: two 120ms underline transitions and the image opacity fade.
  Nothing else animates. Both removed under `prefers-reduced-motion`.
- Home transfer with placeholder images: ~139 KB against a 900 KB budget.

## Not verified, and why

- **Lighthouse ≥ 95 on mobile** needs the real photographs and a deployed URL.
- **The 900 KB home budget** is measured against placeholder images. Real
  3000px field photographs are the thing most likely to break it; the
  responsive `srcset` is already in place, so the lever is source quality.
- **Every footer link resolves.** Clause 08 marks four of five as "confirm
  before build"; LinkedIn has no handle yet and is not shipped.
