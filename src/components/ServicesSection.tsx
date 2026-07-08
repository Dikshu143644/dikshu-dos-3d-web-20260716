"use client";

import { motion } from "framer-motion";
import {
  PiBellSimpleRinging,
  PiSparkleFill,
  PiFlowerLotus,
  PiForkKnife,
  PiAirplaneTilt,
  PiConfetti,
} from "react-icons/pi";

const services = [
  {
    title: "Concierge Services",
    description: "Personal arrangements handled with quiet precision",
    icon: PiBellSimpleRinging,
  },
  {
    title: "Housekeeping & Turndown",
    description: "Meticulous care, morning and evening",
    icon: PiSparkleFill,
  },
  {
    title: "Spa & Wellness",
    description: "Treatments designed around your rhythm",
    icon: PiFlowerLotus,
  },
  {
    title: "Private Dining & Catering",
    description: "Bespoke menus, anywhere on the estate",
    icon: PiForkKnife,
  },
  {
    title: "Airport Transfer",
    description: "Seamless arrivals and departures",
    icon: PiAirplaneTilt,
  },
  {
    title: "Events & Celebrations",
    description: "Weddings and gatherings, thoughtfully staged",
    icon: PiConfetti,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

// A snappy rightward jerk rather than a plain fade — each icon springs into
// place from the left instead of drifting up.
const jerkRight = {
  hidden: { opacity: 0, x: -70 },
  visible: { opacity: 1, x: 0 },
};

export default function ServicesSection() {
  return (
    <section id="services" className="relative bg-black px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          variants={fadeUp}
          className="mb-10 text-center md:mb-14"
        >
          <p className="mb-4 font-body text-xs uppercase tracking-[0.4em] text-gold">
            What We Offer
          </p>
          <h2 className="font-display text-4xl italic font-medium text-white md:text-5xl">
            Our Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-14 md:grid-cols-3 lg:grid-cols-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ type: "spring", stiffness: 260, damping: 14, delay: i * 0.1 }}
                variants={jerkRight}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-burgundy-dark/40">
                  <Icon size={26} className="text-gold" />
                </div>
                <h3 className="font-display italic text-base font-medium text-white md:text-lg">
                  {service.title}
                </h3>
                <p className="mt-2 font-body text-xs text-gray-400 md:text-sm">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
