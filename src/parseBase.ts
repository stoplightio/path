export function parseBase(base: string) {
  let split = base.lastIndexOf('.');
  // ignore edge cases
  if (base === '..') split = -1;
  if (base === '.') split = -1;

  let name = base;
  let ext = '';
  // we check > 0 instead of > -1 so that filenames starting with dots aren't
  // interpreted as file extensions.
  if (split > 0) {
    name = base.slice(0, split);
    ext = base.slice(split);
  }
  return { name, ext };
}
