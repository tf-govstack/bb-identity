const chai = require('chai');
const { spec } = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const {
  localhost,
  contentTypeHeader,
  defaultExpectedResponseTime,
  walletGenerateLinkCodeEndpoint,
  X_XSRF_TOKEN,
  transactionId,
  walletGenerateLinkCodeResponseSchema,
} = require('./helpers/helpers');

chai.use(require('chai-json-schema'));

let specWalletGenerateLinkCode;

const baseUrl = localhost + walletGenerateLinkCodeEndpoint;
const endpointTag = { tags: `@endpoint=/${walletGenerateLinkCodeEndpoint}` };

Before(endpointTag, () => {
  specWalletGenerateLinkCode = spec();
});

// Scenario: Successfully generates link code smoke type test
Given('Wants to generate link code', () => 'Wants to generate link code');

When(
  'Send POST \\/linked-authorization\\/link-code request with given X-XSRF-TOKEN header, transactionId and requestTime',
  () =>
    specWalletGenerateLinkCode
      .post(baseUrl)
      .withHeaders(X_XSRF_TOKEN.key, X_XSRF_TOKEN.value)
      .withJson({
        requestTime: new Date().toISOString(),
        request: {
          transactionId: transactionId,
        },
      })
);

Then(
  'Receive a response from the \\/linked-authorization\\/link-code endpoint',
  async () => await specWalletGenerateLinkCode.toss()
);

Then(
  'The \\/linked-authorization\\/link-code endpoint response should be returned in a timely manner 15000ms',
  () =>
    specWalletGenerateLinkCode
      .response()
      .to.have.responseTimeLessThan(defaultExpectedResponseTime)
);

Then(
  'The \\/linked-authorization\\/link-code endpoint response should have status 200',
  () => specWalletGenerateLinkCode.response().to.have.status(200)
);

Then(
  'The \\/linked-authorization\\/link-code endpoint response should have content-type: application\\/json header',
  () =>
    specWalletGenerateLinkCode
      .response()
      .should.have.header(contentTypeHeader.key, contentTypeHeader.value)
);

Then(
  'The \\/linked-authorization\\/link-code endpoint response should match json schema',
  () => {
    walletGenerateLinkCodeResponseSchema.properties.errors = [];
    chai
      .expect(specWalletGenerateLinkCode._response.json)
      .to.be.jsonSchema(walletGenerateLinkCodeResponseSchema);
  }
);

Then(
  'The \\/linked-authorization\\/link-code response should contain transactionId property equals provided transactionId',
  () =>
    chai
      .expect(specWalletGenerateLinkCode._response.json.response.transactionId)
      .to.be.equal(transactionId)
);
