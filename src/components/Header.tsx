import React, { useState } from 'react';
import { TabId, DeviceType } from '../types/drishti';
import { InstantAuditModal } from './InstantAuditModal';
import { LinkedSite } from '../types/drishti';

interface HeaderProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  device: DeviceType;
  onDeviceChange: (device: DeviceType) => void;
  range: string;
  onRangeChange: (range: string) => void;
  siteName: string;
  primaryKpi: string;
  sitesList: LinkedSite[];
  onSelectSiteDomain: (domain: string) => void;
  onAuditCustomUrl?: (url: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  device,
  onDeviceChange,
  range,
  onRangeChange,
  siteName,
  primaryKpi,
  sitesList,
  onSelectSiteDomain,
  onAuditCustomUrl
}) => {
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'heatmap', label: 'Heatmap', icon: '🔥' },
    { id: 'funnel', label: 'Funnel', icon: '📉' },
    { id: 'findings', label: 'AI findings', icon: '🧠' },
    { id: 'instant', label: 'Instant Audit', icon: '⚡' },
    { id: 'export', label: 'Export', icon: '📄' },
    { id: 'install', label: 'Snippet', icon: '🔗' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <header style={{ background: '#232046', color: '#efedf3', padding: '0 40px' }}>
      
      {/* Top Meta Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '20px 0 16px', borderBottom: '1px solid rgba(240,169,59,.28)' }}>
        
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: '28px', letterSpacing: '.02em', color: '#efedf3' }}>
            Drishti
          </span>
          <span style={{ fontSize: '10px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#F0A93B', fontFamily: 'var(--font-heading)' }}>
            UX Diagnosis
          </span>
        </div>

        {/* Site Selector Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '24px' }}>
          <span style={{ fontSize: '9.5px', letterSpacing: '.14em', textTransform: 'uppercase', opacity: 0.6, fontFamily: 'var(--font-heading)' }}>
            Site:
          </span>
          <select
            value={siteName}
            onChange={(e) => {
              if (e.target.value === 'ADD_NEW') {
                setAuditModalOpen(true);
              } else {
                onSelectSiteDomain(e.target.value);
              }
            }}
            style={{
              background: 'rgba(239,237,243,.12)',
              color: '#ffffff',
              border: '1px solid rgba(240,169,59,0.4)',
              borderRadius: '4px',
              padding: '6px 12px',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {sitesList.map((s) => (
              <option key={s.domain} value={s.domain} style={{ color: '#201f1d' }}>
                {s.name} ({s.domain})
              </option>
            ))}
            <option value="ADD_NEW" style={{ color: '#232046', fontWeight: 'bold' }}>
              + Add &amp; Audit New Website...
            </option>
          </select>

          <button
            onClick={() => setAuditModalOpen(true)}
            style={{
              background: 'rgba(240,169,59,0.18)',
              color: '#F0A93B',
              border: '1px solid rgba(240,169,59,0.5)',
              borderRadius: '4px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            + Audit New URL
          </button>
        </div>

        {/* Primary KPI & Live Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '22px', marginLeft: 'auto', fontSize: '12.5px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', opacity: 0.55, fontFamily: 'var(--font-heading)' }}>
              Primary KPI
            </span>
            <span>{primaryKpi.split(' · ')[0]} · <span style={{ color: '#F0A93B' }}>{primaryKpi.split(' · ')[1] || '/checkout'}</span></span>
          </div>

          <div style={{ width: '1px', height: '26px', background: 'rgba(239,237,243,.18)' }}></div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#7bbf7b', boxShadow: '0 0 0 3px rgba(123,191,123,.22)' }}></span>
            <span>Snippet live</span>
          </div>
        </div>

      </div>

      {/* Tabs & Controls Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 0 0', flexWrap: 'wrap' }}>
        <nav style={{ display: 'flex', gap: '4px' }}>
          {tabs.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onTabChange(t.id)}
                style={{
                  background: 'transparent',
                  border: 0,
                  borderBottom: isActive ? '2px solid #F0A93B' : '2px solid transparent',
                  color: isActive ? '#efedf3' : 'rgba(239,237,243,.6)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '13.5px',
                  padding: '8px 12px 10px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Date & Device Controls */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '8px' }}>
          <select
            value={range}
            onChange={(e) => onRangeChange(e.target.value)}
            style={{
              background: 'rgba(239,237,243,.06)',
              color: '#efedf3',
              border: '1px solid rgba(239,237,243,.22)',
              borderRadius: '4px',
              padding: '5px 10px',
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="Last 7 days" style={{ color: '#201f1d' }}>Last 7 days</option>
            <option value="Last 14 days" style={{ color: '#201f1d' }}>Last 14 days</option>
            <option value="Last 30 days" style={{ color: '#201f1d' }}>Last 30 days</option>
          </select>

          {/* Desktop / Mobile Segment Switcher */}
          <div style={{ display: 'flex', border: '1px solid rgba(239,237,243,.22)', borderRadius: '4px', overflow: 'hidden' }}>
            <button
              onClick={() => onDeviceChange('desktop')}
              style={{
                background: device === 'desktop' ? '#F0A93B' : 'transparent',
                color: device === 'desktop' ? '#232046' : 'rgba(239,237,243,.72)',
                border: 0,
                padding: '5px 12px',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Desktop
            </button>
            <button
              onClick={() => onDeviceChange('mobile')}
              style={{
                background: device === 'mobile' ? '#F0A93B' : 'transparent',
                color: device === 'mobile' ? '#232046' : 'rgba(239,237,243,.72)',
                border: 0,
                padding: '5px 12px',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Mobile
            </button>
          </div>
        </div>

      </div>

      {/* Instant Audit Modal */}
      <InstantAuditModal
        isOpen={auditModalOpen}
        onClose={() => setAuditModalOpen(false)}
        onRunAudit={(url) => {
          if (onAuditCustomUrl) onAuditCustomUrl(url);
        }}
      />

    </header>
  );
};
