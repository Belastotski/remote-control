import * as Jimp from "jimp";
import * as robot from "robotjs";
export type ECommands =
  | "mouse_up"
  | "mouse_down"
  | "mouse_left"
  | "mouse_right"
  | "mouse_position"
  | "draw_circle"
  | "draw_rectangle"
  | "draw_square";

export const commands = {
  mouse_left(x = 0, y = 0) {
    robot.moveMouse(...getXY(x, y));
  },
  mouse_right(x = 0, y = 0) {
    robot.moveMouse(...getXY(-x, y));
  },
  mouse_up(y = 0, x = 0) {
    robot.moveMouse(...getXY(x, y));
  },
  mouse_down(y = 0, x = 0) {
    robot.moveMouse(...getXY(x, -y));
  },
  mouse_position() {
    const { x, y } = robot.getMousePos();
    return `${x},${y}`;
  },
  draw_circle(radius = 0) {
    robot.setMouseDelay(2);
    const { x, y } = robot.getMousePos();
    const rx = x + +radius;
    robot.mouseClick();
    robot.mouseToggle("down");
    for (let index = 0; index <= Math.PI * 2; index += 0.01) {
      const dx = rx - radius * Math.cos(index);
      const dy = y - radius * Math.sin(index);
      robot.dragMouse(dx, dy);
    }
    robot.mouseToggle("up");
  },
  draw_rectangle(w = 0, h = 0) {
    const { x, y } = robot.getMousePos();
    robot.setMouseDelay(2);
    robot.mouseClick();
    robot.mouseToggle("down");
    dragMouse(x + w, y)(x + w, y + h)(x, y + h)(x, y);
    robot.mouseToggle("up");
  },
  draw_square(w = 0) {
    const { x, y } = robot.getMousePos();
    robot.setMouseDelay(2);
    robot.mouseClick();
    robot.mouseToggle("down");
    dragMouse(x + w, y)(x + w, y + w)(x, y + w)(x, y);
    robot.mouseToggle("up");
  },
  async prnt_scrn(h: number) {
    try {
      h = h || 200;
      const { x, y } = robot.getMousePos();
      const bmp = robot.screen.capture(x, y, h, h);
      for (let i = 0; i < bmp.width * bmp.height * 4; i += 4) {
        [bmp.image[i], bmp.image[i + 2]] = [bmp.image[i + 2], bmp.image[i]];
      }
      const img = new Jimp({
        data: bmp.image,
        width: bmp.width,
        height: bmp.height,
      });
      return await img
        .getBase64Async(img.getMIME())
        .then((img) => img.substring(22));
    } catch (e) {
      console.log(e);
    }
  },
};

function getXY(dx?: number, dy?: number): [number, number] {
  let { x, y } = robot.getMousePos();
  x -= dx || 0;
  if (x < 0) x = 0;
  y -= dy || 0;
  if (y < 0) y = 0;
  return [x, y];
}
function dragMouse(nx: number, ny: number): typeof dragMouse {
  robot.dragMouse(nx, ny);
  return dragMouse;
}
