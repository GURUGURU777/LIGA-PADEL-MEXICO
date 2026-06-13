import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Liga Pádel México",
  description: "Liga de pádel por temporada: parejas, jornadas, tabla y estadísticas en vivo.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = { themeColor: "#0A1626", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Nav />
        <main className="container-app py-7 pb-24 md:pb-12">{children}</main>
      </body>
    </html>
  );
}
