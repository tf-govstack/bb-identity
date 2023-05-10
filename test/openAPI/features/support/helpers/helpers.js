module.exports = {
  localhost: 'http://localhost:3333/',
  contentTypeHeader: {
    key: 'content-type',
    value: 'application/json; charset=utf-8',
  },
  defaultExpectedResponseTime: 15000,
  oauthTokenEndpoint: 'oauth/token',
  //shares
  clientResponseSchema: {
    type: 'object',
    properties: {
      responseTime: { type: 'string' },
      response: {
        type: 'object',
        properties: { clientId: { type: 'string' } },
        errors: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              errorCode: {
                type: 'string',
              },
              errorMessage: { type: 'string' },
            },
            additionalProperties: false,
          },
        },
      },
    },
  },
};
