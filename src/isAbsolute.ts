import { parse } from './parse.js';

export function isAbsolute(filepath: string) {
  const parsed = parse(filepath);
  return parsed.absolute;
}
