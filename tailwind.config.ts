import type { Config } from "tailwindcss";

/**
 * Tailwind CSS Configuration
 *
 * Theme tokens are defined here for reference and tooling support.
 * Actual runtime values come from CSS variables in /styles/globals.css
 *
 * RULE: No hardcoded hex values in components. Use theme tokens only.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--color-primary))",
          foreground: "hsl(var(--color-primary-foreground))",
          dark: "hsl(var(--color-primary-dark))",
        },
        secondary: {
          DEFAULT: "hsl(var(--color-secondary))",
          foreground: "hsl(var(--color-secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--color-accent))",
          foreground: "hsl(var(--color-accent-foreground))",
        },
        background: "hsl(var(--color-background))",
        foreground: "hsl(var(--color-foreground))",
        muted: {
          DEFAULT: "hsl(var(--color-muted))",
          foreground: "hsl(var(--color-muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--color-card))",
          foreground: "hsl(var(--color-card-foreground))",
        },
        border: "hsl(var(--color-border))",
        input: "hsl(var(--color-input))",
        ring: "hsl(var(--color-ring))",
        destructive: {
          DEFAULT: "hsl(var(--color-destructive))",
          foreground: "hsl(var(--color-destructive-foreground))",
        },
        success: "hsl(var(--color-success))",
        warning: "hsl(var(--color-warning))",
        // LMC Design System Colors — synced from mockup-reference/styles.css
        // GREEN values are BRAND OVERRIDES (LMC #1b7a12, not mockup #0E8A6D)
        lmc: {
          // Page surfaces — from mockup
          pageBg: "#f5f5f5",        // mockup --bg
          sectionBg: "#ffffff",     // mockup --white
          cardBg: "#ffffff",        // mockup --white
          topbarBg: "#efefef",      // mockup topbar background

          // Footer — from mockup (navy blue)
          footerBg: "#2D4A6F",      // mockup --blue
          footerDark: "#233a58",    // mockup --blue-dark

          // Text colors — from mockup
          textPrimary: "#2a2a2a",   // mockup --ink
          textSecondary: "#6b7280", // mockup --muted
          textOnDark: "#ffffff",
          textOnDarkMuted: "rgba(255,255,255,0.85)",

          // GREEN — BRAND OVERRIDE: LMC #1b7a12, NOT mockup's #0E8A6D
          green: "#1b7a12",
          greenDark: "#107a02",
          greenLight: "#2a9c1f",

          // BLUE — from mockup
          blue: "#2D4A6F",          // mockup --blue (navy)
          blueDark: "#233a58",      // mockup --blue-dark
          blueAccent: "#4A90D9",    // mockup --accent

          // Borders/dividers — from mockup
          borderLight: "#e5e7eb",   // mockup --line
          borderMedium: "#e3e3e3",  // mockup topbar border
          borderDark: "#d1d5db",

          // Overlays — from mockup hero
          overlayDark: "rgba(20,30,50,0.62)",
          overlayDarker: "rgba(20,30,50,0.78)",

          // BACKWARDS-COMPAT aliases (keep so existing components don't break)
          grayDark: "#2a2a2a",      // same as textPrimary
          grayMedium: "#6b7280",    // same as textSecondary
          grayLight: "#e5e7eb",     // same as borderLight
          offWhite: "#f5f5f5",      // same as pageBg
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
        btn: "3px",
      },
      spacing: {
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
        "2xl": "var(--spacing-2xl)",
        "3xl": "var(--spacing-3xl)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        // Mockup-synced shadows
        card: "0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.08)",      // mockup --shadow-sm
        cardHover: "0 6px 18px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.06)", // mockup --shadow-md
        header: "0 6px 18px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.06)",    // mockup --shadow-md
        hero: "0 20px 50px rgba(0,0,0,0.18)",                                  // mockup --shadow-lg
      },
      maxWidth: {
        container: "1170px",
      },
    },
  },
  plugins: [],
};

export default config;
