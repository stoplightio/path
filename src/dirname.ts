import { format } from './format.js';
import { normalizeParsed } from './normalize.js';
import { parse } from './parse.js';

export const dirname = (path: string) => {
  const parsed = normalizeParsed(parse(path));
  parsed.path.pop();
  return format(normalizeParsed(parsed));
};
