"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/disponibilidad", label: "Horarios", icon: "calendar" },
  { href: "/partidos", label: "Partidos", icon: "ball" },
  { href: "/tabla", label: "Tabla", icon: "list" },
];

function Icon({ name, active }: { name: string; active: boolean }) {
  const stroke = active ? "#6FB0EE" : "#7CA6D6";
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "calendar")
    return (<svg {...common}><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M16 3v4M8 3v4M4 11h16M12 15v2" /></svg>);
  if (name === "ball")
    return (<svg {...common}><circle cx="12" cy="12" r="9" /><path d="M5.6 5.6a9 9 0 0 1 12.8 12.8M18.4 5.6a9 9 0 0 0 -12.8 12.8" /></svg>);
  return (<svg {...common}><path d="M11 6h9M11 12h9M11 18h9M4 6h.01M4 12h.01M4 18h.01" /></svg>);
}

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="flex border-t border-line">
      {tabs.map((t) => {
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            className="flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px]"
            style={{ color: active ? "#6FB0EE" : "#7CA6D6" }}
          >
            <Icon name={t.icon} active={active} />
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
