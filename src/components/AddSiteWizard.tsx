import React, { useState, useEffect } from 'react';

interface AddSiteWizardProps {
  onComplete: (domain: string, isInstant: boolean) => void;
  onCancel: () => void;
}

export const AddSiteWizard: React.FC<AddSiteWizardProps> = ({
  onComplete,
  onCancel
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<'looking' | 'connected'>('looking');

  // Helper to clean domain
  const cleanDomain = () => {
    let d = url.trim();
    if (!d) return '';
    try {
      if (!d.startsWith('http')) d = 'https://' + d;
      const parsed = new URL(d);
      return parsed.hostname.replace(/^www\./, '');
    } catch {
      return d.replace(/^https?:\/\//i, '').replace(/^www\./i, '').split('/')[0] || '';
    }
  };

  // Generate random 6-character hex suffix site ID
  const [generatedSiteId] = useState(() => {
    const hex = Math.random().toString(16).substring(2, 8);
    const prefix = cleanDomain().slice(0, 3).toLowerCase() || 'site';
    return `${prefix}_${hex}`;
  });

  // Auto-connect on Step 2
  useEffect(() => {
    if (step === 2) {
      setStatus('looking');
      const timer = setTimeout(() => {
        setStatus('connected');
        // Connected automatically — move to Screen 2 (pages) after brief confirmation
        setTimeout(() => {
          onComplete(cleanDomain() || 'zomato.com', false);
        }, 1200);
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleCopySnippet = () => {
    const snippetText = `<script async src="https://cdn.drishti.app/t.js" data-site="${generatedSiteId}"></script>`;
    navigator.clipboard.writeText(snippetText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setStep(2);
  };

  const domain = cleanDomain();

  return (
    <div style={{ minHeight: '80vh', background: '#F5F4F0', padding: '48px 20px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '500px' }}>
        
        {/* Header Branding */}
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', color: '#232046', marginBottom: '26px' }}>
          Drishti<span style={{ color: '#F0A93B' }}>.</span>
        </div>

        {/* Step Indicator */}
        <div style={{ fontSize: '11px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#8A87A0', fontFamily: 'var(--font-heading)', marginBottom: '14px', fontWeight: 600 }}>
          Screen 1 — Connect ({step === 1 ? 'Step 1 of 2' : 'Step 2 of 2'})
        </div>

        {/* Main Card */}
        <div style={{ background: '#fff', border: '1px solid #DDDAE8', borderRadius: '12px', padding: '28px', boxShadow: '0 1px 3px rgba(35,32,70,.07)' }}>
          
          {/* STEP 1: Type the website address (One field, nothing else) */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit}>
              <h3 style={{ margin: '0 0 6px', fontSize: '24px', color: '#232046', fontWeight: 600 }}>
                Type the website address
              </h3>
              <p style={{ margin: '0 0 20px', fontSize: '13.5px', color: '#8A87A0', lineHeight: 1.5 }}>
                Enter the domain you want Drishti to watch.
              </p>

              <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#8A87A0', fontFamily: 'var(--font-heading)', marginBottom: '6px' }}>
                Website address
              </label>
              <input
                autoFocus
                placeholder="shopkart.in"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{ width: '100%', border: '1px solid #DDDAE8', borderRadius: '8px', padding: '12px 13px', fontFamily: 'var(--font-body)', fontSize: '14.5px', color: '#232046', background: '#fff', outline: 'none', marginBottom: '12px' }}
              />
              <p style={{ margin: '0 0 24px', fontSize: '12.5px', color: '#8A87A0', lineHeight: 1.4 }}>
                Drishti reads public pages only — it never sees anything behind a login.
              </p>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <button
                  type="submit"
                  disabled={!url.trim()}
                  className="btn btn-primary"
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    height: '44px',
                    fontSize: '14px',
                    opacity: url.trim() ? 1 : 0.4,
                    cursor: url.trim() ? 'pointer' : 'not-allowed'
                  }}
                >
                  Continue
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  style={{ background: 'transparent', border: 0, color: '#8A87A0', cursor: 'pointer', fontSize: '14px' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Copy the key into the site & Auto-connect */}
          {step === 2 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '6px' }}>
                <h3 style={{ margin: 0, fontSize: '24px', color: '#232046', fontWeight: 600 }}>
                  Copy the key into the site
                </h3>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{ background: 'transparent', border: 0, padding: 0, color: '#8A87A0', textDecoration: 'underline', cursor: 'pointer', fontSize: '12.5px' }}
                >
                  ← Back
                </button>
              </div>

              <p style={{ margin: '0 0 18px', fontSize: '13.5px', color: '#8A87A0', lineHeight: 1.5 }}>
                One line before head close (&lt;/head&gt;).
              </p>

              {/* Snippet Block */}
              <div style={{ background: '#232046', borderRadius: '8px', padding: '16px 18px', color: '#EFEDF3', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#F0A93B', fontFamily: 'var(--font-heading)' }}>
                    Tracking key snippet
                  </span>
                  <button
                    type="button"
                    onClick={handleCopySnippet}
                    style={{
                      background: copied ? '#3E7C55' : 'rgba(239,237,243,.12)',
                      color: copied ? '#fff' : '#EFEDF3',
                      border: 0,
                      borderRadius: '4px',
                      padding: '4px 10px',
                      fontSize: '11.5px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <code style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.7, color: '#EFEDF3', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                  {`<script async src="https://cdn.drishti.app/t.js" data-site="${generatedSiteId}"></script>`}
                </code>
              </div>

              {/* Auto-connect Status */}
              {status === 'looking' ? (
                <div style={{ border: '1px solid #DDDAE8', borderRadius: '8px', padding: '14px 16px', background: '#F5F4F0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F0A93B', display: 'inline-block', animation: 'pulse 1.5s infinite' }}></span>
                  <span style={{ fontSize: '13px', color: '#232046', fontWeight: 500 }}>
                    Connected automatically — listening for ping from {domain}…
                  </span>
                </div>
              ) : (
                <div style={{ border: '1px solid #3E7C55', background: 'rgba(62,124,85,.08)', borderRadius: '8px', padding: '14px 16px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#3E7C55', marginBottom: '2px' }}>
                    ✓ Connected automatically!
                  </div>
                  <p style={{ margin: 0, fontSize: '12.5px', color: '#232046' }}>
                    Opening page analysis dashboard…
                  </p>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Instant Audit Branch (Skips Install) */}
        {step === 2 && (
          <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '12.5px', color: '#8A87A0' }}>
            Instant audit?{' '}
            <button
              type="button"
              onClick={() => onComplete(domain || 'zomato.com', true)}
              style={{ background: 'transparent', border: 0, padding: 0, color: '#232046', textDecoration: 'underline', cursor: 'pointer', fontSize: '12.5px', fontWeight: 600 }}
            >
              Skips install &amp; audits URL directly →
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
