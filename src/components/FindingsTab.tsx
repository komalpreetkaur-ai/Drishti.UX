import React, { useState } from 'react';
import { Severity, SiteDataset, Finding } from '../types/drishti';

interface FindingsTabProps {
  site: SiteDataset;
  range: string;
}

export const FindingsTab: React.FC<FindingsTabProps> = ({ site, range }) => {
  const [selectedSev, setSelectedSev] = useState<string>('All');

  const severities = ['All', 'Critical', 'High', 'Medium', 'Low'];

  const visibleFindings = selectedSev === 'All'
    ? site.findings
    : site.findings.filter((f: Finding) => f.severity === selectedSev);

  const getSevColor = (sev: Severity) => {
    switch (sev) {
      case 'Critical': return '#8d2f2f';
      case 'High': return '#a06f24';
      case 'Medium': return '#605d5d';
      case 'Low': return '#7d7979';
    }
  };

  return (
    <main style={{ padding: '34px 40px 60px', maxWidth: '1000px' }}>
      
      {/* Subheader */}
      <h2 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 600 }}>{site.name} — AI findings</h2>
      <p className="text-muted" style={{ margin: 0, fontSize: '13px' }}>
        4 passes · every finding cites a number · {range}
      </p>

      <hr className="hr" style={{ margin: '14px 0 24px' }} />

      {/* Executive Summary Box */}
      <div style={{ borderLeft: '2px solid #232046', padding: '2px 0 2px 16px', marginBottom: '26px', maxWidth: '720px' }}>
        <div style={{ fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#232046', fontFamily: 'var(--font-heading)', marginBottom: '6px', fontWeight: 700 }}>
          Executive summary
        </div>
        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: '#201f1d' }}>
          {site.execSummary}
        </p>
      </div>

      {/* Severity Filter Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#7d7979', fontFamily: 'var(--font-heading)', marginRight: '4px' }}>
          Severity
        </span>

        {severities.map((s) => {
          const isActive = selectedSev === s;
          const count = s === 'All' ? site.findings.length : site.findings.filter((f: Finding) => f.severity === s).length;
          return (
            <button
              key={s}
              onClick={() => setSelectedSev(s)}
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '12px',
                cursor: 'pointer',
                padding: '5px 11px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid ' + (isActive ? '#232046' : 'var(--color-divider)'),
                background: isActive ? '#232046' : 'transparent',
                color: isActive ? '#efedf3' : 'var(--color-text)'
              }}
            >
              {s} ({count})
            </button>
          );
        })}
      </div>

      {/* Findings Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {visibleFindings.map((f: Finding) => {
          const color = getSevColor(f.severity);
          const isConfirmed = f.confidence.includes('Confirmed');

          return (
            <article
              key={f.id || f.issue}
              className="card"
              style={{
                padding: 'var(--space-4) var(--space-6)',
                borderLeft: `2px solid ${color}`
              }}
            >
              {/* Badges Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                <span
                  style={{
                    fontSize: '9.5px',
                    letterSpacing: '.13em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    color: '#fff',
                    background: color,
                    padding: '3px 8px',
                    borderRadius: '2px'
                  }}
                >
                  {f.severity}
                </span>

                <span
                  style={{
                    fontSize: '9.5px',
                    letterSpacing: '.13em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    color: isConfirmed ? '#4a7a4a' : '#7d5411',
                    background: 'transparent',
                    border: '1px solid ' + (isConfirmed ? '#4a7a4a' : '#7d5411'),
                    padding: '3px 8px',
                    borderRadius: '2px'
                  }}
                >
                  {f.confidence}
                </span>

                <span style={{ fontSize: '10.5px', padding: '3px 8px', borderRadius: '2px', border: '1px solid var(--color-divider)', color: 'var(--color-muted)' }}>
                  {f.heuristic}
                </span>

                <span className="text-muted" style={{ marginLeft: 'auto', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                  {f.element}
                </span>
              </div>

              {/* Title */}
              <h4 style={{ margin: '0 0 10px', fontSize: '21px', fontWeight: 600, color: '#201f1d' }}>
                {f.issue}
              </h4>

              {/* Details Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '6px 18px', fontSize: '13.5px', lineHeight: 1.55 }}>
                <span style={{ fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#7d7979', fontFamily: 'var(--font-heading)', paddingTop: '4px' }}>
                  Evidence
                </span>
                <p style={{ margin: 0, color: '#201f1d' }}>{f.evidence}</p>

                <span style={{ fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#7d7979', fontFamily: 'var(--font-heading)', paddingTop: '4px' }}>
                  Fix
                </span>
                <p style={{ margin: 0, color: '#201f1d' }}>{f.recommendation}</p>

                <span style={{ fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#7d7979', fontFamily: 'var(--font-heading)', paddingTop: '4px' }}>
                  Impact
                </span>
                <p style={{ margin: 0, color: '#7d5411', fontWeight: 600 }}>{f.impact}</p>
              </div>

            </article>
          );
        })}
      </div>

    </main>
  );
};
