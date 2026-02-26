export default function CameraFeed({ videoRef }) {
  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      width="720"
      height="560"
      className="rounded-2xl  shadow-lg border border-slate-700"
    />
  );
}

/*
VIDEO DISPLAY COMPONENT

✔ Shows webcam stream
✔ Styled with Tailwind
✔ No business logic (pure UI component)
*/