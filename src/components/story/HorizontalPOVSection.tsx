"use client";

import { useEffect, useMemo, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useSequencesPreload, type SequenceConfig } from "@/hooks/useSequencesPreload";
import { useScrollStoryController } from "@/hooks/useScrollStoryController";
import { useLenis } from "@/components/SmoothScroll/SmoothScrollProvider";
import { getTotalWeight } from "@/lib/story/transitionController";
import ImageSequencePlayer, { type ImageSequencePlayerHandle } from "./ImageSequencePlayer";
import SequencePreloader from "./SequencePreloader";

const FRAME_COUNT = 300;
const FOLDERS = ["1st-vdo", "2nd-vdo", "3rd-vdo"] as const;
const PANEL_COUNT = FOLDERS.length;

const frameSrc = (folder: string, i: number) =>
  `/${folder}/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;

export default function HorizontalPOVSection() {
  const sequences = useMemo<SequenceConfig[]>(
    () =>
      FOLDERS.map((folder) => ({
        id: folder,
        count: FRAME_COUNT,
        getSrc: (i: number) => frameSrc(folder, i),
      })),
    []
  );

  const { imagesRef, progress, ready } = useSequencesPreload(sequences);
  const lenis = useLenis();

  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  const panelRef0 = useRef<HTMLDivElement>(null);
  const panelRef1 = useRef<HTMLDivElement>(null);
  const panelRef2 = useRef<HTMLDivElement>(null);
  const panelRefs = [panelRef0, panelRef1, panelRef2] as const;

  const playerRef0 = useRef<ImageSequencePlayerHandle>(null);
  const playerRef1 = useRef<ImageSequencePlayerHandle>(null);
  const playerRef2 = useRef<ImageSequencePlayerHandle>(null);
  const playerRefs = [playerRef0, playerRef1, playerRef2] as const;

  useScrollStoryController({
    active: ready,
    frameCount: FRAME_COUNT,
    panelCount: PANEL_COUNT,
    sectionRef,
    pinRef,
    rowRef,
    panelRefs,
    playerRefs,
  });

  useEffect(() => {
    if (!ready) return;
    playerRefs.forEach((r) => r.current?.drawFrame(0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  useEffect(() => {
    if (!lenis) return;
    if (ready) {
      lenis.start();
      document.body.style.overflow = "";
    } else {
      lenis.stop();
      document.body.style.overflow = "hidden";
    }
  }, [ready, lenis]);

  return (
    <>
      <AnimatePresence>{!ready && <SequencePreloader progress={progress} />}</AnimatePresence>

      <section
        ref={sectionRef}
        className="relative"
        style={{ height: `${(getTotalWeight(PANEL_COUNT) + 1) * 100}vh` }}
      >
        <div
          ref={pinRef}
          className="relative h-screen w-screen overflow-hidden bg-black"
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
        </div>
      </section>
    </>
  );
}
