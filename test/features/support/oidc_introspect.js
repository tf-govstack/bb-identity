const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  statusCode200,
  statusCode401,
  defaultResponseTime,
  oidcIntrospectEndpoint,
  oidcIntrospectActiveTokenSchema,
  oidcIntrospectInactiveTokenSchema,
  oidcIntrospectUnauthorizedSchema,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

let specIntrospect;
const baseUrl = localhost + oidcIntrospectEndpoint;
const tag = { tags: `@endpoint=/${oidcIntrospectEndpoint}` };

Before(tag, () => {
  specIntrospect = spec();
});

// Scenario: The endpoint is called with the valid parameters and returns an active status smoke type test
Given(
  'Wants to retrieve the status of the token',
  () => 'Wants to retrieve the status of the token'
);

When(
  'GET request with given {string} as client_id {string} as token {string} as token_type_hint is sent',
  (clientId, token, tokenTypeHint) =>
    specIntrospect
      .get(baseUrl)
      .withQueryParams({ client_id: clientId, token: token, token_type_hint: tokenTypeHint })
);

Then('The response is received', async () => await specIntrospect.toss());

Then('The response should be returned in a timely manner', () =>
  specIntrospect.response().to.have.responseTimeLessThan(defaultResponseTime)
);

Then('The response should have status 200', () =>
  specIntrospect.response().to.have.status(statusCode200)
);

Then('The response header content-type should be {string}', (header_value) =>
  specIntrospect.response().to.have.header('content-type', header_value)
);

Then('The response should match json schema - active token', () =>
  chai.expect(specIntrospect._response.json).to.be.jsonSchema(oidcIntrospectActiveTokenSchema)
);

// Scenario Outline: The endpoint is called with the valid parameters and returns an active status
// Code for this scenario is written in the aforementioned example

// Scenario Outline: The endpoint is c- active tokenalled with an invalid token parameter and returns an inactive status
// The rest of the code is written in the aforementioned example
Then('The response should match json schema - inactive token', () =>
  chai.expect(specIntrospect._response.json).to.be.jsonSchema(oidcIntrospectInactiveTokenSchema)
);

// Scenario Outline: The endpoint is called with an invalid client_id parameter and returns an unauthorized error
// The rest of the code is written in the aforementioned example
Then('The response should have status 401', () =>
  specIntrospect.response().to.have.status(statusCode401)
);

Then('The response should match json schema - unauthorized', () =>
  chai.expect(specIntrospect._response.json).to.be.jsonSchema(oidcIntrospectUnauthorizedSchema)
);

After(tag, () => {
  specIntrospect.end();
});
