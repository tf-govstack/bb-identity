---
description: >-
  This section provides information on the core data structures/data models that
  are used by this Building Block.
---

# 7 Data Structures

Identity and Verification Building Block requires data objects, below are the main ones involved listed:

* **Identities** of individuals identified by unique identifiers.
* **Identifiers**:
  * Token number associated uniquely with a set of data, identifiers are used to refer to those data without having to actually copy them.
  * They can be stored then in separate repositories with specific restricted access.
  * Identifiers can be used to uniquely identify Foundational IDs or Functional IDs.
  * Token identifiers can be used to avoid data aggregation and ensure capacity to forget an identity.
  * As identity data should be stored in different storage to ensure privacy protection allowing then data separation and data minimization principles, it’s necessary to use different identifiers for different types of data.
* **Credentials**:
  * Issued for individuals or presented by them, ID Credentials related to an individual should be traced and accessible in the system in order to have capacity to identify fraud and do investigation on them, so has performing auditing.
* **Registration requests**
  * Requests will be received by the Identity and Verification Building Block, for example, identity enrollment requests or identity data update registration requests, those requests will be then managed by the different subsystems and the workflows of Identity and Verification Building Block.
* **Identification Services**
  * A set of services will be offered on top of identities to identify a person, check some of his/her attributes (i.e. age), or obtain some certified personal information when needed and authorized.
* **3rd parties services user entities**
  * External entities which could be GovStack building blocks or not, will have access to and use the services, for that purpose their access will be granted, consent may be given by the individuals and their activities will be logged.

The schema below shows their interactions and brings more details on involved data objects

![](.gitbook/assets/image4.png)

Identity verfication involves the below data structures

#### End-User Claim

End-user claim is the user information that can be shared to the relying party once the end user authentication is completed in IDBB. The below is a set of standard claims that will be supported by the IDBB implementation

* **sub** - Subject identifier with the value of PSUT (Partner Specific User Token). This value should be unique for the end user and relying party combination. Same user should have different subject identifier in different relying party systems to preserve privacy.  It MUST NOT exceed 255 ASCII characters in length. The sub value is a case sensitive string.
* **name** - End-User's full name in displayable form including all name parts, possibly including titles and suffixes, ordered according to the End-User's locale and preferences.
* **given\_name** - Given name(s) or first name(s) of the End-User. Note that in some cultures, people can have multiple given names; all can be present, with the names being separated by space characters.
* **family\_name** - Surname(s) or last name(s) of the End-User. Note that in some cultures, people can have multiple family names or no family name; all can be present, with the names being separated by space characters.
* **middle\_name** - Middle name(s) of the End-User. Note that in some cultures, people can have multiple middle names; all can be present, with the names being separated by space characters. Also note that in some cultures, middle names are not used.
* **nickname** - Casual name of the End-User that may or may not be the same as the given\_name.
* **preferred\_username** - Shorthand name by which the End-User wishes to be referred to at the RP. This value MAY be any valid JSON string including special characters such as @, /, or whitespace. The RP MUST NOT rely upon this value being unique
* **address** - End-User's postal address. The value of the address member is a JSON structure containing some or all of the members from the below list.
  * **formatted** - Full mailing address, formatted for display or use on a mailing label. This field MAY contain multiple lines, separated by newlines. Newlines can be represented either as a carriage return/line feed pair ("\r\n") or as a single line feed character ("\n").
  * **street\_address** - Full street address component, which MAY include house number, street name, Post Office Box, and multi-line extended street address information. This field MAY contain multiple lines, separated by newlines. Newlines can be represented either as a carriage return/line feed pair ("\r\n") or as a single line feed character ("\n").
  * **locality** - City or locality component.
  * **region** - State, province, prefecture, or region component.
  * **postal\_code** - Zip code or postal code component.
  * **country** - Country name component.
* **gender** - End-User's gender. Values defined by this specification are female and male. Other values MAY be used when neither of the defined values are applicable.
* **birthdate** - End-User's birthday, represented as an [ISO 8601:2004](https://openid.net/specs/openid-connect-core-1\_0.html#ISO8601-2004) \[ISO8601‑2004] YYYY-MM-DD format. The year MAY be 0000, indicating that it is omitted. To represent only the year, YYYY format is allowed.
* **picture** - URL of the End-User's profile picture. This URL MUST refer to an image file (for example, a PNG, JPEG, or GIF image file), rather than to a Web page containing an image.
* **email** - End-User's preferred e-mail address. Its value MUST conform to the [RFC 5322](https://www.rfc-editor.org/rfc/rfc5322) \[RFC5322] addr-spec syntax.
* **email\_verified** - True if the End-User's e-mail address has been verified; otherwise false.
* **phone\_number** - End-User's preferred telephone number. [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I/en) \[E.164] is RECOMMENDED as the format of this Claim, for example, +1 (425) 555-1212 or +56 (2) 687 2400.
* **phone\_number\_verified** - True if the End-User's phone number has been verified; otherwise false.
* **locale** - End-User's locale, represented as a [BCP47](https://www.rfc-editor.org/rfc/rfc5646) \[RFC5646] language tag. This is typically an ISO 639-1 Alpha-2 \[ISO639‑1] language code in lowercase and an [ISO 3166-1 Alpha-2](https://www.w3.org/WAI/ER/IG/ert/iso639.htm) \[ISO3166‑1] country code in uppercase, separated by a dash. For example, en-US or fr-CA.&#x20;
* **zoneinfo** - String from zoneinfo time zone database representing the End-User's time zone. For example, Europe/Paris or America/Los\_Angeles.

#### Scope

Scopes can be used to request that specific sets of information be made available as claim values. The following scope values will be supported by IDBB implementation for requesting specific details of end-user.

* **profile** -This scope value requests access to the End-User's default profile claims, which are: name, family\_name, given\_name, middle\_name, nickname, preferred\_username, picture, gender, birthdate, zoneinfo and locale.
* **email** - This scope value requests access to the email and email\_verified claim.
* **address** - This scope value requests access to the address claim.
* **phone** - This scope value requests access to the phone\_number and phone\_number\_verified claim.

#### ID Token

The ID Token is a security token that contains the end user's basic identifier information and few other claims about the authentication event. The ID Token is represented as a [JSON Web Token (JWT)](https://datatracker.ietf.org/doc/html/rfc7519) \[JWT].

The following claims are used within the ID Token

* **iss** - Issuer identifier for the IDBB implementation. The iss value is a case sensitive URL using the https scheme that contains scheme, host, and optionally, port number and path components and no query or fragment components.
* **sub** - Subject identifier with the value of PSUT (Partner Specific User Token). This value should be unique for the end user and relying party combination. Same user should have different subject identifier in different relying party systems to preserve privacy.  It MUST NOT exceed 255 ASCII characters in length. The sub value is a case sensitive string.
* **aud** - Audience that this ID Token is intended for. It MUST contain the OIDC client\_id of the Relying Party as an audience value.
* **exp** - Expiration time on or after which the ID Token MUST NOT be accepted for processing. The processing of this parameter requires that the current date/time MUST be before the expiration date/time listed in the value. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time.
* **iat** - Time at which the JWT was issued. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time.
* **auth\_time** - Time when the End-User authentication occurred. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time.
* **nonce** - String value used to associate a Client session with an ID Token, and to mitigate replay attacks. The value is passed through unmodified from the Authentication Request to the ID Token. If present in the ID Token, Clients MUST verify that the nonce Claim Value is equal to the value of the nonce parameter sent in the Authentication Request.
* **acr** - Authentication Context Class Reference. String specifying an Authentication Context Class Reference value that identifies the Authentication Context Class that the authentication performed satisfied. Below are the list of supported ACRs based on the authentication factors implemented by the IDBB implementation

| ACR Value                          | Authentication Factors                |
| ---------------------------------- | ------------------------------------- |
| idbb:acr:static-code               | PIN \|\| Password                     |
| idbb:acr:generated-code            | OTP \|\| TOTP                         |
| idbb:acr:linked-wallet             | WLA (Wallet Local Authentication)     |
| idbb:acr:biometrics                | BIO (Biometrics from a L1 SBI device) |
| idbb:acr:biometrics-generated-code | BIO && ( OTP \|\| TOTP )              |
| idbb:acr:linked-wallet-static-code | WLA && ( PIN \|\| Password )          |

&& - This is a multi factor authentication where both auth factors needs to be authenticated

|| - This is a condition where there are more than one auth factor which shares the same ACR level

* **at\_hash** - Access Token hash value. Its value is the base64url encoding of the left-most half of the hash of the octets of the ASCII representation of the access\_token value, where the hash algorithm used is the hash algorithm used in the alg Header Parameter of the ID Token's JOSE Header. For instance, if the alg is RS256, hash the access\_token value with SHA-256, then take the left-most 128 bits and base64url encode them. The at\_hash value is a case sensitive string.

#### Access Token

Access token represents the authorization of a specific application to access specific parts of a user’s data. The Access Token is represented as a [JSON Web Token (JWT)](https://datatracker.ietf.org/doc/html/rfc7519) \[JWT].

* **iss** - Issuer identifier for the IDBB implementation. The iss value is a case sensitive URL using the https scheme that contains scheme, host, and optionally, port number and path components and no query or fragment components.
* **exp** - Expiration time on or after which the Access Token MUST NOT be accepted for processing. The processing of this parameter requires that the current date/time MUST be before the expiration date/time listed in the value. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time.
* **aud** - Audience that this Access Token is intended for. It MUST contain the OIDC client\_id of the Relying Party as an audience value.
* **sub** - Subject identifier with the value of PSUT (Partner Specific User Token). This value should be unique for the end user and relying party combination. Same user should have different subject identifier in different relying party systems to preserve privacy.  It MUST NOT exceed 255 ASCII characters in length. The sub value is a case sensitive string.
* **client\_id** - The OIDC client identifier that was assigned to the relying party when the client registration is done
* **iat** - Time at which the JWT was issued. Its value is a JSON number representing the number of seconds from 1970-01-01T0:0:0Z as measured in UTC until the date/time.
* **jti** - JWT ID provides a unique identifier for the JWT. The identifier value MUST be assigned in a manner that ensures that there is a negligible probability that the same value will be accidentally assigned to a different data object. This can be used to prevent the JWT from being replayed. The jti value is a case-sensitive string.
