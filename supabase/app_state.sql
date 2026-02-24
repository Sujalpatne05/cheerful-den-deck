-- Run this in Supabase SQL editor

-- App state table (stores per-user JSON blobs like rm_rooms, rm_bookings, etc.)
create table if not exists public.app_state (
  user_id uuid not null references auth.users(id) on delete cascade,
  key text not null,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);

-- Keep updated_at current
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists app_state_set_updated_at on public.app_state;
create trigger app_state_set_updated_at
before update on public.app_state
for each row
execute function public.set_updated_at();

-- RLS
alter table public.app_state enable row level security;

drop policy if exists "app_state_read_own" on public.app_state;
create policy "app_state_read_own"
  on public.app_state
  for select
  using (auth.uid() = user_id);

drop policy if exists "app_state_write_own" on public.app_state;
create policy "app_state_write_own"
  on public.app_state
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "app_state_update_own" on public.app_state;
create policy "app_state_update_own"
  on public.app_state
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
