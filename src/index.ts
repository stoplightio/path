import * as path from 'path-browserify';
import * as pathURL from './path-url';
import { urlify } from './urlify';

const { dirname, extname, join, relative, sep, resolve, parse } = urlify(path, pathURL);
export { dirname, extname, join, relative, sep, resolve, parse };

export * from './normalize';
export * from './startsWithWindowsDrive';
export * from './toFSPath';
export * from './isAbsolute';
