export function TopBar() {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-line">
      <div className="flex items-center gap-2">
        <span className="inline-block w-3.5 h-3.5 rounded-full bg-cyan" />
        <span className="text-[15px] font-medium text-ink">Liga Pádel México</span>
      </div>
      <button aria-label="Notificaciones" className="text-ink-muted">
        {/* Campana (icono inline para no depender de librerías) */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3H4a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
          <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
        </svg>
      </button>
    </header>
  );
}
