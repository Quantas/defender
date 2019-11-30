# Defender Application

Defender can be configured to work with any OpenID-compliant STS. By default, we use KeyCloak.

## Development System Requirements

* Docker Desktop
* Docker Compose
* NodeJS >= 12.x
* OpenJDK 11
* Maven >= 3

## Local Development

If you wish to work on the API and the Frontend, run the following `docker-compose` command to start the STS:

`docker-compose up -d authdb keycloak`

1. Navigate to `defender-client/` and run `npm install`
2. Navigate to `defender-api/` and run `mvn clean install`
3. To start angular-cli, from `defender-client/` run `npm run start`
4. To start Spring Boot run the Java mian method
5. The app will be available at `http://localhost:4200/`
6. Keycloak can be configured at `http://localhost:9080/auth/admin/`

## Docker Deployment

1. Make sure docker and docker-compose are installed
2. In the root, run `docker-compose up -d --build` To start everything
