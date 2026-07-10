const VIDEO_ID = "IwnnCfg4SRs";

export function VideoSection() {
  return (
    <section className="bg-gradient-to-b from-white to-sky-50 pb-8">
      <div className="container-x">
        <div className="relative aspect-video overflow-hidden rounded-[2rem] bg-navy shadow-2xl shadow-navy/20">
          <iframe
            title="Tecnología de vanguardia"
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&showinfo=0&rel=0&playsinline=1&modestbranding=1&disablekb=1`}
            allow="autoplay; encrypted-media"
            className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.35]"
          />
          {/* Overlay to block all player controls/interactions */}
          <div className="absolute inset-0" />
        </div>
      </div>
    </section>
  );
}
