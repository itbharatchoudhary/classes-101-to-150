import "../Styles/CameraFeed.scss";

export default function CameraFeed({ videoRef }) {
  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      width="720"
      height="560"
      className="camera-feed"
    />
  );
}