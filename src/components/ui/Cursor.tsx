'use client';
import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const [state, setState] = useState<'default' | 'hover-link' | 'hover-card'>('default');
  const [visible, setVisible] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let aimX = -100, aimY = -100, ringX = -100, ringY = -100;
    let disposed = false;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    const animateRing = () => {
      raf = 0;
      const dx = aimX - ringX;
      const dy = aimY - ringY;
      ringX += dx * 0.38;
      ringY += dy * 0.38;
      ringRef.current?.style.setProperty('--cursor-x', `${ringX}px`);
      ringRef.current?.style.setProperty('--cursor-y', `${ringY}px`);
      if (!disposed && Math.abs(dx) + Math.abs(dy) > 0.2) raf = requestAnimationFrame(animateRing);
    };
    const queueRing = () => {
      if (!raf && !disposed) raf = requestAnimationFrame(animateRing);
    };

    const onMove = (e: MouseEvent) => {
      aimX = e.clientX; aimY = e.clientY;
      setVisible(true);
      queueRing();
    };

    if (finePointer.matches) window.addEventListener('mousemove', onMove, { passive: true });

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      setState(target?.closest('.project-card') ? 'hover-card' : target?.closest('a, button, input, textarea') ? 'hover-link' : 'default');
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => { if (finePointer.matches && !document.body.classList.contains('certificate-open')) setVisible(true); };
    const modalObserver = new MutationObserver(() => {
      const modalOpen = document.body.classList.contains('certificate-open');
      setVisible(!modalOpen && finePointer.matches);
    });
    modalObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    document.addEventListener('pointerover', onPointerOver, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('mouseenter', onEnter);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('pointerover', onPointerOver);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mouseenter', onEnter);
      modalObserver.disconnect();
    };
  }, []);

  const ringClass = `cursor-ring ${
    state === 'hover-link' ? 'hover-link' :
    state === 'hover-card' ? 'hover-card' : ''
  }`;

  if (!visible) return null;

  return (
    <div
      ref={ringRef}
      className={ringClass}
      aria-hidden="true"
    >
      <span className="cursor-x" />
    </div>
  );
}
