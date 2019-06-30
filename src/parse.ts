// @ts-ignore
import * as grammar from './grammar';
import { IPath } from './types';

export function parse(path: string): IPath {
  return grammar.parse(path, {});
}

export function parseBase(base: string) {
  const split = base.lastIndexOf('.');
  let name = base;
  let ext = null;
  // we check > 0 instead of > -1 so that filenames starting with dots aren't
  // interpreted as file extensions.
  if (split > 0) {
    name = base.slice(0, split);
    ext = base.slice(split + 1);
  }
  return { name, ext };
}
