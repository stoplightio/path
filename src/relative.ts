import { format } from './format.js';
import { normalizeParsed } from './normalize.js';
import { parse } from './parse.js';

export function relative(fromDir: string, to: string): string {
  const toParsed = normalizeParsed(parse(to));

  // If `to` is already relative, just return that normalized
  if (!toParsed.absolute) {
    return format(toParsed);
  }

  const fromParsed = normalizeParsed(parse(fromDir));

  // If a relative URL is not possible, return an absolute one.
  if (toParsed.origin !== fromParsed.origin) return format(toParsed);
  if (!fromParsed.absolute) return format(toParsed);
  if (fromParsed.drive !== toParsed.drive) return format(toParsed);

  // Toss away common path segments
  const maxIter = Math.min(fromParsed.path.length, toParsed.path.length);
  for (let _ = 0; _ < maxIter; _++) {
    if (fromParsed.path[0] === toParsed.path[0]) {
      fromParsed.path.shift();
      toParsed.path.shift();
    } else {
      break;
    }
  }

  // Convert remaining path segments into '..'
  toParsed.path.unshift(...fromParsed.path.fill('..'));

  const newPath = {
    origin: null,
    drive: null,
    absolute: false,
    protocol: null,
    path: toParsed.path,
  };

  return format(newPath);
}
