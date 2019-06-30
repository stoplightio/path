import { IPath } from './types';

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
  const segments = parsed.path;
  if (parsed.base) segments.push(parsed.base);
  path += segments.join('/');
  if (path === '') path = '.';
  return path;
}
