---
description: >-
  Key Digital Functionalities describe the core (required) functions that this
  Building Block must be able to perform.
---

# 4 Key Digital Functionalities

## 4.1 **Current scope**

The functional requirements of Identity Building Block covers the full life cycle or a Foundational ID so as the services offered to use that Identity.

The Identity Building Block MUST offer functinalities to on-board new individuals, update and manage life cycle of personal data, issue unique identifiers, issue physical or digital credentials, publish identity change events, offer services to verify identity.

The Identitity Build Block MUST have any response data payload it returns through its API only in the form of JSON or YAML formatted datasets. It is left to the application consuming the response to present it appropriately (e.g. as an Event list or calendar) and provision for associated user interface interactions.

The Identitity Building Block MUST enable usage from the following actors:

* "BB\_Admin" who manages this Building Block to run efficiently in a hosted environment;
* "Partners" who get registered and can obtain access to services after authorization ;
* "Users" who will manage their Identity information, access to this information by third parties, credentials and preferences;
* "Subscribers" which will be notified of identity change events after registration.&#x20;

The internal storage of the Identity Building Block MUST hold configuration, status, and logged information of all scheduled events. It MUST also maintain a repository of details of Partners, Users and Subscribers.

The Key digital functionalities that are considered within the current scope of the specifications are listed below:

* **Identity Usage**: Registered and Authorized Partners have access to Identity Building Block Usage APIs to request Authentication of Users, if succesful they can collect personal information after a User informed consent is given. For a specific Partner and a specific User the Identity Building Block will produce a unique and repeatable Partner Specific User Token (PSUT).
