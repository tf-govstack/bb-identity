Feature: The OAuth details endpoint validates the provided request parameters and resolves the required authentication factors.

  A combination of resolved authentication factors and the consent details are sent back as a response with a unique transactionId.
  The transcationId in the response is used to identify/maintain the end-user pre-auth session.

  Request endpoint: POST /authorization/oauth-details

  Scenario: Successfully validate the provided request parameters and resolve the required authentication factors
    Given The user wants to validate the provided request parameters and resolve the required authentication factors
    When The user triggers an action with the required parameters
    Then The user successfully validates the provided request parameters and resolve the required authentication factors

  Scenario: The user is not able to validate the provided request parameters and resolve the required authentication factors because of an invalid scope provided
    Given The user wants to validate the provided request parameters and resolve the required authentication factors with an invalid scope parameter
    When The user tries to trigger an action with an invalid scope parameter
    Then The result of an operation returns an error because of an invalid scope parameter provided

  Scenario: The user is not able to validate the provided request parameters and resolve the required authentication factors because of an invalid clientId parameter
    Given The user wants to validate the provided request parameters and resolve the required authentication factors with an invalid clientId parameter
    When The user triggers an action with an invalid clientId parameter
    Then The result of an operation returns an error, because of an invalid clientId provided

  Scenario: The user is not able to validate the provided request parameters and resolve the required authentication factors because of an invalid responseType provided
    Given The user wants to load the JS application and validates the provided query parameters using the OAuth-details endpoint with an invalid responseType parameter
    When The user triggers an action with an invalid responseType parameter
    Then The result of an operation returns an error because of an invalid responseType provided

  Scenario: The user is not able to validate the provided request parameters and resolve the required authentication factors because of an invalid redirectUri provided
    Given The user wants to validate the provided request parameters and resolve the required authentication factors with an invalid redirectUri parameter
    When The user triggers an action with an invalid redirectUri parameter
    Then The result of an operation returns an error because of an invalid redirectUri provided

  Scenario: The user is not able to validate the provided request parameters and resolve the required authentication factors because none parameters provided
    Given The user wants to validate the provided request parameters and resolve the required authentication factors without parameters
    When The user triggers an action without the required parameters
    Then The result of an operation returns an error because none required parameters provided
