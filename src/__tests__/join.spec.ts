import { join } from '../';

describe('join', () => {
  it('does some basic resolving', () => {
    expect(join('/foo/bar', '..', 'baz')).toEqual('/foo/baz');
  });

  it('treats URLs as file URIs', () => {
    expect(join('http://', 'foo', 'com')).toEqual('http:/foo/com');
  });
});
