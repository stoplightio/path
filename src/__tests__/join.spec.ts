import { join } from '../';

describe('join', () => {
  it('does some basic resolving', () => {
    expect(join('/foo/bar', '..', 'baz')).toEqual('/foo/baz');
  });

  it('treats URLs as file URIs', () => {
    expect(join('https://foo.test', 'com', 'baz')).toEqual('/com/baz');
  });
});
