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
        // LMC Design System Colors — Reference-accurate light theme
        // Based on backup.lmc.co.ug screenshots
        lmc: {
          // PAGE BACKGROUNDS — light theme
          pageBg: "#f0f0f0", // main page background (light gray)
          sectionBg: "#ffffff", // white sections inside the page
          cardBg: "#ffffff", // cards

          // FOOTER — dark navy, NOT gray
          footerBg: "#2c3e50", // navy blue footer
          footerDark: "#1a2530", // copyright strip bottom

          // TEXT — dark on light
          textPrimary: "#1a1a1a", // body text, headings on light bg
          textSecondary: "#666666", // muted text, captions
          textOnDark: "#ffffff", // text on footer / hero overlays
          textOnDarkMuted: "#bbbbbb", // muted text on footer

          // GREEN — primary accent (buttons, CTAs)
          green: "#1b7a12", // primary green accent
          greenDark: "#107a02", // hover state
          greenLight: "#2a9c1f", // hover variant

          // BLUE — secondary accent (the "FIND A DOCTOR" trapezoid)
          blue: "#45aaff",
          blueDark: "#2196f3",

          // BORDERS / DIVIDERS
          borderLight: "#e0e0e0",
          borderMedium: "#cccccc",

          // OVERLAYS (for hero caption boxes)
          overlayDark: "rgba(0, 0, 0, 0.55)",
          overlayDarker: "rgba(0, 0, 0, 0.70)",

          // BACKWARDS-COMPAT ALIASES (to be migrated away in later tickets)
          grayDark: "#1a1a1a", // alias to textPrimary
          grayMedium: "#666666", // alias to textSecondary
          grayLight: "#e0e0e0", // alias to borderLight
          offWhite: "#f0f0f0", // alias to pageBg
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
        card: "0 2px 5px rgba(0,0,0,0.1)",
        header: "0 2px 10px rgba(0,0,0,0.15)",
        cardHover: "0 4px 15px rgba(0,0,0,0.2)",
      },
      maxWidth: {
        container: "1170px",
      },
    },
  },
  plugins: [],
};

export default config;
