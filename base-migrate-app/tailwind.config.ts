import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        black: {
          50: "#000000",
          100: "#070F11",
          150: "#717184",
          200: "#E3E3E8",
          250: "#131316",
          300: "#717184",
          350: "#717184",
        },
        white: {
          50: "#ffffff",
          100: "#F1F2F6",
          150: "#D9DEF0",
        },
        blue: {
          50: "#0052FF",
          100: "#0040C8",
        },
      },
    },
  },
  plugins: [],
};
export default config;
