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

export type HandWithAction = `${Hand}:${Action}`;

interface ServerEvents {
  "action:update": (payload: HandWithAction) => void;
}

interface ClientEvents {
  "frame:update": (payload: string) => void;
}

export const socket: Socket<ServerEvents, ClientEvents> = io(
  process.env.BACKEND_URL ?? "https://pyconductor.onrender.com:5000",
  { port: 5000 },
);
