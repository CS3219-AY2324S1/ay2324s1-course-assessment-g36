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

- `JSON_WEB_TOKEN_SECRET`: Secret used to verify JWTs
- `OPENAI_API_KEY`: OpenAI API key
- `PORT`: Port number to run service on (default: 5173)

They can be configured by creating a `.env` file as well (see `.env.local` for a copyable template).
