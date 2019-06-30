FROM node:10.13-alpine

RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client

COPY package*.json /usr/src/app/client/

RUN npm install

COPY . /usr/src/app/client/

CMD [ "npm", "start" ]
