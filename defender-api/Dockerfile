FROM maven:3.6.1-jdk-11 as build
# Copy POM and store deps in a layer, like a cache
COPY pom.xml /usr/src/app/pom.xml
RUN mvn -f /usr/src/app/pom.xml dependency:go-offline
# Copy app code
COPY src /usr/src/app/src
# Build app
RUN mvn -f /usr/src/app/pom.xml clean package

FROM gcr.io/distroless/java:11
# Copy JAR to start folder
COPY --from=build /usr/src/app/target/*.jar /app/defender.jar
WORKDIR /app
CMD [ "defender.jar" ]