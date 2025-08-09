"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { socket } from "../../socket-io/socket";
import { sendFrame } from "@/socket-io/event-emitters";

const videoConstraints = {
  width: 640,
  height: 360,
  facingMode: "user",
} as const;

export default function Conduct() {
  const webcamRef = useRef<Webcam | null>(null);
  const [capturing, setCapturing] = useState<boolean>(false);
  const [frames, setFrames] = useState<string[]>([]);
  const captureIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleActionUpdate = useCallback((payload: string) => {
    console.log(payload);
  }, []);

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

  // Function to capture a single frame
  const captureFrame = useCallback(() => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot(); // base64 image
    if (imageSrc) {
      setFrames((prev) => [...prev, imageSrc]);

      console.log("Captured frame:", imageSrc.substring(0, 50) + "...");
      sendFrame(imageSrc);
    }
  }, []);

  // Start capturing frames
  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    setFrames([]);
    captureIntervalRef.current = setInterval(captureFrame, 1000 / 10); // 10 FPS
  }, [captureFrame]);

  // Stop capturing frames
  const handleStopCapture = useCallback(() => {
    setCapturing(false);
    if (captureIntervalRef.current) {
      clearInterval(captureIntervalRef.current);
      captureIntervalRef.current = null;
    }
  }, []);

  // Download all frames as images
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
          <button onClick={handleStopCapture}>Stop Streaming</button>
        ) : (
          <button onClick={handleStartCaptureClick}>Start Capture</button>
        )}

        {frames.length > 0 && (
          <button onClick={handleDownloadFrames}>Download Frames</button>
        )}
      </section>
    </main>
  );
}
