/**
 * Clause 05 fixes fourteen sections and puts "What I still cannot answer"
 * last on the page. Clause 15 puts the collaborator list in frontmatter, so
 * that the schema can refuse a project with nobody named.
 *
 * Rendering the frontmatter list as its own section after the prose would
 * duplicate the Credits heading and displace the open question from the end.
 * This inserts the structured list into the Credits section where it belongs,
 * at build time, with no runtime cost.
 */
import { visit } from 'unist-util-visit';

const text = (node) =>
  node.type === 'text'
    ? node.value
    : (node.children ?? []).map(text).join('');

export default function rehypeCredits() {
  return (tree, file) => {
    const credits = file.data?.astro?.frontmatter?.credits;
    if (!Array.isArray(credits) || credits.length === 0) return;

    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'h2' || text(node).trim() !== 'Credits') return;

      const dl = {
        type: 'element',
        tagName: 'dl',
        properties: { className: ['credit-list'] },
        children: credits.flatMap((credit) => [
          {
            type: 'element',
            tagName: 'dt',
            properties: {},
            children: [{ type: 'text', value: credit.name }],
          },
          {
            type: 'element',
            tagName: 'dd',
            properties: {},
            children: [{ type: 'text', value: credit.did }],
          },
        ]),
      };

      parent.children.splice(index + 1, 0, dl);
      return index + 2;
    });
  };
}
