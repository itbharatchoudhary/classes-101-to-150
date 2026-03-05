export default function EmotionPanel({ detections }) {
  if (!detections.length)
    return (
      <p className="text-slate-400 text-center italic mt-4">
        No face detected
      </p>
    );

  const expressions = detections[0].expressions;

  const dominant = Object.entries(expressions).reduce(
    (max, curr) => (curr[1] > max[1] ? curr : max)
  )[0];

  // Optional: colors for each emotion
  const emotionColors = {
    happy: "bg-yellow-400",
    sad: "bg-blue-400",
    angry: "bg-red-500",
    surprised: "bg-purple-400",
    neutral: "bg-slate-400",
    disgusted: "bg-green-500",
    fearful: "bg-pink-400",
  };

  return (
    <div className="bg-slate-900 p-5 rounded-2xl shadow-2xl max-w-md mx-auto">
      {/* Dominant Emotion */}
      <h2 className="text-2xl font-bold text-center text-white mb-5">
        Dominant Emotion:{" "}
        <span className="text-cyan-400 capitalize">{dominant}</span>
      </h2>

      {/* Emotion Bars */}
      <div className="space-y-4">
        {Object.entries(expressions).map(([emotion, value]) => (
          <div key={emotion} className="group">
            <div className="flex justify-between mb-1 text-sm text-slate-300">
              <span className="capitalize">{emotion}</span>
              <span className="font-mono">{(value * 100).toFixed(1)}%</span>
            </div>

            <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
              <div
                className={`h-4 rounded-full transition-all duration-500 ease-out ${
                  emotionColors[emotion] || "bg-cyan-400"
                }`}
                style={{ width: `${value * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Optional info */}
      <p className="mt-5 text-center text-slate-400 text-xs italic">
        Updated in real-time with face detection results
      </p>
    </div>
  );
}