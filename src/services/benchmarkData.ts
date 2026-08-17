import { AuditReport, SimplifiedDOMSnapshot, BehavioralData, FunnelStep } from '../types/drishti';

export const BENCHMARK_DOM_SNAPSHOT: SimplifiedDOMSnapshot = {
  pageUrl: 'https://store.acmegear.co/checkout',
  title: 'Checkout — AcmeGear Co.',
  viewportWidth: 1440,
  viewportHeight: 900,
  interactiveElementsCount: 24,
  elements: [
    {
      selector: 'button#place-order',
      tagName: 'BUTTON',
      label: 'Complete Order ($149.99)',
      bounds: { x: 820, y: 740, width: 320, height: 48 },
      isInteractive: true,
      fontSizePx: 16,
      fontColor: '#999999',
      bgColor: '#E5E5E5',
      contrastRatio: 1.8, // Fails WCAG 2.1 AA (requires 4.5:1)
      touchTargetWidthPx: 320,
      touchTargetHeightPx: 48,
      ariaLabel: 'Complete Order'
    },
    {
      selector: 'img#promo-banner-graphic',
      tagName: 'IMG',
      label: 'SAVE20 Coupon Graphic',
      bounds: { x: 820, y: 220, width: 320, height: 80 },
      isInteractive: false,
      altText: 'Use code SAVE20 for 20% off',
    },
    {
      selector: 'button.express-pay-mobile',
      tagName: 'BUTTON',
      label: 'Apple Pay Express',
      bounds: { x: 20, y: 180, width: 140, height: 28 }, // Height 28px fails 44px min target
      isInteractive: true,
      touchTargetWidthPx: 140,
      touchTargetHeightPx: 28,
      fontSizePx: 12
    },
    {
      selector: 'input#zipcode',
      tagName: 'INPUT',
      label: 'ZIP / Postal Code',
      bounds: { x: 120, y: 410, width: 240, height: 40 },
      isInteractive: true,
      isFormInput: true
    },
    {
      selector: 'input#card_number',
      tagName: 'INPUT',
      label: 'Credit Card Number',
      bounds: { x: 120, y: 520, width: 480, height: 40 },
      isInteractive: true,
      isFormInput: true
    },
    {
      selector: 'div.shipping-summary-row',
      tagName: 'DIV',
      label: 'Standard Shipping Fee: $19.99',
      bounds: { x: 820, y: 620, width: 320, height: 32 },
      isInteractive: false
    }
  ]
};

export const BENCHMARK_BEHAVIOR_DATA: BehavioralData = {
  totalSessions: 1420,
  completedSessions: 412,
  overallConversionRate: 29.01,
  averageTimeOnPageSec: 142,
  exitRatePercentage: 48.6,
  formFieldAbandonment: [
    {
      fieldId: 'zipcode',
      label: 'ZIP / Postal Code',
      selector: 'input#zipcode',
      totalInteractions: 890,
      reEntries: 312,
      abandonments: 142,
      hesitationTimeSec: 18.5
    },
    {
      fieldId: 'card_number',
      label: 'Credit Card Number',
      selector: 'input#card_number',
      totalInteractions: 610,
      reEntries: 184,
      abandonments: 98,
      hesitationTimeSec: 22.4
    }
  ],
  rageClicks: [
    {
      selector: 'img#promo-banner-graphic',
      elementLabel: 'SAVE20 Coupon Graphic (Non-Interactive Image)',
      clickCount: 184,
      userCount: 68,
      x: 920,
      y: 260,
      timeWindowMs: 800
    },
    {
      selector: 'button#place-order',
      elementLabel: 'Complete Order Button (Disabled State)',
      clickCount: 126,
      userCount: 44,
      x: 980,
      y: 760,
      timeWindowMs: 950
    }
  ],
  deadClicks: [
    {
      selector: 'button#place-order[disabled]',
      elementLabel: 'Disabled Complete Order Button',
      clickCount: 249,
      userCount: 92,
      x: 980,
      y: 760,
      reason: 'Button remains disabled with no validation error tooltips when required fields are missing.'
    },
    {
      selector: 'span.badge-free-shipping-tag',
      elementLabel: 'Free Shipping Badge Graphic',
      clickCount: 76,
      userCount: 31,
      x: 840,
      y: 190,
      reason: 'Users clicked expecting terms modal, but element is non-interactive.'
    }
  ],
  scrollDistribution: [
    { depthPercentage: 25, reachedUserCount: 1420, reachedPercentage: 100 },
    { depthPercentage: 50, reachedUserCount: 1180, reachedPercentage: 83.1 },
    { depthPercentage: 75, reachedUserCount: 740, reachedPercentage: 52.1 },
    { depthPercentage: 100, reachedUserCount: 483, reachedPercentage: 34.0 } // 66% drop off before reaching footer/CTA on mobile
  ],
  clicks: Array.from({ length: 45 }).map((_, i) => ({
    id: `clk-${i}`,
    x: 820 + (i % 5) * 20,
    y: 740 + (i % 3) * 10,
    selector: i % 2 === 0 ? 'button#place-order' : 'img#promo-banner-graphic',
    relativeX: 0.5,
    relativeY: 0.5,
    viewportWidth: 1440,
    viewportHeight: 900,
    timestamp: Date.now() - i * 1000,
    device: 'desktop' as const
  }))
};

export const BENCHMARK_FUNNEL_STEPS: FunnelStep[] = [
  {
    id: 'step-1',
    name: 'Cart View',
    url: 'https://store.acmegear.co/cart',
    sessions: 1420,
    conversions: 1140,
    dropoffs: 280,
    conversionRate: 80.28,
    dropoffRate: 19.72
  },
  {
    id: 'step-2',
    name: 'Account & Shipping Info',
    url: 'https://store.acmegear.co/checkout/shipping',
    sessions: 1140,
    conversions: 890,
    dropoffs: 250,
    conversionRate: 78.07,
    dropoffRate: 21.93
  },
  {
    id: 'step-3',
    name: 'Payment & Order Review',
    url: 'https://store.acmegear.co/checkout/payment',
    sessions: 890,
    conversions: 412,
    dropoffs: 478, // Major bottleneck leak: 478 sessions abandoned (53.7% drop-off)
    conversionRate: 46.29,
    dropoffRate: 53.71
  },
  {
    id: 'step-4',
    name: 'Order Confirmation KPI',
    url: 'https://store.acmegear.co/order-confirmation',
    sessions: 412,
    conversions: 412,
    dropoffs: 0,
    conversionRate: 100.0,
    dropoffRate: 0.0
  }
];

export const BENCHMARK_AUDIT_REPORT: AuditReport = {
  id: 'rep-benchmark-001',
  siteId: 'site-acme-gear',
  siteName: 'AcmeGear Co. Checkout',
  siteUrl: 'https://store.acmegear.co/checkout',
  kpiGoal: 'Complete Purchase (/order-confirmation)',
  timestamp: new Date().toISOString(),
  tier: 'live_insights',
  deviceType: 'desktop',
  viewportWidth: 1440,
  funnelSteps: BENCHMARK_FUNNEL_STEPS,
  domSnapshot: BENCHMARK_DOM_SNAPSHOT,
  behavior: BENCHMARK_BEHAVIOR_DATA,
  diagnosis: {
    executive_summary: '',
    findings: [],
    fix_first: '',
    overall_score: 0
  }
};
