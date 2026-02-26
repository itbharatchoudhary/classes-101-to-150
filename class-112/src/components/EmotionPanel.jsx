export default function EmotionPanel({ detections }) {
  if (!detections.length)
    return <p className="text-slate-400">No face detected</p>;

  const expressions = detections[0].expressions;

  const dominant = Object.entries(expressions).reduce((max, curr) =>
    curr[1] > max[1] ? curr : max
  )[0];

  return (
    <div className="bg-slate-800 p-5 rounded-xl shadow-lg w-72">
      <h2 className="text-lg font-semibold mb-3 text-center">
        Dominant: {dominant}
      </h2>

      <div className="space-y-2">
        {Object.entries(expressions).map(([emotion, value]) => (
          <div key={emotion}>
            <div className="flex justify-between text-sm">
              <span>{emotion}</span>
              <span>{(value * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded h-2">
              <div
                className="bg-cyan-400 h-2 rounded"
                style={{ width: `${value * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/*
EMOTION DASHBOARD

✔ Displays dominant emotion
✔ Shows probability bars
✔ Styled using Tailwind cards + progress bars
✔ Automatically updates with detection results
*/