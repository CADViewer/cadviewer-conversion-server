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

# Make files in converters/autoxchange/linux executable
RUN find converters/autoxchange/linux/ -type f -name "ax*" -o -name "Ax*" | xargs chmod +x && \
    find converters/linklist/linux/ -type f -name "LinkList*" | xargs chmod +x && \
    find converters/dwgmerge/linux/ -type f -name "DwgMerge*" | xargs chmod +x

# Copy font (end with .ttf or .TTF) present inside converters/autoxchange/fonts/ into /usr/share/fonts
RUN find converters/autoxchange/fonts/ -type f -name "*.ttf" -o -name "*.TTF" | xargs -I {} cp {} /usr/share/fonts/
RUN fc-cache

# Rebuild bcrypt with required tools
RUN npm rebuild bcrypt --build-from-source

# Expose required port
EXPOSE 3000

# Command to start the application
CMD [ "npm", "start" ]