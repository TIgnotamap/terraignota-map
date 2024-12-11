import { g } from "framer-motion/client";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#fff",
        dark: "#000",
        gray: "#aaa",
        darkGray: "#666",
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
