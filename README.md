# node-express-project-starter

Project starter for developing RESTful APIs using Nodejs, Express, MongoDB and Docker.

## What's included

- [Express](https://expressjs.com/)
- [ESLint](https://eslint.org/) with [STRV's config](https://github.com/strvcom/eslint-config-javascript)
- [Nodemon](https://github.com/remy/nodemon) to restart the server whenever you make changes

## Requirements
Make sure you have the following installed:
- GIT
- Nodejs 8+
- NPM
- Docker and docker-compose

> Docker is not mandatory, but if you don't have it you need to install and configure MongoDB.

## Initial Setup

```sh
# Clone the repository
  git clone https://github.com/alexsalomon/node-express-project-starter [PROJECT-NAME] && cd [PROJECT-NAME]
  
# Set up the Remotes
  git remote set-url origin MY_REPOSITORY_URL
  git remote add upstream https://github.com/alexsalomon/node-express-project-starter
  git remote -v
  
# Push changes to your remote repository:
  git push origin master

# Install dependencies using NPM
$ npm install
```

## Commands
Command             | Action                   |
--------------------|--------------------------|
`npm run dev`       | Run in development mode  |
`npm start`         | Run in production mode   |
`npm run lint`      | Lint the code            |

## Docker support

You don't have to install and configure MongoDB and run each service (API and MongoDB) in a separate window. Docker handles all that for you. You just need to run:

```sh
$ docker-compose build --force-rm   # Build the services and remove intermediate containers
$ docker-compose up                 # Builds, (re)creates, starts, and attaches to containers for a service.
```

> NOTE: If you change a service's `Dockerfile` or the contents of its build directory, you can run `docker-compose build` to rebuild it.
