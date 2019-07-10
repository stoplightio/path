import { basename } from '../basename';

describe('posix basename', () => {
  it.each`
    path               | expected
    ${'/a/b/foo.json'} | ${'foo.json'}
    ${'/a/b'}          | ${'b'}
    ${'/a'}            | ${'a'}
    ${''}              | ${''}
    ${'/'}             | ${''}
    ${'////'}          | ${''}
    ${'//a'}           | ${'a'}
    ${'foo'}           | ${'foo'}
  `('computes dirname of $path', ({ path, expected }) => {
    expect(basename(path)).toBe(expected);
  });
});

describe('win32 basename', () => {
  it.each`
    path                                 | expected
    ${'c:\\'}                            | ${''}
    ${'c:\\foo'}                         | ${'foo'}
    ${'c:\\foo\\'}                       | ${'foo'}
    ${'c:\\foo\\bar'}                    | ${'bar'}
    ${'c:\\foo\\bar\\'}                  | ${'bar'}
    ${'c:\\foo\\bar\\baz'}               | ${'baz'}
    ${'c:\\foo\\bar\\baz.json'}          | ${'baz.json'}
    ${'\\'}                              | ${''}
    ${'\\foo'}                           | ${'foo'}
    ${'\\foo\\'}                         | ${'foo'}
    ${'\\foo\\bar'}                      | ${'bar'}
    ${'\\foo\\bar\\'}                    | ${'bar'}
    ${'\\foo\\bar\\baz'}                 | ${'baz'}
    ${'\\foo\\bar\\baz.bar'}             | ${'baz.bar'}
    ${'c:'}                              | ${'c:'}
    ${'c:foo'}                           | ${'c:foo'}
    ${'c:foo\\'}                         | ${'c:foo'}
    ${'c:foo\\bar'}                      | ${'bar'}
    ${'c:foo\\bar.test'}                 | ${'bar.test'}
    ${'c:foo\\bar\\'}                    | ${'bar'}
    ${'c:foo\\bar\\baz'}                 | ${'baz'}
    ${'file:stream'}                     | ${'file:stream'}
    ${'dir\\file:stream'}                | ${'file:stream'}
    ${'\\\\unc\\share'}                  | ${'share'}
    ${'\\\\unc\\share\\foo'}             | ${'foo'}
    ${'\\\\unc\\share\\foo\\'}           | ${'foo'}
    ${'\\\\unc\\share\\foo\\bar'}        | ${'bar'}
    ${'\\\\unc\\share\\foo\\bar\\'}      | ${'bar'}
    ${'\\\\unc\\share\\foo\\bar\\baz'}   | ${'baz'}
    ${'\\\\unc\\share\\foo\\bar\\baz.x'} | ${'baz.x'}
    ${'foo'}                             | ${'foo'}
  `('computes dirname of $path', ({ path, expected }) => {
    expect(basename(path)).toBe(expected);
  });
});
