import { isURL } from './isURL';
import { normalize } from './normalize';

export const posixify = <T extends object = object, A extends Partial<T> = Partial<T>>(obj: T, fallback: A): T => {
  const target = { ...obj };

  for (const key of Reflect.ownKeys(obj)) {
    if (typeof obj[key] === 'function') {
      const fn = obj[key];
      target[key] = function() {
        if (arguments.length > 0 && isURL(arguments[0])) {
          if (key in fallback) {
            return fallback[key].apply(fallback, arguments);
          }

          throw new Error('Method not implemented');
        }

        const result = fn.apply(this, arguments);
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
