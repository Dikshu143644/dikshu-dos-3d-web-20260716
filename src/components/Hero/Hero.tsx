"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useScrollStoryController } from "@/hooks/useScrollStoryController";
import { getTotalWeight } from "@/lib/story/transitionController";
import ImageSequencePlayer, {
  type ImageSequencePlayerHandle,
} from "@/components/story/ImageSequencePlayer";
import HeroOverlay from "./HeroOverlay";

const FOLDERS = ["1st-vdo", "2nd-vdo", "3rd-vdo", "4th-vdo"] as const;
const PANEL_COUNT = FOLDERS.length;
const HERO_SCRUB_WEIGHT = 2;
const HERO_TRANSITION_WEIGHT = 1;

interface HeroProps {
  imagesRef: React.MutableRefObject<Record<string, HTMLImageElement[]>>;
  frameCount: number;
  revealed: boolean;
}

/**
 * The hero plays each POV automatically as the visitor scrolls, auto-swiping
 * left into the next one in order — no text, no buttons, just the videos
 * and the cinematic 3D slide between them.
 */
export default function Hero({ imagesRef, frameCount, revealed }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);

  const panelRef0 = useRef<HTMLDivElement>(null);
  const panelRef1 = useRef<HTMLDivElement>(null);
  const panelRef2 = useRef<HTMLDivElement>(null);
  const panelRef3 = useRef<HTMLDivElement>(null);
  const panelRefs = [panelRef0, panelRef1, panelRef2, panelRef3] as const;

  const playerRef0 = useRef<ImageSequencePlayerHandle>(null);
  const playerRef1 = useRef<ImageSequencePlayerHandle>(null);
  const playerRef2 = useRef<ImageSequencePlayerHandle>(null);
  const playerRef3 = useRef<ImageSequencePlayerHandle>(null);
  const playerRefs = [playerRef0, playerRef1, playerRef2, playerRef3] as const;

  useScrollStoryController({
    active: revealed,
    frameCount,
    panelCount: PANEL_COUNT,
    scrubWeight: HERO_SCRUB_WEIGHT,
    transitionWeight: HERO_TRANSITION_WEIGHT,
    sectionRef,
    pinRef,
    rowRef,
    panelRefs,
    playerRefs,
    onProgress: (p) => {
      // Fog is a light touch only in the very last moment of scroll —
      // the video stays visible throughout, it never washes to white.
      const fogStart = 0.9;
      const fogProgress = gsap.utils.clamp(0, 1, (p - fogStart) / (1 - fogStart));
      gsap.set(fogRef.current, { opacity: fogProgress * 0.4 });
    },
  });

  const totalWeight = getTotalWeight(PANEL_COUNT, HERO_SCRUB_WEIGHT, HERO_TRANSITION_WEIGHT);

  return (
    <section ref={sectionRef} className="relative" style={{ height: `${(totalWeight + 1) * 100}vh` }}>
      <div
        ref={pinRef}
        className="relative h-screen w-screen overflow-hidden bg-charcoal"
        style={{ perspective: "1600px" }}
      >
        <div
          ref={rowRef}
          className="flex h-full"
          style={{
            width: `${PANEL_COUNT * 100}%`,
            willChange: "transform, filter",
            transformStyle: "preserve-3d",
          }}
        >
          {FOLDERS.map((folder, i) => (
            <div
              key={folder}
              ref={panelRefs[i]}
              className="relative h-screen w-screen shrink-0"
              style={{ willChange: "transform" }}
            >
              <ImageSequencePlayer
                ref={playerRefs[i]}
                imagesRef={imagesRef}
                sequenceId={folder}
                className="absolute inset-0 h-full w-full"
              />
            </div>
          ))}
        </div>
        <HeroOverlay fogRef={fogRef} />
      </div>
    </section>
  );
}
