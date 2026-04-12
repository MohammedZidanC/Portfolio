'use client';
import { useEffect, useRef, useState } from 'react';
import SectionNumber from '@/components/shared/SectionNumber';
import Marquee from '@/components/ui/Marquee';
import { personal, marqueeText } from '@/lib/data';

const STATS = [
  { value: 2024, label: 'Year I started B.Tech', suffix: '' },
  { value: 4,    label: 'Projects Built',          suffix: '' },
  { value: 10,   label: 'Certifications Earned',   suffix: '' },
  { value: 1,    label: 'Prize at SRM Innovation',  suffix: 'st 🏆' },
];

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const pct = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 3);
      setVal(Math.round(eased * target));
      if (pct < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
}

function StatCard({ stat, active }: { stat: typeof STATS[0]; active: boolean }) {
  const count = useCountUp(stat.value, active);
  return (
    <div
      className="flex flex-col items-center justify-center p-6 rounded-2xl border text-center h-full"
      style={{
        borderColor: 'var(--border)',
        background: 'var(--bg-secondary)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.35)';
        (e.currentTarget as HTMLElement).style.boxShadow  = '0 0 20px rgba(124,58,237,0.12)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLElement).style.boxShadow  = 'none';
      }}
    >
      <span
        className="block text-4xl md:text-5xl font-bold mb-2"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-primary)' }}
        aria-label={`${stat.value} ${stat.label}`}
      >
        {count}{stat.suffix}
      </span>
      <span
        className="text-xs leading-snug"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.08em' }}
      >
        {stat.label}
      </span>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [statsActive, setStatsActive] = useState(false);
  const [bioVisible, setBioVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsActive(true);
          setBioVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const bioWords = personal.bio.split(' ');

  return (
    <section id="about" ref={sectionRef} className="relative" style={{ minHeight: '100vh' }}>
      <div className="section-wrapper relative">
        <SectionNumber number="01" />

        {/* Section title */}
        <div className="mb-16 relative z-10">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}
          >
            Who I Am
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
          >
            About Me
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-5 gap-12 md:gap-16 relative z-10">
          {/* Left col 60% */}
          <div className="md:col-span-3">
            {/* Availability */}
            <div className="flex items-center gap-2 mb-8">
              <span
                style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: '#22c55e',
                  display: 'inline-block',
                  animation: 'avail-pulse-green 2s ease-in-out infinite',
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.1em',
                }}
              >
                Currently pursuing B.Tech at SRM IST, Chennai (2024–2028)
              </span>
            </div>

            {/* Bio word-by-word */}
            <p
              className="text-lg md:text-xl leading-relaxed mb-8"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
              aria-label={personal.bio}
            >
              {bioWords.map((word, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    marginRight: '0.3em',
                    opacity: bioVisible ? 1 : 0,
                    transform: bioVisible ? 'translateY(0)' : 'translateY(16px)',
                    transition: `opacity 0.5s ease ${i * 0.03}s, transform 0.5s ease ${i * 0.03}s`,
                  }}
                >
                  {word}
                </span>
              ))}
            </p>

            {/* Goal */}
            <blockquote
              className="border-l-2 pl-6 italic"
              style={{
                borderColor: 'var(--accent-primary)',
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-body)',
                opacity: bioVisible ? 1 : 0,
                transform: bioVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 1s, transform 0.7s ease 1s',
              }}
            >
              &quot;{personal.goal}&quot;
            </blockquote>

            {/* Location */}
            <p
              className="mt-6 text-sm flex items-center gap-2"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                opacity: bioVisible ? 1 : 0,
                transition: 'opacity 0.7s ease 1.2s',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z" stroke="var(--accent-primary)" strokeWidth="1.2"/>
                <circle cx="8" cy="6" r="1.5" stroke="var(--accent-primary)" strokeWidth="1.2"/>
              </svg>
              {personal.location}
            </p>
          </div>

          {/* Right col 40% */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4 content-start">
            {STATS.map((s, i) => (
              <StatCard key={i} stat={s} active={statsActive} />
            ))}
          </div>
        </div>
      </div>

      {/* Marquee band */}
      <div
        className="w-full border-t border-b py-4 mt-8"
        style={{ borderColor: 'var(--border)', background: 'rgba(124,58,237,0.03)' }}
      >
        <Marquee text={marqueeText} />
        <div className="mt-3">
          <Marquee text={marqueeText} reverse />
        </div>
      </div>

      <style>{`
        @keyframes avail-pulse-green {
          0%, 100% { box-shadow: 0 0 4px #22c55e; }
          50%       { box-shadow: 0 0 16px #22c55e, 0 0 28px rgba(34,197,94,0.35); }
        }
      `}</style>
    </section>
  );
}
