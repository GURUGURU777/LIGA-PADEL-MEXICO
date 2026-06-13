# Liga Pádel México 

App de la liga de pádel por temporada: coordinación de horarios, partidos y
ranking en vivo. Stack: **Next.js 14 (App Router) + Supabase + Tailwind**.
Instalable como **PWA** (sin tiendas de apps). Identidad visual: *azul nocturno*.

## Estructura

```
src/
  app/
    disponibilidad/   Carga de horarios (la pantalla más importante)
    partidos/         Confirmar horario + subir resultado
    tabla/            Ranking en vivo (lee la vista `standings`)
    login/            Acceso con magic link de Supabase
    layout.tsx        Shell móvil con barra superior + navegación inferior
  components/         TopBar, BottomNav
  lib/
    supabase/         Clientes (navegador y servidor)
    types.ts          Tipos del esquema
supabase/
  schema.sql          Esquema completo de la base de datos
  seed.sql            Datos mínimos de ejemplo
```

## Puesta en marcha (local)

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Crea un proyecto en https://supabase.com y, en su editor SQL, ejecuta
   primero `supabase/schema.sql` y luego (opcional) `supabase/seed.sql`.
3. Copia las claves: `cp .env.example .env.local` y rellena
   `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   (Supabase → Settings → API).
4. Arranca:
   ```bash
   npm run dev
   ```
   Abre http://localhost:3000

> La app corre aun sin Supabase configurado: la tabla usa datos de ejemplo
> hasta que conectes tu base.

## Despliegue (producción)

| Servicio        | Para qué                | Plan       | Costo aprox. |
|-----------------|-------------------------|------------|--------------|
| Vercel Pro      | App (Next.js)           | Pro        | ~$20 USD/mes |
| Supabase Pro    | Datos, auth, storage    | Pro        | ~$25 USD/mes |
| n8n self-hosted | Automatización (cron)   | Community  | ~$5 USD/mes  |
| Dominio         | Marca                   | —          | ~$1 USD/mes  |

Pasos:
1. Sube el repo a GitHub e impórtalo en Vercel.
2. En Vercel → Settings → Environment Variables, agrega las dos claves
   `NEXT_PUBLIC_SUPABASE_*`. Cada push a `main` se despliega solo.
3. n8n corre aparte en un VPS para el cron de los miércoles (programación de
   partidos) y los recordatorios por WhatsApp/push.

## Pendientes (siguientes piezas)

- [ ] Motor de programación greedy (lee `pair_availability` + `court_availability`,
      escribe en `matches`). Se dispara los miércoles vía n8n.
- [ ] Flujo de pagos (Mercado Pago / Conekta: OXXO, SPEI, tarjeta) y bloqueo
      de no-pagados antes de la Fecha 1.
- [ ] Panel de admin (crear liga → categorías → zonas, sanciones, walkover).
- [ ] Notificaciones push (Web Push / FCM).
- [ ] Iconos de la PWA (`public/icon-192.png`, `icon-512.png`).
