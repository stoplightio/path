import { isStoplightURI } from '../isStoplightURI.js';

describe('isStoplightURI', () => {
  it.each(['stoplight://resources/overrides/abc', 'stoplight://some-resource'])(
    'treats %s path as a Stoplight URI',
    filepath => {
      expect(isStoplightURI(filepath)).toBe(true);
    },
  );

  it.each([
    'http://example.com/is/absolute',
    'https://stoplight.io',
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
  ])('does treat %s path as a Stoplight URI', filepath => {
    expect(isStoplightURI(filepath)).toBe(false);
  });
});
