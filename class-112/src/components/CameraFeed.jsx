export default function CameraFeed({ videoRef }) {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        width="720"
        height="560"
        style={{ borderRadius: "10px" }}
      />
    </div>
  );
}

/*
Video container now positioned properly
so overlay canvas aligns perfectly.
*/