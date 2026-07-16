"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springConfig = { damping: 28, stiffness: 320, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const down = () => setPressed(true);
    const up = () => setPressed(false);

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("[data-cursor-hover]"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseover", over);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        animate={{
          width: hovering ? 68 : pressed ? 22 : 34,
          height: hovering ? 68 : pressed ? 22 : 34,
          opacity: hovering ? 1 : 0.92,
          scale: pressed ? 0.82 : 1,
        }}
        transition={{ type: "spring", damping: 22, stiffness: 300 }}
        className="relative rounded-full border border-cyan-200/70 bg-white/[0.035] shadow-[0_0_18px_rgba(125,211,252,0.42),inset_0_0_16px_rgba(255,255,255,0.14)] backdrop-blur-[2px]"
      >
        <motion.span
          animate={{
            opacity: hovering ? 0.18 : 0.42,
            scale: hovering ? 1.18 : 1,
          }}
          transition={{ duration: 0.25 }}
          className="absolute inset-[-9px] rounded-full border border-fuchsia-300/45 shadow-[0_0_24px_rgba(217,70,239,0.24)]"
        />
        <motion.span
          animate={{
            width: hovering ? 7 : 6,
            height: hovering ? 7 : 6,
            backgroundColor: hovering ? "#67e8f9" : "#f5d88b",
          }}
          transition={{ duration: 0.2 }}
          className="absolute left-1/2 top-1/2 rounded-full shadow-[0_0_18px_currentColor]"
          style={{ translateX: "-50%", translateY: "-50%" }}
        />
        {hovering && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-body text-[0.52rem] uppercase tracking-[0.26em] text-cyan-100/90 drop-shadow-[0_0_8px_rgba(103,232,249,0.8)]">
            Go
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
