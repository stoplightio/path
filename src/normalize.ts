import { format } from './format';
import { parse } from './parse';
import { IPath } from './types';

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

  return parsed;
}
