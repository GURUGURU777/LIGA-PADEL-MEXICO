import { Nav } from "@/components/Nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="container-app py-7 pb-24 md:pb-12">{children}</main>
    </>
  );
}
