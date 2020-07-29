import { startsWithWindowsDrive } from '../';

describe('startsWithWindowsDrive', () => {
  it.each(['c:\\foo\\bar.json', 'c:\\', 'c:/', 'c:/', '/C:/', '/C:\\', 'c:/foo/bar.json', 'c:\\', 'Z:\\', 'A:/'])(
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
