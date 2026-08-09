# SyncStudy

A GitHub + Discord-inspired study collaboration platform built with Next.js, Tailwind CSS, and Supabase.

## What’s included

- Next.js App Router with TypeScript
- Tailwind CSS layout and responsive dashboard
- Supabase client stub and database schema for auth, profiles, projects, chat, and notifications
- Sample UI for discover, projects, and peer cards

## Setup

1. Install dependencies when Node is available:
   ```bash
   npm install
   ```

2. Create a Supabase project and add the following environment variables to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

3. Import the SQL schema in `supabase/schema.sql` into your Supabase database.

4. Run the app locally:
   ```bash
   npm run dev
   ```

## Supabase schema

The `supabase/schema.sql` file contains the database tables for:

- `profiles`
- `projects`
- `project_stars`
- `channels`
- `messages`
- `notifications`
- `team_requests`

## Next steps

- Add auth pages and Supabase auth logic
- Build project publishing and star/upvote actions
- Add realtime chat using Supabase realtime subscriptions
- Add dashboard routes for profile discovery and personal feed
