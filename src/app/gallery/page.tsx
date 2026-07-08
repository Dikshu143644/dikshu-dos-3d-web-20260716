import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { ZoomParallax } from "@/components/ui/zoom-parallax";

export const metadata: Metadata = {
  title: "Viceroy — Gallery",
};

const images = [
  {
    src: "/resort-designs/six-senses-thailand.jpg",
    alt: "Hillside villa and infinity pool at dusk",
  },
  {
    src: "/resort-designs/bali-cabin-retreat.jpg",
    alt: "Private cabin nestled in the jungle canopy",
  },
  {
    src: "/resort-designs/tropical-mansion.jpg",
    alt: "Sunlit tropical villa exterior by day",
  },
  {
    src: "/resort-designs/mountain-retreat.jpg",
    alt: "Mountain retreat beside a quiet stream",
  },
  {
    src: "/resort-designs/mountain-chalet.jpg",
    alt: "Mountain chalet wrapped in morning mist",
  },
  {
    src: "/resort-designs/oceanfront-estate.webp",
    alt: "Oceanfront estate with cliffside infinity pool",
  },
];

export default function GalleryPage() {
  return (
    <>
      <Navbar revealed />
      <main className="min-h-screen w-full bg-black">
        <div className="relative flex h-[36vh] items-center justify-center overflow-hidden bg-black">
          {/* Radial spotlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full blur-[60px]"
            style={{
              background: "radial-gradient(ellipse at center, rgba(90,31,43,0.45), transparent 60%)",
            }}
          />
          <div className="relative px-6 text-center">
            <p className="mb-4 font-body text-xs uppercase tracking-[0.4em] text-gold">
              The Estate in Detail
            </p>
            <h1 className="font-display text-4xl italic font-medium text-white md:text-6xl">
              A Closer Look at Viceroy
            </h1>
            <p className="mx-auto mt-5 max-w-lg font-body text-sm text-gray-400 md:text-base">
              Scroll to journey through the spaces, textures and views that
              define the resort.
            </p>
          </div>
        </div>

        <ZoomParallax images={images} />

        <div className="h-[15vh] bg-black" />
      </main>
    </>
  );
}
