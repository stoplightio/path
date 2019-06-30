import { relative } from '../';

describe('relative', () => {
  it('handles POSIX URIs', () => {
    expect(relative('/test/bar/a', '/test/foo/c')).toEqual('../../foo/c');
    // expect(relative('~/test/bar', '~/test/foo')).toEqual('../foo');
  });

  it('handles Windows URIs', () => {
    expect(relative('c:\\test\\baz', 'C:\\test\\foo')).toEqual('../foo');
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
