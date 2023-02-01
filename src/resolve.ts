import { format } from './format.js';
import { join } from './join.js';
import { normalizeParsed } from './normalize.js';
import { parse } from './parse.js';

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
