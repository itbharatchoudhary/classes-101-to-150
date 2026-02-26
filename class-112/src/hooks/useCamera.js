export default function useCamera(videoRef) {
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 720, height: 560 },
      });

      const video = videoRef.current;
      if (!video) return;

      video.srcObject = stream;

      await new Promise((resolve) => {
        video.onloadedmetadata = () => {
          video.play();
          resolve();
        };
      });
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  };

  return { startCamera };
}

/*
CAMERA HOOK

✔ Requests webcam permission
✔ Streams video to element
✔ Waits for metadata before use
✔ Handles browser errors safely
*/