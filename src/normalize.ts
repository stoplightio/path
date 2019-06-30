import { format } from './format';
import { parse } from './parse';
import { IPath } from './types';

export function normalize(filepath: string) {
  return format(normalizeParsed(parse(filepath)));
}

export function normalizeParsed(parsed: IPath): IPath {
  let path = parsed.path;

  // If the base is '..' promote it to a path segment
  if (parsed.base === '..' || parsed.base === '.') {
    path.push(parsed.base);
    parsed.base = '';
  }

  // Replace consecutive '/' and replace '/./' with '/'
  path = path.filter(segment => segment !== '' && segment !== '.');

  // Collapse '..' where possible
  const stack = [];
  for (const segment of path) {
    if (segment === '..') {
      if (stack.length && stack[stack.length - 1] !== '..') {
        stack.pop();
      } else if (stack.length > 0 || !parsed.absolute) {
        stack.push(segment);
      }
    } else {
      stack.push(segment);
    }
  }
  parsed.path = stack;

  // If the base is empty, demote last path segment to base.
  if (parsed.base === '' || parsed.base === '.') {
    const segment = parsed.path.pop();
    if (segment) {
      parsed.base = segment;
    }
  }
  return parsed;
}
