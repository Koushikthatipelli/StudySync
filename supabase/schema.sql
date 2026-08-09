-- Supabase schema for SyncStudy

-- Enable UUID generation if not enabled already
create extension if not exists "pgcrypto";

-- Profiles table to extend auth users
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  full_name text not null,
  role text,
  major text,
  bio text,
  skills text[] default '{}',
  status text default 'Open to Code',
  looking_for_team boolean default false,
  availability text,
  website text,
  created_at timestamptz default now()
);

-- Projects published by users
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade,
  title text not null,
  description text,
  tech_stack text[] default '{}',
  github_url text,
  demo_url text,
  is_public boolean default true,
  stars_count int default 0,
  created_at timestamptz default now()
);

-- Star relationships for upvotes
create table if not exists project_stars (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  created_at timestamptz default now(),
  unique (user_id, project_id)
);

-- Team formation requests and matching state
create table if not exists team_requests (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid references auth.users(id) on delete cascade,
  target_id uuid references auth.users(id) on delete cascade,
  status text default 'pending',
  message text,
  created_at timestamptz default now()
);

-- Chat channels and direct rooms
create table if not exists channels (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  is_private boolean default false,
  metadata jsonb,
  created_at timestamptz default now()
);

-- Chat messages for channels and direct messages
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  channel_id uuid references channels(id) on delete cascade,
  sender_id uuid references auth.users(id) on delete cascade,
  content text not null,
  link text,
  created_at timestamptz default now()
);

-- Notifications for user activity
create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  type text not null,
  payload jsonb,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- Indexes for faster discovery and search
create index if not exists idx_profiles_skills on profiles using gin (skills);
create index if not exists idx_projects_tech_stack on projects using gin (tech_stack);
create index if not exists idx_messages_channel on messages(channel_id);
