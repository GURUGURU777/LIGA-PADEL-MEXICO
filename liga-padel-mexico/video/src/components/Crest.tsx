import React from "react";

export const Crest: React.FC<{ code: string; color: string; size: number }> = ({ code, color, size }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size,
      background: `${color}22`,
      border: `${Math.max(2, size * 0.03)}px solid ${color}`,
      color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 900,
      fontSize: size * 0.28,
    }}
  >
    {code}
  </div>
);
