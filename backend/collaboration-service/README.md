# Getting started

## Running the project

1. Set up packages and dependencies:

   ```
   npm install
   ```

2. Run the server:

   ```
   npm start
   ```

## Configuration

The following environment variables can be used to configure the service:

| Environment Variable    | Value                                         |
| ----------------------- | --------------------------------------------- |
| `JSON_WEB_TOKEN_SECRET` | Secret used to verify JWTs                    |
| `OPENAI_API_KEY`        | OpenAI API key                                |
| `FRONTEND_URI`          | URI of the frontend, publicly accessible      |
| `PORT`                  | Port number to run service on (default: 5173) |

In development, they can be set by creating a `.env` file. See `.env.template` for a copyable template.
