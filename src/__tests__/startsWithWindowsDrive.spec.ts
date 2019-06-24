import { startsWithWindowsDrive } from '../';

describe('startsWithWindowsDrive', () => {
  it.each(['c:\\foo\\bar.json', 'c:\\', 'c:/', 'c:/foo/bar.json', 'c:\\'])(
    'recognizes driver letter in %s',
    filepath => {
      expect(startsWithWindowsDrive(filepath)).toBe(true);
    },
  );

  it.each(['0:\\foo\\bar.json', ' :\\', 'c:a', 'z\\\\', '', 'c:', 'c'])(
    'does not detect driver letter in %s',
    filepath => {
      expect(startsWithWindowsDrive(filepath)).toBe(false);
    },
  );
});
