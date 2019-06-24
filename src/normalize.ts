// https://github.com/isomorphic-git/isomorphic-git/blob/master/src/utils/normalizePath.js

import * as URI from 'urijs';
import { isURL } from './isURL';

const PARENT_REGEXP = /[^/]+\/\.\.(?:\/|$)/g;

export function normalize(uri: string) {
  if (isURL(uri)) {
    return new URI(uri).normalize().href();
  }

  PARENT_REGEXP.lastIndex = 0;
  let normalizedPath = uri
    .replace(/\\/g, '/') // Replace '\' with '/' (this differs from isomorphic-git)
    .replace(/\/\.\//g, '/') // Replace '/./' with '/'
    .replace(/\/{2,}/g, '/') // Replace consecutive '/'
    .replace(/^\/\.$/, '/') // if path === '/.' return '/'
    .replace(/^\.\/$/, '.') // if path === './' return '.'
    .replace(/^\.\//, '') // Remove leading './'
    .replace(/\/\.$/, '') // Remove trailing '/.'
    .replace(/^$/, '.'); // if path === '' return '.'
  let segment;

  // tslint:disable-next-line:no-conditional-assignment
  while ((segment = PARENT_REGEXP.exec(normalizedPath)) !== null) {
    normalizedPath = `${normalizedPath.slice(0, segment.index)}${normalizedPath.slice(PARENT_REGEXP.lastIndex)}`;
    PARENT_REGEXP.lastIndex = segment.index - 2;
  }

  return normalizedPath.replace(/(.+)\/$/, '$1'); // Remove trailing '/'
}
