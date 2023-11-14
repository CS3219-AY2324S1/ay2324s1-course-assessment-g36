import { createServer } from "http";

import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import { WebSocketServer } from "ws";

import env from "./env.js";
import { MatchService } from "./match-service.js";
import { generateCodeRoomId } from "./utils/generateRoomId.js";
import { getRandomQuestionId } from "./utils/getRandomQuestion.js";

const FRONTEND_URI = env.FRONTEND_URI || "http://localhost:3000";

const app = express();
app.use(
  cors({
    origin: [FRONTEND_URI],
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    allowedHeaders: "Content-Type",
    credentials: true,
  }),
);

const httpServer = createServer(app);

httpServer.on("error", console.error);

const wss = new WebSocketServer({ server: httpServer });

const matchService = new MatchService();

wss.on("connection", (ws) => {
  console.info("Received new connection");

  ws.on("error", console.error);
  ws.on("close", () => {
    const removedUser = matchService.removeUserFromQueue(ws);
    if (removedUser) {
      console.info(
        `Connection closed; "${ws.complexity}": Removed user ${ws.username}`,
      );
    } else {
      console.info(`Connection closed: User ${ws.username}`);
    }
  });

  ws.on("message", async function (_message) {
    const message = JSON.parse(_message.toString());
    console.log("Received message: %s", _message);

    switch (message.type) {
      case "initialization": {
        const {
          // user_id: userId,
          question_complexity: complexity,
          token,
        } = message;

        // Authenticate users
        let user;
        try {
          user = jwt.verify(token, env.JSON_WEB_TOKEN_SECRET);
        } catch (error) {
          console.error("Unauthenticated");
          ws.close();
          return;
        }

        if (
          complexity !== "Easy" &&
          complexity !== "Medium" &&
          complexity !== "Hard"
        ) {
          console.error("Invalid complexity");
          ws.close();
          return;
        }

        ws.username = user.username;
        ws.complexity = complexity;

        const matchedUser = matchService.getUserFromQueue(
          complexity,
          user.username,
        );

        // If there are no existing users, add current user to queue and send "initialized" message.
        if (!matchedUser) {
          matchService.addUserToQueue(ws);
          ws.send(JSON.stringify({ status: "initialized" }));
          console.info(`"${complexity}": Added user ${user.username}`);
        }
        // Otherwise, send "matched" messages to both users, and close both connections.
        else {
          ws.matchedUser = matchedUser;
          matchedUser.matchedUser = ws;
          const uniqueRoomId = generateCodeRoomId();
          getRandomQuestionId(ws.complexity).then((questionId) => {
            ws.send(
              JSON.stringify({
                status: "matched",
                username: matchedUser.username,
                room_id: uniqueRoomId,
                question_id: questionId,
              }),
            );
            matchedUser.send(
              JSON.stringify({
                status: "matched",
                username: ws.username,
                room_id: uniqueRoomId,
                question_id: questionId,
              }),
            );
            console.info(
              `"${complexity}": Matched user ${matchedUser.username} to user ${user.username} with question ${questionId}`,
            );
            ws.close();
            matchedUser.close();
          });
        }

        return;
      }

      default: {
        throw new Error("Unhandled message");
      }
    }
  });
});

const PORT = env.PORT || 3002;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  if (process.env.NODE_ENV === "development") {
    // Log out queue for debugging.
    setInterval(() => {
      const queueStr = matchService.toString();
      if (queueStr) console.log(queueStr);
    }, 5000);
  }
});
