import { stripRoot } from '../stripRoot';

describe('stripRoot', () => {
  it.each(['foo', 'test/a', 'a/b'])('does not alter "%s" path', (path) => {
    expect(stripRoot(path)).toEqual(path);
  });

  it.each`
    actual       | expected
    ${'/foo'}    | ${'foo'}
    ${'c:\\foo'} | ${'foo'}
    ${'\\foo'}   | ${'foo'}
    ${'////a'}   | ${'a'}
    ${'/\\///a'} | ${'a'}
  `('strip root from "$actual" path', ({ actual, expected }) => {
    expect(stripRoot(actual)).toEqual(expected);
  });
});
