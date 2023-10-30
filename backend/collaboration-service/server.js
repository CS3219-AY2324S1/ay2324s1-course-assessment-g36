import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { setupWSConnection } from 'y-websocket/bin/utils';
import { Server } from "socket.io";

const DEFAULT_PORT = 5173
const ALLOWED_ORIGINS = ['http://localhost:3000'];

const JOIN_ROOM_EVENT = "room:join"
const UPDATE_PROGRAMMING_LANGUAGE_EVENT = "programming_language:update"
const RECEIVE_PROGRAMMING_LANGUAGE_EVENT = "programming_language:receive"

const app = express();

app.use(cors(
  {
    origin: ALLOWED_ORIGINS,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    allowedHeaders: "Content-Type",
    credentials: true
  }
));
app.use(express.json());

export const httpServer = createServer(app);

export const wss = new WebSocketServer({ server: httpServer })

const io = new Server(httpServer, {
  cors: {
    origin: ALLOWED_ORIGINS[0],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.info(`connected: ${socket.id}`);

  socket.on(JOIN_ROOM_EVENT, (data) => {
    socket.join(data)
    console.info("joined room!")
  })

  socket.on(UPDATE_PROGRAMMING_LANGUAGE_EVENT, (data) => {
    socket.to(data.room).emit(RECEIVE_PROGRAMMING_LANGUAGE_EVENT, data);
    console.info(data)
  });
});

// On connection, use the utility file provided by y-websocket
wss.on('connection', (ws, req) => {
  console.info("ws:connection");
  setupWSConnection(ws, req);
})

const port = process.env.PORT || DEFAULT_PORT;
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
