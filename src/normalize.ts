import { format } from './format.js';
import { parse } from './parse.js';
import { IPath } from './types.js';

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
    if (segment === '..' && stack.length && stack[stack.length - 1] !== '..') {
      stack.pop();
    } else if (segment !== '..' || !parsed.absolute) {
      stack.push(segment);
    }
  }
  parsed.path = stack;

  return parsed;
}
