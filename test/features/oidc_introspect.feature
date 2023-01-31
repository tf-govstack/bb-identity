Feature: This endpoint accepts an access token or ID token and returns a boolean value indicating whether it is active.

  This endpoint accepts an access token or ID token and returns a boolean value indicating whether it is active.
  If the token is active, additional data about the token is also returned.
  If the token is invalid, expired, or revoked, it is considered inactive.

  Request endpoint: GET /introspect

  Background:
    Given Wants to recieve the status of the token

  Scenario: The endpoint is called with the valid parameters and returns an active status
    When The request is sent with valid parameters
    Then The operation returns an active status of the token

  Scenario: The endpoint is called with an invalid token parameter and returns an inactive status
    When The request is sent with an invalid token parameter
    Then The operation returns an inactive status of the token

  Scenario: The endpoint is called with an invalid token_type_hint parameter and returns an unauthorized error
    When The request is sent with an invalid token_type_hint parameter
    Then The operation returns an error because of invalid token_type_hint parameter

  Scenario: The endpoint is called with an invalid client_id parameter and returns an unauthorized error
    When The request is sent with an invalid client_id parameter
    Then The operation returns an error because of invalid client_id parameter

  Scenario: The endpoint is called without the required parameters and returns an unauthorized error
    When The request is sent without the required parameters
    Then The operation returns an error because no parameters were specified