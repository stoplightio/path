const WINDOWS_DRIVE_REGEXP = /^[A-Za-z]:[/\\]/;

export const startsWithWindowsDrive = (str: string) => str.length > 2 && WINDOWS_DRIVE_REGEXP.test(str);
