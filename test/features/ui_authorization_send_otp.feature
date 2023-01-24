Feature: The API to authenticate using OTP auth factor.

  The end-user wants to authenticate using OTP auth factor, he/she will enter their individual id (UIN/VID) 
  and click on the "Generate OTP" button on the UI application.
  This endpoint will be invoked by the JS UI application. Since the OTP generation and delivery to the end-user is to be handled by the integrated authentication system,
  the request will be relayed to the same.

  Request endpoint: POST /authorization/send-otp

  Scenario: Successfully authenticate using OTP auth factor.
    Given The end-user wants to authenticate using OTP auth factor
    When The end-user triggers an action with every required parameter
    Then The end-user successfully authenticates using OTP auth factor

  Scenario: The user is not able to authenticate using OTP auth factor because of an invalid transactionId provided
    Given The user wants to authenticate using OTP auth factor with an invalid transactionId parameter
    When The user triggers an action with an invalid transactionId parameter
    Then The result of an operation returns an error because of an invalid transactionId provided

  Scenario: The user is not able to authenticate using OTP auth factor because of an invalid individualId provided
    Given The user wants to authenticate using OTP auth factor with an invalid individualId parameter
    When The user triggers an action with an invalid individualId parameter
    Then The result of an operation returns an error because of an invalid individualId provided

  Scenario: The user is not able to authenticate using OTP auth factor because of an invalid channel provided
    Given The user wants to authenticate using OTP auth factor with an invalid channel parameter
    When The user triggers an action with an invalid channel parameter
    Then The result of an operation returns an error because of an invalid channel provided

  Scenario: The user is not able to authenticate using OTP auth factor because none parameters provided
    Given The user wants to authenticate using OTP auth factor without parameters
    When The user triggers an action with an empty payload
    Then The result of an operation returns an error because none parameters provided to the payload
