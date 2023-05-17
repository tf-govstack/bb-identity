module.exports = {
  localhost: 'http://localhost:3333/',
  contentTypeHeader: {
    key: 'content-type',
    value: 'application/json; charset=utf-8',
  },
  defaultExpectedResponseTime: 15000,
  // oauth_token
  oauthTokenEndpoint: 'oauth/token',
  oauthTokenResponse: {
    type: "object",
    properties: {
      id_token: { type: "string" },
      access_token: { type: "string" },
      token_type: { type: "string" },
      expires_in: { type: "number" }
    },
    required: [
      "id_token",
      "access_token",
      "token_type",
      "expires_in"
    ]
  },
  oauthTokenErrorResponse: {
    type: "object",
    properties: {
      error: { type: "string" },
      error_description: { type: "string" }
    },
    required: [
      "error",
      "error_description"
    ]
  },
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
