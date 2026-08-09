import { Star, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    tags: string[];
    githubUrl: string;
    demoUrl: string;
    stars: number;
    owner: string;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-6 shadow-lg shadow-slate-950/10 transition hover:border-sky-500/40 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{project.owner}</p>
          <h3 className="mt-3 text-xl font-semibold text-white">{project.title}</h3>
        </div>
        <div className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-3 py-2 text-sm text-slate-200">
          <Star size={16} className="text-amber-300" />
          {project.stars}
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-400">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-2xl bg-slate-900/90 px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-sky-300">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={project.githubUrl} className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-500" target="_blank" rel="noreferrer">
          GitHub
          <ExternalLink size={14} />
        </a>
        <a href={project.demoUrl} className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400" target="_blank" rel="noreferrer">
          Demo
          <ExternalLink size={14} />
        </a>
      </div>
    </article>
  );
}
