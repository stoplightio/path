import * as URI from 'urijs';
import { isURL } from './isURL';
import { startsWithWindowsDrive } from './startsWithWindowsDrive';

const PATH_SEPARATOR_REGEXP = /^[/\\]/;

// based on https://github.com/nodejs/node/blob/9946c597077070941309e5b2986a810e52978a97/lib/path.js#L349
export function isAbsolute(uri: string) {
  if (uri.length === 0) return false;

  if (isURL(uri)) {
    try {
      return URI(uri).is('absolute');
    } catch {
      return false;
    }
  }

  return PATH_SEPARATOR_REGEXP.test(uri) || startsWithWindowsDrive(uri);
}
