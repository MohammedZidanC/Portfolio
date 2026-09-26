'use client';

import { useId } from 'react';
import { markShapes, type MarkInstance } from './mark-shapes';

interface Props {
  instance: MarkInstance;
  className?: string;
  flightLetter?: string;
  targetLetter?: string;
}

/** A crisp, softly tinted vector monogram shared by splash and hero. */
export default function MonogramGlyph({ instance, className = '', flightLetter, targetLetter }: Props) {
  const preset = markShapes[instance];
  const transform = `translate(${preset.position.x * 100} ${preset.position.y * 100}) scale(${preset.scale}) translate(-50 -50)`;
  const reactId = useId().replace(/:/g, '');
  const gradientId = `monogram-${instance}-${reactId}`;

  return (
    <span className={`monogram-glyph ${className}`} data-splash-letter={flightLetter} data-hero-letter={targetLetter} aria-hidden="true">
      <svg className="monogram-glyph-art" viewBox="0 0 100 100" role="presentation">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0.32" y2="1">
            <stop offset="0%" stopColor="#f2f0eb" />
            <stop offset="58%" stopColor="#d8d6d0" />
            <stop offset="100%" stopColor="#aaa9a5" />
          </linearGradient>
        </defs>
        <path
          d={preset.path}
          transform={transform}
          fill={`url(#${gradientId})`}
          stroke="rgba(255,255,255,.14)"
          strokeWidth={preset.boldness}
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
