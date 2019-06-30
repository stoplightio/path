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
  const fromPath = fromParsed.path;
  const toPath = toParsed.path;
  // NOTE: 'from' should always be a directory. Otherwise, it doesn't make a lot of sense.
  if (fromParsed.base) fromPath.push(fromParsed.base);
  if (toParsed.base) toPath.push(toParsed.base);

  // Toss away common path segments
  const maxIter = Math.max(fromPath.length, toPath.length);
  for (let i = 0; i < maxIter; i++) {
    if (fromPath[0] === toPath[0]) {
      fromPath.shift();
      toPath.shift();
    } else {
      break;
    }
  }
  // Convert remaining path segments into '..'
  for (const _ of fromPath) {
    toPath.unshift('..');
  }

  const newPath = {
    origin: null,
    drive: null,
    absolute: false,
    protocol: null,
    base: toPath.pop() || '',
    path: toPath,
  };

  return format(newPath);
}
