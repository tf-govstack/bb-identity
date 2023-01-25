Feature: The API to authenticate after authentication using the OTP auth factor.

  Once the end-user provides the user identifier (UIN/VID) and all the required auth challenges to the UI application,
  this endpoint will be invoked.
  Supported auth-challenge depends on the integrated authentication server. 

  Request endpoint: POST /authorization/authenticate

  Scenario: Successfully authenticate after authentication using the OTP auth factor
    Given The end-user wants to authenticate after authenticating using the OTP auth factor
    When The end-user triggers an action with the required parameters
    Then The end-user successfully authenticates after authenticating using the OTP auth factor

  Scenario: The user is not able to authenticate after authentication using the OTP auth factor because an invalid transactionId parameter
    Given The user wants to authenticate after authenticating using the OTP auth factor with an invalid transactionId parameter
    When The user triggers an action with an invalid transactionId
    Then The result of an operation to authenticate returns an error because of an invalid transactionId provided

  Scenario: The user is not able to authenticate after authentication using the OTP auth factor because an invalid individualId provided
    Given The user wants to authenticate after authenticating using the OTP auth factor with an invalid individualId parameter
    When The user triggers an action with an invalid individualId
    Then The result of an operation to authenticate returns an error because an invalid individualId provided

  Scenario: The user is not able to authenticate after authentication using the OTP auth factor because none parameters provided
    Given The user wants to authenticate after authenticating using the OTP auth factor without parameters
    When The user triggers an action with an empty body payload
    Then The result of an operation to authenticate returns an error because none parameters provided to the payload
