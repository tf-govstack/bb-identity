const { spec, stash } = require("pactum");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { localhost } = require("./helpers/helpers");

const baseUrl = `${localhost}introspect`;

let specIntrospect;

stash.addDataTemplate({
  QueryParams: {
    client_id: "string",
    token: "string.string.string",
    token_type_hint: "access_token",
  },
});

stash.addDataTemplate({
  ResponseSchemaOK: {
    type: "object",
    properties: {
      active: { type: "boolean" },
    },
    required: ["active"],
    additionalProperties: true,
  },
});

stash.addDataTemplate({
  ResponseSchemaUnauthorized: {
    type: "object",
    properties: {
      error: { type: "string" },
      error_description: { type: "string" },
    },
    required: ["error", "error_description"],
    additionalProperties: false,
  },
});

const resultFunction = async (
  expectedStatus,
  schemaToUse,
  allowAdditionalProperties
) => {
  specIntrospect.expectStatus(expectedStatus).expectJsonSchema({
    "@DATA:TEMPLATE@": schemaToUse,
    "@OVERRIDES@": {
      additionalProperties: allowAdditionalProperties,
    },
  });

  await specIntrospect.toss();
};

Before(() => {
  specIntrospect = spec().expectResponseTime(15000);
});

// Background
Given(
  "Wants to recieve the status of the token",
  () => "Wants to recieve the status of the token"
);

// Scenario: The endpoint is called with the valid parameters and returns an active status
When("The request is sent with valid parameters", () =>
  specIntrospect
    .get(baseUrl)
    .withQueryParams({ "@DATA:TEMPLATE@": "QueryParams" })
);

Then(
  "The operation returns an active status of the token",
  async () => await resultFunction(200, "ResponseSchemaOK", true)
);

// Scenario: The endpoint is called with an invalid token parameter and returns an inactive status
When("The request is sent with an invalid token parameter", () =>
  specIntrospect.get(baseUrl).withQueryParams({
    "@DATA:TEMPLATE@": "QueryParams",
    "@OVERRIDES@": {
      token: "string.string",
    },
  })
);

Then(
  "The operation returns an inactive status of the token",
  async () => await resultFunction(200, "ResponseSchemaOK", false)
);

// Scenario: The endpoint is called with an invalid token_type_hint parameter and returns an unauthorized error
When("The request is sent with an invalid token_type_hint parameter", () =>
  specIntrospect.get(baseUrl).withQueryParams({
    "@DATA:TEMPLATE@": "QueryParams",
    "@OVERRIDES@": {
      token_type_hint: "invalidType",
    },
  })
);

Then(
  "The operation returns an error because of invalid token_type_hint parameter",
  async () => await resultFunction(401, "ResponseSchemaUnauthorized", false)
);

// Scenario: The endpoint is called with an invalid client_id parameter and returns an unauthorized error
When("The request is sent with an invalid client_id parameter", () =>
  specIntrospect.get(baseUrl).withQueryParams({
    "@DATA:TEMPLATE@": "QueryParams",
    "@REMOVES@": ["client_id"],
  })
);

Then(
  "The operation returns an error because of invalid client_id parameter",
  async () => await resultFunction(401, "ResponseSchemaUnauthorized", false)
);

// Scenario: The endpoint is called without the required parameters and returns an unauthorized error
When("The request is sent without the required parameters", () =>
  specIntrospect.get(baseUrl)
);

Then(
  "The operation returns an error because no parameters were specified",
  async () => await resultFunction(401, "ResponseSchemaUnauthorized", false)
);

After(() => {
  specIntrospect.end();
});
