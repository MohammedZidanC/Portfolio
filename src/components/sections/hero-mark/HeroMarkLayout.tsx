'use client';

import styles from './HeroMarkLayout.module.css';
import MMark from './MMark';
import ZMark from './ZMark';

interface HeroMarkLayoutProps {
  namesRevealed: boolean;
  marksVisible: boolean;
}

/** Dedicated M/Z nameplate layout. Adjust each initial and suffix independently here. */
export default function HeroMarkLayout({ namesRevealed, marksVisible }: HeroMarkLayoutProps) {
  return (
    <h1 className={styles.lockup} aria-label="Mohammed Zidan C.">
      <span className={styles.namePair}>
        <MMark variant="hero" landing className={`${styles.initial}${marksVisible ? '' : ` ${styles.initialHidden}`}`} />
        <span className={`${styles.continuation}${namesRevealed ? ` ${styles.revealed}` : ''}`} aria-hidden="true">ohammed</span>
      </span>
      <span className={styles.namePair}>
        <ZMark variant="hero" landing className={`${styles.initial}${marksVisible ? '' : ` ${styles.initialHidden}`}`} />
        <span className={`${styles.continuation}${namesRevealed ? ` ${styles.revealed}` : ''}`} aria-hidden="true">idan C.</span>
      </span>
    </h1>
  );
}
