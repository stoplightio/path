import { normalizeParsed } from './normalize.js';
import { parse } from './parse.js';
import { parseBase } from './parseBase.js';

export const extname = (path: string) => {
  const parsed = normalizeParsed(parse(path));
  const base = parsed.path.pop();
  if (!base) return '';
  const { ext } = parseBase(base);
  return ext;
};
