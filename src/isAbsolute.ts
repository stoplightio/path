import * as URI from 'urijs';
import { startsWithWindowsDrive } from './startsWithWindowsDrive';

const PATH_SEPARATOR_REGEXP = /[/\\]/;

// based on https://github.com/nodejs/node/blob/9946c597077070941309e5b2986a810e52978a97/lib/path.js#L349
export function isAbsolute(filepath: string) {
  if (filepath.length === 0) return false;

  try {
    return PATH_SEPARATOR_REGEXP.test(filepath[0]) || startsWithWindowsDrive(filepath) || URI(filepath).is('absolute');
  } catch {
    // merely to catch any URIJS exception that might (or might not) be thrown
    return false;
  }
}
