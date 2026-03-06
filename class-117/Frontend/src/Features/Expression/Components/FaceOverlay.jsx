import { useEffect } from "react";
import * as faceapi from "face-api.js";
import "../Styles/FaceOverlay.scss";

export default function FaceOverlay({ videoRef, canvasRef, detections }) {

  useEffect(() => {

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    // IMPORTANT FIX
    if (video.videoWidth === 0 || video.videoHeight === 0) return;

    const displaySize = {
      width: video.videoWidth,
      height: video.videoHeight,
    };

    canvas.width = displaySize.width;
    canvas.height = displaySize.height;

    faceapi.matchDimensions(canvas, displaySize);

    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

  }, [detections, videoRef, canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      className="face-overlay"
    />
  );
}