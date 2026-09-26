'use client';
import { useEffect, useRef, useState } from 'react';
import SiteLogo from './SiteLogo';

interface Props {
  sections: { id: string; label: string }[];
}

export default function Navigation({ sections }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, [sections]);

  useEffect(() => {
    if (mobileMenuRef.current) mobileMenuRef.current.inert = !mobileOpen;
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[5000] px-4 md:px-8 pt-2.5"
      >
        <div className={`nav-shell ${scrolled ? 'is-scrolled' : ''}`}>
          <div className="relative z-10 mx-auto px-5 md:px-7 h-full flex items-center justify-between">
          {/* Logo */}
          <SiteLogo scrolled={scrolled} onClick={() => scrollTo('hero')} />

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`nav-link-underline font-mono text-xs tracking-widest uppercase transition-all duration-200 ${
                  activeSection === s.id ? 'active text-white' : 'text-[var(--text-muted)] hover:text-white'
                }`}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {s.label}
              </button>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span
              className="block h-px w-6 bg-white transition-transform duration-300"
              style={{ transform: mobileOpen ? 'rotate(45deg) translate(3.5px, 3.5px)' : 'none' }}
            />
            <span
              className="block h-px bg-white transition-all duration-300"
              style={{ width: mobileOpen ? '1.5rem' : '1rem', transform: mobileOpen ? 'rotate(-45deg) translate(3.5px, -3.5px)' : 'none' }}
            />
          </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-[4900] flex flex-col items-start justify-center px-8"
        aria-hidden={!mobileOpen}
        style={{
          background: 'var(--bg-primary)',
          clipPath: mobileOpen ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
          transition: 'clip-path 0.75s cubic-bezier(0.86,0,0.07,1)',
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
      >
        <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
          {sections.map((s, i) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="text-left font-display text-5xl font-bold"
              style={{
                fontFamily: 'var(--font-display)',
                color: activeSection === s.id ? 'var(--accent-primary)' : 'var(--text-primary)',
                transform: mobileOpen ? 'translateY(0)' : 'translateY(40px)',
                opacity: mobileOpen ? 1 : 0,
                transition: `transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s, opacity 0.5s ease ${i * 0.07}s`,
              }}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
