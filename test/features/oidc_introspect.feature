@method=GET @endpoint=/introspect
Feature: This endpoint accepts an access token or ID token and returns a boolean value indicating whether it is active.

  This endpoint accepts an access token or ID token and returns a boolean value indicating whether it is active.
  If the token is active, additional data about the token is also returned.
  If the token is invalid, expired, or revoked, it is considered inactive.

  @smoke
  Scenario: The endpoint is called with the valid parameters and returns an active status smoke type test

  Given Wants to retrieve the status of the token
  When GET request with given "alphaNumeric" as client_id "string.string.string" as token "access_token" as token_type_hint is sent
  Then The response is received
  And The response should be returned in a timely manner
  And The response should have status 200
  And The response header content-type should be "application/json; charset=utf-8"
  And The response should match json schema - active token


  @unit @positive
  Scenario Outline: The endpoint is called with the valid parameters and returns an active status

    Given Wants to retrieve the status of the token
    When GET request with given "<client_id>" as client_id "<token>" as token "<token_type_hint>" as token_type_hint is sent
    Then The response is received
    And The response should be returned in a timely manner
    And The response should have status 200
    And The response header content-type should be "application/json; charset=utf-8"
    And The response should match json schema - active token

    Examples: Valid values
    | client_id       | token                | token_type_hint |
    | alphaNumeric    | string.string.string | access_token    |
    | alphaNumeric    | string.string.string | id_token        |


  @unit @positive
  Scenario Outline: The endpoint is called with an invalid token parameter and returns an inactive status

    Given Wants to retrieve the status of the token
    When GET request with given "<client_id>" as client_id "<token>" as token "<token_type_hint>" as token_type_hint is sent
    Then The response is received
    And The response should be returned in a timely manner
    And The response should have status 200
    And The response header content-type should be "application/json; charset=utf-8"
    And The response should match json schema - inactive token

    Examples: Invalid token
    | client_id       | token                | token_type_hint |
    | alphaNumeric    | string====           | access_token    |
    | alphaNumeric    | string_should_be_JWT | id_token        |


  @unit @negative
  Scenario Outline: The endpoint is called with an invalid client_id parameter and returns an unauthorized error
    
    Given Wants to retrieve the status of the token
    When GET request with given "<client_id>" as client_id "<token>" as token "<token_type_hint>" as token_type_hint is sent
    Then The response is received
    And The response should be returned in a timely manner
    And The response should have status 401
    And The response header content-type should be "application/json; charset=utf-8"
    And The response should match json schema - unauthorized

    Examples: Invalid client_id
    | client_id | token                | token_type_hint |
    | invalid_  | string.string.string | access_token    |
    | az155==   | string.string.string | id_token        |
