module.exports = {
  localhost: 'http://localhost:3344/',
  statusCode200: 200,
  validTransactionId: 'jskSD23wes324545F',
  requestTime: new Date().toISOString(),
  defaultResponseTime: 15000,
  uiAuthCodeEndpoint: 'authorization/auth-code',
  uiAuthCodeResponseSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      version: {
        type: 'string',
      },
      responseTime: {
        type: 'string',
      },
      response: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
          },
          redirectUri: {
            type: 'string',
          },
          nonce: {
            type: 'string',
          },
          state: {
            type: 'string',
          },
        },
        additionalProperties: false,
      },
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            errorCode: {
              type: 'string',
              enum: ['invalid_request', 'invalid_transaction'],
            },
            errorMessage: {
              type: 'string',
            },
          },
          additionalProperties: false,
        },
      },
    },
    additionalProperties: false,
  },
};
