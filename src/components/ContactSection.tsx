"use client";

import { motion } from "framer-motion";
import {
  PiPhone,
  PiEnvelopeSimple,
  PiMapPin,
  PiFacebookLogo,
  PiInstagramLogo,
  PiLinkedinLogo,
  PiPinterestLogo,
  PiArrowUpRight,
} from "react-icons/pi";

const contactDetails = [
  { icon: PiPhone, text: "+1 (555) 123-4567" },
  { icon: PiEnvelopeSimple, text: "reservations@viceroy.com" },
  { icon: PiMapPin, text: "1 Ocean Drive, Bali, Indonesia" },
];

const socials = [
  { icon: PiFacebookLogo, label: "Facebook" },
  { icon: PiInstagramLogo, label: "Instagram" },
  { icon: PiLinkedinLogo, label: "LinkedIn" },
  { icon: PiPinterestLogo, label: "Pinterest" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactSection() {
  return (
    <section id="contact" className="relative border-t border-white/10 bg-black px-6 py-14 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 md:grid-cols-2 md:gap-10">
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
              href="#"
              data-cursor-hover
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 font-body text-xs uppercase tracking-widest2 text-burgundy-dark transition-colors duration-300 hover:bg-white"
            >
              Get in Touch
              <PiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <ul className="mt-10 space-y-4">
              {contactDetails.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 font-body text-sm text-gray-300">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 text-gold">
                    <Icon size={16} />
                  </span>
                  {text}
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
            className="flex flex-col items-start justify-between md:items-end md:text-right"
          >
            <div>
              <p className="font-display text-2xl italic text-white">Viceroy</p>
              <p className="mt-2 font-body text-xs uppercase tracking-widest2 text-gray-500">
                Built for Timeless Luxury
              </p>
            </div>

            <div className="mt-10 flex gap-3 md:mt-auto">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  data-cursor-hover
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 font-body text-xs text-gray-500 md:flex-row">
          <p>© {new Date().getFullYear()} Viceroy. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gold">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
