'use client';
import { useEffect, useState, useRef, type MouseEvent as ReactMouseEvent } from 'react';
import Image from 'next/image';
import AuroraBlobs from '@/components/ui/AuroraBlobs';
import ConstellationCanvas from '@/components/ui/ConstellationCanvas';
import MagneticButton from '@/components/shared/MagneticButton';
import HeroMarkLayout from './hero-mark/HeroMarkLayout';
import { personal, scrambleWords } from '@/lib/data';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';

type IntroPhase = 'loading' | 'flight' | 'handoff' | 'ready';
type HeroClickBurst = { id: number; x: number; y: number };

function useScramble(words: string[], interval = 2800) {
  const [display, setDisplay] = useState(words[0]);
  const idxRef = useRef(0);

  useEffect(() => {
    const scramble = (target: string) => {
      let iter = 0;
      const id = setInterval(() => {
        setDisplay(
          target.split('').map((c, i) =>
            i < iter ? c : c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]
          ).join('')
        );
        iter++;
        if (iter > target.length) clearInterval(id);
      }, 50);
    };

    const t = setInterval(() => {
      idxRef.current = (idxRef.current + 1) % words.length;
      scramble(words[idxRef.current]);
    }, interval);

    return () => clearInterval(t);
  }, [words, interval]);

  return display;
}

export default function Hero({ introPhase = 'ready' }: { introPhase?: IntroPhase }) {
  const ready = introPhase === 'ready';
  const [namesRevealed, setNamesRevealed] = useState(ready);
  const [clickBursts, setClickBursts] = useState<HeroClickBurst[]>([]);
  const scrambled = useScramble(scrambleWords);
  const burstSequence = useRef(0);

  useEffect(() => {
    if (introPhase === 'ready' || introPhase === 'handoff') {
      setNamesRevealed(true);
      return;
    }
    if (introPhase === 'flight') {
      const revealTimer = window.setTimeout(() => setNamesRevealed(true), 385);
      return () => window.clearTimeout(revealTimer);
    }
    setNamesRevealed(false);
  }, [introPhase]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const onBackgroundClick = (event: ReactMouseEvent<HTMLElement>) => {
    const target = event.target;
    const isBackgroundSurface = target === event.currentTarget || (target instanceof HTMLElement && target.classList.contains('hero-copy'));
    if (!isBackgroundSurface || (target instanceof HTMLElement && target.closest('a, button, input, textarea, [role="button"]')) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const burst = { id: ++burstSequence.current, x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    setClickBursts(current => [...current.slice(-2), burst]);
    window.setTimeout(() => setClickBursts(current => current.filter(item => item.id !== burst.id)), 1120);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Introduction"
      onClick={onBackgroundClick}
    >
      <AuroraBlobs variant="hero" />
      <ConstellationCanvas />
      {clickBursts.map(burst => (
        <div key={burst.id} className="hero-click-burst" style={{ left: burst.x, top: burst.y }} aria-hidden="true">
          <i className="hero-click-ring" />
          <i className="hero-click-core" />
          <i className="hero-click-spark" />
          <i className="hero-click-spark" />
          <i className="hero-click-spark" />
          <i className="hero-click-spark" />
        </div>
      ))}

      <div className="hero-copy relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Greeting */}
        <p
          className="mb-4 text-sm tracking-widest uppercase"
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
            opacity: ready ? 1 : 0,
            letterSpacing: ready ? '0.15em' : '0.36em',
            filter: ready ? 'blur(0)' : 'blur(4px)',
            transition: 'opacity 0.24s ease 0.04s, letter-spacing 0.3s ease 0.04s, filter 0.24s ease 0.04s',
          }}
        >
          Hi, I&apos;m
        </p>

        {/* Profile photo */}
        <div className="flex flex-col items-center justify-center gap-5 mb-4">
          {/* Profile photo */}
          <div
            className="relative flex-shrink-0"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? 'scale(1)' : 'scale(0.86)',
              filter: ready ? 'blur(0)' : 'blur(5px)',
              transition: 'opacity 0.35s ease 0.06s, transform 0.35s cubic-bezier(0.2,.8,.2,1) 0.06s, filter 0.35s ease 0.06s',
            }}
          >
            <div
              className="rounded-full overflow-hidden relative"
              style={{
                width: 'clamp(90px, 14vw, 130px)',
                height: 'clamp(90px, 14vw, 130px)',
                boxShadow: '0 0 26px rgba(198,167,121,0.2), 0 0 52px rgba(198,167,121,0.08)',
                border: '2px solid rgba(198,167,121,0.42)',
              }}
            >
              <Image
                src={personal.photo}
                alt={personal.full_name}
                width={130}
                height={130}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            {/* Glow ring animation */}
            <div
              className="absolute inset-[-4px] rounded-full pointer-events-none"
              style={{
                border: '1px solid rgba(198,167,121,0.26)',
                animation: ready ? 'photo-ring-pulse 3s ease-in-out infinite' : 'none',
              }}
              aria-hidden="true"
            />
          </div>

          {/* Hero initials stay mounted beneath the splash, then appear as the traveling marks land. */}
          <HeroMarkLayout namesRevealed={namesRevealed} marksVisible={introPhase === 'handoff' || ready} />
        </div>

        {/* Tagline 1 — outlined */}
        <p
          className="mb-2"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.2rem, 3vw, 2rem)',
            fontWeight: 600,
            letterSpacing: '0.12em',
            WebkitTextStroke: '1px rgba(255,255,255,0.45)',
            color: 'transparent',
            opacity: ready ? 1 : 0,
            clipPath: ready ? 'inset(0)' : 'inset(100% 0 0)',
            transition: 'opacity 0.29s ease 0.09s, clip-path 0.325s cubic-bezier(.2,.8,.2,1) 0.09s',
          }}
        >
          {personal.tagline_line1}
        </p>

        {/* Tagline 2 */}
        <p
          className="mb-6"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.75rem, 1.5vw, 0.95rem)',
            color: 'var(--text-secondary)',
            opacity: ready ? 1 : 0,
            filter: ready ? 'blur(0)' : 'blur(7px)',
            letterSpacing: ready ? '0.15em' : '0.27em',
            transition: 'opacity 0.31s ease 0.135s, filter 0.31s ease 0.135s, letter-spacing 0.31s ease 0.135s',
          }}
        >
          {personal.tagline_line2}
        </p>

        {/* Scramble text */}
        <div
          className="mb-10 inline-flex items-center gap-3"
          style={{
            opacity: ready ? 1 : 0,
            transform: ready ? 'scale(1)' : 'scale(.96)',
            transition: 'opacity 0.25s ease 0.17s, transform 0.25s cubic-bezier(.2,.8,.2,1) 0.17s',
          }}
          aria-live="polite"
          aria-label={`Currently: ${scrambled}`}
        >
          <span
            className="inline-block flex-shrink-0"
            style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'var(--accent-primary)',
              animation: 'avail-pulse 2s ease-in-out infinite',
            }}
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              color: 'var(--accent-primary)',
            }}
          >
            {scrambled}
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <MagneticButton
            className="hero-cta-primary px-7 py-3.5 rounded-lg text-sm tracking-widest uppercase font-medium text-white"
            style={{ opacity: ready ? 1 : 0, transform: ready ? 'scale(1)' : 'scale(.94)', transition: 'opacity .25s ease .19s, transform .275s cubic-bezier(.2,.8,.2,1) .19s' }}
            onClick={() => scrollToSection('projects')}
            aria-label="View my work"
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.16em' }}>
              View My Work
            </span>
          </MagneticButton>

          <MagneticButton
            className="hero-cta-secondary px-7 py-3.5 rounded-lg text-sm tracking-widest uppercase"
            style={{ opacity: ready ? 1 : 0, clipPath: ready ? 'inset(0)' : 'inset(0 100% 0 0)', transition: 'opacity .25s ease .25s, clip-path .3s cubic-bezier(.2,.8,.2,1) .25s' }}
            onClick={() => scrollToSection('contact')}
            aria-label="Get in touch"
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.16em', color: 'var(--text-primary)' }}>
              Get In Touch
            </span>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{ opacity: ready ? 1 : 0, filter: ready ? 'blur(0)' : 'blur(5px)', transition: 'opacity 0.275s ease .29s, filter 0.275s ease .29s' }}
        aria-hidden="true"
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.25em', color: 'var(--text-muted)' }}>
          SCROLL
        </span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" style={{ animation: 'bounce-y 1.5s ease-in-out infinite' }}>
          <path d="M8 4v12M4 14l4 4 4-4" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <style>{`
        @keyframes bounce-y { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
        @keyframes avail-pulse { 0%, 100% { box-shadow: 0 0 4px #c6a779; } 50% { box-shadow: 0 0 12px #c6a779, 0 0 24px rgba(198,167,121,0.24); } }
        @keyframes photo-ring-pulse { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 0; transform: scale(1.3); } }
      `}</style>
    </section>
  );
}
