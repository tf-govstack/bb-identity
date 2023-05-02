@method=PUT @endpoint=/client-mgmt/oidc-client/{client_id}
Feature: API to update existing Open ID Connect (OIDC) client.

  @smoke 
  Scenario: The client profile is successfully updated in the Open ID Connect (OIDC) smoke type test
    Given The user wants to update the client profile in the Open ID Connect (OIDC)
    And The client profile with "e-health-service" as clientId is created
    When User sends PUT request with given "e-health-service" as client_id parameter, "2011-10-05T14:48:00.000Z" as requestTime, "Health Service" as clientName, "active" as status, "http://example.com" as logoUri, "http://example-redirect.com" as redirectUris, "name" as userClaims, "idbb:acr:generated-code" as authContextRefs, "authorization_code" as grantTypes, "private_key_jwt" as clientAuthMethods
    Then User receives a response from the PUT /client-mgmt/oidc-client/{client_id} endpoint
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should be returned in a timely manner 15000ms
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should have status 200
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should have content-type: application/json header
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should match json schema
    And The PUT /client-mgmt/oidc-client/{client_id} endpoint response should contain "e-health-service" as clientId
