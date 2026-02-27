export default function CameraFeed({ videoRef }) {
  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      width="720"
      height="560"
      className="
        rounded-3xl        
        shadow-2xl         /* deeper, softer shadow */
        border-2           /* slightly thicker border */
        border-slate-600   /* subtle border color */
        ring-2             /* subtle ring for glow effect */
        ring-cyan-400/30   /* semi-transparent cyan ring */
        transition-all 
        duration-500 
        hover:scale-105    /* slight zoom on hover */
        hover:shadow-3xl   /* stronger shadow on hover */
        object-cover       /* ensures video covers the area nicely */
      "
    />
  );
}