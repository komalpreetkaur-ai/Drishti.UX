import React from 'react';
import { TabId } from '../types/drishti';

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  currentDomain: string;
  onOpenPortfolio: () => void;
  userInitials: string;
  userName: string;
  userPlan: string;
  sitesCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  currentDomain,
  onOpenPortfolio,
  userInitials,
  userName,
  userPlan,
  sitesCount
}) => {
  const isSiteView = activeTab !== 'portfolio' && activeTab !== 'addsite';
  const isTabActive = (t: TabId) => activeTab === t;

  const itemStyle = (on: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '9px',
    width: '100%',
    textAlign: 'left' as const,
    border: 0,
    cursor: 'pointer',
    borderRadius: 'var(--radius-md)',
    padding: '9px 10px',
    fontFamily: 'var(--font-body)',
    fontSize: '13.5px',
    background: on ? 'rgba(240,169,59,.14)' : 'transparent',
    color: on ? '#ffffff' : 'rgba(239,237,243,.72)'
  });

  const ruleStyle = (on: boolean) => ({
    width: '2px',
    height: '15px',
    flex: 'none',
    background: on ? '#F0A93B' : 'transparent',
    borderRadius: '1px'
  });

  return (
    <nav
      style={{
        width: '238px',
        flex: 'none',
        background: '#232046',
        color: '#efedf3',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 20
      }}
    >
      {/* Header Logo & Viewing Card */}
      <div style={{ padding: '24px 22px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '9px', marginBottom: '20px' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 400, fontSize: '27px', letterSpacing: '.02em' }}>
            Drishti
          </span>
          <span style={{ fontSize: '9px', letterSpacing: '.16em', textTransform: 'uppercase', color: '#F0A93B', fontFamily: 'var(--font-heading)' }}>
            UX
          </span>
        </div>

        {/* Viewing Site Card */}
        <button
          onClick={onOpenPortfolio}
          style={{
            width: '100%',
            textAlign: 'left',
            background: 'rgba(239,237,243,.06)',
            border: '1px solid rgba(239,237,243,.16)',
            borderRadius: '4px',
            padding: '9px 11px',
            color: '#efedf3',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)'
          }}
        >
          <span style={{ display: 'block', fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', opacity: 0.5, fontFamily: 'var(--font-heading)', marginBottom: '3px' }}>
            Viewing
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '13px', fontWeight: 600 }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7bbf7b' }}></span>
            {currentDomain}
            <span style={{ marginLeft: 'auto', opacity: 0.5 }}>▾</span>
          </span>
        </button>
      </div>

      {/* Nav List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        
        {/* Portfolio Section */}
        <div style={{ fontSize: '9px', letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(239,237,243,.42)', fontFamily: 'var(--font-heading)', padding: '12px 10px 7px' }}>
          Portfolio
        </div>
        <button onClick={() => onTabChange('portfolio')} style={itemStyle(isTabActive('portfolio'))}>
          <span style={ruleStyle(isTabActive('portfolio'))}></span>
          <span>All websites</span>
          <span style={{ marginLeft: 'auto', fontSize: '10.5px', padding: '1px 7px', borderRadius: '9px', background: 'rgba(239,237,243,.12)' }}>
            {sitesCount}
          </span>
        </button>

        {/* Site Diagnostic Views */}
        {isSiteView && (
          <>
            <div style={{ fontSize: '9px', letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(239,237,243,.42)', fontFamily: 'var(--font-heading)', padding: '18px 10px 7px' }}>
              Pages &amp; Detail
            </div>

            <button onClick={() => onTabChange('pages')} style={itemStyle(isTabActive('pages'))}>
              <span style={ruleStyle(isTabActive('pages'))}></span>
              <span>Screen 2 — Pages</span>
            </button>

            <button onClick={() => onTabChange('pagedetail')} style={itemStyle(isTabActive('pagedetail'))}>
              <span style={ruleStyle(isTabActive('pagedetail'))}></span>
              <span>Screen 3 — Page Detail</span>
            </button>
          </>
        )}

        {/* Set Up Section (Always visible) */}
        <div style={{ fontSize: '9px', letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(239,237,243,.42)', fontFamily: 'var(--font-heading)', padding: '18px 10px 7px' }}>
          Set up
        </div>

        <button onClick={() => onTabChange('sites')} style={itemStyle(isTabActive('sites'))}>
          <span style={ruleStyle(isTabActive('sites'))}></span>
          <span>Sites &amp; KPI</span>
        </button>

        <button onClick={() => onTabChange('install')} style={itemStyle(isTabActive('install'))}>
          <span style={ruleStyle(isTabActive('install'))}></span>
          <span>Tracking snippet</span>
        </button>

        <button onClick={() => onTabChange('profile')} style={itemStyle(isTabActive('profile'))}>
          <span style={ruleStyle(isTabActive('profile'))}></span>
          <span>Profile</span>
        </button>

      </div>

      {/* User Footer */}
      <button
        onClick={() => onTabChange('profile')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '11px',
          padding: '16px 22px',
          border: 0,
          borderTop: '1px solid rgba(239,237,243,.14)',
          background: 'transparent',
          color: '#efedf3',
          cursor: 'pointer',
          textAlign: 'left',
          fontFamily: 'var(--font-body)'
        }}
      >
        <span style={{ width: '32px', height: '32px', flex: 'none', borderRadius: '50%', border: '1px solid rgba(240,169,59,.7)', color: '#F0A93B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontSize: '12.5px' }}>
          {userInitials}
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '1px', overflow: 'hidden' }}>
          <span style={{ fontSize: '12.5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userName}</span>
          <span style={{ fontSize: '10.5px', opacity: 0.55 }}>{userPlan}</span>
        </span>
      </button>

    </nav>
  );
};
