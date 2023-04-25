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
  oidcWellKnownOpenidConfigurationEndpoint: '.well-known/openid-configuration',
  oidcWellKnownOpenidConfigurationSchema: {
    type: 'object',
    properties: {
      issuer: { type: 'string' },
      authorization_endpoint: { type: 'string' },
      token_endpoint: { type: 'string' },
      userinfo_endpoint: { type: 'string' },
      jwks_uri: { type: 'string' },
      registration_endpoint: { type: 'string' },
      scopes_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      response_types_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      acr_values_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      userinfo_signing_alg_values_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      userinfo_encryption_alg_values_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      userinfo_encryption_enc_values_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      token_endpoint_auth_methods_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      display_values_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      claim_types_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      claims_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      claims_locales_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      ui_locales_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      response_modes_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      token_endpoint_auth_signing_alg_values_supported: {
        type: 'array',
        items: { type: 'string' },
      },
      id_token_signing_alg_values_supported: {
        type: 'array',
        items: { type: 'string' },
      },
    },
    required: [
      'issuer',
      'authorization_endpoint',
      'token_endpoint',
      'userinfo_endpoint',
      'jwks_uri',
      'registration_endpoint',
      'scopes_supported',
      'response_types_supported',
    ],
  },
  //jwks
  oidcWellKnownJWKSEndpoint: '.well-known/jwks.json',
  oidcWellKnownJWKSResponseSchema: {
    type: 'object',
    properties: {
      keys: {
        type: 'array',
        items: [
          {
            type: 'object',
            properties: {
              kid: { type: 'string' },
              alg: {
                type: 'string',
                enum: ['RS256'],
              },
              use: {
                type: 'string',
                enum: ['sig'],
              },
              kty: {
                type: 'string',
                enum: ['RSA'],
              },
              e: { type: 'string' },
              n: { type: 'string' },
              status: {
                type: 'string',
                enum: ['ACTIVE', 'EXPIRED', 'NEXT'],
              },
              x5c: { type: 'string' },
            },
            required: ['kid', 'alg', 'use', 'kty', 'e', 'n'],
          },
        ],
      },
    },
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
