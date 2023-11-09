# matching-service

## Getting started

Note: Please use Node.js v18 and above. E.g. v18.12.0

1. Run `npm install` to install dependencies.
1. Run `npm start` to start the server.

## Overview

This service matches 2 users who have chosen the same question complexity and category.

This service uses an Express server, which will connect to individual frontend clients via WebSocket.

### Messages

#### Initialization

Clients will send the following message to the server:

```
{
  type: "initialization",
  user_id: "<uid>",
  question_complexity: "Easy" | "Hard" | "Medium",
  question_category: "<category>",
  token: "<json web token>",
}
```

Upon initialization, if there is no existing user which can be matched, the corresponding message from the server will be:

```
{
  status: "initialized",
}
```

#### Matching

When a can be matched to another user, each user will receive the following message, where `user_id` is the user ID of the opposing matched user:

```
{
  status: "matched",
  user_id: "<uid>",
  // TODO:
  question_id: "<uid>",
}
```

## Configuration

The following environment variables can be used to configure the service:

- `JSON_WEB_TOKEN_SECRET`: Secret used to verify JWTs
- `PORT`: Port number to run service on (default: 3002)

They can be configured by creating a `.env` file as well (see `.env.local` for a copyable template).
