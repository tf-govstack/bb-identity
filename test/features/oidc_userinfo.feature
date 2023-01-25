Feature: The userinfo endpoint of Open ID Connect OIDC

  Once the access token is received through the token endpoint, a backend application of a relying party invokes this OIDC-compliant endpoint to request the user's claims.
  Consenting user claims are returned in the form of a JWT. This JWT is a nested JWT that is signed with JWS and then encrypted with JWE.

  Request endpoint: GET /oidc/userinfo

  Background: 
    Given The user wants to receive the user's claims via the oidc userinfo endpoint

  Scenario: Successfully retrieves the user's claims via the oidc userinfo endpoint
    When The user sends a request with a valid header to retrieve the user's claims
    Then The user successfully retrieves the user's claims via the oidc userinfo endpoint

  Scenario: The user is unable to retrieve the user's claims via the oidc userinfo endpoint because the request does not contain an authorization header
    When The user sends a request without an authorization header to retrieve the user's claims
    Then The result of an operation returns an error due to the invalid authorization header

  Scenario: The user is unable to retrieve the user's claims via the oidc userinfo endpoint because the authorization header is invalid
    When The user sends a request with an invalid authorization header to retrieve the user's claims
    Then The result of an operation returns an error due to the invalid authorization header
