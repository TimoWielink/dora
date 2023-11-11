# Express App with Bootstrap and EJS Templates

This application utilizes the Express framework and is styled using Bootstrap. For rendering dynamic content on the server side, we use the EJS templating engine.

## Development Environment

To start the development environment, execute the following command:
` npm install`

` npm run dev`


## Deployment

The application is set up to automatically deploy from the `master` branch on GitHub.

## Database Connection

This app uses a PostgreSQL database hosted on Heroku. To connect to the database using the Heroku CLI, follow these steps:

1. Ensure you have the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed.

2. Authenticate with Heroku:

` heroku login`

3. Connect to the PostgreSQL database:


`heroku pg:psql --app junction2023`

This will establish a connection to the PostgreSQL instance associated with the `junction2023` app on Heroku.
