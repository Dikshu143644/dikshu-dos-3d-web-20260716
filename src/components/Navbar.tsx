"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const links = ["Resort", "Suites", "Experiences", "Dining", "Spa", "Contact"];

export default function Navbar({ revealed }: { revealed: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: "top -80",
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });
    return () => st.kill();
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : -20 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-luxury",
        scrolled && "glass-panel shadow-[0_4px_24px_rgba(43,42,40,0.08)]"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#"
          data-cursor-hover
          className={clsx(
            "font-display text-xl italic tracking-widest transition-colors duration-500",
            scrolled ? "text-burgundy-dark" : "text-ivory"
          )}
        >
          Viceroy
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <li key={link}>
              <a
                href="#"
                data-cursor-hover
                className={clsx(
                  "font-body text-[0.7rem] uppercase tracking-widest2 transition-colors duration-500 hover:text-gold",
                  scrolled ? "text-charcoal" : "text-ivory/85"
                )}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#"
          data-cursor-hover
          className={clsx(
            "hidden rounded-full border px-6 py-2.5 font-body text-[0.68rem] uppercase tracking-widest2 transition-colors duration-500 hover:bg-gold hover:text-burgundy-dark md:inline-block",
            scrolled ? "border-burgundy-dark/40 text-charcoal" : "border-gold/70 text-ivory"
          )}
        >
          Reserve
        </a>
      </nav>
    </motion.header>
  );
}
