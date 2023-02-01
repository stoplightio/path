import { resolve } from '../resolve.js';

describe('resolve', () => {
  describe('handles POSIX paths', () => {
    it.each`
      segments                                      | result
      ${['/var/lib', '../', 'file/']}               | ${'/var/file'}
      ${['a/b/c/', '../../..']}                     | ${'.'}
      ${['.']}                                      | ${'.'}
      ${['/some/dir', '.', '/absolute/']}           | ${'/absolute'}
      ${['/foo/tmp.3/', '../tmp.3/cycles/root.js']} | ${'/foo/tmp.3/cycles/root.js'}
    `('handles resolve($segments)', ({ segments, result }) => {
      expect(resolve(...segments)).toEqual(result);
    });
  });

  describe('handles win32 paths', () => {
    it.each`
      segments                                              | result
      ${['c:/blah\\blah', '../a']}                          | ${'c:/blah/a'}
      ${['d:\\a/b\\c/d', 'e.exe']}                          | ${'d:/a/b/c/d/e.exe'}
      ${['c:/some/file']}                                   | ${'c:/some/file'}
      ${['d:/ignore', 'some/dir//']}                        | ${'d:/ignore/some/dir'}
      ${['.']}                                              | ${'.'}
      ${['//server/share', '..', 'relative\\']}             | ${'/server/relative'}
      ${['c:/', '//']}                                      | ${'/'}
      ${['c:/', '//dir']}                                   | ${'/dir'}
      ${['c:/', '//server/share']}                          | ${'/server/share'}
      ${['c:/', '//server//share']}                         | ${'/server/share'}
      ${['c:/', '///some//dir']}                            | ${'/some/dir'}
      ${['C:\\foo\\tmp.3\\', '..\\tmp.3\\cycles\\root.js']} | ${'c:/foo/tmp.3/cycles/root.js'}
    `('handles resolve($segments)', ({ segments, result }) => {
      expect(resolve(...segments)).toEqual(result);
    });
  });
});
