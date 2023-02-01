import { IPath } from './types.js';

export function format(parsed: IPath): string {
  let path = '';
  if (parsed.absolute) {
    if (parsed.protocol === 'file') {
      if (parsed.drive) {
        path += parsed.drive;
      }
      path += '/';
    } else {
      path += parsed.protocol + '://';
      if (parsed.origin) {
        path += parsed.origin + '/';
      }
    }
  }
  path += parsed.path.join('/');
  if (path === '') path = '.';
  return path;
}
