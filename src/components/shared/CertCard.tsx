'use client';
import { useEffect, useRef } from 'react';

interface Cert {
  title: string;
  issuer: string;
  date: string;
  tags: string[];
  pdf: string;
  type: 'technical' | 'soft' | 'award' | 'membership';
}

interface Props {
  cert: Cert;
  index: number;
}

export default function CertCard({ cert, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isAward = cert.type === 'award';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('visible');
          }, index * 60);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`cert-card ${isAward ? 'award' : ''}`}
      aria-label={`Certification: ${cert.title}`}
    >
      {/* Award badge */}
      {isAward && (
        <div
          className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded mb-3"
          style={{
            background: 'rgba(245,158,11,0.15)',
            color: '#f59e0b',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            border: '1px solid rgba(245,158,11,0.3)',
          }}
        >
          ★ 1st Prize
        </div>
      )}

      {/* Issuer */}
      <p
        className="text-xs tracking-widest uppercase mb-1"
        style={{
          fontFamily: 'var(--font-mono)',
          color: isAward ? '#f59e0b' : 'var(--accent-secondary)',
        }}
      >
        {cert.issuer}
      </p>

      {/* Title */}
      <h3
        className="font-bold mb-2 leading-snug"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '0.95rem',
          color: 'var(--text-primary)',
        }}
      >
        {cert.title}
      </h3>

      {/* Date */}
      <p
        className="text-xs mb-3"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
      >
        {cert.date}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {cert.tags.map(t => (
          <span
            key={t}
            className="text-xs px-2 py-0.5 rounded-full border"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.08em',
              color: isAward ? '#f59e0b' : 'var(--text-muted)',
              borderColor: isAward ? 'rgba(245,158,11,0.3)' : 'var(--border)',
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* PDF link — opens local PDF in new tab */}
      <a
        href={cert.pdf}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase transition-opacity duration-200 hover:opacity-70"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          color: isAward ? '#f59e0b' : 'var(--accent-primary)',
        }}
        aria-label={`View PDF certificate for ${cert.title}`}
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 2h6l4 4v8H4V2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
          <path d="M10 2v4h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        View Certificate ↗
      </a>
    </div>
  );
}
