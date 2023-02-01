import { relative } from '../relative.js';

describe('relative', () => {
  describe('handles POSIX paths', () => {
    it.each`
      from                           | to                              | result
      ${'/test/bar/a'}               | ${'/test/foo/c'}                | ${'../../foo/c'}
      ${'/var/lib'}                  | ${'/var'}                       | ${'..'}
      ${'/var/lib'}                  | ${'/bin'}                       | ${'../../bin'}
      ${'/var/lib'}                  | ${'/var/lib'}                   | ${'.'}
      ${'/var/lib'}                  | ${'/var/apache'}                | ${'../apache'}
      ${'/var/'}                     | ${'/var/lib'}                   | ${'lib'}
      ${'/'}                         | ${'/var/lib'}                   | ${'var/lib'}
      ${'/foo/test'}                 | ${'/foo/test/bar/package.json'} | ${'bar/package.json'}
      ${'/Users/a/web/b/test/mails'} | ${'/Users/a/web/b'}             | ${'../..'}
      ${'/foo/bar/baz-quux'}         | ${'/foo/bar/baz'}               | ${'../baz'}
      ${'/foo/bar/baz'}              | ${'/foo/bar/baz-quux'}          | ${'../baz-quux'}
      ${'/baz-quux'}                 | ${'/baz'}                       | ${'../baz'}
      ${'/baz'}                      | ${'/baz-quux'}                  | ${'../baz-quux'}
    `("handles relative('$from', '$to')", ({ from, to, result }) => {
      expect(relative(from, to)).toEqual(result);
    });
  });

  describe('handles Windows URIs', () => {
    it.each`
      from                         | to                                    | result
      ${'c:\\test\\baz'}           | ${'C:\\test\\foo'}                    | ${'../foo'}
      ${'c:/blah\\blah'}           | ${'d:/games'}                         | ${'d:/games'}
      ${'c:/aaaa/bbbb'}            | ${'c:/aaaa'}                          | ${'..'}
      ${'c:/aaaa/bbbb'}            | ${'c:/cccc'}                          | ${'../../cccc'}
      ${'c:/aaaa/bbbb'}            | ${'c:/aaaa/bbbb'}                     | ${'.'}
      ${'c:/aaaa/bbbb'}            | ${'c:/aaaa/cccc'}                     | ${'../cccc'}
      ${'c:/aaaa/'}                | ${'c:/aaaa/cccc'}                     | ${'cccc'}
      ${'c:/'}                     | ${'c:\\aaaa\\bbbb'}                   | ${'aaaa/bbbb'}
      ${'c:/aaaa/bbbb'}            | ${'d:\\'}                             | ${'d:/'}
      ${'c:/AaAa/bbbb'}            | ${'c:/aaaa/bbbb'}                     | ${'../../aaaa/bbbb'}
      ${'c:/aaaaa/'}               | ${'c:/aaaa/cccc'}                     | ${'../aaaa/cccc'}
      ${'C:\\foo\\bar\\baz\\quux'} | ${'C:\\'}                             | ${'../../../..'}
      ${'C:\\foo\\test'}           | ${'C:\\foo\\test\\bar\\package.json'} | ${'bar/package.json'}
      ${'C:\\foo\\bar\\baz-quux'}  | ${'C:\\foo\\bar\\baz'}                | ${'../baz'}
      ${'C:\\foo\\bar\\baz'}       | ${'C:\\foo\\bar\\baz-quux'}           | ${'../baz-quux'}
      ${'\\\\foo\\bar'}            | ${'\\\\foo\\bar\\baz'}                | ${'baz'}
      ${'\\\\foo\\bar\\baz'}       | ${'\\\\foo\\bar'}                     | ${'..'}
      ${'\\\\foo\\bar\\baz-quux'}  | ${'\\\\foo\\bar\\baz'}                | ${'../baz'}
      ${'\\\\foo\\bar\\baz'}       | ${'\\\\foo\\bar\\baz-quux'}           | ${'../baz-quux'}
      ${'C:\\baz-quux'}            | ${'C:\\baz'}                          | ${'../baz'}
      ${'C:\\baz'}                 | ${'C:\\baz-quux'}                     | ${'../baz-quux'}
      ${'\\\\foo\\baz-quux'}       | ${'\\\\foo\\baz'}                     | ${'../baz'}
      ${'\\\\foo\\baz'}            | ${'\\\\foo\\baz-quux'}                | ${'../baz-quux'}
      ${'C:\\baz'}                 | ${'\\\\foo\\bar\\baz'}                | ${'/foo/bar/baz'}
      ${'\\\\foo\\bar\\baz'}       | ${'C:\\baz'}                          | ${'c:/baz'}
    `("handles relative('$from', '$to')", ({ from, to, result }) => {
      expect(relative(from, to)).toEqual(result);
    });
  });

  it('handles mixed slashes', () => {
    expect(relative('/test\\baz', '/test\\foo')).toEqual('../foo');
    expect(relative('c:/test\\baz', 'C:/test\\foo')).toEqual('../foo');
  });

  it('handles URLs', () => {
    expect(relative('http://stoplight.io/', 'http://stoplight.io/bar/foo')).toEqual('bar/foo');
    expect(relative('http://stoplight.io/bar/z', 'http://stoplight.io/bar/foo/baz')).toEqual('../foo/baz');
  });

  it('handles different origins', () => {
    expect(relative('/a/bar/c', '/x/foo/c')).toEqual('../../../x/foo/c');
    expect(relative('https://stop.bar/bar/z/x', 'http://stoplight.io/bar/foo/baz')).toEqual(
      'http://stoplight.io/bar/foo/baz',
    );
  });
});
