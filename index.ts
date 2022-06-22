import "dotenv/config";
import { httpServer } from "./src/http_server";
import { WebSocketServer } from "ws";
import ServerController from "./src/ws_server/serverController";

const HTTP_PORT = Number(process.env.HTTP_PORT) || 3000;
const WS_PORT = Number(process.env.PORT) || 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const server = new WebSocketServer({ port: WS_PORT });
new ServerController(server);
