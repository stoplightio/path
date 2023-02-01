import { parse } from './parse.js';

export function isStoplightURI(filepath: string) {
  const parsed = parse(filepath);
  return parsed.protocol === 'stoplight';
}
