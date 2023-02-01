import { parse } from './parse.js';

export const startsWithWindowsDrive = (str: string) => {
  const parsed = parse(str);
  return parsed.drive !== null;
};
