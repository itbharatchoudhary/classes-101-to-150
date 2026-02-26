export default function EmotionPanel({ detections }) {
  if (!detections.length) return <p>No face detected</p>;

  const expressions = detections[0].expressions;

  const dominantEmotion = Object.entries(expressions).reduce((max, curr) =>
    curr[1] > max[1] ? curr : max
  )[0];

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Dominant Emotion: {dominantEmotion}</h3>

      {Object.entries(expressions).map(([emotion, value]) => (
        <div key={emotion}>
          {emotion}: {(value * 100).toFixed(1)}%
        </div>
      ))}
    </div>
  );
}

/*
EMOTION VISUALIZER

✔ Shows dominant emotion
✔ Displays probability of each expression
✔ Reads results from face-api detection object
*/