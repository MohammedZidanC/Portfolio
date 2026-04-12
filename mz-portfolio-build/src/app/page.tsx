'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

// UI layer
import Loader         from '@/components/ui/Loader';
import ScrollProgress from '@/components/ui/ScrollProgress';
import Navigation     from '@/components/ui/Navigation';

// Sections
import Hero           from '@/components/sections/Hero';
import About          from '@/components/sections/About';
import Skills         from '@/components/sections/Skills';
import Education      from '@/components/sections/Education';
import Projects       from '@/components/sections/Projects';
import Certifications from '@/components/sections/Certifications';
import Contact        from '@/components/sections/Contact';
import Footer         from '@/components/sections/Footer';

// Client-only (needs browser APIs)
const Cursor  = dynamic(() => import('@/components/ui/Cursor'),  { ssr: false });

const NAV_SECTIONS = [
  { id: 'hero',           label: 'Home' },
  { id: 'about',          label: 'About' },
  { id: 'skills',         label: 'Skills' },
  { id: 'education',      label: 'Education' },
  { id: 'projects',       label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact',        label: 'Contact' },
];

export default function HomePage() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Loader — blocks everything until dismissed */}
      {!loaderDone && <Loader onDone={() => setLoaderDone(true)} />}

      {/* Cursor (desktop only, client only) */}
      <Cursor />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Navigation */}
      <Navigation sections={NAV_SECTIONS} />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Education />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
