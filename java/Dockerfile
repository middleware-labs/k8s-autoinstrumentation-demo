# Use an official Maven image to build the JAR file
FROM maven:3.9-amazoncorretto-21 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml file and the source code into the container
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Use an official OpenJDK 21 runtime as a parent image for the final image
FROM eclipse-temurin:21-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built JAR file from the previous stage
COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar /app/demo.jar

# Expose port 8080 to the outside world
EXPOSE 8080

# The command to run the application
ENTRYPOINT ["java", "-jar", "/app/demo.jar"]
