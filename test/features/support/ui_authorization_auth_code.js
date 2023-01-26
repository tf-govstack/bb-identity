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

const requestFunction = (transactionId) =>
  specUIAuthCode.post(baseUrl).withBody({
    requestTime: requestTime,
    request: {
      transactionId: transactionId,
      permittedAuthorizeScopes: ["string"],
      acceptedClaims: ["string"],
    },
  });

const errorResultFunction = async () => {
  await specUIAuthCode.toss();
  specUIAuthCode.response().should.have.status(400);
  specUIAuthCode.response().should.have.jsonLike({
    responseTime: "string",
    response: null,
    errors: [
      {
        errorCode: "invalid_request",
        errorMessage: "string",
      },
    ],
  });
};

Before(() => {
  specUIAuthCode = pactum.spec();
});

// Scenario: Successfully receive the authorization code
Given(
  "The end-user wants to receive the authorization code",
  () => "Every required body parameters are valid"
);

When(
  "The end-user triggers an action with the required parameters to receive the authorization code",
  () => requestFunction(validTransactionId)
);

Then("The end-user successfully received the authorization code", async () => {
  await specUIAuthCode.toss();
  specUIAuthCode.toss();
  specUIAuthCode.response().should.have.status(200);
  specUIAuthCode.response().should.have.jsonLike({
    responseTime: "string",
    response: {
      code: "string",
      redirectUri: "string",
      nonce: "string",
      state: "string",
    },
  });
});

// Scenario: The user is not able to receive the authorization code because of an invalid transactionId parameter
Given(
  "The user wants to receive the authorization code with an invalid transactionId parameter",
  () => (invalidTransactionId = "")
);

When(
  "The user triggers an action with an invalid transactionId to receive the authorization code",
  () => requestFunction(invalidTransactionId)
);

Then(
  "The result of an operation to receive the authorization code because of an invalid transactionId provided",
  async () => await errorResultFunction()
);

// Scenario: The user cannot get the authorization code because no parameter was specified
Given(
  "The user wants to obtain the authorization code without specifying a parameter",
  () => "None of the required parameters was provided."
);

When(
  "The user triggers an action without specifying a parameter to receive the authorization code",
  () => specUIAuthCode.post(baseUrl).withBody()
);

Then(
  "The result of an operation to receive the authorization code because no parameter was specified",
  async () => await errorResultFunction()
);

After(() => {
  specUIAuthCode.end();
});
