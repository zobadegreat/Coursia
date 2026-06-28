-- ── COURSIA DATABASE SCHEMA ──────────────────────────────────
-- Run this entire file in Supabase SQL Editor

-- 1. USERS TABLE (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  name text not null,
  email text not null,
  streak integer default 1,
  total_lessons integer default 0,
  created_at timestamp with time zone default now()
);

-- 2. PAYMENTS TABLE
create table if not exists public.payments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  course_id text not null,
  amount integer not null default 100000,
  currency text default 'NGN',
  paystack_ref text unique not null,
  status text default 'pending',
  created_at timestamp with time zone default now()
);

-- 3. COURSE ACCESS TABLE (unlocked courses per user)
create table if not exists public.course_access (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  course_id text not null,
  payment_id uuid references public.payments(id),
  unlocked_at timestamp with time zone default now(),
  unique(user_id, course_id)
);

-- 4. PROGRESS TABLE
create table if not exists public.progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  course_id text not null,
  day_completed integer not null default 0,
  last_updated timestamp with time zone default now(),
  unique(user_id, course_id)
);

-- 5. CERTIFICATES TABLE
create table if not exists public.certificates (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  course_id text not null,
  course_title text not null,
  issued_at timestamp with time zone default now(),
  unique(user_id, course_id)
);

-- ── ROW LEVEL SECURITY ────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.payments enable row level security;
alter table public.course_access enable row level security;
alter table public.progress enable row level security;
alter table public.certificates enable row level security;

-- Profiles: users can only see and edit their own
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Payments: users can see their own payments
create policy "Users can view own payments"
  on public.payments for select using (auth.uid() = user_id);
create policy "Users can insert own payments"
  on public.payments for insert with check (auth.uid() = user_id);

-- Course access: users can see their own unlocked courses
create policy "Users can view own course access"
  on public.course_access for select using (auth.uid() = user_id);
create policy "Users can insert own course access"
  on public.course_access for insert with check (auth.uid() = user_id);

-- Progress: users can manage their own progress
create policy "Users can view own progress"
  on public.progress for select using (auth.uid() = user_id);
create policy "Users can insert own progress"
  on public.progress for insert with check (auth.uid() = user_id);
create policy "Users can update own progress"
  on public.progress for update using (auth.uid() = user_id);

-- Certificates: users can view their own certificates
create policy "Users can view own certificates"
  on public.certificates for select using (auth.uid() = user_id);
create policy "Users can insert own certificates"
  on public.certificates for insert with check (auth.uid() = user_id);

-- ── AUTO-CREATE PROFILE ON SIGNUP ─────────────────────────────
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
