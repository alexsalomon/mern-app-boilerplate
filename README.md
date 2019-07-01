# mern-app-boilerpate [![Build Status](https://travis-ci.com/alexsalomon/node-exp-api-boilerplate.svg?token=LHLxJdxYMwqFf4gT1Rm9&branch=master)](https://travis-ci.com/alexsalomon/node-exp-api-boilerplate)

Project starter for developing MERN (MongoDB, Express, React and Node) applications.

> More information coming soon. In the meanwhile, check out the README inside the server directory.

## Deploy
* Download and install the [Heroku Toolbelt](https://devcenter.heroku.com/articles/heroku-cli)
* In terminal, run the following (One time setup):
```sh
  # Login with your Heroku credentials:
  heroku login

  # Navigate to the app directory and create a heroku app:
  cd PROJECT_NAME
  heroku create PROJECT_NAME

  # Set the stack of your app to container:
  heroku stack:set container

  # Set up required environment variables (Check .env.example for the complete list):
  heroku config:set JWT_SECRET=__secret__ SENTRY_DNS=__secret__

  # Push the code to heroku:
  git push heroku master

  # Open the application in your browser
  heroku open
```

For all subsequent deployments just do a push and heroku will automatically do the rest for you:
```
  git push heroku master
```

### Troubleshooting:
Check out heroku's logs by typing the following command:
```
  heroku logs --tail
```

#### Error code=H14 desc="No web processes running":
Add dynos to your heroku containers:
```
  heroku ps:scale server=1
  heroku ps:scale client=1
```

## [Sentry](https://sentry.io/)
Sentry is an error tracking service that helps developers monitor and fix crashes as they happen in production.
