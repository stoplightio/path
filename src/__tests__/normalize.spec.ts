import { normalize } from '../';

describe('normalize', () => {
  it('replaces Windows-like slashes with POSIX-compatible ones', () => {
    expect(normalize('c:\\foo\\bar')).toEqual('c:/foo/bar');
  });

  it('ignores POSIX slashes', () => {
    expect(normalize('/d/foo')).toEqual('/d/foo');
  });

  it('does some basic resolving', () => {
    expect(normalize('/foo/bar/boom/../../baz/.././a')).toEqual('/foo/a');
    expect(normalize('/foo/bar/boom/../a')).toEqual('/foo/bar/a');
    expect(normalize('/foo/bar/boom/..')).toEqual('/foo/bar');
  });

  it('handles URLs', () => {
    expect(normalize('https://foo.com/baz/bar')).toEqual('https://foo.com/baz/bar');
    expect(normalize('htTps://foo.com/baz/bar')).toEqual('https://foo.com/baz/bar');
    expect(normalize('htTps://foo.com/baz/bar/../foo')).toEqual('https://foo.com/baz/foo');
  });
});
