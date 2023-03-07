const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  statusCode200,
  defaultResponseTime,
  oidcWellKnownJWKSEndpoint,
  oidcWellKnownJWKSResponseSchema,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

let specJWKS;
const baseUrl = localhost + oidcWellKnownJWKSEndpoint;
const tag = { tags: `@endpoint=/${oidcWellKnownJWKSEndpoint}` };

Before(tag, () => {
  specJWKS = spec();
});

// Scenario: Successfully retrieves the IdP server's public keys
Given(
  "Wants to retrieve the IdP server's public keys",
  () => "Wants to retrieve the IdP server's public keys"
);

When('GET request to retrieve all the public keys of the IdP server is sent', () =>
  specJWKS.get(baseUrl)
);

Then('The response is received', async () => await specJWKS.toss());

Then('The response should be returned in a timely manner', () =>
  specJWKS.response().to.have.responseTimeLessThan(defaultResponseTime)
);

Then('The response should have status 200', () =>
  specJWKS.response().to.have.status(statusCode200)
);

Then('The response header content-type should be {string}', (header_value) =>
  specJWKS.response().to.have.header('content-type', header_value)
);

Then('The response should match json schema', () =>
  chai
    .expect(specJWKS._response.json)
    .to.be.jsonSchema(
      oidcWellKnownJWKSResponseSchema,
      'Response body does not match with the json-schema\n'
    )
);

After(tag, () => {
  specJWKS.end();
});
