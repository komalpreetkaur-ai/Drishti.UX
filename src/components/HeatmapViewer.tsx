import React, { useEffect, useRef, useState } from 'react';
import {
  Flame,
  MousePointer,
  Zap,
  AlertTriangle,
  Layers
} from 'lucide-react';
import { BehavioralData, DeviceType, SimplifiedDOMSnapshot } from '../types/drishti';

interface HeatmapViewerProps {
  domSnapshot: SimplifiedDOMSnapshot;
  behavior: BehavioralData;
  device: DeviceType;
}

export const HeatmapViewer: React.FC<HeatmapViewerProps> = ({
  domSnapshot,
  behavior,
  device
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Overlay Toggles
  const [showClickMap, setShowClickMap] = useState<boolean>(true);
  const [showScrollMap, setShowScrollMap] = useState<boolean>(false);
  const [showRageClicks, setShowRageClicks] = useState<boolean>(true);
  const [showDeadClicks, setShowDeadClicks] = useState<boolean>(true);

  const containerWidth = device === 'desktop' ? 940 : 390;
  const containerHeight = device === 'desktop' ? 680 : 780;

  // Draw Heatmap Overlay on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Scroll Depth Map Overlay
    if (showScrollMap) {
      const scrollGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      scrollGrad.addColorStop(0, 'rgba(16, 185, 129, 0.35)');   // 100% reached (Green)
      scrollGrad.addColorStop(0.3, 'rgba(234, 179, 8, 0.35)');  // 75% reached (Yellow)
      scrollGrad.addColorStop(0.7, 'rgba(249, 115, 22, 0.35)'); // 50% reached (Orange)
      scrollGrad.addColorStop(1, 'rgba(239, 68, 68, 0.4)');     // 25% reached (Red)

      ctx.fillStyle = scrollGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw % markers
      behavior.scrollDistribution.forEach((dist) => {
        const yPos = (dist.depthPercentage / 100) * canvas.height;
        ctx.strokeStyle = 'rgba(15, 23, 42, 0.6)';
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.lineTo(canvas.width, yPos);
        ctx.stroke();

        ctx.fillStyle = '#0F172A';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillText(`Scroll Depth ${dist.depthPercentage}% — ${dist.reachedPercentage.toFixed(1)}% reached (${dist.reachedUserCount} users)`, 16, yPos - 6);
      });
      ctx.setLineDash([]);
    }

    // 2. Radial Click Density Map
    if (showClickMap && behavior.clicks) {
      behavior.clicks.forEach((click) => {
        // Map to relative scale
        const scaleX = canvas.width / (device === 'desktop' ? 1440 : 390);
        const scaleY = canvas.height / (device === 'desktop' ? 900 : 800);
        const cx = click.x * scaleX;
        const cy = click.y * scaleY;

        const radGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 32);
        radGrad.addColorStop(0, 'rgba(220, 38, 38, 0.85)');
        radGrad.addColorStop(0.4, 'rgba(217, 119, 6, 0.6)');
        radGrad.addColorStop(0.8, 'rgba(234, 179, 8, 0.25)');
        radGrad.addColorStop(1, 'rgba(220, 38, 38, 0)');

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, 32, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // 3. Rage Clicks Pulse Targets
    if (showRageClicks && behavior.rageClicks) {
      behavior.rageClicks.forEach((rage) => {
        const scaleX = canvas.width / (device === 'desktop' ? 1440 : 390);
        const scaleY = canvas.height / (device === 'desktop' ? 900 : 800);
        const rx = rage.x * scaleX;
        const ry = rage.y * scaleY;

        ctx.fillStyle = 'rgba(220, 38, 38, 0.25)';
        ctx.beginPath();
        ctx.arc(rx, ry, 28, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#DC2626';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(rx, ry, 20, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#991B1B';
        ctx.font = 'bold 11px JetBrains Mono';
        ctx.fillText(`⚡ ${rage.clickCount} Rage Clicks (${rage.userCount} users)`, rx - 50, ry + 36);
      });
    }

    // 4. Dead Clicks Indicators
    if (showDeadClicks && behavior.deadClicks) {
      behavior.deadClicks.forEach((dead) => {
        const scaleX = canvas.width / (device === 'desktop' ? 1440 : 390);
        const scaleY = canvas.height / (device === 'desktop' ? 900 : 800);
        const dx = dead.x * scaleX;
        const dy = dead.y * scaleY;

        ctx.fillStyle = '#D97706';
        ctx.beginPath();
        ctx.arc(dx, dy, 14, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('❌', dx - 7, dy + 4);

        ctx.fillStyle = '#B45309';
        ctx.font = 'bold 10px JetBrains Mono';
        ctx.fillText(`${dead.clickCount} Dead Clicks`, dx - 35, dy - 18);
      });
    }
  }, [showClickMap, showScrollMap, showRageClicks, showDeadClicks, behavior, device, containerWidth, containerHeight]);

  const ctaClicks = behavior.clicks.filter((c) => c.selector.includes('place-order')).length;
  const ctaRatio = ((ctaClicks / (behavior.clicks.length || 1)) * 100).toFixed(1);

  return (
    <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', background: '#FFFFFF' }}>
      
      {/* Viewer Header Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Flame size={22} color="#D97706" />
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A' }}>
            Element-Relative Heatmap Viewer
          </h2>
          <span style={{ fontSize: '0.75rem', padding: '3px 10px', borderRadius: '99px', background: 'rgba(217, 119, 6, 0.12)', color: '#B45309', border: '1px solid rgba(217, 119, 6, 0.3)', fontWeight: 700 }}>
            {device.toUpperCase()} ({containerWidth}px)
          </span>
        </div>

        {/* Overlay Control Switches */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowClickMap(!showClickMap)}
            style={{
              background: showClickMap ? 'rgba(220, 38, 38, 0.12)' : '#F8FAFC',
              color: showClickMap ? '#DC2626' : 'var(--text-muted)',
              border: showClickMap ? '1px solid rgba(220, 38, 38, 0.4)' : '1px solid #E2E8F0',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Flame size={14} /> Click Map
          </button>

          <button
            onClick={() => setShowScrollMap(!showScrollMap)}
            style={{
              background: showScrollMap ? 'rgba(5, 150, 105, 0.12)' : '#F8FAFC',
              color: showScrollMap ? '#059669' : 'var(--text-muted)',
              border: showScrollMap ? '1px solid rgba(5, 150, 105, 0.4)' : '1px solid #E2E8F0',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Layers size={14} /> Scroll Map
          </button>

          <button
            onClick={() => setShowRageClicks(!showRageClicks)}
            style={{
              background: showRageClicks ? 'rgba(217, 119, 6, 0.12)' : '#F8FAFC',
              color: showRageClicks ? '#D97706' : 'var(--text-muted)',
              border: showRageClicks ? '1px solid rgba(217, 119, 6, 0.4)' : '1px solid #E2E8F0',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Zap size={14} /> Rage Clicks
          </button>

          <button
            onClick={() => setShowDeadClicks(!showDeadClicks)}
            style={{
              background: showDeadClicks ? 'rgba(202, 138, 4, 0.12)' : '#F8FAFC',
              color: showDeadClicks ? '#CA8A04' : 'var(--text-muted)',
              border: showDeadClicks ? '1px solid rgba(202, 138, 4, 0.4)' : '1px solid #E2E8F0',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <AlertTriangle size={14} /> Dead Clicks
          </button>
        </div>
      </div>

      {/* Heatmap Stage Container (Clean Light Mock DOM) */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          maxWidth: `${containerWidth}px`,
          height: `${containerHeight}px`,
          margin: '0 auto',
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid #CBD5E1',
          background: '#F8FAFC',
          boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)'
        }}
      >
        {/* Rendered Mock DOM Page Visuals underneath */}
        <div style={{ position: 'absolute', inset: 0, padding: '24px', pointerEvents: 'none', color: '#0F172A' }}>
          
          {/* Mock Navigation Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px', marginBottom: '20px' }}>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1E1B4B' }}>ACMEGEAR CO.</span>
            <span style={{ fontSize: '0.8rem', color: '#475569' }}>🔒 256-Bit SSL Encrypted Checkout</span>
          </div>

          {/* Grid Layout for Checkout */}
          <div style={{ display: 'grid', gridTemplateColumns: device === 'desktop' ? '1fr 340px' : '1fr', gap: '20px' }}>
            
            {/* Left Column: Form Steps */}
            <div>
              <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <h4 style={{ fontSize: '0.9rem', color: '#1E1B4B', marginBottom: '8px' }}>1. Shipping Address & Contact</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div style={{ background: '#F8FAFC', padding: '8px', borderRadius: '4px', border: '1px solid #CBD5E1', fontSize: '0.75rem', color: '#475569' }}>First Name: Jane</div>
                  <div style={{ background: '#F8FAFC', padding: '8px', borderRadius: '4px', border: '1px solid #CBD5E1', fontSize: '0.75rem', color: '#475569' }}>Last Name: Doe</div>
                </div>
                <div style={{ background: '#FEF2F2', padding: '8px', borderRadius: '4px', border: '1px solid #FECACA', fontSize: '0.75rem', color: '#DC2626', marginTop: '8px', fontWeight: 600 }}>
                  ZIP / Postal Code: 90210 (312 Error Re-entries Recorded) ⚠️
                </div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <h4 style={{ fontSize: '0.9rem', color: '#1E1B4B', marginBottom: '8px' }}>2. Payment Method</h4>
                
                {/* Express Pay Mobile Small Target */}
                <button style={{ width: device === 'mobile' ? '140px' : '100%', height: '28px', background: '#000000', color: '#FFFFFF', border: '1px solid #333', borderRadius: '4px', fontSize: '0.75rem', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                  Pay Express (28px Touch Target Fail)
                </button>

                <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '4px', border: '1px solid #CBD5E1', fontSize: '0.75rem', color: '#475569' }}>
                  Card Number: •••• •••• •••• 4242 (22.4s Hesitation)
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Coupon */}
            <div>
              <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <h4 style={{ fontSize: '0.9rem', color: '#0F172A', marginBottom: '12px' }}>Order Summary</h4>
                
                {/* Promo Coupon Image (Rage Click Cause) */}
                <div style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', padding: '12px', borderRadius: '6px', color: '#92400E', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', marginBottom: '12px', border: '2px dashed #D97706' }}>
                  🏷️ SAVE20 — Click for 20% OFF!
                  <div style={{ fontSize: '0.65rem', fontStyle: 'italic', color: '#78350F' }}>(Static Image: 184 Rage Clicks)</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#475569', marginBottom: '6px' }}>
                  <span>Subtotal:</span>
                  <span>$129.99</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#DC2626', marginBottom: '12px', fontWeight: 700 }}>
                  <span>Standard Shipping:</span>
                  <span>+$19.99 (Surprise Fee)</span>
                </div>

                {/* Primary CTA (Low Contrast & Disabled Dead Clicks) */}
                <button style={{ width: '100%', padding: '14px', background: '#E5E5E5', color: '#999999', border: 'none', borderRadius: '6px', fontWeight: 800, fontSize: '0.9rem', cursor: 'not-allowed', marginTop: '10px' }}>
                  Complete Order ($149.99)
                </button>
                <div style={{ fontSize: '0.68rem', color: '#DC2626', marginTop: '6px', fontWeight: 600 }}>
                  ❌ 249 Dead Clicks (Disabled Button - No Error Tooltips)
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic HTML5 Canvas Heatmap Overlay */}
        <canvas
          ref={canvasRef}
          width={containerWidth}
          height={containerHeight}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}
        />
      </div>

      {/* Heatmap Metrics Toolbar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginTop: '20px' }}>
        <div style={{ background: '#F8FAFC', padding: '12px 16px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Recorded Heat Clicks</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>{behavior.clicks.length * 14}</div>
        </div>

        <div style={{ background: 'rgba(220, 38, 38, 0.08)', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(220, 38, 38, 0.2)' }}>
          <div style={{ fontSize: '0.75rem', color: '#DC2626', fontWeight: 700 }}>Rage Click Count</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#DC2626' }}>
            {behavior.rageClicks.reduce((a, b) => a + b.clickCount, 0)} ({behavior.rageClicks.reduce((a, b) => a + b.userCount, 0)} users)
          </div>
        </div>

        <div style={{ background: 'rgba(217, 119, 6, 0.08)', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(217, 119, 6, 0.2)' }}>
          <div style={{ fontSize: '0.75rem', color: '#D97706', fontWeight: 700 }}>Dead Clicks Recorded</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#D97706' }}>
            {behavior.deadClicks.reduce((a, b) => a + b.clickCount, 0)} ({behavior.deadClicks.reduce((a, b) => a + b.userCount, 0)} users)
          </div>
        </div>

        <div style={{ background: 'rgba(5, 150, 105, 0.08)', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(5, 150, 105, 0.2)' }}>
          <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>CTA Click Share</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669' }}>{ctaRatio}% of total clicks</div>
        </div>
      </div>

    </div>
  );
};
