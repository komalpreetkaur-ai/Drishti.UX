import React from 'react';
import { DeviceType, TabId, SiteDataset, FunnelStepData, SegmentSplit } from '../types/drishti';

interface FunnelTabProps {
  site: SiteDataset;
  device: DeviceType;
  range: string;
  onNavigateTab: (tab: TabId) => void;
}

export const FunnelTab: React.FC<FunnelTabProps> = ({
  site,
  device,
  range,
  onNavigateTab
}) => {
  const top = site.funnel[0].sessions;
  const deviceLabel = device === 'mobile' ? 'Mobile · 390px' : 'Desktop · 1440px';

  return (
    <main style={{ padding: '34px 40px 60px', maxWidth: '1120px' }}>
      
      {/* Subheader */}
      <h2 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 600 }}>{site.name} — Order funnel</h2>
      <p className="text-muted" style={{ margin: 0, fontSize: '13px' }}>
        KPI: {site.kpi} · {range} · {deviceLabel}
      </p>

      <hr className="hr" style={{ margin: '14px 0 30px' }} />

      {/* Funnel Step Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {site.funnel.map((f: FunnelStepData, i: number) => {
          const next = site.funnel[i + 1];
          const drop = next ? f.sessions - next.sessions : 0;
          const dropPct = next ? (drop / f.sessions) * 100 : 0;
          const isLeak = i === 3 || i === site.funnel.length - 2; // Payment step
          const pctLabel = ((f.sessions / top) * 100).toFixed(1) + '% of entries';

          return (
            <div key={f.num || i} style={{ padding: '0 0 4px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '7px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', color: '#F0A93B', fontVariantNumeric: 'tabular-nums' }}>
                    {f.num || `0${i + 1}`}
                  </span>
                  <span style={{ fontSize: '14.5px', fontWeight: 600 }}>{f.label}</span>
                  <span className="text-muted" style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)' }}>{f.path}</span>
                </div>
                <span style={{ fontSize: '13px', fontVariantNumeric: 'tabular-nums', color: '#201f1d' }}>
                  {f.sessions.toLocaleString()} sessions · {pctLabel}
                </span>
              </div>

              {/* Progress Bar Container */}
              <div style={{ height: '26px', background: 'var(--color-surface)', border: '1px solid var(--color-divider)', borderRadius: '2px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${(f.sessions / top) * 100}%`,
                    background: i === site.funnel.length - 1 ? '#4a7a4a' : '#232046',
                    opacity: i === site.funnel.length - 1 ? 1 : 0.85 - i * 0.06,
                    transition: 'width 0.5s ease-out'
                  }}
                />
              </div>

              {/* Drop-off Indicator */}
              {next && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '9px 0 13px 2px' }}>
                  <span style={{ width: '1px', height: '16px', background: 'var(--color-divider)' }}></span>
                  <span style={{ fontSize: '12px', color: isLeak ? '#8d2f2f' : '#7d7979', fontVariantNumeric: 'tabular-nums', fontWeight: isLeak ? 700 : 400 }}>
                    ↓ {drop.toLocaleString()} ({dropPct.toFixed(1)}%) dropped here
                  </span>

                  {isLeak && (
                    <span style={{ fontSize: '9.5px', letterSpacing: '.13em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)', color: '#fff', background: '#8d2f2f', padding: '3px 7px', borderRadius: '2px' }}>
                      Biggest leak
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Cards Row: Leak Diagnosis + Segment Split */}
      <div style={{ marginTop: '34px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
        
        {/* Card 1: Leak Diagnosis */}
        <div className="card" style={{ padding: 'var(--space-4)', borderLeft: '2px solid #8d2f2f' }}>
          <div style={{ fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#8d2f2f', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
            Leak diagnosis
          </div>
          <h4 style={{ margin: '8px 0 6px', fontSize: '18px', fontWeight: 600 }}>Payment step loses buyers</h4>
          <p style={{ margin: 0, fontSize: '13.5px', lineHeight: 1.55, color: '#201f1d' }}>
            {site.execSummary}
          </p>
          <button onClick={() => onNavigateTab('findings')} className="btn btn-primary" style={{ marginTop: '14px' }}>
            Open linked findings
          </button>
        </div>

        {/* Card 2: Segment Split */}
        <div className="card" style={{ padding: 'var(--space-4)' }}>
          <div style={{ fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#7d5411', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
            Segment split
          </div>
          <h4 style={{ margin: '8px 0 10px', fontSize: '18px', fontWeight: 600 }}>Device Conversion Breakdown</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
            {site.segmentSplits.map((sg: SegmentSplit, idx: number) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '5px' }}>
                  <span>{sg.label}</span>
                  <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{sg.value} conversion</span>
                </div>
                <div style={{ height: '6px', background: 'var(--color-surface)', border: '1px solid var(--color-divider)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${sg.percentage || parseFloat(sg.width || '50')}%`, background: sg.color || sg.tone || '#232046' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </main>
  );
};
