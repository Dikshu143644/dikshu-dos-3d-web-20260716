"use client";

import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PiArrowUpRight } from "react-icons/pi";
import ImageSequencePlayer, {
  type ImageSequencePlayerHandle,
} from "@/components/story/ImageSequencePlayer";

gsap.registerPlugin(ScrollTrigger);

interface ReservationMotionSectionProps {
  imagesRef: MutableRefObject<Record<string, HTMLImageElement[]>>;
  frameCount: number;
  revealed: boolean;
}

export default function ReservationMotionSection({
  imagesRef,
  frameCount,
  revealed,
}: ReservationMotionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<ImageSequencePlayerHandle>(null);

  useEffect(() => {
    if (!revealed || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const drawProgress = (progress: number) => {
        const frame = Math.min(frameCount - 1, Math.round(progress * (frameCount - 1)));
        playerRef.current?.drawFrame(frame);

        gsap.set(contentRef.current, {
          opacity: gsap.utils.interpolate(1, 0.78, progress),
          y: gsap.utils.interpolate(0, -28, progress),
        });
      };

      drawProgress(0);

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.45,
        onUpdate: (self) => drawProgress(self.progress),
      });

      const onResize = () => drawProgress(st.progress);
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        st.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [frameCount, revealed]);

  return (
    <section id="reserve" ref={sectionRef} className="relative min-h-[260vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-charcoal">
        <ImageSequencePlayer
          ref={playerRef}
          imagesRef={imagesRef}
          sequenceId="4th-vdo"
          cropScale={1.2}
          offsetX={0.05}
          offsetY={0.04}
          className="absolute inset-0 h-full w-full"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.74),rgba(0,0,0,0.28)_46%,rgba(0,0,0,0.08)),linear-gradient(0deg,rgba(0,0,0,0.58),transparent_48%,rgba(0,0,0,0.18))]"
        />

        <div
          ref={contentRef}
          className="relative z-10 flex h-full items-end px-6 pb-14 pt-28 md:items-center md:px-12 md:pb-0"
        >
          <div className="max-w-xl">
            <p className="font-body text-xs uppercase tracking-[0.42em] text-gold">
              Reserve Dikshu
            </p>
            <h2 className="mt-5 font-display text-4xl italic font-medium leading-tight text-ivory sm:text-5xl md:text-6xl">
              Step into the stay before you arrive.
            </h2>
            <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-ivory/88 md:text-base">
              Move through the suite as the page scrolls, then share your
              dates with DOS and we will shape the arrival around you.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                data-cursor-hover
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 font-body text-xs uppercase tracking-widest2 text-burgundy-dark transition-colors duration-300 hover:bg-ivory"
              >
                Reserve with DOS
                <PiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#contact"
                data-cursor-hover
                className="group inline-flex items-center gap-2 rounded-full border border-ivory/40 px-7 py-3 font-body text-xs uppercase tracking-widest2 text-ivory transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                Plan with Dikshu
                <PiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
