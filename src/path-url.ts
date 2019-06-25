import * as URI from 'urijs';

export const join = (...parts: string[]) => new URI(parts.join('/')).normalize().href();

export const resolve = (...pathSegments: string[]) =>
  URI(pathSegments[0])
    .absoluteTo(pathSegments[1])
    .href();
export const relative = (from: string, to: string) =>
  URI(from)
    .relativeTo(to)
    .href();
