# matching-service

## Getting started

1. Run `npm install` to install dependencies.
1. Run `npm start` to start the server. Use the `PORT` environment variable to customize the port. (default: 3002)

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
