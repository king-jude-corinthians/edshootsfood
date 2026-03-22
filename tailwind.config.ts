import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2F3CCF",
          light: "#6F86F7",
          dark: "#1E2A9E",
        },
        gold: {
          DEFAULT: "#4A5FE3",
          light: "#6F86F7",
          dark: "#2F3CCF",
          muted: "rgba(79, 95, 227, 0.3)",
        },
        surface: {
          DEFAULT: "#0A0A0A",
          white: "#FFFFFF",
          dark: "#050505",
          card: "#111111",
          elevated: "#1A1A1A",
        },
        text: {
          primary: "#FFFFFF",
          muted: "#888888",
          light: "#F2F2F4",
          dark: "#0F1012",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.08)",
          dark: "rgba(255,255,255,0.05)",
          light: "rgba(255,255,255,0.15)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "ken-burns": "kenBurns 25s ease-in-out infinite alternate",
        pulse: "pulse 2s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        "slide-carousel": "slideCarousel 0.5s ease-out forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        fadeIn: {
          "0%": { opacity: "0", filter: "blur(6px)" },
          "100%": { opacity: "1", filter: "blur(0px)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)", filter: "blur(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0px)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        kenBurns: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.15)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.05)" },
        },
        slideCarousel: {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
