import { format, IPath, parse } from '..';

export function normalize(filepath: string) {
  return format(normalizeParsed(parse(filepath)));
}

export function normalizeParsed(parsed: IPath): IPath {
  let path = parsed.path;
  // Replace consecutive '/' and replace '/./' with '/'
  path = path.filter(segment => segment !== '' && segment !== '.');
  // Collapse '..' where possible
  const stack = [];
  for (const segment of path) {
    if (segment === '..') {
      if (stack.length) {
        stack.pop();
      } else {
        stack.push(segment);
      }
    } else {
      stack.push(segment);
    }
  }
  parsed.path = stack;
  return parsed;
}
