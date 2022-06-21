import { IncomingMessage } from "http";
import { createWebSocketStream, WebSocket, WebSocketServer } from "ws";

const port = Number(process.env.PORT) || 8080;

export const server = new WebSocketServer({ port });

server.on("connection", (socket: WebSocket, req: IncomingMessage): void => {
  console.log(socket);
    const wss = createWebSocketStream(socket);
});
