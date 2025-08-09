import { socket } from "./socket";

export function sendFrame(blob: string) {
  socket.emit("frame:update", blob);
}
