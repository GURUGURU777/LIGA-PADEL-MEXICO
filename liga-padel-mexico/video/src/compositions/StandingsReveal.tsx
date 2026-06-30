import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/Archivo";
import { C } from "../theme";
import { Crest } from "../components/Crest";

const { fontFamily } = loadFont();

export type Row = { pos: number; name: string; code: string; color: string; pts: number };

export const StandingsReveal: React.FC<{ rows: Row[]; title: string }> = ({ rows, title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOp = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily, color: C.ink, padding: "150px 90px" }}>
      <div style={{ opacity: titleOp, fontWeight: 900, fontSize: 78, marginBottom: 50 }}>{title}</div>
      {rows.map((r, i) => {
        const s = spring({ frame: frame - 10 - i * 4, fps, config: { damping: 16 } });
        const top4 = r.pos <= 4;
        return (
          <div
            key={r.code}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 28,
              padding: "20px 24px",
              marginBottom: 8,
              borderRadius: 16,
              background: C.surface,
              borderLeft: `8px solid ${top4 ? C.cyan : "transparent"}`,
              opacity: s,
              transform: `translateX(${(1 - s) * 70}px)`,
            }}
          >
            <span style={{ fontWeight: 800, fontSize: 46, width: 64, color: top4 ? C.cyanLight : C.inkFaint }}>
              {String(r.pos).padStart(2, "0")}
            </span>
            <Crest code={r.code} color={r.color} size={80} />
            <span style={{ flex: 1, fontWeight: 700, fontSize: 46 }}>{r.name}</span>
            <span style={{ fontWeight: 900, fontSize: 60 }}>{r.pts}</span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
