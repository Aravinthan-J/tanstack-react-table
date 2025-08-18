/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /* Primary */
        primary: {
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
        },

        /* Secondary Palettes */
        secondaryOne: {
          100: "var(--color-secondary-one-100)",
          200: "var(--color-secondary-one-200)",
          300: "var(--color-secondary-one-300)",
          400: "var(--color-secondary-one-400)",
          500: "var(--color-secondary-one-500)",
          600: "var(--color-secondary-one-600)",
          700: "var(--color-secondary-one-700)",
          800: "var(--color-secondary-one-800)",
        },
        secondaryTwo: {
          100: "var(--color-secondary-two-100)",
          200: "var(--color-secondary-two-200)",
          300: "var(--color-secondary-two-300)",
          400: "var(--color-secondary-two-400)",
          500: "var(--color-secondary-two-500)",
          600: "var(--color-secondary-two-600)",
          700: "var(--color-secondary-two-700)",
          800: "var(--color-secondary-two-800)",
        },
        secondaryThree: {
          100: "var(--color-secondary-three-100)",
          200: "var(--color-secondary-three-200)",
          300: "var(--color-secondary-three-300)",
          400: "var(--color-secondary-three-400)",
          500: "var(--color-secondary-three-500)",
          600: "var(--color-secondary-three-600)",
          700: "var(--color-secondary-three-700)",
          800: "var(--color-secondary-three-800)",
        },
        secondaryFour: {
          100: "var(--color-secondary-four-100)",
          200: "var(--color-secondary-four-200)",
          300: "var(--color-secondary-four-300)",
          400: "var(--color-secondary-four-400)",
          500: "var(--color-secondary-four-500)",
          600: "var(--color-secondary-four-600)",
          700: "var(--color-secondary-four-700)",
          800: "var(--color-secondary-four-800)",
        },
        secondaryFive: {
          100: "var(--color-secondary-five-100)",
          200: "var(--color-secondary-five-200)",
          300: "var(--color-secondary-five-300)",
          400: "var(--color-secondary-five-400)",
          500: "var(--color-secondary-five-500)",
          600: "var(--color-secondary-five-600)",
          700: "var(--color-secondary-five-700)",
          800: "var(--color-secondary-five-800)",
        },
        secondarySix: {
          100: "var(--color-secondary-six-100)",
          200: "var(--color-secondary-six-200)",
          300: "var(--color-secondary-six-300)",
          400: "var(--color-secondary-six-400)",
          500: "var(--color-secondary-six-500)",
          600: "var(--color-secondary-six-600)",
          700: "var(--color-secondary-six-700)",
          800: "var(--color-secondary-six-800)",
        },
        secondarySeven: {
          100: "var(--color-secondary-seven-100)",
          200: "var(--color-secondary-seven-200)",
          300: "var(--color-secondary-seven-300)",
          400: "var(--color-secondary-seven-400)",
          500: "var(--color-secondary-seven-500)",
          600: "var(--color-secondary-seven-600)",
          700: "var(--color-secondary-seven-700)",
          800: "var(--color-secondary-seven-800)",
        },
        secondaryEight: {
          100: "var(--color-secondary-eight-100)",
          200: "var(--color-secondary-eight-200)",
          300: "var(--color-secondary-eight-300)",
          400: "var(--color-secondary-eight-400)",
          500: "var(--color-secondary-eight-500)",
          600: "var(--color-secondary-eight-600)",
          700: "var(--color-secondary-eight-700)",
          800: "var(--color-secondary-eight-800)",
        },
        secondaryNine: {
          100: "var(--color-secondary-nine-100)",
          200: "var(--color-secondary-nine-200)",
          300: "var(--color-secondary-nine-300)",
          400: "var(--color-secondary-nine-400)",
          500: "var(--color-secondary-nine-500)",
          600: "var(--color-secondary-nine-600)",
          700: "var(--color-secondary-nine-700)",
          800: "var(--color-secondary-nine-800)",
        },
        secondaryTen: {
          100: "var(--color-secondary-ten-100)",
          200: "var(--color-secondary-ten-200)",
          300: "var(--color-secondary-ten-300)",
          400: "var(--color-secondary-ten-400)",
          500: "var(--color-secondary-ten-500)",
          600: "var(--color-secondary-ten-600)",
          700: "var(--color-secondary-ten-700)",
          800: "var(--color-secondary-ten-800)",
        },

        red: {
          600: "#ef4444",
        },

        /* Semantic colors */
        success: {
          100: "var(--color-success-100)",
          200: "var(--color-success-200)",
          300: "var(--color-success-300)",
          400: "var(--color-success-400)",
          500: "var(--color-success-500)",
          600: "var(--color-success-600)",
          700: "var(--color-success-700)",
          800: "var(--color-success-800)",
        },
        error: {
          100: "var(--color-error-100)",
          200: "var(--color-error-200)",
          300: "var(--color-error-300)",
          400: "var(--color-error-400)",
          500: "var(--color-error-500)",
          600: "var(--color-error-600)",
          700: "var(--color-error-700)",
          800: "var(--color-error-800)",
        },
        warning: {
          100: "var(--color-warning-100)",
          200: "var(--color-warning-200)",
          300: "var(--color-warning-300)",
          400: "var(--color-warning-400)",
          500: "var(--color-warning-500)",
          600: "var(--color-warning-600)",
          700: "var(--color-warning-700)",
          800: "var(--color-warning-800)",
        },
        info: {
          100: "var(--color-info-100)",
          200: "var(--color-info-200)",
          300: "var(--color-info-300)",
          400: "var(--color-info-400)",
          500: "var(--color-info-500)",
          600: "var(--color-info-600)",
          700: "var(--color-info-700)",
          800: "var(--color-info-800)",
        },

        /* Neutral grays */
        gray: {
          100: "var(--color-gray-100)",
          200: "var(--color-gray-200)",
          300: "var(--color-gray-300)",
          400: "var(--color-gray-400)",
          500: "var(--color-gray-500)",
          600: "var(--color-gray-600)",
          700: "var(--color-gray-700)",
          800: "var(--color-gray-800)",
          900: "var(--color-gray-900)",
          999: "var(--color-gray-999)",
        },
      },

      boxShadow: {
        sm: "var(--shadow-100)",
        md: "var(--shadow-200)",
        lg: "var(--shadow-300)",
        xl: "var(--shadow-500)",
      },

      backgroundImage: {
        "ai-gradient-100": "var(--ai-gradient-100)",
        "ai-gradient-200": "var(--ai-gradient-200)",
        "ai-gradient-300": "var(--ai-gradient-300)",
        "ai-gradient-400": "var(--ai-gradient-400)",
        "ai-gradient-500": "var(--ai-gradient-500)",
        "ai-gradient-600": "var(--ai-gradient-600)",
        "ai-gradient-700": "var(--ai-gradient-700)",
        "ai-gradient-800": "var(--ai-gradient-800)",
        "ai-gradient-loader": "var(--ai-gradient-loader)",
        "ai-gradient-border": "var(--ai-gradient-border)",
      },

      backgroundColor: {
        "ai-gradient-100": "var(--ai-gradient-100)",
        "ai-gradient-200": "var(--ai-gradient-200)",
        "ai-gradient-300": "var(--ai-gradient-300)",
        "ai-gradient-400": "var(--ai-gradient-400)",
        "ai-gradient-500": "var(--ai-gradient-500)",
        "ai-gradient-600": "var(--ai-gradient-600)",
        "ai-gradient-700": "var(--ai-gradient-700)",
        "ai-gradient-800": "var(--ai-gradient-800)",
      },

      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },

      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
      },

      borderRadius: {
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },

      spacing: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
      },
    },
  },
  corePlugins: {
    container: false, // Disable Tailwind's container utility
    aspectRatio: false, // Disable aspect ratio utility
    float: false, // Disable float utilities
    clear: false, // Disable clear utilities
    isolation: false, // Disable isolation utilities
    overscrollBehavior: false, // Disable overscroll behavior utilities
    scrollMargin: false, // Disable scroll margin utilities
    scrollPadding: false, // Disable scroll padding utilities
    textDecorationColor: false, // Disable text decoration color utilities
    textDecorationStyle: false, // Disable text decoration style utilities
    textDecorationThickness: false, // Disable text decoration thickness utilities
    transformOrigin: false, // Disable transform origin utilities
    transitionProperty: false, // Disable transition property utilities
    transitionTimingFunction: false, // Disable transition timing function utilities
    willChange: false, // Disable will change utilities
  },
  safelist: {
    standard: [
      "bg-success-500",
      "text-white",
      "shadow-md",
      "color-p",
      "bg-ai-gradient-500",
      "text-white",
      "p-8",
      "rounded",
      "font-mono",
      "bg-clip-border",
    ],
    deep: [
      /^bg-(primary|secondary|success|error|warning|info|gray)-\d{3,4}$/,
      /^text-(primary|secondary|success|error|warning|info|gray)-\d{3,4}$/,
      /^shadow-(sm|md|lg|xl)$/,
    ],
  },
  darkMode: "class", // Enable dark mode support
  future: {
    hoverOnlyWhenSupported: true, // Enable hover only when supported
    removeDeprecatedGapUtilities: true, // Remove deprecated gap utilities
    purgeLayersByDefault: true, // Purge layers by default
  },
  plugins: [],
};
