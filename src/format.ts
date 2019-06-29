import { IPath } from './types';

export function format(parsed: Omit<IPath, 'implicitProtocol'>): string {
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
  path += '/' + parsed.basename;
  if (parsed.ext) {
    path += '.' + parsed.ext;
  }
  return path;
}
