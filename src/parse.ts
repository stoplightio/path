// @ts-ignore
import * as grammar from './grammar';
import { IPath } from './types';

export function parse(path: string): IPath {
  return grammar.parse(String(path), {});
}
