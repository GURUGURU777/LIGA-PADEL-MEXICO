import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/Archivo";
import { C } from "../theme";
import { Crest } from "../components/Crest";

const { fontFamily } = loadFont();

export type ResultadoProps = {
  jornada: number;
  sponsor: string;
  home: { name: string; code: string; color: string };
  away: { name: string; code: string; color: string };
  scoreHome: number;
  scoreAway: number;
  detail: string;
};

export const Resultado: React.FC<ResultadoProps> = ({ jornada, sponsor, home, away, scoreHome, scoreAway, detail }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const inL = spring({ frame, fps, config: { damping: 14 } });
  const inR = spring({ frame: frame - 3, fps, config: { damping: 14 } });
  const scorePop = spring({ frame: frame - 15, fps, config: { damping: 10, stiffness: 120 } });
  const tagOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const detailOp = interpolate(frame, [28, 40], [0, 1], { extrapolateRight: "clamp" });
  const bandOp = interpolate(frame, [36, 50], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 80% at 50% 0%, ${C.surface} 0%, ${C.bg} 70%)`,
        fontFamily,
        color: C.ink,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "absolute", top: 120, display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: C.cyan, color: C.bg, fontWeight: 900, fontSize: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>LP</div>
        <span style={{ fontWeight: 800, fontSize: 34 }}>LIGA PÁDEL MX</span>
      </div>

      <div style={{ position: "absolute", top: 280, opacity: tagOp, fontWeight: 800, letterSpacing: 6, color: C.loss, fontSize: 32 }}>
        FINAL · JORNADA {jornada}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 56 }}>
        <div style={{ transform: `translateX(${(1 - inL) * -220}px)`, opacity: inL, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, width: 280 }}>
          <Crest code={home.code} color={home.color} size={220} />
          <span style={{ fontWeight: 700, fontSize: 38 }}>{home.name}</span>
        </div>

        <div style={{ transform: `scale(${scorePop})`, opacity: scorePop, fontWeight: 900, fontSize: 190, lineHeight: 1 }}>
          {scoreHome}
          <span style={{ color: C.inkFaint, margin: "0 18px" }}>-</span>
          {scoreAway}
        </div>

        <div style={{ transform: `translateX(${(1 - inR) * 220}px)`, opacity: inR, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, width: 280 }}>
          <Crest code={away.code} color={away.color} size={220} />
          <span style={{ fontWeight: 700, fontSize: 38, color: C.inkMuted }}>{away.name}</span>
        </div>
      </div>

      <div style={{ marginTop: 60, opacity: detailOp, fontSize: 42, color: C.inkMuted, letterSpacing: 2 }}>{detail}</div>

      <div style={{ position: "absolute", bottom: 130, opacity: bandOp, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 22, letterSpacing: 6, color: C.inkFaint }}>PRESENTADO POR</span>
        <span style={{ fontWeight: 800, fontSize: 56 }}>{sponsor}</span>
      </div>
    </AbsoluteFill>
  );
};
