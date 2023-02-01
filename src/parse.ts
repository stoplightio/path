import * as grammar from './grammar.js';
import { IPath } from './types.js';

export function parse(path: string): IPath {
  if (typeof path !== 'string') throw new Error(`@stoplight/path: Cannot parse ${path} because it is not a string`);
  return grammar.parse(path, {});
}
