FROM node:16.20

# Create app directory
WORKDIR /nodejs/cadviewer-conversion-server/
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY package*.json ./
COPY yarn.lock ./

RUN yarn
RUN npm i -g nodemon
COPY . .

RUN npm rebuild bcrypt --build-from-source
EXPOSE 3000

CMD [ "npm", "start" ]