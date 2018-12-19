FROM node:10.13-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm install

COPY . /usr/src/app/

ENV MONGODB_URI="mongodb://db:27017/restful-api-dev"

EXPOSE 8080
CMD [ "npm", "run", "dev" ]
