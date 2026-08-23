"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface SequenceConfig {
  id: string;
  count: number;
  getSrc: (frameIndex: number) => string;
  /** Optional thumbnail source getter for progressive loading. */
  thumbGetSrc?: (frameIndex: number) => string;
  /** Loading priority. 'critical' sequences block the preloader (default).
   *  'lazy' sequences do NOT load on mount - they must be triggered via triggerLoad. */
  priority?: "critical" | "lazy";
  /** Number of evenly-spaced frames to load before dismissing the preloader.
   *  Only applies to critical sequences with thumbGetSrc. Defaults to `count`. */
  criticalCount?: number;
}

/**
 * Preloads image sequences with progressive thumbnail-first loading.
 *
 * Critical sequences:
 * - Load thumbnails first (very fast, < 1MB total).
 * - Set ready=true once thumbnails are loaded so the page becomes interactive.
 * - Then swap in full-res frames in the background (replacing thumbnail entries).
 *
 * Lazy sequences:
 * - Do NOT load on mount at all.
 * - Use the returned `triggerLoad` function to start loading a lazy sequence on demand.
 * - triggerLoad is idempotent: calling it multiple times for the same ID is a no-op.
 *
 * The progress bar tracks critical sequence thumbnail loading only.
 */
export function useSequencesPreload(sequences: SequenceConfig[]) {
  const imagesRef = useRef<Record<string, HTMLImageElement[]>>({});
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  // Track which lazy sequences have already been triggered
  const triggeredRef = useRef<Set<string>>(new Set());
  // Store sequences config in a ref so triggerLoad can access them
  const sequencesRef = useRef<SequenceConfig[]>(sequences);
  sequencesRef.current = sequences;

  // Track if effect has been cancelled
  const cancelledRef = useRef(false);

  /**
   * Load full-res frames for a sequence, replacing thumbnail entries in imagesRef.
   */
  const loadFullRes = useCallback((seq: SequenceConfig) => {
    const frames = imagesRef.current[seq.id];
    if (!frames) return;

    for (let i = 0; i < seq.count; i += 1) {
      const img = new window.Image();
      img.decoding = "async";
      img.src = seq.getSrc(i);
      img.onload = () => {
        // Replace thumbnail with full-res image once loaded
        if (!cancelledRef.current && imagesRef.current[seq.id]) {
          imagesRef.current[seq.id][i] = img;
        }
      };
      // On error, keep thumbnail - no replacement
      img.onerror = () => {};
    }
  }, []);

  /**
   * Load a lazy sequence on demand: thumbnails first, then full-res.
   * Idempotent - calling multiple times for the same ID is a no-op.
   */
  const triggerLoad = useCallback((sequenceId: string) => {
    if (triggeredRef.current.has(sequenceId)) return;
    triggeredRef.current.add(sequenceId);

    const seq = sequencesRef.current.find((s) => s.id === sequenceId);
    if (!seq) return;

    // Initialize the array if needed
    if (!imagesRef.current[seq.id] || imagesRef.current[seq.id].length === 0) {
      imagesRef.current[seq.id] = new Array(seq.count);
    }

    if (seq.thumbGetSrc) {
      // Load thumbnails first for immediate low-quality display
      let thumbsLoaded = 0;
      const frames = imagesRef.current[seq.id];

      for (let i = 0; i < seq.count; i += 1) {
        const img = new window.Image();
        img.decoding = "async";
        img.src = seq.thumbGetSrc(i);
        const settle = () => {
          thumbsLoaded += 1;
          // Once all thumbnails are in, start full-res swap
          if (thumbsLoaded >= seq.count) {
            loadFullRes(seq);
          }
        };
        img.onload = settle;
        img.onerror = settle;
        frames[i] = img;
      }
    } else {
      // No thumbnails - load full-res directly
      const frames = imagesRef.current[seq.id];
      for (let i = 0; i < seq.count; i += 1) {
        const img = new window.Image();
        img.decoding = "async";
        img.src = seq.getSrc(i);
        frames[i] = img;
      }
    }
  }, [loadFullRes]);

  useEffect(() => {
    cancelledRef.current = false;

    const criticalSequences = sequences.filter(
      (seq) => (seq.priority ?? "critical") === "critical"
    );
    const lazySequences = sequences.filter(
      (seq) => seq.priority === "lazy"
    );

    // Pre-initialize all sequence arrays (empty) so imagesRef has entries
    sequences.forEach((seq) => {
      if (!imagesRef.current[seq.id]) {
        imagesRef.current[seq.id] = new Array(seq.count);
      }
    });

    // --- Load critical sequences: thumbnails first, then full-res in background ---
    // criticalTotal counts only the frames that block the preloader (criticalCount or count)
    const criticalTotal = criticalSequences.reduce(
      (sum, seq) => sum + (seq.criticalCount ?? seq.count),
      0
    );

    if (criticalTotal === 0) {
      setProgress(100);
      setReady(true);
      return () => { cancelledRef.current = true; };
    }

    let criticalThumbsLoaded = 0;

    /**
     * Called once all critical thumbnails are in AND all remaining background
     * thumbnails are loaded for a given sequence. Starts full-res swap.
     */
    const startFullResIfAllThumbsLoaded = (seq: SequenceConfig, remainingLoaded: number, remainingTotal: number) => {
      if (remainingLoaded >= remainingTotal) {
        loadFullRes(seq);
      }
    };

    /**
     * Load remaining (non-critical) thumbnails for a sequence after ready=true.
     * Once all remaining are loaded, trigger full-res swap.
     */
    const loadRemainingThumbs = (seq: SequenceConfig, criticalIndices: Set<number>) => {
      const frames = imagesRef.current[seq.id];
      if (!seq.thumbGetSrc) {
        loadFullRes(seq);
        return;
      }
      const remainingIndices: number[] = [];
      for (let i = 0; i < seq.count; i += 1) {
        if (!criticalIndices.has(i)) {
          remainingIndices.push(i);
        }
      }
      if (remainingIndices.length === 0) {
        loadFullRes(seq);
        return;
      }
      let remainingLoaded = 0;
      const remainingTotal = remainingIndices.length;
      for (const i of remainingIndices) {
        const img = new window.Image();
        img.decoding = "async";
        img.src = seq.thumbGetSrc(i);
        const settle = () => {
          if (cancelledRef.current) return;
          remainingLoaded += 1;
          startFullResIfAllThumbsLoaded(seq, remainingLoaded, remainingTotal);
        };
        img.onload = settle;
        img.onerror = settle;
        frames[i] = img;
      }
    };

    // Track critical indices per sequence so we can load remaining after ready
    const criticalIndicesMap = new Map<string, Set<number>>();

    criticalSequences.forEach((seq) => {
      const frames = imagesRef.current[seq.id];
      const effectiveCriticalCount = seq.criticalCount ?? seq.count;

      if (seq.thumbGetSrc) {
        // Calculate evenly-spaced critical frame indices
        const criticalIndices = new Set<number>();
        for (let j = 0; j < effectiveCriticalCount; j += 1) {
          const index = Math.round((j * (seq.count - 1)) / (effectiveCriticalCount - 1));
          criticalIndices.add(index);
        }
        criticalIndicesMap.set(seq.id, criticalIndices);

        // Load only critical thumbnails initially
        for (const i of criticalIndices) {
          const img = new window.Image();
          img.decoding = "async";
          img.src = seq.thumbGetSrc(i);
          const settle = () => {
            if (cancelledRef.current) return;
            criticalThumbsLoaded += 1;
            setProgress(Math.round((criticalThumbsLoaded / criticalTotal) * 100));
            if (criticalThumbsLoaded >= criticalTotal) {
              setReady(true);
              // Load remaining thumbnails in background for all critical sequences
              criticalSequences.forEach((s) => {
                const indices = criticalIndicesMap.get(s.id) ?? new Set();
                loadRemainingThumbs(s, indices);
              });
            }
          };
          img.onload = settle;
          img.onerror = settle;
          frames[i] = img;
        }
      } else {
        // No thumbnail variant - load full-res directly and track progress
        criticalIndicesMap.set(seq.id, new Set());
        for (let i = 0; i < seq.count; i += 1) {
          const img = new window.Image();
          img.decoding = "async";
          img.src = seq.getSrc(i);
          const settle = () => {
            if (cancelledRef.current) return;
            criticalThumbsLoaded += 1;
            setProgress(Math.round((criticalThumbsLoaded / criticalTotal) * 100));
            if (criticalThumbsLoaded >= criticalTotal) {
              setReady(true);
            }
          };
          img.onload = settle;
          img.onerror = settle;
          frames[i] = img;
        }
      }

      // Mark critical as triggered so triggerLoad is a no-op
      triggeredRef.current.add(seq.id);
    });

    // Pre-initialize lazy sequences with empty arrays
    lazySequences.forEach((seq) => {
      imagesRef.current[seq.id] = new Array(seq.count);
    });

    return () => {
      cancelledRef.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { imagesRef, progress, ready, triggerLoad };
}
