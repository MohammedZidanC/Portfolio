'use client';
import { useEffect, useRef } from 'react';

interface SkillTagProps {
  label: string;
  color: string;
  isCore?: boolean;
  delay?: number;
}

export default function SkillTag({ label, color, isCore = false, delay = 0 }: SkillTagProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('visible');
          }, delay * 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <span
      ref={ref}
      className={`skill-tag ${isCore ? 'core' : ''}`}
      style={{
        transition: `transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${delay}s, opacity 0.4s ease ${delay}s, border-color 0.25s, color 0.25s, box-shadow 0.25s`,
      }}
    >
      <span
        style={{
          width: 6, height: 6,
          borderRadius: '50%',
          background: isCore ? '#f59e0b' : color,
          display: 'inline-block',
          flexShrink: 0,
        }}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
