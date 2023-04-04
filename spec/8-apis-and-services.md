---
description: >-
  This section provides a reference for APIs that should be implemented by this
  Building Block.
---

# 8 Service APIs

This section provides a reference for APIs that should be implemented by this Building Block. The APIs defined here establish a blueprint for how the Building Block will interact with other Building Blocks. Additional APIs may be implemented by the Building Block, but the listed APIs define a minimal set of functionality that should be provided by any implementation of this Building Block.&#x20;

## API standards <a href="#_heading-h.3o7alnk" id="_heading-h.3o7alnk"></a>

* The microservice interfaces are defined as per [OPENAPI Ver3.0 standards](https://swagger.io/specification/).&#x20;
* For implementation purposes, it is suggested to refer [TMF630\_REST\_API\_Design\_Guidelines](https://www.tmforum.org/resources/standard/tmf630-rest-api-design-guidelines-4-2-0/).

## &#x20;Summary of Identity services

In common for all services of the Identity Building Block, the API expects the calling Partner has been already authenticated and autorized to access the service.

&#x20;For detailed specifications of APIs with input/output formats please refer to API specifications defined in YAML in the corresponding GitHub repository.

### Service Groups: Identity Usage

#### Service Group: Client Management

| Endpoint                      | Inputs                              | Returns                                                                     | Description                                                                                                                     |
| ----------------------------- | ----------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| POST:/client-mgmt/oidc-client | \[Client Details]                   | Error code details or success response with unique ID of registered client  | <p>Add new open ID connect (OIDC) clients to IDBB. </p><p>Each relying party can associate to one or multiple OIDC clients.</p> |
| PUT:/client-mgmt/oidc-client  | \[Client ID, Client update details] | Error code details or success response with unique ID of updated client     | Update allowed details on existing Open ID Connect (OIDC) clients                                                               |

#### Service Group: OIDC (OpenID Connect)

| Endpoint                              | Inputs                                          | Returns                                                                  | Description                                                                                                                                                        |
| ------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| GET:/authorize                        | \[Authorization   Details]                      | No return data since this is a browser redirection                       | Redirects the user to UI of the IDBB, completes the authentication and takes permissions for sharing data and redirects back the user to relying party application |
| POST:/oauth/token                     | \[Authorization code, Client Assertion Details] | ID Token and Access Token with expire information                        | Authenticated endpoint that allows exchange of authorization code to relvant ID and Access Tokens                                                                  |
| GET:/oidc/userinfo                    | \[Access Token]                                 | End-user claims in JWT or JWE format                                     | Enables exchange of Access token to receive the verified end-user  information                                                                                     |
| GET:/.well-known/jwks.json            | \[]                                             | Public key set in JWKS format                                            | Endpoint to fetch all the public keys of the IDBB that can be used for signature verification and other crypto operations.                                         |
| GET:/.well-known/openid-configuration | \[]                                             | All IDBB details required for the relying party application to integrate | Endpoint to provide all the details of IDBB in a standard format.                                                                                                  |

#### Service Group: Wallet - QR Code

IDBB implementation that supports mobile wallet integration, the following API spec should also be implemented.

| Endpoint                                     | Inputs                                                                         | Returns                                                                                                               | Description                                                                                                                        |
| -------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| POST:/linked-authorization/link-code         | \[Transaction Id]                                                              | Error code or Newly generated link code with expiry details                                                           | Generates and returns a random link code that is connected to the given transaction id                                             |
| POST:/linked-authorization/link-status       | \[Transaction Id, Link Code ]                                                  | Error code or link status with date time when the linking was done                                                    | A long polling request which responds once the link transaction endpoint is called for this link code from wallet app              |
| POST:/linked-authorization/link-auth-code    | \[Transaction Id, Link Code ]                                                  | Error code or Authorization code along with redirect URI and state details                                            | A long polling request which responds once the consent / permission endpoint is invoked from wallet app for the linked transaction |
| POST: /linked-authorization/link-transaction | \[Link Code]                                                                   | Error code or Linked transaction ID, relying party details, requested user claims and authentication factor details   | Generates a linked transaction using the link code and responds with all the transaction details                                   |
| POST:/linked-authorization/authenticate      | \[Link Transaction Id, individual Id, list of authentication challenges]       | Error code or linked transaction ID                                                                                   | Endpoint to authenticate the end-user based on the provided authentication challenges                                              |
| POST:/linked-authorization/consent           | \[Linked Transaction Id, permitted authorize scopes, accepted claims]          | Error code or linked transaction ID                                                                                   | Endpoint to submit the user accepted claims so the original transaction can redirect back to relying party                         |
| POST:/wallet-binding (DRAFT)                 | \[Individual Id, auth factor details, authentication challenges, public key  ] | Error code or wallet user Id, certificate along with expiry details                                                   | Binds a key generated in a wallet application to a user in IDBB. This enables wallet to be used as an authentication factor.       |

Detailed API schemas written in YAML that define REST API endpoints for each of the services mentioned above are available on GitHub located at

[https://github.com/GovStackWorkingGroup/bb-identity/blob/ac109f7f2b604c0c5538720acc130f25d4212374/api/Identity-Provider.yaml](https://github.com/GovStackWorkingGroup/bb-identity/blob/ac109f7f2b604c0c5538720acc130f25d4212374/api/Identity-Provider.yaml)

The [GovStack non-functional requirements document](https://govstack.gitbook.io/specification/architecture-and-nonfunctional-requirements/6-onboarding) provides additional information on how 'adaptors' may be used to translate an existing API to the patterns described here.

### Service Groups : Identity Management

#### Service Group: Enrollment

The Enrollment APIs are a set of OpenAPI specifications exposed by the Identity Building Block ‘Enrollment Server’ service to any enrollment client.

The Enrollment APIs are based on the following principles:

* When enrollment is done in one step, the CreateEnrollment can contain all the data and an additional flag (finalize) to indicate all data was collected.
* During the process, the enrollment structure can be updated. Only the data that changed need to be transferred. Data not included is left unchanged on the server. In the following example, the biographic data is not changed.
* Images can be passed by value or reference.
* Existing standards are used whenever possible, for instance, the preferred image format for biometric data is **ISO-19794**. The underlying data should be of open mime types that offer good compression without loss of data (for example JPEG2000 for images).

This Services APIs is not yet specified, but it should be the purpose of a next iteration of the Identity Building Block Specification.&#x20;

### Service Groups : Credential Management

This Services APIs is not yet specified, but it should be the purpose of a next iteration of the Identity Building Block Specification

### Service Groups : Subscribers Management

This Services APIs is not yet specified, but it should be the purpose of a next iteration of the Identity Building Block Specification
