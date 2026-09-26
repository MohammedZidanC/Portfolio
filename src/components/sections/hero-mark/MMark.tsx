'use client';

import MonogramGlyph from './MonogramGlyph';

interface MMarkProps {
  variant: 'splash' | 'hero';
  className?: string;
  flight?: boolean;
  landing?: boolean;
}

export default function MMark({ variant, className = '', flight = false, landing = false }: MMarkProps) {
  return (
    <MonogramGlyph
      instance={variant === 'splash' ? 'splashM' : 'heroM'}
      flightLetter={flight ? 'M' : undefined}
      targetLetter={landing ? 'M' : undefined}
      className={className}
    />
  );
}
