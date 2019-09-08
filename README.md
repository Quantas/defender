# Defender Application

## Local Development (VS Code Containers)

1. Make sure Docker Desktop is installed
2. Install VS Code and the Remote - Containers extension
3. Open each sub-folder in it's own VS Code window
4. Make sure to launch `defender-api` first as it creates the network that is shared
5. Launch `defender-client` 
6. Once `defender-client` loads, run `npm run start:docker`
7. After the Angular CLI starts, forward port 4200 from the container using the menu
8. The application will be available at `http://localhost:4200`

## Local Development (Classic)

1. Make sure NodeJS, Java and Maven are all installed
2. Navigate to `defender-client/` and run `npm install`
3. Navigate to `defender-api/` and run `mvn clean install`
4. To start angular-cli, from `defender-client/` run `npm run start`
5. To start Spring Boot run the Java Main
6. The app will be available at `http://localhost:4200/`

## Docker Deployment

1. Make sure docker and docker-compose are installed
2. In the root, run `docker-compose up -d --build` To start the DB and the Web container
