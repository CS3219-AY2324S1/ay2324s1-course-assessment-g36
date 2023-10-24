import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { setupWSConnection } from 'y-websocket/bin/utils';
import { Server } from "socket.io";

const allowedOrigins = ['http://localhost:3000'];

const UPDATE_PROGRAMMING_LANGUAGE_EVENT = "programming_language:update"
const RECEIVE_PROGRAMMING_LANGUAGE_EVENT = "programming_language:receive"

const app = express();

app.use(cors(
  {
    origin: allowedOrigins,
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
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.info(`connected: ${socket.id}`);

  socket.on(UPDATE_PROGRAMMING_LANGUAGE_EVENT, (data) => {
    console.info(data)
    socket.to(data.room).emit(RECEIVE_PROGRAMMING_LANGUAGE_EVENT, data);
  });
});

// On connection, use the utility file provided by y-websocket
wss.on('connection', (ws, req) => {
  console.info("ws:connection");
  setupWSConnection(ws, req);
})

const port = process.env.PORT || 3001;
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
