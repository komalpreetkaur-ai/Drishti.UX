import React, { useState } from 'react';
import {
  Sparkles,
  Filter,
  TrendingUp,
  Code
} from 'lucide-react';
import { DiagnosisResult } from '../types/drishti';

interface AIFindingsFeedProps {
  diagnosis: DiagnosisResult;
}

export const AIFindingsFeed: React.FC<AIFindingsFeedProps> = ({ diagnosis }) => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedConfidence, setSelectedConfidence] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredFindings = diagnosis.findings.filter((finding) => {
    if (selectedSeverity !== 'all' && finding.severity !== selectedSeverity) return false;
    if (selectedConfidence !== 'all' && finding.confidence !== selectedConfidence) return false;
    if (selectedCategory !== 'all' && finding.category !== selectedCategory) return false;
    return true;
  });

  const criticalCount = diagnosis.findings.filter((f) => f.severity === 'Critical').length;
  const highCount = diagnosis.findings.filter((f) => f.severity === 'High').length;
  const confirmedCount = diagnosis.findings.filter((f) => f.confidence === 'confirmed_by_data').length;

  return (
    <div style={{ marginBottom: '32px' }}>
      
      {/* 1. Executive Summary & Health Score Header Card */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '28px', marginBottom: '24px', background: '#FFFFFF' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Sparkles size={20} color="#D97706" />
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#B45309', letterSpacing: '0.05em' }}>
                AI MULTI-PASS DIAGNOSIS SUMMARY
              </span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '12px', lineHeight: 1.3 }}>
              Executive UX Audit Report
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.6, maxWidth: '820px' }}>
              {diagnosis.executive_summary}
            </p>
          </div>

          {/* UX Health Score Gauge */}
          <div
            style={{
              background: 'linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)',
              border: '2px solid #FDE68A',
              borderRadius: '20px',
              padding: '20px 28px',
              textAlign: 'center',
              boxShadow: '0 4px 14px rgba(217, 119, 6, 0.15)',
              minWidth: '160px'
            }}
          >
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#92400E', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
              UX Health Score
            </div>
            <div style={{ fontSize: '2.8rem', fontWeight: 900, color: '#B45309' }}>
              {diagnosis.overall_score}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700 }}>
              {diagnosis.overall_score < 60 ? '⚠️ High Conversion Risk' : 'Good Baseline'}
            </div>
          </div>
        </div>
      </div>

      {/* 2. "FIX FIRST" Highlight Card */}
      {diagnosis.fix_first && (
        <div
          style={{
            background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
            border: '1px solid #FDE68A',
            borderRadius: '16px',
            padding: '20px 24px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            boxShadow: '0 4px 12px rgba(217, 119, 6, 0.1)'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#D97706',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '1.2rem',
              flexShrink: 0
            }}
          >
            #1
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
              RECOMMENDED FIX FIRST ACTION
            </div>
            <p style={{ fontSize: '0.92rem', color: '#78350F', fontWeight: 700, lineHeight: 1.5 }}>
              {diagnosis.fix_first}
            </p>
          </div>
        </div>
      )}

      {/* 3. Filter Toolbar */}
      <div
        className="glass-panel"
        style={{
          padding: '16px 20px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          background: '#FFFFFF'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} color="#D97706" />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>Filter Findings ({filteredFindings.length} showing):</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Severity Filter */}
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            style={{
              background: '#F8FAFC',
              color: 'var(--text-main)',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '0.78rem',
              fontWeight: 700,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all" style={{ background: '#FFF' }}>All Severities ({diagnosis.findings.length})</option>
            <option value="Critical" style={{ background: '#FFF' }}>Critical Only ({criticalCount})</option>
            <option value="High" style={{ background: '#FFF' }}>High Only ({highCount})</option>
            <option value="Medium" style={{ background: '#FFF' }}>Medium Only</option>
          </select>

          {/* Confidence Filter */}
          <select
            value={selectedConfidence}
            onChange={(e) => setSelectedConfidence(e.target.value)}
            style={{
              background: '#F8FAFC',
              color: 'var(--text-main)',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '0.78rem',
              fontWeight: 700,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all" style={{ background: '#FFF' }}>All Confidence</option>
            <option value="confirmed_by_data" style={{ background: '#FFF' }}>Confirmed by Data ({confirmedCount})</option>
            <option value="hypothesis_needs_test" style={{ background: '#FFF' }}>Hypothesis Needs Test</option>
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              background: '#F8FAFC',
              color: 'var(--text-main)',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '0.78rem',
              fontWeight: 700,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all" style={{ background: '#FFF' }}>All Categories</option>
            <option value="visual" style={{ background: '#FFF' }}>Visual & Layout</option>
            <option value="funnel" style={{ background: '#FFF' }}>Funnel Leaks</option>
            <option value="frustration" style={{ background: '#FFF' }}>Frustration Signals</option>
            <option value="accessibility" style={{ background: '#FFF' }}>Accessibility (WCAG)</option>
          </select>
        </div>
      </div>

      {/* 4. Findings Card Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredFindings.map((finding) => (
          <div
            key={finding.id}
            className="glass-panel"
            style={{
              padding: '24px',
              background: '#FFFFFF',
              borderLeft: finding.severity === 'Critical' ? '4px solid #DC2626' : finding.severity === 'High' ? '4px solid #EA580C' : '4px solid #2563EB'
            }}
          >
            {/* Top Badges Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className={`badge badge-${finding.severity.toLowerCase()}`}>
                  {finding.severity} Severity
                </span>

                <span className={`badge badge-${finding.confidence === 'confirmed_by_data' ? 'confirmed' : 'hypothesis'}`}>
                  {finding.confidence === 'confirmed_by_data' ? '✓ Confirmed by Data' : '🧪 Hypothesis — Needs A/B Test'}
                </span>

                <span style={{ fontSize: '0.72rem', background: '#F1F5F9', color: '#475569', padding: '3px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontWeight: 600 }}>
                  {finding.heuristic_violated}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#B45309' }}>
                <Code size={14} />
                <span className="code-inline">{finding.affected_element}</span>
              </div>
            </div>

            {/* Issue Title */}
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}>
              {finding.issue}
            </h3>

            {/* Evidence Block (Strict Rule: Contains Numbers) */}
            <div
              style={{
                background: '#F8FAFC',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                marginBottom: '14px',
                fontSize: '0.88rem',
                color: '#1E293B',
                lineHeight: 1.5
              }}
            >
              <strong style={{ color: '#D97706' }}>Empirical Evidence:</strong> {finding.evidence}
            </div>

            {/* Recommendation & Estimated Impact */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', alignItems: 'center' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                <strong style={{ color: '#0F172A' }}>Actionable Fix:</strong> {finding.recommendation}
              </p>

              <div
                style={{
                  background: 'rgba(5, 150, 105, 0.12)',
                  border: '1px solid rgba(5, 150, 105, 0.3)',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  whiteSpace: 'nowrap',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <TrendingUp size={14} /> {finding.estimated_impact}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
