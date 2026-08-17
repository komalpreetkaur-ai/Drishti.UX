export type TabId = 'portfolio' | 'pages' | 'pagedetail' | 'overview' | 'findings' | 'funnel' | 'heatmap' | 'export' | 'sites' | 'install' | 'profile' | 'addsite' | 'instant' | 'settings';
export type DeviceType = 'desktop' | 'mobile';
export type OverlayType = 'click' | 'scroll' | 'none';
export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';
export type Confidence = 'Confirmed by data' | 'Hypothesis — needs test' | 'confirmed_by_data' | 'hypothesis_needs_test';

export interface Finding {
  id: string;
  issue: string;
  evidence: string; // Every finding MUST cite a number
  severity: Severity;
  confidence: Confidence;
  heuristic: string;
  element: string;
  recommendation: string;
  impact: string;
  evidenceView?: 'heatmap' | 'funnel';
  heuristic_violated?: string;
  affected_element?: string;
  estimated_impact?: string;
  category?: 'visual' | 'funnel' | 'frustration' | 'accessibility';
}

export type AIFinding = Finding;

export interface DiagnosisResult {
  executive_summary: string;
  findings: Finding[];
  fix_first: string;
  overall_score: number;
}

export interface FunnelStepData {
  num?: string;
  label?: string;
  path?: string;
  sessions: number;
  id?: string;
  name?: string;
  url?: string;
  conversions?: number;
  dropoffs?: number;
  conversionRate?: number;
  dropoffRate?: number;
}

export type FunnelStep = FunnelStepData;

export interface SignalData {
  label: string;
  note: string;
  value: string;
  color: string;
}

export interface SegmentSplit {
  label: string;
  value: string;
  percentage?: number;
  width?: string;
  tone?: string;
  color?: string;
}

export interface SiteDataset {
  domain: string;
  name: string;
  id: string;
  url: string;
  kpi: string;
  healthScore: number;
  totalSessions: number;
  overallConversion: string;
  abandonedRevenue: string;
  findings: Finding[];
  funnel: FunnelStepData[];
  desktopSignals: SignalData[];
  mobileSignals: SignalData[];
  segmentSplits: SegmentSplit[];
  heatmapTieIn: { desktop: string; mobile: string };
  execSummary: string;
  fixFirst: string;
}

export interface PortfolioSite {
  id: string;
  domain: string;
  label: string;
  live: boolean;
  kpi: string;
  conv: number | null;
  delta: number | null;
  sessions: number;
  orders: number;
  critical: number;
  high: number;
  total: number;
  lastRun: string;
  leak: string;
  tier: 'Live Insights' | 'Instant Audit';
}

export interface SharedIssue {
  issue: string;
  count: string;
  sites: string;
}

export interface LeakboardRow {
  domain: string;
  leak: string;
  pct: string;
  lost: string;
}

export interface TeamMember {
  name: string;
  email: string;
  role: string;
  last: string;
}

export interface LinkedSite {
  domain: string;
  id: string;
  status: string;
  ok: boolean;
  name?: string;
  url?: string;
  kpi?: string;
}

export interface LinkStep {
  num: string;
  title: string;
  body: string;
  done: string;
}

export interface DOMNodeInfo {
  selector: string;
  tagName: string;
  label: string;
  bounds: { x: number; y: number; width: number; height: number };
  isInteractive: boolean;
  fontSizePx?: number;
  fontColor?: string;
  bgColor?: string;
  contrastRatio?: number;
  touchTargetWidthPx?: number;
  touchTargetHeightPx?: number;
  altText?: string;
  ariaLabel?: string;
  isFormInput?: boolean;
}

export interface SimplifiedDOMSnapshot {
  pageUrl: string;
  title: string;
  viewportWidth: number;
  viewportHeight: number;
  interactiveElementsCount: number;
  elements: DOMNodeInfo[];
}

export interface ClickEvent {
  id: string;
  x: number;
  y: number;
  selector: string;
  relativeX: number;
  relativeY: number;
  viewportWidth: number;
  viewportHeight: number;
  timestamp: number;
  device: DeviceType;
}

export interface RageClick {
  selector: string;
  elementLabel: string;
  clickCount: number;
  userCount: number;
  x: number;
  y: number;
  timeWindowMs: number;
}

export interface DeadClick {
  selector: string;
  elementLabel: string;
  clickCount: number;
  userCount: number;
  x: number;
  y: number;
  reason: string;
}

export interface FormFieldAbandonment {
  fieldId: string;
  label: string;
  selector: string;
  totalInteractions: number;
  reEntries: number;
  abandonments: number;
  hesitationTimeSec: number;
}

export interface ScrollDepthData {
  depthPercentage: number;
  reachedUserCount: number;
  reachedPercentage: number;
}

export interface BehavioralData {
  totalSessions: number;
  completedSessions: number;
  overallConversionRate: number;
  averageTimeOnPageSec: number;
  exitRatePercentage: number;
  formFieldAbandonment: FormFieldAbandonment[];
  rageClicks: RageClick[];
  deadClicks: DeadClick[];
  scrollDistribution: ScrollDepthData[];
  clicks: ClickEvent[];
}

export interface AuditReport {
  id: string;
  siteId: string;
  siteName: string;
  siteUrl: string;
  kpiGoal: string;
  timestamp: string;
  tier: 'instant_audit' | 'live_insights';
  deviceType: DeviceType;
  viewportWidth: number;
  funnelSteps: FunnelStepData[];
  domSnapshot: SimplifiedDOMSnapshot;
  behavior: BehavioralData;
  diagnosis: DiagnosisResult;
}
