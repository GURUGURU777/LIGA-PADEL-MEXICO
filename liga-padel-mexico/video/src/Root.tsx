import React from "react";
import { Composition } from "remotion";
import { Resultado } from "./compositions/Resultado";
import { StandingsReveal } from "./compositions/StandingsReveal";
import { ParejaJornada } from "./compositions/ParejaJornada";
import { Recap } from "./compositions/Recap";
import { sampleResult, sampleStandings, samplePOTW } from "./data";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Resultado" component={Resultado} durationInFrames={150} fps={30} width={1080} height={1920} defaultProps={sampleResult} />
    <Composition id="StandingsReveal" component={StandingsReveal} durationInFrames={180} fps={30} width={1080} height={1920} defaultProps={{ rows: sampleStandings, title: "CLASIFICACIÓN" }} />
    <Composition id="ParejaJornada" component={ParejaJornada} durationInFrames={120} fps={30} width={1080} height={1920} defaultProps={samplePOTW} />
    <Composition id="Recap" component={Recap} durationInFrames={240} fps={30} width={1080} height={1920} defaultProps={{ season: "APERTURA 2026", partidos: 28, pos: 4, pairName: "Las Panteras" }} />
  </>
);
