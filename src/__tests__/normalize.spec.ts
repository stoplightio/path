import { normalize } from '../normalize.js';

describe('normalize', () => {
  describe('replaces Windows-like slashes with POSIX-compatible ones', () => {
    it.each`
      path              | result
      ${'c:\\foo\\bar'} | ${'c:/foo/bar'}
    `("normalize('$path')", ({ path, result }) => {
      expect(normalize(path)).toEqual(result);
    });
  });

  describe('normalizes capitalization of Windows drive letters', () => {
    it.each`
      path                    | result
      ${'C:\\foo\\bar'}       | ${'c:/foo/bar'}
      ${'/C:/foo/bar'}        | ${'c:/foo/bar'}
      ${'file:///C:/foo/bar'} | ${'c:/foo/bar'}
      ${'file://C:/foo/bar'}  | ${'c:/foo/bar'}
    `("normalize('$path')", ({ path, result }) => {
      expect(normalize(path)).toEqual(result);
    });
  });

  describe('ignores POSIX slashes', () => {
    it.each`
      path        | result
      ${'/d/foo'} | ${'/d/foo'}
    `("normalize('$path')", ({ path, result }) => {
      expect(normalize(path)).toEqual(result);
    });
  });

  describe('does some basic resolving', () => {
    it.each`
      path                                | result
      ${'/foo/bar/boom/../../baz/.././a'} | ${'/foo/a'}
      ${'/foo/bar/boom/../a'}             | ${'/foo/bar/a'}
      ${'/foo/bar/boom/..'}               | ${'/foo/bar'}
    `("normalize('$path')", ({ path, result }) => {
      expect(normalize(path)).toEqual(result);
    });
  });

  describe('handles URLs', () => {
    it.each`
      path                                | result
      ${'https://foo.com/baz/bar'}        | ${'https://foo.com/baz/bar'}
      ${'htTps://foo.com/baz/bar'}        | ${'https://foo.com/baz/bar'}
      ${'htTps://foo.com/baz/bar/../foo'} | ${'https://foo.com/baz/foo'}
    `("normalize('$path')", ({ path, result }) => {
      expect(normalize(path)).toEqual(result);
    });
  });

  describe('resolves .. in absolute paths differently from relative paths', () => {
    it.each`
      path                                        | result
      ${'../../foo'}                              | ${'../../foo'}
      ${'../../foo/../bar'}                       | ${'../../bar'}
      ${'../../foo/../bar/../..'}                 | ${'../../..'}
      ${'/../../foo'}                             | ${'/foo'}
      ${'/../../foo/../bar'}                      | ${'/bar'}
      ${'/../../foo/../bar/../..'}                | ${'/'}
      ${'https://foo.com/../../foo'}              | ${'https://foo.com/foo'}
      ${'https://foo.com/../../foo/../bar'}       | ${'https://foo.com/bar'}
      ${'https://foo.com/../../foo/../bar/../..'} | ${'https://foo.com/'}
    `("normalize('$path')", ({ path, result }) => {
      expect(normalize(path)).toEqual(result);
    });
  });
});
