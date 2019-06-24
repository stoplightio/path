import * as path from 'path';
import { posixify } from './posixify';

const { dirname, extname, join, relative, sep, resolve, parse } = posixify(path);
export { dirname, extname, join, relative, sep, resolve, parse };

export * from './normalize';
export * from './startsWithWindowsDrive';
export * from './toFSPath';
export * from './isAbsolute';
