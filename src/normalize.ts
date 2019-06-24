// https://github.com/isomorphic-git/isomorphic-git/blob/master/src/utils/normalizePath.js

import * as path from 'path-browserify';
import * as URI from 'urijs';
import { isURL } from './isURL';

export function normalize(uri: string) {
  if (isURL(uri)) {
    return new URI(uri).normalize().href();
  }

  return path
    .normalize(uri)
    .replace(/\\/g, '/') // Replace '\' with '/'
    .replace(/(.+)\/$/, '$1'); // Remove trailing '/'
}
