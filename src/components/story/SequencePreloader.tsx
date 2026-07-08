"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

interface SequencePreloaderProps {
  progress: number;
}

export default function SequencePreloader({ progress }: SequencePreloaderProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const displayedRef = useRef(0);

  useEffect(() => {
    const target = Math.min(100, Math.max(0, progress));
    const obj = { val: displayedRef.current };
    const tween = gsap.to(obj, {
      val: target,
      duration: 0.5,
      ease: "power1.out",
      onUpdate: () => {
        displayedRef.current = obj.val;
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(obj.val));
        }
      },
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
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-start font-display italic text-ivory"
      >
        <span
          ref={counterRef}
          className="text-[4rem] leading-none tabular-nums sm:text-[6rem] md:text-[7rem]"
        >
          0
        </span>
        <span className="mt-1 text-lg text-gold sm:mt-2 sm:text-xl">%</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-4 font-body text-[0.65rem] uppercase tracking-[0.4em] text-warmgray"
      >
        Preparing the journey
      </motion.p>
    </motion.div>
  );
}
