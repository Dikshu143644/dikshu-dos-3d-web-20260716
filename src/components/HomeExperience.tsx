"use client";

import { useMemo } from "react";
import { useSequencesPreload, type SequenceConfig } from "@/hooks/useSequencesPreload";
import { useLiteExperience } from "@/hooks/useLiteExperience";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero/Hero";
import InteractiveSelector from "@/components/ui/interactive-selector";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import GalleryHeading from "@/components/GalleryHeading";
import DiningSection from "@/components/DiningSection";
import ServicesSection from "@/components/ServicesSection";
import ClosingCTASection from "@/components/ClosingCTASection";
import ReservationMotionSection from "@/components/ReservationMotionSection";
import ContactSection from "@/components/ContactSection";

const galleryImages = [
  { src: "/resort-designs/six-senses-thailand.jpg", alt: "Hillside villa and infinity pool at dusk" },
  { src: "/resort-designs/bali-cabin-retreat.jpg", alt: "Private cabin nestled in the jungle canopy" },
  { src: "/resort-designs/tropical-mansion.jpg", alt: "Sunlit tropical villa exterior by day" },
  { src: "/resort-designs/mountain-retreat.jpg", alt: "Mountain retreat beside a quiet stream" },
  { src: "/resort-designs/mountain-chalet.jpg", alt: "Mountain chalet wrapped in morning mist" },
  { src: "/resort-designs/oceanfront-estate.webp", alt: "Oceanfront estate with cliffside infinity pool" },
];

const SOURCE_FRAME_COUNT = 300;
const DESKTOP_FRAME_COUNT = 160;
const FOLDERS = ["1st-vdo", "2nd-vdo", "3rd-vdo", "4th-vdo"] as const;

const frameSrc = (folder: string, frameIndex: number, frameCount: number) => {
  const sourceIndex =
    frameCount <= 1
      ? 0
      : Math.round((frameIndex / (frameCount - 1)) * (SOURCE_FRAME_COUNT - 1));

  return `/${folder}/ezgif-frame-${String(sourceIndex + 1).padStart(3, "0")}.jpg`;
};

export default function HomeExperience() {
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
    startDelayMs: 900,
  });

  return (
    <>
      <Navbar revealed={ready} />
      <main>
        <Hero imagesRef={imagesRef} frameCount={frameCount} revealed={ready} lite={lite} />
        <div id="experiences">
          <InteractiveSelector />
        </div>
        <div id="gallery">
          <GalleryHeading />
          <ZoomParallax images={galleryImages} />
        </div>
        <DiningSection />
        <ServicesSection />
        <ClosingCTASection />
        <ReservationMotionSection imagesRef={imagesRef} frameCount={frameCount} revealed={ready} lite={lite} />
        <ContactSection imagesRef={imagesRef} frameCount={frameCount} revealed={ready} lite={lite} />
      </main>
    </>
  );
}
