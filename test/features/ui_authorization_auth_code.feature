Feature: The API sends the accepted consent and permitted scopes and receives the authorization code.

  Once the authentication is successful and user consent is obtained,
  this endpoint will be invoked by the UI application to send the accepted consent and permitted scopes.
  The UI application will receive the authorization code and a few other details required for redirecting
  to the client / relying party application. 

  Request endpoint: POST /authorization/auth-code

  Scenario: Successfully receive the authorization code
    Given The end-user wants to receive the authorization code
    When The end-user triggers an action with the required parameters to receive the authorization code
    Then The end-user successfully received the authorization code

  Scenario: The user is not able to receive the authorization code because of an invalid transactionId parameter
    Given The user wants to receive the authorization code with an invalid transactionId parameter
    When The user triggers an action with an invalid transactionId to receive the authorization code
    Then The result of an operation to receive the authorization code because of an invalid transactionId provided

  Scenario: The user cannot get the authorization code because no parameter was specified
    Given The user wants to obtain the authorization code without specifying a parameter
    When The user triggers an action without specifying a parameter to receive the authorization code
    Then The result of an operation to receive the authorization code because no parameter was specified
