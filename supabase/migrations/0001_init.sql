-- SS Tour & Travels - initial Supabase schema
-- Run with: supabase db push, or paste into the Supabase SQL editor.
--
-- Privacy notes:
--  * visitors/page_views hold only anonymous, random visitor IDs - no PII.
--  * rl_key is a salted daily hash used only for rate limiting (not an IP).
--  * enquiries contains the contact details customers submit themselves.
--  * Row Level Security is enabled on every table; the public anon role gets
--    NO direct access. All reads/writes go through the site's API routes,
--    which use the service-role key server-side only.

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 3 and 80),
  mobile text not null check (mobile ~ '^[6-9][0-9]{9}$'),
  travel_type text not null,
  destination text not null,
  pickup_location text not null,
  travel_date date not null,
  passengers integer not null check (passengers between 1 and 200),
  requirements text,
  created_at timestamptz not null default now()
);

create table if not exists public.visitors (
  id uuid primary key,               -- anonymous random id minted in the browser
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

create table if not exists public.page_views (
  id bigint generated always as identity primary key,
  visitor_id uuid not null references public.visitors (id) on delete cascade,
  path text not null check (char_length(path) <= 200),
  rl_key text not null,              -- salted daily rate-limit hash, not an IP
  created_at timestamptz not null default now()
);

create index if not exists page_views_created_at_idx on public.page_views (created_at);
create index if not exists page_views_rl_key_idx on public.page_views (rl_key, created_at);
create index if not exists page_views_visitor_idx on public.page_views (visitor_id, created_at);

alter table public.enquiries enable row level security;
alter table public.visitors enable row level security;
alter table public.page_views enable row level security;

-- No anon/authenticated policies are created on purpose:
-- only the service role (server API routes) can read or write these tables.

-- Optional housekeeping: delete raw page views older than 180 days.
-- Aggregate counts live in visitors/page_views counts themselves, so schedule
-- this with pg_cron if desired:
--   select cron.schedule('0 3 * * *', $$delete from public.page_views where created_at < now() - interval '180 days'$$);
