"use client";

import type { RefObject } from "react";

interface HeroOverlayProps {
  fogRef: RefObject<HTMLDivElement | null>;
}

/** A light touch at the very end of scroll only, so the hero blends into the next section instead of hard-cutting. */
export default function HeroOverlay({ fogRef }: HeroOverlayProps) {
  return (
    <div
      ref={fogRef}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[35%] opacity-0"
      style={{
        background:
          "linear-gradient(to top, rgba(233,223,201,0.55) 0%, rgba(233,223,201,0.2) 40%, rgba(233,223,201,0) 100%)",
      }}
    />
  );
}
