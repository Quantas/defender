# Defender Application

Defender can be configured to work with any OpenID-compliant STS. By default, we use Keycloak.

Notes for AWS Cognito: Make sure to set a "Domain Name" or you will get cryptic errors!

## AWS Cognito Settings

### Create App Client

* No Secret Key
* Leave all the other defaults and make note of the Client ID

### App Client

* Make sure to check the proper Identity Provider
* Callback URL(s) = http://localhost, http://localhost/assets/silent-renew.html
* Sign Out URL(s) = http://localhost
* Allowed OAuth Flows = Authorization Code Grant
* Allowed OAuth Scopes = openid email profile

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
