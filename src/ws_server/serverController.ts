import { IncomingMessage } from "http";
import { Duplex } from "node:stream";
import { createWebSocketStream, WebSocket, WebSocketServer } from "ws";
import socketController from "./socketController";

export default class ServerController {
  public stream: Duplex | undefined;
  constructor(private server: WebSocketServer) {
    const sc = new socketController();
    this.server
      .on("connection", (socket: WebSocket, req: IncomingMessage): void => {
        this.stream = createWebSocketStream(socket);
        this.stream.pipe(sc);
        // .pipe(this.stream);
      })
      .on("error", (err: Error): void => {
        console.error(err);
      })
      .on("close", () => {
        console.log("Server closed");
        this.stream?.destroy();
      });
  }
}
