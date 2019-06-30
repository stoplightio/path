import { normalizeParsed } from './normalize';
import { parse, parseBase } from './parse';

export const basename = (path: string) => {
  const parsed = normalizeParsed(parse(path));
  const { name } = parseBase(parsed.base);
  return name;
};
