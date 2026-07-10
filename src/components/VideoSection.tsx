const VIDEO_ID = "1asVIB9VAuc";

export function VideoSection() {
  return (
    <section className="bg-gradient-to-b from-white to-sky-50 pb-8">
      <div className="container-x">
        <div className="relative aspect-video overflow-hidden rounded-[2rem] bg-navy shadow-2xl shadow-navy/20">
          {/* Escala ligera para recortar la barra de título/controles de YouTube
              sin sobredimensionar el video */}
          <iframe
            title="Tecnología de vanguardia"
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&showinfo=0&rel=0&playsinline=1&modestbranding=1&disablekb=1`}
            allow="autoplay; encrypted-media"
            className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 scale-[1.25]"
          />
          {/* Overlay que bloquea hover/controles y el título de YouTube */}
          <div className="absolute inset-0 z-10" />
        </div>
      </div>
    </section>
  );
}
