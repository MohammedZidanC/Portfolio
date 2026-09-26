'use client';
import { useEffect, useState } from 'react';
import styles from './SiteLogo.module.css';

interface SiteLogoProps {
  scrolled: boolean;
  onClick: () => void;
}

export default function SiteLogo({ scrolled, onClick }: SiteLogoProps) {
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    if (!clicking) return;
    const timer = window.setTimeout(() => setClicking(false), 560);
    return () => window.clearTimeout(timer);
  }, [clicking]);

  return (
    <button
      type="button"
      className={styles.button}
      data-scrolled={scrolled}
      data-clicking={clicking}
      onClick={() => { setClicking(true); onClick(); }}
      aria-label="MZ — back to top"
    >
      <svg className={styles.mark} viewBox="0 0 52 52" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="mz-metal" x1="7" y1="7" x2="43" y2="45" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fffdf8" />
            <stop offset="0.48" stopColor="#d8d1c3" />
            <stop offset="1" stopColor="#b69a6b" />
          </linearGradient>
          <linearGradient id="mz-edge" x1="14" y1="12" x2="38" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff" stopOpacity=".8" />
            <stop offset="1" stopColor="#c6a779" stopOpacity=".58" />
          </linearGradient>
        </defs>
        <path className={styles.frame} d="M15 5.5h21.8L46.5 15v21.8L37 46.5H15L5.5 37V15L15 5.5Z" />
        <path className={styles.depth} d="M11.5 37V15l10.2 10.4L31.5 15v22M27 16.5h13.5L27.4 35.7h13.1" />
        <path className={styles.stroke} d="M11.5 36V14l10.2 10.4L31.5 14v22M27 15.5h13.5L27.4 34.7h13.1" />
        <path className={styles.highlight} d="M12 14h3M31 14h3M40.5 35h-3" />
        <circle className={styles.pin} cx="43.3" cy="8.8" r="1.7" />
      </svg>
      <span className={styles.glint} aria-hidden="true" />
    </button>
  );
}
