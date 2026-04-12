'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import AuroraBlobs from '@/components/ui/AuroraBlobs';
import ConstellationCanvas from '@/components/ui/ConstellationCanvas';
import MagneticButton from '@/components/shared/MagneticButton';
import { personal, scrambleWords } from '@/lib/data';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';

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

export default function Hero() {
  const [ready, setReady] = useState(false);
  const scrambled = useScramble(scrambleWords);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  const nameChars = personal.full_name.split('');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Introduction"
    >
      <AuroraBlobs variant="hero" />
      <ConstellationCanvas />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Greeting */}
        <p
          className="mb-4 text-sm tracking-widest uppercase"
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
            opacity: ready ? 1 : 0,
            transform: ready ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
          }}
        >
          Hi, I&apos;m
        </p>

        {/* Profile photo + Name */}
        <div
          className="flex flex-col items-center justify-center gap-5 mb-4"
          style={{
            opacity: ready ? 1 : 0,
            transition: 'opacity 0.7s ease 0.3s',
          }}
        >
          {/* Profile photo */}
          <div
            className="relative flex-shrink-0"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? 'scale(1)' : 'scale(0.7)',
              transition: 'opacity 0.8s ease 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s',
            }}
          >
            <div
              className="rounded-full overflow-hidden relative"
              style={{
                width: 'clamp(90px, 14vw, 130px)',
                height: 'clamp(90px, 14vw, 130px)',
                boxShadow: '0 0 30px rgba(124,58,237,0.35), 0 0 60px rgba(124,58,237,0.15)',
                border: '2px solid rgba(124,58,237,0.4)',
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
                border: '1px solid rgba(124,58,237,0.3)',
                animation: 'photo-ring-pulse 3s ease-in-out infinite',
              }}
              aria-hidden="true"
            />
          </div>

          {/* Name — letter by letter */}
          <h1
            className="leading-none text-center"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.4rem, 7vw, 5.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}
            aria-label={personal.full_name}
          >
            {nameChars.map((c, i) => (
              <span
                key={i}
                style={{
                  display: c === ' ' ? 'inline' : 'inline-block',
                  color: 'var(--text-primary)',
                  opacity: ready ? 1 : 0,
                  transform: ready ? 'translateY(0) rotate(0deg)' : 'translateY(60px) rotate(10deg)',
                  transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${0.4 + i * 0.04}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.4 + i * 0.04}s`,
                }}
                aria-hidden={c === ' '}
              >
                {c === ' ' ? '\u00A0' : c}
              </span>
            ))}
          </h1>
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
            transform: ready ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease 1s, transform 0.7s ease 1s',
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
            letterSpacing: '0.15em',
            opacity: ready ? 1 : 0,
            transform: ready ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease 1.15s, transform 0.7s ease 1.15s',
          }}
        >
          {personal.tagline_line2}
        </p>

        {/* Scramble text */}
        <div
          className="mb-10 inline-flex items-center gap-3"
          style={{
            opacity: ready ? 1 : 0,
            transition: 'opacity 0.7s ease 1.3s',
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
        <div
          className="flex items-center justify-center gap-4 flex-wrap"
          style={{
            opacity: ready ? 1 : 0,
            transform: ready ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease 1.45s, transform 0.7s ease 1.45s',
          }}
        >
          <MagneticButton
            className="hero-cta-primary px-7 py-3.5 rounded-lg text-sm tracking-widest uppercase font-medium text-white"
            onClick={() => scrollToSection('projects')}
            aria-label="View my work"
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.16em' }}>
              View My Work
            </span>
          </MagneticButton>

          <MagneticButton
            className="hero-cta-secondary px-7 py-3.5 rounded-lg text-sm tracking-widest uppercase"
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
        style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.7s ease 1.8s' }}
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
        @keyframes avail-pulse { 0%, 100% { box-shadow: 0 0 4px #7c3aed; } 50% { box-shadow: 0 0 16px #7c3aed, 0 0 30px rgba(124,58,237,0.4); } }
        @keyframes photo-ring-pulse { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 0; transform: scale(1.3); } }
      `}</style>
    </section>
  );
}
