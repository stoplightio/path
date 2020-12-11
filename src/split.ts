export function split(path: string): string[] {
  if (path.length === 0) return [];
  if (path === '/') return ['/'];
  let parts = path.split('/');
  if (parts[parts.length - 1] === '') {
    parts.pop();
  }
  if (path[0] === '/') {
    parts[0] = '/';
  } else {
    if (parts[0] !== '.') {
      parts.unshift('.');
    }
  }
  return parts;
}
