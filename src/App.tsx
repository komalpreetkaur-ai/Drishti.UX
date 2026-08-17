import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { PortfolioTab } from './components/PortfolioTab';
import { OverviewTab } from './components/OverviewTab';
import { HeatmapTab } from './components/HeatmapTab';
import { FunnelTab } from './components/FunnelTab';
import { FindingsTab } from './components/FindingsTab';
import { ExportTab } from './components/ExportTab';
import { SnippetTab } from './components/SnippetTab';
import { ProfileTab } from './components/ProfileTab';
import { SettingsTab } from './components/SettingsTab';
import { AddSiteWizard } from './components/AddSiteWizard';
import { TabId, DeviceType, PortfolioSite, SiteDataset } from './types/drishti';
import {
  SITES,
  SITE_DATA,
  SHARED_ISSUES,
  LEAKBOARD,
  LINKED_SITES
} from './services/drishtiData';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('portfolio');
  const [activeSiteId, setActiveSiteId] = useState<string>('zmt_9f4c21');
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [range, setRange] = useState<string>('Last 7 days');

  const [portfolioSites, setPortfolioSites] = useState<PortfolioSite[]>(SITES);

  // Active site resolving
  const currentPortfolioSite = portfolioSites.find((s) => s.id === activeSiteId) || portfolioSites[0];
  const currentDomain = currentPortfolioSite.domain;
  const currentSiteData = SITE_DATA[activeSiteId] || SITE_DATA['zmt_9f4c21'];

  // Convert SITE_DATA entry to SiteDataset for components
  const currentDataset: SiteDataset = {
    domain: currentPortfolioSite.domain,
    name: currentPortfolioSite.label,
    id: currentPortfolioSite.id,
    url: `https://${currentPortfolioSite.domain}/checkout`,
    kpi: currentPortfolioSite.kpi,
    healthScore: currentPortfolioSite.conv ? Math.round(currentPortfolioSite.conv * 3.5) : 60,
    totalSessions: currentPortfolioSite.sessions,
    overallConversion: currentPortfolioSite.conv ? `${currentPortfolioSite.conv}%` : '58.8%',
    abandonedRevenue: '₹18.4L / mo',
    findings: currentSiteData.findings,
    funnel: currentSiteData.funnel,
    desktopSignals: currentSiteData.stats.desktop,
    mobileSignals: currentSiteData.stats.mobile,
    segmentSplits: currentSiteData.segments.map((s: any) => ({
      label: s.label,
      value: s.value,
      percentage: parseFloat(s.width),
      color: s.tone
    })),
    heatmapTieIn: currentSiteData.tieIn,
    execSummary: currentSiteData.summary,
    fixFirst: currentSiteData.findings[0]?.recommendation || 'Fix checkout friction'
  };

  const handleSelectSite = (siteId: string, initialTab: TabId = 'overview') => {
    setActiveSiteId(siteId);
    setActiveTab(initialTab);
  };

  const handleCompleteAddSite = (domain: string, goal: string, successUrl: string, isInstant: boolean) => {
    const hex = Math.random().toString(16).substring(2, 8);
    const newId = domain.slice(0, 3).toLowerCase() + '_' + hex;
    const newSite: PortfolioSite = {
      id: newId,
      domain,
      label: 'Added just now',
      live: !isInstant,
      kpi: goal,
      conv: 54.2,
      delta: 1.0,
      sessions: 1240,
      orders: 672,
      critical: 1,
      high: 2,
      total: 4,
      lastRun: 'Just now',
      leak: isInstant ? 'Instant Audit ready' : 'Receiving pings',
      tier: isInstant ? 'Instant Audit' : 'Live Insights'
    };

    setPortfolioSites((prev) => [...prev.filter((s) => s.domain !== domain), newSite]);
    setActiveSiteId(newId);
    setActiveTab('overview');
  };

  const showSiteTabs = activeTab !== 'portfolio' && activeTab !== 'addsite' && activeTab !== 'sites' && activeTab !== 'install' && activeTab !== 'profile';
  const showFilters = activeTab === 'overview' || activeTab === 'findings' || activeTab === 'funnel' || activeTab === 'heatmap';

  const getPageTitle = () => {
    switch (activeTab) {
      case 'portfolio': return 'All websites';
      case 'overview': return 'Overview';
      case 'findings': return 'AI findings';
      case 'funnel': return 'Order funnel';
      case 'heatmap': return 'Checkout heatmap';
      case 'export': return 'Export';
      case 'sites': return 'Sites & KPI';
      case 'install': return 'Tracking snippet';
      case 'profile': return 'Profile';
      case 'addsite': return 'Add a new website';
      default: return 'Dashboard';
    }
  };

  const getPageSub = () => {
    if (activeTab === 'portfolio') return 'Every site on this account, and what they share';
    if (showSiteTabs) return `${currentPortfolioSite.kpi} · ${currentDomain}`;
    return 'Drishti UX Analytics';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      
      {/* 238px Left Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentDomain={currentDomain}
        onOpenPortfolio={() => setActiveTab('portfolio')}
        userInitials="AR"
        userName="Ananya Rao"
        userPlan="Pro plan"
        sitesCount={portfolioSites.length}
      />

      {/* Main Container */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        
        {/* Top Header */}
        <header style={{ padding: '24px 40px 0', borderBottom: '1px solid var(--color-divider)', background: 'var(--color-bg)', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px' }}>
            <div>
              {showSiteTabs && (
                <button
                  onClick={() => setActiveTab('portfolio')}
                  style={{ background: 'transparent', border: 0, padding: '0 0 6px', cursor: 'pointer', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '11.5px', letterSpacing: '.06em', color: '#7d5411' }}
                >
                  ← All websites
                </button>
              )}
              <div style={{ fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#7d7979', fontFamily: 'var(--font-heading)', marginBottom: '5px' }}>
                {showSiteTabs ? `${currentDomain} / ${getPageTitle()}` : 'Drishti Portfolio'}
              </div>
              <h2 style={{ margin: '0 0 3px', fontSize: '24px', fontWeight: 600 }}>{getPageTitle()}</h2>
              <p className="text-muted" style={{ margin: 0, fontSize: '12.5px' }}>{getPageSub()}</p>
            </div>

            {/* Header Right Filters (Shown only on analysis views) */}
            {showFilters && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '4px' }}>
                <select
                  value={range}
                  onChange={(e) => setRange(e.target.value)}
                  style={{ background: 'transparent', color: 'var(--color-text)', border: '1px solid var(--color-divider)', borderRadius: '4px', padding: '7px 10px', fontFamily: 'var(--font-body)', fontSize: '12.5px', outline: 'none', cursor: 'pointer' }}
                >
                  <option value="Last 7 days">Last 7 days</option>
                  <option value="Last 14 days">Last 14 days</option>
                  <option value="Last 30 days">Last 30 days</option>
                </select>

                <div style={{ display: 'flex', border: '1px solid var(--color-divider)', borderRadius: '4px', overflow: 'hidden' }}>
                  <button
                    onClick={() => setDevice('desktop')}
                    style={{ background: device === 'desktop' ? '#F0A93B' : 'transparent', color: device === 'desktop' ? '#232046' : 'var(--color-text)', border: 0, padding: '6px 14px', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '12.5px', cursor: 'pointer' }}
                  >
                    Desktop
                  </button>
                  <button
                    onClick={() => setDevice('mobile')}
                    style={{ background: device === 'mobile' ? '#F0A93B' : 'transparent', color: device === 'mobile' ? '#232046' : 'var(--color-text)', border: 0, padding: '6px 14px', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '12.5px', cursor: 'pointer' }}
                  >
                    Mobile
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sub-Header Site Analysis Tabs ONLY (No Setup Tabs inside Website Pages) */}
          {showSiteTabs && (
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'findings', label: `AI findings (${currentDataset.findings.length})` },
                { id: 'funnel', label: 'Order funnel' },
                { id: 'heatmap', label: 'Checkout heatmap' },
                { id: 'export', label: 'Export' }
              ].map((t) => {
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as TabId)}
                    style={{
                      background: 'transparent',
                      border: 0,
                      borderBottom: isActive ? '2px solid #F0A93B' : '2px solid transparent',
                      color: isActive ? 'var(--color-text)' : 'var(--color-muted)',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                      fontSize: '13.5px',
                      padding: '8px 14px 10px',
                      cursor: 'pointer'
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}

              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '6px' }}>
                <span style={{ fontSize: '11.5px', color: '#4a7a4a', fontWeight: 600 }}>🟢 Snippet Live</span>
                <button onClick={() => setActiveTab('export')} className="btn btn-primary" style={{ padding: '6px 13px', fontSize: '12.5px' }}>
                  Download report
                </button>
              </div>
            </div>
          )}

          <div style={{ height: '18px' }}></div>
        </header>

        {/* Dynamic Route View */}
        {activeTab === 'portfolio' && (
          <PortfolioTab
            sites={portfolioSites}
            sharedIssues={SHARED_ISSUES}
            leakboard={LEAKBOARD}
            onSelectSite={handleSelectSite}
            onStartAddSite={() => setActiveTab('addsite')}
          />
        )}

        {activeTab === 'addsite' && (
          <AddSiteWizard
            onComplete={handleCompleteAddSite}
            onCancel={() => setActiveTab('portfolio')}
          />
        )}

        {activeTab === 'overview' && (
          <OverviewTab
            site={currentDataset}
            range={range}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'heatmap' && (
          <HeatmapTab
            site={currentDataset}
            device={device}
            range={range}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'funnel' && (
          <FunnelTab
            site={currentDataset}
            device={device}
            range={range}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'findings' && (
          <FindingsTab
            site={currentDataset}
            range={range}
          />
        )}

        {activeTab === 'export' && (
          <ExportTab />
        )}

        {activeTab === 'sites' && (
          <SettingsTab
            currentSite={currentDataset}
            sitesList={LINKED_SITES}
            onStartAddSite={() => setActiveTab('addsite')}
            onSelectSite={(id) => handleSelectSite(id, 'overview')}
          />
        )}

        {activeTab === 'install' && (
          <SnippetTab
            siteId={currentPortfolioSite.id}
            domain={currentDomain}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileTab />
        )}

      </div>

    </div>
  );
};
