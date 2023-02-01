export interface IPath {
  protocol: 'file' | 'http' | 'https' | 'stoplight' | null;
  origin: string | null;
  absolute: boolean;
  drive: string | null;
  path: string[];
}
