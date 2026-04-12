'use client';
import { useEffect, useRef, useState } from 'react';

export default function Loader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const startRef = useRef<number | null>(null);
  const rafRef   = useRef<number>(0);

  useEffect(() => {
    document.body.classList.add('loading');
    const DURATION = 2600;

    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const pct = Math.min(100, Math.round((elapsed / DURATION) * 100));
      setCount(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // wait a bit then exit
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => {
            document.body.classList.remove('loading');
            onDone();
          }, 800);
        }, 300);
      }
    };

    const handleLoad = () => {
      // ensure counter runs regardless of actual load time
    };

    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener('load', handleLoad);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('load', handleLoad);
    };
  }, [onDone]);

  return (
    <div
      className="loader-overlay"
      style={{
        transform: exiting ? 'scaleY(0)' : 'scaleY(1)',
        transformOrigin: 'top',
        transition: exiting ? 'transform 0.75s cubic-bezier(0.86,0,0.07,1)' : 'none',
      }}
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* SVG MZ letters with stroke animation */}
      <svg
        width="200"
        height="100"
        viewBox="0 0 200 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* M */}
        <path
          d="M10 80 L10 20 L40 55 L70 20 L70 80"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            strokeDasharray: 220,
            strokeDashoffset: 0,
            animation: 'stroke-draw 1.2s ease forwards',
          }}
        />
        {/* Z */}
        <path
          d="M100 20 L180 20 L100 80 L180 80"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            strokeDasharray: 280,
            strokeDashoffset: 0,
            animation: 'stroke-draw 1.2s ease 0.3s forwards',
          }}
        />
      </svg>

      {/* Tagline */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.3em',
          color: 'var(--text-muted)',
          marginTop: '1.5rem',
          animation: 'fade-in 0.6s ease 1s forwards',
          opacity: 0,
        }}
      >
        VLSI · RTL DESIGN · CHIP DESIGN
      </p>

      {/* Counter */}
      <div className="loader-counter" aria-label={`Loading ${count}%`}>
        {String(count).padStart(3, '0')}%
      </div>

      {/* Progress bar */}
      <div
        className="loader-progress-bar"
        style={{ width: `${count}%` }}
        role="progressbar"
        aria-valuenow={count}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <style>{`
        @keyframes stroke-draw {
          from { stroke-dashoffset: 300; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes fade-in {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
