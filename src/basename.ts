import { normalizeParsed } from './normalize.js';
import { parse } from './parse.js';
import { parseBase } from './parseBase.js';

export const basename = (path: string, removeExtension?: string | boolean) => {
  const parsed = normalizeParsed(parse(path));
  const base = parsed.path.pop();
  if (!base) return '';
  const { name, ext } = parseBase(base);
  return removeExtension === true || removeExtension === ext ? name : `${name}${ext}`;
};
