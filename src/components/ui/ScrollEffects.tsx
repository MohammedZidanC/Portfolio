'use client';
import { useEffect } from 'react';

export default function ScrollEffects() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-reveal]'));
    if (!('IntersectionObserver' in window)) {
      targets.forEach(target => target.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.02 });

    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return null;
}
