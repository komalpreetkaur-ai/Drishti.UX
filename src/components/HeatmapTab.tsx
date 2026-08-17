import React, { useState } from 'react';
import { DeviceType, OverlayType, TabId, SiteDataset, SignalData } from '../types/drishti';
import { BLOBS, SCROLL } from '../services/drishtiData';

interface HeatmapTabProps {
  site: SiteDataset;
  device: DeviceType;
  range: string;
  onNavigateTab: (tab: TabId) => void;
}

export const HeatmapTab: React.FC<HeatmapTabProps> = ({
  site,
  device,
  range,
  onNavigateTab
}) => {
  const [overlay, setOverlay] = useState<OverlayType>('click');

  const blobs = BLOBS[device];
  const scrollData = SCROLL[device];
  const signals = device === 'mobile' ? site.mobileSignals : site.desktopSignals;

  const isMobile = device === 'mobile';
  const isMyntra = site.domain.includes('myntra');
  const isBakingo = site.domain.includes('bakingo');

  // Page Frame dimensions based on device
  const frameWidth = isMobile ? '390px' : '620px';

  return (
    <main style={{ padding: '34px 40px 60px', maxWidth: '1180px' }}>
      
      {/* Subheader */}
      <h2 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 600 }}>{site.name} — Checkout heatmap</h2>
      <p className="text-muted" style={{ margin: 0, fontSize: '13px' }}>
        /checkout · click density and scroll depth · {range}
      </p>

      <hr className="hr" style={{ margin: '14px 0 24px' }} />

      {/* Overlay Switcher Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
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

      {/* Grid: Canvas Mockup Left + Signals Aside Right */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '34px', alignItems: 'start' }}>
        
        {/* Mockup Frame Container */}
        <div style={{ display: 'flex', justifyContent: 'center', background: 'var(--color-surface)', border: '1px solid var(--color-divider)', borderRadius: 'var(--radius-md)', padding: '26px' }}>
          <div style={{ width: frameWidth, position: 'relative', transition: 'width 0.3s ease-in-out' }}>
            
            {/* Base Mockup UI */}
            <div style={{ position: 'relative', background: '#ffffff', border: '1px solid rgba(32,31,29,.14)', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', color: '#232046' }}>
              
              {/* Header Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: '1px solid rgba(32,31,29,.1)' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '19px', color: '#232046', fontWeight: 600 }}>
                  {isMyntra ? 'Myntra Checkout' : isBakingo ? 'Bakingo Checkout' : 'Zomato Checkout'}
                </span>
                <span style={{ fontSize: '11px', color: '#8b8b8b' }}>Step 3 of 4</span>
              </div>

              {/* Body */}
              <div style={{ padding: '18px 18px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Address Box */}
                <div style={{ border: '1px solid rgba(32,31,29,.12)', borderRadius: '4px', padding: '12px 14px' }}>
                  <div style={{ fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9a9a9a', marginBottom: '6px', fontFamily: 'var(--font-heading)' }}>
                    Deliver to
                  </div>
                  <div style={{ fontSize: '13px', color: '#232046' }}>
                    {isMyntra ? 'Flat 104, HSR Layout Sector 1, Bengaluru 560102' : isBakingo ? '14 Sector 22, Gurugram 122015' : 'Flat 402, Indiranagar 2nd Stage, Bengaluru 560038'}
                  </div>
                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#232046', textDecoration: 'underline', cursor: 'pointer' }}>
                    Change address
                  </div>
                </div>

                {/* Items Box */}
                <div style={{ border: '1px solid rgba(32,31,29,.12)', borderRadius: '4px' }}>
                  {isMyntra ? (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 14px', borderBottom: '1px solid rgba(32,31,29,.08)', fontSize: '13px' }}>
                        <span>Roadster Casual Shirt × 1</span>
                        <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>₹899</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 14px', borderBottom: '1px solid rgba(32,31,29,.08)', fontSize: '13px' }}>
                        <span>HRX Running Shoes × 1</span>
                        <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>₹1,499</span>
                      </div>
                    </>
                  ) : isBakingo ? (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 14px', borderBottom: '1px solid rgba(32,31,29,.08)', fontSize: '13px' }}>
                        <span>Chocolate Truffle Cake 1kg</span>
                        <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>₹1,299</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 14px', borderBottom: '1px solid rgba(32,31,29,.08)', fontSize: '13px' }}>
                        <span>Candles &amp; knife set</span>
                        <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>₹49</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 14px', borderBottom: '1px solid rgba(32,31,29,.08)', fontSize: '13px' }}>
                        <span>Paneer Butter Masala × 1</span>
                        <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>₹329</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 14px', borderBottom: '1px solid rgba(32,31,29,.08)', fontSize: '13px' }}>
                        <span>Butter Naan × 3</span>
                        <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>₹135</span>
                      </div>
                    </>
                  )}

                  {/* Fee Line */}
                  <div className="cart-summary__fees" style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 14px', fontSize: '13px', color: '#8d2f2f', fontWeight: 600, background: 'rgba(141,47,47,0.06)' }}>
                    <span>{isMyntra ? 'Convenience & Handling Fee' : isBakingo ? 'Delivery & handling' : 'Taxes, packaging & delivery'}</span>
                    <span style={{ fontVariantNumeric: 'tabular-nums' }}>{isMyntra ? '₹99' : isBakingo ? '₹129' : '₹118'}</span>
                  </div>
                </div>

                {/* Coupon Field */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div id="coupon-input" style={{ flex: 1, border: '1px solid rgba(32,31,29,.18)', borderRadius: '4px', padding: '11px 12px', fontSize: '12.5px', color: '#a5a5a5' }}>
                    Enter coupon code
                  </div>
                  <div style={{ border: '1px solid rgba(32,31,29,.18)', borderRadius: '4px', padding: '11px 16px', fontSize: '12.5px', color: '#6b6b6b', fontWeight: 600 }}>
                    Apply
                  </div>
                </div>

                {/* Payment Methods */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#9a9a9a', fontFamily: 'var(--font-heading)' }}>
                    Payment method
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['UPI', 'Card', 'Netbanking'].map((m) => (
                      <div key={m} style={{ border: '1px solid rgba(32,31,29,.18)', borderRadius: '4px', padding: '8px 12px', fontSize: '12px', color: '#232046' }}>
                        {m}
                      </div>
                    ))}

                    {/* Disabled COD tile with 1208 rage clicks */}
                    <div style={{ border: '1px solid rgba(141,47,47,0.3)', borderRadius: '4px', padding: '8px 12px', fontSize: '12px', color: '#8d2f2f', background: 'rgba(141,47,47,0.08)', cursor: 'not-allowed' }}>
                      Cash on delivery (Disabled)
                    </div>
                  </div>
                </div>

                {/* Total & CTA */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(32,31,29,.1)' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#9a9a9a' }}>To pay</div>
                    <div style={{ fontSize: '18px', fontFamily: 'var(--font-heading)', fontVariantNumeric: 'tabular-nums', fontWeight: 700 }}>
                      {isMyntra ? '₹2,497' : isBakingo ? '₹1,477' : '₹582'}
                    </div>
                  </div>

                  <div className="btn-place-order" style={{ background: '#232046', color: '#ffffff', borderRadius: '4px', padding: '12px 26px', fontSize: '13.5px', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
                    Place order
                  </div>
                </div>

                {/* Legal Note */}
                <div className="legal-note" style={{ fontSize: '10.5px', color: '#a5a5a5', textAlign: 'center' }}>
                  By placing this order you accept the terms of service
                </div>

              </div>

            </div>

            {/* Click Overlay Blobs */}
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

            {/* Scroll Overlay Lines */}
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

        {/* Signals Aside Bar */}
        <aside style={{ display: 'flex', flexDirection: 'column' }}>
          <h4 style={{ margin: '0 0 10px', fontSize: '18px', fontWeight: 600 }}>Signals on this page</h4>

          {signals.map((s: SignalData, idx: number) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px', padding: '13px 0', borderBottom: '1px solid var(--color-divider)' }}>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 600 }}>{s.label}</div>
                <div className="text-muted" style={{ fontSize: '11.5px' }}>{s.note}</div>
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: s.color, fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>
                {s.value}
              </div>
            </div>
          ))}

          {/* Tie-In Box */}
          <div style={{ marginTop: '22px', borderLeft: '2px solid #F0A93B', padding: '2px 0 2px 14px' }}>
            <div style={{ fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#7d5411', fontFamily: 'var(--font-heading)', marginBottom: '5px', fontWeight: 700 }}>
              Read this with
            </div>
            <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5, color: '#201f1d' }}>
              {isMobile ? site.heatmapTieIn.mobile : site.heatmapTieIn.desktop}
            </p>
            <button onClick={() => onNavigateTab('findings')} className="btn btn-primary" style={{ marginTop: '12px' }}>
              See the finding
            </button>
          </div>

        </aside>

      </div>

    </main>
  );
};
