import { parse } from './parse';
import { sep } from './sep';

export const stripRoot = (path: string) =>
  parse(path)
    .path.filter(Boolean)
    .join(sep);
