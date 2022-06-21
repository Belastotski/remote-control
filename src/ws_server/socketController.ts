import { Transform, TransformCallback } from "node:stream";

export default class SocetController extends Transform {
  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    try {
      console.log("transform: ", chunk.toString());
      callback(null, chunk);
    } catch (err: any) {
      callback(err);
    }
  }
}
