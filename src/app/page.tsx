'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { ProjectCard } from '@/components/ProjectCard';
import { UserCard } from '@/components/UserCard';
import { authAPI } from '@/lib/supabaseClient';

const sampleUsers = [
  {
    id: 'u1',
    name: 'Aisha',
    role: 'CS Major',
    status: 'Open to Code',
    skills: ['React', 'TypeScript', 'UI/UX'],
    availability: 'Evenings',
  },
  {
    id: 'u2',
    name: 'Dev',
    role: 'Data Science',
    status: 'Deep Work',
    skills: ['Python', 'ML', 'SQL'],
    availability: 'Weekends',
  },
  {
    id: 'u3',
    name: 'Mina',
    role: 'Design',
    status: 'Need Help',
    skills: ['Figma', 'Frontend', 'Collaboration'],
    availability: 'Flexible',
  },
];

const sampleProjects = [
  {
    id: 'p1',
    title: 'HackHub Dashboard',
    description: 'A collaborative project showcase platform with live team matching.',
    tags: ['React', 'Supabase', 'Tailwind'],
    githubUrl: 'https://github.com/example/hackhub',
    demoUrl: 'https://demo.example.com',
    stars: 28,
    owner: 'Aisha',
  },
  {
    id: 'p2',
    title: 'StudySync Chat',
    description: 'Real-time messaging and status updates for study groups.',
    tags: ['Next.js', 'Socket.io', 'Postgres'],
    githubUrl: 'https://github.com/example/studysync',
    demoUrl: 'https://study.example.com',
    stars: 42,
    owner: 'Dev',
  },
];

export default function Home() {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const token = authAPI.getToken();
      if (token) {
        const user = await authAPI.getMe();
        setIsSignedIn(!!user && !!user._id);
      } else {
        setIsSignedIn(false);
      }
    };
    checkSession();
  }, []);

  const handleCreateAccount = () => {
    router.push('/auth?signup=true');
  };

  const handleDiscoverPeers = () => {
    if (isSignedIn) {
      router.push('/dashboard');
    } else {
      router.push('/auth');
    }
  };
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-sky-400">SyncStudy</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              One dashboard to find coders, showcase work, and build teams.
            </h1>
            <p className="mt-4 max-w-2xl text-slate-400">
              A GitHub + Discord-inspired workspace for student collaborators, hackathon teams, and project portfolios.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <button 
              onClick={handleCreateAccount}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
            >
              Create account
              <ArrowRight size={16} />
            </button>
            <button 
              onClick={handleDiscoverPeers}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
            >
              Discover peers
              <Sparkles size={16} />
            </button>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-6 rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Dashboard status</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Workspace overview</h2>
              </div>
              <span className="inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
                Live
              </span>
            </div>

            <div className="space-y-4 rounded-[1.75rem] bg-slate-950/80 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">Team search mode</p>
                <button className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-200">ON</button>
              </div>
              <p className="text-sm text-slate-300">Show peers looking for teammates, active projects, and collaborative chat rooms.</p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm uppercase tracking-[0.28em] text-slate-500">Quick links</h3>
              <nav className="space-y-2">
                {['People', 'Projects', 'Chats', 'Activities'].map((item) => (
                  <button key={item} className="w-full rounded-2xl bg-slate-950/80 px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-slate-800">
                    {item}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <div className="space-y-8">
            <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
              <div className="rounded-[2rem] bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 ring-1 ring-slate-800/70">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Discover coders</h2>
                    <p className="mt-2 text-sm text-slate-400">Search by language, major, or role and filter for active teammates.</p>
                  </div>
                  <button className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800">Filter</button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <button className="rounded-3xl bg-slate-950/90 px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-slate-800">React</button>
                  <button className="rounded-3xl bg-slate-950/90 px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-slate-800">Python</button>
                  <button className="rounded-3xl bg-slate-950/90 px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-slate-800">Figma</button>
                  <button className="rounded-3xl bg-slate-950/90 px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-slate-800">Supabase</button>
                </div>
              </div>

              <div className="rounded-[2rem] bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 ring-1 ring-slate-800/70">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold text-white">Live status</h2>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">Realtime</span>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between rounded-3xl bg-slate-950/90 px-4 py-3 text-sm text-slate-200">
                    <span>Aisha</span>
                    <span className="inline-flex items-center gap-2 text-emerald-300">● Open to Code</span>
                  </div>
                  <div className="flex items-center justify-between rounded-3xl bg-slate-950/90 px-4 py-3 text-sm text-slate-200">
                    <span>Dev</span>
                    <span className="inline-flex items-center gap-2 text-amber-300">● Need Help</span>
                  </div>
                  <div className="flex items-center justify-between rounded-3xl bg-slate-950/90 px-4 py-3 text-sm text-slate-200">
                    <span>Mina</span>
                    <span className="inline-flex items-center gap-2 text-red-300">● Deep Work</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">Featured projects</h2>
                  <p className="text-sm text-slate-400">Showcase live demos, GitHub repos, and project stars.</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800">
                  See all
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className="grid gap-6 xl:grid-cols-2">
                {sampleProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>

            <section className="space-y-6 rounded-[2rem] bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 ring-1 ring-slate-800/70">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">Matching people</h2>
                  <p className="text-sm text-slate-400">Peer cards highlight skills, availability, and open team roles.</p>
                </div>
                <button className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800">New match</button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {sampleUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
