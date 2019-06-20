// https://github.com/isomorphic-git/isomorphic-git/blob/master/src/utils/dirname.js
export const dirname = (path: string) => {
  const last = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'))
  if (last === -1) return '.';
  if (last === 0) return '/';
  return path.slice(0, last);
};
