import { useCallback, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { getProjects } from '../api';
import TerminalWindow from '../components/TerminalWindow';
import { fallbackProjects } from '../data/fallbackData';
import { useApiData } from '../hooks/useApiData';

function ProjectCard({ project, index }) {
  const imageLabel = project.image.split('/').pop() ?? 'project image';
  const [imageMissing, setImageMissing] = useState(false);

  return (
    <article className="terminal-card flex h-full flex-col overflow-hidden rounded-lg">
      <div className="relative flex h-48 items-center justify-center overflow-hidden border-b border-[#00ff41]/20 bg-[#0b0b0b]">
        {imageMissing ? (
          <div className="absolute inset-0 p-4">
            <TerminalWindow title={imageLabel} className="h-full border-0 shadow-none">
              <div className="text-center text-xs leading-6 text-white/50">
                <p className="text-[#00ff41]">$ image --missing</p>
                <p>cover image not found</p>
              </div>
            </TerminalWindow>
          </div>
        ) : (
          <img
            src={project.image}
            alt={`${project.title} project cover`}
            loading="lazy"
            className="h-full w-full object-cover"
            onError={() => setImageMissing(true)}
          />
        )}
        <span className="absolute left-3 top-3 rounded border border-[#00ff41]/60 bg-black/85 px-2 py-1 text-xs font-bold text-[#00ff41]">
          #{String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-base font-bold leading-6 text-white">{project.title}</h2>
        <p className="mt-3 flex-1 text-xs leading-6 text-white/60">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded border border-[#00ff41]/25 px-2 py-1 text-[10px] text-[#9cffac]"
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex gap-3 border-t border-white/10 pt-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-[#00ff41]/50 px-3 py-2 text-xs text-[#00ff41] transition-colors hover:bg-[#00ff41] hover:text-black"
            >
              <ExternalLink size={14} aria-hidden="true" />
              Live
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded border border-white/20 px-3 py-2 text-xs text-white/75 transition-colors hover:border-[#00ff41] hover:text-[#00ff41]"
          >
            <Github size={14} aria-hidden="true" />
            Code
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const loadProjects = useCallback(() => getProjects(), []);
  const projects = useApiData(loadProjects, fallbackProjects);

  return (
    <div className="page-enter mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8">
        <p className="text-xs text-[#00ff41]">~/portfolio/projects.sys</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Projects</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">
          Selected work across cloud security, full-stack platforms and machine learning.
        </p>
      </div>
      {projects.length ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={`${project.title}-${project.order}`} project={project} index={index} />
          ))}
        </div>
      ) : (
        <TerminalWindow title="projects.sys">
          <p className="text-sm text-white/60">No projects are available yet.</p>
        </TerminalWindow>
      )}
    </div>
  );
}
