"use client";

import { useState } from "react";
import Image from "next/image";

const VIDEO_ID = "IwnnCfg4SRs";

export function VideoSection() {
  const [play, setPlay] = useState(false);

  return (
    <section className="bg-gradient-to-b from-white to-sky-50 pb-8">
      <div className="container-x">
        <div className="relative aspect-video overflow-hidden rounded-[2rem] bg-navy shadow-2xl shadow-navy/20">
          {play ? (
            <iframe
              title="Tecnología de vanguardia"
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              onClick={() => setPlay(true)}
              className="group absolute inset-0 h-full w-full"
              aria-label="Reproducir video"
            >
              <Image
                src="/images/home_produccion_fotograma.webp"
                alt="Tecnología de vanguardia"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <span className="absolute inset-0 bg-navy/15 transition group-hover:bg-navy/25" />
              {/* play button */}
              <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-red-600 shadow-xl transition group-hover:scale-110">
                <svg viewBox="0 0 24 24" fill="white" className="ml-1 h-9 w-9">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
