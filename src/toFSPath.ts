import { URI } from 'vscode-uri';
import { normalize } from './normalize';

export const toFSPath = (uri: string) => normalize(URI.file(uri).fsPath);
