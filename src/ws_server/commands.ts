import {
  circle,
  move,
  position,
  printScreen,
  rectangle,
  square,
} from "./utils";

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
    return move(x, y);
  },
  mouse_right(x = 0, y = 0) {
    return move(-x, y);
  },
  mouse_up(y = 0, x = 0) {
    return move(x, y);
  },
  mouse_down(y = 0, x = 0) {
    return move(x, -y);
  },
  mouse_position() {
    return position();
  },
  draw_circle(radius = 0) {
    return circle(radius);
  },
  draw_rectangle(w = 0, h = 0) {
    return rectangle(w, h);
  },
  draw_square(w = 0) {
    return square(w);
  },
  async prnt_scrn(h: number) {
    return await printScreen(h);
  },
};
