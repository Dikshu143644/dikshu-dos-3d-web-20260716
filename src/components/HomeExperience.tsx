"use client";

import { useMemo } from "react";
import { useSequencesPreload, type SequenceConfig } from "@/hooks/useSequencesPreload";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero/Hero";

const FRAME_COUNT = 300;
const FOLDERS = ["1st-vdo", "2nd-vdo", "3rd-vdo", "4th-vdo"] as const;

export default function HomeExperience() {
  const sequences = useMemo<SequenceConfig[]>(
    () =>
      FOLDERS.map((folder) => ({
        id: folder,
        count: FRAME_COUNT,
        getSrc: (i: number) => `/${folder}/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`,
      })),
    []
  );

  const { imagesRef } = useSequencesPreload(sequences);

  return (
    <>
      <Navbar revealed />
      <main>
        <Hero imagesRef={imagesRef} frameCount={FRAME_COUNT} revealed />
      </main>
    </>
  );
}
