'use client';
import { useEffect, useRef, useState } from 'react';
import SectionNumber from '@/components/shared/SectionNumber';
import ProjectCard from '@/components/shared/ProjectCard';
import { projects } from '@/lib/data';

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 1) Reveal title
          setTitleVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const titleChars = 'Selected Works'.split('');

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative"
      style={{ minHeight: '80vh' }}
      aria-label="Selected projects"
    >
      <div className="section-wrapper relative">
        <SectionNumber number="04" />

        {/* Animated section title */}
        <div className="mb-16 relative z-10">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-primary)',
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? 'translateY(0)' : 'translateY(15px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
            }}
          >
            What I&apos;ve Built
          </p>

          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold overflow-hidden"
            style={{ fontFamily: 'var(--font-heading)' }}
            aria-label="Selected Works"
          >
            {titleChars.map((c, i) => (
              <span
                key={i}
                style={{
                  display: c === ' ' ? 'inline' : 'inline-block',
                  color: 'var(--text-primary)',
                  clipPath: titleVisible ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
                  transform: titleVisible ? 'translateY(0)' : 'translateY(100%)',
                  transition: `clip-path 0.6s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.05}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.05}s`,
                }}
                aria-hidden={c === ' '}
              >
                {c === ' ' ? '\u00A0' : c}
              </span>
            ))}
          </h2>
        </div>

        {/* Project grid — 2 cols desktop, 1 col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
