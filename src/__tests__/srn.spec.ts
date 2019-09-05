import { deserializeSrn, serializeSrn } from '../srn';

describe('deserializeSrn', () => {
  it('should work deserialize org srns', () => {
    expect(deserializeSrn('sl/org')).toEqual({
      shortcode: 'sl',
      orgSlug: 'org',
    });
  });

  it('should work deserialize project srns', () => {
    expect(deserializeSrn('sl/org/project')).toEqual({
      shortcode: 'sl',
      orgSlug: 'org',
      projectSlug: 'project',
    });
  });

  it('should work deserialize node srns', () => {
    expect(deserializeSrn('sl/org/project/reference/todos/openapi.yml')).toEqual({
      shortcode: 'sl',
      orgSlug: 'org',
      projectSlug: 'project',
      uri: '/reference/todos/openapi.yml',
      file: 'openapi.yml',
      ext: '.yml',
    });
  });

  it('should work deserialize file node srns', () => {
    expect(deserializeSrn('sl/org/project/reference/todos/openapi.yml/components/schemas/pet')).toEqual({
      shortcode: 'sl',
      orgSlug: 'org',
      projectSlug: 'project',
      uri: '/reference/todos/openapi.yml/components/schemas/pet',
      file: 'openapi.yml',
      ext: '.yml',
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
