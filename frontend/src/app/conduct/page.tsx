"use client";

import { useRef, useCallback } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export default function Conduct() {
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(imageSrc);
    }
  }, [webcamRef]);

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-black">
      <section
        id="main"
        className="relative z-10 grid min-h-[100dvh] place-items-center px-6"
      >
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
        />
        <button className="text-white" onClick={capture}>
          Capture photo
        </button>
        );
      </section>
    </main>
  );
}
