# node-express-project-starter

Project starter for developing RESTful APIs using Nodejs, Express, MongoDB and Docker.

## What is included:

- [Express](https://expressjs.com/)
- [ESLint](https://eslint.org/) with [STRV's config](https://github.com/strvcom/eslint-config-javascript)
- [Nodemon](https://github.com/remy/nodemon) to restart the server whenever you make changes

## To run this make sure you have

- GIT
- Nodejs 8+
- NPM
- Docker and docker-compose

> Docker is not mandatory, but if you don't have it you need to install and configure MongoDB.

## Clone the repo and install the deps

```sh
# clone into project-name and remove the .git dir
$ git clone --depth=1 https://github.com/alexsalomon/node-express-project-starter [PROJECT-NAME] && cd [PROJECT-NAME] && rm -rf .git

# or NPM
$ npm install
```

## Docker support

You don't have install and configure MongoDB and run each service (API and MongoDB) in a separate window. Docker handles all that for you. You just need to run:

```sh
$ docker-compose build --force-rm   # Build the services and remove intermediate containers
$ docker-compose up                 # Builds, (re)creates, starts, and attaches to containers for a service.
```

> NOTE: If you change a service's `Dockerfile` or the contents of its build directory, you can run `docker-compose build` to rebuild it.
