"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sub = [
  { href: "/tabla", label: "Tabla" },
  { href: "/parejas", label: "Parejas" },
  { href: "/jornadas", label: "Jornadas" },
];

export function LigaTabs() {
  const p = usePathname();
  const act = (h: string) => p === h || p.startsWith(h + "/");
  return (
    <div className="flex gap-1 mb-6 border-b border-line">
      {sub.map((s) => (
        <Link key={s.href} href={s.href} className="px-3.5 py-2.5 text-sm font-medium -mb-px"
          style={act(s.href) ? { borderBottom: "2px solid var(--cyan)", color: "var(--ink)" } : { borderBottom: "2px solid transparent", color: "var(--ink-muted)" }}>
          {s.label}
        </Link>
      ))}
    </div>
  );
}
