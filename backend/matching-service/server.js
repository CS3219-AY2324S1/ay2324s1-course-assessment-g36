import { createServer } from "http";

import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";

import { MatchService } from "./match-service.js";
import { generateCodeRoomId } from "./utils/generateRoomId.js";

import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config({path: "../.env"})

const app = express();
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  allowedHeaders: "Content-Type",
  credentials: true,
}));

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
      console.info(`Connection closed; "${ws.complexity}": Removed user ${ws.userId}`);
    } else {
      console.info(`Connection closed: User ${ws.userId}`);
    }
  });

  ws.on("message", function(_message) {
    const message = JSON.parse(_message.toString());
    console.log("Received message: %s", _message);

    switch (message.type) {
      case "initialization": {
        const {
          user_id: userId,
          question_complexity: complexity,
          token,
        } = message;

        // Authenticate users
        try {
          jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
        } catch (error) {
          console.error("Unauthenticated");
          ws.close();
          return;
        }

        if (complexity !== "Easy" && complexity !== "Medium" && complexity !== "Hard") {
          console.error("Invalid complexity");
          ws.close();
          return;
        }

        ws.userId = userId;
        ws.complexity = complexity;

        const matchedUser = matchService.getUserFromQueue(complexity);

        // If there are no existing users, add current user to queue and send "initialized" message.
        if (!matchedUser) {
          matchService.addUserToQueue(ws);
          ws.send(JSON.stringify({ status: "initialized" }));
          console.info(`"${complexity}": Added user ${userId}`);
        }
        // Otherwise, send "matched" messages to both users, and close both connections.
        else {
          ws.matchedUser = matchedUser;
          matchedUser.matchedUser = ws;
          const uniqueRoomId = generateCodeRoomId();
          ws.send(JSON.stringify({ status: "matched", user_id: matchedUser.userId, room_id: uniqueRoomId }));
          matchedUser.send(JSON.stringify({ status: "matched", user_id: ws.userId, room_id: uniqueRoomId }));
          console.info(`"${complexity}": Matched user ${matchedUser.userId} to user ${userId}`);
          ws.close();
          matchedUser.close();
        }

        return;
      }

      default: {
        throw new Error("Unhandled message");
      }
    }
  });
});

const PORT = process.env.PORT || 3002;

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
