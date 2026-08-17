import React from 'react';
import { SiteDataset } from '../types/drishti';

interface PageItem {
  id: string;
  rank: number;
  path: string;
  name: string;
  dropRate: string;
  sessions: number;
  dropCount: number;
  revenueImpact: string;
  criticalCount: number;
  highCount: number;
  rageClicks: number;
  topIssue: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
}

interface PagesTabProps {
  site: SiteDataset;
  range: string;
  onSelectPage: (pagePath: string) => void;
}

export const PagesTab: React.FC<PagesTabProps> = ({
  site,
  range,
  onSelectPage
}) => {
  // Screen 2 — Pages ranked by worst leak first
  const pages: PageItem[] = [
    {
      id: 'p1',
      rank: 1,
      path: '/checkout#payment',
      name: 'Payment & Fee Disclosure Step',
      dropRate: '41.2%',
      sessions: 7073,
      dropCount: 2914,
      revenueImpact: '₹18.4L / mo',
      criticalCount: 2,
      highCount: 1,
      rageClicks: 1208,
      topIssue: 'Delivery and packaging fees appear only at payment step; disabled COD tile absorbs 1,208 rage clicks.',
      severity: 'Critical'
    },
    {
      id: 'p2',
      rank: 2,
      path: '/cart',
      name: 'Cart Summary & Coupon Step',
      dropRate: '31.5%',
      sessions: 11902,
      dropCount: 3362,
      revenueImpact: '₹6.2L / mo',
      criticalCount: 1,
      highCount: 2,
      rageClicks: 284,
      topIssue: 'Coupon field causes 19.4s median hesitation; landed price hidden until next step.',
      severity: 'Critical'
    },
    {
      id: 'p3',
      rank: 3,
      path: '/checkout#address',
      name: 'Address & Pincode Selection',
      dropRate: '24.1%',
      sessions: 8540,
      dropCount: 1467,
      revenueImpact: '₹3.8L / mo',
      criticalCount: 0,
      highCount: 2,
      rageClicks: 318,
      topIssue: 'Address card link has small 22px touch target on mobile viewports.',
      severity: 'High'
    },
    {
      id: 'p4',
      rank: 4,
      path: '/restaurant/:id',
      name: 'Restaurant & Menu Page',
      dropRate: '12.0%',
      sessions: 24810,
      dropCount: 12908,
      revenueImpact: '₹1.4L / mo',
      criticalCount: 0,
      highCount: 1,
      rageClicks: 81,
      topIssue: 'Customisation chips lack clear selected indicator state.',
      severity: 'Medium'
    }
  ];

  return (
    <main style={{ padding: '34px 40px 60px', maxWidth: '1120px' }}>
      
      {/* Page Subheader */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '4px' }}>
        <div>
          <div style={{ fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#7d7979', fontFamily: 'var(--font-heading)', marginBottom: '4px' }}>
            Screen 2 — Pages Overview
          </div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>{site.domain} — Monitored Pages</h2>
        </div>
        <span style={{ fontSize: '12px', color: '#7d7979' }}>{range} · Ranked by drop-off</span>
      </div>

      <p className="text-muted" style={{ margin: '4px 0 0', fontSize: '13px' }}>
        Worst performing pages ranked first based on user abandonment, rage clicks, and estimated revenue impact.
      </p>

      <hr className="hr" style={{ margin: '16px 0 28px' }} />

      {/* Pages List Cards (Worst page ranked first) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {pages.map((p) => {
          const isWorst = p.rank === 1;

          return (
            <div
              key={p.id}
              className="card"
              style={{
                padding: '22px 24px',
                borderLeft: isWorst ? '3px solid #8d2f2f' : '1px solid var(--color-divider)',
                background: 'var(--color-surface)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}
            >
              {/* Header Row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span
                      style={{
                        fontSize: '10px',
                        letterSpacing: '.12em',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: '2px',
                        background: isWorst ? '#8d2f2f' : '#232046',
                        color: '#ffffff'
                      }}
                    >
                      #{p.rank} {isWorst ? 'Worst Page' : 'Page'}
                    </span>
                    <h3 style={{ margin: 0, fontSize: '19px', fontWeight: 600, color: '#232046' }}>
                      {p.name}
                    </h3>
                  </div>
                  <div className="text-muted" style={{ fontSize: '12.5px', fontFamily: 'var(--font-mono)' }}>
                    {p.path}
                  </div>
                </div>

                {/* Drop-off & Impact Pill */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 700, color: isWorst ? '#8d2f2f' : '#232046', fontVariantNumeric: 'tabular-nums' }}>
                    {p.dropRate}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#8d2f2f', fontWeight: 600 }}>
                    {p.dropCount.toLocaleString()} dropped ({p.revenueImpact})
                  </div>
                </div>
              </div>

              {/* Top Issue Description */}
              <p style={{ margin: 0, fontSize: '13.5px', lineHeight: 1.5, color: '#201f1d' }}>
                <strong>Key Friction:</strong> {p.topIssue}
              </p>

              {/* Signals & Action Row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-divider)', paddingTop: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px' }}>
                  <span style={{ color: p.criticalCount > 0 ? '#8d2f2f' : '#7d5411', fontWeight: 600 }}>
                    {p.criticalCount} Critical &amp; {p.highCount} High Findings
                  </span>
                  <span style={{ color: 'var(--color-divider)' }}>|</span>
                  <span style={{ color: p.rageClicks > 500 ? '#8d2f2f' : '#201f1d', fontWeight: 600 }}>
                    ⚡ {p.rageClicks.toLocaleString()} Rage Clicks
                  </span>
                </div>

                <button
                  onClick={() => onSelectPage(p.path)}
                  className="btn btn-primary"
                  style={{ padding: '7px 16px', fontSize: '12.5px' }}
                >
                  Screen 3 — Page Detail →
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </main>
  );
};
