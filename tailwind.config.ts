import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: "#F7C5D5",
        rose: "#E8A0B4",
        cream: "#FDF6F0",
        gold: "#C9A84C",
        "gold-soft": "#E8D5A3",
        ink: "#3A2A2A",
        muted: "#9E8585",
        shell: "#FFFAF7",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dmsans)", "system-ui", "sans-serif"],
      },
      transitionDuration: {
        "400": "400ms",
      },
      borderRadius: {
        card: "16px",
        pill: "999px",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(232, 160, 180, 0.18)",
        lift: "0 22px 50px rgba(186, 120, 140, 0.28)",
      },
      keyframes: {
        heroShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        drift: {
          "0%": { transform: "translateY(0) scale(0.6)", opacity: "0" },
          "10%": { opacity: "0.8" },
          "90%": { opacity: "0.5" },
          "100%": { transform: "translateY(-105vh) scale(1.1)", opacity: "0" },
        },
        bob: {
          "0%, 100%": { transform: "translate(-50%, 0)" },
          "50%": { transform: "translate(-50%, 10px)" },
        },
      },
      animation: {
        heroShift: "heroShift 16s ease-in-out infinite",
        drift: "drift linear infinite",
        bob: "bob 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
