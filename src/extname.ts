import { parse, parseBase } from './parse';

export const extname = (path: string) => {
  const parsed = parse(path);
  const { ext } = parseBase(parsed.base);
  return ext;
};
