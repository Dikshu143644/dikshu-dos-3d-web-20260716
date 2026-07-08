"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ImageSequencePlayerHandle } from "@/components/story/ImageSequencePlayer";
import {
  computeFrame,
  computePanelPose,
  computeRowProgress,
  computeTransitionAmount,
  getStorySegments,
} from "@/lib/story/transitionController";

gsap.registerPlugin(ScrollTrigger);

interface UseScrollStoryControllerArgs {
  active: boolean;
  frameCount: number;
  panelCount: number;
  scrubWeight?: number;
  transitionWeight?: number;
  sectionRef: RefObject<HTMLElement | null>;
  pinRef: RefObject<HTMLDivElement | null>;
  rowRef: RefObject<HTMLDivElement | null>;
  panelRefs: readonly RefObject<HTMLDivElement | null>[];
  playerRefs: readonly RefObject<ImageSequencePlayerHandle | null>[];
  /** Optional extra hook for callers with their own scroll-tied effects (e.g. a fade-to-next-section overlay). */
  onProgress?: (progress: number) => void;
}

const MAX_BLUR_PX = 5;
const VELOCITY_FOR_MAX_BLUR = 3500;

/**
 * Pins the section and drives everything — per-panel frame index, the row's
 * horizontal slide, each panel's 3D pose, and a velocity-based motion blur —
 * from a single scrubbed ScrollTrigger. All side effects go through
 * gsap.set on refs, never React state, so this stays 60fps. Works for any
 * number of panels (2 for the hero, 3 for the full story section, etc).
 */
export function useScrollStoryController({
  active,
  frameCount,
  panelCount,
  scrubWeight,
  transitionWeight,
  sectionRef,
  pinRef,
  rowRef,
  panelRefs,
  playerRefs,
  onProgress,
}: UseScrollStoryControllerArgs) {
  useEffect(() => {
    if (!active || !sectionRef.current || !pinRef.current) return;

    const segments = getStorySegments(panelCount, scrubWeight, transitionWeight);
    let onResize: (() => void) | null = null;

    const ctx = gsap.context(() => {
      const applyProgress = (p: number, velocity: number) => {
        for (let i = 0; i < panelCount; i += 1) {
          const frame = computeFrame(i, p, frameCount, segments);
          playerRefs[i].current?.drawFrame(frame);

          const pose = computePanelPose(i, p, segments);
          const panel = panelRefs[i].current;
          if (panel) {
            gsap.set(panel, {
              rotateY: pose.rotateY,
              scale: pose.scale,
              z: pose.z,
              transformOrigin:
                i === 0 ? "right center" : i === panelCount - 1 ? "left center" : "center center",
            });
          }
        }

        const rowProgress = computeRowProgress(p, segments);
        gsap.set(rowRef.current, { x: -rowProgress * window.innerWidth });

        const transitionAmount = computeTransitionAmount(p, segments);
        const blur =
          transitionAmount > 0
            ? Math.min(MAX_BLUR_PX, (Math.abs(velocity) / VELOCITY_FOR_MAX_BLUR) * MAX_BLUR_PX)
            : 0;
        gsap.set(rowRef.current, { filter: blur > 0.1 ? `blur(${blur.toFixed(2)}px)` : "none" });

        onProgress?.(p);
      };

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        pin: pinRef.current,
        pinSpacing: true,
        onUpdate: (self) => applyProgress(self.progress, self.getVelocity()),
      });

      onResize = () => applyProgress(st.progress, 0);
      window.addEventListener("resize", onResize);
    }, sectionRef);

    return () => {
      if (onResize) window.removeEventListener("resize", onResize);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, frameCount, panelCount, scrubWeight, transitionWeight]);
}
