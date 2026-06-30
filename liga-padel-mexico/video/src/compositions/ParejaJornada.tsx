import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/Archivo";
import { C } from "../theme";
import { Crest } from "../components/Crest";

const { fontFamily } = loadFont();

export type ParejaJornadaProps = { name: string; code: string; color: string; players: string; stat: string };

export const ParejaJornada: React.FC<ParejaJornadaProps> = ({ name, code, color, players, stat }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 12 } });
  const tagOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const op = interpolate(frame, [12, 24], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 80% at 50% 30%, ${color}22 0%, ${C.bg} 60%)`,
        fontFamily,
        color: C.ink,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ opacity: tagOp, fontWeight: 800, letterSpacing: 8, color: C.cyanLight, fontSize: 34, marginBottom: 60 }}>
        PAREJA DE LA JORNADA
      </div>
      <div style={{ transform: `scale(${pop})` }}>
        <Crest code={code} color={color} size={320} />
      </div>
      <div style={{ opacity: op, fontWeight: 900, fontSize: 88, marginTop: 40 }}>{name}</div>
      <div style={{ opacity: op, fontSize: 42, color: C.inkMuted, marginTop: 12 }}>{players}</div>
      <div style={{ opacity: op, marginTop: 30, fontWeight: 800, fontSize: 42, color }}>{stat}</div>
    </AbsoluteFill>
  );
};
