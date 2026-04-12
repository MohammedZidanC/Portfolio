'use client';
import { useEffect, useState, useCallback } from 'react';

export default function Cursor() {
  const [pos, setPos]     = useState({ x: -100, y: -100 });
  const [ring, setRing]   = useState({ x: -100, y: -100 });
  const [state, setState] = useState<'default' | 'hover-link' | 'hover-card'>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf: number;
    let aimX = -100, aimY = -100;
    let ringX = -100, ringY = -100;

    const onMove = (e: MouseEvent) => {
      aimX = e.clientX; aimY = e.clientY;
      setPos({ x: aimX, y: aimY });
      if (!visible) setVisible(true);
    };

    const lerp = () => {
      ringX += (aimX - ringX) * 0.12;
      ringY += (aimY - ringY) * 0.12;
      setRing({ x: ringX, y: ringY });
      raf = requestAnimationFrame(lerp);
    };

    raf = requestAnimationFrame(lerp);
    window.addEventListener('mousemove', onMove);

    const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

    const addListeners = () => {
      if (isTouchDevice()) return;
      document.querySelectorAll('a, button, .magnetic-btn, input, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => setState('hover-link'));
        el.addEventListener('mouseleave', () => setState('default'));
      });
      document.querySelectorAll('.project-card').forEach(el => {
        el.addEventListener('mouseenter', () => setState('hover-card'));
        el.addEventListener('mouseleave', () => setState('default'));
      });
    };

    addListeners();

    const mo = new MutationObserver(addListeners);
    mo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mouseleave', () => setVisible(false));
    window.addEventListener('mouseenter', () => setVisible(true));

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      mo.disconnect();
    };
  }, [visible]);

  const ringClass = `cursor-ring ${
    state === 'hover-link' ? 'hover-link' :
    state === 'hover-card' ? 'hover-card' : ''
  }`;

  if (!visible) return null;

  return (
    <>
      <div
        className="cursor-dot"
        style={{ left: pos.x, top: pos.y }}
        aria-hidden="true"
      />
      <div
        className={ringClass}
        style={{ left: ring.x, top: ring.y }}
        aria-hidden="true"
      />
    </>
  );
}
