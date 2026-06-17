-- Lago's Ice Cream — Supabase schema
-- Run this once in the Supabase SQL Editor (Dashboard → SQL → New query → Run).
-- All access is server-side via the service-role key, so RLS stays ON with no
-- public policies: the browser can never read or write these tables directly.

-- ── Catering / event requests ───────────────────────────────────────────────
create table if not exists public.catering_requests (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null,
  phone        text,
  email        text,
  event_type   text,
  event_date   date,
  event_size   text,
  half_gallons text,
  notes        text,
  status       text not null default 'New'
    check (status in ('New','Contacted','Booked','Completed'))
);

-- ── Job applications ─────────────────────────────────────────────────────────
create table if not exists public.job_applications (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  first_name        text not null,
  last_name         text not null,
  email             text,
  phone             text,
  address           text,
  age               text,
  position          text not null,
  employment_type   text,
  start_date        date,
  days_available    text,
  hours_available   text,
  previous_employer text,
  experience        text,
  customer_service  text,
  why_lagos         text,
  good_fit          text,
  resume_filename   text,
  status            text not null default 'New'
    check (status in ('New','Interviewing','Hired','Rejected'))
);

-- ── General contact messages ─────────────────────────────────────────────────
create table if not exists public.contact_requests (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null,
  email      text,
  message    text,
  status     text not null default 'New'
    check (status in ('New','Contacted','Completed'))
);

-- ── Flavor back-in-stock alert signups ──────────────────────────────────────
create table if not exists public.flavor_alert_signups (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text,
  contact    text not null,
  flavor     text,
  status     text not null default 'Active'
    check (status in ('Active','Notified','Unsubscribed'))
);

-- ── "Scooping Today" flavor board (single shared row) ───────────────────────
-- Powers the homepage board + the /admin "Flavor Board" tab. One row (id =
-- 'today') holds the list of flavor ids the owner has toggled on.
create table if not exists public.flavor_board (
  id         text primary key,
  flavors    jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.flavor_board enable row level security;

-- Indexes for the dashboard's default newest-first ordering.
create index if not exists catering_requests_created_idx    on public.catering_requests (created_at desc);
create index if not exists job_applications_created_idx      on public.job_applications (created_at desc);
create index if not exists contact_requests_created_idx      on public.contact_requests (created_at desc);
create index if not exists flavor_alert_signups_created_idx  on public.flavor_alert_signups (created_at desc);

-- Keep RLS enabled; no public policies (service-role bypasses RLS server-side).
alter table public.catering_requests    enable row level security;
alter table public.job_applications     enable row level security;
alter table public.contact_requests     enable row level security;
alter table public.flavor_alert_signups enable row level security;
