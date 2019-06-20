import { normalize } from './normalize';

export const join = (...parts: string[]) => normalize(parts.map(normalize).join('/'))
