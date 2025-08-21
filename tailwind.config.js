/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./src/index.css"],
  theme: {
    extend: {
      colors: {
        // Primary scale
        "primary-100": "var(--theme-color-primary-100)",
        "primary-200": "var(--theme-color-primary-200)",
        "primary-300": "var(--theme-color-primary-300)",
        "primary-400": "var(--theme-color-primary-400)",
        "primary-500": "var(--theme-color-primary-500)",
        "primary-600": "var(--theme-color-primary-600)",
        "primary-700": "var(--theme-color-primary-700)",
        "primary-800": "var(--theme-color-primary-800)",

        // Secondary one
        "secondary-one-100": "var(--theme-color-secondary-one-100)",
        "secondary-one-200": "var(--theme-color-secondary-one-200)",
        "secondary-one-300": "var(--theme-color-secondary-one-300)",
        "secondary-one-400": "var(--theme-color-secondary-one-400)",
        "secondary-one-500": "var(--theme-color-secondary-one-500)",
        "secondary-one-600": "var(--theme-color-secondary-one-600)",
        "secondary-one-700": "var(--theme-color-secondary-one-700)",
        "secondary-one-800": "var(--theme-color-secondary-one-800)",

        // Secondary two
        "secondary-two-100": "var(--theme-color-secondary-two-100)",
        "secondary-two-200": "var(--theme-color-secondary-two-200)",
        "secondary-two-300": "var(--theme-color-secondary-two-300)",
        "secondary-two-400": "var(--theme-color-secondary-two-400)",
        "secondary-two-500": "var(--theme-color-secondary-two-500)",
        "secondary-two-600": "var(--theme-color-secondary-two-600)",
        "secondary-two-700": "var(--theme-color-secondary-two-700)",
        "secondary-two-800": "var(--theme-color-secondary-two-800)",

        // Secondary three
        "secondary-three-100": "var(--theme-color-secondary-three-100)",
        "secondary-three-200": "var(--theme-color-secondary-three-200)",
        "secondary-three-300": "var(--theme-color-secondary-three-300)",
        "secondary-three-400": "var(--theme-color-secondary-three-400)",
        "secondary-three-500": "var(--theme-color-secondary-three-500)",
        "secondary-three-600": "var(--theme-color-secondary-three-600)",
        "secondary-three-700": "var(--theme-color-secondary-three-700)",
        "secondary-three-800": "var(--theme-color-secondary-three-800)",

        // Add other "secondary" families as needed...
        "secondary-four-500": "var(--theme-color-secondary-four-500)",

        // Semantic colors
        "success-100": "var(--theme-color-success-100)",
        "success-200": "var(--theme-color-success-200)",
        "success-300": "var(--theme-color-success-300)",
        "success-400": "var(--theme-color-success-400)",
        "success-500": "var(--theme-color-success-500)",

        "error-100": "var(--theme-color-error-100)",
        "error-200": "var(--theme-color-error-200)",
        "error-300": "var(--theme-color-error-300)",
        "error-400": "var(--theme-color-error-400)",
        "error-500": "var(--theme-color-error-500)",

        "warning-100": "var(--theme-color-warning-100)",
        "warning-200": "var(--theme-color-warning-200)",
        "warning-300": "var(--theme-color-warning-300)",
        "warning-400": "var(--theme-color-warning-400)",
        "warning-500": "var(--theme-color-warning-500)",

        "info-100": "var(--theme-color-info-100)",
        "info-200": "var(--theme-color-info-200)",
        "info-300": "var(--theme-color-info-300)",
        "info-400": "var(--theme-color-info-400)",
        "info-500": "var(--theme-color-info-500)",

        // Grays
        "gray-100": "var(--theme-color-gray-100)",
        "gray-200": "var(--theme-color-gray-200)",
        "gray-300": "var(--theme-color-gray-300)",
        "gray-400": "var(--theme-color-gray-400)",
        "gray-500": "var(--theme-color-gray-500)",
        "gray-600": "var(--theme-color-gray-600)",
        "gray-700": "var(--theme-color-gray-700)",
        "gray-800": "var(--theme-color-gray-800)",
        "gray-900": "var(--theme-color-gray-900)",

        // Basics
        white: "var(--theme-color-white)",
        black: "var(--theme-color-black)",
        transparent: "var(--theme-color-transparent)",
      },
    },
  },
  // Add plugins if needed
  plugins: [],
};
