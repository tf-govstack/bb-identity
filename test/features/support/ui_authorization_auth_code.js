const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  defaultResponseTime,
  uiAuthCodeEndpoint,
  uiAuthCodeResponseSchema,
  statusCode200,
  requestTime,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

let specUIAuthCode;
const baseUrl = localhost + uiAuthCodeEndpoint;
const tag = { tags: `@endpoint=/${uiAuthCodeEndpoint}` };

const requestFunction = (transactionId, permittedAuthorizeScopes, acceptedClaims) =>
  specUIAuthCode.post(baseUrl).withBody({
    requestTime: requestTime,
    request: {
      transactionId: transactionId,
      permittedAuthorizeScopes: permittedAuthorizeScopes,
      acceptedClaims: acceptedClaims,
    },
  });

Before(tag, () => {
  specUIAuthCode = spec();
});

// Scenario: Successfully retrieve the authorization code
Given(
  'The end-user wants to send the accepted consent and permitted scopes via JS application',
  () => 'The end-user wants to send the accepted consent and permitted scopes via JS application'
);

When(
  'POST request with given current date as requestTime {string} as transactionId {string} as permittedAuthorizeScopes {string} as acceptedClaims is sent',
  (transactionId, permittedAuthorizeScopes, acceptedClaims) => {
    const scopes = permittedAuthorizeScopes.split(',').map((scope) => {
      return scope.trim();
    });
    const claims = acceptedClaims.split(',').map((claim) => {
      return claim.trim();
    });
    requestFunction(transactionId, scopes, claims);
  }
);

Then('The response is received', async () => await specUIAuthCode.toss());

Then('The response should be returned in a timely manner', () =>
  specUIAuthCode.response().to.have.responseTimeLessThan(defaultResponseTime)
);

Then('The response should match json schema', () =>
  chai.expect(specUIAuthCode._response.json).to.be.jsonSchema(uiAuthCodeResponseSchema)
);

Then('The response should contain authorization code', () => {
  chai
    .expect(specUIAuthCode._response.json.response.code)
    .to.be.a('string', 'Invalid type of the authorization code in the response');
  chai.expect(specUIAuthCode._response.json.response.code).to.not.be.empty;
});

Then('The response should have status 200', () =>
  specUIAuthCode.response().to.have.status(statusCode200)
);

Then('The response header content-type should be {string}', (header_value) =>
  specUIAuthCode.response().to.have.header('content-type', header_value)
);

// Scenario: Unable to retrieve the authorization code because of an invalid transactionId parameter
// Code for this scenario is written in the aforementioned example

// Scenario: Unable to retrieve the authorization code because no parameter was specified
// The rest of the code is written in the aforementioned example
When('POST request without payload is sent', () => specUIAuthCode.post(baseUrl).withBody());

After(tag, () => {
  specUIAuthCode.end();
});
