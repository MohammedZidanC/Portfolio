'use client';
import { useState } from 'react';
import SectionNumber from '@/components/shared/SectionNumber';
import AuroraBlobs from '@/components/ui/AuroraBlobs';
import { personal } from '@/lib/data';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const el = document.createElement('textarea');
      el.value = personal.email;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      aria-label="Contact"
    >
      <AuroraBlobs variant="contact" />

      <div className="section-wrapper relative z-10 text-center">
        <SectionNumber number="06" />

        <div className="mb-10">
          <p
            className="text-xs tracking-widest uppercase mb-4"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}
          >
            Let&apos;s Collaborate
          </p>
          <h2
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
          >
            Get In Touch
          </h2>
          <p
            className="text-base md:text-lg max-w-xl mx-auto"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}
          >
            Want to discuss VLSI, chip design, or any exciting opportunity? I&apos;m always open.
          </p>
        </div>

        {/* Email copy */}
        <div className="flex flex-col items-center mb-14">
          <button
            onClick={copyEmail}
            className="group relative text-2xl md:text-4xl font-bold mb-2 transition-all duration-300"
            style={{
              fontFamily: 'var(--font-display)',
              background: 'linear-gradient(135deg, var(--text-primary), var(--accent-primary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.01em',
              cursor: 'none',
            }}
            aria-label={`Copy email: ${personal.email}`}
          >
            {personal.email}
          </button>
          <span
            className="text-xs tracking-widest transition-all duration-300"
            style={{
              fontFamily: 'var(--font-mono)',
              color: copied ? '#22c55e' : 'var(--text-muted)',
              letterSpacing: '0.15em',
            }}
          >
            {copied ? '✓ COPIED TO CLIPBOARD' : 'CLICK TO COPY'}
          </span>
        </div>

        {/* Link cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {/* GitHub */}
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-6 rounded-2xl border text-left transition-all duration-300"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.borderColor = 'rgba(124,58,237,0.5)';
              el.style.boxShadow = '0 0 30px rgba(124,58,237,0.2)';
              el.style.background = 'rgba(124,58,237,0.06)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.borderColor = 'var(--border)';
              el.style.boxShadow = 'none';
              el.style.background = 'var(--bg-secondary)';
            }}
            aria-label="View GitHub profile"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--text-primary)', flexShrink: 0 }} aria-hidden="true">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            <div>
              <p className="font-bold mb-0.5" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>GitHub</p>
              <p className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>MohammedZidanC</p>
              <p className="text-xs mt-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontSize: '0.62rem' }}>View my repositories →</p>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-6 rounded-2xl border text-left transition-all duration-300"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.borderColor = 'rgba(6,182,212,0.5)';
              el.style.boxShadow = '0 0 30px rgba(6,182,212,0.2)';
              el.style.background = 'rgba(6,182,212,0.06)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.borderColor = 'var(--border)';
              el.style.boxShadow = 'none';
              el.style.background = 'var(--bg-secondary)';
            }}
            aria-label="Connect on LinkedIn"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--text-primary)', flexShrink: 0 }} aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <div>
              <p className="font-bold mb-0.5" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>LinkedIn</p>
              <p className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>Mohammed Zidan C</p>
              <p className="text-xs mt-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-secondary)', fontSize: '0.62rem' }}>Connect with me →</p>
            </div>
          </a>
        </div>
      </div>

      {/* Toast */}
      {copied && (
        <div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9997] px-6 py-3 rounded-xl flex items-center gap-3"
          style={{
            background: 'rgba(10,10,10,0.95)',
            border: '1px solid rgba(34,197,94,0.4)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 30px rgba(34,197,94,0.2)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: '#22c55e',
            letterSpacing: '0.1em',
            animation: 'toast-in 0.3s ease',
          }}
          role="status"
          aria-live="polite"
        >
          ✓ Email copied to clipboard!
        </div>
      )}

      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </section>
  );
}
