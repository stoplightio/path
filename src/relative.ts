import { format } from './format';
import { normalizeParsed } from './normalize';
import { parse } from './parse';

export function relative(from: string, to: string): string {
  const toParsed = normalizeParsed(parse(to));
  // If `to` is already relative, just return that normalized
  if (!toParsed.absolute) {
    return format(toParsed);
  }
  const fromParsed = normalizeParsed(parse(from));
  // If a relative URL is not possible, return an absolute one.
  if (toParsed.origin !== fromParsed.origin) return format(toParsed);
  if (!fromParsed.absolute) return format(toParsed);
  if (fromParsed.drive !== toParsed.drive) return format(toParsed);

  // Otherwise, remove the common parts.
  // NOTE: 'from' should always be a directory. Otherwise, it doesn't make a lot of sense.
  if (fromParsed.base) fromParsed.path.push(fromParsed.base);

  // Toss away common path segments
  const maxIter = Math.max(fromParsed.path.length, toParsed.path.length);
  for (let i = 0; i < maxIter; i++) {
    if (fromParsed.path[0] === toParsed.path[0]) {
      fromParsed.path = fromParsed.path.slice(1);
      toParsed.path = toParsed.path.slice(1);
    } else {
      break;
    }
  }
  // Convert remaining path segments into '..'
  for (const _ of fromParsed.path) {
    toParsed.path.unshift('..');
  }
  toParsed.drive = null;
  toParsed.absolute = false;
  toParsed.protocol = null;

  return format(toParsed);
}
