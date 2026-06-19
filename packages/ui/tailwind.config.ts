import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--ui-primary))",
          foreground: "hsl(var(--ui-primary-foreground))",
          dark: "hsl(var(--ui-primary-dark))",
        },
        secondary: {
          DEFAULT: "hsl(var(--ui-secondary))",
          foreground: "hsl(var(--ui-secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--ui-accent))",
          foreground: "hsl(var(--ui-accent-foreground))",
        },
        background: "hsl(var(--ui-background))",
        foreground: "hsl(var(--ui-foreground))",
        muted: {
          DEFAULT: "hsl(var(--ui-muted))",
          foreground: "hsl(var(--ui-muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--ui-card))",
          foreground: "hsl(var(--ui-card-foreground))",
        },
        border: "hsl(var(--ui-border))",
        input: "hsl(var(--ui-input))",
        ring: "hsl(var(--ui-ring))",
        destructive: {
          DEFAULT: "hsl(var(--ui-destructive))",
          foreground: "hsl(var(--ui-destructive-foreground))",
        },
        success: "hsl(var(--ui-success))",
        warning: "hsl(var(--ui-warning))",
      },
      borderRadius: {
        sm: "var(--ui-radius-sm)",
        md: "var(--ui-radius-md)",
        lg: "var(--ui-radius-lg)",
        xl: "var(--ui-radius-xl)",
        full: "var(--ui-radius-full)",
        btn: "var(--ui-radius-btn)",
        input: "var(--ui-radius-input)",
        card: "var(--ui-radius-card)",
      },
      boxShadow: {
        sm: "var(--ui-shadow-sm)",
        md: "var(--ui-shadow-md)",
        lg: "var(--ui-shadow-lg)",
        card: "var(--ui-shadow-card)",
        "card-hover": "var(--ui-shadow-card-hover)",
        soft: "var(--ui-shadow-soft)",
      },
      maxWidth: {
        container: "var(--ui-max-width-container)",
      },
    },
  },
  plugins: [],
};

export default config;
