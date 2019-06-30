import { normalizeParsed } from './normalize';
import { parse, parseBase } from './parse';

export const extname = (path: string) => {
  const parsed = normalizeParsed(parse(path));
  const { ext } = parseBase(parsed.base);
  return ext;
};
