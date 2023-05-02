@method=POST @endpoint=/client-mgmt/oidc-client
Feature: API to add new open ID connect (OIDC) clients.

  @smoke 
  Scenario: The new client is successfully added to the Open ID Connect (OIDC) smoke type test
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    When User sends POST request with given "2011-10-05T14:48:00.000Z" as requestTime, "e-health-service" as clientId, "Health Service" as clientName, "bharath-gov" as relyingPartyId, "http://example.com" as logoUri, empty object as publicKey, "idbb:acr:generated-code" as authContextRefs, "name" as userClaims, "authorization_code" as grantTypes, "private_key_jwt" as clientAuthMethods
    Then User receives a response from the POST /client-mgmt/oidc-client endpoint
    And The POST /client-mgmt/oidc-client endpoint response should be returned in a timely manner 15000ms
    And The POST /client-mgmt/oidc-client endpoint response should have status 200
    And The POST /client-mgmt/oidc-client endpoint response should have content-type: application/json header
    And The POST /client-mgmt/oidc-client endpoint response should match json schema
    And The POST /client-mgmt/oidc-client endpoint response should contain "e-health-service" as clientId

  @unit @positive
  Scenario Outline: The new client is successfully added to the Open ID Connect (OIDC)
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    When User sends POST request with given "<requestTime>" as requestTime, "<clientId>" as clientId, "<clientName>" as clientName, "<relyingPartyId>" as relyingPartyId, "<logoUri>" as logoUri, empty object as publicKey, "<authContextRefs>" as authContextRefs, "<userClaims>" as userClaims, "authorization_code" as grantTypes, "private_key_jwt" as clientAuthMethods, "<redirectUris>" as redirectUris
    Then User receives a response from the POST /client-mgmt/oidc-client endpoint
    And The POST /client-mgmt/oidc-client endpoint response should be returned in a timely manner 15000ms
    And The POST /client-mgmt/oidc-client endpoint response should have status 200
    And The POST /client-mgmt/oidc-client endpoint response should have content-type: application/json header
    And The POST /client-mgmt/oidc-client endpoint response should match json schema
    And The POST /client-mgmt/oidc-client endpoint response should contain "<clientId>" as clientId

    Examples: Valid data
    | requestTime              | clientId           | clientName       | relyingPartyId | logoUri             | authContextRefs                    | userClaims         | redirectUris           |
    | 2012-10-11T14:48:00.000Z | payment-service    | Payment Service  | abc-gov        | http://example1.com | idbb:acr:static-code               | given_name         | http://redirectMe1.com |
    | 2013-10-03T14:48:00.000Z | e-bank-service     | Bank Service     | bankser-gov    | http://example2.com | idbb:acr:linked-wallet-static-code | family_name        | http://redirectMe2.com |
    | 2014-09-05T14:48:00.000Z | e-commerce-service | Commerce Service | ecommer-gov    | http://example3.com | idbb:acr:biometrics-generated-code | middle_name        | http://redirectMe3.com |
    | 2011-12-01T14:48:00.000Z | health-service     | Health Service   | health-gov      | http://example4.com | idbb:acr:biometrics                | preferred_username | http://redirectMe4.com |

  @unit @negative
  Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of invalid requestTime
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    When User sends POST request with given "2011-10-05" as invalid requestTime
    Then User receives a response from the POST /client-mgmt/oidc-client endpoint
    And The POST /client-mgmt/oidc-client endpoint response should be returned in a timely manner 15000ms
    And The POST /client-mgmt/oidc-client endpoint response should have status 200
    And The POST /client-mgmt/oidc-client endpoint response should have content-type: application/json header
    And The POST /client-mgmt/oidc-client endpoint response should match json schema with error
    And The POST /client-mgmt/oidc-client endpoint response should match with error code "invalid_input"

  @unit @negative
  Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of invalid authContextRefs
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    When User sends POST request with given "idbb:acr:invalid" as invalid authContextRefs
    Then User receives a response from the POST /client-mgmt/oidc-client endpoint
    And The POST /client-mgmt/oidc-client endpoint response should be returned in a timely manner 15000ms
    And The POST /client-mgmt/oidc-client endpoint response should have status 200
    And The POST /client-mgmt/oidc-client endpoint response should have content-type: application/json header
    And The POST /client-mgmt/oidc-client endpoint response should match json schema with error
    And The POST /client-mgmt/oidc-client endpoint response should match with error code "invalid_acr"

  @unit @negative
  Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of invalid userClaims
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    When User sends POST request with given "invalid_claims" as invalid userClaims
    Then User receives a response from the POST /client-mgmt/oidc-client endpoint
    And The POST /client-mgmt/oidc-client endpoint response should be returned in a timely manner 15000ms
    And The POST /client-mgmt/oidc-client endpoint response should have status 200
    And The POST /client-mgmt/oidc-client endpoint response should have content-type: application/json header
    And The POST /client-mgmt/oidc-client endpoint response should match json schema with error
    And The POST /client-mgmt/oidc-client endpoint response should match with error code "invalid_claim"

  @unit @negative
  Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of invalid grantTypes
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    When User sends POST request with given "invalid_code" as invalid grantTypes
    Then User receives a response from the POST /client-mgmt/oidc-client endpoint
    And The POST /client-mgmt/oidc-client endpoint response should be returned in a timely manner 15000ms
    And The POST /client-mgmt/oidc-client endpoint response should have status 200
    And The POST /client-mgmt/oidc-client endpoint response should have content-type: application/json header
    And The POST /client-mgmt/oidc-client endpoint response should match json schema with error
    And The POST /client-mgmt/oidc-client endpoint response should match with error code "invalid_grant_type"

  @unit @negative
  Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of invalid clientAuthMethods
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    When User sends POST request with given "invalid_auth_method" as invalid clientAuthMethods
    Then User receives a response from the POST /client-mgmt/oidc-client endpoint
    And The POST /client-mgmt/oidc-client endpoint response should be returned in a timely manner 15000ms
    And The POST /client-mgmt/oidc-client endpoint response should have status 200
    And The POST /client-mgmt/oidc-client endpoint response should have content-type: application/json header
    And The POST /client-mgmt/oidc-client endpoint response should match json schema with error
    And The POST /client-mgmt/oidc-client endpoint response should match with error code "invalid_client_auth"

  @unit @negative
  Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of invalid clientName
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    When User sends POST request with given '' as invalid clientName
    Then User receives a response from the POST /client-mgmt/oidc-client endpoint
    And The POST /client-mgmt/oidc-client endpoint response should be returned in a timely manner 15000ms
    And The POST /client-mgmt/oidc-client endpoint response should have status 200
    And The POST /client-mgmt/oidc-client endpoint response should have content-type: application/json header
    And The POST /client-mgmt/oidc-client endpoint response should match json schema with error
    And The POST /client-mgmt/oidc-client endpoint response should match with error code "invalid_client_name"

  @unit @negative
  Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of invalid relyingPartyId
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    When User sends POST request with given '' as invalid relyingPartyId
    Then User receives a response from the POST /client-mgmt/oidc-client endpoint
    And The POST /client-mgmt/oidc-client endpoint response should be returned in a timely manner 15000ms
    And The POST /client-mgmt/oidc-client endpoint response should have status 200
    And The POST /client-mgmt/oidc-client endpoint response should have content-type: application/json header
    And The POST /client-mgmt/oidc-client endpoint response should match json schema with error
    And The POST /client-mgmt/oidc-client endpoint response should match with error code "invalid_rp_id"

  @unit @negative
  Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of invalid logoUri
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    When User sends POST request with given '' as invalid logoUri
    Then User receives a response from the POST /client-mgmt/oidc-client endpoint
    And The POST /client-mgmt/oidc-client endpoint response should be returned in a timely manner 15000ms
    And The POST /client-mgmt/oidc-client endpoint response should have status 200
    And The POST /client-mgmt/oidc-client endpoint response should have content-type: application/json header
    And The POST /client-mgmt/oidc-client endpoint response should match json schema with error
    And The POST /client-mgmt/oidc-client endpoint response should match with error code "invalid_uri"

  @unit @negative
  Scenario: Not able to add the new client to the Open ID Connect (OIDC) because of invalid clientId
    Given The user wants to add the new client to the Open ID Connect (OIDC)
    When User sends POST request with given '' as invalid clientId
    Then User receives a response from the POST /client-mgmt/oidc-client endpoint
    And The POST /client-mgmt/oidc-client endpoint response should be returned in a timely manner 15000ms
    And The POST /client-mgmt/oidc-client endpoint response should have status 200
    And The POST /client-mgmt/oidc-client endpoint response should have content-type: application/json header
    And The POST /client-mgmt/oidc-client endpoint response should match json schema with error
    And The POST /client-mgmt/oidc-client endpoint response should match with error code "invalid_client_id"
