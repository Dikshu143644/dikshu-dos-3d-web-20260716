"use client";

import { useEffect, useRef, useState } from "react";

export interface SequenceConfig {
  id: string;
  count: number;
  getSrc: (frameIndex: number) => string;
  /** Loading priority. 'critical' sequences block the preloader (default).
   *  'lazy' sequences load in the background after critical ones finish. */
  priority?: "critical" | "lazy";
}

/**
 * Preloads image sequences with priority-based loading.
 *
 * Critical sequences (default) are loaded first and block the preloader.
 * Once all critical sequences have settled, ready=true is set and the page
 * can render. Lazy sequences then begin loading in the background.
 *
 * The progress percentage only reflects critical sequences since those
 * determine when the preloader disappears.
 */
export function useSequencesPreload(sequences: SequenceConfig[]) {
  const imagesRef = useRef<Record<string, HTMLImageElement[]>>({});
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const criticalSequences = sequences.filter(
      (seq) => (seq.priority ?? "critical") === "critical"
    );
    const lazySequences = sequences.filter(
      (seq) => seq.priority === "lazy"
    );

    // --- Load critical sequences ---
    let criticalLoaded = 0;
    const criticalTotal = criticalSequences.reduce((sum, seq) => sum + seq.count, 0);

    const loadSequence = (
      seq: SequenceConfig,
      onSettle?: () => void
    ) => {
      const frames: HTMLImageElement[] = new Array(seq.count);
      imagesRef.current[seq.id] = frames;

      for (let i = 0; i < seq.count; i += 1) {
        const img = new window.Image();
        img.decoding = "async";
        img.src = seq.getSrc(i);
        const settle = () => {
          if (cancelled) return;
          onSettle?.();
        };
        img.onload = settle;
        img.onerror = settle;
        frames[i] = img;
      }
    };

    const startLazyLoading = () => {
      lazySequences.forEach((seq) => {
        loadSequence(seq);
      });
    };

    if (criticalTotal === 0) {
      // No critical sequences - immediately ready, start lazy
      setProgress(100);
      setReady(true);
      startLazyLoading();
    } else {
      criticalSequences.forEach((seq) => {
        loadSequence(seq, () => {
          criticalLoaded += 1;
          setProgress(Math.round((criticalLoaded / criticalTotal) * 100));
          if (criticalLoaded >= criticalTotal) {
            setReady(true);
            startLazyLoading();
          }
        });
      });
    }

    // Pre-initialize lazy sequence arrays so imagesRef has entries
    lazySequences.forEach((seq) => {
      if (!imagesRef.current[seq.id]) {
        imagesRef.current[seq.id] = [];
      }
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { imagesRef, progress, ready };
}
