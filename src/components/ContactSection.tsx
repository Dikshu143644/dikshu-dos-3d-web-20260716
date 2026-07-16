"use client";

import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
import { motion } from "framer-motion";
import {
  PiPhone,
  PiEnvelopeSimple,
  PiInstagramLogo,
  PiLinkedinLogo,
  PiGithubLogo,
  PiWhatsappLogo,
  PiArrowUpRight,
} from "react-icons/pi";
import ImageSequencePlayer, {
  type ImageSequencePlayerHandle,
} from "@/components/story/ImageSequencePlayer";

const contactDetails = [
  { icon: PiPhone, text: "7666971183", href: "tel:+917666971183" },
  { icon: PiPhone, text: "7276661915", href: "tel:+917276661915" },
  { icon: PiEnvelopeSimple, text: "omkardsupe143644@gmail.com", href: "mailto:omkardsupe143644@gmail.com" },
];

const socials = [
  { icon: PiInstagramLogo, label: "Instagram", href: "https://www.instagram.com/_omkar_d_supe_/" },
  { icon: PiLinkedinLogo, label: "LinkedIn", href: "https://www.linkedin.com/in/omkar-supe-14u644/" },
  { icon: PiGithubLogo, label: "GitHub", href: "https://github.com/Dikshu143644" },
  { icon: PiWhatsappLogo, label: "WhatsApp", href: "https://wa.me/917666971183" },
];

const quickActions = [
  {
    icon: PiPhone,
    label: "Call",
    value: "7666971183",
    href: "tel:+917666971183",
    external: false,
    className: "sm:col-span-3",
    glow: "from-gold/26 via-white/8 to-transparent",
    iconClass: "border-gold/50 text-gold shadow-[0_0_26px_rgba(199,168,109,0.24)]",
  },
  {
    icon: PiPhone,
    label: "Call",
    value: "7276661915",
    href: "tel:+917276661915",
    external: false,
    className: "sm:col-span-3",
    glow: "from-amber-300/20 via-white/8 to-transparent",
    iconClass: "border-amber-300/50 text-amber-200 shadow-[0_0_26px_rgba(252,211,77,0.18)]",
  },
  {
    icon: PiWhatsappLogo,
    label: "WhatsApp",
    value: "Chat now",
    href: "https://wa.me/917666971183",
    external: true,
    className: "sm:col-span-2",
    glow: "from-emerald-400/28 via-emerald-100/8 to-transparent",
    iconClass: "border-emerald-300/55 text-emerald-300 shadow-[0_0_28px_rgba(52,211,153,0.24)]",
  },
  {
    icon: PiEnvelopeSimple,
    label: "Email",
    value: "Gmail",
    href: "mailto:omkardsupe143644@gmail.com",
    external: false,
    className: "sm:col-span-2",
    glow: "from-sky-300/24 via-white/8 to-transparent",
    iconClass: "border-sky-300/55 text-sky-200 shadow-[0_0_28px_rgba(125,211,252,0.2)]",
  },
  {
    icon: PiInstagramLogo,
    label: "Instagram",
    value: "_omkar_d_supe_",
    href: "https://www.instagram.com/_omkar_d_supe_/",
    external: true,
    className: "sm:col-span-2",
    glow: "from-fuchsia-400/26 via-rose-300/10 to-transparent",
    iconClass: "border-fuchsia-300/55 text-fuchsia-200 shadow-[0_0_28px_rgba(217,70,239,0.22)]",
  },
  {
    icon: PiLinkedinLogo,
    label: "LinkedIn",
    value: "Omkar Supe",
    href: "https://www.linkedin.com/in/omkar-supe-14u644/",
    external: true,
    className: "sm:col-span-3",
    glow: "from-blue-400/28 via-cyan-200/8 to-transparent",
    iconClass: "border-blue-300/55 text-blue-200 shadow-[0_0_28px_rgba(96,165,250,0.24)]",
  },
  {
    icon: PiGithubLogo,
    label: "GitHub",
    value: "Dikshu143644",
    href: "https://github.com/Dikshu143644",
    external: true,
    className: "sm:col-span-3",
    glow: "from-white/22 via-violet-200/10 to-transparent",
    iconClass: "border-white/55 text-white shadow-[0_0_28px_rgba(255,255,255,0.16)]",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

interface ContactSectionProps {
  imagesRef: MutableRefObject<Record<string, HTMLImageElement[]>>;
  frameCount: number;
  revealed: boolean;
}

export default function ContactSection({ imagesRef, frameCount, revealed }: ContactSectionProps) {
  const playerRef = useRef<ImageSequencePlayerHandle>(null);

  useEffect(() => {
    if (!revealed) return;

    let raf = 0;
    let lastFrame = -1;
    const loopDurationMs = 12000;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = ((now - start) % loopDurationMs) / loopDurationMs;
      const frame = Math.min(frameCount - 1, Math.floor(progress * frameCount));
      if (frame !== lastFrame) {
        playerRef.current?.drawFrame(frame);
        lastFrame = frame;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [frameCount, revealed]);

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-16 md:py-20">
      <ImageSequencePlayer
        ref={playerRef}
        imagesRef={imagesRef}
        sequenceId="4th-vdo"
        cropScale={1.22}
        offsetX={0.06}
        offsetY={0.04}
        className="absolute inset-0 h-full w-full opacity-90 brightness-125 saturate-125"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(199,168,109,0.28),transparent_34%),radial-gradient(circle_at_12%_78%,rgba(74,222,128,0.12),transparent_28%),linear-gradient(90deg,rgba(0,0,0,0.76),rgba(0,0,0,0.36)_48%,rgba(0,0,0,0.72)),linear-gradient(0deg,rgba(0,0,0,0.82),rgba(0,0,0,0.14)_45%,rgba(0,0,0,0.74))]"
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            variants={fadeUp}
          >
            <h2 className="font-display text-3xl italic font-medium leading-tight text-white md:text-4xl">
              Let&apos;s Plan
              <br />
              <span className="text-gold">Your Stay Together</span>
            </h2>
            <p className="mt-5 max-w-md font-body text-sm text-gray-400 md:text-base">
              Have a date in mind? Reach out and we&apos;ll help you shape the
              perfect escape, from arrival to the very last evening.
            </p>

            <a
              href="mailto:omkardsupe143644@gmail.com?subject=Dikshu%20Reservation"
              data-cursor-hover
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-gold/70 bg-gold/90 px-7 py-3 font-body text-xs uppercase tracking-widest2 text-burgundy-dark shadow-[0_0_28px_rgba(199,168,109,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_0_38px_rgba(199,168,109,0.45)]"
            >
              Get in Touch
              <PiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <ul className="mt-10 space-y-4">
              {contactDetails.map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-center gap-3 font-body text-sm text-gray-300">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 text-gold">
                    <Icon size={16} />
                  </span>
                  <a href={href} className="transition-colors duration-300 hover:text-gold">
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            variants={fadeUp}
            className="flex flex-col gap-8"
          >
            <div className="text-left lg:text-right">
              <p className="font-display text-2xl italic text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.3)]">
                Dikshu
              </p>
              <p className="mt-2 font-body text-xs uppercase tracking-widest2 text-gold/80">
                A DOS Experience
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-6">
              {quickActions.map(({ icon: Icon, label, value, href, external, className, glow, iconClass }) => (
                <a
                  key={`${label}-${value}`}
                  href={href}
                  aria-label={`${label}: ${value}`}
                  data-cursor-hover
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className={`group relative min-h-[86px] overflow-hidden rounded-[1.35rem] border border-white/20 bg-white/[0.075] px-4 py-4 text-left text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-18px_34px_rgba(255,255,255,0.035),0_20px_56px_rgba(0,0,0,0.32)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/[0.13] hover:shadow-[0_0_42px_rgba(199,168,109,0.22)] ${className}`}
                >
                  <span className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${glow} blur-2xl transition-opacity duration-300 group-hover:opacity-100`} />
                  <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-60" />
                  <span className="pointer-events-none absolute -left-24 top-0 h-full w-20 rotate-12 bg-white/20 blur-xl transition-transform duration-700 group-hover:translate-x-[28rem]" />
                  <span className="relative flex items-center gap-3">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-full border bg-black/35 ${iconClass}`}>
                      <Icon size={17} />
                    </span>
                    <span>
                      <span className="block font-body text-[0.64rem] uppercase tracking-widest2 text-gold/80">
                        {label}
                      </span>
                      <span className="mt-1 block break-words font-body text-sm text-white">
                        {value}
                      </span>
                    </span>
                  </span>
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  data-cursor-hover
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/25 text-white/75 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_0_24px_rgba(199,168,109,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold hover:shadow-[0_0_26px_rgba(199,168,109,0.28)]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 font-body text-xs text-gray-500 md:flex-row">
          <p>&copy; {new Date().getFullYear()} DOS. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://github.com/Dikshu143644" target="_blank" rel="noreferrer" className="hover:text-gold">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/omkar-supe-14u644/" target="_blank" rel="noreferrer" className="hover:text-gold">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
