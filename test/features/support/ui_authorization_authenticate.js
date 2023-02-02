const pactum = require("pactum");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const {
  localhost,
  requestTime,
  validTransactionId,
  validIndividualId,
} = require("./helpers/helpers");

let specUIAuthAuthenticate;
let invalidTransactionId;
let invalidIndividualId;

const baseUrl = `${localhost}authorization/authenticate`;

const responseSchema = {
  type: "object",
  properties: {
    responseTime: {
      type: "string",
    },
    response: {
      type: "object",
      properties: {
        transactionId: {
          type: "string",
        },
      },
      additionalProperties: false,
    },
    errors: {},
  },
  additionalProperties: false,
};

const requestFunction = (transactionId, individualId) =>
  specUIAuthAuthenticate.post(baseUrl).withBody({
    requestTime: requestTime,
    request: {
      transactionId: transactionId,
      individualId: individualId,
      challengeList: [
        {
          authFactorType: "pin",
          challenge: "string",
        },
      ],
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
            enum: ["invalid_transaction", "auth_failed", "invalid_request"],
          },
          errorMessage: {
            type: "string",
          },
        },
        additionalProperties: false,
      },
    };
  }

  specUIAuthAuthenticate.expectStatus(200).expectJsonSchema(responseSchema);
  await specUIAuthAuthenticate.toss();
};

Before(() => {
  specUIAuthAuthenticate = pactum.spec();
});

// Scenario: Successfully authenticate after authentication using the OTP auth factor
Given(
  "The end-user wants to authenticate after authenticating using the OTP auth factor",
  () => "Every required body parameters are valid"
);

When(
  "The end-user tries to trigger an action with the required parameters",
  () => requestFunction(validTransactionId, validIndividualId)
);

Then(
  "The end-user successfully authenticates after authenticating using the OTP auth factor",
  async () => await responseValidator()
);

// Scenario: The user is not able to authenticate after authentication using the OTP auth factor because of an invalid transactionId was specified
Given(
  "The end-user wants to authenticate after authenticating using the OTP auth factor with an invalid transactionId parameter",
  () => (invalidTransactionId = "")
);

When(
  "The end-user tries to trigger an action with an invalid transactionId",
  () => requestFunction(invalidTransactionId, validIndividualId)
);

Then(
  "The result of an operation to authenticate returns an error because an invalid transactionId was specified",
  async () => await responseValidator(true)
);

// Scenario: The user is not able to authenticate after authentication using the OTP auth factor because an invalid individualId was specified
Given(
  "The end-user wants to authenticate after authenticating using the OTP auth factor with an invalid individualId parameter",
  () => (invalidIndividualId = "")
);

When(
  "The end-user tries to trigger an action with an invalid individualId",
  () => requestFunction(validTransactionId, invalidIndividualId)
);

Then(
  "The result of an operation to authenticate returns an error because an invalid individualId was specified",
  async () => await responseValidator(true)
);

// Scenario: The user is not able to authenticate after authentication using the OTP auth factor because none parameters were specified
Given(
  "The end-user wants to authenticate after authenticating using the OTP auth factor without parameters",
  () => "None of the required parameters was provided."
);

When("The end-user tries to trigger an action with an empty body payload", () =>
  specUIAuthAuthenticate.post(baseUrl).withBody()
);

Then(
  "The result of an operation to authenticate returns an error because none parameters were specified to the payload",
  async () => await responseValidator(true)
);

After(() => {
  specUIAuthAuthenticate.end();
});
