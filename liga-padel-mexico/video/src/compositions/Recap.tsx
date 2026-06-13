import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/Archivo";
import { C } from "../theme";

const { fontFamily } = loadFont();

const Scene: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [0, 12, 48, 60], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: op, padding: 60, textAlign: "center" }}>{children}</AbsoluteFill>;
};

export type RecapProps = { season: string; partidos: number; pos: number; pairName: string };

export const Recap: React.FC<RecapProps> = ({ season, partidos, pos, pairName }) => {
  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily, color: C.ink }}>
      <Sequence durationInFrames={60}>
        <Scene>
          <div style={{ fontWeight: 900, fontSize: 96 }}>{season}</div>
          <div style={{ fontSize: 42, color: C.inkMuted, marginTop: 20 }}>Tu temporada en números</div>
        </Scene>
      </Sequence>
      <Sequence from={60} durationInFrames={60}>
        <Scene>
          <div style={{ fontWeight: 900, fontSize: 220, color: C.cyan, lineHeight: 1 }}>{partidos}</div>
          <div style={{ fontSize: 50, marginTop: 10 }}>partidos jugados</div>
        </Scene>
      </Sequence>
      <Sequence from={120} durationInFrames={60}>
        <Scene>
          <div style={{ fontSize: 50, color: C.inkMuted }}>{pairName} terminó</div>
          <div style={{ fontWeight: 900, fontSize: 220, color: C.cyanLight, lineHeight: 1 }}>#{pos}</div>
        </Scene>
      </Sequence>
      <Sequence from={180} durationInFrames={60}>
        <Scene>
          <div style={{ fontWeight: 900, fontSize: 84, lineHeight: 1.05 }}>NOS VEMOS<br />LA PRÓXIMA</div>
        </Scene>
      </Sequence>
    </AbsoluteFill>
  );
};
