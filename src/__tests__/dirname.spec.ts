import { dirname } from '../dirname';

describe('posix dirname', () => {
  it.each`
    path       | expected
    ${'/a/b/'} | ${'/a'}
    ${'/a/b'}  | ${'/a'}
    ${'/a'}    | ${'/'}
    ${''}      | ${'.'}
    ${'/'}     | ${'/'}
    ${'////'}  | ${'/'}
    ${'//a'}   | ${'/'}
    ${'foo'}   | ${'.'}
  `('computes dirname of $path', ({ path, expected }) => {
    expect(dirname(path)).toBe(expected);
  });
});

describe('win32 dirname', () => {
  it.each`
    path                               | expected
    ${'c:\\'}                          | ${'c:/'}
    ${'c:\\foo'}                       | ${'c:/'}
    ${'c:\\foo\\'}                     | ${'c:/'}
    ${'c:\\foo\\bar'}                  | ${'c:/foo'}
    ${'c:\\foo\\bar\\'}                | ${'c:/foo'}
    ${'c:\\foo\\bar\\baz'}             | ${'c:/foo/bar'}
    ${'\\'}                            | ${'/'}
    ${'\\foo'}                         | ${'/'}
    ${'\\foo\\'}                       | ${'/'}
    ${'\\foo\\bar'}                    | ${'/foo'}
    ${'\\foo\\bar\\'}                  | ${'/foo'}
    ${'\\foo\\bar\\baz'}               | ${'/foo/bar'}
    ${'c:'}                            | ${'.'}
    ${'c:foo'}                         | ${'.'}
    ${'c:foo\\'}                       | ${'.'}
    ${'c:foo\\bar'}                    | ${'c:foo'}
    ${'c:foo\\bar\\'}                  | ${'c:foo'}
    ${'c:foo\\bar\\baz'}               | ${'c:foo/bar'}
    ${'file:stream'}                   | ${'.'}
    ${'dir\\file:stream'}              | ${'dir'}
    ${'\\\\unc\\share'}                | ${'/unc'}
    ${'\\\\unc\\share\\foo'}           | ${'/unc/share'}
    ${'\\\\unc\\share\\foo\\'}         | ${'/unc/share'}
    ${'\\\\unc\\share\\foo\\bar'}      | ${'/unc/share/foo'}
    ${'\\\\unc\\share\\foo\\bar\\'}    | ${'/unc/share/foo'}
    ${'\\\\unc\\share\\foo\\bar\\baz'} | ${'/unc/share/foo/bar'}
    ${'/a/b/'}                         | ${'/a'}
    ${'/a/b'}                          | ${'/a'}
    ${'/a'}                            | ${'/'}
    ${''}                              | ${'.'}
    ${'/'}                             | ${'/'}
    ${'////'}                          | ${'/'}
    ${'foo'}                           | ${'.'}
  `('computes dirname of $path', ({ path, expected }) => {
    expect(dirname(path)).toBe(expected);
  });
});
