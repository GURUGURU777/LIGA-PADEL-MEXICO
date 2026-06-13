import { redirect } from "next/navigation";

// La pantalla principal es la de horarios (la más importante del producto).
export default function Home() {
  redirect("/disponibilidad");
}
