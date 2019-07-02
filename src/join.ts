import { format } from './format';
import { normalizeParsed } from './normalize';
import { parse } from './parse';
import { IPath } from './types';

export const join = (...parts: string[]) => {
  // edge case
  if (parts.length === 0) return '.';

  const parsedParts = parts.map(parse);
  const newRoot: IPath = { ...parsedParts[0] };

  for (let i = 1; i < parsedParts.length; i++) {
    const parsed = parsedParts[i];
    if (parsed.absolute) {
      throw new Error('Cannot join an absolute path "' + parts[i] + '" in the middle of other paths.');
    }
    for (const segment of parsed.path) {
      newRoot.path.push(segment);
    }
  }
  return format(normalizeParsed(newRoot));
};
