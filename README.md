# Defender Application


## Local Development

1. Make sure NodeJS, Java and Maven are all installed
2. Navigate to `defender-client/` and run `npm install`
3. Navigate to the root and run `mvn clean install`
4. To start angular-cli, from `defender-client/` run `npm run start`
5. To start Spring Boot run the Java Main
6. The app will be available at `http://localhost:400/`

## Docker Deployment

1. Make sure docker and docker-compose are installed
2. Run the Maven build `mvn clean install`, this will create a Docker image for defender
3. In the root, run `docker-compose up -d` To start the DB and the Web container
