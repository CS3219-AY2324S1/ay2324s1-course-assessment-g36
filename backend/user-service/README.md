# Getting started

## Running the project

1. Set up packages and dependencies with:

   ```
   npm install
   ```

2. If you have not set up MySQL previously, follow the following [section](#setting-up-mysql) to set up the database before running the project.

3. Run the project with:

   ```
   npm start
   ```

## Setting up MySql

1. Ensure that you have downloaded [MySql](https://www.mysql.com/downloads/) on your device.
2. In your terminal, run the following command to create the database:

   ```
   npx sequelize-cli db:create
   ```

## Configuration

The following environment variables can be used to configure the service:

| Environment Variable    | Value                                         |
| ----------------------- | --------------------------------------------- |
| `JSON_WEB_TOKEN_SECRET` | Secret used to create and verify JWTs         |
| `USER_DB_URI`           | URI of the production database                |
| `PORT`                  | Port number to run service on (default: 8000) |

In development, they can be set by creating a `.env` file. See `.env.template` for a copyable template.
