import React, { useState } from 'react';
import { ZOMATO_DATASET } from '../services/drishtiData';

export const ExportTab: React.FC = () => {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [scheduled, setScheduled] = useState(false);

  const handleDownload = (format: string) => {
    setDownloading(format);
    setTimeout(() => {
      setDownloading(null);
      if (format === 'PDF') {
        window.print();
      } else {
        const content = format === 'JSON'
          ? JSON.stringify(ZOMATO_DATASET, null, 2)
          : 'domain,sessions,conversion,critical_findings\nzomato.com,24810,58.8%,2\n';

        const blob = new Blob([content], { type: format === 'JSON' ? 'application/json' : 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `drishti-export.${format.toLowerCase()}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }, 400);
  };

  const exportOptions = [
    {
      ext: 'PDF',
      title: 'Executive PDF Report',
      desc: 'Complete audit summary with priority findings, evidence citations, and ROI projections formatted for board presentation.',
      cta: 'Generate PDF',
      status: 'Ready'
    },
    {
      ext: 'CSV',
      title: 'Raw Click & Event Dump',
      desc: 'Normalized event log containing x/y coordinates, element selectors, device viewports, and timestamp deltas.',
      cta: 'Export CSV',
      status: '24.8K rows'
    },
    {
      ext: 'JSON',
      title: 'Structured Findings API',
      desc: 'Machine-readable JSON schema of all heuristics, failed rules, DOM nodes, and remediation steps for Jira integration.',
      cta: 'Download JSON',
      status: 'V1 schema'
    },
    {
      ext: 'HTML',
      title: 'Standalone HTML Report',
      desc: 'Self-contained interactive report with embedded heatmaps that can be opened offline in any web browser.',
      cta: 'Download HTML',
      status: 'Interactive'
    }
  ];

  return (
    <main style={{ padding: '34px 40px 60px', maxWidth: '900px' }}>
      
      <h2 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 600 }}>Export Dashboard Reports</h2>
      <p className="text-muted" style={{ margin: 0, fontSize: '13px' }}>
        Everything on screen, in the format your team reads it in
      </p>

      <hr className="hr" style={{ margin: '14px 0 30px' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {exportOptions.map((e) => (
          <div key={e.ext} className="card" style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', color: '#F0A93B', letterSpacing: '.1em', fontWeight: 700 }}>
                {e.ext}
              </span>
              <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>{e.title}</h4>
            </div>

            <p className="text-muted" style={{ margin: 0, fontSize: '13px', flex: 1, lineHeight: 1.5 }}>
              {e.desc}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
              <button
                onClick={() => handleDownload(e.ext)}
                className="btn btn-primary"
                disabled={downloading === e.ext}
              >
                {downloading === e.ext ? 'Preparing...' : e.cta}
              </button>
              <span style={{ fontSize: '11.5px', color: '#4a7a4a', fontWeight: 600 }}>{e.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px', border: '1px solid var(--color-divider)', borderRadius: 'var(--radius-md)', background: 'var(--color-surface)' }}>
        <span style={{ fontSize: '13.5px', flex: 1 }}>
          Receive weekly UX health report via email every Monday morning.
        </span>
        <button
          onClick={() => setScheduled(!scheduled)}
          className="btn btn-secondary"
          style={{ background: scheduled ? '#232046' : 'transparent', color: scheduled ? '#fff' : 'var(--color-text)' }}
        >
          {scheduled ? '✓ Scheduled' : 'Schedule weekly email'}
        </button>
      </div>

    </main>
  );
};
