import React, { useState } from 'react';
import { SiteDataset, LinkedSite } from '../types/drishti';

interface SettingsTabProps {
  currentSite: SiteDataset;
  sitesList: LinkedSite[];
  onStartAddSite: () => void;
  onSelectSite: (siteId: string) => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  currentSite,
  sitesList,
  onStartAddSite,
  onSelectSite
}) => {
  const [kpiName, setKpiName] = useState(currentSite.kpi.split(' · ')[0] || 'Order placed');
  const [kpiTarget, setKpiTarget] = useState(currentSite.kpi.split(' · ')[1] || '/order-confirmation');

  const stepsList = [
    { num: '01', label: 'Restaurant / Product page', path: '/restaurant/:id' },
    { num: '02', label: 'Cart view', path: '/cart' },
    { num: '03', label: 'Address confirmed', path: '/checkout#address' },
    { num: '04', label: 'Payment reached', path: '/checkout#payment' },
    { num: '05', label: 'Order placed', path: '/order-confirmation' }
  ];

  return (
    <main style={{ padding: '34px 40px 60px', maxWidth: '940px' }}>
      
      <h2 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 600 }}>Sites &amp; KPI Definition</h2>
      <p className="text-muted" style={{ margin: 0, fontSize: '13px' }}>
        Link a website, verify ownership, and define what counts as success
      </p>

      <hr className="hr" style={{ margin: '14px 0 30px' }} />

      {/* Add Website Section */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '34px', padding: '20px 22px', border: '1px solid var(--color-divider)', borderRadius: 'var(--radius-md)', background: 'var(--color-surface)' }}>
        <div>
          <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 600 }}>Add a website</h4>
          <p className="text-muted" style={{ margin: 0, fontSize: '13px' }}>
            Set up tracking and define a conversion goal for a new property.
          </p>
        </div>
        <button onClick={onStartAddSite} className="btn btn-primary">
          + Add a website
        </button>
      </div>

      {/* Linked Sites List */}
      <h4 style={{ margin: '0 0 12px', fontSize: '18px', fontWeight: 600 }}>Linked sites on this account</h4>
      <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--color-divider)', borderRadius: 'var(--radius-md)', background: 'var(--color-surface)', overflow: 'hidden', marginBottom: '34px' }}>
        {sitesList.map((st) => (
          <div key={st.id} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '16px 20px', borderBottom: '1px solid var(--color-divider)' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#232046' }}>{st.domain}</div>
              <div className="text-muted" style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)' }}>Site ID: {st.id}</div>
            </div>
            <span style={{ fontSize: '12px', color: st.ok ? '#4a7a4a' : '#7d5411', fontWeight: 600 }}>
              {st.status}
            </span>
            <button onClick={() => onSelectSite(st.id)} className="btn btn-secondary" style={{ padding: '5px 12px', fontSize: '12px' }}>
              Manage
            </button>
          </div>
        ))}
      </div>

      {/* KPI Definition */}
      <h4 style={{ margin: '0 0 12px', fontSize: '18px', fontWeight: 600 }}>KPI &amp; Funnel definition</h4>
      <div style={{ border: '1px solid var(--color-divider)', borderRadius: 'var(--radius-md)', padding: '20px 22px', background: 'var(--color-surface)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 24px', marginBottom: '18px' }}>
          <div className="field" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#7d7979', fontFamily: 'var(--font-heading)' }}>
              Goal name
            </label>
            <input className="input" value={kpiName} onChange={(e) => setKpiName(e.target.value)} style={{ padding: '9px 12px', border: '1px solid var(--color-divider)', borderRadius: '4px' }} />
          </div>

          <div className="field" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#7d7979', fontFamily: 'var(--font-heading)' }}>
              Target Success URL
            </label>
            <input className="input" value={kpiTarget} onChange={(e) => setKpiTarget(e.target.value)} style={{ padding: '9px 12px', border: '1px solid var(--color-divider)', borderRadius: '4px', fontFamily: 'var(--font-mono)' }} />
          </div>
        </div>

        <div style={{ fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#7d7979', fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>
          Funnel steps
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {stepsList.map((k: any, idx: number) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'baseline', gap: '12px', padding: '10px 0', borderBottom: '1px solid var(--color-divider)' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', color: '#F0A93B', fontVariantNumeric: 'tabular-nums' }}>{k.num}</span>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>{k.label}</span>
              <span className="text-muted" style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)' }}>{k.path}</span>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
};
