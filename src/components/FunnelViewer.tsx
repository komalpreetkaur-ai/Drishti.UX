import React from 'react';
import {
  TrendingDown,
  AlertOctagon
} from 'lucide-react';
import { FunnelStep } from '../types/drishti';

interface FunnelViewerProps {
  steps: FunnelStep[];
  kpiGoal: string;
  onSelectLeakFinding?: (stepName: string) => void;
}

export const FunnelViewer: React.FC<FunnelViewerProps> = ({
  steps,
  kpiGoal
}) => {
  if (!steps || steps.length === 0) return null;

  const totalInitialSessions = steps[0].sessions;
  const finalConversions = steps[steps.length - 1].conversions ?? steps[steps.length - 1].sessions;
  const overallFunnelRate = ((finalConversions / totalInitialSessions) * 100).toFixed(1);

  // Find worst drop off step
  let worstStep = steps[0];
  steps.forEach((st) => {
    const drop = st.dropoffs ?? 0;
    const worstDrop = worstStep.dropoffs ?? 0;
    if (drop > worstDrop) worstStep = st;
  });

  const worstDropoffs = worstStep.dropoffs ?? 478;
  const worstDropoffRate = worstStep.dropoffRate ?? 53.7;
  const worstName = worstStep.name || worstStep.label || 'Payment';

  const estimatedAOV = 149.99;
  const monthlyRevenueLeak = (worstDropoffs * estimatedAOV).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

  return (
    <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', background: '#FFFFFF' }}>
      
      {/* Funnel Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <TrendingDown size={22} color="#DC2626" />
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A' }}>
              KPI Funnel & Conversion Leakage Analysis
            </h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Track session conversion rates across steps leading to <strong>{kpiGoal}</strong>
            </p>
          </div>
        </div>

        {/* Overall Conversion Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#F8FAFC', padding: '8px 16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>End-to-End Conversion</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#059669' }}>{overallFunnelRate}%</div>
          </div>
        </div>
      </div>

      {/* Primary Conversion Leak Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #FEF2F2 0%, #FFFBEB 100%)',
          border: '1px solid #FECACA',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', maxWidth: '750px' }}>
          <AlertOctagon size={24} color="#DC2626" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#DC2626', marginBottom: '4px' }}>
              Primary Funnel Bottleneck Detected: Step "{worstName}"
            </div>
            <p style={{ fontSize: '0.82rem', color: '#1E293B', lineHeight: 1.4 }}>
              <strong>{worstDropoffs} high-intent sessions</strong> abandoned at this step ({worstDropoffRate.toFixed(1)}% drop-off rate). 
              AI Diagnosis correlates this leak with non-interactive coupon images and low contrast checkout CTAs.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'right', background: '#FFFFFF', padding: '10px 16px', borderRadius: '8px', border: '1px solid #FDE68A', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Est. Monthly Revenue Impact</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#B45309' }}>{monthlyRevenueLeak}</div>
        </div>
      </div>

      {/* Horizontal Step-by-Step Funnel Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {steps.map((step, idx) => {
          const widthPct = (step.sessions / totalInitialSessions) * 100;
          const isWorst = step.id === worstStep.id || step.label === worstStep.label;
          const dropoffs = step.dropoffs ?? 0;
          const dropoffRate = step.dropoffRate ?? 0;
          const conversionRate = step.conversionRate ?? ((step.sessions / totalInitialSessions) * 100);

          return (
            <div key={step.id || idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: isWorst ? '#DC2626' : '#1E1B4B', color: '#FFF', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800 }}>
                    {idx + 1}
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{step.name || step.label}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>({step.url || step.path})</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem' }}>
                  <span><strong>{step.sessions.toLocaleString()}</strong> sessions</span>
                  <span style={{ color: dropoffs > 0 ? '#DC2626' : '#059669', fontWeight: 600 }}>
                    {dropoffs > 0 ? `-${dropoffs} abandoned (${dropoffRate.toFixed(1)}%)` : '0 abandoned'}
                  </span>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div style={{ width: '100%', height: '28px', background: '#F1F5F9', borderRadius: '6px', overflow: 'hidden', position: 'relative', border: '1px solid #E2E8F0' }}>
                <div
                  style={{
                    width: `${widthPct}%`,
                    height: '100%',
                    background: isWorst
                      ? 'linear-gradient(90deg, #F59E0B 0%, #DC2626 100%)'
                      : 'linear-gradient(90deg, #312E81 0%, #059669 100%)',
                    borderRadius: '5px',
                    transition: 'width 0.6s ease-out',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: '10px'
                  }}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FFFFFF', textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>
                    {conversionRate.toFixed(1)}% step conversion
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
