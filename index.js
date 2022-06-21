import Jimp from "jimp";
import { httpServer } from "./src/http_server/";
import robot from "robotjs";
import { WebSocketServer } from "ws";
import  ServerController  from "./src/ws_server/serverController";

const HTTP_PORT = 3000;

const PORT = Number(process.env.PORT) || 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const server = new WebSocketServer({ port: PORT });
new ServerController(server);
