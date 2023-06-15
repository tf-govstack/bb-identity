# esignet API

This is a mock application which performs the whole OpenAPI spec for Identity BB

## Setup

To run dockerized version of mocked API use shell script `test_entrypoint.sh`
(requires `docker` and `docker-compose`). By default, API is available on port
`3333`, application runs on port `3001` in Docker host. Dockerfile was created
using esignet-cli.

## Changes in API definition

To introduce changes in API definition it is necessary to change content of
`esignet-bbidentity.json` file. It can be done using
[esignet application](https://esignet.com/). After following instalation, API
Spec can be opened from application navigation bar
`File > Open environment > Select esignet-bbidentity.json`. Dockerized
instance of application is not hot-reloaded, therefore it's necessary to restart
server for changes to be applied.
