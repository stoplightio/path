import * as path from 'path';
import { normalize } from './normalize';

export const join = (...parts: string[]) => path.join(...parts.map(normalize));
