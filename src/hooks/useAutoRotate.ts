"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  intervalMs?: number;
  stopOnInteract?: boolean;
  loopBackDelayMs?: number;
  resumeAfterMs?: number;
};

export function useAutoRotate(total: number, options: Options = {}) {
  const {
    intervalMs = 5000,
    stopOnInteract = true,
    loopBackDelayMs = 3000,
    resumeAfterMs,
  } = options;
  const [slide, setSlideState] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (total <= 1 || stopped || paused) {
      clearTimer();
      return;
    }
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const isLast = slide === total - 1;
    const delay = intervalMs + (isLast ? loopBackDelayMs : 0);

    timerRef.current = setTimeout(() => {
      setSlideState((prev) => (prev + 1) % total);
    }, delay);

    return clearTimer;
  }, [total, paused, stopped, intervalMs, loopBackDelayMs, slide]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const setSlide = (idx: number) => {
    setSlideState(idx);
    if (stopOnInteract) {
      setStopped(true);
      if (resumeAfterMs) {
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = setTimeout(() => {
          setStopped(false);
        }, resumeAfterMs);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (total <= 1 || stopped || paused) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProgress(1);
      return;
    }

    const isLast = slide === total - 1;
    const dur = intervalMs + (isLast ? loopBackDelayMs : 0);
    const start = performance.now();
    setProgress(0);

    const tick = (t: number) => {
      const elapsed = t - start;
      const p = Math.min(1, elapsed / dur);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [slide, total, stopped, paused, intervalMs, loopBackDelayMs]);

  return {
    slide,
    setSlide,
    progress,
    containerProps: {
      onMouseEnter: () => setPaused(true),
      onMouseLeave: () => setPaused(false),
      onFocus: () => setPaused(true),
      onBlur: (e: React.FocusEvent<HTMLElement>) => {
        if (
          e.relatedTarget &&
          e.currentTarget.contains(e.relatedTarget as Node)
        ) {
          return;
        }
        setPaused(false);
      },
    },
  };
}
