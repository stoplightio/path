// @ts-ignore
import * as grammar from './grammar';
import { IPath } from './types';

export function parse(path: string): IPath {
  if (typeof path !== 'string') throw new Error(`@stoplight/path: Cannot parse ${path} because it is not a string`)
  return grammar.parse(path, {});
}
