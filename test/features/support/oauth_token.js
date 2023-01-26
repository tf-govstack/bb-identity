const { stash, spec } = require("pactum");
const chai = require("chai");
const { like, regex } = require("pactum-matchers");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { localhost } = require("./helpers/helpers");
const { jsonToBase64 } = require("./helpers/utils");

const base64ToJson = (base64String) => {
  const jsonString = Buffer.from(base64String, "base64").toString();
  return JSON.parse(jsonString);
};

// client_assertion is a string in JWT format that has required claims: iss, sub, aud, exp, iat
stash.addDataTemplate({
  ValidRequestBody: {
    grant_type: "authorization_code",
    client_assertion_type:
      "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
    client_assertion:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
      jsonToBase64({
        iss: "string",
        sub: "string",
        aud: "string",
        exp: 2016240000,
        iat: 1516239022,
        name: "string",
      }) +
      ".C5YtmxEhZfc0ZXmBv9msTPDmKnnLK0d5esho3CB_we8",
    client_id: "string",
    code: "string",
    redirect_uri: "http://example.com",
  },
});

let specOAuthToken;

const baseUrl = `${localhost}oauth/token`;

const errorResultFunction = async (errorMessage) => {
  specOAuthToken.expectStatus(400).expectJsonMatch({
    error: errorMessage,
  });

  await specOAuthToken.toss();
};

Before(() => {
  specOAuthToken = spec().expectResponseTime(15000);
});

// Background: The user successfully receives the ID and access token using the OAuth token endpoint
Given(
  "The user wants to receive the ID and access token using the OAuth token endpoint",
  () => {
    return "The user wants to receive the ID and access token using the OAuth token endpoint";
  }
);

// Scenario: The user successfully receives the ID and access token using the OAuth token endpoint
When(
  "The user triggers an action to receive the ID and access token with the valid payload",
  () => {
    // add .inspect() to see request/response body
    specOAuthToken
      .post(baseUrl)
      .withJson({ "@DATA:TEMPLATE@": "ValidRequestBody" });
  }
);

Then(
  "The user successfully receives the ID and access token using the OAuth token endpoint",
  async () => {
    specOAuthToken
      .expectStatus(200)
      .expectJsonMatch({
        id_token: regex(
          "string.string.string",
          /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]+)/
        ),
        access_token: regex(
          "string.string.string",
          /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]+)/
        ),
        token_type: "Bearer",
        expires_in: like(0),
      })
      .expectHeader("cache-control", "no-store")
      .expectHeader("pragma", "no-cache");

    await specOAuthToken.toss();

    const responseObject = specOAuthToken._response.json;
    const id_tokenPayloadEncodedB64 = responseObject.id_token.split(".")[1];
    const id_tokenPayloadDecoded = base64ToJson(id_tokenPayloadEncodedB64);

    let claimsCounter = 0;
    Object.keys(id_tokenPayloadDecoded).forEach((key) => {
      if (
        key.match(
          /^iss$|^sub|^aud$|^exp$|^iat$|^auth_time$|^nonce$|^acr$|^at_hash$/
        )
      ) {
        claimsCounter++;
      }
    });

    chai
      .expect(
        claimsCounter,
        "id_token claims does not match with required claims"
      )
      .to.be.equals(9);
  }
);

// Scenario: The user is not able to receive the ID and access token because of the invalid client_assertion_type
When(
  "The user triggers an action to receive the ID and access token with the invalid client_assertion_type",
  () => {
    specOAuthToken.post(baseUrl).withJson({
      "@DATA:TEMPLATE@": "ValidRequestBody",
      "@OVERRIDES@": {
        client_assertion_type: "invalidAssertionType",
      },
    });
  }
);

Then(
  "The result of an operation returns an error because of the invalid client_assertion_type",
  async () => {
    await errorResultFunction("invalid_assertion_type");
  }
);

// Scenario: The user is not able to receive the ID and access token because of the invalid assertion
When(
  "The user triggers an action to receive the ID and access token with the invalid assertion",
  () => {
    specOAuthToken.post(baseUrl).withJson({
      "@DATA:TEMPLATE@": "ValidRequestBody",
      "@OVERRIDES@": {
        client_assertion: "invalidAssertion",
      },
    });
  }
);

Then(
  "The result of an operation returns an error because of the invalid assertion",
  async () => {
    await errorResultFunction("invalid_assertion");
  }
);

// Scenario: The user is not able to receive the ID and access token because of the invalid redirect_uri
When(
  "The user triggers an action to receive the ID and access token with the invalid redirect_uri",
  () => {
    specOAuthToken.post(baseUrl).withJson({
      "@DATA:TEMPLATE@": "ValidRequestBody",
      "@OVERRIDES@": {
        redirect_uri: "differentUriThanAuthorize",
      },
    });
  }
);

Then(
  "The result of an operation returns an error because of the invalid redirect_uri",
  async () => {
    await errorResultFunction("invalid_redirect_uri");
  }
);

// Scenario: The user is not able to receive the ID and access token because of the invalid input
When(
  "The user triggers an action to receive the ID and access token with the invalid input",
  () => {
    specOAuthToken.post(baseUrl).withJson({
      "@DATA:TEMPLATE@": "ValidRequestBody",
      "@OVERRIDES@": { code: null },
    });
  }
);

Then(
  "The result of an operation returns an error because of the invalid input",
  async () => {
    await errorResultFunction("invalid_input");
  }
);

// Scenario: The user is not able to receive the ID and access token because of the empty payload
When(
  "The user triggers an action to receive the ID and access token with the empty payload",
  () => {
    specOAuthToken.post(baseUrl);
  }
);

Then(
  "The result of an operation returns an error because of the empty payload",
  async () => {
    await errorResultFunction("invalid_request");
  }
);

// Scenario: The user is not able to receive the ID and access token because of the invalid payload
When(
  "The user triggers an action to receive the ID and access token with the invalid payload",
  () => {
    specOAuthToken.post(baseUrl).withJson({
      "@DATA:TEMPLATE@": "ValidRequestBody",
      "@REMOVES@": ["client_id"],
    });
  }
);

Then(
  "The result of an operation returns an error because of the invalid payload",
  async () => {
    await errorResultFunction("invalid_request");
  }
);

After(() => {
  specOAuthToken.end();
});
