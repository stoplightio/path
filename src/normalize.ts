// https://github.com/isomorphic-git/isomorphic-git/blob/master/src/utils/normalizePath.js
export function normalize(filepath: string) {
  return filepath
    .replace(/\\/g, '/') // Replace '\' with '/' (this differs from isomorphic-git)
    .replace(/\/\.\//g, '/') // Replace '/./' with '/'
    .replace(/\/{2,}/g, '/') // Replace consecutive '/'
    .replace(/^\/\.$/, '/') // if path === '/.' return '/'
    .replace(/^\.\/$/, '.') // if path === './' return '.'
    .replace(/^\.\//, '') // Remove leading './'
    .replace(/\/\.$/, '') // Remove trailing '/.'
    .replace(/(.+)\/$/, '$1') // Remove trailing '/'
    .replace(/^$/, '.') // if path === '' return '.'
}
