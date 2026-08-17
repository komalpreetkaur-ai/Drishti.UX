import React, { useState } from 'react';
import { SiteDataset, DeviceType, OverlayType, Finding, SignalData } from '../types/drishti';
import { BLOBS, SCROLL } from '../services/drishtiData';

interface PageDetailTabProps {
  site: SiteDataset;
  device: DeviceType;
  range: string;
  onBackToPages: () => void;
}

export const PageDetailTab: React.FC<PageDetailTabProps> = ({
  site,
  device,
  range,
  onBackToPages
}) => {
  const [overlay, setOverlay] = useState<OverlayType>('click');
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);

  const blobs = BLOBS[device];
  const scrollData = SCROLL[device];
  const signals = device === 'mobile' ? site.mobileSignals : site.desktopSignals;

  const isMobile = device === 'mobile';
  const isMyntra = site.domain.includes('myntra');
  const isBakingo = site.domain.includes('bakingo');
  const frameWidth = isMobile ? '390px' : '620px';

  // Handle Download the report (PDF or CSV, same page)
  const handleDownloadReport = (format: 'PDF' | 'CSV') => {
    setDownloadingFormat(format);
    setTimeout(() => {
      setDownloadingFormat(null);
      if (format === 'PDF') {
        window.print();
      } else {
        const csvContent = `domain,page,sessions,abandonment_rate,revenue_loss,rage_clicks\n${site.domain},/checkout#payment,24810,41.2%,₹18.4L/mo,1208\n`;
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `drishti-${site.domain.replace(/\./g, '-')}-report.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }, 400);
  };

  const getSevColor = (sev: string) => {
    switch (sev) {
      case 'Critical': return '#8d2f2f';
      case 'High': return '#a06f24';
      case 'Medium': return '#605d5d';
      default: return '#7d7979';
    }
  };

  return (
    <main style={{ padding: '34px 40px 60px', maxWidth: '1180px' }}>
      
      {/* Header Bar with Download Report (same page) */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', marginBottom: '14px' }}>
        <div>
          <button
            onClick={onBackToPages}
            style={{ background: 'transparent', border: 0, padding: '0 0 6px', cursor: 'pointer', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '11.5px', color: '#7d5411' }}
          >
            ← Back to Screen 2 (Pages)
          </button>
          <div style={{ fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#7d7979', fontFamily: 'var(--font-heading)', marginBottom: '4px' }}>
            Screen 3 — Page Detail
          </div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>{site.domain} /checkout#payment</h2>
          <p className="text-muted" style={{ margin: '4px 0 0', fontSize: '13px' }}>
            Stats, Heatmap &amp; AI Findings for the #1 Worst Page · {range}
          </p>
        </div>

        {/* Download the report (PDF or CSV, same page) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--color-surface)', border: '1px solid var(--color-divider)', padding: '10px 14px', borderRadius: 'var(--radius-md)' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#232046' }}>Download report:</span>
          <button
            onClick={() => handleDownloadReport('PDF')}
            disabled={downloadingFormat === 'PDF'}
            className="btn btn-primary"
            style={{ padding: '5px 12px', fontSize: '12px' }}
          >
            {downloadingFormat === 'PDF' ? 'Preparing...' : '📄 PDF Report'}
          </button>
          <button
            onClick={() => handleDownloadReport('CSV')}
            disabled={downloadingFormat === 'CSV'}
            className="btn btn-secondary"
            style={{ padding: '5px 12px', fontSize: '12px' }}
          >
            {downloadingFormat === 'CSV' ? 'Preparing...' : '📊 CSV Data'}
          </button>
        </div>
      </div>

      <hr className="hr" style={{ margin: '14px 0 28px' }} />

      {/* SECTION 1: STATS BAR */}
      <section style={{ marginBottom: '34px' }}>
        <h4 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: '#7d7979' }}>
          1. Page Performance Stats
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
          
          <div className="card" style={{ padding: '16px', borderLeft: '3px solid #232046' }}>
            <div style={{ fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#7d7979', fontFamily: 'var(--font-heading)', marginBottom: '4px' }}>
              Sessions Reached
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, color: '#232046' }}>
              7,073
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-muted)', marginTop: '2px' }}>28.5% of total entries</div>
          </div>

          <div className="card" style={{ padding: '16px', borderLeft: '3px solid #8d2f2f' }}>
            <div style={{ fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#8d2f2f', fontFamily: 'var(--font-heading)', marginBottom: '4px', fontWeight: 700 }}>
              Abandonment Rate
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, color: '#8d2f2f' }}>
              41.2%
            </div>
            <div style={{ fontSize: '11px', color: '#8d2f2f', marginTop: '2px', fontWeight: 600 }}>2,914 lost sessions</div>
          </div>

          <div className="card" style={{ padding: '16px', borderLeft: '3px solid #8d2f2f' }}>
            <div style={{ fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#8d2f2f', fontFamily: 'var(--font-heading)', marginBottom: '4px', fontWeight: 700 }}>
              Est. Monthly Leak
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, color: '#8d2f2f' }}>
              ₹18.4L / mo
            </div>
            <div style={{ fontSize: '11px', color: '#8d2f2f', marginTop: '2px', fontWeight: 600 }}>Highest ROI Fix</div>
          </div>

          <div className="card" style={{ padding: '16px', borderLeft: '3px solid #F0A93B' }}>
            <div style={{ fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#7d5411', fontFamily: 'var(--font-heading)', marginBottom: '4px' }}>
              Rage Clicks
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, color: '#7d5411' }}>
              1,208
            </div>
            <div style={{ fontSize: '11px', color: '#7d5411', marginTop: '2px' }}>Disabled COD tile</div>
          </div>

          <div className="card" style={{ padding: '16px', borderLeft: '3px solid #232046' }}>
            <div style={{ fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#7d7979', fontFamily: 'var(--font-heading)', marginBottom: '4px' }}>
              Hesitation Time
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, color: '#232046' }}>
              19.4s
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-muted)', marginTop: '2px' }}>Before Place order</div>
          </div>

        </div>
      </section>

      {/* SECTION 2: HEATMAP VIEWER */}
      <section style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: '#7d7979' }}>
            2. Page Heatmap &amp; Click Overlay
          </h4>

          {/* Overlay Toggles */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setOverlay('click')}
              className="btn btn-secondary"
              style={{
                background: overlay === 'click' ? '#232046' : 'transparent',
                color: overlay === 'click' ? '#efedf3' : 'var(--color-text)',
                border: '1px solid ' + (overlay === 'click' ? '#232046' : 'var(--color-divider)'),
                fontFamily: 'var(--font-heading)',
                fontWeight: 600
              }}
            >
              Click map
            </button>
            <button
              onClick={() => setOverlay('scroll')}
              className="btn btn-secondary"
              style={{
                background: overlay === 'scroll' ? '#232046' : 'transparent',
                color: overlay === 'scroll' ? '#efedf3' : 'var(--color-text)',
                border: '1px solid ' + (overlay === 'scroll' ? '#232046' : 'var(--color-divider)'),
                fontFamily: 'var(--font-heading)',
                fontWeight: 600
              }}
            >
              Scroll map
            </button>
            <button
              onClick={() => setOverlay('none')}
              className="btn btn-secondary"
              style={{
                background: overlay === 'none' ? '#232046' : 'transparent',
                color: overlay === 'none' ? '#efedf3' : 'var(--color-text)',
                border: '1px solid ' + (overlay === 'none' ? '#232046' : 'var(--color-divider)'),
                fontFamily: 'var(--font-heading)',
                fontWeight: 600
              }}
            >
              Bare page
            </button>
          </div>
        </div>

        {/* Heatmap Canvas Frame */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '34px', alignItems: 'start' }}>
          <div style={{ display: 'flex', justifyContent: 'center', background: 'var(--color-surface)', border: '1px solid var(--color-divider)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
            <div style={{ width: frameWidth, position: 'relative' }}>
              
              <div style={{ position: 'relative', background: '#ffffff', border: '1px solid rgba(32,31,29,.14)', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', color: '#232046' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: '1px solid rgba(32,31,29,.1)' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: '#232046', fontWeight: 600 }}>
                    {isMyntra ? 'Myntra Checkout' : isBakingo ? 'Bakingo Checkout' : 'Zomato Checkout'}
                  </span>
                  <span style={{ fontSize: '11px', color: '#8b8b8b' }}>Step 3 of 4</span>
                </div>

                <div style={{ padding: '18px 18px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  {/* Address */}
                  <div style={{ border: '1px solid rgba(32,31,29,.12)', borderRadius: '4px', padding: '12px 14px' }}>
                    <div style={{ fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9a9a9a', marginBottom: '6px' }}>Deliver to</div>
                    <div style={{ fontSize: '13px' }}>Flat 402, Indiranagar 2nd Stage, Bengaluru 560038</div>
                    <div style={{ marginTop: '8px', fontSize: '12px', color: '#232046', textDecoration: 'underline' }}>Change address</div>
                  </div>

                  {/* Items */}
                  <div style={{ border: '1px solid rgba(32,31,29,.12)', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 14px', borderBottom: '1px solid rgba(32,31,29,.08)', fontSize: '13px' }}>
                      <span>Paneer Butter Masala × 1</span>
                      <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>₹329</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 14px', borderBottom: '1px solid rgba(32,31,29,.08)', fontSize: '13px' }}>
                      <span>Butter Naan × 3</span>
                      <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>₹135</span>
                    </div>

                    {/* Late fee line */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 14px', fontSize: '13px', color: '#8d2f2f', fontWeight: 600, background: 'rgba(141,47,47,0.06)' }}>
                      <span>Taxes, packaging &amp; delivery</span>
                      <span style={{ fontVariantNumeric: 'tabular-nums' }}>₹118</span>
                    </div>
                  </div>

                  {/* Coupon */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ flex: 1, border: '1px solid rgba(32,31,29,.18)', borderRadius: '4px', padding: '11px 12px', fontSize: '12.5px', color: '#a5a5a5' }}>
                      Enter coupon code
                    </div>
                    <div style={{ border: '1px solid rgba(32,31,29,.18)', borderRadius: '4px', padding: '11px 16px', fontSize: '12.5px', color: '#6b6b6b', fontWeight: 600 }}>
                      Apply
                    </div>
                  </div>

                  {/* Payment */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9a9a9a' }}>Payment method</div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {['UPI', 'Card', 'Netbanking'].map((m) => (
                        <div key={m} style={{ border: '1px solid rgba(32,31,29,.18)', borderRadius: '4px', padding: '8px 12px', fontSize: '12px' }}>{m}</div>
                      ))}
                      <div style={{ border: '1px solid rgba(141,47,47,0.3)', borderRadius: '4px', padding: '8px 12px', fontSize: '12px', color: '#8d2f2f', background: 'rgba(141,47,47,0.08)' }}>
                        Cash on delivery (Disabled)
                      </div>
                    </div>
                  </div>

                  {/* Total & CTA */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(32,31,29,.1)' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: '#9a9a9a' }}>To pay</div>
                      <div style={{ fontSize: '18px', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>₹582</div>
                    </div>
                    <div style={{ background: '#232046', color: '#ffffff', borderRadius: '4px', padding: '12px 26px', fontSize: '13.5px', fontWeight: 600 }}>
                      Place order
                    </div>
                  </div>

                </div>

              </div>

              {/* Click Overlay */}
              {overlay === 'click' && (
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'multiply' }}>
                  {blobs.map((b, i) => (
                    <div
                      key={i}
                      style={{
                        position: 'absolute',
                        left: b.x + '%',
                        top: b.y + '%',
                        width: b.r * 2,
                        height: b.r * 2,
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '50%',
                        background: `radial-gradient(circle, rgba(214,52,32,${0.62 * b.w}) 0%, rgba(240,169,59,${0.5 * b.w}) 38%, rgba(240,169,59,0) 72%)`
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Scroll Overlay */}
              {overlay === 'scroll' && (
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                  {scrollData.map((s, i) => (
                    <div
                      key={i}
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: s.at + '%',
                        borderTop: '1px dashed #8d2f2f',
                        padding: '2px 8px',
                        fontSize: '10.5px',
                        fontWeight: 700,
                        color: '#8d2f2f',
                        background: 'rgba(255,255,255,0.85)'
                      }}
                    >
                      {s.pct}% reached fold
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

          {/* Signals Sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ margin: '0 0 10px', fontSize: '16px', fontWeight: 600 }}>Page Signals</h4>
            {signals.map((s: SignalData, idx: number) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px', padding: '12px 0', borderBottom: '1px solid var(--color-divider)' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>{s.label}</div>
                  <div className="text-muted" style={{ fontSize: '11px' }}>{s.note}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', color: s.color, fontWeight: 600 }}>
                  {s.value}
                </div>
              </div>
            ))}
          </aside>

        </div>
      </section>

      {/* SECTION 3: AI FINDINGS */}
      <section>
        <h4 style={{ margin: '0 0 14px', fontSize: '16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: '#7d7979' }}>
          3. Page AI Findings ({site.findings.length})
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {site.findings.map((f: Finding) => {
            const color = getSevColor(f.severity);

            return (
              <article
                key={f.id || f.issue}
                className="card"
                style={{
                  padding: '20px 24px',
                  borderLeft: `3px solid ${color}`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '9.5px', letterSpacing: '.13em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#fff', background: color, padding: '3px 8px', borderRadius: '2px' }}>
                    {f.severity}
                  </span>
                  <span style={{ fontSize: '9.5px', letterSpacing: '.13em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)', fontWeight: 600, color: '#4a7a4a', border: '1px solid #4a7a4a', padding: '3px 8px', borderRadius: '2px' }}>
                    {f.confidence}
                  </span>
                  <span style={{ fontSize: '10.5px', padding: '3px 8px', borderRadius: '2px', border: '1px solid var(--color-divider)', color: 'var(--color-muted)' }}>
                    {f.heuristic}
                  </span>
                  <span className="text-muted" style={{ marginLeft: 'auto', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                    {f.element}
                  </span>
                </div>

                <h4 style={{ margin: '0 0 10px', fontSize: '20px', fontWeight: 600, color: '#201f1d' }}>
                  {f.issue}
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '6px 18px', fontSize: '13.5px', lineHeight: 1.55 }}>
                  <span style={{ fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#7d7979', fontFamily: 'var(--font-heading)', paddingTop: '4px' }}>Evidence</span>
                  <p style={{ margin: 0 }}>{f.evidence}</p>

                  <span style={{ fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#7d7979', fontFamily: 'var(--font-heading)', paddingTop: '4px' }}>Fix</span>
                  <p style={{ margin: 0 }}>{f.recommendation}</p>

                  <span style={{ fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#7d7979', fontFamily: 'var(--font-heading)', paddingTop: '4px' }}>Impact</span>
                  <p style={{ margin: 0, color: '#7d5411', fontWeight: 600 }}>{f.impact}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

    </main>
  );
};
