import { isURL } from './isURL';
import { normalize } from './normalize';

export const urlify = <T extends object = object, A extends Partial<T> = Partial<T>>(obj: T, fallback: A): T => {
  const target = { ...obj };

  for (const key of Reflect.ownKeys(obj)) {
    if (typeof obj[key] === 'function') {
      const fn = obj[key];
      target[key] = function(...args: any) {
        if (args.length > 0 && isURL(args[0])) {
          if (key in fallback) {
            return fallback[key].apply(fallback, arguments);
          }

          throw new Error('Method not implemented');
        }

        const result = fn.apply(this, normalizeSlashes(args));
        if (typeof result === 'string') {
          return normalize(result);
        }

        return result;
      };
    } else {
      target[key] = obj[key]; // we omit win32 and posix on purpose
    }
  }

  return target;
};

function normalizeSlashes(args: unknown[]) {
  return args.map(arg => {
    if (typeof arg === 'string') {
      return normalize(arg);
    } else {
      return arg;
    }
  });
}
