import { parseBase } from './parseBase';

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
    file = uriParts.find(part => part.includes('.'));

    if (file) {
      ext = parseBase(file).ext;
    }
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
