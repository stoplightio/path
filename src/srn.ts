import { basename } from './basename';
import { extname } from './extname';

export interface IDeserializedSrn {
  shortcode: string;
  orgSlug: string;
  projectSlug?: string;
  uri?: string;
  file?: string;
  ext?: string;
}

export function deserializeSrn(srn: string): IDeserializedSrn {
  const [shortcode, orgSlug, projectSlug, ...uriParts] = srn.split('/');

  const uri = uriParts.length ? `/${uriParts.join('/')}` : undefined;

  let file;
  let ext;
  if (uri) {
    ext = extname(uri);
    file = basename(uri);
  }

  return {
    shortcode,
    orgSlug,
    projectSlug,
    uri,
    file,
    ext,
  };
}

export function serializeSrn({ shortcode, orgSlug, projectSlug, uri = '' }: IDeserializedSrn): string {
  return [shortcode, orgSlug, projectSlug, uri.replace(/^\//, '')].filter(Boolean).join('/');
}
