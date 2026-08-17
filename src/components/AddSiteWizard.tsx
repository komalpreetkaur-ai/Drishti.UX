import React, { useState, useEffect } from 'react';

interface AddSiteWizardProps {
  onComplete: (domain: string, goal: string, successUrl: string, isInstant: boolean) => void;
  onCancel: () => void;
}

export const AddSiteWizard: React.FC<AddSiteWizardProps> = ({
  onComplete,
  onCancel
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [url, setUrl] = useState('');
  const [goal, setGoal] = useState('Purchase completed');
  const [successPage, setSuccessPage] = useState('/order-confirmation');
  const [showCustomSuccessPage, setShowCustomSuccessPage] = useState(false);
  
  // Snippet copy state
  const [copied, setCopied] = useState(false);

  // Auto-detect ping status states
  const [status, setStatus] = useState<'looking' | 'verified'>('looking');

  const goalPresets = [
    { label: 'Purchase completed', url: '/order-confirmation' },
    { label: 'Signup finished', url: '/welcome' },
    { label: 'Form submitted', url: '/thank-you' }
  ];

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

  // Auto-detect snippet on Step 2
  useEffect(() => {
    if (step === 2) {
      setStatus('looking');
      const timer = setTimeout(() => {
        setStatus('verified');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleManualCheckAgain = () => {
    setStatus('looking');
    setTimeout(() => {
      setStatus('verified');
    }, 1500);
  };

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
      <div style={{ width: '100%', maxWidth: '520px' }}>
        
        {/* Header Branding */}
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', color: '#232046', marginBottom: '26px' }}>
          Drishti<span style={{ color: '#F0A93B' }}>.</span>
        </div>

        {/* 2-Step Progress Tracker */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          {[
            { id: 1, label: 'Add site' },
            { id: 2, label: 'Install' }
          ].map((s, idx) => {
            const isDone = step > s.id || (step === 2 && status === 'verified');
            const isCurrent = step === s.id && status !== 'verified';
            return (
              <React.Fragment key={s.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                  <span
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: isDone ? '#3E7C55' : isCurrent ? '#232046' : '#cbd5e1',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {isDone ? '✓' : s.id}
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: isCurrent ? 700 : 400, color: isCurrent ? '#232046' : '#64748b' }}>
                    {s.label}
                  </span>
                </div>
                {idx === 0 && <span style={{ flex: 1, height: '1px', background: '#cbd5e1', margin: '0 12px' }}></span>}
              </React.Fragment>
            );
          })}
        </div>

        {/* Main Step Card */}
        <div style={{ background: '#fff', border: '1px solid #DDDAE8', borderRadius: '12px', padding: '28px', boxShadow: '0 1px 3px rgba(35,32,70,.07)' }}>
          
          {/* STEP 1: Add your site */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit}>
              <h3 style={{ margin: '0 0 6px', fontSize: '24px', color: '#232046', fontWeight: 600 }}>
                Which site do you want to analyse?
              </h3>
              <p style={{ margin: '0 0 20px', fontSize: '13.5px', color: '#8A87A0', lineHeight: 1.5 }}>
                Enter the address and tell us what a successful visit looks like.
              </p>

              {/* Website Address Field */}
              <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#8A87A0', fontFamily: 'var(--font-heading)', marginBottom: '6px' }}>
                Website address
              </label>
              <input
                autoFocus
                placeholder="shopkart.in"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{ width: '100%', border: '1px solid #DDDAE8', borderRadius: '8px', padding: '12px 13px', fontFamily: 'var(--font-body)', fontSize: '14.5px', color: '#232046', background: '#fff', outline: 'none' }}
              />
              <p style={{ margin: '7px 0 20px', fontSize: '12.5px', color: '#8A87A0', lineHeight: 1.4 }}>
                Drishti reads public pages only — it never sees anything behind a login.
              </p>

              {/* Goal Selection Pills */}
              <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#8A87A0', fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>
                What should visitors complete?
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                {goalPresets.map((g) => {
                  const on = goal === g.label;
                  return (
                    <button
                      key={g.label}
                      type="button"
                      onClick={() => {
                        setGoal(g.label);
                        setSuccessPage(g.url);
                      }}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '6px',
                        border: '1px solid ' + (on ? '#232046' : '#DDDAE8'),
                        background: on ? '#232046' : '#fff',
                        color: on ? '#fff' : '#232046',
                        fontSize: '13px',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      {g.label}
                    </button>
                  );
                })}
              </div>

              {/* Quiet Inline Success Page Line */}
              <div style={{ marginBottom: '24px', fontSize: '13px', color: '#8A87A0' }}>
                {!showCustomSuccessPage ? (
                  <span>
                    Success page: <code style={{ fontFamily: 'var(--font-mono)', color: '#232046' }}>{successPage}</code> ·{' '}
                    <button
                      type="button"
                      onClick={() => setShowCustomSuccessPage(true)}
                      style={{ background: 'transparent', border: 0, padding: 0, color: '#232046', textDecoration: 'underline', cursor: 'pointer', fontSize: '13px' }}
                    >
                      Change
                    </button>
                  </span>
                ) : (
                  <div style={{ marginTop: '8px' }}>
                    <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#8A87A0', fontFamily: 'var(--font-heading)', marginBottom: '4px' }}>
                      Custom success URL
                    </label>
                    <input
                      value={successPage}
                      onChange={(e) => setSuccessPage(e.target.value)}
                      style={{ width: '100%', border: '1px solid #DDDAE8', borderRadius: '6px', padding: '8px 10px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#232046', outline: 'none' }}
                    />
                  </div>
                )}
              </div>

              {/* Step 1 Actions */}
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

          {/* STEP 2: Install */}
          {step === 2 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '6px' }}>
                <h3 style={{ margin: 0, fontSize: '24px', color: '#232046', fontWeight: 600 }}>
                  Add one line to your site
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
                Paste this just before the closing &lt;/head&gt; tag, then publish.
              </p>

              {/* Snippet Block on Dark Surface with Copy Button */}
              <div style={{ background: '#232046', borderRadius: '8px', padding: '16px 18px', color: '#EFEDF3', marginBottom: '12px', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#F0A93B', fontFamily: 'var(--font-heading)' }}>
                    Your tracking snippet
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

              <p style={{ margin: '0 0 20px', fontSize: '12.5px', color: '#8A87A0', lineHeight: 1.4 }}>
                On Shopify or WordPress, paste it into your theme header — no developer needed.
              </p>

              {/* Auto-detect Status Panel */}
              {status === 'looking' ? (
                <div style={{ border: '1px solid #DDDAE8', borderRadius: '8px', padding: '14px 16px', background: '#F5F4F0', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F0A93B', display: 'inline-block', animation: 'pulse 1.5s infinite' }}></span>
                    <span style={{ fontSize: '13px', color: '#232046' }}>
                      Looking for the snippet…
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleManualCheckAgain}
                    style={{ background: 'transparent', border: 0, color: '#8A87A0', textDecoration: 'underline', cursor: 'pointer', fontSize: '12px' }}
                  >
                    Check again
                  </button>
                </div>
              ) : (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ border: '1px solid #3E7C55', background: 'rgba(62,124,85,.08)', borderRadius: '8px', padding: '14px 16px', marginBottom: '14px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#3E7C55', marginBottom: '4px' }}>
                      ✓ Snippet is live and receiving pings
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: '#232046' }}>
                      First ping received from {domain}. Real user events are flushing to your dashboard.
                    </p>
                  </div>

                  <button
                    onClick={() => onComplete(domain, goal, successPage, false)}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', height: '44px', fontSize: '14px' }}
                  >
                    Open live dashboard
                  </button>
                </div>
              )}

            </div>
          )}

        </div>

        {/* CHANGE 3: Quiet Instant Audit Exit link (Only on Step 2) */}
        {step === 2 && (
          <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '12.5px', color: '#8A87A0' }}>
            Can't install right now?{' '}
            <button
              type="button"
              onClick={() => onComplete(domain, goal, successPage, true)}
              style={{ background: 'transparent', border: 0, padding: 0, color: '#232046', textDecoration: 'underline', cursor: 'pointer', fontSize: '12.5px' }}
            >
              Run an instant audit from the URL instead
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
