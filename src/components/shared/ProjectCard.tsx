'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface Project {
  title: string;
  year: string;
  description: string;
  tech: string[];
  image: string;
  source?: string | null;
  live?: string | null;
  featured: boolean;
}

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('visible');
          }, index * 150);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={ref} className="project-card" aria-label={`Project: ${project.title}`}>
      {/* Year badge */}
      <div
        className="absolute top-4 right-4 z-10 text-xs tracking-widest px-2 py-1 rounded border"
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--accent-secondary)',
          borderColor: 'rgba(6,182,212,0.3)',
          background: 'rgba(6,182,212,0.06)',
        }}
        aria-label={`Year: ${project.year}`}
      >
        {project.year}
      </div>

      {/* Image — local from /Projects/ */}
      <div className="img-wrap">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          width={800}
          height={280}
          className="w-full"
          style={{ height: 280, objectFit: 'cover' }}
          loading="lazy"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{ background: 'linear-gradient(to top, var(--bg-secondary), transparent)' }}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className="text-xl font-bold mb-2"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
        >
          {project.title}
        </h3>
        <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map(t => (
            <span
              key={t}
              className="text-xs px-2 py-1 rounded border"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                borderColor: 'var(--border)',
                background: 'var(--bg-tertiary)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-3">
          {project.source && (
            <a
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
              className="project-source-btn inline-flex items-center gap-2 text-xs tracking-widest uppercase px-4 py-2 rounded border"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--accent-primary)',
                borderColor: 'rgba(124,58,237,0.35)',
                background: 'rgba(124,58,237,0.06)',
              }}
              aria-label={`View ${project.title} source code on GitHub`}
            >
              Source Code ↗
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="project-source-btn inline-flex items-center gap-2 text-xs tracking-widest uppercase px-4 py-2 rounded border"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--accent-secondary)',
                borderColor: 'rgba(6,182,212,0.35)',
                background: 'rgba(6,182,212,0.06)',
              }}
              aria-label={`View ${project.title} live demo`}
            >
              Live Demo ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
