'use client';

import { memo, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import MMark from '@/components/sections/hero-mark/MMark';
import ZMark from '@/components/sections/hero-mark/ZMark';

const LoaderGradient = dynamic(() => import('./LoaderGradient'), { ssr: false });
const StableLoaderGradient = memo(LoaderGradient);

interface LoaderProps {
  onFlightStart: () => void;
  onMarkLanded: () => void;
  onDone: () => void;
}

type FlightMark = {
  letter: 'M' | 'Z';
  left: number;
  top: number;
  width: number;
  height: number;
  dx: number;
  dy: number;
};

export default function Loader({ onFlightStart, onMarkLanded, onDone }: LoaderProps) {
  const [exiting, setExiting] = useState(false);
  const [flightMarks, setFlightMarks] = useState<FlightMark[]>([]);
  const statusRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const meterRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.classList.add('loading');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reducedMotion ? 500 : 4400;
    const flightDuration = reducedMotion ? 0 : 1250;
    let frame = 0;
    let flightFrame = 0;
    let landTimer = 0;
    let doneTimer = 0;
    let watchdogTimer = 0;
    let startedAt = 0;
    let lastCount = -1;
    let sequenceStarted = false;

    const tick = (now: number) => {
      if (!startedAt) startedAt = now;
      const nextCount = Math.min(100, Math.round(((now - startedAt) / duration) * 100));
      if (nextCount !== lastCount) {
        lastCount = nextCount;
        if (statusRef.current) statusRef.current.textContent = nextCount < 100 ? 'INITIALIZING PORTFOLIO' : 'READY TO EXPLORE';
        if (countRef.current) countRef.current.textContent = String(nextCount).padStart(3, '0');
        progressRef.current?.setAttribute('aria-valuenow', String(nextCount));
        if (meterRef.current) meterRef.current.style.transform = `scaleX(${nextCount / 100})`;
      }
      if (nextCount < 100) {
        frame = window.requestAnimationFrame(tick);
        return;
      }

      sequenceStarted = true;
      window.clearTimeout(watchdogTimer);
      onFlightStart();

      if (!reducedMotion) {
        const marks: FlightMark[] = (['M', 'Z'] as const).flatMap(letter => {
          const source = document.querySelector<HTMLElement>(`[data-splash-letter="${letter}"]`);
          const target = document.querySelector<HTMLElement>(`[data-hero-letter="${letter}"]`);
          if (!source || !target) return [];
          const from = source.getBoundingClientRect();
          const to = target.getBoundingClientRect();
          if (!from.width || !from.height || !to.width || !to.height) return [];
          return [{
            letter,
            left: from.left,
            top: from.top,
            width: from.width,
            height: from.height,
            dx: to.left + to.width / 2 - (from.left + from.width / 2),
            dy: to.top + to.height / 2 - (from.top + from.height / 2),
          }];
        });

        setFlightMarks(marks);
        flightFrame = window.requestAnimationFrame(() => {
          flightFrame = window.requestAnimationFrame(() => {
            marks.forEach(({ letter, dx, dy }) => {
              const mark = document.querySelector<HTMLElement>(`[data-flight-mark="${letter}"]`);
              mark?.animate(
                [{ transform: 'translate3d(0, 0, 0)' }, { transform: `translate3d(${dx}px, ${dy}px, 0)` }],
                { duration: flightDuration, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' },
              );
            });
          });
        });
      }

      // The splash fades independently while the same-sized marks travel above it.
      setExiting(true);
      landTimer = window.setTimeout(() => {
        setFlightMarks([]);
        onMarkLanded();
      }, flightDuration + (reducedMotion ? 0 : 35));
      doneTimer = window.setTimeout(() => {
        document.body.classList.remove('loading');
        onDone();
      }, flightDuration + (reducedMotion ? 360 : 50));
    };

    // Keep a slow or suspended mobile animation frame from leaving the page hidden.
    watchdogTimer = window.setTimeout(() => {
      if (sequenceStarted) return;
      sequenceStarted = true;
      setFlightMarks([]);
      setExiting(true);
      onFlightStart();
      onMarkLanded();
      document.body.classList.remove('loading');
      onDone();
    }, duration + flightDuration + 900);

    frame = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(flightFrame);
      window.clearTimeout(landTimer);
      window.clearTimeout(doneTimer);
      window.clearTimeout(watchdogTimer);
      document.body.classList.remove('loading');
    };
  }, [onFlightStart, onMarkLanded, onDone]);

  return (
    <>
      <div className={`loader-overlay${exiting ? ' is-exiting' : ''}`} aria-live="polite" aria-label="Opening Mohammed Zidan's portfolio">
        <div className="loader-frame">
          <div className="loader-gradient-base" aria-hidden="true" />
          <StableLoaderGradient />
          <header className="loader-masthead">
            <span><i /> MZ / ENGINEERING PORTFOLIO</span>
            <span>WAYANAD, KERALA</span>
          </header>

          <div className="loader-center">
            <p className="loader-kicker"><i /> VLSI · RTL · DIGITAL SYSTEMS</p>
            <div className="loader-insignia" aria-label="MZ">
              <MMark variant="splash" flight className="loader-mark-letter" />
              <ZMark variant="splash" flight className="loader-mark-letter" />
              <i />
            </div>
            <div className="loader-rule" aria-hidden="true"><i /></div>
            <p className="loader-process">DESIGN <i /> VERIFY <i /> REFINE</p>
          </div>

          <footer className="loader-footer">
            <div className="loader-footer-meta">
              <span ref={statusRef}>INITIALIZING PORTFOLIO</span>
              <span><span ref={countRef}>000</span><b>%</b></span>
            </div>
            <div ref={progressRef} className="loader-meter" role="progressbar" aria-label="Portfolio loading" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
              <i ref={meterRef} />
            </div>
          </footer>
        </div>
      </div>

      {flightMarks.map(mark => (
        <div
          key={mark.letter}
          className="loader-flight-mark"
          data-flight-mark={mark.letter}
          style={{ left: mark.left, top: mark.top, width: mark.width, height: mark.height }}
          aria-hidden="true"
        >
          {mark.letter === 'M'
            ? <MMark variant="splash" className="loader-flight-glyph" />
            : <ZMark variant="splash" className="loader-flight-glyph" />}
        </div>
      ))}
    </>
  );
}
