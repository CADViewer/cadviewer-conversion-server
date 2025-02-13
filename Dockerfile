# Use the official Node.js 16 image based on Debian
FROM node:16-bullseye

# Set environment variable
ENV RUNING_IN_DOCKER=true

# Create app directory
WORKDIR /nodejs/cadviewer-conversion-server/

# Copy dependency files
COPY package*.json ./
COPY yarn.lock ./
RUN yarn

# Copy application code
COPY . .

# Rebuild bcrypt with required tools
RUN npm rebuild bcrypt --build-from-source

# Expose required port
EXPOSE 3000

# Command to start the application
CMD [ "npm", "start" ]