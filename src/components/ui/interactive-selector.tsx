"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaCouch,
  FaFire,
  FaArchway,
  FaWarehouse,
  FaLeaf,
  FaTshirt,
  FaRing,
  FaCity,
  FaTree,
  FaLightbulb,
  FaUmbrellaBeach,
  FaCrown,
  FaGem,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useLiteExperience } from "@/hooks/useLiteExperience";

const options = [
  {
    title: "Living Room Suite",
    description: "Where comfort meets refined design",
    image: "/interior-photos/living-room.jpg",
    icon: <FaCouch size={20} className="text-white" />,
  },
  {
    title: "Outdoor Cinema & Fire Lounge",
    description: "Starlit films beside an open fire",
    image: "/interior-photos/outdoor-lounge.jpg",
    icon: <FaFire size={20} className="text-white" />,
  },
  {
    title: "Andalusian Courtyard Suite",
    description: "Sun-drenched Spanish elegance",
    image: "/interior-photos/andalusian-suite.webp",
    icon: <FaArchway size={20} className="text-white" />,
  },
  {
    title: "Loft Retreat",
    description: "Industrial charm, elevated living",
    image: "/interior-photos/loft-retreat.jpg",
    icon: <FaWarehouse size={20} className="text-white" />,
  },
  {
    title: "Bali Cabin Suite",
    description: "Tranquil nature, private serenity",
    image: "/interior-photos/bali-cabin.jpg",
    icon: <FaLeaf size={20} className="text-white" />,
  },
  {
    title: "Walk-In Wardrobe",
    description: "Curated closets, quietly organized",
    image: "/interior-photos/walk-in-wardrobe.jpg",
    icon: <FaTshirt size={20} className="text-white" />,
  },
  {
    title: "Glam Dressing Room",
    description: "Crystal light, tailored for you",
    image: "/interior-photos/glam-dressing-room.webp",
    icon: <FaRing size={20} className="text-white" />,
  },
  {
    title: "Penthouse Rooftop Pool",
    description: "Skyline views above it all",
    image: "/interior-photos/penthouse-rooftop-pool.webp",
    icon: <FaCity size={20} className="text-white" />,
  },
  {
    title: "Rooftop Garden Terrace",
    description: "Open air, city lights below",
    image: "/interior-photos/rooftop-terrace.jpg",
    icon: <FaTree size={20} className="text-white" />,
  },
  {
    title: "Ambient Lounge",
    description: "Warm light, evenings well spent",
    image: "/interior-photos/ambient-lounge.jpg",
    icon: <FaLightbulb size={20} className="text-white" />,
  },
  {
    title: "Tropical Pool Terrace",
    description: "Firelit nights beside the water",
    image: "/interior-photos/tropical-pool-terrace.jpg",
    icon: <FaUmbrellaBeach size={20} className="text-white" />,
  },
  {
    title: "The Grand Foyer",
    description: "A first impression, perfectly set",
    image: "/interior-photos/grand-foyer.webp",
    icon: <FaCrown size={20} className="text-white" />,
  },
  {
    title: "Spiral Staircase Lounge",
    description: "Sculptural light, art in motion",
    image: "/interior-photos/spiral-staircase-lounge.webp",
    icon: <FaGem size={20} className="text-white" />,
  },
];

const PAGE_SIZE = 5;
const TOTAL_PAGES = Math.ceil(options.length / PAGE_SIZE);

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -60 : 60, opacity: 0 }),
};

const InteractiveSelector = () => {
  const lite = useLiteExperience();
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);

  const pageOptions = options.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) setActiveIndex(index);
  };

  // Left arrow advances to the next set; right arrow returns to the previous one.
  const goNext = () => {
    if (page >= TOTAL_PAGES - 1) return;
    setDirection(1);
    setPage((p) => p + 1);
    setActiveIndex(0);
  };

  const goPrev = () => {
    if (page <= 0) return;
    setDirection(-1);
    setPage((p) => p - 1);
    setActiveIndex(0);
  };

  useEffect(() => {
    setAnimatedOptions([]);
    const timers: ReturnType<typeof setTimeout>[] = [];

    pageOptions.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (lite) {
    return (
      <section className="bg-black px-4 py-16 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl font-medium italic tracking-tight text-white">
            Discover Your Space
          </h1>
          <p className="mx-auto mt-4 max-w-md font-body text-sm leading-relaxed text-gray-300">
            Explore the distinct suites and sanctuaries of Dikshu.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2">
          {options.map((option, index) => (
            <article
              key={option.title}
              className="relative min-h-[280px] overflow-hidden border border-white/10 bg-charcoal"
            >
              <img
                src={option.image}
                alt=""
                loading={index < 2 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.78),rgba(0,0,0,0.08)_52%)]" />
              <div className="relative z-10 flex min-h-[280px] flex-col justify-end p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 bg-burgundy-dark/85">
                  {option.icon}
                </div>
                <h2 className="font-display text-2xl font-medium italic text-white">
                  {option.title}
                </h2>
                <p className="mt-2 font-body text-sm text-gray-300">
                  {option.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black font-sans text-white">
      {/* Header Section */}
      <div className="w-full max-w-2xl px-6 mt-8 mb-2 text-center">
        <h1 className="text-4xl md:text-5xl font-display italic font-medium text-white mb-3 tracking-tight drop-shadow-lg animate-fadeInTop delay-300">
          Discover Your Space
        </h1>
        <p className="text-lg md:text-xl text-gray-300 font-body max-w-xl mx-auto animate-fadeInTop delay-600">
          Explore the distinct suites and sanctuaries of Dikshu.
        </p>
      </div>

      <div className="h-12"></div>

      {/* Options Container */}
      <div className="relative flex w-full max-w-[1200px] items-center px-2 md:px-4">
        <button
          type="button"
          onClick={goNext}
          disabled={page >= TOTAL_PAGES - 1}
          aria-label="Next suites"
          data-cursor-hover
          className="absolute -left-2 z-30 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold disabled:pointer-events-none disabled:opacity-30 md:-left-14"
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
              className="options flex w-full h-[440px] md:h-[560px] mx-0 items-stretch overflow-hidden relative"
            >
              {pageOptions.map((option, index) => (
                <div
                  key={option.title}
                  className={`
                    option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out
                    ${activeIndex === index ? "active" : ""}
                  `}
                  style={{
                    backgroundImage: `url('${option.image}')`,
                    backgroundSize: activeIndex === index ? "auto 100%" : "auto 120%",
                    backgroundPosition: "center",
                    backfaceVisibility: "hidden",
                    opacity: animatedOptions.includes(index) ? 1 : 0,
                    transform: animatedOptions.includes(index) ? "translateX(0)" : "translateX(-60px)",
                    minWidth: "60px",
                    minHeight: "100px",
                    margin: 0,
                    borderRadius: 0,
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: activeIndex === index ? "#C7A86D" : "#292929",
                    cursor: "pointer",
                    backgroundColor: "#0a0a0a",
                    boxShadow:
                      activeIndex === index
                        ? "0 20px 60px rgba(0,0,0,0.60)"
                        : "0 10px 30px rgba(0,0,0,0.40)",
                    flex: activeIndex === index ? "7 1 0%" : "1 1 0%",
                    zIndex: activeIndex === index ? 10 : 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    position: "relative",
                    overflow: "hidden",
                    willChange: "flex-grow, box-shadow, background-size, background-position",
                  }}
                  onClick={() => handleOptionClick(index)}
                >
                  {/* Shadow effect */}
                  <div
                    className="shadow absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
                    style={{
                      bottom: activeIndex === index ? "0" : "-40px",
                      height: "120px",
                      boxShadow:
                        activeIndex === index
                          ? "inset 0 -120px 120px -120px #000, inset 0 -120px 120px -80px #000"
                          : "inset 0 -120px 0px -120px #000, inset 0 -120px 0px -80px #000",
                    }}
                  ></div>

                  {/* Label with icon and info */}
                  <div className="label absolute left-0 right-0 bottom-5 flex items-center justify-start h-12 z-2 pointer-events-none px-4 gap-3 w-full">
                    <div className="icon min-w-[44px] max-w-[44px] h-[44px] flex items-center justify-center rounded-full bg-burgundy-dark/85 backdrop-blur-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.18)] border-2 border-[#C7A86D]/60 flex-shrink-0 flex-grow-0 transition-all duration-200">
                      {option.icon}
                    </div>
                    <div className="info text-white whitespace-pre relative">
                      <div
                        className="main font-display italic font-medium text-lg transition-all duration-700 ease-in-out"
                        style={{
                          opacity: activeIndex === index ? 1 : 0,
                          transform: activeIndex === index ? "translateX(0)" : "translateX(25px)",
                        }}
                      >
                        {option.title}
                      </div>
                      <div
                        className="sub text-base text-gray-300 font-body transition-all duration-700 ease-in-out"
                        style={{
                          opacity: activeIndex === index ? 1 : 0,
                          transform: activeIndex === index ? "translateX(0)" : "translateX(25px)",
                        }}
                      >
                        {option.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={goPrev}
          disabled={page <= 0}
          aria-label="Previous suites"
          data-cursor-hover
          className="absolute -right-2 z-30 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold disabled:pointer-events-none disabled:opacity-30 md:-right-14"
        >
          <FaChevronRight size={16} />
        </button>
      </div>

      <div className="mt-6 flex gap-2">
        {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-6 rounded-full transition-colors duration-300 ${
              i === page ? "bg-gold" : "bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fadeInFromTop {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInTop {
          opacity: 0;
          transform: translateY(-20px);
          animation: fadeInFromTop 0.8s ease-in-out forwards;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
};

export default InteractiveSelector;
