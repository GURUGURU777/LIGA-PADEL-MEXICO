import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0A1626", surface: "#0F2236", elevated: "#13314e" },
        cyan: { DEFAULT: "#3B8EE0", light: "#6FB0EE" },
        ink: { DEFAULT: "#EAF2FB", muted: "#8FB0D6", faint: "#5E7FA3" },
        line: { DEFAULT: "#1E3A5C", soft: "#16324f" },
        win: "#34C77B",
        loss: "#E2574C",
      },
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"] },
      borderRadius: { md: "8px", lg: "12px", xl: "16px", "2xl": "20px" },
      maxWidth: { app: "1080px" },
    },
  },
  plugins: [],
};
export default config;
