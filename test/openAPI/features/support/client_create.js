const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  defaultExpectedResponseTime,
  contentTypeHeader,
  clientCreateEndpoint,
  clientResponseSchema,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

let requestPayload;
let specClientCreate;

const baseUrl = localhost + clientCreateEndpoint;
const endpointTag = { tags: `@endpoint=/${clientCreateEndpoint}` };

Before(endpointTag, () => {
  specClientCreate = spec();
});

const requestFunction = () =>
  specClientCreate.post(baseUrl).withBody(requestPayload);

// Background:
Given(
  'The user wants to add the new client to the Open ID Connect \\(OIDC)',
  () => 'The user wants to add the new client to the Open ID Connect (OIDC)'
);

requestPayload = {
  requestTime: '2011-10-05T14:48:00.000Z',
  request: {
    clientId: 'e-health-service',
    clientName: 'Health Service',
    relyingPartyId: 'bharath-gov',
    logoUri: 'http://example.com',
    publicKey: {},
    authContextRefs: ['mosip:idp:acr:static-code'],
    userClaims: ['name'],
    grantTypes: ['authorization_code'],
    clientAuthMethods: ['private_key_jwt'],
  },
};
// Scenario: The new client is successfully added to the Open ID Connect (OIDC)
When(
  'When User sends POST request with given {string} as requestTime, {string} as clientId, {string} as clientName, {string} as relyingPartyId, {string} as logoUri, empty object as publicKey, {string} as authContextRefs, {string} as userClaims, {string} as grantTypes, {string} as clientAuthMethods',
  (
    requestTime,
    clientId,
    clientName,
    relyingPartyId,
    logoUri,
    authContextRefs,
    userClaims,
    grantTypes,
    clientAuthMethods
  ) =>
    specClientCreate.post(baseUrl).withJson({
      requestTime: requestTime,
      request: {
        clientId: clientId,
        clientName: clientName,
        relyingPartyId: relyingPartyId,
        logoUri: logoUri,
        publicKey: {},
        authContextRefs: [authContextRefs],
        userClaims: [userClaims],
        grantTypes: [grantTypes],
        clientAuthMethods: [clientAuthMethods],
      },
    })
);

Then(
  'User receives a response from the POST \\/client-mgmt\\/oidc-client endpoint',
  async () => await specClientCreate.toss()
);

Then(
  'The POST \\/client-mgmt\\/oidc-client endpoint response should be returned in a timely manner 15000ms',
  () =>
    specClientCreate
      .response()
      .to.have.responseTimeLessThan(defaultExpectedResponseTime)
);

Then(
  'The POST \\/client-mgmt\\/oidc-client endpoint response should have status 200',
  () => specClientCreate.response().to.have.status(200)
);

Then(
  'The POST \\/client-mgmt\\/oidc-client endpoint response should have content-type: application\\/json header',
  () =>
    specClientCreate
      .response()
      .should.have.header(contentTypeHeader.key, contentTypeHeader.value)
);

Then(
  'The POST \\/client-mgmt\\/oidc-client endpoint response should match json schema',
  () =>
    chai
      .expect(specClientCreate._response.json)
      .to.be.jsonSchema(clientResponseSchema)
);

// Scenario Outline: The new client is successfully added to the Open ID Connect (OIDC)
// Given, When, Then for this scenario are written in the aforementioned example

// Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of invalid requestTime
// Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of invalid authContextRefs
// Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of invalid userClaims
// Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of invalid grantTypes
// Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of invalid clientAuthMethods

After(endpointTag, () => {
  specClientCreate.end();
});
