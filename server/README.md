# mern-app-boilerplate : server

A boilerplate for a RESTful API using Nodejs, Express and MongoDB.

API Documentation: https://as-mern-app-boilerplate.herokuapp.com/api/documentation

## Commands
Command              | Action                       |
---------------------|------------------------------|
`npm run dev`        | Run in development mode      |
`npm start`          | Run in production mode       |
`npm run docker`     | Run project in docker        |
`npm run lint`       | Lint the code                |
`npm run lint:fix`   | Lint the code with auto fix  |
`npm test`           | Run lint, tests and coverage |
`npm test:coverage`  | Open test coverage report    |
`npm run docs`       | Update API documentation     |

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
