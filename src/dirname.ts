import { format } from './format';
import { normalizeParsed } from './normalize';
import { parse } from './parse';

export const dirname = (path: string) => {
  const parsed = normalizeParsed(parse(path));
  parsed.path.pop();
  return format(normalizeParsed(parsed));
};
