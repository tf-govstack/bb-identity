# 4 Key Digital Functionalities

Identity systems can follow different approaches between centralized, federated, or distributed identities.

* With the **Centralized Identity approach**, the identity is managed in a unique central place and offered as a service to the systems around. Foundational Identity follows a Centralized approach.
* With the **Federated Identity approach**, the identities are multiple and managed in different systems which are all trusted to ensure identity verification services. Federated systems may be functional systems that could include different characteristics of persons. This approach helps to leverage existing identity assets.
  * In a federated identity approach the Identity and Verification Building Block could:
    * act as an Identity Provider and expose authentication services via federation (see Open ID Connect Standards).
    * offer services for identity proofing to external Identity Providers via the Identity Verification services standardized interfaces.
* With the **Distributed identity approach** (also named decentralized or self-sovereign identity), the identity is owned and managed by the end person in the form of credentials (physical or digital) for which the owner is in full or as-needed control of its usage. This model, if compared to centralized to federated, presents lots of benefits in terms of privacy protection.

In each of these approaches trust in the identity and verification needs to be established. The centralized and federated approaches have organizations that provide trust through their ID proofing process but trust in the organizations themselves needs to be evaluated. Federated is an early form of decentralization and establishes a web of trust. If the same is extended to include relying parties and other service providers who participate in identity proofing, a distributed model is being created.

The concept of federated and distributed identity approaches are not covered in this first version and will be explained in more detail in the second interaction of this report.

Overall, this report advocates that regardless of which approach is chosen, the data should always belong to the individual, but the level of control offered to them might vary based on features offered as well as the underlying needs. For example, a population registry cannot "forget" a person and might not allow for that

There is no one-fits-all solution and often a combination of those approaches enables most benefits.

### 4.1 Identity and Verification Building Block

The diagram below shows the high-level view of the Identity and Verification Building Block.

![Identity and Verification Building Block offers 5 different external APIs:](<.gitbook/assets/image3 (2) (1).png>)

**Abstract**

Identity and Verification Building Block offers a set of external services to the other Building Blocks:

* **Federation services** are there to federate and harmonize multiple identities, which is creating a link between various digital identities that an individual may have.
* **Enrollment Services** allow to on-board of new identities for individuals, which means collecting their personal identity data, evidence of them, and biometrics.
* **ID/Credential Management Services** permit to issue and manage the life cycle of Identity credentials, those services will allow to issue identity documents, to manage their renewal, or declare them as stolen.
* **Identity Verification Services** allow a service provider to verify an identity or some of its attributes, for example checking a person's declared identity or verifying its age.
* **Notification services** will allow a third party to subscribe to events occurring on identity and to receive notifications, useful to inform external functional Building Block when a person was born or has passed off so that the external system can take required actions.

Details of services

* **Enrollment services**
  * API to onboard new identities, this API is to be used by registration systems that may vary in their form and technologies, this API is there to receive the raw data in a predefined format.
  * The enrollment service will need to evaluate the identity-related claims based on the registration data (e.g. differentiating between self-asserted or vouched-for data in comparison to data coming from an authoritative source (such as a Civil registration and vital statistics system). Depending on the context, some of this data (and meta-data) might need to be archived for audit purposes or to allow for repeated anti-fraud checks (e.g. data from an authoritative source was used but subsequently was reported lost/stolen). As this meta-data forms the basis of the resulting identity service, only identity-specific data needs to be stored in the live system, with meta-data being held separately (and under additional security controls).
  * Enrollment services may be designed to be permissive, i.e. allowing for enrollment based on partial/poor quality data dependent on the context.
  * Those data need to be traceable and auditable so they should come in with all evidence and capture contextual meta-data, but should not permit tracking of such without proof of permission (declarative process).
* **Credential Management Services**
  * API to get access and update the credentials associated with the identity, and also manage the issuance and life-cycle of credentials whether physical or digital.
* **Identity and Verification Services**
  * API to offer identification services to the 3rd party players. Those services can be identity verification, attribute sharing, or answers to claims (i.e. I claim I’m older than 18 years old). Usage can be multiple in public services, but also private, even cross-countries. They can be based on identity attributes: text, biometrics, also known documents, and even on what people know (PIN code, Passport) or what they own (smartphone with SIM card).
* **Notifications services**
  * API allows to trigger external processes according to events happening on the identity data managed by the identity system (i.e. name change, death, new child born, document lost or stolen, etc.). In order to preserve privacy and respect the principle of single source of truth, the notification should only mention an identity change event to a set of subscribers for them to be aware that they may need to refresh a right or create a new record in their system (i.e. a birth may generate change in households register of social security and or person reaching 60 may be allowed to retirement pension).
* **Federations services**
  * API allowing federation of identities from external identity providers. Indeed, individuals may already have an existing form of digital identity they need to keep using and would like to associate with their national identity. In that case, the Federation services will be able to attach those forms of identity based on their identifier to their national identity managed by Identity and Verification Building Block, and also to allow delegation to them of individual authentication.

It includes internal sub-Building Blocks/modules, notably:

* **Identity Registry** is a system storing and managing the identities. It contains and manages all the data that might need to be collected (according to local laws and regulations) including demographic (i.e. name), biographic (i.e. age), portrait, known identifiers, known documents and can offer consultation or management services on them. As the system must be auditable it must keep track of identity changes and keep evidence leading to those changes. Privacy and Data protection rules force us to carefully manage storage and access to data, by respecting specific data protection design rules (minimization, isolation, anonymization, etc.). Generally speaking, countries apply privacy and data protection laws similar to European GDPR which impose to minimize data stored including in time, and always performs informed consent of the individuals of their end usages. The registry should allow for portability of data from one solution to another. For this, the registry should support open data formats as well as standards-based data formats. This applies to biometric and biographic data. The module should also offer APIs for such data portability.
* **Identifier Management** **module**, managing identifiers assigned to identities. In case a Unique Identity Number (UIN) is used and is acting as ‘primary key’ of identity, it is recommended that such number does not contain any personally identifiable information and hence can be used and shared publicly. The UIN should also be non-revocable. There may also be a set of tokens or aliases identifiers to use the identity and, where required, to link to data in functional systems.
* **Biometric Services** offer capacities to compare biometrics between identities. Key use cases being 1:N search which consist in confirming the unicity of a person by comparing its biometrics to all ones stored in the system, and 1:1 search to confirm an identity by comparing biometrics data one to one. Those services may be asynchronous when an adjudication system is in place, an adjudication system being a human-based decision workflow allowing operators to take decisions on uniqueness or identity match based on candidates identified automatically by the biometric search system. Centralized databases of biometrics can introduce significant privacy risks ([example case](https://www.theguardian.com/global-development/2021/sep/07/the-taliban-are-showing-us-the-dangers-of-personal-data-falling-into-the-wrong-hands)). Biometric services also provide standard interfaces for managing biometric data for operations on biometric data such as conversion, compression, templatization, matching, segmentation, and more.
* **Orchestrator** (optional but strongly recommended) is often embedded in the Identity system in order to run the control steps and actions required to build an identity. It’s recommended to use an internal workflow for that, which may lead to triggering an external workflow if, for example, required to launch additional actions after identity creation.
* **Identity Provider** can be part of the Identity and Verification Building Block and provide reference identities for identity verification, it can be also optional when in a decentralized (or distributed) identity model.
* **UIN Generator**, allows to generate Unique Identity Numbers which are unique in the system. UIN Generator will follow predefined business rules for that generation and will make sure that a newly generated number has never been already issued.

## 4.2 Identity System Components <a href="#docs-internal-guid-a791589c-7fff-b7fc-d567-43449c2874c5" id="docs-internal-guid-a791589c-7fff-b7fc-d567-43449c2874c5"></a>

The graphic below presents the overall view of the Identity System with its main components.

![](.gitbook/assets/image1.png)

### 4.2.1 Specificity of the Identity Registration System <a href="#docs-internal-guid-e09f58bb-7fff-caf2-898d-459280440ea3" id="docs-internal-guid-e09f58bb-7fff-caf2-898d-459280440ea3"></a>

Identity Registration system must be understood as different from a classical application registration system, as it establishes a person’s foundational ID which is likely to act as a basis for their digital twin (digital twin is the equivalent of a physical real person in the digital realm) for all digital interactions and therefore will be of high importance for him/her as well as being highly attractive for hackers, demanding the highest level of security.

It might require secured biometrics and document capture capacities in order to limit the chance of fraud, although the use of biometrics is not recommended given the potential privacy implications. It can be compared at the entrance door of a secured site where security is particularly reinforced and the process takes the necessary time to check all information if compared to internal access control which can be lighter and based on short interactions. The Identity Registration system can be a single-client Application, or web-based application, or even a client-server application, it could be also online or offline.

If an identity registration client is confirmed to be an external building block it will most probably be more related to the Registration Building Block. It must have its own APIs and own rules, tools, and capture technologies compatible with the Identity and Verification Building Block OpenAPIs.

The client has to deal with secure interfacing; where biometrics is being used with biometrics capture devices, and performing some operations on the biometrics such as quality checks, liveness checks, etc. These interfaces will be part of the biometric services. The data capture formats for biometrics will also have to be based on open standards to ensure compatibility and portability.

## 4.3 Integration with an Existing Identity System

It happens that some countries have an existing identity system they choose to reuse, like for example a National Population Register, a Civil Register, or an ID Document system. In that case, the existing system will need to be equipped with the Identity and Verification Building Block Services Facade which will make its integration transparent toward the remainder of the GovStack.

![](<.gitbook/assets/image2 (1).png>)
