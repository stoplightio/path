import { IPath } from './types';

export function format(parsed: IPath): string {
  let path = '';
  if (parsed.protocol === 'file') {
    path += parsed.drive || '/';
  } else {
    path += parsed.protocol + '://';
    if (parsed.origin) {
      path += parsed.origin + '/';
    }
  }
  path += parsed.path.join('/');
  path += '/' + parsed.basename;
  if (parsed.ext) {
    path += '.' + parsed.ext;
  }
  return path;
}
