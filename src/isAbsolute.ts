import { parse } from './parse';

export function isAbsolute(filepath: string) {
  const parsed = parse(filepath);
  return parsed.absolute;
}
