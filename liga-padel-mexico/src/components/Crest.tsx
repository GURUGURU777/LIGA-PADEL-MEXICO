export function Crest({ code, color, size = 36 }: { code: string; color: string; size?: number }) {
  return (
    <span
      className="display inline-flex items-center justify-center rounded-full font-extrabold flex-none"
      style={{
        width: size, height: size,
        background: `${color}22`,
        border: `2px solid ${color}`,
        color,
        fontSize: size * 0.3,
      }}
    >
      {code}
    </span>
  );
}
