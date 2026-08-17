import React, { useState } from 'react';

interface AddSiteWizardProps {
  onComplete: (domain: string, goal: string, successUrl: string, isInstant: boolean) => void;
  onCancel: () => void;
}

export const AddSiteWizard: React.FC<AddSiteWizardProps> = ({
  onComplete,
  onCancel
}) => {
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState('');
  const [goal, setGoal] = useState('Purchase completed');
  const [successPage, setSuccessPage] = useState('/order-confirmation');
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const goalPresets = [
    { label: 'Purchase completed', url: '/order-confirmation' },
    { label: 'Signup finished', url: '/welcome' },
    { label: 'Form submitted', url: '/thank-you' }
  ];

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleVerifySnippet = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 1200);
  };

  const cleanDomain = () => {
    let d = url.trim();
    try {
      if (!d.startsWith('http')) d = 'https://' + d;
      const parsed = new URL(d);
      return parsed.hostname.replace('www.', '');
    } catch {
      return d.replace('https://', '').replace('http://', '').split('/')[0] || 'mysite.com';
    }
  };

  const generatedSiteId = cleanDomain().slice(0, 3) + '_9f4c21';

  return (
    <div style={{ minHeight: '80vh', background: '#F5F4F0', padding: '48px 20px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '520px' }}>
        
        {/* Header Logo */}
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', color: '#232046', marginBottom: '26px' }}>
          Drishti<span style={{ color: '#F0A93B' }}>.</span>
        </div>

        {/* Step Progress Tracker */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          {[1, 2, 3].map((s) => {
            const isDone = step > s || (step === 3 && verified);
            const isCurrent = step === s;
            return (
              <div key={s} style={{ display: 'flex', alignItems: 'center', flex: s < 3 ? 1 : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                  <span
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: isDone ? '#4a7a4a' : isCurrent ? '#232046' : '#cbd5e1',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {isDone ? '✓' : s}
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: isCurrent ? 700 : 400, color: isCurrent ? '#232046' : '#64748b' }}>
                    {s === 1 ? 'Add site' : s === 2 ? 'Set goal' : 'Install'}
                  </span>
                </div>
                {s < 3 && <span style={{ flex: 1, height: '1px', background: '#cbd5e1', margin: '0 12px' }}></span>}
              </div>
            );
          })}
        </div>

        {/* Card Box */}
        <div style={{ background: '#fff', border: '1px solid #DDDAE8', borderRadius: '12px', padding: '28px', boxShadow: '0 1px 3px rgba(35,32,70,.07)' }}>
          
          {/* STEP 1: Add Site URL */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit}>
              <h3 style={{ margin: '0 0 6px', fontSize: '24px', color: '#232046' }}>Which site do you want to analyse?</h3>
              <p style={{ margin: '0 0 20px', fontSize: '13.5px', color: '#8A87A0' }}>Enter the address people visit. You can add more sites later.</p>

              <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#8A87A0', fontFamily: 'var(--font-heading)', marginBottom: '6px' }}>
                Website address
              </label>
              <input
                autoFocus
                placeholder="https://shopkart.in"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{ width: '100%', border: '1px solid #DDDAE8', borderRadius: '8px', padding: '12px 13px', fontFamily: 'var(--font-body)', fontSize: '14.5px', color: '#232046', background: '#fff', outline: 'none' }}
                required
              />
              <p style={{ margin: '9px 0 20px', fontSize: '12.5px', color: '#8A87A0', lineHeight: 1.5 }}>
                Use your live site. Drishti reads public pages only — it never sees anything behind a login.
              </p>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" onClick={onCancel} style={{ background: 'transparent', border: 0, color: '#8A87A0', cursor: 'pointer', fontSize: '14px' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', height: '44px', fontSize: '14px' }}>
                  Continue
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Goal Definition */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit}>
              <h3 style={{ margin: '0 0 6px', fontSize: '24px', color: '#232046' }}>What should visitors complete?</h3>
              <p style={{ margin: '0 0 18px', fontSize: '13.5px', color: '#8A87A0' }}>Drishti measures every drop-off against this goal.</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
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

              <label style={{ display: 'block', fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#8A87A0', fontFamily: 'var(--font-heading)', marginBottom: '6px' }}>
                Success page
              </label>
              <input
                value={successPage}
                onChange={(e) => setSuccessPage(e.target.value)}
                style={{ width: '100%', border: '1px solid #DDDAE8', borderRadius: '8px', padding: '12px 13px', fontFamily: 'var(--font-mono)', fontSize: '13.5px', color: '#232046', background: '#fff', outline: 'none' }}
              />
              <p style={{ margin: '9px 0 20px', fontSize: '12.5px', color: '#8A87A0' }}>Reaching this page counts as a completed goal.</p>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button type="button" onClick={() => setStep(1)} style={{ background: 'transparent', border: 0, color: '#8A87A0', cursor: 'pointer', fontSize: '14px' }}>
                  Back
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', height: '44px', fontSize: '14px' }}>
                  Continue
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Tracking Snippet & Verification */}
          {step === 3 && (
            <div>
              <h3 style={{ margin: '0 0 6px', fontSize: '24px', color: '#232046' }}>Add one line to your site</h3>
              <p style={{ margin: '0 0 18px', fontSize: '13.5px', color: '#8A87A0' }}>Paste this just before the closing head tag, then publish.</p>

              <div style={{ background: '#232046', borderRadius: '8px', padding: '16px 18px', color: '#EFEDF3', marginBottom: '16px' }}>
                <div style={{ fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#F0A93B', fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>
                  Your tracking snippet
                </div>
                <code style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.7, color: '#EFEDF3', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                  {`<script async src="https://cdn.drishti.app/t.js" data-site="${generatedSiteId}"></script>`}
                </code>
              </div>

              {!verified ? (
                <div>
                  <button onClick={handleVerifySnippet} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', height: '44px', fontSize: '14px' }}>
                    {verifying ? 'Checking live site...' : 'Verify installation ping'}
                  </button>
                  <p style={{ margin: '9px 0 0', fontSize: '12.5px', color: '#8A87A0', textAlign: 'center' }}>
                    Publish your site first, then run the check. It takes a few seconds.
                  </p>
                </div>
              ) : (
                <div>
                  <div style={{ border: '1px solid #3E7C55', background: 'rgba(62,124,85,.08)', borderRadius: '8px', padding: '14px 16px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#3E7C55', marginBottom: '4px' }}>
                      ✓ Snippet is live and receiving pings!
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: '#232046' }}>
                      First ping received from {cleanDomain()}. Real user events are flushing to your dashboard.
                    </p>
                  </div>

                  <button
                    onClick={() => onComplete(cleanDomain(), goal, successPage, false)}
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

        {/* Instant Audit Escape Tile */}
        <div style={{ marginTop: '18px', border: '1px solid #DDDAE8', borderRadius: '10px', padding: '16px', background: '#fff' }}>
          <p style={{ margin: '0 0 10px', fontSize: '12.5px', color: '#8A87A0', lineHeight: 1.5 }}>
            Can't install anything yet? Skip the snippet — we capture your pages from the URL and give you an instant audit now. You can install later to confirm findings with real behavior.
          </p>
          <button
            onClick={() => onComplete(cleanDomain() || 'mycustomsite.com', goal, successPage, true)}
            className="btn btn-secondary"
            style={{ width: '100%', justifyContent: 'center', borderColor: '#F0A93B', color: '#7d5411' }}
          >
            ⚡ Run an instant audit instead
          </button>
        </div>

      </div>
    </div>
  );
};
