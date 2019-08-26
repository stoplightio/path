import { extname } from './extname';

export interface IDeserializedSrn {
  shortcode: string;
  orgSlug: string;
  projectSlug: string;
  uri?: string;
  file?: string;
  ext?: string;
}

export function deserializeSrn(srn: string): IDeserializedSrn {
  const [shortcode, orgSlug, projectSlug, ...uriParts] = srn.split('/');

  const uri = uriParts.length ? `/${uriParts.join('/')}` : ``;
  const file = uri
    .split(/(\.(?:json|ya?ml|md))/)
    .slice(0, -1)
    .join('');

  return {
    shortcode,
    orgSlug,
    projectSlug,
    uri,
    file,
    ext: extname(file),
  };
}

export function serializeSrn({ shortcode, orgSlug, projectSlug, uri = '' }: IDeserializedSrn): string {
  return [shortcode, orgSlug, projectSlug, uri.replace(/^\//, '')].filter(Boolean).join('/');
}
