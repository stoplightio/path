import { parse } from './parse';

export const startsWithWindowsDrive = (str: string) => {
  const parsed = parse(str);
  return parsed.drive !== null;
};
