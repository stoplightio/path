import { join } from '../join.js';

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

  it.each`
    args                             | result
    ${['.', 'x/b', '..', 'b/c.js']}  | ${'x/b/c.js'}
    ${[]}                            | ${'.'}
    ${['/.', 'x/b', '..', 'b/c.js']} | ${'/x/b/c.js'}
    ${['/foo', '../../../bar']}      | ${'/bar'}
    ${['foo', '../../../bar']}       | ${'../../bar'}
    ${['foo/', '../../../bar']}      | ${'../../bar'}
    ${['foo/x', '../../../bar']}     | ${'../bar'}
    ${['foo/x', './bar']}            | ${'foo/x/bar'}
    ${['foo/x/', './bar']}           | ${'foo/x/bar'}
    ${['foo/x/', '.', 'bar']}        | ${'foo/x/bar'}
    ${['./']}                        | ${'.'}
    ${['.', './']}                   | ${'.'}
    ${['.', '.', '.']}               | ${'.'}
    ${['.', './', '.']}              | ${'.'}
    ${['.']}                         | ${'.'}
    ${['', '.']}                     | ${'.'}
    ${['', 'foo']}                   | ${'foo'}
    ${['foo', './bar']}              | ${'foo/bar'}
    ${['', '', 'foo']}               | ${'foo'}
    ${['foo', '']}                   | ${'foo'}
    ${['foo/', '']}                  | ${'foo'}
    ${['foo', '', 'bar']}            | ${'foo/bar'}
    ${['./', '..', 'foo']}           | ${'../foo'}
    ${['./', '..', '..', './foo']}   | ${'../../foo'}
    ${['.', '..', '..', 'foo']}      | ${'../../foo'}
    ${['', '..', '..', 'foo']}       | ${'../../foo'}
    ${['/']}                         | ${'/'}
    ${['/', '.']}                    | ${'/'}
    ${['/', '..']}                   | ${'/'}
    ${['/', '..', '..']}             | ${'/'}
    ${['']}                          | ${'.'}
    ${['', '']}                      | ${'.'}
    ${[' /foo']}                     | ${' /foo'}
    ${[' ', 'foo']}                  | ${' /foo'}
    ${[' ', '.']}                    | ${' '}
    ${[' ', '']}                     | ${' '}
    ${['/', 'foo']}                  | ${'/foo'}
  `('joins $args', ({ args, result }) => {
    expect(join(...args)).toBe(result);
  });

  it.each`
    args
    ${['.', '/./', '.']}
    ${['.', '/////./', '.']}
    ${['', '/foo']}
    ${['', '', '/foo']}
    ${[' ', '/']}
    ${['/', '/foo']}
    ${['/', '//foo']}
    ${['/', '', '/foo']}
    ${['', '/', 'foo']}
    ${['', '/', '/foo']}
  `('join($args) to throw', ({ args }) => {
    expect(() => join(...args)).toThrow();
  });
});
