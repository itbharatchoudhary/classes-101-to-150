import { useEffect } from "react";
import * as faceapi from "face-api.js";

export default function FaceOverlay({ videoRef, canvasRef, detections }) {
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;
    if (!video.videoWidth || !video.videoHeight) return;

    const displaySize = {
      width: video.videoWidth,
      height: video.videoHeight,
    };

    canvas.width = displaySize.width;
    canvas.height = displaySize.height;

    faceapi.matchDimensions(canvas, displaySize);

    const resized = faceapi.resizeResults(detections, displaySize);

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    faceapi.draw.drawDetections(canvas, resized);
    faceapi.draw.drawFaceLandmarks(canvas, resized);
    faceapi.draw.drawFaceExpressions(canvas, resized);
  }, [detections]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
      }}
    />
  );
}

/*
DRAWING LAYER

✔ Matches canvas to video resolution
✔ Draws bounding box
✔ Draws landmarks
✔ Draws emotion labels
✔ Prevents zero-dimension crash
*/