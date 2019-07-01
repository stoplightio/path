import { normalizeParsed } from './normalize';
import { parse } from './parse';
import { parseBase } from './parseBase';

export const extname = (path: string) => {
  const parsed = normalizeParsed(parse(path));
  const base = parsed.path.pop();
  if (!base) return '';
  const { ext } = parseBase(base);
  return ext;
};
