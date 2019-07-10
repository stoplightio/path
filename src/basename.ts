import { normalizeParsed } from './normalize';
import { parse } from './parse';
import { parseBase } from './parseBase';

export const basename = (path: string) => {
  const parsed = normalizeParsed(parse(path));
  const base = parsed.path.pop();
  if (!base) return '';
  const { name, ext } = parseBase(base);
  return `${name}${ext}`;
};
