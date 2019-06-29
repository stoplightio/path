import { format } from './format';
import { normalizeParsed } from './normalize';
import { parse } from './parse';
import { IPath } from './types';

const appendBasenameToPath = (dest: IPath, source: IPath) => {
  let basename = source.basename;
  if (source.ext) basename += '.' + source.ext;
  dest.path.push(basename);
};

export const join = (...parts: string[]) => {
  const parsedParts = parts.map(parse);
  const newRoot: IPath = { ...parsedParts[0] };

  appendBasenameToPath(parsedParts[0], parsedParts[0]);

  for (let i = 1; i < parsedParts.length; i++) {
    const parsed = parsedParts[i];
    if (parsed.absolute) {
      throw new Error('Cannot join an absolute path "' + parts[i] + '" in the middle of other paths.');
    }
    for (const dir of parsed.path) {
      newRoot.path.push(dir);
    }
    if (i === parsedParts.length - 1) {
      // Copy basename over
      newRoot.basename = parsed.basename;
      newRoot.ext = parsed.ext;
    } else {
      appendBasenameToPath(newRoot, parsed);
    }
  }
  return format(normalizeParsed(newRoot));
};
