import { createWebSocketStream, WebSocket, WebSocketServer } from "ws";
import socketController from "./socketController";

const streamOption = {
  allowHalfOpen: false,
  encoding: "utf8" as BufferEncoding,
  decodeStrings: false,
};

export default class ServerController {
  constructor(private server: WebSocketServer) {
    this.server
      .on("connection", (socket: WebSocket): void => {
        const sc = new socketController(streamOption);
        const stream = createWebSocketStream(socket, streamOption);
        stream.pipe(sc).pipe(stream);
        socket.on("close", () => stream?.destroy());
      })
      .on("error", (err: Error): void => {
        console.error(err);
      })
      .on("close", () => {
        console.log("Server closed");
      });
  }
}
