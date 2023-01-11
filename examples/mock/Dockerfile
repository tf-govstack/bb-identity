FROM node:14-alpine

RUN npm install -g @mockoon/cli@2.2.1
COPY mockoon-bbidentity.json ./mockoon-bbidentity.json

# Do not run as root.
RUN adduser --shell /bin/sh --disabled-password --gecos "" mockoon
RUN chown -R mockoon ./mockoon-bbidentity.json
USER mockoon

EXPOSE 3003

ENTRYPOINT ["mockoon-cli", "start", "--hostname", "0.0.0.0", "--daemon-off", "--data", "mockoon-bbidentity.json", "--container"]

# Usage: docker run -p <host_port>:<container_port> mockoon-test