module.exports = {
  localhost: 'http://localhost:3344/',
  statusCode200: 200,
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
              kid: {
                type: 'string',
              },
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
              e: {
                type: 'string',
              },
              n: {
                type: 'string',
              },
              status: {
                type: 'string',
                enum: ['ACTIVE', 'EXPIRED', 'NEXT'],
              },
              x5c: {
                type: 'string',
              },
            },
            required: ['kid', 'alg', 'use', 'kty', 'e', 'n'],
          },
        ],
      },
    },
  },
};
