"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { socket } from "@/socket-io/socket";
import { sendFrame } from "@/socket-io/event-emitters";
import { CirclePause, Play } from "lucide-react";
import useSound from "use-sound";
import type { HandWithAction } from "@/socket-io/socket";
const videoConstraints = {
  width: 640,
  height: 360,
  facingMode: "user",
} as const;

export default function Conduct() {
  const [playA, { stop: stopA }] = useSound("/A.mp3");
  const [playB, { stop: stopB }] = useSound("/B.mp3");
  const [playC, { stop: stopC }] = useSound("/C.mp3");
  const [playD, { stop: stopD }] = useSound("/D.mp3");
  const [playE, { stop: stopE }] = useSound("/E.mp3");
  const [playF, { stop: stopF }] = useSound("/F.mp3");
  const [playG, { stop: stopG }] = useSound("/G.mp3");

  const webcamRef = useRef<Webcam | null>(null);
  const [capturing, setCapturing] = useState<boolean>(false);
  const [frames, setFrames] = useState<string[]>([]);
  const captureIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopAll = () => {
    stopA();
    stopB();
    stopC();
    stopD();
    stopE();
    stopF();
    stopG();
  };

  const soundTimeouts = useRef<Record<string, NodeJS.Timeout | null>>({});

  const playWithTimeout = (
    playFn: () => void,
    stopFn: () => void,
    key: string,
  ) => {
    // Stop all sounds before playing a new one
    stopAll();

    // Clear any existing timeout for this sound
    if (soundTimeouts.current[key]) {
      clearTimeout(soundTimeouts.current[key]);
    }

    // Play the sound
    playFn();

    // Set a timeout to stop it after 7 seconds
    soundTimeouts.current[key] = setTimeout(() => {
      stopFn();
      soundTimeouts.current[key] = null;
    }, 7000);
  };

  const handleActionUpdate = useCallback(
    (payload: HandWithAction) => {
      stopAll();
      console.log(payload);

      switch (payload) {
        // LEFT HAND
        case "Left:None":
          playA();
          break;
        case "Left:ILoveYou":
          playB();
          break;
        case "Left:Open_Palm":
          playC();
          break;
        case "Left:Pointing_Up":
          playD();
          break;
        case "Left:Thumb_Down":
          playE();
          break;
        case "Left:Thumb_Up":
          playF();
          break;
        case "Left:Victory":
          playG();
          break;

        // RIGHT HAND
        case "Right:None":
          playA();
          break;
        case "Right:ILoveYou":
          playB();
          break;
        case "Right:Open_Palm":
          playC();
          break;
        case "Right:Pointing_Up":
          playD();
          break;
        case "Right:Thumb_Down":
          playE();
          break;
        case "Right:Thumb_Up":
          playF();
          break;
        case "Right:Victory":
          playG();
          break;
        case "Right:Closed_Fist":
        case "Left:Closed_Fist":
        default:
          stopAll();
      }
    },
    [
      playA,
      stopA,
      playB,
      stopB,
      playC,
      stopC,
      playD,
      stopD,
      playE,
      stopE,
      playF,
      stopF,
      playG,
      stopG,
      playWithTimeout,
    ],
  );

  useEffect(() => {
    socket.on("action:update", handleActionUpdate);

    if (socket.connected) {
      console.log("[SOCKET] connected");
    } else {
      socket.connect();
    }

    return () => {
      socket.off("action:update", handleActionUpdate);
    };
  }, [handleActionUpdate]);

  const captureFrame = useCallback(() => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setFrames((prev) => [...prev, imageSrc]);
      console.log("Captured frame:", imageSrc.substring(0, 50) + "...");
      sendFrame(imageSrc);
    }
  }, []);

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    setFrames([]);
    captureIntervalRef.current = setInterval(captureFrame, 1000 / 10);
  }, [captureFrame]);

  const handleStopCapture = useCallback(() => {
    setCapturing(false);
    if (captureIntervalRef.current) {
      clearInterval(captureIntervalRef.current);
      captureIntervalRef.current = null;
    }
  }, []);

  const handleDownloadFrames = useCallback(() => {
    frames.forEach((frame, index) => {
      const a = document.createElement("a");
      a.href = frame;
      a.download = `frame_${index}.png`;
      a.click();
    });
  }, [frames]);

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-black text-white">
      <section
        id="main"
        className="relative z-10 grid min-h-[100dvh] place-items-center px-6"
      >
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/png"
          videoConstraints={videoConstraints}
          mirrored
        />

        {capturing ? (
          <button onClick={handleStopCapture}>
            <CirclePause />
          </button>
        ) : (
          <button onClick={handleStartCaptureClick}>
            <Play />
          </button>
        )}

        {frames.length > 0 && (
          <button onClick={handleDownloadFrames}>Download Frames</button>
        )}
      </section>
    </main>
  );
}
