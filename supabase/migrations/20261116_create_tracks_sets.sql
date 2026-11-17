-- Applied to Supabase project "gecis" (eu-central-1) on 2026-11-16. Project is paused.
-- Superseded plan: redesign per docs/ARCHITECTURE.md (beat grid, attempts, skills) before reactivating.

create table public.tracks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title text not null check (char_length(title) between 1 and 120),
  artist text not null default '' check (char_length(artist) <= 120),
  bpm numeric(5,1) not null check (bpm between 40 and 220),
  camelot_key text check (camelot_key ~ '^(1[0-2]|[1-9])[AB]$'),
  energy smallint not null default 5 check (energy between 1 and 10),
  duration_sec integer not null default 0 check (duration_sec >= 0),
  created_at timestamptz not null default now()
);

create table public.sets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 120),
  target_date date,
  created_at timestamptz not null default now()
);

create table public.set_tracks (
  set_id uuid not null references public.sets (id) on delete cascade,
  track_id uuid not null references public.tracks (id) on delete cascade,
  position integer not null check (position >= 0),
  primary key (set_id, track_id)
);

create index tracks_user_id_idx on public.tracks (user_id);
create index sets_user_id_idx on public.sets (user_id);
create index set_tracks_track_id_idx on public.set_tracks (track_id);

alter table public.tracks enable row level security;
alter table public.sets enable row level security;
alter table public.set_tracks enable row level security;

create policy "own tracks" on public.tracks
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "own sets" on public.sets
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "own set tracks" on public.set_tracks
  for all to authenticated
  using (exists (select 1 from public.sets s where s.id = set_id and s.user_id = (select auth.uid())))
  with check (
    exists (select 1 from public.sets s where s.id = set_id and s.user_id = (select auth.uid()))
    and exists (select 1 from public.tracks t where t.id = track_id and t.user_id = (select auth.uid()))
  );
