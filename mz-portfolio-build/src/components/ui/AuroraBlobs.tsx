'use client';

export default function AuroraBlobs({ variant = 'hero' }: { variant?: 'hero' | 'contact' }) {
  const configs = variant === 'hero'
    ? [
        { cls: 'aurora-blob-1', style: { top: '-150px', left: '-100px' } },
        { cls: 'aurora-blob-2', style: { bottom: '-100px', right: '-100px' } },
        { cls: 'aurora-blob-3', style: { top: '30%', right: '15%' } },
      ]
    : [
        { cls: 'aurora-blob-1', style: { bottom: '-150px', right: '-100px' } },
        { cls: 'aurora-blob-2', style: { top: '-100px', left: '-100px' } },
        { cls: 'aurora-blob-3', style: { bottom: '20%', left: '20%' } },
      ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {configs.map(({ cls, style }, i) => (
        <div key={i} className={`aurora-blob ${cls}`} style={style} />
      ))}
    </div>
  );
}
