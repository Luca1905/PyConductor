import { socket } from "./socket";

export async function sendFrame(blob: string) {
  socket.emit("frame:update", blob);
}
