# node-exp-api-boilerpate [![Build Status](https://travis-ci.com/alexsalomon/node-exp-api-boilerplate.svg?token=LHLxJdxYMwqFf4gT1Rm9&branch=master)](https://travis-ci.com/alexsalomon/node-exp-api-boilerplate)


Project starter for developing RESTful APIs using Nodejs, Express and MongoDB.

## What's included

- [Express](https://expressjs.com/)
- [ESLint](https://eslint.org/) with [STRV's config](https://github.com/strvcom/eslint-config-javascript)
- [Nodemon](https://github.com/remy/nodemon) to restart the server whenever you make changes

> NOTE: List needs to be updated...

## Commands
Command              | Action                      |
---------------------|-----------------------------|
`npm run dev`        | Run in development mode     |
`npm start`          | Run using mode in .env file |
`npm test`           | Run lint and all tests once |
`npm run tests`      | Run all tests once          |
`npm run test-watch` | Run and watch all tests     |
`npm run lint`       | Lint the code               |
`npm run docs`       | Update API documentation    |

## Set up
* Install GIT, NodeJS 10+, NPM, (MongoDB and/or Docker).
```sh
# Clone the repo and change directory
$ git clone https://github.com/alexsalomon/node-exp-api-boilerplate.git [PROJECT_NAME] && cd [PROJECT_NAME]
 
# Set up the Remotes
$ git remote set-url origin [MY_REPOSITORY_URL]
$ git remote add upstream https://github.com/alexsalomon/node-exp-api-boilerplate.git
$ git remote -v
 
# Push changes to your remote repository:
$ git push origin master

# Install NPM dependencies
$ npm install

# Optional: install Nodemon to automatically refresh the server when making changes
$ sudo npm install -g nodemon
```

## Docker support

Instead of downloading and setting up MongoDB locally, use docker for development by running the following commands:

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

  # Set up required environment variables (Check .env.example for a comprehensive list):
  heroku config:set NODE_ENV=prod JWT_SECRET=supersecret SENTRY_DNS=supersecret

  # Push the code to heroku:
  git push heroku master
```

For all subsequent deployments just do a push and heroku will automatically do the rest for you:
```
  git push heroku master
```

## Testing
* All unit tests are to be located inside the `source` directory alongside the code to be tested.
* All integration tests are to be located inside `test/integration`.
* You can find pre-defined objects for use during testing inside `test/factories`.

## Documentation
* API documentation can be found under `/docs/index.html`
* Regenarate the documentation by updating the API comments in the code and running:
```sh
  npm run docs
```

## Recommended Tools
* [Postman](https://www.getpostman.com/) - API Development and Testing
