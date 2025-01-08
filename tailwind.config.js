import { g } from "framer-motion/client";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#f6f6f6",
        dark: "#090909",
        lightGray: "#e4e4e4",
        gray: "#aaa",
        // darkGray: "#1b1b1b",
        darkGray: "#444",
        primary: "#00565f",
        secondary: "#e75d13",
      },
      fontFamily: {
        sans: ["Instrument Sans", "sans-serif"],
        serif: ["Instrument Serif", "serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
  darkMode: "selector",
};
