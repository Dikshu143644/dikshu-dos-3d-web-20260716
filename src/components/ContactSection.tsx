"use client";

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
              href="mailto:omkardsupe143644@gmail.com?subject=Dikshu%20Reservation"
              data-cursor-hover
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 font-body text-xs uppercase tracking-widest2 text-burgundy-dark transition-colors duration-300 hover:bg-white"
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
            className="flex flex-col items-start justify-between md:items-end md:text-right"
          >
            <div>
              <p className="font-display text-2xl italic text-white">Dikshu</p>
              <p className="mt-2 font-body text-xs uppercase tracking-widest2 text-gray-500">
                A DOS Experience
              </p>
            </div>

            <div className="mt-10 flex gap-3 md:mt-auto">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  data-cursor-hover
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-300 hover:border-gold hover:text-gold"
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
