const pactum = require("pactum");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const {
  localhost,
  requestTime,
  validTransactionId,
  validIndividualId,
  validChannel,
} = require("./helpers/helpers");

let specUIAuthSendOTP;
let invalidTransactionId;
let invalidIndividualId;
let invalidChannel;

const baseUrl = `${localhost}authorization/send-otp`;

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
        messageCode: {
          type: "string",
        },
      },
      required: ["transactionId"],
      additionalProperties: false,
    },
    errors: {},
  },
  required: ["response"],
  additionalProperties: false,
};

const requestFunction = (transactionId, individualId, channel) =>
  specUIAuthSendOTP.post(baseUrl).withBody({
    requestTime: requestTime,
    request: {
      transactionId: transactionId,
      individualId: individualId,
      channel: channel,
    },
  });

const responseValidator = async (withErrors = false) => {
  if (!withErrors) {
    responseSchema.properties.errors = { type: "array", maxItems: 0 };
  } else {
    responseSchema.properties.response = { type: "null" };
    responseSchema.properties.errors = {
      type: "array",
      items: {
        type: "object",
        properties: {
          errorCode: {
            type: "string",
            enum: ["invalid_transaction", "invalid_request"],
          },
          errorMessage: {
            type: "string",
          },
        },
        additionalProperties: false,
      },
    };
  }

  specUIAuthSendOTP.expectStatus(200).expectJsonSchema(responseSchema);
  await specUIAuthSendOTP.toss();
};

Before(() => {
  specUIAuthSendOTP = pactum.spec();
  specUIAuthSendOTP.expectResponseTime(1500);
});

// Scenario: Successfully authenticate using OTP auth factor.
Given(
  "The end-user wants to authenticate using OTP auth factor",
  () => "Every required body parameters are valid"
);

When("The user tries to trigger an action with every required parameter", () =>
  requestFunction(validTransactionId, validIndividualId, validChannel)
);

Then(
  "The end-user successfully authenticates using OTP auth factor",
  async () => await responseValidator()
);

// Scenario: The user is not able to authenticate using OTP auth factor because of an invalid transactionId provided
Given(
  "The user wants to authenticate using OTP auth factor with an invalid transactionId parameter",
  () => (invalidTransactionId = "")
);

When(
  "The user tries to trigger an action with an invalid transactionId parameter",
  () => requestFunction(invalidTransactionId, validIndividualId, validChannel)
);

Then(
  "The result of an operation returns an error because an invalid transactionId was specified",
  async () => await responseValidator(true)
);

// Scenario: The user is not able to authenticate using OTP auth factor because of an invalid individualId provided
Given(
  "The user wants to authenticate using OTP auth factor with an invalid individualId parameter",
  () => (invalidIndividualId = "")
);

When(
  "The user tries to trigger an action with an invalid individualId parameter",
  () => requestFunction(validTransactionId, invalidIndividualId, validChannel)
);

Then(
  "The result of an operation returns an error because an invalid individualId was specified",
  async () => await responseValidator(true)
);

// Scenario: The user is not able to authenticate using OTP auth factor because of an invalid channel provided
Given(
  "The user wants to authenticate using OTP auth factor with an invalid channel parameter",
  () => (invalidChannel = "phone")
);

When(
  "The user tries to trigger an action with an invalid channel parameter",
  () => requestFunction(validTransactionId, validIndividualId, invalidChannel)
);

Then(
  "The result of an operation returns an error because an invalid channel was specified",
  async () => await responseValidator(true)
);

// Scenario: The user is not able to authenticate using OTP auth factor because none parameters provided
Given(
  "The user wants to authenticate using OTP auth factor without parameters",
  () => "None of the required parameters was provided."
);

When("The user tries to trigger an action with an empty payload", () =>
  specUIAuthSendOTP.post(baseUrl)
);

Then(
  "The result of an operation returns an error because none parameters were specified to the payload",
  async () => await responseValidator(true)
);

After(() => {
  specUIAuthSendOTP.end();
});
