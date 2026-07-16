"use client";

import { useEffect, useRef, useState } from "react";

export interface SequenceConfig {
  id: string;
  count: number;
  getSrc: (frameIndex: number) => string;
}

interface UseSequencesPreloadOptions {
  blocking?: boolean;
  concurrency?: number;
  startDelayMs?: number;
  priorityFrames?: number[];
}

type QueueItem = {
  seq: SequenceConfig;
  index: number;
};

const uniqueFrames = (frames: number[], count: number) =>
  Array.from(new Set(frames.filter((frame) => frame >= 0 && frame < count)));

export function useSequencesPreload(
  sequences: SequenceConfig[],
  {
    blocking = false,
    concurrency = 4,
    startDelayMs = 700,
    priorityFrames,
  }: UseSequencesPreloadOptions = {}
) {
  const imagesRef = useRef<Record<string, HTMLImageElement[]>>({});
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(!blocking);

  useEffect(() => {
    let cancelled = false;
    let backgroundTimer = 0;
    let loaded = 0;
    const total = sequences.reduce((sum, seq) => sum + seq.count, 0);
    const priorityItems: QueueItem[] = [];
    const backgroundItems: QueueItem[] = [];

    if (total === 0) {
      imagesRef.current = {};
      setProgress(100);
      setReady(true);
      return () => {
        cancelled = true;
      };
    }

    setProgress(0);
    setReady(!blocking);

    const nextImages: Record<string, HTMLImageElement[]> = {};

    sequences.forEach((seq) => {
      const frames: HTMLImageElement[] = new Array(seq.count);
      nextImages[seq.id] = frames;

      const priority = uniqueFrames(
        priorityFrames ?? [0, Math.round(seq.count * 0.22), Math.round(seq.count * 0.55)],
        seq.count
      );
      const prioritySet = new Set(priority);

      for (let i = 0; i < seq.count; i += 1) {
        const img = new window.Image();
        img.decoding = "async";
        frames[i] = img;

        const item = { seq, index: i };
        if (prioritySet.has(i)) {
          priorityItems.push(item);
        } else {
          backgroundItems.push(item);
        }
      }
    });

    imagesRef.current = nextImages;

    const loadFrame = ({ seq, index }: QueueItem) =>
      new Promise<void>((resolve) => {
        if (cancelled) {
          resolve();
          return;
        }

        const img = imagesRef.current[seq.id]?.[index];
        if (!img) {
          resolve();
          return;
        }

        if (img.complete && img.naturalWidth > 0) {
          resolve();
          return;
        }

        const settle = () => {
          if (!cancelled) {
            loaded += 1;
            setProgress(Math.round((loaded / total) * 100));
          }
          resolve();
        };

        img.onload = settle;
        img.onerror = settle;
        if (!img.src) img.src = seq.getSrc(index);
      });

    const runQueue = (items: QueueItem[], done?: () => void) => {
      let cursor = 0;
      let active = 0;

      const pump = () => {
        if (cancelled) return;

        if (cursor >= items.length && active === 0) {
          done?.();
          return;
        }

        while (active < concurrency && cursor < items.length) {
          active += 1;
          const item = items[cursor];
          cursor += 1;

          loadFrame(item).finally(() => {
            active -= 1;
            pump();
          });
        }
      };

      pump();
    };

    runQueue(priorityItems, () => {
      if (!cancelled && blocking) setReady(true);
      backgroundTimer = window.setTimeout(() => runQueue(backgroundItems), startDelayMs);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(backgroundTimer);
    };
  }, [blocking, concurrency, priorityFrames, sequences, startDelayMs]);

  return { imagesRef, progress, ready };
}
