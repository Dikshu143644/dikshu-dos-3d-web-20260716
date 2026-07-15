"use client";

import { motion } from "framer-motion";
import { PiSparkleFill, PiArrowUpRight } from "react-icons/pi";

export default function ClosingCTASection() {
  return (
    <section className="relative overflow-hidden bg-sand px-6 py-20 md:py-28">
      {/* Organic decorative blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-burgundy/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-gold/15 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-full border-[6px] border-ivory shadow-2xl">
            <img
              src="/final-page/sunset-pool.jpg"
              alt="Sunset by the resort pool"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-3 -right-3 flex h-20 w-20 items-center justify-center rounded-full bg-burgundy-dark text-gold shadow-lg md:h-24 md:w-24">
            <PiSparkleFill size={28} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center md:text-left"
        >
          <h2 className="font-body text-3xl font-bold uppercase leading-tight tracking-wide text-charcoal md:text-4xl">
            An Escape for
            <br />
            the Unhurried
          </h2>
          <p className="mt-3 font-display text-2xl italic text-burgundy-dark md:text-3xl">
            quiet luxury, found
          </p>
          <p className="mx-auto mt-6 max-w-md font-body text-sm leading-relaxed text-warmgray md:mx-0 md:text-base">
            Some places ask for your attention. Dikshu simply asks for your
            time - the rest settles on its own, one unhurried evening at a
            time.
          </p>

          <a
            href="#contact"
            data-cursor-hover
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-burgundy-dark px-8 py-3.5 font-body text-xs uppercase tracking-widest2 text-ivory transition-colors duration-300 hover:bg-gold hover:text-burgundy-dark"
          >
            Begin Your Escape
            <PiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
