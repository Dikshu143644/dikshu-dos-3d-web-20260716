import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: "#5A1F2B",
          dark: "#4A1822",
        },
        gold: "#C7A86D",
        sand: "#E9DFC9",
        ivory: "#F7F3EC",
        charcoal: "#2B2A28",
        warmgray: "#6E655B",
        offwhite: "#FCFAF6",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Playfair Display", "serif"],
        body: ["var(--font-inter)", "Manrope", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(var(--rot, 0deg))" },
          "50%": { transform: "translateY(-16px) rotate(var(--rot, 0deg))" },
        },
        drift: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(40px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        drift: "drift 18s ease-in-out infinite alternate",
        pulseSoft: "pulseSoft 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
