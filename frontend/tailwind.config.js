/**
 * Lexis Counsel / CivicLegal-AI
 * TailwindCSS Configuration — Full Design Tokens from Design.md
 * Theme: "Parchment & Warm Amber Glassmorphism"
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // ── Primary (Amber / Burnt Ochre) ──────────────────────────
        "primary":                   "#903f00",
        "primary-container":         "#b45309",
        "primary-fixed":             "#ffdbca",
        "primary-fixed-dim":         "#ffb68e",
        "on-primary":                "#ffffff",
        "on-primary-container":      "#fff1eb",
        "on-primary-fixed":          "#331200",
        "on-primary-fixed-variant":  "#763300",
        "inverse-primary":           "#ffb68e",

        // ── Secondary (Warm Tangerine) ──────────────────────────────
        "secondary":                 "#904d00",
        "secondary-container":       "#fe932c",
        "secondary-fixed":           "#ffdcc3",
        "secondary-fixed-dim":       "#ffb77d",
        "on-secondary":              "#ffffff",
        "on-secondary-container":    "#663500",
        "on-secondary-fixed":        "#2f1500",
        "on-secondary-fixed-variant":"#6e3900",

        // ── Tertiary (Muted Neutral Slate) ─────────────────────────
        "tertiary":                  "#575754",
        "tertiary-container":        "#6f6f6c",
        "tertiary-fixed":            "#e4e2de",
        "tertiary-fixed-dim":        "#c8c6c3",
        "on-tertiary":               "#ffffff",
        "on-tertiary-container":     "#f5f3ef",
        "on-tertiary-fixed":         "#1b1c1a",
        "on-tertiary-fixed-variant": "#474744",

        // ── Surface & Parchment ────────────────────────────────────
        "parchment-surface":         "#fdfaf1",
        "surface":                   "#f8f9fc",
        "surface-bright":            "#f8f9fc",
        "surface-dim":               "#d8dadd",
        "surface-variant":           "#e1e2e5",
        "surface-container":         "#eceef0",
        "surface-container-low":     "#f2f4f6",
        "surface-container-lowest":  "#ffffff",
        "surface-container-high":    "#e7e8eb",
        "surface-container-highest": "#e1e2e5",
        "on-surface":                "#191c1e",
        "on-surface-variant":        "#564338",
        "inverse-surface":           "#2e3133",
        "inverse-on-surface":        "#eff1f3",

        // ── Outlines & Borders ─────────────────────────────────────
        "outline":                   "#897267",
        "outline-variant":           "#ddc1b3",

        // ── Semantic Alerts ────────────────────────────────────────
        "error":                     "#ba1a1a",
        "error-container":           "#ffdad6",
        "on-error":                  "#ffffff",
        "on-error-container":        "#93000a",

        // ── Success (Emerald) ──────────────────────────────────────
        "success":                   "#1a6e2e",
        "success-container":         "#b6f2c5",
        "on-success":                "#ffffff",
        "on-success-container":      "#002109",
      },

      fontFamily: {
        sans:     ["Manrope", "sans-serif"],
        body:     ["Manrope", "sans-serif"],
        headline: ["Manrope", "sans-serif"],
        mono:     ["JetBrains Mono", "monospace"],
      },

      fontSize: {
        "headline-xl":       ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg":       ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-lg-mobile":["24px", { lineHeight: "32px", fontWeight: "600" }],
        "headline-md":       ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "body-lg":           ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md":           ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "label-md":          ["14px", { lineHeight: "20px", letterSpacing: "0.01em", fontWeight: "500" }],
        "label-sm":          ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "600" }],
      },

      spacing: {
        "sidebar-expanded":  "280px",
        "sidebar-collapsed": "72px",
        "gutter":            "24px",
        "max-width-fluid":   "1440px",
      },

      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "12px",
        lg: "20px",
        xl: "28px",
        "2xl": "40px",
      },

      boxShadow: {
        "glass-sm":   "0 4px 12px rgba(180, 83, 9, 0.08)",
        "glass-md":   "0 8px 24px rgba(180, 83, 9, 0.10)",
        "glass-lg":   "0 24px 48px rgba(180, 83, 9, 0.06)",
        "glass-xl":   "0 32px 64px rgba(180, 83, 9, 0.12)",
        "primary-sm": "0 4px 12px rgba(144, 63, 0, 0.20)",
        "primary-md": "0 8px 16px rgba(180, 83, 9, 0.20)",
        "primary-lg": "0 12px 24px rgba(180, 83, 9, 0.15)",
        "input":      "0 8px 24px rgba(180, 83, 9, 0.04)",
        "btn":        "0 12px 24px rgba(180, 83, 9, 0.15)",
      },

      animation: {
        "fade-in":         "fadeIn 0.4s ease-out",
        "fade-up":         "fadeUp 0.5s ease-out",
        "slide-in-right":  "slideInRight 0.4s ease-out",
        "slide-in-left":   "slideInLeft 0.4s ease-out",
        "pulse-amber":     "pulseAmber 2s ease-in-out infinite",
        "spin-slow":       "spin 8s linear infinite",
        "glow":            "glow 3s ease-in-out infinite",
        "typing":          "typing 1s steps(3) infinite",
        "bounce-subtle":   "bounceSubtle 1.5s ease-in-out infinite",
        "scale-in":        "scaleIn 0.3s ease-out",
        "progress-fill":   "progressFill 1.2s ease-out forwards",
        "countdown-tick":  "countdownTick 1s ease-in-out infinite",
        "shimmer":         "shimmer 2s linear infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseAmber: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(180, 83, 9, 0.3)" },
          "50%": { boxShadow: "0 0 0 12px rgba(180, 83, 9, 0)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        typing: {
          "0%": { content: "''" },
          "33%": { content: "'·'" },
          "66%": { content: "'··'" },
          "100%": { content: "'···'" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        progressFill: {
          "0%": { strokeDashoffset: "283" },
          "100%": { strokeDashoffset: "var(--dash-offset)" },
        },
        countdownTick: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },

      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      transitionTimingFunction: {
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
