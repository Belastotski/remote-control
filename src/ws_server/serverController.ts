import { createWebSocketStream, WebSocket, WebSocketServer } from "ws";
import socketController from "./socketController";

const streamOption = {
  allowHalfOpen: false,
  encoding: "utf8" as BufferEncoding,
  decodeStrings: false,
};

type isAliveWS = WebSocket & { isAlive: boolean };

export default class ServerController {
  interval: NodeJS.Timer;
  constructor(private server: WebSocketServer) {
    this.server
      .on("connection", (socket: isAliveWS): void => {
        const sc = new socketController(streamOption);
        const stream = createWebSocketStream(socket, streamOption);
        stream.pipe(sc).pipe(stream);
        socket.isAlive = true;
        socket.on("close", () => stream?.destroy());
        socket.on("pong", () => {
          socket.isAlive = true;
        });
      })
      .on("error", (err: Error): void => {
        console.error(err);
      })
      .on("close", () => {
        clearInterval(this.interval);
        this.server?.clients.forEach((client) => client.terminate());
      });
    this.interval = setInterval(this.ping.bind(this), 10000);
  }

  ping() {
    if (this.server?.clients) {
      this.server.clients.forEach((socket) => {
        if ((socket as isAliveWS).isAlive === false) return socket.terminate();
        (socket as isAliveWS).isAlive = false;
        socket.ping();
      });
    }
  }

  close() {
    console.log("server stop");
    this.server.close();
  }
}
