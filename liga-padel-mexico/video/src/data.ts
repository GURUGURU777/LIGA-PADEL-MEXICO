import type { ResultadoProps } from "./compositions/Resultado";
import type { Row } from "./compositions/StandingsReveal";
import type { ParejaJornadaProps } from "./compositions/ParejaJornada";

export const sampleResult: ResultadoProps = {
  jornada: 5,
  sponsor: "OXXO",
  home: { name: "Las Panteras", code: "PAN", color: "#D4537E" },
  away: { name: "Los Cracks", code: "CRK", color: "#97C459" },
  scoreHome: 2,
  scoreAway: 1,
  detail: "6-4 · 4-6 · 6-3",
};

export const sampleStandings: Row[] = [
  { pos: 1, name: "Los Halcones", code: "LHA", color: "#EFA127", pts: 15 },
  { pos: 2, name: "Tiburones", code: "TIB", color: "#3B8EE0", pts: 15 },
  { pos: 3, name: "Power Pádel", code: "PWR", color: "#7F77DD", pts: 12 },
  { pos: 4, name: "Las Panteras", code: "PAN", color: "#D4537E", pts: 6 },
  { pos: 5, name: "Los Cracks", code: "CRK", color: "#97C459", pts: 6 },
  { pos: 6, name: "Dúo Riviera", code: "RIV", color: "#1D9E75", pts: 3 },
  { pos: 7, name: "Net Ninjas", code: "NIN", color: "#8FB0D6", pts: 3 },
  { pos: 8, name: "Smash Bros", code: "SMB", color: "#E2574C", pts: 0 },
];

export const samplePOTW: ParejaJornadaProps = {
  name: "Los Halcones",
  code: "LHA",
  color: "#EFA127",
  players: "Diego R. · Mateo L.",
  stat: "5-0 · invictos",
};
