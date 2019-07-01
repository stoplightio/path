import { format } from './format';
import { join } from './join';
import { normalizeParsed } from './normalize';
import { parse } from './parse';

export function resolve(...pathSegments: string[]) {
  // Edge case
  if (pathSegments.length === 0) return '.';

  // If the last segment is absolute, return the last segment
  const toPath = pathSegments[pathSegments.length - 1];
  const toParsed = normalizeParsed(parse(toPath));
  if (toParsed.absolute) return format(toParsed);

  // Otherwise, join all the segments
  return join(...pathSegments);
}
