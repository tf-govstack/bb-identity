const pactum = require("pactum");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const {
  localhost,
  requestTime,
  validScope,
  validResponseType,
  validClientId,
  validRedirectUri,
} = require("./helpers/helpers");

let specUIOAuthDetails;
let invalidScope;
let invalidResponseType;
let invalidClientId;
let invalidRedirectUri;

const baseUrl = `${localhost}authorization/oauth-details`;

const responseSchema = {
  type: "object",
  properties: {
    responseTime: { type: "string" },
    response: {
      type: "object",
      properties: {
        transactionId: { type: "string" },
        authFactors: {
          type: "array",
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  enum: ["PIN", "OTP", "L1-bio-device", "Wallet"],
                },
                count: { type: "integer" },
                bioSubTypes: { type: "array" },
              },
              required: ["type"],
              additionalProperties: false,
            },
          },
        },
        essentialClaims: {
          type: "array",
          items: [
            { type: "string" },
            {
              enum: [
                "name",
                "given_name",
                "middle_name",
                "preferred_username",
                "nickname",
                "gender",
                "birthdate",
                "email",
                "phone_number",
                "picture",
                "address",
              ],
            },
          ],
        },
      },
      required: ["transactionId", "authFactors", "essentialClaims"],
      additionalProperties: false,
    },
    errors: {},
  },
  required: ["response"],
  additionalProperties: false,
};

const requestFunction = (scope, responseType, clientId, redirectUri) =>
  specUIOAuthDetails.post(baseUrl).withBody({
    requestTime: requestTime,
    request: {
      scope: scope,
      responseType: responseType,
      clientId: clientId,
      redirectUri: redirectUri,
      display: "popup",
      prompt: "login",
      acrValues: "mosip:idp:acr:static-code mosip:idp:acr:generated-code",
      claims: {
        userinfo: {
          given_name: {
            essential: true,
          },
          phone: null,
          email: {
            essential: true,
          },
        },
        id_token: {},
      },
    },
  });

const resultFunction = async (withErrors = false) => {
  if (!withErrors) {
    responseSchema.properties.errors = { type: "null" };
  } else {
    responseSchema.properties.errors = {
      type: "array",
      items: {
        type: "object",
        properties: {
          errorCode: {
            type: "string",
            enum: [
              "invalid_client_id",
              "invalid_redirect_uri",
              "invalid_scope",
              "no_acr_registered",
              "unknown_error",
            ],
          },
          errorMessage: { type: "string" },
        },
      },
    };
  }

  specUIOAuthDetails.expectStatus(200).expectJsonSchema(responseSchema);
  await specUIOAuthDetails.toss();
};

Before(() => {
  specUIOAuthDetails = pactum.spec();
});

// Scenario: Successfully validates the provided request parameters and resolves the required authentication factors
Given(
  "The user wants to validate the provided request parameters and resolve the required authentication factors",
  () => "Every provided query parameters are valid"
);

When("The request with the required parameters is sent", () =>
  requestFunction(
    validScope,
    validResponseType,
    validClientId,
    validRedirectUri
  )
);

Then(
  "The user successfully validates the provided request parameters and resolves the required authentication factors",
  async () => {
    await resultFunction();
  }
);

// Scenario: The user is not able to validate the provided request parameters and resolve the required authentication factors because of an invalid scope provided
Given(
  "The user wants to validate the provided request parameters and resolve the required authentication factors with an invalid scope parameter",
  () => (invalidScope = "Invalid Scope")
);

When(
  "The user tries to trigger an action with an invalid scope parameter",
  () =>
    requestFunction(
      invalidScope,
      validResponseType,
      validClientId,
      validRedirectUri
    )
);

Then(
  "The result of an operation returns an error because an invalid scope parameter was specified",
  async () => await resultFunction(true)
);

// Scenario: The user is not able to validate the provided request parameters and resolve the required authentication factors because of an invalid clientId parameter
Given(
  "The user wants to validate the provided request parameters and resolve the required authentication factors with an invalid clientId parameter",
  () => (invalidClientId = "")
);

When("The user triggers an action with an invalid clientId parameter", () =>
  requestFunction(
    validScope,
    validResponseType,
    invalidClientId,
    validRedirectUri
  )
);

Then(
  "The result of an operation returns an error because an invalid clientId was specified",
  async () => await resultFunction(true)
);

// Scenario: The user is not able to validate the provided request parameters and resolve the required authentication factors because of an invalid responseType provided
Given(
  "The user wants to load the JS application and validates the provided query parameters using the OAuth-details endpoint with an invalid responseType parameter",
  () => (invalidResponseType = "Invalid response type")
);

When("The user triggers an action with an invalid responseType parameter", () =>
  requestFunction(
    validScope,
    invalidResponseType,
    validClientId,
    validRedirectUri
  )
);

Then(
  "The result of an operation returns an error because an invalid responseType was specified",
  async () => await resultFunction(true)
);

// Scenario: The user is not able to validate the provided request parameters and resolve the required authentication factors because of an invalid redirectUri provided
Given(
  "The user wants to validate the provided request parameters and resolve the required authentication factors with an invalid redirectUri parameter",
  () => (invalidRedirectUri = "")
);

When("The user triggers an action with an invalid redirectUri parameter", () =>
  requestFunction(
    validScope,
    validResponseType,
    validClientId,
    invalidRedirectUri
  )
);

Then(
  "The result of an operation returns an error because an invalid redirectUri was specified",
  async () => await resultFunction(true)
);

// Scenario: The user is not able to validate the provided request parameters and resolve the required authentication factors because none parameters provided
Given(
  "The user wants to validate the provided request parameters and resolve the required authentication factors without parameters",
  () => "None of the required parameters was provided."
);

When("The user triggers an action without the required parameters", () =>
  specUIOAuthDetails.post(baseUrl).withBody({})
);

Then(
  "The result of an operation returns an error because none required parameters was specified",
  async () => await resultFunction(true)
);

After(() => {
  specUIOAuthDetails.end();
});
