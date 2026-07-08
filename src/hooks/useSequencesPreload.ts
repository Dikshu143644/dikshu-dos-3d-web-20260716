"use client";

import { useEffect, useRef, useState } from "react";

export interface SequenceConfig {
  id: string;
  count: number;
  getSrc: (frameIndex: number) => string;
}

/**
 * Preloads every frame of every sequence and only signals ready once all of
 * them have settled (loaded or errored) — the story section needs every
 * frame in memory before the first scrub, not just a priority subset.
 */
export function useSequencesPreload(sequences: SequenceConfig[]) {
  const imagesRef = useRef<Record<string, HTMLImageElement[]>>({});
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let loaded = 0;
    const total = sequences.reduce((sum, seq) => sum + seq.count, 0);

    sequences.forEach((seq) => {
      const frames: HTMLImageElement[] = new Array(seq.count);
      imagesRef.current[seq.id] = frames;

      for (let i = 0; i < seq.count; i += 1) {
        const img = new window.Image();
        img.decoding = "async";
        img.src = seq.getSrc(i);
        const onSettle = () => {
          if (cancelled) return;
          loaded += 1;
          setProgress(Math.round((loaded / total) * 100));
          if (loaded >= total) setReady(true);
        };
        img.onload = onSettle;
        img.onerror = onSettle;
        frames[i] = img;
      }
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { imagesRef, progress, ready };
}
