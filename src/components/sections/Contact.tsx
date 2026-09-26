'use client';
import { useState } from 'react';
import SectionNumber from '@/components/shared/SectionNumber';
import AuroraBlobs from '@/components/ui/AuroraBlobs';
import { personal } from '@/lib/data';

const whatsappLink = 'https://wa.me/918590919142?text=Hi';

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
              color: copied ? 'var(--accent-primary)' : 'var(--text-muted)',
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
              el.style.borderColor = 'rgba(198,167,121,0.48)';
              el.style.boxShadow = '0 0 24px rgba(198,167,121,0.12)';
              el.style.background = 'rgba(198,167,121,0.045)';
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
              el.style.borderColor = 'rgba(216,209,195,0.4)';
              el.style.boxShadow = '0 0 24px rgba(216,209,195,0.1)';
              el.style.background = 'rgba(216,209,195,0.04)';
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
          {/* WhatsApp */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-6 rounded-2xl border text-left transition-all duration-300"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(198,167,121,0.48)';
              e.currentTarget.style.boxShadow = '0 0 24px rgba(198,167,121,0.12)';
              e.currentTarget.style.background = 'rgba(198,167,121,0.045)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.background = 'var(--bg-secondary)';
            }}
            aria-label="Send a WhatsApp message"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--text-primary)', flexShrink: 0 }} aria-hidden="true">
              <path d="M20.52 3.48A11.87 11.87 0 0 0 12.07 0C5.5 0 .15 5.35.15 11.92c0 2.1.55 4.15 1.59 5.96L0 24l6.28-1.65a11.91 11.91 0 0 0 5.79 1.48h.01c6.57 0 11.92-5.35 11.92-11.92 0-3.18-1.24-6.17-3.48-8.43ZM12.08 21.8h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.73.98 1-3.64-.24-.37a9.88 9.88 0 0 1-1.52-5.26c0-5.47 4.45-9.92 9.92-9.92a9.85 9.85 0 0 1 7.02 2.91 9.85 9.85 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.93 9.92Zm5.45-7.43c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.95 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.49s1.08 2.88 1.23 3.08c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
            </svg>
            <div>
              <p className="font-bold mb-0.5" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>WhatsApp</p>
              <p className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>+91 85909 19142</p>
              <p className="text-xs mt-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontSize: '0.62rem' }}>Send me a message →</p>
            </div>
          </a>
          {/* Instagram */}
          <a href="https://instagram.com/notmohammedzidan/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-6 rounded-2xl border text-left transition-all duration-300" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(198,167,121,0.48)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(198,167,121,0.12)'; e.currentTarget.style.background = 'rgba(198,167,121,0.045)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'var(--bg-secondary)'; }} aria-label="View Instagram profile">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--text-primary)', flexShrink: 0 }} aria-hidden="true"><path d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6a5.2 5.2 0 0 1-5.2 5.2H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2Zm0 2A3.2 3.2 0 0 0 4 7.2v9.6A3.2 3.2 0 0 0 7.2 20h9.6a3.2 3.2 0 0 0 3.2-3.2V7.2A3.2 3.2 0 0 0 16.8 4H7.2Zm10.1 1.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 6.9a5.1 5.1 0 1 1 0 10.2 5.1 5.1 0 0 1 0-10.2Zm0 2a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2Z" /></svg>
            <div><p className="font-bold mb-0.5" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>Instagram</p><p className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>@notmohammedzidan</p><p className="text-xs mt-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontSize: '0.62rem' }}>Follow my updates →</p></div>
          </a>
          {/* Facebook */}
          <a href="https://www.facebook.com/profile.php?id=100052712982543" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-6 rounded-2xl border text-left transition-all duration-300" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(216,209,195,0.4)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(216,209,195,0.1)'; e.currentTarget.style.background = 'rgba(216,209,195,0.04)'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'var(--bg-secondary)'; }} aria-label="View Facebook profile">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--text-primary)', flexShrink: 0 }} aria-hidden="true"><path d="M13.7 21v-8.2h2.8l.42-3.2H13.7V7.56c0-.93.26-1.56 1.6-1.56h1.71V3.14A23 23 0 0 0 14.52 3C12.05 3 10.36 4.5 10.36 7.26V9.6H7.6v3.2h2.76V21h3.34Z" /></svg>
            <div><p className="font-bold mb-0.5" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>Facebook</p><p className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>Mohammed Zidan C</p><p className="text-xs mt-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-secondary)', fontSize: '0.62rem' }}>Find me on Facebook →</p></div>
          </a>
        </div>
      </div>

      {/* Toast */}
      {copied && (
        <div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9997] px-6 py-3 rounded-xl flex items-center gap-3"
          style={{
            background: 'rgba(11,11,10,0.95)',
            border: '1px solid rgba(198,167,121,0.36)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 24px rgba(198,167,121,0.12)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--accent-primary)',
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
