import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

import CameraFeed from "../../Expression/Components/CameraFeed";
import FaceOverlay from "../../Expression/Components/FaceOverlay";
import EmotionPanel from "../../Expression/Components/EmotionPanel";

import useCamera from "../../Expression/Hooks/useCamera";
import useFaceApiModels from "../../Expression/Hooks/useFaceApiModel";

import "../Styles/Home.scss";

export default function Home() {

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
        <div className="home">

            <h1 className="title">
                Face Expression Tracker
            </h1>

            <div className="main-container">

                {/* Camera Section */}
                <div className="camera-container">

                    <div className="camera-wrapper">
                        <CameraFeed videoRef={videoRef} />

                        <FaceOverlay
                            videoRef={videoRef}
                            canvasRef={canvasRef}
                            detections={detections}
                        />
                    </div>

                    <button
                        className="toggle-btn"
                        onClick={() => setTrackingEnabled(prev => !prev)}
                    >
                        {trackingEnabled ? "Stop Tracking" : "Start Tracking"}
                    </button>

                </div>

                {/* Emotion Panel */}
                {trackingEnabled && (
                    <div className="emotion-panel">

                        <h2>Emotions</h2>

                        <EmotionPanel detections={detections} />

                    </div>
                )}

            </div>
        </div>
    );
}