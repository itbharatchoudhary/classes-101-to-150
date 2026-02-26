import { useEffect } from "react";
import * as faceapi from "face-api.js";

export default function FaceOverlay({ videoRef, canvasRef, detections }) {
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;
    if (!video.videoWidth || !video.videoHeight) return;

    const size = {
      width: video.videoWidth,
      height: video.videoHeight,
    };

    canvas.width = size.width;
    canvas.height = size.height;

    faceapi.matchDimensions(canvas, size);

    const resized = faceapi.resizeResults(detections, size);

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    faceapi.draw.drawDetections(canvas, resized);
    faceapi.draw.drawFaceLandmarks(canvas, resized);
    faceapi.draw.drawFaceExpressions(canvas, resized);
  }, [detections]);

  return <canvas ref={canvasRef} className="absolute top-0 left-0" />;
}

/*
CANVAS OVERLAY

✔ Matches canvas to video size
✔ Draws face box, landmarks, emotions
✔ Clears previous frame before drawing
✔ Positioned above video using absolute layout
*/