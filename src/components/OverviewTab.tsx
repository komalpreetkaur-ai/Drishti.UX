import React from 'react';
import { SiteDataset, TabId, Finding } from '../types/drishti';

interface OverviewTabProps {
  site: SiteDataset;
  range: string;
  onNavigateTab: (tab: TabId) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  site,
  range,
  onNavigateTab
}) => {
  const criticalCount = site.findings.filter((f: Finding) => f.severity === 'Critical').length;
  const highCount = site.findings.filter((f: Finding) => f.severity === 'High').length;

  return (
    <main style={{ padding: '34px 40px 60px', maxWidth: '1120px' }}>
      
      {/* Subheader */}
      <h2 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 600 }}>{site.name} — Executive Overview</h2>
      <p className="text-muted" style={{ margin: 0, fontSize: '13px' }}>
        KPI: {site.kpi} · {range}
      </p>

      <hr className="hr" style={{ margin: '14px 0 24px' }} />

      {/* Top 3 Executive Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '34px' }}>
        
        {/* Metric 1 */}
        <div className="card" style={{ padding: '20px', borderLeft: '3px solid #F0A93B' }}>
          <div style={{ fontSize: '10px', letterSpacing: '.13em', textTransform: 'uppercase', color: '#7d7979', fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>
            UX Health Score
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '38px', fontWeight: 700, color: '#232046' }}>
              {site.healthScore}
            </span>
            <span style={{ fontSize: '14px', color: '#7d7979' }}>/ 100</span>
          </div>
          <div style={{ fontSize: '12px', color: '#4a7a4a', marginTop: '4px', fontWeight: 600 }}>
            +2.4 pts vs previous week
          </div>
        </div>

        {/* Metric 2 */}
        <div className="card" style={{ padding: '20px', borderLeft: '3px solid #232046' }}>
          <div style={{ fontSize: '10px', letterSpacing: '.13em', textTransform: 'uppercase', color: '#7d7979', fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>
            Overall Conversion
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '38px', fontWeight: 700, color: '#232046' }}>
            {site.overallConversion}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-muted)', marginTop: '4px' }}>
            {site.totalSessions.toLocaleString()} sessions analyzed
          </div>
        </div>

        {/* Metric 3 */}
        <div className="card" style={{ padding: '20px', borderLeft: '3px solid #8d2f2f' }}>
          <div style={{ fontSize: '10px', letterSpacing: '.13em', textTransform: 'uppercase', color: '#8d2f2f', fontFamily: 'var(--font-heading)', marginBottom: '8px', fontWeight: 700 }}>
            Est. Monthly Leak
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '38px', fontWeight: 700, color: '#8d2f2f' }}>
            {site.abandonedRevenue}
          </div>
          <div style={{ fontSize: '12px', color: '#8d2f2f', marginTop: '4px', fontWeight: 600 }}>
            {criticalCount} Critical &amp; {highCount} High findings
          </div>
        </div>

      </div>

      {/* Priority Prescription Card */}
      <div className="card" style={{ padding: '24px', borderLeft: '3px solid #8d2f2f', marginBottom: '34px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span style={{ fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#fff', background: '#8d2f2f', padding: '3px 8px', borderRadius: '2px', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
            Priority #1 Prescription
          </span>
          <span style={{ fontSize: '12px', color: '#7d5411', fontWeight: 600 }}>Highest ROI Fix</span>
        </div>

        <h3 style={{ margin: '0 0 10px', fontSize: '20px', fontWeight: 600, color: '#201f1d' }}>
          {site.findings[0]?.issue || 'Fix late fee line at checkout step'}
        </h3>

        <p style={{ margin: '0 0 16px', fontSize: '14px', lineHeight: 1.6, color: '#201f1d' }}>
          {site.fixFirst}
        </p>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => onNavigateTab('findings')} className="btn btn-primary">
            View All {site.findings.length} Findings →
          </button>
          <button onClick={() => onNavigateTab('heatmap')} className="btn btn-secondary">
            Inspect Checkout Heatmap
          </button>
        </div>
      </div>

      {/* 3 Quick Nav Tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        
        <div
          onClick={() => onNavigateTab('heatmap')}
          className="card"
          style={{ padding: '20px', cursor: 'pointer', transition: 'transform 0.2s' }}
        >
          <div style={{ fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#F0A93B', fontFamily: 'var(--font-heading)', marginBottom: '6px', fontWeight: 700 }}>
            Interactive Heatmap
          </div>
          <h4 style={{ margin: '0 0 6px', fontSize: '17px', fontWeight: 600 }}>Checkout Click &amp; Scroll Map</h4>
          <p className="text-muted" style={{ margin: 0, fontSize: '12.5px' }}>
            Overlay rage clicks, dead clicks, and fold lines onto the actual checkout screen.
          </p>
        </div>

        <div
          onClick={() => onNavigateTab('funnel')}
          className="card"
          style={{ padding: '20px', cursor: 'pointer', transition: 'transform 0.2s' }}
        >
          <div style={{ fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#F0A93B', fontFamily: 'var(--font-heading)', marginBottom: '6px', fontWeight: 700 }}>
            Funnel Analytics
          </div>
          <h4 style={{ margin: '0 0 6px', fontSize: '17px', fontWeight: 600 }}>{site.funnel.length}-Step Conversion Funnel</h4>
          <p className="text-muted" style={{ margin: 0, fontSize: '12.5px' }}>
            Track step-by-step drop-offs from entry to order confirmation.
          </p>
        </div>

        <div
          onClick={() => onNavigateTab('export')}
          className="card"
          style={{ padding: '20px', cursor: 'pointer', transition: 'transform 0.2s' }}
        >
          <div style={{ fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#F0A93B', fontFamily: 'var(--font-heading)', marginBottom: '6px', fontWeight: 700 }}>
            Executive Export
          </div>
          <h4 style={{ margin: '0 0 6px', fontSize: '17px', fontWeight: 600 }}>PDF &amp; JSON Reports</h4>
          <p className="text-muted" style={{ margin: 0, fontSize: '12.5px' }}>
            Generate executive presentation decks and raw behavioral CSV dumps.
          </p>
        </div>

      </div>

    </main>
  );
};
