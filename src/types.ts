export interface IPath {
  protocol: 'file' | 'http' | 'https';
  implicitProtocol: boolean;
  origin: string | null;
  absolute: boolean;
  drive: string | null;
  path: string[];
  basename: string;
  ext: string | null;
}
