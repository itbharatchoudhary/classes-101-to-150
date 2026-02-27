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
      console.error("Camera access error:", err);
    }
  };

  return { startCamera };
}

/*
CAMERA ACCESS HOOK

✔ Requests webcam permission
✔ Streams camera to video element
✔ Waits until video metadata loads
✔ Handles errors safely
*/