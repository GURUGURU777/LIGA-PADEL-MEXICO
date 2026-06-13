import type { Metadata, Viewport } from "next";
import "./globals.css";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Liga Pádel México",
  description: "Liga de pádel por temporada con coordinación de horarios y ranking en vivo.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0B1B2E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="app-shell">
          <TopBar />
          <main className="flex-1 overflow-y-auto">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
