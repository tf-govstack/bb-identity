const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  clientUpdateEndpoint,
  clientCreateEndpoint,
  defaultExpectedResponseTime,
  contentTypeHeader,
  clientResponseSchema,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

let requestPayload;
let specClientCreate;
let specClientUpdate;
let clientId;

const baseUrl = localhost + clientUpdateEndpoint;
const endpointTag = { tags: `@endpoint=/${clientUpdateEndpoint}` };

// const requestFunction = (clientId) =>
//   specClientUpdate
//     .put(baseUrl)
//     .withPathParams('client_id', clientId)
//     .withBody(requestPayload);

Before(endpointTag, () => {
  specClientCreate = spec();
  specClientUpdate = spec();
});

// Background:
// Given(
//   'The user wants to update the client profile in the Open ID Connect \\(OIDC)',
//   () => {
//     requestPayload = {
//       requestTime: '2022-09-22T08:03:45.000Z',
//       request: {
//         clientName: 'Health Service',
//         status: 'active',
//         logoUri: 'http://example.com',
//         redirectUris: ['http://example.com'],
//         userClaims: ['name'],
//         authContextRefs: ['mosip:idp:acr:static-code'],
//         grantTypes: ['authorization_code'],
//         clientAuthMethods: ['private_key_jwt'],
//       },
//     };

//     return requestPayload;
//   }
// );

// Scenario: The client profile is successfully updated in the Open ID Connect (OIDC) smoke type test
Given(
  'The user wants to update the client profile in the Open ID Connect \\(OIDC)',
  () =>
    'The user wants to update the client profile in the Open ID Connect (OIDC)'
);

Given(
  'The client profile with {string} as clientId is created',
  async (clientId) => {
    specClientCreate.post(localhost + clientCreateEndpoint).withJson({
      requestTime: '2011-10-05T14:48:00.000Z',
      request: {
        clientId: clientId,
        clientName: 'Health Service',
        relyingPartyId: 'bharath-gov',
        logoUri: 'http://example.com',
        publicKey: {},
        authContextRefs: ['idbb:acr:generated-code'],
        userClaims: ['name'],
        grantTypes: ['authorization_code'],
        clientAuthMethods: ['private_key_jwt'],
      },
    });
    await specClientCreate.toss();
    return (clientId = specClientCreate._response.json.response.clientId);
  }
);

When(
  'User sends PUT request with given {string} as client_id parameter, {string} as requestTime, {string} as clientName, {string} as status, {string} as logoUri, {string} as redirectUris, {string} as userClaims, {string} as authContextRefs, {string} as grantTypes, {string} as clientAuthMethods',
  (
    client_id,
    requestTime,
    clientName,
    status,
    logoUri,
    redirectUris,
    userClaims,
    authContextRefs,
    grantTypes,
    clientAuthMethods
  ) =>
    specClientUpdate
      .put(baseUrl)
      .withPathParams('client_id', client_id)
      .withBody({
        requestTime: requestTime,
        request: {
          clientName: clientName,
          status: status,
          logoUri: logoUri,
          redirectUris: [redirectUris],
          userClaims: [userClaims],
          authContextRefs: [authContextRefs],
          grantTypes: [grantTypes],
          clientAuthMethods: [clientAuthMethods],
        },
      })
);

Then(
  'User receives a response from the PUT \\/client-mgmt\\/oidc-client\\/\\{client_id} endpoint',
  async () => await specClientUpdate.toss()
);

Then(
  'The PUT \\/client-mgmt\\/oidc-client\\/\\{client_id} endpoint response should be returned in a timely manner 15000ms',
  () =>
    specClientUpdate
      .response()
      .to.have.responseTimeLessThan(defaultExpectedResponseTime)
);

Then(
  'The PUT \\/client-mgmt\\/oidc-client\\/\\{client_id} endpoint response should have status 200',
  () => specClientUpdate.response().to.have.status(200)
);

Then(
  'The PUT \\/client-mgmt\\/oidc-client\\/\\{client_id} endpoint response should have content-type: application\\/json header',
  () =>
    specClientUpdate
      .response()
      .should.have.header(contentTypeHeader.key, contentTypeHeader.value)
);

Then(
  'The PUT \\/client-mgmt\\/oidc-client\\/\\{client_id} endpoint response should match json schema',
  () => {
    clientResponseSchema.properties.response.errors = [];
    chai
      .expect(specClientUpdate._response.json)
      .to.be.jsonSchema(clientResponseSchema);
  }
);

Then(
  'The PUT \\/client-mgmt\\/oidc-client\\/\\{client_id} endpoint response should contain {string} as clientId',
  (clientId) =>
    chai
      .expect(specClientCreate._response.json.response.clientId)
      .to.be.equal(clientId)
);

After(endpointTag, () => {
  specClientCreate.end();
  specClientUpdate.end();
});
