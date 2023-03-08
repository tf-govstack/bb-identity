module.exports = {
  localhost: 'http://localhost:3344/',
  statusCode200: 200,
  statusCode401: 401,
  defaultResponseTime: 15000,
  oidcIntrospectEndpoint: 'introspect',
  oidcIntrospectActiveTokenSchema: {
    type: 'object',
    properties: {
      active: { type: 'boolean' },
    },
    required: ['active'],
  },
  oidcIntrospectInactiveTokenSchema: {
    type: 'object',
    properties: {
      active: { type: 'boolean' },
    },
    additionalProperties: false,
    required: ['active'],
  },
  oidcIntrospectUnauthorizedSchema: {
    type: 'object',
    properties: {
      error: { type: 'string' },
      error_description: { type: 'string' },
    },
    required: ['error', 'error_description'],
  },
};
