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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col items-center justify-start gap-6 p-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-cyan-400 drop-shadow-lg">
        Face Expression Tracker
      </h1>

      <div className="flex flex-col md:flex-row gap-6 p-6 bg-slate-800/50 rounded-3xl shadow-2xl backdrop-blur-lg w-full max-w-7xl">
        {/* Camera Feed Container */}
        <div className="relative flex-1 bg-gradient-to-br from-slate-700 to-slate-900 rounded-3xl shadow-2xl overflow-hidden flex justify-center items-center border-2 border-cyan-400">
          <CameraFeed
            videoRef={videoRef}
            className="rounded-3xl w-full h-full object-cover shadow-inner"
          />

          {/* Overlay */}
          {trackingEnabled && (
            <FaceOverlay
              videoRef={videoRef}
              canvasRef={canvasRef}
              detections={detections}
            />
          )}

          {/* Floating Start/Stop Button */}
          <button
            onClick={() => setTrackingEnabled((prev) => !prev)}
            className={`absolute top-5 right-5 px-5 py-3 rounded-full font-bold text-white shadow-2xl transition-transform duration-200 ease-out hover:scale-110 focus:outline-none focus:ring-4 focus:ring-offset-2 ${trackingEnabled
              ? "bg-red-600 hover:bg-red-700 focus:ring-red-400"
              : "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-400"
              }`}
          >
            {trackingEnabled ? "Stop Tracking" : "Start Tracking"}
          </button>
        </div>

        {/* Emotion Panel */}
        {trackingEnabled && (
          <div className="w-full md:w-96 bg-slate-900/80 rounded-3xl shadow-2xl p-6 flex flex-col gap-5 backdrop-blur-md border border-cyan-500">
            <h2 className="text-3xl font-bold text-cyan-400 border-b border-cyan-400 pb-2 mb-4 text-center drop-shadow-lg">
              Emotions
            </h2>
            <EmotionPanel detections={detections} />
          </div>
        )}
      </div>
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

*/