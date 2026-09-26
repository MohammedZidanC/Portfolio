'use client';

import { useEffect, useRef, type CSSProperties } from 'react';

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const GLOW_FIELDS = [
  { x: 5, y: 30, radius: 0.82, tone: '105,99,87', className: 'glow-field-one' },
  { x: 96, y: 22, radius: 0.78, tone: '151,113,68', className: 'glow-field-two' },
  { x: 90, y: 92, radius: 0.75, tone: '67,87,83', className: 'glow-field-three' },
  { x: 13, y: 95, radius: 0.72, tone: '120,101,71', className: 'glow-field-four' },
];

export default function ScrollReactiveBackdrop() {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const backdrop = backdropRef.current;
    if (!backdrop) return;

    let educationTop = 0;
    let scrollY = window.scrollY;
    let frame = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      frame = 0;
      const height = window.innerHeight;
      const progress = clamp((scrollY + height * 0.88 - educationTop) / (height * 0.58), 0, 1);
      const animateFields = progress > 0 && !reducedMotion.matches;
      const scrollDistance = reducedMotion.matches ? 0 : clamp(scrollY - educationTop, -height, height * 4);
      backdrop.style.opacity = String(progress * 0.64);
      backdrop.style.setProperty('--field-play-state', animateFields ? 'running' : 'paused');
      backdrop.style.setProperty('--backdrop-parallax', `${-scrollDistance * 0.025}px`);
    };

    const queueUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const measure = () => {
      const education = document.getElementById('education');
      educationTop = education ? education.getBoundingClientRect().top + window.scrollY : window.innerHeight * 2;
      queueUpdate();
    };
    const onScroll = () => {
      scrollY = window.scrollY;
      queueUpdate();
    };
    const onMotionPreferenceChange = () => queueUpdate();

    measure();
    window.addEventListener('resize', measure, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    reducedMotion.addEventListener('change', onMotionPreferenceChange);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', onScroll);
      reducedMotion.removeEventListener('change', onMotionPreferenceChange);
    };
  }, []);

  return (
    <div ref={backdropRef} className="scroll-reactive-backdrop" aria-hidden="true">
      {GLOW_FIELDS.map((field) => (
        <i
          key={field.className}
          className={field.className}
          style={{ left: `${field.x}%`, top: `${field.y}%`, width: `${field.radius * 200}vmin`, height: `${field.radius * 200}vmin`, '--glow-tone': field.tone } as CSSProperties}
        />
      ))}
    </div>
  );
}
