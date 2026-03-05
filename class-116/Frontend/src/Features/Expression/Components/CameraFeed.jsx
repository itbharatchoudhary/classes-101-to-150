export default function CameraFeed({ videoRef }) {
  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      width="720"
      height="560"
      className="rounded-3xl shadow-2xl border-2 border-slate-600 ring-2 ring-cyan-400/30 transition-all duration-500 hover:scale-105 hover:shadow-3xl object-cover"
    />
  );
}