import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

// Components   
// - CameraFeed: Displays the live video feed from the user's webcam.
// - FaceOverlay: Draws bounding boxes and landmarks on detected faces.
// - EmotionPanel: Displays the detected emotions and their confidence levels.
// - Player: Component to play songs based on the detected mood (not shown in this code snippet but part of the overall feature).

import CameraFeed from "../../Expression/Components/CameraFeed";
import FaceOverlay from "../../Expression/Components/FaceOverlay";
import EmotionPanel from "../../Expression/Components/EmotionPanel";
import Player from "../Components/Player";

// Hooks
// - useCamera: Custom hook to manage webcam access and video stream.
// - useFaceApiModels: Custom hook to load face-api.js models and track loading state.
// - useSong: Custom hook to fetch songs based on detected mood.

import useCamera from "../../Expression/Hooks/useCamera";
import useFaceApiModels from "../../Expression/Hooks/useFaceApiModel";
import useSong from "../Hooks/useSong";

// Styles
// - Home.scss: Styles specific to the Home component, including layout and design for the camera feed, emotion panel, and toggle button.
import "../Styles/Home.scss";

// Utils
// - getDominantEmotion: Utility function to determine the dominant emotion from the detected expressions.
// - emotionToMood: Utility function to map detected emotions to broader mood categories for song fetching.
import { getDominantEmotion } from "../../Expression/Utils/imageUtils";
import { emotionToMood } from "../../Expression/Utils/EmotionToMood";


/**
 * Home component that integrates face detection, emotion recognition, and song fetching based on mood.
 * - Uses face-api.js for real-time face detection and emotion recognition.
 * - Maps detected emotions to moods and fetches songs accordingly.
 * - Provides a toggle to start/stop emotion tracking.
 */

export default function Home() {

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const { startCamera } = useCamera(videoRef);
    const { modelsLoaded } = useFaceApiModels();

    const [detections, setDetections] = useState([]);
    const [trackingEnabled, setTrackingEnabled] = useState(true);

    const { handleGetSong } = useSong();
    const [lastMood, setLastMood] = useState(null);

    /**
     * Main effect to handle face detection and emotion tracking.
     * - Waits for models to load before starting detection.
     * - Uses requestAnimationFrame for efficient detection loop.
     * - Updates detections state and triggers song fetching on mood change.
     */

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

                if (result.length > 0) {
                    const emotion = getDominantEmotion(result[0].expressions);
                    const mood = emotionToMood(emotion);

                    if (mood !== lastMood) {
                        setLastMood(mood);
                        handleGetSong(mood);
                    }
                }

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

                        <Player detections={detections} />

                    </div>
                )}

            </div>
        </div>
    );
}