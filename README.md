# node-express-project-starter [![Build Status](https://travis-ci.com/alexsalomon/node-express-project-starter.svg?token=LHLxJdxYMwqFf4gT1Rm9&branch=master)](https://travis-ci.com/alexsalomon/node-express-project-starter)

Project starter for developing RESTful APIs using Nodejs, Express, MongoDB and Docker.

## What's included

- [Express](https://expressjs.com/)
- [ESLint](https://eslint.org/) with [STRV's config](https://github.com/strvcom/eslint-config-javascript)
- [Nodemon](https://github.com/remy/nodemon) to restart the server whenever you make changes

## Requirements
Make sure you have the following installed:
- GIT
- Nodejs 10+
- NPM
- Docker and docker-compose

> Docker is not mandatory, but if you don't have it you need to install and configure MongoDB.

## Initial Setup

```sh
# Clone the repository
$ git clone https://github.com/alexsalomon/node-express-project-starter [PROJECT_NAME] && cd [PROJECT_NAME]
 
# Set up the Remotes
$ git remote set-url origin MY_REPOSITORY_URL
$ git remote add upstream https://github.com/alexsalomon/node-express-project-starter
$ git remote -v
 
# Push changes to your remote repository:
$ git push origin master

# Install dependencies using NPM
$ npm install
```

## Commands
Command             | Action                   |
--------------------|--------------------------|
`npm run dev`       | Run in development mode  |
`npm start`         | Run in production mode   |
`npm test`          | Run the tests once       |
`npm test-watch`    | Run and watch the tests  |
`npm run lint`      | Lint the code            |

## Docker support

You don't have to install and configure MongoDB and run each service (API and MongoDB) in a separate window. Docker handles all that for you. You just need to run:

```sh
$ docker-compose build --force-rm   # Build the services and remove intermediate containers
$ docker-compose up                 # Builds, (re)creates, starts, and attaches to containers for a service.
```

> NOTE: If you change a service's `Dockerfile` or the contents of its build directory, you can run `docker-compose build` to rebuild it.

## Deploy
* Download and install the Heroku Toolbelt
* In terminal, run the folllwoing (One time setup):
```sh
  # Login with your Heroku credentials:
  heroku login

  # Navigate to the app directory and create a heroku app:
  cd PROJECT_NAME
  heroku create PROJECT_NAME

  # Set up the mLab add-on and configure the MONGODB_URI environment variable:
  heroku addons:create mongolab

  # Push the code to heroku:
  git push heroku master
```

For all subsequent deployments just do a push and heroku will automatically do the rest for you:
```
  git push heroku master
```