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
  `('computes basename of $path', ({ path, expected }) => {
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
  `('computes basename of $path', ({ path, expected }) => {
    expect(basename(path)).toBe(expected);
  });
});

describe('basename with removeExtension arg', () => {
  it.each`
    path               | removeExtension | expected
    ${'/a/b/foo.json'} | ${'.json'}      | ${'foo'}
    ${'/a/b/foo.txt'}  | ${'.json'}      | ${'foo.txt'}
    ${'/a/b/foo.json'} | ${true}         | ${'foo'}
    ${'/a/b/foo.txt'}  | ${true}         | ${'foo'}
    ${'/a/b/foo.json'} | ${false}        | ${'foo.json'}
    ${'/a/b/foo.txt'}  | ${false}        | ${'foo.txt'}
  `('computes basename of $path, $removeExtension', ({ path, removeExtension, expected }) => {
    expect(basename(path, removeExtension)).toBe(expected);
  });
});
