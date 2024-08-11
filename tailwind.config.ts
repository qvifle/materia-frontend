import type { Config } from "tailwindcss"
const { nextui } = require("@nextui-org/react")
const config = {
  // darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  mode: "jit",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      colors: {
        primary: {
          1: "var(--primary-1)",
          2: "var(--primary-2)",
          3: "var(--primary-3)",
          4: "var(--primary-4)",
          5: "var(--primary-5)",
          6: "var(--primary-6)",
          7: "var(--primary-7)",
          8: "var(--primary-8)",
          9: "var(--primary-9)",
          10: "var(--primary-10)",
          11: "var(--primary-11)",
          12: "var(--primary-12)",
          DEFAULT: "var(--primary-9)",
          foreground: "#FCFCFD",
        },
        background: "var(--gray-1)",
        foreground: "var(--gray-12)",
        divider: "var(--black-a1)",
        content1: "var(--gray-1)",
        content2: "var(--gray-3)",
        content3: "var(--gray-5)",
        content4: "var(--gray-6)",
        default: {
          50: "var(--gray-1)",
          100: "var(--gray-3)",
          200: "var(--gray-4)",
          300: "var(--gray-5)",
          400: "var(--gray-6)",
          500: "var(--gray-7)",
          600: "var(--gray-8)",
          700: "var(--gray-9)",
          800: "var(--gray-10)",
          900: "var(--gray-12)",
        },
        danger: {
          50: "var(--error-3)",
          100: "var(--error-4)",
          200: "var(--error-5)",
          300: "var(--error-6)",
          400: "var(--error-7)",
          500: "var(--error-8)",
          600: "var(--error-9)",
          700: "var(--error-10)",
          800: "var(--error-11)",
          900: "var(--error-12)",
          DEFAULT: "var(--error-9)",
          foreground: "var(--error-9)",
        },
        gray: {
          1: "var(--gray-1)",
          2: "var(--gray-2)",
          3: "var(--gray-3)",
          4: "var(--gray-4)",
          5: "var(--gray-5)",
          6: "var(--gray-6)",
          7: "var(--gray-7)",
          8: "var(--gray-8)",
          9: "var(--gray-9)",
          10: "var(--gray-10)",
          11: "var(--gray-11)",
          12: "var(--gray-12)",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background15: "var(--background-15)",
        background_hover: "hsl(var(--background-hover))",

        // background: "hsl(var(--background))",
        // foreground: "hsl(var(--foreground))",
        // primary: {
        //   DEFAULT: "#FF0000",
        //   foreground: "#ffffff",
        // },

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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  darkMode: "class",
  plugins: [require("tailwindcss-animate"), nextui()],
} satisfies Config

export default config
