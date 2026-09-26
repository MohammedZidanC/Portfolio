'use client';

import MonogramGlyph from './MonogramGlyph';

interface ZMarkProps {
  variant: 'splash' | 'hero';
  className?: string;
  flight?: boolean;
  landing?: boolean;
}

export default function ZMark({ variant, className = '', flight = false, landing = false }: ZMarkProps) {
  return (
    <MonogramGlyph
      instance={variant === 'splash' ? 'splashZ' : 'heroZ'}
      flightLetter={flight ? 'Z' : undefined}
      targetLetter={landing ? 'Z' : undefined}
      className={className}
    />
  );
}
