import * as path from 'path';
import * as pathURL from './path-url';
import { posixify } from './posixify';

const { dirname, extname, join, relative, sep, resolve, parse } = posixify(path, pathURL);
export { dirname, extname, join, relative, sep, resolve, parse };

export * from './normalize';
export * from './startsWithWindowsDrive';
export * from './toFSPath';
export * from './isAbsolute';
