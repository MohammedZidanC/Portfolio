'use client';
import { useRef, useEffect, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  'aria-label'?: string;
}

export default function MagneticButton({ children, className = '', href, onClick, type = 'button', 'aria-label': ariaLabel }: Props) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top  + rect.height / 2);
      el.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`;
      el.style.transition = 'transform 0.1s ease';
    };

    const onLeave = () => {
      el.style.transform = 'translate(0, 0)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  if (href) {
    return (
      <a
        ref={ref as any}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`magnetic-btn ${className}`}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as any}
      type={type}
      onClick={onClick}
      className={`magnetic-btn ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
