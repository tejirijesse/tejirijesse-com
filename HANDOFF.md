# What this build cannot do for you

Everything below is owner-supplied by the terms of the specification itself.
`npm run check` lists all of it on every build.

## Blocking — clause 16.1 calls assets the critical path

Five index photographs. Each is currently a hatched placeholder stamped with
what belongs there. Minimum 3000px long edge, sRGB, unretouched, landscape.

| Frame | Subject | Source named in clause 16.1 |
|---|---|---|
| AXK | Cooperative, collection point or warehouse. People handling goods | Field trips — Rwanda / Kenya / Uganda / Tanzania |
| Justly | A law firm interview in progress | Existing interview photography |
| Rovify | An athlete performing in Rovify kit | RYA Launch Cup, Mpano, April 2026 |
| Gare Jesse | A frame from client work, or the two-man crew shooting | Existing film stills |
| OTJ | Only if the sixth frame is kept | Your decision |

Drop the real file over the placeholder, keep the filename, and update
`indexAlt` and `indexCaption` in that project's frontmatter. `indexAlt`
currently starts with `PENDING` in all five.

## Writing — 53 passages across five case studies

Every one renders as a visible block on the page, so a draft cannot ship
unnoticed. They are marked `TO WRITE` and counted per project by `npm run check`.

Gare Jesse has no case study at all — all fourteen sections are stubs. It is the
only project on the site with no prose written before the spec was issued.

## Copy — `src/copy.ts`

- **The thesis line.** One sentence, max 22 words. It is the entire hero.
- **About**, 600–800 words, first person, connecting software engineering,
  records and data infrastructure, company building, and cinematography.
- **The essay**, 700–1,200 words: why you wrote a no-fabrication rule into your
  own tooling.

## Facts to resolve

1. **OTJ's status.** Clause 03 requires `paused`. The case study written on
   10 September says it is live and trading. `paused` is set; the page carries a
   visible note saying the two disagree.
2. **Names.** Linda's and Ali's surnames. Your brother's name. Rovify's
   collaborators — the frontmatter holds a placeholder that the check flags.
3. **Rovify's headline figures.** "Fifty million youth athletes, under one
   percent recorded" needs a citable source or it comes out.
4. **Which AXK and Rovify traction numbers are already public.** The figures in
   the prose came from internal investor decks.
5. **Footer links.** Clause 08 marks GitHub, YouTube, Instagram and X as
   "confirm before build"; LinkedIn has no handle and is not shipped. Every one
   must resolve before launch.
6. **The CV.** `public/cv/oghenetejiri-jesse-cv.pdf`, plus the HTML rendering,
   matching the submitted application CV exactly. Rule 15.1 wants one
   reconciliation pass against the CV — not against memory — before freeze.
7. **Consent.** Clause 16.5: written permission for every identifiable person,
   and the record kept.

## Two things in the specification that do not resolve

1. **Clause 04 says five frames; clause 03 lists four routes.** Resolved as four
   projects plus OTJ, which is what clause 16.1's table implies.
2. **68ch is wider than it reads.** Clause 09 sets the measure at 68ch. In IBM
   Plex Sans at 19px that renders as **87 characters per line**, measured in the
   browser — the `ch` unit measures the "0" glyph and over-estimates. The
   comfortable range is 45–75. Built to spec at 68ch; changing it is one value
   in `src/styles/global.css`.
