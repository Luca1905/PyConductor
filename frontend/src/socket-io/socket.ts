import { type Socket, io } from "socket.io-client";

type Hand = "Left" | "Right";
type Action =
  | "None"
  | "Closed_Fist"
  | "Open_Palm"
  | "Pointing_Up"
  | "Thumb_Down"
  | "Thumb_Up"
  | "Victory"
  | "ILoveYou";

type HandWithAction = `${Hand}:${Action}`;

interface ServerEvents {
  "action:update": (payload: string) => void;
}

interface ClientEvents {
  "frame:update": (payload: string) => void;
}

const URL = process.env.BACKEND_URL;

console.log(URL);
export const socket: Socket<ServerEvents, ClientEvents> = io(URL);
