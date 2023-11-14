import express from "express";
import { createServer } from "http";
import cors from "cors";
import { WebSocketServer } from "ws";
import { setupWSConnection } from "y-websocket/bin/utils";
import { Server } from "socket.io";

const DEFAULT_PORT = 5173;
const FRONTEND = process.env.FRONTEND_URI || "http://localhost:3000";
const ALLOWED_ORIGINS = [FRONTEND];

const JOIN_ROOM_EVENT = "room:join";
const GET_LATEST_PROGRAMMING_LANGUAGE_EVENT = "programming_language:get";
const UPDATE_PROGRAMMING_LANGUAGE_EVENT = "programming_language:update";
const RECEIVE_PROGRAMMING_LANGUAGE_EVENT = "programming_language:receive";

const app = express();

app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    allowedHeaders: "Content-Type",
    credentials: true,
  }),
);
app.use(express.json());

export const httpServer = createServer(app);

export const wss = new WebSocketServer({ server: httpServer });

const io = new Server(httpServer, {
  cors: {
    origin: ALLOWED_ORIGINS[0],
    methods: ["GET", "POST"],
  },
});

const roomToProgrammingLanguageState = new Map();

io.on("connection", (socket) => {
  console.info(`connected: ${socket.id}`);

  socket.on(JOIN_ROOM_EVENT, (roomId) => {
    socket.join(roomId);
    if (roomToProgrammingLanguageState.has(roomId)) {
      console.info(
        `Get current programming language: ${roomToProgrammingLanguageState.get(
          roomId,
        )} for roomId ${roomId}`,
      );
      io.to(socket.id).emit(GET_LATEST_PROGRAMMING_LANGUAGE_EVENT, {
        language: roomToProgrammingLanguageState.get(roomId),
      });
    }
  });

  socket.on(UPDATE_PROGRAMMING_LANGUAGE_EVENT, (data) => {
    roomToProgrammingLanguageState.set(data.room, data.language);
    socket.to(data.room).emit(RECEIVE_PROGRAMMING_LANGUAGE_EVENT, data);
    console.info(`Updated programming language for room ${data.room}`, data);
  });
});

// On connection, use the utility file provided by y-websocket
wss.on("connection", (ws, req) => {
  setupWSConnection(ws, req);
});

const port = process.env.PORT || DEFAULT_PORT;
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
