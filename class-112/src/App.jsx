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
  const [trackingEnabled, setTrackingEnabled] = useState(true);

  useEffect(() => {
    if (!modelsLoaded) return;

    let animationId;

    const detect = async () => {
      const video = videoRef.current;

      if (!video || !trackingEnabled) {
        animationId = requestAnimationFrame(detect);
        return;
      }

      if (!video.videoWidth || !video.videoHeight) {
        animationId = requestAnimationFrame(detect);
        return;
      }

      try {
        const result = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();

        setDetections(result);
      } catch (err) {
        console.error(err);
      }

      animationId = requestAnimationFrame(detect);
    };

    startCamera();
    detect();

    return () => cancelAnimationFrame(animationId);
  }, [modelsLoaded, trackingEnabled]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Face Expression Tracker</h1>

      <button
        onClick={() => setTrackingEnabled((prev) => !prev)}
        className={`px-6 py-2.5 rounded-xl font-semibold text-white shadow-md transition-all duration-200 ease-out active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 ${trackingEnabled ? "bg-red-500 hover:bg-red-600 focus:ring-red-400 shadow-red-200" : "bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-400 shadow-emerald-200"}`}
      >
        {trackingEnabled ? "Stop Tracking" : "Start Tracking"}
      </button>

      <div className="relative">
        <CameraFeed videoRef={videoRef} />

        {trackingEnabled && (
          <FaceOverlay
            videoRef={videoRef}
            canvasRef={canvasRef}
            detections={detections}
          />
        )}
      </div>

      {trackingEnabled && <EmotionPanel detections={detections} />}
    </div>
  );
}

/*
MAIN APPLICATION CONTROLLER

✔ Loads AI models
✔ Starts webcam
✔ Runs detection loop using requestAnimationFrame
✔ Provides toggle control for emotion tracking
✔ Passes detection data to UI components
✔ Uses Tailwind for layout and styling
*/