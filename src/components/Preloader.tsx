"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

interface PreloaderProps {
  progress: number;
}

export default function Preloader({ progress }: PreloaderProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = Math.min(100, Math.max(0, progress));
    const tween = gsap.to(barRef.current, {
      width: `${target}%`,
      duration: 0.6,
      ease: "power1.out",
    });
    return () => {
      tween.kill();
    };
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-3xl italic tracking-widest text-ivory sm:text-4xl md:text-5xl"
      >
        Dikshu
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 h-px w-40 overflow-hidden bg-white/15 sm:w-52"
      >
        <div ref={barRef} className="h-full w-0 bg-gold" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-5 font-body text-[0.65rem] uppercase tracking-[0.4em] text-warmgray"
      >
        Preparing the journey
      </motion.p>
    </motion.div>
  );
}
