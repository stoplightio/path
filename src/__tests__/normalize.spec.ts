import { normalize } from '../normalize';

describe('normalize', () => {
  it('replaces Windows-like slashes with POSIX-compatible ones', () => {
    expect(normalize('c:\\foo\\bar')).toEqual('c:/foo/bar');
  });

  it('ignores POSIX slashes', () => {
    expect(normalize('/d/foo')).toEqual('/d/foo');
  });
});
