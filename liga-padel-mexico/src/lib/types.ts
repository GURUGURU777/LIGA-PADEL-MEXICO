// Tipos TypeScript que reflejan el esquema de Supabase (supabase/schema.sql).
// Cuando conectes tu base real, puedes regenerarlos con:
//   npx supabase gen types typescript --project-id TU_ID > src/lib/database.types.ts

export type UserRole = "player" | "admin" | "club_admin";
export type MatchStatus =
  | "pending_schedule"
  | "scheduled"
  | "played"
  | "walkover"
  | "cancelled";

export interface AvailabilitySlot {
  weekday: number; // 0 = domingo ... 6 = sábado
  start: string; // "19:00"
  end: string; // "21:00"
  selected: boolean;
}

export interface Match {
  id: string;
  roundNumber: number;
  rivalName: string;
  scheduledAt: string | null; // ISO
  courtName: string | null;
  status: MatchStatus;
}

export interface StandingRow {
  position: number;
  pairId: string;
  teamName: string;
  played: number;
  points: number;
  isMe?: boolean;
}
