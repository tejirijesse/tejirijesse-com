/**
 * Astro rewrites asset URLs for `base`, but not the href of a plain anchor.
 * The apex deployment has no base and the Pages preview does, so every
 * internal link goes through here rather than being written as a root-relative
 * literal that only works on one of the two.
 */
const base = import.meta.env.BASE_URL;

export function href(path: string): string {
  return `${base}/${path.replace(/^\//, '')}`.replace(/\/{2,}/g, '/');
}
