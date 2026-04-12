'use client';
import { useEffect, useRef } from 'react';
import SectionNumber from '@/components/shared/SectionNumber';
import EducationCard from '@/components/shared/EducationCard';
import { education } from '@/lib/data';

export default function Education() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="education"
      className="relative"
      style={{ minHeight: '80vh' }}
      aria-label="Education history"
    >
      <div className="section-wrapper relative">
        <SectionNumber number="03" />

        {/* Header */}
        <div className="mb-20 relative z-10">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}
          >
            Academic Journey
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
          >
            Education
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative hidden md:block" style={{ minHeight: education.length * 300 }}>
          {/* Animated vertical line */}
          <div
            ref={lineRef}
            className="timeline-line"
            aria-hidden="true"
          />

          {education.map((entry, i) => {
            const isLeft = i % 2 === 1;
            const topOffset = i * 300;

            return (
              <div
                key={i}
                className="absolute w-full flex items-start"
                style={{ top: topOffset }}
              >
                {/* Left content (even indices go right, odd indices go left) */}
                <div
                  className={`w-[calc(50%-2rem)] ${isLeft ? 'pr-6' : 'pl-6 ml-auto'}`}
                >
                  {/* Date badge */}
                  <div
                    className="inline-block mb-3 px-3 py-1 rounded-full border text-xs font-mono"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      letterSpacing: '0.1em',
                      color: 'var(--accent-primary)',
                      borderColor: 'rgba(124,58,237,0.4)',
                      background: 'rgba(124,58,237,0.08)',
                    }}
                  >
                    {entry.dates}
                  </div>
                  <EducationCard entry={entry} index={i} side={isLeft ? 'left' : 'right'} />
                </div>

                {/* Center dot */}
                <div
                  className="timeline-dot absolute left-1/2 -translate-x-1/2"
                  style={{ top: 28 }}
                  aria-hidden="true"
                />
              </div>
            );
          })}
        </div>

        {/* Mobile stacked layout */}
        <div className="flex flex-col gap-8 md:hidden relative z-10">
          {education.map((entry, i) => (
            <div key={i}>
              <div
                className="inline-block mb-3 px-3 py-1 rounded-full border text-xs"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--accent-primary)',
                  borderColor: 'rgba(124,58,237,0.4)',
                  background: 'rgba(124,58,237,0.08)',
                }}
              >
                {entry.dates}
              </div>
              <EducationCard entry={entry} index={i} side="right" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
