import { checkContent } from './check-content.mjs';

/**
 * Clause 15 requires the check to fail the build, not merely warn during it.
 * Running it at astro:config:done means dev and build are held to the same
 * standard — a rule that only applies in CI is one that gets discovered late.
 */
export default function contentDiscipline() {
  return {
    name: 'content-discipline',
    hooks: {
      'astro:config:done': ({ logger }) => {
        const { errors, blockers } = checkContent();

        for (const b of blockers) logger.warn(`freeze blocker · ${b}`);

        if (errors.length) {
          for (const e of errors) logger.error(e);
          throw new Error(
            `Content discipline: ${errors.length} violation(s) of clause 05 or 15. Run "npm run check" for the list.`
          );
        }
      },
    },
  };
}
