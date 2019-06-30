import { format } from './format';
import { join } from './join';
import { parse } from './parse';

export function resolve(...pathSegments: string[]) {
  const toPath = pathSegments.pop();
  if (!toPath) return '.';
  const toParsed = parse(toPath);
  if (toParsed.absolute) return format(toParsed);
  return join(...pathSegments);
}
