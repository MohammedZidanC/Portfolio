import Image from 'next/image';
import SectionNumber from '@/components/shared/SectionNumber';
import { badges } from '@/lib/data';

export default function Badges() {
  return (
    <section
      id="badges"
      className="relative"
      style={{ minHeight: '70vh' }}
      aria-label="Verified badges"
    >
      <div className="section-wrapper relative">
        <SectionNumber number="06" />

        <div className="mb-12 relative z-10">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-secondary)' }}
          >
            Verified learning
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
          >
            Badges
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 relative z-10">
          {badges.map((badge) => (
            <a
              key={badge.title}
              href={badge.verify}
              target="_blank"
              rel="noopener noreferrer"
              className="badge-card group flex items-center gap-5 p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300"
              aria-label={`${badge.title}, earned ${badge.earned}. Open verification page.`}
            >
              <span className="badge-artwork relative block shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={badge.image}
                  alt={`${badge.title} badge`}
                  width={400}
                  height={400}
                  sizes="(max-width: 640px) 104px, 144px"
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="min-w-0 py-2">
                <span
                  className="block text-xs tracking-widest uppercase mb-2"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}
                >
                  {badge.issuer}
                </span>
                <span
                  className="block text-lg sm:text-xl font-semibold leading-snug mb-3"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
                >
                  {badge.title}
                </span>
                <span className="flex items-center justify-between gap-3">
                  <span
                    className="text-xs tracking-wide"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}
                  >
                    Earned {badge.earned}
                  </span>
                  <span
                    className="text-xs transition-transform duration-300 group-hover:translate-x-1"
                    style={{ color: 'var(--accent-primary)' }}
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
