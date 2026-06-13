import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Liga Pádel México",
  description: "La liga de pádel amateur por temporada: compite todo el año, sube en la tabla.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = { themeColor: "#03060C", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
