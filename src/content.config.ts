import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Clause 15. One collection. Source files live at
 * src/content/[project]/index.md with images alongside in media/.
 *
 * The schema is deliberately narrow. Fields a portfolio template would add —
 * tags, featured, colour, hero — are absent because clause 18 says they are
 * out of scope, and a field that exists will eventually be filled.
 */
const projects = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      /** One sentence of what it is. Clause 04, label line 2. */
      oneLine: z.string(),
      sector: z.string(),
      years: z.string(),
      status: z.enum(['live', 'pilot', 'paused', 'closed']),
      role: z.string(),
      order: z.number().int().positive(),

      /**
       * Rule 04.1. A photograph of people or place. The build cannot tell a
       * photograph from a screenshot, so this is the one rule enforced by
       * reading rather than by types.
       */
      indexImage: image(),
      /** Clause 12: what is in it, for someone who cannot see it. */
      indexAlt: z.string().min(20),
      /** Rule 05.3: what you are looking at and why it mattered. */
      indexCaption: z.string().min(8),

      credits: z
        .array(z.object({ name: z.string(), did: z.string() }))
        .min(1, 'Clause 17.6: every collaborator named on every project.'),

      /** Rule 05.4: the page must be complete with this removed. */
      film: z
        .object({
          src: z.string().url(),
          poster: image(),
          posterAlt: z.string().min(20),
          credit: z.string(),
          runtime: z.string(),
          /** Clause 12: a text summary of the film, in the prose. */
          summary: z.string().min(40),
        })
        .optional(),
    }),
});

export const collections = { projects };
