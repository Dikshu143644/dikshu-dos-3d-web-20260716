"use client";

import { motion } from "framer-motion";

export default function GalleryHeading() {
  return (
    <div className="flex justify-center bg-black px-6 pb-8 pt-12 md:pb-10 md:pt-14">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-md border border-gold/50 px-8 py-4 md:px-12 md:py-5"
      >
        <h2 className="font-display text-2xl italic font-medium text-ivory md:text-3xl">
          Our Top Halal Resorts &amp; Retreats
        </h2>
      </motion.div>
    </div>
  );
}
