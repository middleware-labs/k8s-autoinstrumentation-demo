# Use the official Node.js image as a base
FROM node:14-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the Node.js application
CMD ["node", "server.js"]

