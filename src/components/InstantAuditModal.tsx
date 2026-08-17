import React, { useState } from 'react';
import { Globe, Sparkles, ArrowRight, Loader2, X, Play, CheckCircle } from 'lucide-react';

interface InstantAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunAudit: (url: string) => void;
}

export const InstantAuditModal: React.FC<InstantAuditModalProps> = ({
  isOpen,
  onClose,
  onRunAudit
}) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [passStep, setPassStep] = useState(0);
  const [done, setDone] = useState(false);

  if (!isOpen) return null;

  const sampleSites = [
    { name: 'My Custom E-Commerce Store', url: 'https://mycustomstore.com/checkout' },
    { name: 'Zomato Checkout', url: 'https://zomato.com/checkout' },
    { name: 'Blinkit Instant Cart', url: 'https://blinkit.com/cart' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setPassStep(1);

    setTimeout(() => {
      setPassStep(2);
      setTimeout(() => {
        setPassStep(3);
        setTimeout(() => {
          setPassStep(4);
          setTimeout(() => {
            setLoading(false);
            setDone(true);
            onRunAudit(url);
            setTimeout(() => {
              setDone(false);
              onClose();
            }, 1200);
          }, 600);
        }, 600);
      }, 600);
    }, 600);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        background: 'rgba(35, 32, 70, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '620px',
          padding: '28px',
          position: 'relative',
          background: '#FFFFFF',
          borderRadius: '12px'
        }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', right: '16px', top: '16px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-muted)' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Sparkles size={24} color="#F0A93B" />
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#232046', margin: 0 }}>
            Audit Any New Website URL
          </h2>
        </div>

        <p className="text-muted" style={{ fontSize: '13.5px', marginBottom: '18px', lineHeight: 1.5 }}>
          Enter <strong>any public website URL</strong> below. Drishti's Playwright engine will capture the page DOM, analyze contrast, touch targets, &amp; visual hierarchy, and execute the 4-pass AI Diagnosis pipeline.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          <div style={{ position: 'relative' }}>
            <Globe size={18} color="var(--color-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="url"
              className="input"
              style={{ width: '100%', paddingLeft: '38px', height: '44px', fontSize: '14px', fontFamily: 'var(--font-mono)' }}
              placeholder="https://yourwebsite.com/checkout"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ height: '44px', justifyContent: 'center', fontSize: '14px' }}>
            {loading ? (
              <>
                <Loader2 size={16} className="rage-pulse" /> Running 4-Pass AI Diagnosis...
              </>
            ) : done ? (
              <>
                <CheckCircle size={16} color="#4a7a4a" /> Audit Complete! Loading Dashboard...
              </>
            ) : (
              <>
                <Sparkles size={16} /> Run Instant AI Audit <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Quick Sample Presets */}
        <div style={{ fontSize: '12px', color: 'var(--color-muted)', marginBottom: '14px' }}>
          Quick try sample URLs:
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {sampleSites.map((s) => (
            <button
              key={s.name}
              type="button"
              className="btn"
              style={{ fontSize: '12px', padding: '5px 10px' }}
              onClick={() => {
                setUrl(s.url);
              }}
            >
              <Play size={10} color="#F0A93B" /> {s.name}
            </button>
          ))}
        </div>

        {/* Pass Step Progress */}
        {loading && (
          <div style={{ marginTop: '20px', padding: '14px', background: '#F8FAFC', borderRadius: '6px', border: '1px solid var(--color-divider)' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#232046', marginBottom: '8px' }}>
              Execution Progress:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
              <div style={{ color: passStep >= 1 ? '#4a7a4a' : 'var(--color-muted)', fontWeight: passStep >= 1 ? 600 : 400 }}>
                {passStep >= 1 ? '✓ Pass 1: Visual & WCAG' : '○ Pass 1: Visual & WCAG'}
              </div>
              <div style={{ color: passStep >= 2 ? '#4a7a4a' : 'var(--color-muted)', fontWeight: passStep >= 2 ? 600 : 400 }}>
                {passStep >= 2 ? '✓ Pass 2: Funnel Leaks' : '○ Pass 2: Funnel Leaks'}
              </div>
              <div style={{ color: passStep >= 3 ? '#4a7a4a' : 'var(--color-muted)', fontWeight: passStep >= 3 ? 600 : 400 }}>
                {passStep >= 3 ? '✓ Pass 3: Frustration Signals' : '○ Pass 3: Frustration Signals'}
              </div>
              <div style={{ color: passStep >= 4 ? '#4a7a4a' : 'var(--color-muted)', fontWeight: passStep >= 4 ? 600 : 400 }}>
                {passStep >= 4 ? '✓ Pass 4: Merge & Rank' : '○ Pass 4: Merge & Rank'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
