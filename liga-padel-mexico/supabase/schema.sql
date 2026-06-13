-- =============================================================================
-- LIGA PÁDEL MÉXICO — Esquema de datos (Postgres / Supabase)
-- =============================================================================
-- Diseño multi-club desde el día 1. Pensado para alimentar el motor de
-- programación greedy y soportar los 3 roles: jugador, organizador/admin
-- (la operadora) y club/sede (modelo de licencia).
--
-- Convención: nombres de tablas/columnas en inglés, comentarios en español.
-- Toda hora se guarda en UTC; la zona local se resuelve en la app.
-- =============================================================================

-- ----------------------------------------------------------------------------
-- 0. Extensiones
-- ----------------------------------------------------------------------------
create extension if not exists "pgcrypto";   -- gen_random_uuid()
create extension if not exists "btree_gist";  -- restricciones de no-solapamiento


-- ----------------------------------------------------------------------------
-- 1. Tipos (enums)
-- ----------------------------------------------------------------------------
create type user_role        as enum ('player', 'admin', 'club_admin');
create type license_model    as enum ('percentage', 'fixed_fee', 'direct');  -- 'direct' = club propio (piloto Tepic)
create type season_status    as enum ('draft', 'registration', 'active', 'finished', 'cancelled');
create type registration_status as enum ('pending_payment', 'paid', 'cancelled');
create type match_status      as enum ('pending_schedule', 'scheduled', 'played', 'walkover', 'cancelled');
create type result_status     as enum ('reported', 'confirmed', 'disputed');
create type payment_provider  as enum ('mercadopago', 'conekta', 'stripe', 'cash');
create type payment_method    as enum ('oxxo', 'spei', 'card', 'cash');
create type payment_status    as enum ('pending', 'paid', 'failed', 'refunded');
create type sanction_type     as enum ('walkover', 'warning', 'points_deduction', 'no_show');


-- ----------------------------------------------------------------------------
-- 2. Identidad y clubes
-- ----------------------------------------------------------------------------

-- Extiende auth.users de Supabase. El id es el mismo uid de auth.
create table profiles (
    id          uuid primary key references auth.users(id) on delete cascade,
    full_name   text not null,
    phone       text,                       -- para WhatsApp / SPEI
    role        user_role not null default 'player',
    avatar_url  text,
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now()
);

create table clubs (
    id              uuid primary key default gen_random_uuid(),
    name            text not null,
    city            text not null,
    state           text not null,
    contact_name    text,
    contact_phone   text,
    license_model   license_model not null default 'direct',
    license_value   numeric(12,2),          -- % (ej. 25) o fee fijo MXN según license_model
    is_active       boolean not null default true,
    created_at      timestamptz not null default now(),
    updated_at      timestamptz not null default now()
);

-- Vincula a un admin de club con su club (un club_admin gestiona un club).
create table club_admins (
    club_id     uuid not null references clubs(id) on delete cascade,
    profile_id  uuid not null references profiles(id) on delete cascade,
    primary key (club_id, profile_id)
);

create table courts (
    id          uuid primary key default gen_random_uuid(),
    club_id     uuid not null references clubs(id) on delete cascade,
    name        text not null,              -- "Cancha 1", "Central"...
    is_active   boolean not null default true,
    created_at  timestamptz not null default now()
);


-- ----------------------------------------------------------------------------
-- 3. Catálogo de categorías (global, reutilizable entre temporadas y clubes)
-- ----------------------------------------------------------------------------
create table categories (
    id          uuid primary key default gen_random_uuid(),
    name        text not null unique,       -- "1ª", "2ª", "3ª", "4ª", "Mixta"...
    sort_order  smallint not null default 0 -- menor = mayor nivel
);


-- ----------------------------------------------------------------------------
-- 4. Temporadas, zonas y jornadas
-- ----------------------------------------------------------------------------
create table seasons (
    id              uuid primary key default gen_random_uuid(),
    club_id         uuid not null references clubs(id) on delete cascade,
    name            text not null,          -- "Tepic T1 2026"
    status          season_status not null default 'draft',
    starts_on       date,
    ends_on         date,
    registration_fee numeric(10,2) not null default 700,  -- MXN por jugador
    -- Reglas de puntuación de la liga (configurables por temporada)
    points_win              smallint not null default 3,
    points_loss             smallint not null default 0,
    points_walkover_winner  smallint not null default 3,
    points_walkover_loser   smallint not null default -1,
    created_at      timestamptz not null default now(),
    updated_at      timestamptz not null default now()
);

-- Una zona es un grupo dentro de una categoría para una temporada
-- (ej. "1ª – Zona A"). Las parejas compiten dentro de su zona.
create table zones (
    id          uuid primary key default gen_random_uuid(),
    season_id   uuid not null references seasons(id) on delete cascade,
    category_id uuid not null references categories(id),
    name        text not null,              -- "Zona A"
    created_at  timestamptz not null default now(),
    unique (season_id, category_id, name)
);

-- Cada jornada/fecha de la temporada. El motor asigna partidos a jornadas.
create table rounds (
    id            uuid primary key default gen_random_uuid(),
    season_id     uuid not null references seasons(id) on delete cascade,
    round_number  smallint not null,
    starts_on     date not null,            -- inicio de la ventana de juego
    ends_on       date not null,            -- fin de la ventana de juego
    created_at    timestamptz not null default now(),
    unique (season_id, round_number),
    check (ends_on >= starts_on)
);


-- ----------------------------------------------------------------------------
-- 5. Parejas e inscripciones
-- ----------------------------------------------------------------------------
-- La pareja es por temporada (entre temporadas la composición puede cambiar).
create table pairs (
    id          uuid primary key default gen_random_uuid(),
    season_id   uuid not null references seasons(id) on delete cascade,
    zone_id     uuid references zones(id) on delete set null,  -- null hasta el sorteo
    category_id uuid not null references categories(id),
    team_name   text,
    player1_id  uuid not null references profiles(id),
    player2_id  uuid not null references profiles(id),
    is_active   boolean not null default true,
    created_at  timestamptz not null default now(),
    check (player1_id <> player2_id)
);

-- La inscripción y el COBRO son por jugador individual (no por pareja),
-- tal como define el plan ("cuota individual por jugador").
create table season_registrations (
    id          uuid primary key default gen_random_uuid(),
    season_id   uuid not null references seasons(id) on delete cascade,
    player_id   uuid not null references profiles(id),
    pair_id     uuid references pairs(id) on delete set null,
    status      registration_status not null default 'pending_payment',
    created_at  timestamptz not null default now(),
    unique (season_id, player_id)           -- un jugador, una inscripción por temporada
);

-- Sustituciones puntuales ("Excepción" mensual): un suplente juega un partido
-- concreto en lugar de un titular, sin romper el historial de la pareja.
create table pair_substitutions (
    id              uuid primary key default gen_random_uuid(),
    pair_id         uuid not null references pairs(id) on delete cascade,
    match_id        uuid,                   -- FK añadida tras crear matches (ver abajo)
    replaced_player uuid not null references profiles(id),
    substitute_player uuid not null references profiles(id),
    created_at      timestamptz not null default now()
);


-- ----------------------------------------------------------------------------
-- 6. Disponibilidad horaria  (la pantalla más importante del MVP)
-- ----------------------------------------------------------------------------
-- Plantilla semanal recurrente de la pareja. El motor la expande a fechas
-- concretas dentro de cada jornada e intersecta con la disponibilidad de cancha.
-- weekday: 0 = domingo ... 6 = sábado (compatibles con EXTRACT(dow)).
create table pair_availability (
    id          uuid primary key default gen_random_uuid(),
    pair_id     uuid not null references pairs(id) on delete cascade,
    weekday     smallint not null check (weekday between 0 and 6),
    start_time  time not null,
    end_time    time not null,
    created_at  timestamptz not null default now(),
    check (end_time > start_time)
);

-- Excepción por jornada (no puedo el día que normalmente sí / sí puedo un día extra).
create table pair_availability_override (
    id          uuid primary key default gen_random_uuid(),
    pair_id     uuid not null references pairs(id) on delete cascade,
    round_id    uuid not null references rounds(id) on delete cascade,
    play_date   date not null,
    start_time  time not null,
    end_time    time not null,
    is_blackout boolean not null default false,  -- true = NO disponible esa franja
    check (end_time > start_time)
);

-- Franjas que el club libera para la liga (horas valle). El motor solo programa aquí.
create table court_availability (
    id          uuid primary key default gen_random_uuid(),
    court_id    uuid not null references courts(id) on delete cascade,
    weekday     smallint not null check (weekday between 0 and 6),
    start_time  time not null,
    end_time    time not null,
    check (end_time > start_time)
);


-- ----------------------------------------------------------------------------
-- 7. Partidos y resultados
-- ----------------------------------------------------------------------------
create table matches (
    id              uuid primary key default gen_random_uuid(),
    season_id       uuid not null references seasons(id) on delete cascade,
    round_id        uuid not null references rounds(id) on delete cascade,
    zone_id         uuid not null references zones(id) on delete cascade,
    pair_home_id    uuid not null references pairs(id),
    pair_away_id    uuid not null references pairs(id),
    court_id        uuid references courts(id) on delete set null,
    scheduled_at    timestamptz,            -- null = aún sin agendar (motor pendiente)
    status          match_status not null default 'pending_schedule',
    created_at      timestamptz not null default now(),
    updated_at      timestamptz not null default now(),
    check (pair_home_id <> pair_away_id)
);

-- Evita doble reserva: una cancha no puede tener dos partidos solapados.
-- (Asumiendo 90 min/partido; se valida desde la app o con un trigger.)
create index on matches (court_id, scheduled_at);
create index on matches (season_id, round_id);
create index on matches (zone_id);

-- FK diferida de la sustitución hacia el partido
alter table pair_substitutions
    add constraint fk_substitution_match
    foreign key (match_id) references matches(id) on delete cascade;

create table match_results (
    match_id        uuid primary key references matches(id) on delete cascade,
    winner_pair_id  uuid references pairs(id),
    reported_by     uuid references profiles(id),
    confirmed_by    uuid references profiles(id),   -- doble confirmación
    status          result_status not null default 'reported',
    reported_at     timestamptz not null default now(),
    confirmed_at    timestamptz
);

create table match_sets (
    id          uuid primary key default gen_random_uuid(),
    match_id    uuid not null references matches(id) on delete cascade,
    set_number  smallint not null,
    home_games  smallint not null,
    away_games  smallint not null,
    unique (match_id, set_number)
);


-- ----------------------------------------------------------------------------
-- 8. Sanciones (afectan la tabla) y pagos
-- ----------------------------------------------------------------------------
create table sanctions (
    id          uuid primary key default gen_random_uuid(),
    season_id   uuid not null references seasons(id) on delete cascade,
    pair_id     uuid not null references pairs(id) on delete cascade,
    type        sanction_type not null,
    points      smallint not null default 0,  -- delta de puntos (puede ser negativo)
    reason      text,
    applied_by  uuid references profiles(id),
    created_at  timestamptz not null default now()
);

create table payments (
    id              uuid primary key default gen_random_uuid(),
    registration_id uuid not null references season_registrations(id) on delete cascade,
    amount          numeric(10,2) not null,
    provider        payment_provider not null,
    method          payment_method,
    provider_ref    text,                   -- id de la orden en Mercado Pago/Conekta
    status          payment_status not null default 'pending',
    paid_at         timestamptz,
    created_at      timestamptz not null default now()
);

create index on payments (registration_id);
create index on payments (provider_ref);


-- ----------------------------------------------------------------------------
-- 9. updated_at automático
-- ----------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
    new.updated_at = now();
    return new;
end; $$;

create trigger trg_profiles_updated  before update on profiles
    for each row execute function set_updated_at();
create trigger trg_clubs_updated     before update on clubs
    for each row execute function set_updated_at();
create trigger trg_seasons_updated   before update on seasons
    for each row execute function set_updated_at();
create trigger trg_matches_updated   before update on matches
    for each row execute function set_updated_at();


-- ----------------------------------------------------------------------------
-- 10. Vista de tabla de posiciones (ranking en vivo, por zona)
-- ----------------------------------------------------------------------------
-- Calcula puntos a partir de resultados confirmados + sanciones.
create or replace view standings as
with played as (
    select
        m.zone_id,
        p.id as pair_id,
        case
            when m.status = 'played'   and mr.winner_pair_id = p.id then s.points_win
            when m.status = 'played'   and mr.winner_pair_id <> p.id then s.points_loss
            when m.status = 'walkover' and mr.winner_pair_id = p.id then s.points_walkover_winner
            when m.status = 'walkover' and mr.winner_pair_id <> p.id then s.points_walkover_loser
            else 0
        end as pts,
        case when mr.winner_pair_id = p.id then 1 else 0 end as win,
        case when mr.winner_pair_id <> p.id and mr.winner_pair_id is not null then 1 else 0 end as loss
    from matches m
    join seasons s on s.id = m.season_id
    join match_results mr on mr.match_id = m.id and mr.status = 'confirmed'
    join pairs p on p.id in (m.pair_home_id, m.pair_away_id)
)
select
    z.id   as zone_id,
    z.name as zone_name,
    pr.id  as pair_id,
    pr.team_name,
    coalesce(sum(pl.pts), 0)
        + coalesce((select sum(sn.points) from sanctions sn where sn.pair_id = pr.id), 0) as points,
    coalesce(sum(pl.win), 0)  as wins,
    coalesce(sum(pl.loss), 0) as losses,
    count(pl.pair_id)         as played
from pairs pr
join zones z on z.id = pr.zone_id
left join played pl on pl.pair_id = pr.id and pl.zone_id = z.id
group by z.id, z.name, pr.id, pr.team_name
order by z.name, points desc, wins desc;


-- ----------------------------------------------------------------------------
-- 11. Seguridad a nivel de fila (RLS) — Supabase
-- ----------------------------------------------------------------------------
-- Helpers
create or replace function is_admin()
returns boolean language sql security definer stable as $$
    select exists (select 1 from profiles where id = auth.uid() and role = 'admin');
$$;

create or replace function manages_club(target_club uuid)
returns boolean language sql security definer stable as $$
    select exists (
        select 1 from club_admins ca where ca.profile_id = auth.uid() and ca.club_id = target_club
    );
$$;

-- Activar RLS
alter table profiles               enable row level security;
alter table clubs                  enable row level security;
alter table seasons                enable row level security;
alter table pairs                  enable row level security;
alter table pair_availability      enable row level security;
alter table matches                enable row level security;
alter table match_results          enable row level security;
alter table payments               enable row level security;
alter table season_registrations   enable row level security;

-- Ejemplos de políticas representativas (afinar el resto siguiendo este patrón):

-- Perfiles: cada quien ve/edita el suyo; el admin todo.
create policy profiles_self  on profiles for select using (id = auth.uid() or is_admin());
create policy profiles_update on profiles for update using (id = auth.uid());

-- Standings y datos de liga: lectura pública para usuarios autenticados.
create policy seasons_read on seasons for select using (true);
create policy matches_read on matches for select using (true);

-- Disponibilidad: solo los miembros de la pareja la editan; el admin la ve toda.
create policy availability_owner on pair_availability for all using (
    is_admin()
    or exists (
        select 1 from pairs p
        where p.id = pair_availability.pair_id
          and auth.uid() in (p.player1_id, p.player2_id)
    )
);

-- Resultados: reporta/confirma quien juega; el admin resuelve disputas.
create policy results_participants on match_results for all using (
    is_admin()
    or exists (
        select 1 from matches m
        join pairs ph on ph.id = m.pair_home_id
        join pairs pa on pa.id = m.pair_away_id
        where m.id = match_results.match_id
          and auth.uid() in (ph.player1_id, ph.player2_id, pa.player1_id, pa.player2_id)
    )
);

-- Pagos: el jugador ve los suyos; el admin todos.
create policy payments_owner on payments for select using (
    is_admin()
    or exists (
        select 1 from season_registrations r
        where r.id = payments.registration_id and r.player_id = auth.uid()
    )
);

-- Clubes: el admin gestiona todo; el club_admin solo el suyo.
create policy clubs_admin on clubs for all using (is_admin() or manages_club(id));

-- =============================================================================
-- Fin del esquema base. Siguiente pieza: el motor de programación greedy,
-- que lee pair_availability + court_availability y escribe en matches.
-- =============================================================================
