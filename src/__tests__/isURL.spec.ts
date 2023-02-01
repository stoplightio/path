import { isURL } from '../isURL.js';

describe('isURL', () => {
  it.each(['http://example.com/is/absolute', 'https://stoplight.io'])('treats %s path as an URL', filepath => {
    expect(isURL(filepath)).toBe(true);
  });

  it.each([
    'stoplight://resources/overrides/abc',
    '\\foo\\bar.json',
    'c:\\foo\\bar.json',
    'c:\\',
    'c:/',
    'c:/foo/bar.json',
    '/home/test',
    '/',
    '//',
    '/var/lib/test/',
    '/var/bin.d',
    'foo/bar',
    'test',
    '',
    'file:///this/is/also/absolute',
  ])('does treat %s path as an URL', filepath => {
    expect(isURL(filepath)).toBe(false);
  });
});
