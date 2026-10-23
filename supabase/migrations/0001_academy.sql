-- Ink & Equity Academy: learner records.
-- Course content (modules, lessons, questions) lives in the repository, not here.
-- Rule of thumb: learners can READ their own rows. Anything that decides access or a
-- certificate (enrolments, orders, graded attempts, certificates) is WRITTEN only by the
-- server with the service-role key, so it cannot be forged from the browser.

-- ---------------------------------------------------------------- profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text not null default '',
  phone text,
  city text,
  practice_stage text check (practice_stage in ('student', 'enrolled_0_2', 'enrolled_3_5', 'other')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, lower(new.email), coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end $$;

create unique index if not exists profiles_email_idx on public.profiles (email);

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------- orders and enrolments
create table if not exists public.orders (
  id text primary key,                       -- Razorpay order id
  user_id uuid not null references auth.users (id) on delete cascade,
  amount_paise integer not null check (amount_paise > 0),
  currency text not null default 'INR',
  status text not null default 'created' check (status in ('created', 'paid', 'failed')),
  payment_id text unique,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);
create index if not exists orders_user_idx on public.orders (user_id);

create table if not exists public.enrollments (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  source text not null check (source in ('razorpay', 'manual')),
  order_id text references public.orders (id),
  note text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------- progress
create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_key text not null,                  -- "module-slug/lesson-slug"
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_key)
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  module_slug text not null,
  score integer not null,
  total integer not null,
  passed boolean not null,
  answers jsonb not null,
  created_at timestamptz not null default now()
);
create index if not exists quiz_attempts_user_idx on public.quiz_attempts (user_id, module_slug);

create table if not exists public.exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  question_ids text[] not null,
  started_at timestamptz not null default now(),
  deadline timestamptz not null,
  submitted_at timestamptz,
  score integer,
  total integer,
  passed boolean,
  answers jsonb
);
create index if not exists exam_attempts_user_idx on public.exam_attempts (user_id);
-- At most one open attempt per learner.
create unique index if not exists exam_attempts_one_open on public.exam_attempts (user_id) where submitted_at is null;

-- ---------------------------------------------------------------- certificates
create table if not exists public.certificates (
  code text primary key,                     -- e.g. IEQA-2026-7KQ4-M2XD
  user_id uuid not null unique references auth.users (id) on delete cascade,
  full_name text not null,
  exam_attempt_id uuid not null references public.exam_attempts (id),
  score integer not null,
  total integer not null,
  issued_at timestamptz not null default now(),
  revoked_at timestamptz,
  revoke_reason text
);

-- The name on a certificate is fixed at issue. Stop the profile name changing afterwards,
-- so the dashboard never disagrees with the certificate.
create or replace function public.lock_name_after_certificate()
returns trigger language plpgsql as $$
begin
  if new.full_name is distinct from old.full_name
     and exists (select 1 from public.certificates c where c.user_id = old.id and c.revoked_at is null) then
    raise exception 'The name is fixed after a certificate is issued. Write to the Academy to correct it.';
  end if;
  new.email := old.email;          -- the sign-in email is copied from auth.users, not edited here
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists profiles_lock_name on public.profiles;
create trigger profiles_lock_name before update on public.profiles
  for each row execute function public.lock_name_after_certificate();

-- Public verification: returns only what a verifier needs, never the user id or score detail.
create or replace function public.verify_certificate(p_code text)
returns table (code text, full_name text, issued_at timestamptz, revoked boolean)
language sql stable security definer set search_path = public as $$
  select c.code, c.full_name, c.issued_at, c.revoked_at is not null
  from public.certificates c
  where c.code = upper(trim(p_code));
$$;
revoke all on function public.verify_certificate(text) from public;
grant execute on function public.verify_certificate(text) to anon, authenticated;

-- ---------------------------------------------------------------- row-level security
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.exam_attempts enable row level security;
alter table public.certificates enable row level security;

create policy "own profile: read" on public.profiles for select using (auth.uid() = id);
create policy "own profile: update" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "own orders: read" on public.orders for select using (auth.uid() = user_id);
create policy "own enrolment: read" on public.enrollments for select using (auth.uid() = user_id);

create policy "own progress: read" on public.lesson_progress for select using (auth.uid() = user_id);
create policy "own progress: add" on public.lesson_progress for insert with check (auth.uid() = user_id);
create policy "own progress: remove" on public.lesson_progress for delete using (auth.uid() = user_id);

create policy "own quiz attempts: read" on public.quiz_attempts for select using (auth.uid() = user_id);
create policy "own exam attempts: read" on public.exam_attempts for select using (auth.uid() = user_id);
create policy "own certificate: read" on public.certificates for select using (auth.uid() = user_id);

-- No insert/update/delete policies on orders, enrollments, quiz_attempts, exam_attempts or
-- certificates: only the service role (which bypasses RLS) writes them.
