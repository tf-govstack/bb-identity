const { stash, spec } = require("pactum");
const { regex } = require("pactum-matchers");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { localhost } = require("./helpers/helpers");
const { jsonToBase64 } = require("./helpers/utils");

const baseUrl = `${localhost}oidc/userinfo`;

stash.addDataTemplate({
  Bearer: {
    Authorization:
      "Bearer " +
      jsonToBase64({
        alg: "HS256",
        typ: "JWT",
      }) +
      "." +
      jsonToBase64({
        iss: "string",
        "sub - (PSUT)": "string",
        aud: "string",
        exp: "string",
        iat: "string",
        auth_time: "string",
        nonce: "string",
        acr: "string",
        at_hash: "string",
        random_property: "string",
      }) +
      ".75A8cO_8SY63cOv1vCoBcDUjNQzlJwC86TLwOOS8_Lc",
  },
});

Before(() => {
  specOIDCUserinfo = spec().expectResponseTime(15000);
});

// Background
Given(
  "The user wants to receive the user's claims via the oidc userinfo endpoint",
  () =>
    "The user wants to receive the user's claims via the oidc userinfo endpoint"
);

// Scenario: Successfully retrieves the user's claims via the oidc userinfo endpoint
When(
  "The user sends a request with a valid header to retrieve the user's claims",
  () =>
    specOIDCUserinfo.get(baseUrl).withHeaders({
      "@DATA:TEMPLATE@": "Bearer",
    })
);

Then(
  "The user successfully retrieves the user's claims via the oidc userinfo endpoint",
  async () => {
    specOIDCUserinfo
      .expectStatus(200)
      .expectJsonMatch(
        regex(
          "string.string.string.string.string",
          /^[\w-]+\.[\w-]+\.[\w-]+\.[\w-]+\.[\w-]+$/
        )
      );

    await specOIDCUserinfo.toss();
  }
);

// Scenario: The user is unable to retrieve the user's claims via the oidc userinfo endpoint because the request does not contain an authorization header
When(
  "The user sends a request without an authorization header to retrieve the user's claims",
  () => specOIDCUserinfo.get(baseUrl)
);

// Scenario: The user is unable to retrieve the user's claims via the oidc userinfo endpoint because the authorization header is invalid
When(
  "The user sends a request with an invalid authorization header to retrieve the user's claims",
  () =>
    specOIDCUserinfo.get(baseUrl).withHeaders({
      "@DATA:TEMPLATE@": "Bearer",
      "@OVERRIDES@": {
        Authorization: "Bearer fake.bearer",
      },
    })
);

// The result for unsuccessful scenarios
Then(
  "The result of an operation returns an error due to the invalid authorization header",
  async () => {
    specOIDCUserinfo
      .expectStatus(401)
      .expectHeader(
        "www-authenticate",
        "Bearer error=invalid_token, error_description=MOSIPIDP123: A userinfo request was made with an access token that was not recognized."
      );
    await specOIDCUserinfo.toss();
  }
);

After(() => {
  specOIDCUserinfo.end();
});
