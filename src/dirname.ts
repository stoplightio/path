import { format } from './format';
import { normalizeParsed } from './normalize';
import { parse } from './parse';

export const dirname = (path: string) => {
  const parsed = normalizeParsed(parse(path));
  if (parsed.path.length) {
    parsed.base = parsed.path.pop() as string;
  } else {
    parsed.base = '';
  }
  return format(normalizeParsed(parsed));
};
