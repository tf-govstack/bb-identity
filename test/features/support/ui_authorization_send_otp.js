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

const requestFunction = (transactionId, individualId, channel) =>
  specUIAuthSendOTP.post(baseUrl).withBody({
    requestTime: requestTime,
    request: {
      transactionId: transactionId,
      individualId: individualId,
      channel: channel,
    },
  });

const errorResultFunction = async (transactionId, errorCode) => {
  await specUIAuthSendOTP.toss();
  specUIAuthSendOTP.response().should.have.status(400);
  specUIAuthSendOTP.response().should.have.jsonLike({
    responseTime: "string",
    response: {
      transactionId: transactionId,
      messageCode: "string",
    },
    errors: [
      {
        errorCode: errorCode,
        errorMessage: "string",
      },
    ],
  });
};

Before(() => {
  specUIAuthSendOTP = pactum.spec();
});

// Scenario: Successfully authenticate using OTP auth factor.
Given(
  "The end-user wants to authenticate using OTP auth factor",
  () => "Every required body parameters are valid"
);

When("The end-user triggers an action with every required parameter", () =>
  requestFunction(validTransactionId, validIndividualId, validChannel)
);

Then(
  "The end-user successfully authenticates using OTP auth factor",
  async () => {
    await specUIAuthSendOTP.toss(),
      specUIAuthSendOTP.toss(),
      specUIAuthSendOTP.response().should.have.status(200),
      specUIAuthSendOTP.response().should.have.jsonLike({
        responseTime: "string",
        response: {
          transactionId: validTransactionId,
          messageCode: "string",
        },
        errors: [],
      });
  }
);

// Scenario: The user is not able to authenticate using OTP auth factor because of an invalid transactionId provided
Given(
  "The user wants to authenticate using OTP auth factor with an invalid transactionId parameter",
  () => (invalidTransactionId = "")
);

When(
  "The user triggers an action with an invalid transactionId parameter",
  () => requestFunction(invalidTransactionId, validIndividualId, validChannel)
);

Then(
  "The result of an operation returns an error because of an invalid transactionId provided",
  async () =>
    await errorResultFunction(invalidTransactionId, "invalid_transaction_id")
);

// Scenario: The user is not able to authenticate using OTP auth factor because of an invalid individualId provided
Given(
  "The user wants to authenticate using OTP auth factor with an invalid individualId parameter",
  () => (invalidIndividualId = "")
);

When("The user triggers an action with an invalid individualId parameter", () =>
  requestFunction(validTransactionId, invalidIndividualId, validChannel)
);

Then(
  "The result of an operation returns an error because of an invalid individualId provided",
  async () =>
    await errorResultFunction(validTransactionId, "invalid_individual_id")
);

// Scenario: The user is not able to authenticate using OTP auth factor because of an invalid channel provided
Given(
  "The user wants to authenticate using OTP auth factor with an invalid channel parameter",
  () => (invalidChannel = "phone")
);

When("The user triggers an action with an invalid channel parameter", () =>
  requestFunction(validTransactionId, validIndividualId, invalidChannel)
);

Then(
  "The result of an operation returns an error because of an invalid channel provided",
  async () => await errorResultFunction(validTransactionId, "invalid_channel")
);

// Scenario: The user is not able to authenticate using OTP auth factor because none parameters provided
Given(
  "The user wants to authenticate using OTP auth factor without parameters",
  () => "None of the required parameters was provided."
);

When("The user triggers an action with an empty payload", () =>
  specUIAuthSendOTP.post(baseUrl)
);

Then(
  "The result of an operation returns an error because none parameters provided to the payload",
  async () => await errorResultFunction(null, "empty_body")
);

After(() => {
  specUIAuthSendOTP.end();
});
