import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, Globe } from 'lucide-react';
import { AuditReport } from '../types/drishti';

interface InstantAuditInputProps {
  onAuditComplete?: (report: AuditReport) => void;
}

export const InstantAuditInput: React.FC<InstantAuditInputProps> = ({ onAuditComplete }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setStep(1);

    setTimeout(() => {
      setStep(2);
      setTimeout(() => {
        setStep(3);
        setTimeout(() => {
          setLoading(false);
          if (onAuditComplete) {
            onAuditComplete({
              id: 'audit-' + Date.now(),
              siteId: 'site-custom',
              siteName: url.replace('https://', '').replace('http://', '').split('/')[0],
              siteUrl: url,
              kpiGoal: 'Order placed · /checkout',
              timestamp: new Date().toISOString(),
              tier: 'instant_audit',
              deviceType: 'desktop',
              viewportWidth: 1440,
              funnelSteps: [],
              domSnapshot: { pageUrl: url, title: 'Audited Page', viewportWidth: 1440, viewportHeight: 900, interactiveElementsCount: 24, elements: [] },
              behavior: { totalSessions: 1000, completedSessions: 520, overallConversionRate: 52.0, averageTimeOnPageSec: 45, exitRatePercentage: 48, formFieldAbandonment: [], rageClicks: [], deadClicks: [], scrollDistribution: [], clicks: [] },
              diagnosis: { executive_summary: 'Audited page analysis complete.', findings: [], fix_first: 'Optimise Checkout CTA', overall_score: 65 }
            });
          }
        }, 600);
      }, 600);
    }, 600);
  };

  return (
    <div className="card" style={{ padding: '24px', background: '#FFFFFF' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ position: 'relative' }}>
          <Globe size={18} color="var(--color-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="url"
            className="input"
            style={{ width: '100%', paddingLeft: '38px', height: '44px', fontSize: '14px', fontFamily: 'var(--font-mono)' }}
            placeholder="https://www.myntra.com/checkout/cart"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ height: '44px', justifyContent: 'center', fontSize: '14px' }}>
          {loading ? (
            <>
              <Loader2 size={16} className="rage-pulse" /> Step {step}/3: Analyzing DOM &amp; Running 4-Pass AI Diagnosis...
            </>
          ) : (
            <>
              <Sparkles size={16} /> Run Instant Audit Scanner <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
