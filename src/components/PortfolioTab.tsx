import React from 'react';
import { PortfolioSite, SharedIssue, LeakboardRow, TabId } from '../types/drishti';

interface PortfolioTabProps {
  sites: PortfolioSite[];
  sharedIssues: SharedIssue[];
  leakboard: LeakboardRow[];
  onSelectSite: (siteId: string, initialTab?: TabId) => void;
  onStartAddSite: () => void;
}

export const PortfolioTab: React.FC<PortfolioTabProps> = ({
  sites,
  sharedIssues,
  leakboard,
  onSelectSite,
  onStartAddSite
}) => {
  const totalSessions = sites.reduce((acc, s) => acc + s.sessions, 0);
  const totalOrders = sites.reduce((acc, s) => acc + s.orders, 0);
  const totalFindings = sites.reduce((acc, s) => acc + s.total, 0);
  const avgConv = totalSessions > 0 ? ((totalOrders / totalSessions) * 100).toFixed(1) + '%' : '58.4%';

  return (
    <main style={{ padding: '30px 40px 60px', maxWidth: '1120px' }}>
      
      {/* 4 Top Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', border: '1px solid var(--color-divider)', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '34px', background: 'var(--color-surface)' }}>
        
        <div style={{ padding: '18px 20px', borderRight: '1px solid var(--color-divider)' }}>
          <div style={{ fontSize: '10px', letterSpacing: '.13em', textTransform: 'uppercase', color: '#7d7979', fontFamily: 'var(--font-heading)', marginBottom: '9px' }}>
            Total sessions tracked
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontVariantNumeric: 'tabular-nums', color: '#232046', fontWeight: 600 }}>
            {totalSessions > 0 ? totalSessions.toLocaleString('en-IN') : '77,460'}
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--color-muted)', marginTop: '4px' }}>Across {sites.length} properties</div>
        </div>

        <div style={{ padding: '18px 20px', borderRight: '1px solid var(--color-divider)' }}>
          <div style={{ fontSize: '10px', letterSpacing: '.13em', textTransform: 'uppercase', color: '#7d7979', fontFamily: 'var(--font-heading)', marginBottom: '9px' }}>
            Total tracked revenue
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontVariantNumeric: 'tabular-nums', color: '#232046', fontWeight: 600 }}>
            ₹1.84Cr
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--color-muted)', marginTop: '4px' }}>Completed orders</div>
        </div>

        <div style={{ padding: '18px 20px', borderRight: '1px solid var(--color-divider)' }}>
          <div style={{ fontSize: '10px', letterSpacing: '.13em', textTransform: 'uppercase', color: '#7d7979', fontFamily: 'var(--font-heading)', marginBottom: '9px' }}>
            Average conversion
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontVariantNumeric: 'tabular-nums', color: '#232046', fontWeight: 600 }}>
            {avgConv}
          </div>
          <div style={{ fontSize: '11.5px', color: '#4a7a4a', marginTop: '4px' }}>+0.8% vs last week</div>
        </div>

        <div style={{ padding: '18px 20px' }}>
          <div style={{ fontSize: '10px', letterSpacing: '.13em', textTransform: 'uppercase', color: '#7d7979', fontFamily: 'var(--font-heading)', marginBottom: '9px' }}>
            Active AI findings
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontVariantNumeric: 'tabular-nums', color: '#8d2f2f', fontWeight: 600 }}>
            {totalFindings > 0 ? totalFindings : 14}
          </div>
          <div style={{ fontSize: '11.5px', color: '#8d2f2f', marginTop: '4px' }}>5 Critical priority</div>
        </div>

      </div>

      {/* Your Websites Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 600 }}>Your websites</h3>
        <button onClick={onStartAddSite} className="btn btn-primary" style={{ fontSize: '12.5px' }}>
          + Add site
        </button>
      </div>

      {/* Site Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {sites.map((s) => (
          <div
            key={s.id}
            className="card"
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              borderLeft: s.live ? '3px solid #F0A93B' : '1px solid var(--color-divider)'
            }}
          >
            {/* Domain & Status */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <div
                  onClick={() => onSelectSite(s.id, 'overview')}
                  style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 600, color: '#232046', cursor: 'pointer', marginBottom: '2px' }}
                >
                  {s.domain}
                </div>
                <div className="text-muted" style={{ fontSize: '11.5px' }}>{s.label} · {s.kpi}</div>
              </div>
              <span
                style={{
                  fontSize: '9.5px',
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-heading)',
                  padding: '3px 8px',
                  borderRadius: '2px',
                  background: s.live ? 'rgba(74,122,74,0.12)' : 'rgba(240,169,59,0.15)',
                  color: s.live ? '#4a7a4a' : '#7d5411',
                  fontWeight: 600
                }}
              >
                {s.tier}
              </span>
            </div>

            {/* Conversion Stat */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', lineHeight: 1, fontVariantNumeric: 'tabular-nums', color: '#232046', fontWeight: 700 }}>
                  {s.conv ? `${s.conv}%` : '—'}
                </div>
                {s.delta !== null && (
                  <div style={{ fontSize: '11.5px', color: s.delta >= 0 ? '#4a7a4a' : '#8d2f2f', marginTop: '4px', fontWeight: 600 }}>
                    {s.delta >= 0 ? `+${s.delta}% vs last week` : `${s.delta}% vs last week`}
                  </div>
                )}
              </div>
              <div style={{ flex: 1, paddingBottom: '6px' }}>
                <div style={{ height: '6px', background: 'var(--color-bg)', borderRadius: '3px', overflow: 'hidden', border: '1px solid var(--color-divider)' }}>
                  <div style={{ height: '100%', width: `${s.conv || 0}%`, background: '#232046' }}></div>
                </div>
              </div>
            </div>

            {/* Metrics Table */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', fontSize: '12px', borderTop: '1px solid var(--color-divider)', paddingTop: '11px' }}>
              <span className="text-muted">Sessions</span>
              <span style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{s.sessions.toLocaleString('en-IN')}</span>

              <span className="text-muted">Goal completions</span>
              <span style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{s.orders.toLocaleString('en-IN')}</span>

              <span className="text-muted">Biggest leak</span>
              <span style={{ textAlign: 'right', color: '#8d2f2f', fontWeight: 600 }}>{s.leak}</span>

              <span className="text-muted">Last analysed</span>
              <span style={{ textAlign: 'right', color: 'var(--color-muted)' }}>{s.lastRun}</span>
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', paddingTop: '4px', borderTop: '1px solid var(--color-divider)' }}>
              <span style={{ fontSize: '11.5px', color: s.critical > 0 ? '#8d2f2f' : '#4a7a4a', fontWeight: 600 }}>
                {s.total > 0 ? `${s.total} findings (${s.critical} Critical)` : 'No issues'}
              </span>
              <button onClick={() => onSelectSite(s.id, 'overview')} className="btn btn-ghost" style={{ fontSize: '12.5px', fontWeight: 600 }}>
                Open Dashboard →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cross Site Insights Tables */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '40px' }}>
        
        <section>
          <h4 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: 600 }}>Issues shared across sites</h4>
          <p className="text-muted" style={{ margin: '0 0 14px', fontSize: '12.5px' }}>
            Patterns the merge pass found in more than one property. Fixing these once usually means fixing a shared component.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {sharedIssues.map((i, idx) => (
              <div key={idx} style={{ padding: '13px 0', borderBottom: '1px solid var(--color-divider)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '3px' }}>
                  <span style={{ fontSize: '14px', flex: 1, fontWeight: 600 }}>{i.issue}</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', color: '#8d2f2f', whiteSpace: 'nowrap', fontWeight: 600 }}>
                    {i.count}
                  </span>
                </div>
                <div className="text-muted" style={{ fontSize: '11.5px' }}>{i.sites}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h4 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: 600 }}>Worst leak per site</h4>
          <p className="text-muted" style={{ margin: '0 0 14px', fontSize: '12.5px' }}>
            The single step losing the most sessions on each property, ranked by drop rate.
          </p>
          <table className="table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Site</th>
                <th style={{ textAlign: 'left' }}>Step</th>
                <th style={{ textAlign: 'right' }}>Drop</th>
                <th style={{ textAlign: 'right' }}>Lost</th>
              </tr>
            </thead>
            <tbody>
              {leakboard.map((l, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{l.domain}</td>
                  <td>{l.leak}</td>
                  <td style={{ textAlign: 'right', color: '#8d2f2f', fontWeight: 600 }}>{l.pct}</td>
                  <td style={{ textAlign: 'right', color: 'var(--color-muted)' }}>{l.lost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

      </div>

    </main>
  );
};
