interface UserCardProps {
  user: {
    id: string;
    name: string;
    role: string;
    status: string;
    skills: string[];
    availability: string;
  };
}

const statusStyles: Record<string, string> = {
  'Open to Code': 'text-emerald-300 bg-emerald-500/10',
  'Deep Work': 'text-red-300 bg-red-500/10',
  'Need Help': 'text-amber-300 bg-amber-500/10',
};

export function UserCard({ user }: UserCardProps) {
  return (
    <article className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-6 shadow-lg shadow-slate-950/10 transition hover:border-sky-500/40 hover:-translate-y-0.5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">{user.name}</h3>
          <p className="text-sm text-slate-400">{user.role}</p>
        </div>
        <div className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${statusStyles[user.status] ?? 'text-slate-300 bg-slate-800'}`}>
          {user.status}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {user.skills.map((skill) => (
          <span key={skill} className="rounded-2xl bg-slate-900/90 px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-sky-300">
            {skill}
          </span>
        ))}
      </div>
      <div className="mt-5 rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300">
        <p>{user.availability}</p>
      </div>
    </article>
  );
}
