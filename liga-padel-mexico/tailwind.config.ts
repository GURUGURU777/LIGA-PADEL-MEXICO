import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta "Azul nocturno" — identidad de Liga Pádel México
        navy: {
          DEFAULT: "#0B1B2E", // fondo
          surface: "#0E2236", // tarjetas
          elevated: "#13314e", // fila destacada
        },
        cyan: {
          DEFAULT: "#378ADD", // acento / marca
          light: "#6FB0EE",
        },
        ink: {
          DEFAULT: "#EAF2FB", // texto principal
          muted: "#7CA6D6", // texto secundario
        },
        line: {
          DEFAULT: "#16324f", // bordes
          strong: "#1f3f60",
        },
      },
      borderRadius: { md: "8px", lg: "12px", xl: "16px" },
    },
  },
  plugins: [],
};
export default config;
