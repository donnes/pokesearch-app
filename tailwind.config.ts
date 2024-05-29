import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: "class",
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
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
        sans: ["Inter", ...fontFamily.sans],
      },
      colors: {
        pokemon: {
          style: {
            normal: "#aaa67f",
            fighting: "#c12239",
            flying: "#a891ec",
            poison: "#a43e9e",
            ground: "#dec16b",
            rock: "#b69e31",
            bug: "#a7b723",
            ghost: "#70559b",
            steel: "#b7b9d0",
            fire: "#f57d31",
            water: "#6493eb",
            grass: "#74cb48",
            electric: "#f9cf30",
            psychic: "#fb5584",
            ice: "#9ad6df",
            dragon: "#7037ff",
            dark: "#75574c",
            fairy: "#e69eac",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
