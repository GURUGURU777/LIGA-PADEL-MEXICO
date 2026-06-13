// =============================================================================
// Datos de demostración + cálculo de tabla y estadísticas (todo en memoria).
// Cuando conectes Supabase, estas funciones se reemplazan por consultas a la
// vista `standings` y a las tablas `matches` / `pairs`.
// =============================================================================

export const SEASON = {
  league: "Liga Pádel México",
  name: "Temporada Apertura 2026",
  category: "1ª Fuerza · Zona Única",
  club: "Club Pádel Tepic",
  totalRounds: 7,
  playedRounds: 5,
};

export interface Pair {
  id: string;
  name: string;
  player1: string;
  player2: string;
  strength: number; // 1 = más fuerte (solo para generar resultados demo)
}

export const PAIRS: Pair[] = [
  { id: "p1", name: "Los Halcones", player1: "Diego R.", player2: "Mateo L.", strength: 1 },
  { id: "p2", name: "Tiburones", player1: "Carlos M.", player2: "Emilio S.", strength: 2 },
  { id: "p3", name: "Power Pádel", player1: "Ángel V.", player2: "Sergio T.", strength: 3 },
  { id: "p4", name: "Las Panteras", player1: "Andrés G.", player2: "Luis F.", strength: 4 },
  { id: "p5", name: "Dúo Riviera", player1: "Pablo C.", player2: "Santiago D.", strength: 5 },
  { id: "p6", name: "Los Cracks", player1: "Rodrigo A.", player2: "Daniel P.", strength: 6 },
  { id: "p7", name: "Net Ninjas", player1: "Tomás H.", player2: "Bruno N.", strength: 7 },
  { id: "p8", name: "Smash Bros", player1: "Iván Q.", player2: "Hugo B.", strength: 8 },
];

export interface SetScore { home: number; away: number; }
export interface Match {
  id: string;
  round: number; // 1..7
  homeId: string;
  awayId: string;
  played: boolean;
  winnerId: string | null;
  sets: SetScore[];
}

export interface Standing {
  position: number;
  pair: Pair;
  pj: number; // jugados
  g: number; // ganados
  p: number; // perdidos
  gf: number; // games a favor
  gc: number; // games en contra
  dif: number; // diferencia
  pts: number; // puntos
}

// --- Round-robin (método del círculo) para 8 parejas → 7 jornadas ---
function buildFixtures(): Match[] {
  const ids = PAIRS.map((p) => p.id);
  const n = ids.length;
  const arr = [...ids];
  const matches: Match[] = [];
  let mid = 1;

  for (let r = 0; r < n - 1; r++) {
    for (let i = 0; i < n / 2; i++) {
      const homeId = arr[i];
      const awayId = arr[n - 1 - i];
      matches.push(makeMatch(`m${mid++}`, r + 1, homeId, awayId));
    }
    const fixed = arr[0];
    const rest = arr.slice(1);
    rest.unshift(rest.pop() as string);
    arr.splice(0, arr.length, fixed, ...rest);
  }
  return matches;
}

function strengthOf(id: string): number {
  return PAIRS.find((p) => p.id === id)!.strength;
}

// Genera un resultado determinista y plausible (el más fuerte gana casi siempre)
function makeMatch(id: string, round: number, homeId: string, awayId: string): Match {
  const played = round <= SEASON.playedRounds;
  if (!played) {
    return { id, round, homeId, awayId, played: false, winnerId: null, sets: [] };
  }

  const sh = strengthOf(homeId);
  const sa = strengthOf(awayId);
  const diff = Math.abs(sh - sa);
  const seed = (parseInt(homeId.slice(1)) + parseInt(awayId.slice(1)) + round) % 7;

  // Sorpresa ocasional: el más débil gana
  const upset = seed === 0 && diff <= 2;
  const strongerIsHome = sh < sa;
  let homeWins = strongerIsHome ? !upset : upset;

  // games del ganador vs perdedor por set
  let scoreline: [number, number][];
  if (diff >= 4) scoreline = [[6, 2], [6, 3]];
  else if (diff >= 2) scoreline = [[6, 3], [6, 4]];
  else scoreline = seed % 2 === 0 ? [[6, 4], [4, 6], [7, 5]] : [[7, 5], [6, 4]];

  const sets: SetScore[] = scoreline.map(([w, l]) =>
    homeWins ? { home: w, away: l } : { home: l, away: w }
  );

  return {
    id,
    round,
    homeId,
    awayId,
    played: true,
    winnerId: homeWins ? homeId : awayId,
    sets,
  };
}

export const MATCHES: Match[] = buildFixtures();

// --- Cálculos ---
export function getPair(id: string): Pair | undefined {
  return PAIRS.find((p) => p.id === id);
}

export function standings(): Standing[] {
  const acc: Record<string, Omit<Standing, "position" | "pair">> = {};
  PAIRS.forEach((p) => (acc[p.id] = { pj: 0, g: 0, p: 0, gf: 0, gc: 0, dif: 0, pts: 0 }));

  MATCHES.filter((m) => m.played).forEach((m) => {
    const hg = m.sets.reduce((s, x) => s + x.home, 0);
    const ag = m.sets.reduce((s, x) => s + x.away, 0);
    const h = acc[m.homeId];
    const a = acc[m.awayId];
    h.pj++; a.pj++;
    h.gf += hg; h.gc += ag;
    a.gf += ag; a.gc += hg;
    if (m.winnerId === m.homeId) { h.g++; a.p++; h.pts += 3; }
    else { a.g++; h.p++; a.pts += 3; }
  });

  return PAIRS.map((pair) => {
    const s = acc[pair.id];
    return { ...s, dif: s.gf - s.gc, pair, position: 0 };
  })
    .sort((x, y) => y.pts - x.pts || y.dif - x.dif || y.gf - x.gf)
    .map((row, i) => ({ ...row, position: i + 1 }));
}

export function standingFor(pairId: string): Standing | undefined {
  return standings().find((s) => s.pair.id === pairId);
}

export interface PairMatch {
  match: Match;
  opponent: Pair;
  result: "G" | "P" | null;
  scoreText: string;
  gamesFor: number;
  gamesAgainst: number;
}

export function matchesForPair(pairId: string): PairMatch[] {
  return MATCHES.filter((m) => m.homeId === pairId || m.awayId === pairId)
    .sort((a, b) => a.round - b.round)
    .map((m) => {
      const isHome = m.homeId === pairId;
      const opponent = getPair(isHome ? m.awayId : m.homeId)!;
      const gamesFor = m.sets.reduce((s, x) => s + (isHome ? x.home : x.away), 0);
      const gamesAgainst = m.sets.reduce((s, x) => s + (isHome ? x.away : x.home), 0);
      const scoreText = m.played
        ? m.sets.map((x) => (isHome ? `${x.home}-${x.away}` : `${x.away}-${x.home}`)).join("  ")
        : "—";
      const result: "G" | "P" | null = !m.played
        ? null
        : m.winnerId === pairId
        ? "G"
        : "P";
      return { match: m, opponent, result, scoreText, gamesFor, gamesAgainst };
    });
}

export function rounds(): { round: number; matches: Match[] }[] {
  const out: { round: number; matches: Match[] }[] = [];
  for (let r = 1; r <= SEASON.totalRounds; r++) {
    out.push({ round: r, matches: MATCHES.filter((m) => m.round === r) });
  }
  return out;
}

// --- Contexto del jugador conectado (demo) ---
export const ME_PAIR_ID = "p4";
export function myPair(): Pair { return getPair(ME_PAIR_ID)!; }
export function myNextMatch(): Match | null {
  return (
    MATCHES.filter((m) => (m.homeId === ME_PAIR_ID || m.awayId === ME_PAIR_ID) && !m.played)
      .sort((a, b) => a.round - b.round)[0] ?? null
  );
}
export function myRecentForm(): PairMatch[] {
  return matchesForPair(ME_PAIR_ID).filter((g) => g.result).slice(-5);
}
