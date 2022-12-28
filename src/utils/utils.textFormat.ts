const toTitleCase = (str: string) =>
  str
    .split(/[\s,|-|_]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const toSlug = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

const fromSlug = (str: string) => str.toLowerCase().trim().replace(/-/g, ' ').trim();

const toSentence = (str: string) =>
  str
    .split(/[\s,|-|_]+/)
    .map((word, i) => (i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(' ');

export { toTitleCase, toSlug, fromSlug, toSentence };
