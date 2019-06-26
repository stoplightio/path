import { relative } from '../';

describe('relative', () => {
  it('handles POSIX URIs', () => {
    expect(relative('/test/bar/a', '/test/foo/c')).toEqual('../../foo/c');
    expect(relative('~/test/bar', '~/test/foo')).toEqual('../foo');
  });

  it('handles Windows URIs', () => {
    expect(relative('c:\\test\\baz', 'C:\\test\\foo')).toEqual('../C:/test/foo');
  });

  it('handles mixed slashes', () => {
    expect(relative('/test\\baz', '/test\\foo')).toEqual('../test/foo');
  });

  it('handles URLs', () => {
    expect(relative('http://stoplight.io/bar/foo', 'http://stoplight.io/')).toEqual('bar/foo');
    expect(relative('http://stoplight.io/bar/foo/baz', 'http://stoplight.io/bar/z/x')).toEqual('../foo/baz');
  });

  it('handles different origins', () => {
    expect(relative('/a/bar/c', '/x/foo/c')).toEqual('../../../x/foo/c');
    expect(relative('http://stoplight.io/bar/foo/baz', 'https://stop.bar/bar/z/x')).toEqual(
      'http://stoplight.io/bar/foo/baz',
    );
  });
});
