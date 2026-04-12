'use client';

interface MarqueeProps {
  text: string;
  reverse?: boolean;
  className?: string;
}

export default function Marquee({ text, reverse = false, className = '' }: MarqueeProps) {
  const doubled = text + text;
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <span
        className={reverse ? 'marquee-track-rev' : 'marquee-track'}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          color: 'var(--text-muted)',
        }}
        aria-hidden="true"
      >
        {doubled}
      </span>
    </div>
  );
}
