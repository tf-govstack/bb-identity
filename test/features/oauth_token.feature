Feature: The OAuth/token endpoint called from the relying party backend application to get the ID and access token

  Once the client / relying party application receives the authorization code through a redirect, this
  OIDC compliant endpoint will be called from the relying party backend application to get the ID and access token.

  Request endpoint: POST /oauth/token

  Background:
    Given The user wants to receive the ID and access token using the OAuth token endpoint

  Scenario: The user successfully receives the ID and access token using the OAuth token endpoint
    When The user triggers an action to receive the ID and access token with the valid payload
    Then The user successfully receives the ID and access token using the OAuth token endpoint

  Scenario: The user is not able to receive the ID and access token because of the invalid client_assertion_type
    When The user triggers an action to receive the ID and access token with the invalid client_assertion_type
    Then The result of an operation returns an error because of the invalid client_assertion_type

  Scenario: The user is not able to receive the ID and access token because of the invalid assertion
    When The user triggers an action to receive the ID and access token with the invalid assertion
    Then The result of an operation returns an error because of the invalid assertion

  Scenario: The user is not able to receive the ID and access token because of the invalid redirect_uri
    When The user triggers an action to receive the ID and access token with the invalid redirect_uri
    Then The result of an operation returns an error because of the invalid redirect_uri

  Scenario: The user is not able to receive the ID and access token because of the invalid input
    When The user triggers an action to receive the ID and access token with the invalid input
    Then The result of an operation returns an error because of the invalid input

  Scenario: The user is not able to receive the ID and access token because of the empty payload
    When The user triggers an action to receive the ID and access token with the empty payload
    Then The result of an operation returns an error because of the empty payload

  Scenario: The user is not able to receive the ID and access token because of the invalid payload
    When The user triggers an action to receive the ID and access token with the invalid payload
    Then The result of an operation returns an error because of the invalid payload
