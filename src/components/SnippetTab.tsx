import React, { useState } from 'react';

interface SnippetTabProps {
  siteId?: string;
  domain?: string;
}

export const SnippetTab: React.FC<SnippetTabProps> = ({
  siteId = 'zmt_9f4c21',
  domain = 'zomato.com'
}) => {
  const [copied, setCopied] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const snippetCode = `<script async src="https://cdn.drishti.app/t.js" data-site="${siteId}"></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippetCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleRecheck = () => {
    setVerifying(true);
    setTimeout(() => setVerifying(false), 1000);
  };

  return (
    <main style={{ padding: '34px 40px 60px', maxWidth: '860px' }}>
      
      <h2 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 600 }}>Tracking Snippet Installation</h2>
      <p className="text-muted" style={{ margin: 0, fontSize: '13px' }}>
        One line, async, under 8KB — no keystrokes or sensitive input values recorded
      </p>

      <hr className="hr" style={{ margin: '14px 0 30px' }} />

      {/* Snippet Code Box */}
      <div style={{ background: '#232046', borderRadius: 'var(--radius-md)', padding: '22px 24px', color: '#efedf3' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span style={{ fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase', color: '#F0A93B', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
            Paste before closing &lt;/head&gt; tag
          </span>
          <button
            onClick={handleCopy}
            className="btn"
            style={{ color: '#F0A93B', borderColor: '#F0A93B', padding: '5px 14px', fontSize: '12px', background: 'transparent' }}
          >
            {copied ? '✓ Copied' : 'Copy code snippet'}
          </button>
        </div>
        <code style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.7, color: '#EFEDF3', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {snippetCode}
        </code>
      </div>

      {/* Ping Status Banner */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '22px', padding: '16px 20px', border: '1px solid var(--color-divider)', borderRadius: 'var(--radius-md)', background: 'var(--color-surface)' }}>
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4a7a4a', boxShadow: '0 0 0 4px rgba(74,122,74,.18)' }}></span>
        <span style={{ fontSize: '13.5px', fontWeight: 600 }}>
          Verification ping received from {domain}
        </span>
        <button
          onClick={handleRecheck}
          className="btn btn-secondary"
          style={{ marginLeft: 'auto', padding: '6px 14px', fontSize: '12.5px' }}
        >
          {verifying ? 'Looking for the snippet…' : 'Check again'}
        </button>
      </div>

      {/* Payload Table */}
      <h4 style={{ margin: '34px 0 14px', fontSize: '18px', fontWeight: 600 }}>What the snippet transmits</h4>
      <table className="table" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Event Type</th>
            <th style={{ textAlign: 'left' }}>Payload Schema</th>
            <th style={{ textAlign: 'left' }}>Cadence</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ fontWeight: 600 }}>click</td>
            <td style={{ fontFamily: 'var(--font-mono)' }}>x, y, selector, viewportWidth, timestamp</td>
            <td>batched 5s</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 600 }}>scroll</td>
            <td style={{ fontFamily: 'var(--font-mono)' }}>maxDepthPct, timestamp</td>
            <td>batched 5s</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 600 }}>pageview</td>
            <td style={{ fontFamily: 'var(--font-mono)' }}>url, referrer, device, userAgent</td>
            <td>immediate</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 600 }}>kpi_step</td>
            <td style={{ fontFamily: 'var(--font-mono)' }}>stepId, stepPath, timestamp</td>
            <td>immediate</td>
          </tr>
        </tbody>
      </table>

      <p className="text-muted" style={{ marginTop: '16px', fontSize: '12.5px', lineHeight: 1.5 }}>
        IP addresses are hashed with salt, Do Not Track headers are honored, and events flush on page hide via navigator.sendBeacon. Fully GDPR and DPDP compliant.
      </p>

    </main>
  );
};
