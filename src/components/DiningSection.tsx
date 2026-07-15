"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const venues = [
  {
    src: "/dining/grand-dining-hall.jpg",
    alt: "Grand dining hall opening to the terrace",
    title: "The Grand Hall",
    description:
      "A soaring dining room that opens onto the terrace, where every course arrives beneath candlelight and starlight in equal measure.",
    category: "Contemporary",
    hours: "7:00 – 11:00 PM",
  },
  {
    src: "/dining/chandelier-dining-table.webp",
    alt: "Long table beneath a sculptural chandelier",
    title: "Under the Chandelier",
    description:
      "Our signature long table, set beneath a cascade of hand-blown glass, built for gatherings that linger long after dessert.",
    category: "Fine Dining",
    hours: "6:30 – 10:30 PM",
  },
  {
    src: "/dining/round-table-setting.jpg",
    alt: "Intimate round table setting",
    title: "The Round Table",
    description:
      "An intimate setting for smaller parties, where conversation flows as freely as the wine pairings curated for each dish.",
    category: "Contemporary",
    hours: "12:00 – 3:00 PM",
  },
  {
    src: "/dining/private-dining-room.webp",
    alt: "Private dining room with statement lighting",
    title: "The Private Room",
    description:
      "A discreet room for the moments that call for privacy — anniversaries, proposals, and quiet celebrations of every kind.",
    category: "Private Events",
    hours: "By Reservation",
  },
  {
    src: "/dining/geometric-ceiling-dining.webp",
    alt: "Dining room beneath a faceted mirrored ceiling",
    title: "The Mirror Room",
    description:
      "A faceted, mirrored ceiling scatters candlelight across the table, turning every dinner into a small spectacle.",
    category: "Contemporary",
    hours: "6:00 – 10:00 PM",
  },
  {
    src: "/dining/rustic-live-edge-table.jpg",
    alt: "Rustic live-edge dining table beside garden doors",
    title: "The Garden Table",
    description:
      "A live-edge table set beside doors thrown open to the garden, for meals that move at the pace of the afternoon.",
    category: "Rustic",
    hours: "12:00 – 4:00 PM",
  },
  {
    src: "/dining/designer-kitchen-island.jpg",
    alt: "Designer show kitchen with statement island",
    title: "The Show Kitchen",
    description:
      "Pull up a stool at the island and watch each course come together, city lights glittering just beyond the glass.",
    category: "Chef's Table",
    hours: "7:00 – 10:00 PM",
  },
  {
    src: "/dining/gold-glam-kitchen.jpg",
    alt: "Gold and marble kitchen beneath a crystal chandelier",
    title: "The Gilded Kitchen",
    description:
      "Marble, brass and crystal set the stage for a late-night tasting menu shared among friends.",
    category: "Chef's Table",
    hours: "8:00 – 11:30 PM",
  },
];

const PAGE_SIZE = 4;
const TOTAL_PAGES = Math.ceil(venues.length / PAGE_SIZE);

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -60 : 60, opacity: 0 }),
};

export default function DiningSection() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const pageVenues = venues.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  // Left arrow advances to the next set; right arrow returns to the previous one.
  const goNext = () => {
    if (page >= TOTAL_PAGES - 1) return;
    setDirection(1);
    setPage((p) => p + 1);
  };

  const goPrev = () => {
    if (page <= 0) return;
    setDirection(-1);
    setPage((p) => p - 1);
  };

  return (
    <section id="dining" className="relative bg-black px-6 py-16 md:py-20">
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
            Fine Dining
          </p>
          <h2 className="font-display text-4xl italic font-medium text-white md:text-5xl">
            An Evening at Dikshu
          </h2>
          <p className="mx-auto mt-5 max-w-lg font-body text-sm text-gray-400 md:text-base">
            Candlelit tables, curated menus, and settings built for
            unforgettable evenings.
          </p>
        </motion.div>

        <div className="relative flex items-center px-2 md:px-4">
          <button
            type="button"
            onClick={goNext}
            disabled={page >= TOTAL_PAGES - 1}
            aria-label="Next venues"
            data-cursor-hover
            className="absolute -left-2 z-30 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold disabled:pointer-events-none disabled:opacity-30 md:-left-14"
          >
            <FaChevronLeft size={16} />
          </button>

          <div className="w-full overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
              >
                {pageVenues.map((venue, i) => (
                  <motion.div
                    key={venue.src}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col overflow-hidden rounded-lg bg-ivory"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={venue.src}
                        alt={venue.alt}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-1 flex-col px-6 py-7">
                      <h3 className="font-body text-base font-bold uppercase tracking-wide text-charcoal">
                        {venue.title}
                      </h3>
                      <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-warmgray">
                        {venue.description}
                      </p>

                      <div className="mt-6 border-t border-dotted border-charcoal/25 pt-4">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 font-display text-sm italic text-burgundy-dark">
                            <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
                            {venue.category}
                          </span>
                          <span className="font-body text-xs text-warmgray">{venue.hours}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={goPrev}
            disabled={page <= 0}
            aria-label="Previous venues"
            data-cursor-hover
            className="absolute -right-2 z-30 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold disabled:pointer-events-none disabled:opacity-30 md:-right-14"
          >
            <FaChevronRight size={16} />
          </button>
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-6 rounded-full transition-colors duration-300 ${
                i === page ? "bg-gold" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
