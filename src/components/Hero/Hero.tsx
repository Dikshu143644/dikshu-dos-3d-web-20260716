"use client";

import { useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useScrollStoryController } from "@/hooks/useScrollStoryController";
import { getTotalWeight } from "@/lib/story/transitionController";
import ImageSequencePlayer, {
  type ImageSequencePlayerHandle,
} from "@/components/story/ImageSequencePlayer";
import HeroOverlay from "./HeroOverlay";

const FOLDERS = ["1st-vdo", "2nd-vdo", "3rd-vdo"] as const;
const PANEL_COUNT = FOLDERS.length;
const HERO_SCRUB_WEIGHT = 2;
const HERO_TRANSITION_WEIGHT = 1;
const SEQUENCE_CROP = {
  cropScale: 1.2,
  offsetX: 0.05,
  offsetY: 0.04,
};

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
  const textRef = useRef<HTMLDivElement>(null);

  const panelRef0 = useRef<HTMLDivElement>(null);
  const panelRef1 = useRef<HTMLDivElement>(null);
  const panelRef2 = useRef<HTMLDivElement>(null);
  const panelRefs = [panelRef0, panelRef1, panelRef2] as const;

  const playerRef0 = useRef<ImageSequencePlayerHandle>(null);
  const playerRef1 = useRef<ImageSequencePlayerHandle>(null);
  const playerRef2 = useRef<ImageSequencePlayerHandle>(null);
  const playerRefs = [playerRef0, playerRef1, playerRef2] as const;

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

      // Hero text is only for the very first moment — it clears out of the
      // way as soon as the visitor starts scrolling.
      const textFade = gsap.utils.clamp(0, 1, 1 - p / 0.015);
      gsap.set(textRef.current, { opacity: textFade, y: -p * 40 });
    },
  });

  const totalWeight = getTotalWeight(PANEL_COUNT, HERO_SCRUB_WEIGHT, HERO_TRANSITION_WEIGHT);

  return (
    <section ref={sectionRef} className="relative" style={{ height: `${(totalWeight + 1) * 100}vh` }}>
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden bg-charcoal"
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
                {...SEQUENCE_CROP}
                className="absolute inset-0 h-full w-full"
              />
            </div>
          ))}
        </div>
        <HeroOverlay fogRef={fogRef} />

        <div
          ref={textRef}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hero-text-shadow font-display text-4xl italic font-medium text-ivory sm:text-5xl md:text-6xl"
          >
            Where Silence Speaks Luxury
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="hero-text-shadow mt-6 max-w-xl font-body text-sm font-light text-ivory/85 sm:text-base md:text-lg"
          >
            Our luxury spa blends nature, architecture and holistic care to
            create moments that last.
          </motion.p>

          <motion.a
            href="#experiences"
            data-cursor-hover
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto group mt-10 inline-flex items-center gap-2 rounded-full border border-gold/70 px-8 py-3.5 font-body text-xs uppercase tracking-widest2 text-ivory backdrop-blur-sm transition-colors duration-300 hover:bg-gold hover:text-burgundy-dark"
          >
            Explore it
          </motion.a>
        </div>
      </div>
    </section>
  );
}
