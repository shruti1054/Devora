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
        // ── De'VORA Core Palette ──────────────────────────────────────────
        background:   "#fff8f5",          // site-wide bg (warm white)
        surface:      "#fff8f5",
        "surface-dim":"#e1d8d4",
        "surface-low":"#fbf2ed",
        "surface-container": "#f5ece7",
        "surface-high":"#efe6e2",
        "surface-highest": "#e9e1dc",

        // Primary – mauve / shell pink
        primary:      "#70585b",
        "on-primary": "#ffffff",
        "primary-container": "#fadadd",   // lustre badge bg
        "primary-fixed":    "#fbdbde",
        "primary-fixed-dim":"#debfc2",

        // Secondary – coastal gold
        secondary:    "#735c00",
        "on-secondary":"#ffffff",
        "secondary-container": "#fed65b", // gold accent chip
        "secondary-fixed":    "#ffe088",
        "secondary-fixed-dim":"#e9c349",

        // Tertiary – sea-salt neutral
        tertiary:     "#5f5e5b",
        "tertiary-container": "#e4e1dd",

        // On-surface text
        "on-surface":         "#1e1b18",  // replaces old `ink`
        "on-surface-variant": "#4f4445",  // replaces old `muted`

        // Outline / dividers
        outline:         "#807475",
        "outline-variant":"#d2c3c4",

        // Inverse (for dark surfaces like footer)
        "inverse-surface":    "#34302c",
        "inverse-on-surface": "#f8efea",

        // Error
        error: "#ba1a1a",
        "error-container": "#ffdad6",

        // ── Legacy aliases (keep existing code working) ────────────────────
        blush:       "#fadadd",           // = primary-container
        rose:        "#debfc2",           // = primary-fixed-dim
        cream:       "#fff8f5",           // = background
        gold:        "#735c00",           // = secondary  (dark gold text)
        "gold-accent":"#d4af37",          // decorative metallic gold
        "gold-soft":  "#ffe088",          // = secondary-fixed
        "gold-glow":  "rgba(212,175,55,0.10)",
        ink:         "#1e1b18",           // = on-surface
        muted:       "#4f4445",           // = on-surface-variant
        shell:       "#fff8f5",           // = background / surface
      },

      fontFamily: {
        // Playfair Display for display/headline (via layout.tsx swap below)
        serif: ["var(--font-playfair)", "var(--font-cormorant)", "Georgia", "serif"],
        sans:  ["var(--font-dmsans)", "system-ui", "sans-serif"],
      },

      fontSize: {
        // De'VORA type scale
        "display-lg": ["4rem",   { lineHeight: "4.5rem", letterSpacing: "-0.02em" }],
        "headline-lg": ["2.5rem",{ lineHeight: "3rem" }],
        "headline-lg-mobile": ["1.75rem", { lineHeight: "2.25rem" }],
        "headline-md": ["1.75rem",{ lineHeight: "2.25rem" }],
        "body-lg":     ["1.125rem",{ lineHeight: "1.75rem" }],
        "body-md":     ["1rem",   { lineHeight: "1.5rem" }],
        "label-sm":    ["0.75rem",{ lineHeight: "1rem", letterSpacing: "0.1em" }],
      },

      maxWidth: {
        container: "1280px",
        "container-max": "1280px",
      },

      spacing: {
        gutter: "24px",
        "margin-mobile": "20px",
        "margin-desktop": "60px",
      },

      borderRadius: {
        // De'VORA shape scale
        sm:   "0.125rem",
        DEFAULT:"0.25rem",
        md:   "0.375rem",
        lg:   "0.5rem",
        xl:   "0.75rem",
        "2xl":"0.875rem",
        card: "0.75rem",      // 12px – product cards / modals
        pill: "9999px",       // full pill for buttons / chips
      },

      boxShadow: {
        // Soft gold-tinted ambient shadows (no harsh dark)
        soft:   "0 10px 30px rgba(212,175,55,0.08), 0 2px 8px rgba(112,88,91,0.06)",
        lift:   "0 22px 50px rgba(212,175,55,0.14), 0 8px 20px rgba(112,88,91,0.10)",
        glass:  "0 6px 20px rgba(212,175,55,0.10), inset 0 1px 0 rgba(255,255,255,0.6)",
        "gold-glow": "0 0 24px rgba(212,175,55,0.18)",
      },

      backdropBlur: {
        glass: "20px",
      },

      transitionDuration: {
        "400": "400ms",
      },

      keyframes: {
        heroShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
        drift: {
          "0%":   { transform: "translateY(0) scale(0.6)", opacity: "0" },
          "10%":  { opacity: "0.8" },
          "90%":  { opacity: "0.5" },
          "100%": { transform: "translateY(-105vh) scale(1.1)", opacity: "0" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        bob: {
          "0%, 100%": { transform: "translate(-50%, 0)" },
          "50%":      { transform: "translate(-50%, 10px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        lustreGlow: {
          "0%, 100%": { opacity: "0.7" },
          "50%":      { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },

      animation: {
        heroShift:  "heroShift 16s ease-in-out infinite",
        drift:      "drift linear infinite",
        floaty:     "floaty 5s ease-in-out infinite",
        bob:        "bob 2.4s ease-in-out infinite",
        shimmer:    "shimmer 6s linear infinite",
        marquee:    "marquee 26s linear infinite",
        lustreGlow: "lustreGlow 3s ease-in-out infinite",
        slideUp:    "slideUp 0.4s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
