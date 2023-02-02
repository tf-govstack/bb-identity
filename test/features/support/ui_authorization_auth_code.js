const pactum = require("pactum");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const {
  localhost,
  validTransactionId,
  requestTime,
} = require("./helpers/helpers");

let specUIAuthCode;
let invalidTransactionId;

const baseUrl = `${localhost}authorization/auth-code`;

const responseSchema = {
  type: "object",
  properties: {
    responseTime: {
      type: "string",
    },
    response: {
      type: "object",
      properties: {
        code: {
          type: "string",
        },
        redirectUri: {
          type: "string",
        },
        nonce: {
          type: "string",
        },
        state: {
          type: "string",
        },
      },
      additionalProperties: false,
    },
    errors: {},
  },
  additionalProperties: false,
};

const requestFunction = (transactionId) =>
  specUIAuthCode.post(baseUrl).withBody({
    requestTime: requestTime,
    request: {
      transactionId: transactionId,
      permittedAuthorizeScopes: ["string"],
      acceptedClaims: ["string"],
    },
  });

const responseValidator = async (withErrors = false) => {
  if (!withErrors) {
    responseSchema.properties.errors = { type: "array", maxItems: 0 };
  } else {
    responseSchema.properties.errors = {
      type: "array",
      items: {
        type: "object",
        properties: {
          errorCode: {
            type: "string",
            enum: ["invalid_request", "invalid_transaction"],
          },
          errorMessage: {
            type: "string",
          },
        },
        additionalProperties: false,
      },
    };
  }

  specUIAuthCode.expectStatus(200).expectJsonSchema(responseSchema);
  await specUIAuthCode.toss();
};

Before(() => {
  specUIAuthCode = pactum.spec();
  specUIAuthCode.expectResponseTime(1500);
});

// Scenario: Successfully receive the authorization code
Given(
  "The end-user wants to receive the authorization code",
  () => "Every required body parameters are valid"
);

When(
  "The end-user tries to trigger an action with the required parameters to receive the authorization code",
  () => requestFunction(validTransactionId)
);

Then(
  "The end-user successfully received the authorization code",
  async () => await responseValidator()
);

// Scenario: The user is not able to receive the authorization code because of an invalid transactionId parameter
Given(
  "The end-user wants to receive the authorization code with an invalid transactionId parameter",
  () => (invalidTransactionId = "")
);

When(
  "The end-user tries to trigger an action with an invalid transactionId to receive the authorization code",
  () => requestFunction(invalidTransactionId)
);

Then(
  "The result of an operation to receive the authorization code because an invalid transactionId was specified",
  async () => await responseValidator(true)
);

// Scenario: The user cannot get the authorization code because no parameter was specified
Given(
  "The end-user wants to obtain the authorization code without specifying a parameter",
  () => "None of the required parameters was provided."
);

When(
  "The end-user tries to trigger an action without specifying a parameter to receive the authorization code",
  () => specUIAuthCode.post(baseUrl).withBody()
);

Then(
  "The result of an operation to receive the authorization code because no parameter was specified",
  async () => await responseValidator(true)
);

After(() => {
  specUIAuthCode.end();
});
