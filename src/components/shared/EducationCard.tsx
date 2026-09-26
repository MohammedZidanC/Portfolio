'use client';
import { useRef } from 'react';
import Image from 'next/image';

interface EduEntry {
  institution: string;
  location: string;
  degree: string;
  field: string;
  dates: string;
  note: string;
  url: string;
  logo: string;
  icon: string;
}

interface Props {
  entry: EduEntry;
  side: 'left' | 'right';
}

export default function EducationCard({ entry, side }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <a
      ref={ref}
      data-scroll-reveal
      href={entry.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`edu-card block relative group from-${side}`}
      aria-label={`${entry.institution} — ${entry.degree}. Click to visit website.`}
    >
      {/* Visit indicator */}
      <span
        className="absolute top-4 right-4 text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontSize: '0.65rem' }}
        aria-hidden="true"
      >
        ↗ Visit
      </span>

      {/* Header with logo */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className="flex-shrink-0 rounded-lg overflow-hidden bg-white/5 p-1"
          style={{ width: 44, height: 44 }}
        >
          <Image
            src={entry.logo}
            alt={entry.institution}
            width={44}
            height={44}
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h3
            className="font-bold leading-tight"
            style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: 'var(--text-primary)' }}
          >
            {entry.institution}
          </h3>
          <p className="text-xs mt-0.5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-secondary)' }}>
            {entry.location}
          </p>
        </div>
      </div>

      {/* Degree badge */}
      <div
        className="inline-block text-xs px-2.5 py-1 rounded mb-2"
        style={{
          background: 'rgba(198,167,121,0.08)',
          border: '1px solid rgba(198,167,121,0.25)',
          color: 'var(--accent-primary)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          letterSpacing: '0.06em',
        }}
      >
        {entry.degree}
      </div>

      {/* Field */}
      <p className="font-semibold text-sm mb-2" style={{ color: 'var(--text-primary)' }}>
        {entry.field}
      </p>

      {/* Note */}
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        {entry.note}
      </p>
    </a>
  );
}
