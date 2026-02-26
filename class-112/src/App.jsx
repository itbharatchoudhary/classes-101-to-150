import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

import CameraFeed from "./components/CameraFeed";
import FaceOverlay from "./components/FaceOverlay";
import EmotionPanel from "./components/EmotionPanel";

import useCamera from "./hooks/useCamera";
import useFaceApiModels from "./hooks/useFaceApiModels";

export default function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const { startCamera } = useCamera(videoRef);
  const { modelsLoaded } = useFaceApiModels();

  const [detections, setDetections] = useState([]);

  useEffect(() => {
    if (!modelsLoaded) return;

    let animationId;

    const runDetection = async () => {
      const video = videoRef.current;
      if (!video) {
        animationId = requestAnimationFrame(runDetection);
        return;
      }

      // Wait until video is ready
      if (!video.videoWidth || !video.videoHeight) {
        animationId = requestAnimationFrame(runDetection);
        return;
      }

      try {
        const results = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()      // MUST COME FIRST
          .withFaceExpressions();   // THEN EXPRESSIONS

        setDetections(results);
      } catch (err) {
        console.error("Detection error:", err);
      }

      animationId = requestAnimationFrame(runDetection);
    };

    startCamera();
    runDetection();

    return () => cancelAnimationFrame(animationId);
  }, [modelsLoaded]);

  return (
    <div style={{ textAlign: "center", paddingTop: 20 }}>
      <h2>Face Expression Tracker</h2>

      <div style={{ position: "relative", display: "inline-block" }}>
        <CameraFeed videoRef={videoRef} />
        <FaceOverlay
          videoRef={videoRef}
          canvasRef={canvasRef}
          detections={detections}
        />
      </div>

      <EmotionPanel detections={detections} />
    </div>
  );
}

/*
MAIN CONTROLLER

Responsibilities:
✔ Starts webcam
✔ Runs face detection loop using requestAnimationFrame
✔ Ensures video dimensions exist before detection
✔ Sends results to UI components
✔ Uses professional non-blocking detection loop
*/