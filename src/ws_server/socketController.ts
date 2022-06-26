import { Transform, TransformCallback } from "node:stream";
import internal = require("node:stream");
import { ECommands, commands } from "./commands";

export default class SocketController extends Transform {
  constructor(options: internal.DuplexOptions) {
    super(options);
  }

  private async controller(
    args: [ECommands, number | undefined, number | undefined]
  ) {
    const [command, arg1, arg2] = args;
    let res: string | void;
    if (!Object.prototype.hasOwnProperty.call(commands, command)) {
      res = "Not Found Command";
    } else res = await commands[command](Number(arg1), Number(arg2));
    return `${command} ${res ? res : ""}\0`;
  }

  async _transform(
    chunk: string,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): Promise<undefined> {
    try {
      const res = await this.controller(
        chunk.toString().split(" ") as [
          ECommands,
          number | undefined,
          number | undefined
        ]
      );
      callback(null, res);
      return undefined;
    } catch (err: unknown) {
      callback(err as Error);
    }
  }
}
