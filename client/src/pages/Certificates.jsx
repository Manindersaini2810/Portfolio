import { useCallback, useEffect, useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { getCertificates } from '../api';
import { fallbackCertificates } from '../data/fallbackData';
import { useApiData } from '../hooks/useApiData';

function CertificateCard({ certificate, onView }) {
  const imageName = certificate.image.split('/').pop() ?? 'certificate image';
  const [imageMissing, setImageMissing] = useState(false);

  return (
    <article className="terminal-card overflow-hidden rounded-lg">
      <button
        type="button"
        onClick={onView}
        className="group relative block h-56 w-full overflow-hidden border-b border-[#00ff41]/20 bg-[#0b0b0b] text-left"
        aria-label={`View certificate: ${certificate.title}`}
      >
        {imageMissing ? (
          <div className="flex h-full items-center justify-center p-4">
            <div className="w-full rounded border border-[#00ff41]/25 bg-[#111] p-5 text-center text-xs leading-6">
              <p className="text-[#00ff41]">$ open {imageName}</p>
              <p className="text-white/50">certificate image not found</p>
            </div>
          </div>
        ) : (
          <img
            src={certificate.image}
            alt={`${certificate.title} certificate`}
            loading="lazy"
            className="h-full w-full object-contain p-3 transition-transform group-hover:scale-[1.02]"
            onError={() => setImageMissing(true)}
          />
        )}
      </button>
      <div className="p-5">
        <h2 className="text-base font-bold text-white">{certificate.title}</h2>
        <p className="mt-2 text-xs text-[#9cffac]">{certificate.issuer}</p>
        <p className="mt-3 text-xs text-white/55">{certificate.achievement}</p>
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={onView}
            className="rounded border border-[#00ff41]/50 px-3 py-2 text-xs text-[#00ff41] hover:bg-[#00ff41] hover:text-black"
          >
            View
          </button>
          <a
            href={certificate.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded border border-white/20 px-3 py-2 text-xs text-white/75 hover:border-[#00ff41] hover:text-[#00ff41]"
          >
            <ExternalLink size={13} aria-hidden="true" />
            Open original
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Certificates() {
  const loadCertificates = useCallback(() => getCertificates(), []);
  const certificates = useApiData(loadCertificates, fallbackCertificates);
  const [selected, setSelected] = useState(null);
  const [selectedImageMissing, setSelectedImageMissing] = useState(false);

  const openCertificate = (certificate) => {
    setSelectedImageMissing(false);
    setSelected(certificate);
  };

  useEffect(() => {
    if (!selected) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [selected]);

  return (
    <div className="page-enter mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8">
        <p className="text-xs text-[#00ff41]">~/portfolio/certs.dat</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Certifications</h1>
        <p className="mt-3 text-sm text-white/55">Credentials and completed learning.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate) => (
          <CertificateCard
            key={`${certificate.title}-${certificate.order}`}
            certificate={certificate}
            onView={() => openCertificate(certificate)}
          />
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
          role="presentation"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-dialog-title"
            className="relative max-h-[92vh] w-full max-w-5xl overflow-auto rounded-xl border border-[#00ff41]/50 bg-[#101010] p-4 shadow-[0_0_35px_rgba(0,255,65,0.12)] sm:p-6"
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 id="certificate-dialog-title" className="text-sm font-bold text-white">
                {selected.title}
              </h2>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close certificate preview"
                className="rounded p-2 text-white/70 hover:bg-white/10 hover:text-[#00ff41]"
                autoFocus
              >
                <X size={20} />
              </button>
            </div>
            {selectedImageMissing ? (
              <p className="py-16 text-center text-sm text-[#9cffac]">
                [ certificate image not found ]
              </p>
            ) : (
              <img
                src={selected.image}
                alt={`${selected.title} certificate`}
                className="mx-auto max-h-[72vh] max-w-full object-contain"
                onError={() => setSelectedImageMissing(true)}
              />
            )}
            <a
              href={selected.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-xs text-[#00ff41] hover:underline"
            >
              <ExternalLink size={14} aria-hidden="true" />
              Open original
            </a>
          </section>
        </div>
      )}
    </div>
  );
}
