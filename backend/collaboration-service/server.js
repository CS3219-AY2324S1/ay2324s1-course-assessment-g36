import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { setupWSConnection } from 'y-websocket/bin/utils';

export const allowedOrigins = ['http://localhost:3000'];

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

function onListening() {
  console.info("Listening")
}

function onError(error) {
  console.error(error);
}

httpServer.on('error', onError);
httpServer.on('listening', onListening);

// On connection, use the utility file provided by y-websocket
wss.on('connection', (ws, req) => {
  console.info("ws:connection");
  setupWSConnection(ws, req);
})

const port = process.env.PORT || 5173;
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
