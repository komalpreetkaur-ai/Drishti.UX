import {
  Finding,
  FunnelStepData,
  PortfolioSite,
  SharedIssue,
  LeakboardRow,
  TeamMember,
  LinkedSite,
  LinkStep,
  SiteDataset
} from '../types/drishti';

export const INDIGO = '#232046';
export const AMBER = '#F0A93B';
export const SEV = { Critical: '#8d2f2f', High: '#a06f24', Medium: '#605d5d', Low: '#7d7979' };

export const BLOBS = {
  desktop: [
    { x: 76, y: 12, r: 60, w: 0.55 }, { x: 30, y: 21, r: 46, w: 0.4 },
    { x: 84, y: 52, r: 92, w: 1 }, { x: 62, y: 52, r: 54, w: 0.62 },
    { x: 40, y: 52, r: 40, w: 0.3 }, { x: 78, y: 84, r: 84, w: 0.95 },
    { x: 22, y: 62, r: 44, w: 0.35 }, { x: 50, y: 92, r: 34, w: 0.22 }
  ],
  mobile: [
    { x: 70, y: 14, r: 44, w: 0.5 }, { x: 82, y: 50, r: 72, w: 1 },
    { x: 34, y: 50, r: 46, w: 0.45 }, { x: 66, y: 79, r: 70, w: 0.9 },
    { x: 26, y: 66, r: 40, w: 0.42 }, { x: 50, y: 88, r: 30, w: 0.2 }
  ]
};

export const SCROLL = {
  desktop: [{ pct: 100, at: 0 }, { pct: 94, at: 22 }, { pct: 71, at: 46 }, { pct: 43, at: 68 }, { pct: 18, at: 88 }],
  mobile: [{ pct: 100, at: 0 }, { pct: 88, at: 20 }, { pct: 55, at: 44 }, { pct: 27, at: 66 }, { pct: 9, at: 86 }]
};

export const ZMT_FINDINGS: Finding[] = [
  { id: 'f-1', issue: 'Delivery and packaging fees appear only at the payment step', evidence: '2,914 of 7,073 sessions (41.2%) abandon after the ₹118 fee line renders; 63% of those sessions had scrolled past the fee row less than 2 seconds earlier.', severity: 'Critical', confidence: 'Confirmed by data', heuristic: 'Visibility of system status', element: '.cart-summary__fees', recommendation: 'Show the full landed total on the cart step and keep it pinned through checkout. Baymard: surprise costs are the top stated reason for abandonment.', impact: '+4.8 to 6.1% orders — roughly ₹18.4L monthly at current AOV', evidenceView: 'funnel' },
  { id: 'f-2', issue: 'Disabled Cash on delivery tile absorbs 1,208 rage clicks', evidence: '1,208 rage clicks (3+ clicks inside 1s) on a non-interactive element, 84% of them on mobile; median 4.6 clicks before the session ends.', severity: 'Critical', confidence: 'Confirmed by data', heuristic: 'Error prevention', element: 'button[data-method="cod"][disabled]', recommendation: 'Either remove the tile when unavailable or replace it with an inline reason and the nearest available alternative.', impact: '+2.1% payment-step completion', evidenceView: 'heatmap' },
  { id: 'f-3', issue: 'Coupon field pulls attention away from the primary action', evidence: '14.7% of all checkout clicks land on the coupon input or Apply; median 19.4s hesitation before Place order on sessions that touched it.', severity: 'High', confidence: 'Hypothesis — needs test', heuristic: 'Aesthetic and minimalist design', element: '#coupon-input', recommendation: 'Collapse the coupon field behind a text link and surface auto-applied offers instead.', impact: '−6 to 9s median time to order', evidenceView: 'heatmap' },
  { id: 'f-4', issue: 'Place order button fails contrast against its container on mobile', evidence: 'Measured 3.4:1 at 13.5px — below the 4.5:1 WCAG AA threshold for body text; 61% of sessions are mobile.', severity: 'High', confidence: 'Confirmed by data', heuristic: 'WCAG 2.1 AA — contrast', element: '.btn-place-order', recommendation: 'Lighten the label to pure white and raise it to 16px, or darken the container by two ramp steps.', impact: 'Accessibility compliance; measurable lift unproven', evidenceView: 'heatmap' },
  { id: 'f-5', issue: 'Change address link is a 22px touch target', evidence: 'Target measures 22×16px against the 44px minimum; 318 dead clicks recorded within 12px of the link on mobile.', severity: 'Medium', confidence: 'Confirmed by data', heuristic: 'WCAG 2.1 AA — target size', element: '.address-card a', recommendation: 'Expand to a 44px-tall row with the whole address card tappable.', impact: '−318 dead clicks per week', evidenceView: 'heatmap' },
  { id: 'f-6', issue: 'Terms line sits below the fold for 82% of mobile sessions', evidence: 'Only 9% of mobile sessions reach the 86% scroll depth where the terms line renders.', severity: 'Low', confidence: 'Hypothesis — needs test', heuristic: 'Help and documentation', element: '.legal-note', recommendation: 'Move the line directly under Place order so it is visible at the point of commitment.', impact: 'Compliance clarity', evidenceView: 'heatmap' }
];

export const ZMT_FUNNEL: FunnelStepData[] = [
  { num: '01', label: 'Restaurant page', path: '/restaurant/:id', sessions: 24810 },
  { num: '02', label: 'Cart', path: '/cart', sessions: 11902 },
  { num: '03', label: 'Address confirmed', path: '/checkout#address', sessions: 8540 },
  { num: '04', label: 'Payment reached', path: '/checkout#payment', sessions: 7073 },
  { num: '05', label: 'Order placed', path: '/order-confirmation', sessions: 4159 }
];

export const BKG_FINDINGS: Finding[] = [
  { id: 'bkg-1', issue: 'Address form asks for eleven fields before showing a delivery slot', evidence: '1,276 of 2,780 sessions (45.9%) leave the address form; median 74s spent in it and 412 field re-entries on the pincode input alone.', severity: 'Critical', confidence: 'Confirmed by data', heuristic: 'User control and freedom', element: 'form#delivery-address', recommendation: 'Ask for pincode first, confirm the slot, then collect the rest. Baymard: checkout forms above eight fields lose completion sharply.', impact: '+5.2 to 7.4% orders — roughly ₹6.1L monthly', evidenceView: 'funnel' },
  { id: 'bkg-2', issue: 'Delivery and handling charge of ₹129 appears after the address step', evidence: '449 of 1,504 sessions (29.9%) abandon at payment; 71% of them saw the charge for the first time on that screen.', severity: 'High', confidence: 'Confirmed by data', heuristic: 'Visibility of system status', element: '.summary__handling', recommendation: 'Quote the landed total on the product page for the entered pincode.', impact: '+2.4% payment-step completion', evidenceView: 'funnel' },
  { id: 'bkg-3', issue: 'Pay on delivery tile is disabled without a reason', evidence: '327 rage clicks on a non-interactive tile, 88% on mobile; median 3.9 clicks before exit.', severity: 'High', confidence: 'Confirmed by data', heuristic: 'Error prevention', element: 'button[data-method="pod"][disabled]', recommendation: 'Hide the tile for ineligible pincodes, or state why it is unavailable.', impact: '+1.3% payment-step completion', evidenceView: 'heatmap' },
  { id: 'bkg-4', issue: 'Cake weight selector reads as decorative, not interactive', evidence: '214 dead clicks on the weight chips; only 9% of sessions change the default 500g.', severity: 'High', confidence: 'Hypothesis — needs test', heuristic: 'Consistency and standards', element: '.weight-chip', recommendation: 'Give the chips a selected state and a visible border on rest.', impact: 'Higher average order value; unquantified', evidenceView: 'heatmap' },
  { id: 'bkg-5', issue: 'Confirm order label fails contrast on the pink surface', evidence: 'Measured 2.9:1 at 14px — below the 4.5:1 WCAG AA threshold; 68% of sessions are mobile.', severity: 'Medium', confidence: 'Confirmed by data', heuristic: 'WCAG 2.1 AA — contrast', element: '.btn-confirm', recommendation: 'Darken the surface two ramp steps or set the label to pure white.', impact: 'Accessibility compliance', evidenceView: 'heatmap' },
  { id: 'bkg-6', issue: 'Promo code field sits above the total and is opened by 21% of sessions', evidence: '21.4% of checkout clicks land on the promo field; those sessions take 24s longer to convert.', severity: 'Medium', confidence: 'Hypothesis — needs test', heuristic: 'Aesthetic and minimalist design', element: '#promo-input', recommendation: 'Collapse it behind a link and auto-apply eligible offers.', impact: '−18 to 24s median time to order', evidenceView: 'heatmap' },
  { id: 'bkg-7', issue: 'Delivery slot note renders below the fold on mobile', evidence: 'Only 12% of mobile sessions reach the 84% scroll depth where the slot note sits.', severity: 'Low', confidence: 'Hypothesis — needs test', heuristic: 'Help and documentation', element: '.slot-note', recommendation: 'Move it directly under the total.', impact: 'Fewer support queries', evidenceView: 'heatmap' }
];

export const BKG_FUNNEL: FunnelStepData[] = [
  { num: '01', label: 'Product page', path: '/cakes/:slug', sessions: 9420 },
  { num: '02', label: 'Cart', path: '/cart', sessions: 3510 },
  { num: '03', label: 'Address form', path: '/checkout#address', sessions: 2780 },
  { num: '04', label: 'Payment reached', path: '/checkout#payment', sessions: 1504 },
  { num: '05', label: 'Order placed', path: '/order-confirmation', sessions: 1055 }
];

export const MYN_FINDINGS: Finding[] = [
  { id: 'myn-f1', issue: 'Convenience fee of ₹99 appears only at the final payment step', evidence: '3,412 of 10,840 cart sessions (31.5%) abandon right after the ₹99 Convenience Fee is added to the price breakdown at /checkout/payment.', severity: 'Critical', confidence: 'Confirmed by data', heuristic: 'Visibility of system status', element: '.priceDetail-base-row .convenience-fee', recommendation: 'Surface the ₹99 convenience & handling fee on the initial cart drawer screen so buyers are aware of total costs before initiating payment.', impact: '+5.4% conversion lift — roughly ₹34.8L monthly recovered sales', evidenceView: 'funnel' },
  { id: 'myn-f2', issue: 'Disabled Cash on Delivery tile absorbs 1,480 rage clicks on mobile', evidence: '1,480 rage clicks (3+ rapid taps in 1s) recorded on the disabled COD payment method box on mobile devices.', severity: 'Critical', confidence: 'Confirmed by data', heuristic: 'Error prevention', element: '.payment-method-cod[disabled]', recommendation: 'Provide an inline explanation (e.g. "COD unavailable above ₹2,000") or auto-select UPI as the default alternative.', impact: '+2.8% payment completion rate', evidenceView: 'heatmap' },
  { id: 'myn-f3', issue: 'Apply Coupon drawer pulls focus away from Place Order CTA', evidence: '21.2s median hesitation recorded on sessions where users interacted with the coupon code field; 28.4% of users exit to search external deal sites.', severity: 'High', confidence: 'Hypothesis — needs test', heuristic: 'Aesthetic and minimalist design', element: '#apply-coupon-btn', recommendation: 'Auto-apply the best available coupon for logged-in users and collapse manual entry into a secondary link.', impact: '−12s hesitation before checkout', evidenceView: 'heatmap' }
];

export const MYN_FUNNEL: FunnelStepData[] = [
  { num: '01', label: 'Product page', path: '/buy/mens-clothing', sessions: 38450 },
  { num: '02', label: 'Cart view', path: '/checkout/cart', sessions: 18210 },
  { num: '03', label: 'Address selection', path: '/checkout/address', sessions: 13950 },
  { num: '04', label: 'Payment gateway', path: '/checkout/payment', sessions: 10840 },
  { num: '05', label: 'Order confirmed', path: '/checkout/confirmation', sessions: 7428 }
];

export const ZMT_MOCK = {
  title: 'Checkout', step: 'Step 3 of 4', addressLabel: 'Deliver to',
  address: 'Flat 402, Indiranagar 2nd Stage, Bengaluru 560038', addressLink: 'Change address',
  items: [
    { name: 'Paneer Butter Masala × 1', price: '₹329' },
    { name: 'Butter Naan × 3', price: '₹135' }
  ],
  feeLabel: 'Taxes, packaging & delivery', feePrice: '₹118',
  coupon: 'Enter coupon code', couponCta: 'Apply',
  methods: [{ label: 'UPI' }, { label: 'Card' }, { label: 'Netbanking' }, { label: 'Cash on delivery', off: true }],
  totalLabel: 'To pay', total: '₹582', cta: 'Place order',
  note: 'By placing this order you accept the terms of service'
};

export const BKG_MOCK = {
  title: 'Checkout', step: 'Step 2 of 3', addressLabel: 'Deliver to',
  address: '14 Sector 22, Gurugram 122015 · slot to be chosen', addressLink: 'Edit address',
  items: [
    { name: 'Chocolate Truffle Cake 1kg', price: '₹1,299' },
    { name: 'Candles & knife set', price: '₹49' }
  ],
  feeLabel: 'Delivery & handling', feePrice: '₹129',
  coupon: 'Have a promo code?', couponCta: 'Apply',
  methods: [{ label: 'UPI' }, { label: 'Card' }, { label: 'Wallet' }, { label: 'Pay on delivery', off: true }],
  totalLabel: 'Total', total: '₹1,477', cta: 'Confirm order',
  note: 'Your delivery slot is confirmed on the next screen'
};

export const MYN_MOCK = {
  title: 'Myntra Cart & Checkout', step: 'Step 2 of 4', addressLabel: 'Deliver to',
  address: 'Home - Flat 104, HSR Layout Sector 1, Bengaluru 560102', addressLink: 'Change address',
  items: [
    { name: 'Roadster Cotton Casual Shirt × 1', price: '₹899' },
    { name: 'HRX Running Shoes × 1', price: '₹1,499' }
  ],
  feeLabel: 'Convenience & Handling Fee', feePrice: '₹99',
  coupon: 'Apply Myntra Coupon Code', couponCta: 'Apply',
  methods: [{ label: 'UPI' }, { label: 'Card' }, { label: 'Netbanking' }, { label: 'Cash on delivery', off: true }],
  totalLabel: 'Total amount', total: '₹2,497', cta: 'Place Order',
  note: 'By placing order you accept Myntra terms of service'
};

export const SITE_DATA: Record<string, any> = {
  zmt_9f4c21: {
    findings: ZMT_FINDINGS, funnel: ZMT_FUNNEL, leakIndex: 3, mock: ZMT_MOCK,
    page: '/checkout · click density and scroll depth',
    summary: 'Checkout converts at 58.8% and the loss concentrates on the payment step, where a disabled Cash on delivery option and a late-appearing ₹118 fee line account for most abandonment. Fix the fee disclosure first: it is the only Critical finding confirmed by both click and funnel data.',
    leakTitle: 'Payment step loses 2,914 sessions',
    leakBody: '41.2% of sessions that reach payment never place the order. On the same step we recorded 1,208 rage clicks on the greyed-out Cash on delivery tile and a median hesitation of 19.4s before Place order.',
    segments: [
      { label: 'Mobile web', value: '51.4%', width: '51.4%', tone: '#8d2f2f' },
      { label: 'Desktop', value: '68.9%', width: '68.9%', tone: INDIGO },
      { label: 'App webview', value: '73.2%', width: '73.2%', tone: '#4a7a4a' }
    ],
    stats: {
      desktop: [
        { label: 'Clicks on Place order', note: 'share of all page clicks', value: '18.6%', color: INDIGO },
        { label: 'Rage clicks', note: 'mostly the COD tile', value: '194', color: '#8d2f2f' },
        { label: 'Dead clicks', note: 'non-interactive elements', value: '133', color: '#8d2f2f' },
        { label: 'Median scroll depth', note: 'fee line seen by most', value: '78%', color: INDIGO },
        { label: 'Hesitation before CTA', note: 'median, sessions that ordered', value: '11.8s', color: '#a06f24' }
      ],
      mobile: [
        { label: 'Clicks on Place order', note: 'share of all page clicks', value: '11.2%', color: INDIGO },
        { label: 'Rage clicks', note: 'mostly the COD tile', value: '1,014', color: '#8d2f2f' },
        { label: 'Dead clicks', note: 'non-interactive elements', value: '486', color: '#8d2f2f' },
        { label: 'Median scroll depth', note: 'terms line never reached', value: '54%', color: INDIGO },
        { label: 'Hesitation before CTA', note: 'median, sessions that ordered', value: '19.4s', color: '#a06f24' }
      ]
    },
    tieIn: {
      desktop: 'The densest cluster sits on the fee row, seconds before 41.2% of these sessions abandon.',
      mobile: '1,014 of the rage clicks here are mobile sessions hammering the disabled Cash on delivery tile.'
    },
    events: '184,206', lastRunNote: 'Four passes completed 6 hours ago on 184,206 events. Next run Monday 06:00 IST.'
  },
  bkg_5d81a2: {
    findings: BKG_FINDINGS, funnel: BKG_FUNNEL, leakIndex: 2, mock: BKG_MOCK,
    page: '/checkout · click density and scroll depth',
    summary: 'Checkout converts at 30.0% from the cart and the loss sits in the address form, where eleven fields stand between the customer and a delivery slot. A ₹129 handling charge revealed after that form compounds it at payment.',
    leakTitle: 'Address form loses 1,276 sessions',
    leakBody: '45.9% of sessions that open the address form never reach payment. Median time in the form is 74s, with 412 re-entries on the pincode field alone.',
    segments: [
      { label: 'Mobile web', value: '24.1%', width: '24.1%', tone: '#8d2f2f' },
      { label: 'Desktop', value: '41.6%', width: '41.6%', tone: INDIGO },
      { label: 'Tablet', value: '38.0%', width: '38%', tone: '#4a7a4a' }
    ],
    stats: {
      desktop: [
        { label: 'Clicks on Confirm order', note: 'share of all page clicks', value: '14.2%', color: INDIGO },
        { label: 'Rage clicks', note: 'mostly the Pay on delivery tile', value: '39', color: '#8d2f2f' },
        { label: 'Dead clicks', note: 'weight chips and slot note', value: '81', color: '#8d2f2f' },
        { label: 'Median scroll depth', note: 'handling charge seen by most', value: '81%', color: INDIGO },
        { label: 'Time in address form', note: 'median, all sessions', value: '74s', color: '#a06f24' }
      ],
      mobile: [
        { label: 'Clicks on Confirm order', note: 'share of all page clicks', value: '8.4%', color: INDIGO },
        { label: 'Rage clicks', note: 'mostly the Pay on delivery tile', value: '288', color: '#8d2f2f' },
        { label: 'Dead clicks', note: 'weight chips and slot note', value: '214', color: '#8d2f2f' },
        { label: 'Median scroll depth', note: 'slot note never reached', value: '49%', color: INDIGO },
        { label: 'Time in address form', note: 'median, all sessions', value: '96s', color: '#a06f24' }
      ]
    },
    tieIn: {
      desktop: 'Clicks pile onto the address block, where 45.9% of these sessions stop before payment.',
      mobile: '288 rage clicks here are mobile sessions tapping the disabled Pay on delivery tile.'
    },
    events: '61,880', lastRunNote: 'Four passes completed 9 hours ago on 61,880 events. Next run Monday 06:00 IST.'
  },
  myn_88a912: {
    findings: MYN_FINDINGS, funnel: MYN_FUNNEL, leakIndex: 3, mock: MYN_MOCK,
    page: '/checkout/cart · click density and scroll depth',
    summary: 'Myntra Cart converts at 52.4%. The primary conversion leak occurs at the Payment step (/checkout/payment), where 3,412 sessions abandon. Key culprits include a late ₹99 Convenience & Handling fee line and 1,480 rage clicks on a disabled Cash on Delivery option.',
    leakTitle: 'Payment gateway loses 3,412 sessions',
    leakBody: '31.5% of sessions that reach payment never complete the order. On the same step we recorded 1,480 rage clicks on the disabled Cash on delivery tile and a median hesitation of 21.2s before Place Order.',
    segments: [
      { label: 'Mobile app', value: '68.4%', width: '68.4%', tone: '#4a7a4a' },
      { label: 'Mobile web', value: '48.2%', width: '48.2%', tone: '#8d2f2f' },
      { label: 'Desktop web', value: '64.1%', width: '64.1%', tone: INDIGO }
    ],
    stats: {
      desktop: [
        { label: 'Clicks on Place Order', note: 'share of cart clicks', value: '22.4%', color: INDIGO },
        { label: 'Rage clicks', note: 'coupon & COD tiles', value: '284', color: '#8d2f2f' },
        { label: 'Dead clicks', note: 'size & address links', value: '186', color: '#8d2f2f' },
        { label: 'Median scroll depth', note: 'cart summary seen', value: '82%', color: INDIGO },
        { label: 'Hesitation before CTA', note: 'sessions touching coupon', value: '21.2s', color: '#a06f24' }
      ],
      mobile: [
        { label: 'Clicks on Place Order', note: 'share of cart clicks', value: '14.8%', color: INDIGO },
        { label: 'Rage clicks', note: 'mostly COD disabled tile', value: '1,480', color: '#8d2f2f' },
        { label: 'Dead clicks', note: 'size selector missing feedback', value: '412', color: '#8d2f2f' },
        { label: 'Median scroll depth', note: 'terms below fold', value: '58%', color: INDIGO },
        { label: 'Hesitation before CTA', note: 'median time on cart', value: '24.6s', color: '#a06f24' }
      ]
    },
    tieIn: {
      desktop: '32.4% of clicks cluster on the Apply Coupon drawer, adding 21.2s median hesitation before payment.',
      mobile: '1,480 rage clicks recorded on mobile viewports on the greyed-out Cash on Delivery option tile.'
    },
    events: '142,900', lastRunNote: 'Four passes completed 4 hours ago on 142,900 events. Next run Monday 06:00 IST.'
  }
};

export const ZOMATO_DATASET: SiteDataset = {
  domain: 'zomato.com',
  name: 'Zomato Checkout',
  id: 'zmt_9f4c21',
  url: 'https://zomato.com/checkout',
  kpi: 'Order placed · /order-confirmation',
  healthScore: 58,
  totalSessions: 24810,
  overallConversion: '58.8%',
  abandonedRevenue: '₹18.4L / mo',
  execSummary: SITE_DATA.zmt_9f4c21.summary,
  fixFirst: ZMT_FINDINGS[0].recommendation,
  heatmapTieIn: SITE_DATA.zmt_9f4c21.tieIn,
  findings: ZMT_FINDINGS,
  funnel: ZMT_FUNNEL,
  desktopSignals: SITE_DATA.zmt_9f4c21.stats.desktop,
  mobileSignals: SITE_DATA.zmt_9f4c21.stats.mobile,
  segmentSplits: [
    { label: 'Mobile web', value: '51.4%', width: '51.4%', tone: '#8d2f2f' },
    { label: 'Desktop', value: '68.9%', width: '68.9%', tone: INDIGO },
    { label: 'App webview', value: '73.2%', width: '73.2%', tone: '#4a7a4a' }
  ]
};

export const SITES_REGISTRY = SITE_DATA;

export const SITES: PortfolioSite[] = [
  {
    id: 'zmt_9f4c21', domain: 'zomato.com', label: 'Food delivery · IN', live: true,
    kpi: 'Order placed', conv: 16.8, delta: 0.4, sessions: 24810, orders: 4159,
    critical: 2, high: 2, total: 6, lastRun: '6 hours ago',
    leak: 'Payment step — 41.2% lost', tier: 'Live Insights'
  },
  {
    id: 'myn_88a912', domain: 'myntra.com', label: 'E-commerce fashion · IN', live: true,
    kpi: 'Order placed', conv: 19.3, delta: 1.2, sessions: 38450, orders: 7428,
    critical: 2, high: 2, total: 5, lastRun: '4 hours ago',
    leak: 'Payment gateway — 31.5% lost', tier: 'Live Insights'
  },
  {
    id: 'bkg_5d81a2', domain: 'bakingo.com', label: 'Bakery · IN', live: true,
    kpi: 'Order placed', conv: 11.2, delta: -1.6, sessions: 9420, orders: 1055,
    critical: 1, high: 3, total: 7, lastRun: '9 hours ago',
    leak: 'Address form — 45.9% lost', tier: 'Live Insights'
  },
  {
    id: 'bnk_2c77e0', domain: 'blinkit.com', label: 'Quick commerce · IN', live: false,
    kpi: 'Order placed', conv: null, delta: null, sessions: 0, orders: 0,
    critical: 0, high: 0, total: 0, lastRun: 'Never',
    leak: 'Awaiting first ping', tier: 'Live Insights'
  },
  {
    id: 'dno_7e11b4', domain: 'dineout.com', label: 'Reservations · IN', live: false,
    kpi: 'Reservation confirmed', conv: null, delta: null, sessions: 0, orders: 0,
    critical: 1, high: 2, total: 5, lastRun: '2 days ago',
    leak: 'Instant Audit only — no behaviour data', tier: 'Instant Audit'
  }
];

export const SHARED_ISSUES: SharedIssue[] = [
  { issue: 'Disabled Cash on delivery / Pay on delivery tile absorbs rage clicks', count: '3 sites', sites: 'zomato.com, bakingo.com, myntra.com' },
  { issue: 'Delivery fee revealed for the first time at the payment step', count: '3 sites', sites: 'zomato.com, bakingo.com, myntra.com' },
  { issue: 'Primary CTA label fails WCAG AA contrast threshold on mobile', count: '2 sites', sites: 'zomato.com, bakingo.com' }
];

export const LEAKBOARD: LeakboardRow[] = [
  { domain: 'bakingo.com', leak: 'Address form', pct: '45.9%', lost: '1,276 sessions' },
  { domain: 'zomato.com', leak: 'Payment step', pct: '41.2%', lost: '2,914 sessions' },
  { domain: 'myntra.com', leak: 'Payment gateway', pct: '31.5%', lost: '3,412 sessions' }
];

export const GOALS = [
  { label: 'Purchase completed', url: '/order-confirmation', steps: ['Cart viewed', 'Checkout started', 'Payment reached', 'Order placed'] },
  { label: 'Signup finished', url: '/welcome', steps: ['Landing page', 'Form started', 'Account created'] },
  { label: 'Form submitted', url: '/thank-you', steps: ['Page viewed', 'Form started', 'Form submitted'] }
];

export const LINKED_SITES: LinkedSite[] = SITES.map(s => ({
  domain: s.domain, id: s.id, status: s.live ? 'Receiving events' : 'Awaiting ping', ok: s.live, name: s.domain, url: 'https://' + s.domain, kpi: s.kpi
}));

export const TEAM_MEMBERS: TeamMember[] = [
  { name: 'Ananya Rao', email: 'ananya@zomato.com', role: 'Owner', last: 'Now' },
  { name: 'Vikram Shetty', email: 'vikram@zomato.com', role: 'Editor', last: '2 days ago' },
  { name: 'Priya Nambiar', email: 'priya@zomato.com', role: 'Viewer', last: '11 days ago' }
];

export const LINK_STEPS: LinkStep[] = [
  { num: '01', title: 'Add the site', body: 'Enter the domain you want Drishti to watch. We create a Site ID and a private ingestion key for it.', done: 'Site added · ID created' },
  { num: '02', title: 'Verify ownership', body: 'Prove the domain is yours with a DNS TXT record or an HTML meta tag. Verification stops anyone else sending events under your Site ID.', done: 'Verified by DNS TXT record' },
  { num: '03', title: 'Install the snippet', body: 'Paste the one-line async script before the closing head tag, or add it through GTM. It waits for the first pageview and pings us back.', done: 'First ping received & confirmed' },
  { num: '04', title: 'Define the KPI and funnel', body: 'Name the goal, point it at a URL or a click target, then order the steps that lead to it. Every heatmap, funnel and finding is framed around this.', done: 'KPI & 5-step funnel defined' }
];
