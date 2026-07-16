"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export interface ImageSequencePlayerHandle {
  drawFrame: (index: number) => void;
}

interface ImageSequencePlayerProps {
  /** The full preload map (folder id -> frames), passed by reference so this always reads live data. */
  imagesRef: React.MutableRefObject<Record<string, HTMLImageElement[]>>;
  sequenceId: string;
  className?: string;
  cropScale?: number;
  offsetX?: number;
  offsetY?: number;
}

/**
 * Draws a single frame of a preloaded image sequence onto a canvas,
 * cover-fit to the canvas size. Imperative (drawFrame) so a scroll-tied
 * animation loop can update it every tick without triggering React renders.
 *
 * Reads `imagesRef.current[sequenceId]` fresh on every draw rather than
 * taking a resolved array as a prop — the preload hook populates that map
 * asynchronously after mount, and nothing else here re-renders once loading
 * finishes, so a snapshot taken at first render would go stale forever.
 */
const ImageSequencePlayer = forwardRef<ImageSequencePlayerHandle, ImageSequencePlayerProps>(
  function ImageSequencePlayer(
    { imagesRef, sequenceId, className, cropScale = 1, offsetX = 0, offsetY = 0 },
    ref
  ) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const lastIndexRef = useRef(0);
    const pendingImgRef = useRef<HTMLImageElement | null>(null);
    const arrayRetriesRef = useRef(0);

    const draw = (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const img = imagesRef.current[sequenceId]?.[index];

      if (!img) {
        // The preload hook populates imagesRef asynchronously; if this fires
        // before that's landed, retry for a bit rather than staying blank forever.
        if (arrayRetriesRef.current < 60) {
          arrayRetriesRef.current += 1;
          requestAnimationFrame(() => draw(index));
        }
        return;
      }
      arrayRetriesRef.current = 0;

      if (!img.complete || img.naturalWidth === 0) {
        // Not loaded yet — redraw this exact frame the instant it finishes,
        // rather than waiting on some external "everything is ready" signal.
        if (pendingImgRef.current !== img) {
          pendingImgRef.current = img;
          img.addEventListener(
            "load",
            () => {
              if (pendingImgRef.current === img) draw(index);
            },
            { once: true }
          );
        }
        return;
      }
      pendingImgRef.current = null;

      lastIndexRef.current = index;

      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight) * cropScale;
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      const dx = (cw - dw) / 2 + offsetX * cw;
      const dy = (ch - dh) / 2 + offsetY * ch;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, dx, dy, dw, dh);
    };

    useImperativeHandle(ref, () => ({ drawFrame: draw }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      let raf = 0;
      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(window.innerWidth * dpr);
        canvas.height = Math.round(window.innerHeight * dpr);
        draw(lastIndexRef.current);
      };

      resize();
      const onResize = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(resize);
      };
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(raf);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <canvas ref={canvasRef} aria-hidden className={className} />;
  }
);

export default ImageSequencePlayer;
