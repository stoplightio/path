import { extname } from '../extname.js';

describe('extname', () => {
  it.each`
    path                    | expected
    ${__filename}           | ${'.ts'}
    ${''}                   | ${''}
    ${'/path/to/file'}      | ${''}
    ${'/path/to/file.ext'}  | ${'.ext'}
    ${'/path.to/file.ext'}  | ${'.ext'}
    ${'/path.to/file'}      | ${''}
    ${'/path.to/.file'}     | ${''}
    ${'/path.to/.file.ext'} | ${'.ext'}
    ${'/path/to/f.ext'}     | ${'.ext'}
    ${'/path/to/..ext'}     | ${'.ext'}
    ${'/path/to/..'}        | ${''}
    ${'file'}               | ${''}
    ${'file.ext'}           | ${'.ext'}
    ${'.file'}              | ${''}
    ${'.file.ext'}          | ${'.ext'}
    ${'/file'}              | ${''}
    ${'/file.ext'}          | ${'.ext'}
    ${'/.file'}             | ${''}
    ${'/.file.ext'}         | ${'.ext'}
    ${'.path/file.ext'}     | ${'.ext'}
    ${'file.ext.ext'}       | ${'.ext'}
    ${'file.'}              | ${'.'}
    ${'.'}                  | ${''}
    ${'./'}                 | ${''}
    ${'.file.ext'}          | ${'.ext'}
    ${'.file'}              | ${''}
    ${'.file.'}             | ${'.'}
    ${'.file..'}            | ${'.'}
    ${'..'}                 | ${''}
    ${'../'}                | ${''}
    ${'..file.ext'}         | ${'.ext'}
    ${'..file'}             | ${'.file'}
    ${'..file.'}            | ${'.'}
    ${'..file..'}           | ${'.'}
    ${'...'}                | ${'.'}
    ${'...ext'}             | ${'.ext'}
    ${'....'}               | ${'.'}
    ${'file.ext/'}          | ${'.ext'}
    ${'file.ext//'}         | ${'.ext'}
    ${'file/'}              | ${''}
    ${'file//'}             | ${''}
    ${'file./'}             | ${'.'}
    ${'file.//'}            | ${'.'}
  `('computes extname of $path', ({ path, expected }) => {
    expect(extname(path)).toBe(expected);
  });
});
