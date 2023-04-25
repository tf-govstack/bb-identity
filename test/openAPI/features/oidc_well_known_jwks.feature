@method=GET @endpoint=/.well-known/jwks.json
Feature: Endpoint to retrieve all the public keys of the IdP server

  Endpoint to fetch all the public keys of the IdP server.
  Returns public key set in the JWKS format.

  @smoke @unit @positive
  Scenario: Successfully retrieves the IdP server's public keys
    Given Wants to retrieve the IdP server's public keys
    When GET request to retrieve all the public keys of the IdP server is sent
    Then The response is received
    And The response should be returned in a timely manner 15000ms
    And The response should have status 200
    And The response header content-type should be "application/json; charset=utf-8"
    And The response should match json schema
