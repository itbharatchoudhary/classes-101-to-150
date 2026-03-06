import "../Styles/EmotionPanel.scss";

export default function EmotionPanel({ detections }) {
  if (!detections.length)
    return <p className="no-face">No face detected</p>;

  const expressions = detections[0].expressions;

  const dominant = Object.entries(expressions).reduce(
    (max, curr) => (curr[1] > max[1] ? curr : max)
  )[0];

  return (
    <div className="emotion-panel">
      <h2 className="emotion-title">
        Dominant Emotion:
        <span className="emotion-dominant">{dominant}</span>
      </h2>

      {/* <div className="emotion-list">
        {Object.entries(expressions).map(([emotion, value]) => (
          <div key={emotion} className="emotion-item">
            <div className="emotion-header">
              <span className="emotion-name">{emotion}</span>
              <span className="emotion-value">
                {(value * 100).toFixed(1)}%
              </span>
            </div>

            <div className="emotion-bar-bg">
              <div
                className={`emotion-bar ${emotion}`}
                style={{ width: `${value * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="emotion-footer">
        Updated in real-time with face detection results
      </p> */}
    </div>
  );
}