import { deserializeSrn, serializeSrn } from '../srn';

describe('deserializeSrn', () => {
  it('should work deserialize project srns', () => {
    expect(deserializeSrn('sl/org/project')).toEqual({
      shortcode: 'sl',
      orgSlug: 'org',
      projectSlug: 'project',
      uri: '',
      ext: '',
      file: '',
    });
  });

  it('should work deserialize node srns', () => {
    expect(deserializeSrn('sl/org/project/reference/todos/openapi.yml')).toEqual({
      shortcode: 'sl',
      orgSlug: 'org',
      projectSlug: 'project',
      uri: '/reference/todos/openapi.yml',
      file: '/reference/todos/openapi.yml',
      ext: '.yml',
    });
  });
});

describe('serializeSrn', () => {
  it('should serialize project srns', () => {
    expect(
      serializeSrn({
        shortcode: 'sl',
        orgSlug: 'org',
        projectSlug: 'project',
        uri: '/',
      }),
    ).toEqual('sl/org/project');
  });

  it('should serialize node srns', () => {
    expect(
      serializeSrn({
        shortcode: 'sl',
        orgSlug: 'org',
        projectSlug: 'project',
        uri: '/reference/todos/openapi.yml',
      }),
    ).toEqual('sl/org/project/reference/todos/openapi.yml');
  });
});
