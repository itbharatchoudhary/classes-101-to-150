import { useEffect, useState } from "react";
import * as faceapi from "face-api.js";

export default function useFaceApiModels() {
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      const MODEL_URL = "/models";

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);

      setModelsLoaded(true);
      console.log("Face API models loaded");
    };

    load();
  }, []);

  return { modelsLoaded };
}

/*
MODEL LOADING HOOK

✔ Loads neural networks from public/models
✔ Runs once on app start
✔ Enables detection only after models ready
*/