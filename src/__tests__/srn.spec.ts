import { deserializeSrn, serializeSrn } from '../srn.js';

describe('deserializeSrn', () => {
  it('should work deserialize org srn', () => {
    expect(deserializeSrn('sl/org')).toEqual({
      shortcode: 'sl',
      orgSlug: 'org',
    });
  });

  it('should work deserialize project srn', () => {
    expect(deserializeSrn('sl/org/project')).toEqual({
      shortcode: 'sl',
      orgSlug: 'org',
      projectSlug: 'project',
    });
  });

  it('should work deserialize node srn', () => {
    expect(deserializeSrn('sl/org/project/reference/todos/openapi.yml')).toEqual({
      shortcode: 'sl',
      orgSlug: 'org',
      projectSlug: 'project',
      uri: '/reference/todos/openapi.yml',
      file: 'openapi.yml',
      ext: '.yml',
    });
  });

  it('should work deserialize node srn two dots in file', () => {
    expect(deserializeSrn('sl/org/project/reference/todos/openapi.v1.yml')).toEqual({
      shortcode: 'sl',
      orgSlug: 'org',
      projectSlug: 'project',
      uri: '/reference/todos/openapi.v1.yml',
      file: 'openapi.v1.yml',
      ext: '.yml',
    });
  });

  it('should work deserialize node srn with extended uri parts', () => {
    expect(deserializeSrn('sl/org/project/reference/todos/openapi.yml/components/schemas/pet')).toEqual({
      shortcode: 'sl',
      orgSlug: 'org',
      projectSlug: 'project',
      uri: '/reference/todos/openapi.yml/components/schemas/pet',
      file: 'openapi.yml',
      ext: '.yml',
    });
  });

  it('should work deserialize node srn with dot in uri path', () => {
    expect(deserializeSrn('sl/org/project/reference/stoplight/openapi.v1.yaml/paths/~1nodes.get/get')).toEqual({
      shortcode: 'sl',
      orgSlug: 'org',
      projectSlug: 'project',
      uri: '/reference/stoplight/openapi.v1.yaml/paths/~1nodes.get/get',
      file: 'openapi.v1.yaml',
      ext: '.yaml',
    });
  });
});

describe('serializeSrn', () => {
  it('should serialize org srns', () => {
    expect(
      serializeSrn({
        shortcode: 'sl',
        orgSlug: 'org',
      }),
    ).toEqual('sl/org');
  });

  it('should serialize project srns', () => {
    expect(
      serializeSrn({
        shortcode: 'sl',
        orgSlug: 'org',
        projectSlug: 'project',
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
