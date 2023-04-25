module.exports = {
  localhost: 'http://localhost:3333/',
  contentTypeHeader: {
    key: 'content-type',
    value: 'application/json; charset=utf-8',
  },
  defaultResponseTime: 15000,
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
              'x5t#S256': { type: 'string' },
              x5c: { type: 'string' },
              exp: { type: 'string' },
            },
            required: ['kid', 'use', 'kty', 'e', 'n', 'x5t#S256', 'x5c', 'exp'],
          },
        ],
      },
    },
  },
};
