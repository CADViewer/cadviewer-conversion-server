FROM node:16.10

# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY package*.json ./

RUN npm install
RUN npm i -g nodemon
COPY . .

RUN npm rebuild bcrypt --build-from-source
EXPOSE 3000

CMD [ "npm", "start" ]