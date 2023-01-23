const pactum = require("pactum");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { localhost } = require("./helpers/helpers");

let specUIOAuthDetails;
let invalidScope;
let invalidResponseType;
let invalidClientId;
let invalidRedirectUri;

const baseUrl = `${localhost}authorization/oauth-details`;

const validScope = "openid profile";
const validResponseType = "code";
const validClientId = "1245435";
const validRedirectUri = "http://example.com";
const requestTime = new Date().toISOString();

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

const errorResultFunction = async (errorMessage) => {
  await specUIOAuthDetails.toss();
  specUIOAuthDetails.response().should.have.status(400);
  specUIOAuthDetails.response().should.have.jsonLike({
    responseTime: "2022-09-22T08:03:45.287Z",
    response: null,
    errors: [
      {
        errorCode: errorMessage,
      },
    ],
  });
};

Before(() => {
  specUIOAuthDetails = pactum.spec();
});

// Scenario: Successfully validates the provided request parameters and resolves the required authentication factors
Given(
  "The user wants to validate the provided request parameters and resolve the required authentication factors",
  () => "Every provided query parameters are valid"
);

When("The user triggers an action with the required parameters", () => {
  requestFunction(
    validScope,
    validResponseType,
    validClientId,
    validRedirectUri
  );
});

Then(
  "The user successfully validates the provided request parameters and resolve the required authentication factors",
  async () => {
    await specUIOAuthDetails.toss();
    specUIOAuthDetails.response().should.have.status(200);
    specUIOAuthDetails.response().should.have.jsonLike({
      responseTime: "2022-09-22T08:03:45.287Z",
      response: {
        transactionId: "string",
        authFactors: [
          {
            type: "PIN",
          },
        ],
        essentialClaims: ["all claims"],
      },
      errors: [],
    });
  }
);

// Scenario: The user is not able to validate the provided request parameters and resolve the required authentication factors because of an invalid scope provided
Given(
  "The user wants to validate the provided request parameters and resolve the required authentication factors with an invalid scope parameter",
  () => (invalidScope = "Invalid Scope")
);

When(
  "The user tries to trigger an action with an invalid scope parameter",
  () => {
    requestFunction(
      invalidScope,
      validResponseType,
      validClientId,
      validRedirectUri
    );
  }
);

Then(
  "The result of an operation returns an error because of an invalid scope parameter provided",
  async () => {
    await errorResultFunction("invalid_scope");
  }
);

// Scenario: The user is not able to validate the provided request parameters and resolve the required authentication factors because of an invalid clientId parameter
Given(
  "The user wants to validate the provided request parameters and resolve the required authentication factors with an invalid clientId parameter",
  () => (invalidClientId = "")
);

When("The user triggers an action with an invalid clientId parameter", () => {
  requestFunction(
    validScope,
    validResponseType,
    invalidClientId,
    validRedirectUri
  );
});

Then(
  "The result of an operation returns an error, because of an invalid clientId provided",
  async () => {
    await errorResultFunction("invalid_client_id");
  }
);

// Scenario: The user is not able to validate the provided request parameters and resolve the required authentication factors because of an invalid responseType provided
Given(
  "The user wants to load the JS application and validates the provided query parameters using the OAuth-details endpoint with an invalid responseType parameter",
  () => (invalidResponseType = "Invalid response type")
);

When(
  "The user triggers an action with an invalid responseType parameter",
  () => {
    requestFunction(
      validScope,
      invalidResponseType,
      validClientId,
      validRedirectUri
    );
  }
);

Then(
  "The result of an operation returns an error because of an invalid responseType provided",
  async () => {
    await errorResultFunction("invalid_response_type");
  }
);

// Scenario: The user is not able to validate the provided request parameters and resolve the required authentication factors because of an invalid redirectUri provided
Given(
  "The user wants to validate the provided request parameters and resolve the required authentication factors with an invalid redirectUri parameter",
  () => (invalidRedirectUri = "")
);

When(
  "The user triggers an action with an invalid redirectUri parameter",
  () => {
    requestFunction(
      validScope,
      validResponseType,
      validClientId,
      invalidRedirectUri
    );
  }
);

Then(
  "The result of an operation returns an error because of an invalid redirectUri provided",
  async () => {
    await errorResultFunction("invalid_redirect_uri");
  }
);

// Scenario: The user is not able to validate the provided request parameters and resolve the required authentication factors because none parameters provided
Given(
  "The user wants to validate the provided request parameters and resolve the required authentication factors without parameters",
  () => "None of the required parameters was provided."
);

When("The user triggers an action without the required parameters", () => {
  specUIOAuthDetails.post(baseUrl).withBody({});
});

Then(
  "The result of an operation returns an error because none required parameters provided",
  async () => {
    await errorResultFunction("invalid_body");
  }
);

After(() => {
  specUIOAuthDetails.end();
});
