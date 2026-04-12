'use client';
import SectionNumber from '@/components/shared/SectionNumber';
import SkillTag from '@/components/shared/SkillTag';
import { skills, categoryColors, coreSkills } from '@/lib/data';

const CATEGORY_ORDER = ['Hardware & HDL', 'Programming', 'Tools & Platforms', 'Web & UI', 'Concepts'];

export default function Skills() {
  let globalDelay = 0;

  return (
    <section
      id="skills"
      className="relative circuit-bg"
      style={{ minHeight: '80vh' }}
      aria-label="Skills and technologies"
    >
      <div className="section-wrapper relative">
        <SectionNumber number="02" />

        {/* Header */}
        <div className="mb-16 relative z-10">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-secondary)' }}
          >
            What I Work With
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
          >
            Skills &amp; Technologies
          </h2>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-12 relative z-10">
          {CATEGORY_ORDER.map(category => {
            const tags = skills[category] || [];
            const color = categoryColors[category];

            return (
              <div key={category}>
                {/* Category heading */}
                <div className="flex items-center gap-4 mb-5">
                  <span
                    style={{
                      width: 24, height: 3, borderRadius: 2,
                      background: color, display: 'inline-block', flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                  <h3
                    className="text-sm font-semibold tracking-widest uppercase"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color,
                      fontSize: '0.72rem',
                      letterSpacing: '0.2em',
                    }}
                  >
                    {category}
                  </h3>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2.5">
                  {tags.map(tag => {
                    const delay = globalDelay++ * 0.04;
                    return (
                      <SkillTag
                        key={tag}
                        label={tag}
                        color={color}
                        isCore={coreSkills.includes(tag)}
                        delay={delay}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
