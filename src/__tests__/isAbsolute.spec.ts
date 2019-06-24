import { isAbsolute } from '../';

describe('isAbsolute', () => {
  it.each([
    '\\foo\\bar.json',
    'c:\\foo\\bar.json',
    'c:\\',
    'c:/',
    'c:/foo/bar.json',
    '/home/test',
    '/',
    '/var/lib/test/',
    '/var/bin.d',
    'https://foo.com/bar',
    'http://localhost',
    'http://boo.com',
  ])('treats %s path as absolute', filepath => {
    expect(isAbsolute(filepath)).toBe(true);
  });

  it.each(['foo/bar', 'test', '', 'www.foo.com'])('treats %s path as non-absolute', filepath => {
    expect(isAbsolute(filepath)).toBe(false);
  });
});
