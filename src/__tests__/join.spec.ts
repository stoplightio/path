import { join } from '../';

describe('join', () => {
  it('does some basic resolving', () => {
    expect(join('/foo/bar', '..', 'baz')).toEqual('/foo/baz');
    expect(join('c:/foo/bar', '..', 'baz')).toEqual('c:/foo/baz');
  });

  it('handles mixed slashes', () => {
    expect(join('/test\\baz', 'foo/d')).toEqual('/test/baz/foo/d');
  });

  it('handles URLs', () => {
    expect(join('https://foo.com/pets', '..', 'users', '123')).toEqual('https://foo.com/users/123');
    expect(join('https://foo.test', 'com', 'baz')).toEqual('https://foo.test/com/baz');
  });
});
