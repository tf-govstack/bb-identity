module.exports = {
  localhost: 'http://localhost:3333/',
  contentTypeHeader: {
    key: 'content-type',
    value: 'application/json; charset=utf-8',
  },
  defaultExpectedResponseTime: 15000,
  transactionId: 'transactionId01',
  X_XSRF_TOKEN: {
    key: 'X-XSRF-TOKEN',
    value: 'X-XSRF-TOKEN',
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
  // client_create
  clientCreateEndpoint: 'client-mgmt/oidc-client',
  // client_update
  clientUpdateEndpoint: 'client-mgmt/oidc-client/{client_id}',
  // oidc_authorize
  oidcAuthorizeEndpoint: 'authorize',
  // wallet_generate_link_code
  walletGenerateLinkCodeEndpoint: 'linked-authorization/link-code',
  walletGenerateLinkCodeResponseSchema: {
    type: 'object',
    properties: {
      responseTime: { type: 'string' },
      response: {
        type: 'object',
        properties: {
          transactionId: { type: 'string' },
          linkCode: { type: 'string' },
          expireDateTime: { type: 'string' },
        },
      },
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            errorCode: {
              type: 'string',
              enum: [
                'invalid_transaction_id',
                'link_code_gen_failed',
                'invalid_transaction',
              ],
              errorMessage: { type: 'string' },
            },
          },
        },
      },
    },
  },
  // wallet_generate_link_code
  walletGenerateLinkCodeEndpoint: 'linked-authorization/link-code',
  walletGenerateLinkCodeResponseSchema: {
    type: 'object',
    properties: {
      responseTime: { type: 'string' },
      response: {
        type: 'object',
        properties: {
          transactionId: { type: 'string' },
          linkCode: { type: 'string' },
          expireDateTime: { type: 'string' },
        },
      },
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            errorCode: {
              type: 'string',
              enum: [
                'invalid_transaction_id',
                'link_code_gen_failed',
                'invalid_transaction',
              ],
              errorMessage: { type: 'string' },
            },
          },
        },
      },
    },
  },
  // wallet_link_status
  walletLinkStatusEndpoint: 'linked-authorization/link-status',
  walletLiskStatusResponseSchema: {
    type: 'object',
    properties: {
      responseTIme: { type: 'string' },
      response: {
        type: 'object',
        properties: {
          transactionId: { type: 'string' },
          linkStatus: {
            type: 'string',
            enum: ['LINKED'],
          },
          linkedDateTime: { type: 'string' },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                errorCode: {
                  type: 'string',
                  enum: [
                    'invalid_transaction_id',
                    'invalid_link_code',
                    'response_timeout',
                    'unknown_error',
                  ],
                  errorMessage: { type: 'string' },
                },
              },
            },
          },
        },
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
                enum: this.clientCreateErrorCodeEnum,
              },
              errorMessage: { type: 'string' },
            },
            additionalProperties: false,
          },
        },
      },
    },
  },
  clientCreateErrorCodeEnum: [
    'duplicate_client_id',
    'invalid_public_key',
    'invalid_input',
    'invalid_client_id',
    'invalid_client_name',
    'invalid_rp_id',
    'invalid_claim',
    'invalid_acr',
    'invalid_uri',
    'invalid_redirect_uri',
    'invalid_grant_type',
    'invalid_client_auth',
  ],
};
