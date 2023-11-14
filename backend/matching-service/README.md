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
  question_id: "<uid>",
  room_id: "<uid>",
}
```

## Configuration

The following environment variables can be used to configure the service:

| Environment Variable    | Value                                                   |
| ----------------------- | ------------------------------------------------------- |
| `JSON_WEB_TOKEN_SECRET` | Secret used to verify JWTs                              |
| `QUESTION_SERVICE_URI`  | URI of the question service, accessible from the server |
| `FRONTEND_URI`          | URI of the frontend, publicly accessible                |
| `PORT`                  | Port number to run service on (default: 3002)           |

In development, they can be set by creating a `.env` file. See `.env.template` for a copyable template.
