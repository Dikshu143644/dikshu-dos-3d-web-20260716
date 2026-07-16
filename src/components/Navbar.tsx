"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { PiList, PiX } from "react-icons/pi";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { label: "Resort", href: "/#resort" },
  { label: "Experiences", href: "/#experiences" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Dining", href: "/#dining" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar({ revealed }: { revealed: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-luxury",
        scrolled && "glass-panel shadow-[0_4px_24px_rgba(43,42,40,0.08)]"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10 md:py-5">
        <Link
          href="/#resort"
          data-cursor-hover
          onClick={() => setOpen(false)}
          className={clsx(
            "font-display text-xl italic tracking-widest transition-colors duration-500",
            scrolled ? "text-burgundy-dark" : "text-ivory"
          )}
        >
          Dikshu
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                data-cursor-hover
                className={clsx(
                  "font-body text-[0.7rem] uppercase tracking-widest2 transition-colors duration-500 hover:text-gold",
                  scrolled ? "text-charcoal" : "text-ivory/85"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/#reserve"
          data-cursor-hover
          className={clsx(
            "hidden rounded-full border px-6 py-2.5 font-body text-[0.68rem] uppercase tracking-widest2 transition-colors duration-500 hover:bg-gold hover:text-burgundy-dark md:inline-block",
            scrolled ? "border-burgundy-dark/40 text-charcoal" : "border-gold/70 text-ivory"
          )}
        >
          Reserve
        </Link>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/#reserve"
            data-cursor-hover
            onClick={() => setOpen(false)}
            className={clsx(
              "rounded-full border px-4 py-2 font-body text-[0.62rem] uppercase tracking-widest2 transition-colors duration-500",
              scrolled ? "border-burgundy-dark/35 text-charcoal" : "border-gold/70 text-ivory"
            )}
          >
            Reserve
          </Link>
          <button
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className={clsx(
              "flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-colors duration-300",
              scrolled
                ? "border-burgundy-dark/25 bg-white/35 text-charcoal"
                : "border-white/20 bg-black/20 text-ivory"
            )}
          >
            {open ? <PiX size={19} /> : <PiList size={21} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mx-4 mb-4 overflow-hidden rounded-2xl border border-white/15 bg-black/70 p-2 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 font-body text-xs uppercase tracking-widest2 text-ivory/88 transition-colors duration-300 hover:bg-white/10 hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
