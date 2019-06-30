import { format } from './format';
import { join } from './join';
import { normalizeParsed } from './normalize';
import { parse } from './parse';

export function resolve(...pathSegments: string[]) {
  if (pathSegments.length === 0) return '.';
  const toPath = pathSegments[pathSegments.length - 1];
  const toParsed = normalizeParsed(parse(toPath));
  if (toParsed.absolute) return format(toParsed);
  return join(...pathSegments);
}
