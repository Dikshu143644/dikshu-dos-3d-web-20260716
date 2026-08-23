"use client";

import { useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { useSequencesPreload, type SequenceConfig } from "@/hooks/useSequencesPreload";
import Preloader from "@/components/Preloader";
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

const FRAME_COUNT = 150;
const FOLDERS = ["1st-vdo", "2nd-vdo", "3rd-vdo", "4th-vdo"] as const;

export default function HomeExperience() {
  const sequences = useMemo<SequenceConfig[]>(
    () =>
      FOLDERS.map((folder) => ({
        id: folder,
        count: FRAME_COUNT,
        getSrc: (i: number) => `/${folder}/frame-${String(i + 1).padStart(3, "0")}.webp`,
        thumbGetSrc: (i: number) => `/${folder}-thumb/frame-${String(i + 1).padStart(3, "0")}.webp`,
        priority: folder === "1st-vdo" ? "critical" : "lazy",
      })),
    []
  );

  const { imagesRef, progress, ready, triggerLoad } = useSequencesPreload(sequences);

  return (
    <>
      <AnimatePresence>{!ready && <Preloader progress={progress} />}</AnimatePresence>
      <Navbar revealed={ready} />
      <main>
        <Hero imagesRef={imagesRef} frameCount={FRAME_COUNT} revealed={ready} triggerLoad={triggerLoad} />
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
        <ReservationMotionSection imagesRef={imagesRef} frameCount={FRAME_COUNT} revealed={ready} triggerLoad={triggerLoad} />
        <ContactSection imagesRef={imagesRef} frameCount={FRAME_COUNT} revealed={ready} triggerLoad={triggerLoad} />
      </main>
    </>
  );
}
