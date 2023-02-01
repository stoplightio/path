import { parse } from './parse.js';
import { sep } from './sep.js';

export const stripRoot = (path: string) => parse(path).path.filter(Boolean).join(sep);
