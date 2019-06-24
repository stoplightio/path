import { relative } from '../';

describe('relative', () => {
  it('handles URLs', () => {
    expect(relative('http://stoplight.io/bar/foo', 'http://stoplight.io/')).toEqual('bar/foo');
    expect(relative('http://stoplight.io/bar/foo/baz', 'http://stoplight.io/bar/z/x')).toEqual('../foo/baz');
  });
});
