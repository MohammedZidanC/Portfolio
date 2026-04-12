'use client';
import SectionNumber from '@/components/shared/SectionNumber';
import CertCard from '@/components/shared/CertCard';
import { certifications } from '@/lib/data';

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative"
      style={{ minHeight: '80vh' }}
      aria-label="Certifications and achievements"
    >
      <div className="section-wrapper relative">
        <SectionNumber number="05" />

        {/* Header */}
        <div className="mb-16 relative z-10">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-secondary)' }}
          >
            Credentials
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
          >
            Certifications &amp; Achievements
          </h2>
        </div>

        {/* Grid — 3 columns desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
          {certifications.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
