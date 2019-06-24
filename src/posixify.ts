import { normalize } from './normalize';

export const posixify = <T extends object = object>(obj: T): T => {
  const target = { ...obj };

  for (const key of Reflect.ownKeys(obj)) {
    if (typeof obj[key] === 'function') {
      const fn = obj[key];
      target[key] = function() {
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
