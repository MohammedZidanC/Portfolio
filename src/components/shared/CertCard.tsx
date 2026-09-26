'use client';
import { useRef } from 'react';
import Image from 'next/image';

interface Cert {
  title: string;
  issuer: string;
  date: string;
  tags: string[];
  detail?: string;
  verify?: string;
  pdf?: string;
  preview?: string;
  previewPages?: number;
  type: 'technical' | 'soft' | 'award' | 'membership' | 'community';
}

interface Props {
  cert: Cert;
  index: number;
}

export default function CertCard({ cert, index }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isAward = cert.type === 'award';
  const previewBase = cert.pdf
    ?.replace('/Certifications/', '/CertificationPreviews/')
    .replace(/\.pdf$/i, '');

  const openCertificate = () => {
    if (dialogRef.current && !dialogRef.current.open) {
      document.body.classList.add('certificate-open');
      dialogRef.current.showModal();
    }
  };

  const closeCertificate = () => dialogRef.current?.close();

  return (
    <>
      <div data-scroll-reveal data-tone={index % 3} className={`cert-card ${isAward ? 'award' : ''}`} aria-label={`Certification: ${cert.title}`}>
        {isAward && (
          <div
            className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded mb-3"
            style={{ background: 'rgba(198,167,121,0.12)', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', border: '1px solid rgba(198,167,121,0.28)' }}
          >
            ★ 1st Prize
          </div>
        )}

        <p className="text-xs tracking-widest uppercase mb-1" style={{ fontFamily: 'var(--font-mono)', color: isAward ? 'var(--accent-primary)' : 'var(--accent-secondary)' }}>
          {cert.issuer}
        </p>
        <h3 className="font-bold mb-2 leading-snug" style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
          {cert.title}
        </h3>
        <p className="text-xs mb-3" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          {cert.date}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {cert.tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full border" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.08em', color: isAward ? 'var(--accent-primary)' : 'var(--text-muted)', borderColor: isAward ? 'rgba(198,167,121,0.28)' : 'var(--border)' }}>
              {tag}
            </span>
          ))}
        </div>
        <button
          type="button"
          className="certificate-open-button inline-flex items-center gap-1.5 text-xs tracking-wider uppercase transition-opacity duration-200 hover:opacity-70"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent-primary)' }}
          onClick={openCertificate}
          aria-haspopup="dialog"
          aria-label={`Open ${cert.title} certificate from ${cert.issuer}`}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 2h6l4 4v8H4V2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M10 2v4h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          {cert.pdf ? 'View Certificate' : 'View Credential'} ↗
        </button>
      </div>

      <dialog
        ref={dialogRef}
        className="certificate-dialog"
        aria-labelledby={`certificate-title-${index}`}
        onClick={event => { if (event.target === event.currentTarget) closeCertificate(); }}
        onClose={() => document.body.classList.remove('certificate-open')}
      >
        <header className="certificate-dialog-header">
          <div>
            <p className="certificate-dialog-issuer">{cert.issuer} · {cert.date}</p>
            <h2 id={`certificate-title-${index}`}>{cert.title}</h2>
          </div>
          <button type="button" className="certificate-dialog-close" onClick={() => dialogRef.current?.close()} aria-label="Close certificate preview">×</button>
        </header>
        <div className="certificate-dialog-body">
          <div className="certificate-preview">
            {cert.preview ? (
              <Image src={cert.preview} width={1200} height={1600} sizes="(max-width: 700px) 88vw, 60vw" className="certificate-preview-image" alt={`${cert.title} certificate`} />
            ) : previewBase ? Array.from({ length: cert.previewPages ?? 1 }, (_, pageIndex) => (
              <div className="certificate-preview-page" key={pageIndex}>
                <Image
                  fill
                  src={`${previewBase}${pageIndex === 0 ? '' : `-${pageIndex + 1}`}.webp`}
                  sizes="(max-width: 700px) 92vw, 66vw"
                  className="certificate-preview-image"
                  alt={`${cert.title} certificate, page ${pageIndex + 1}`}
                />
              </div>
            )) : (
              <div className="certificate-record">
                <span>{isAward ? 'REPORTED RECOGNITION' : 'DOCUMENTED CREDENTIAL'}</span>
                <strong>{isAward ? '1st Prize' : 'Certificate of Merit'}</strong>
                <p>{cert.issuer}<br />{cert.date}</p>
                <small>{isAward ? 'Team attribution and event date need confirmation.' : 'The source scan is not published.'}</small>
              </div>
            )}
          </div>
          <div className="certificate-dialog-details">
            <span className="certificate-dialog-label">RECORD DETAILS</span>
            <p>{cert.detail ?? 'Certificate of completion.'}</p>
            <div className="certificate-dialog-tags">{cert.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            {cert.verify && <a href={cert.verify} target="_blank" rel="noopener noreferrer">Verify with issuer ↗</a>}
          </div>
        </div>
      </dialog>
    </>
  );
}
