import { parse } from './parse';

export function isURL(filepath: string) {
  const parsed = parse(filepath);
  return parsed.protocol === 'http' || parsed.protocol === 'https';
}
