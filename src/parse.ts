// @ts-ignore
import * as grammar from './grammar';
import { IPath } from './types';

export function parse(path: string): IPath {
  // We stick a newline on the end as a hack so we can
  // use "end of input" in the grammar definition
  return grammar.parse(path.replace(/\n?$/, '\n'), {});
}
