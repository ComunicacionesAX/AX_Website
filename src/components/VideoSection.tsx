"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "@/i18n/context";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
  }
}

// Video del home según idioma.
const VIDEO_IDS = {
  es: "D2yQjV562jE",
  en: "A_Kv16wJbZs",
} as const;

// Carga (una sola vez) el script de la API de YouTube.
let apiPromise: Promise<void> | null = null;
function loadYouTubeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if ((window as unknown as { YT?: { Player: unknown } }).YT?.Player) {
    return Promise.resolve();
  }
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        resolve();
      };
      document.head.appendChild(tag);
    });
  }
  return apiPromise;
}

export function VideoSection() {
  const { t, lang } = useI18n();
  const videoId = VIDEO_IDS[lang];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let player: { destroy: () => void } | null = null;
    let cancelled = false;

    loadYouTubeApi().then(() => {
      if (cancelled || !containerRef.current) return;
      const YT = (window as unknown as { YT: { Player: new (el: HTMLElement, opts: object) => { destroy: () => void } } }).YT;

      // Desactiva subtítulos de forma robusta vía la API del reproductor.
      const killCaptions = (target: {
        unloadModule?: (m: string) => void;
        setOption?: (m: string, k: string, v: unknown) => void;
      }) => {
        try {
          target.setOption?.("captions", "track", {});
          target.unloadModule?.("captions");
          target.unloadModule?.("cc");
        } catch {
          /* noop */
        }
      };

      player = new YT.Player(containerRef.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: videoId,
          controls: 0,
          rel: 0,
          playsinline: 1,
          modestbranding: 1,
          disablekb: 1,
          iv_load_policy: 3,
          fs: 0,
          cc_load_policy: 0,
        },
        events: {
          onReady: (e: { target: { playVideo: () => void; setPlaybackQuality: (q: string) => void } & Parameters<typeof killCaptions>[0] }) => {
            killCaptions(e.target);
            e.target.setPlaybackQuality("hd1080");
            e.target.playVideo();
          },
          onStateChange: (e: { target: Parameters<typeof killCaptions>[0] }) => killCaptions(e.target),
        },
      });
    });

    return () => {
      cancelled = true;
      try {
        player?.destroy();
      } catch {
        /* noop */
      }
    };
  }, [videoId]);

  return (
    <section className="bg-gradient-to-b from-white to-sky-50 pb-8">
      <div className="container-x">
        <div className="relative aspect-video overflow-hidden rounded-[2rem] bg-navy shadow-2xl shadow-navy/20">
          {/* La API de YouTube reemplaza este div por el iframe del reproductor. */}
          <div
            ref={containerRef}
            title={t.videoSection.title}
            className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 scale-[1.02]"
          />
          {/* Overlay que bloquea hover/controles y el título de YouTube */}
          <div className="absolute inset-0 z-10" />
        </div>
      </div>
    </section>
  );
}
