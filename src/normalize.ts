// https://github.com/isomorphic-git/isomorphic-git/blob/master/src/utils/normalizePath.js

const PARENT_REGEXP = /[^/]+\/\.\.(?:\/|$)/g;

export function normalize(filepath: string) {
  PARENT_REGEXP.lastIndex = 0;
  let normalizedPath = filepath
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
