// https://github.com/isomorphic-git/isomorphic-git/blob/master/src/utils/basename.js

export const basename = (path: string) => {
  const last = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'));
  if (last > -1) {
    path = path.slice(last + 1);
  }

  return path;
};
