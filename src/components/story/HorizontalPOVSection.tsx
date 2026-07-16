"use client";

import { useEffect, useMemo, useRef } from "react";
import { useSequencesPreload, type SequenceConfig } from "@/hooks/useSequencesPreload";
import { useLiteExperience } from "@/hooks/useLiteExperience";
import { useScrollStoryController } from "@/hooks/useScrollStoryController";
import { useLenis } from "@/components/SmoothScroll/SmoothScrollProvider";
import { getTotalWeight } from "@/lib/story/transitionController";
import ImageSequencePlayer, { type ImageSequencePlayerHandle } from "./ImageSequencePlayer";

const SOURCE_FRAME_COUNT = 300;
const DESKTOP_FRAME_COUNT = 160;
const FOLDERS = ["1st-vdo", "2nd-vdo", "3rd-vdo"] as const;
const PANEL_COUNT = FOLDERS.length;
const SEQUENCE_CROP = {
  cropScale: 1.2,
  offsetX: 0.05,
  offsetY: 0.04,
};

const frameSrc = (folder: string, frameIndex: number, frameCount: number) => {
  const sourceIndex =
    frameCount <= 1
      ? 0
      : Math.round((frameIndex / (frameCount - 1)) * (SOURCE_FRAME_COUNT - 1));

  return `/${folder}/ezgif-frame-${String(sourceIndex + 1).padStart(3, "0")}.jpg`;
};

export default function HorizontalPOVSection() {
  const lite = useLiteExperience();
  const frameCount = lite ? 1 : DESKTOP_FRAME_COUNT;
  const sequences = useMemo<SequenceConfig[]>(
    () => {
      if (lite) return [];

      return FOLDERS.map((folder) => ({
        id: folder,
        count: frameCount,
        getSrc: (i: number) => frameSrc(folder, i, frameCount),
      }));
    },
    [frameCount, lite]
  );

  const { imagesRef, ready } = useSequencesPreload(sequences, {
    blocking: false,
    concurrency: lite ? 0 : 4,
    startDelayMs: 700,
  });
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
    active: ready && !lite,
    frameCount,
    panelCount: PANEL_COUNT,
    sectionRef,
    pinRef,
    rowRef,
    panelRefs,
    playerRefs,
  });

  useEffect(() => {
    if (!ready || lite) return;
    playerRefs.forEach((r) => r.current?.drawFrame(0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lite, ready]);

  useEffect(() => {
    if (!lenis) return;
    lenis.start();
    document.body.style.overflow = "";
  }, [lenis]);

  if (lite) {
    return (
      <section className="bg-black">
        {FOLDERS.map((folder, index) => (
          <div key={folder} className="relative min-h-[100svh] overflow-hidden">
            <img
              src={`/${folder}/ezgif-frame-001.jpg`}
              alt=""
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.72),rgba(0,0,0,0.14)_48%,rgba(0,0,0,0.35))]" />
          </div>
        ))}
      </section>
    );
  }

  return (
    <>
      <section
        ref={sectionRef}
        className="relative"
        style={{ height: `${(getTotalWeight(PANEL_COUNT) + 1) * 100}vh` }}
      >
        <div
          ref={pinRef}
          className="relative h-[100svh] w-full overflow-hidden bg-black"
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
                className="relative h-[100svh] w-screen shrink-0"
                style={{ willChange: "transform" }}
              >
                <ImageSequencePlayer
                  ref={playerRefs[i]}
                  imagesRef={imagesRef}
                  sequenceId={folder}
                  fallbackSrc={`/${folder}/ezgif-frame-001.jpg`}
                  priorityFallback={i === 0}
                  {...SEQUENCE_CROP}
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
