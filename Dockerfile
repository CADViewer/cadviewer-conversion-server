# Use Ubuntu 22.04 as the base image
FROM ubuntu:22.04

# Set environment variable for non-interactive installation
ENV DEBIAN_FRONTEND=noninteractive

# Install necessary dependencies
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 16.x
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs

# Create app directory
WORKDIR /nodejs/cadviewer-conversion-server/

# Install nodemon globally
RUN npm i -g nodemon yarn

# Install app dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn

# Copy the application code
COPY . .

# Rebuild bcrypt with the necessary tools installed
RUN npm rebuild bcrypt --build-from-source

# Expose the necessary port
EXPOSE 3000

# Command to run the app
CMD [ "npm", "start" ]