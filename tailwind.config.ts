import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172333",
        muted: "#687789",
        canvas: "#f6f8fb",
        brand: {
          DEFAULT: "#3268e8",
          dark: "#2453c6",
          pale: "#edf3ff",
        },
        mint: "#21a67a",
      },
      boxShadow: {
        soft: "0 12px 40px rgba(29, 48, 77, 0.07)",
      },
      fontFamily: {
        sans: ["var(--font-be-vietnam)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
