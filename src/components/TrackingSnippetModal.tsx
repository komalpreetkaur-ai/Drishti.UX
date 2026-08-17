import React, { useState } from 'react';
import {
  Code,
  Copy,
  Check,
  Activity,
  X,
  MousePointer,
  AlertTriangle,
  Zap,
  Play
} from 'lucide-react';

interface TrackingSnippetModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteId: string;
  onSimulateEvent: (eventType: 'click' | 'dead_click' | 'rage_click' | 'kpi_complete') => void;
}

export const TrackingSnippetModal: React.FC<TrackingSnippetModalProps> = ({
  isOpen,
  onClose,
  siteId,
  onSimulateEvent
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'install' | 'sandbox'>('install');
  const [liveEventLog, setLiveEventLog] = useState<string[]>([
    '[INIT] Drishti tracker v1.0 initialized for site: ' + siteId,
    '[PING] Verification heartbeat received: 200 OK'
  ]);

  if (!isOpen) return null;

  const snippetCode = `<script async src="https://cdn.drishti.app/t.js" data-site="${siteId}"></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippetCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerSandboxEvent = (type: 'click' | 'dead_click' | 'rage_click' | 'kpi_complete') => {
    onSimulateEvent(type);
    const ts = new Date().toLocaleTimeString();
    if (type === 'click') {
      setLiveEventLog((prev) => [`[${ts}] CLICK: selector="button#place-order" (x: 840, y: 750)`, ...prev]);
    } else if (type === 'dead_click') {
      setLiveEventLog((prev) => [`[${ts}] ❌ DEAD_CLICK: selector="button#place-order[disabled]" (clickCount: 1)`, ...prev]);
    } else if (type === 'rage_click') {
      setLiveEventLog((prev) => [`[${ts}] ⚡ RAGE_CLICK: 3 clicks in 620ms on "img#promo-banner-graphic"`, ...prev]);
    } else if (type === 'kpi_complete') {
      setLiveEventLog((prev) => [`[${ts}] 🎉 KPI_CONVERSION: User reached "/order-confirmation" (Goal Completed)`, ...prev]);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        className="glass-panel glass-panel-glow"
        style={{
          width: '100%',
          maxWidth: '680px',
          padding: '28px',
          position: 'relative',
          background: '#FFFFFF'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            right: '20px',
            top: '20px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Code size={24} color="#D97706" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
            Install Drishti Live Tracking Snippet
          </h2>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #E2E8F0', paddingBottom: '10px' }}>
          <button
            onClick={() => setActiveTab('install')}
            style={{
              background: activeTab === 'install' ? '#F8FAFC' : 'transparent',
              color: activeTab === 'install' ? '#B45309' : 'var(--text-muted)',
              border: activeTab === 'install' ? '1px solid #CBD5E1' : 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.825rem',
              cursor: 'pointer'
            }}
          >
            1. Embed Script Code
          </button>
          <button
            onClick={() => setActiveTab('sandbox')}
            style={{
              background: activeTab === 'sandbox' ? '#F8FAFC' : 'transparent',
              color: activeTab === 'sandbox' ? '#059669' : 'var(--text-muted)',
              border: activeTab === 'sandbox' ? '1px solid #CBD5E1' : 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.825rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Activity size={14} /> 2. Live Sandbox Simulator
          </button>
        </div>

        {activeTab === 'install' ? (
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.5 }}>
              Paste this lightweight vanilla JavaScript snippet into the <code className="code-inline">&lt;head&gt;</code> of your website or store template. It batches events every 5 seconds without impacting page load performance.
            </p>

            {/* Code Box */}
            <div style={{ position: 'relative', background: '#0F172A', border: '1px solid #334155', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
              <pre style={{ color: '#F59E0B', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
                {snippetCode}
              </pre>

              <button
                onClick={handleCopy}
                className="btn-primary"
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '12px',
                  fontSize: '0.75rem',
                  padding: '6px 12px'
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>

            {/* Features Checklist */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.78rem', color: 'var(--text-main)', background: '#F8FAFC', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div>✓ Size: <strong>&lt; 8KB</strong> (Async, 0 dependencies)</div>
              <div>✓ Privacy: <strong>Keystrokes & inputs masked</strong></div>
              <div>✓ Detects: <strong>Rage & Dead clicks</strong></div>
              <div>✓ GDPR / DPDP Compliant: <strong>Hashed IP addresses</strong></div>
            </div>

            {/* Status Ping Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', padding: '12px', background: 'rgba(5, 150, 105, 0.1)', borderRadius: '8px', border: '1px solid rgba(5, 150, 105, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={16} color="#059669" className="rage-pulse" />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#059669' }}>
                  Verification Ping Active: Listening for live site events...
                </span>
              </div>
              <span className="code-inline" style={{ color: '#059669' }}>STATUS: ONLINE</span>
            </div>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Test your tracking pipeline live by triggering mock user interactions:
            </p>

            {/* Sandbox Controls */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              <button className="btn-secondary" onClick={() => triggerSandboxEvent('click')} style={{ fontSize: '0.78rem' }}>
                <MousePointer size={14} /> Simulate CTA Click
              </button>
              <button className="btn-secondary" onClick={() => triggerSandboxEvent('dead_click')} style={{ fontSize: '0.78rem', color: '#D97706' }}>
                <AlertTriangle size={14} /> Trigger Dead Click
              </button>
              <button className="btn-secondary" onClick={() => triggerSandboxEvent('rage_click')} style={{ fontSize: '0.78rem', color: '#DC2626' }}>
                <Zap size={14} /> Trigger 3x Rage Click
              </button>
              <button className="btn-primary" onClick={() => triggerSandboxEvent('kpi_complete')} style={{ fontSize: '0.78rem' }}>
                <Play size={14} /> Complete KPI Purchase
              </button>
            </div>

            {/* Live Terminal Output */}
            <div style={{ background: '#0F172A', padding: '14px', borderRadius: '10px', border: '1px solid #334155', height: '160px', overflowY: 'auto' }}>
              <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginBottom: '6px', fontWeight: 700 }}>LIVE WEBSOCKET EVENT STREAM:</div>
              {liveEventLog.map((log, idx) => (
                <div key={idx} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#F59E0B', marginBottom: '4px' }}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
