import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-syne)', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        /* Brand palette — direct CSS var access */
        brand: {
          forest: "var(--color-forest)",
          deep: "var(--color-green-deep)",
          action: "var(--color-green-action)",
          bright: "var(--color-green-bright)",
          lime: "var(--color-green-lime)",
          mist: "var(--color-green-mist)",
        },
        olive: {
          dark: "var(--color-olive-dark)",
          mid: "var(--color-olive-mid)",
          light: "var(--color-olive-light)",
          pale: "var(--color-olive-pale)",
        },
        info: {
          deep: "var(--color-blue-deep)",
          mid: "var(--color-blue-mid)",
          light: "var(--color-blue-light)",
        },
        surface: "var(--color-surface)",
        charcoal: "var(--color-charcoal)",
        night: "var(--color-night)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
        xl: "var(--radius-lg)",
        "2xl": "var(--radius-xl)",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        orbit: {
          from: { transform: "rotate(0deg) translateX(180px) rotate(0deg)" },
          to: { transform: "rotate(360deg) translateX(180px) rotate(-360deg)" },
        },
        "orbit-reverse": {
          from: { transform: "rotate(360deg) translateX(220px) rotate(-360deg)" },
          to: { transform: "rotate(0deg) translateX(220px) rotate(0deg)" },
        },
        "pulse-ring": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.3)", opacity: "0.6" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { opacity: "0", transform: "translateX(24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "count-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "shimmer": {
          from: { backgroundPosition: "-200% 0" },
          to: { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "orbit": "orbit 20s linear infinite",
        "orbit-reverse": "orbit-reverse 25s linear infinite",
        "pulse-ring": "pulse-ring 2s ease-in-out infinite",
        "fade-up": "fade-up 0.4s cubic-bezier(0.0, 0, 0.2, 1) forwards",
        "slide-in": "slide-in 0.4s cubic-bezier(0.0, 0, 0.2, 1) forwards",
        "count-up": "count-up 0.4s cubic-bezier(0.0, 0, 0.2, 1) forwards",
        "shimmer": "shimmer 2s linear infinite",
      },
      transitionTimingFunction: {
        "standard": "cubic-bezier(0.4, 0, 0.2, 1)",
        "entrance": "cubic-bezier(0.0, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
