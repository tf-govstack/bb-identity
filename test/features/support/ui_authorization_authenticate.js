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

const errorResultFunction = async (transactionId, errorCode) => {
  await specUIAuthAuthenticate.toss();
  specUIAuthAuthenticate.response().should.have.status(400);
  specUIAuthAuthenticate.response().should.have.jsonLike({
    responseTime: "string",
    response: {
      transactionId: transactionId,
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
  specUIAuthAuthenticate = pactum.spec();
});

// Scenario: Successfully authenticate after authentication using the OTP auth factor
Given(
  "The end-user wants to authenticate after authenticating using the OTP auth factor",
  () => "Every required body parameters are valid"
);

When("The end-user triggers an action with the required parameters", () =>
  requestFunction(validTransactionId, validIndividualId)
);

Then(
  "The end-user successfully authenticates after authenticating using the OTP auth factor",
  async () => {
    await specUIAuthAuthenticate.toss();
    specUIAuthAuthenticate.toss();
    specUIAuthAuthenticate.response().should.have.status(200);
    specUIAuthAuthenticate.response().should.have.jsonLike({
      responseTime: "string",
      response: {
        transactionId: validTransactionId,
      },
    });
  }
);

// Scenario: The user is not able to authenticate after authentication using the OTP auth factor because of an invalid transactionId parameter
Given(
  "The user wants to authenticate after authenticating using the OTP auth factor with an invalid transactionId parameter",
  () => (invalidTransactionId = "")
);

When("The user triggers an action with an invalid transactionId", () =>
  requestFunction(invalidTransactionId, validIndividualId)
);

Then(
  "The result of an operation to authenticate returns an error because of an invalid transactionId provided",
  async () => {
    await errorResultFunction(invalidTransactionId, "invalid_transaction_id");
  }
);

// Scenario: The user is not able to authenticate after authentication using the OTP auth factor because an invalid individualId provided
Given(
  "The user wants to authenticate after authenticating using the OTP auth factor with an invalid individualId parameter",
  () => (invalidIndividualId = "")
);

When("The user triggers an action with an invalid individualId", () =>
  requestFunction(validTransactionId, invalidIndividualId)
);

Then(
  "The result of an operation to authenticate returns an error because an invalid individualId provided",
  async () => {
    await errorResultFunction(validTransactionId, "invalid_individual_id");
  }
);

// Scenario: The user is not able to authenticate after authentication using the OTP auth factor because none parameters provided
Given(
  "The user wants to authenticate after authenticating using the OTP auth factor without parameters",
  () => "None of the required parameters was provided."
);

When("The user triggers an action with an empty body payload", () =>
  specUIAuthAuthenticate.post(baseUrl).withBody()
);

Then(
  "The result of an operation to authenticate returns an error because none parameters provided to the payload",
  async () => {
    await errorResultFunction(null, "invalid_request");
  }
);

After(() => {
  specUIAuthAuthenticate.end();
});
