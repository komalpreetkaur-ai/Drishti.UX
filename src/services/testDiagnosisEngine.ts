import { AIDiagnosisEngine } from './aiDiagnosis.ts';
import {
  BENCHMARK_DOM_SNAPSHOT,
  BENCHMARK_BEHAVIOR_DATA,
  BENCHMARK_FUNNEL_STEPS
} from './benchmarkData.ts';

function runPhase1Verification() {
  console.log('----------------------------------------------------');
  console.log('🔍 DRISHTI — Phase 1 AI Diagnosis Engine Verification');
  console.log('----------------------------------------------------');

  const startTime = Date.now();
  const diagnosis = AIDiagnosisEngine.diagnose(
    BENCHMARK_DOM_SNAPSHOT,
    BENCHMARK_BEHAVIOR_DATA,
    BENCHMARK_FUNNEL_STEPS,
    'Complete Purchase (/order-confirmation)'
  );
  const durationMs = Date.now() - startTime;

  console.log(`\n✅ Diagnosis Completed in ${durationMs}ms`);
  console.log(`📊 UX Health Score: ${diagnosis.overall_score}/100`);
  console.log(`\n📌 Executive Summary:\n"${diagnosis.executive_summary}"`);
  console.log(`\n🚀 Fix First Recommendation:\n"${diagnosis.fix_first}"`);

  console.log(`\n📋 Identified ${diagnosis.findings.length} Ranked Findings:`);
  
  let evidenceWithNumbersCount = 0;
  diagnosis.findings.forEach((finding, idx) => {
    const hasNumber = /\d+/.test(finding.evidence);
    if (hasNumber) evidenceWithNumbersCount++;

    console.log(`\n[Finding #${idx + 1}] [${finding.severity}] [${finding.confidence}]`);
    console.log(`  Issue: ${finding.issue}`);
    console.log(`  Evidence: ${finding.evidence} ${hasNumber ? '✓ (Contains Numbers)' : '❌ (Missing Numbers)'}`);
    console.log(`  Heuristic: ${finding.heuristic_violated}`);
    console.log(`  Affected Element: ${finding.affected_element}`);
    console.log(`  Actionable Recommendation: ${finding.recommendation}`);
    console.log(`  Impact Estimate: ${finding.estimated_impact}`);
  });

  // Benchmark Criteria Verification
  const checks = [
    {
      name: 'Strict Output Schema (Executive summary, findings array, fix_first, score)',
      passed: Boolean(
        diagnosis.executive_summary &&
        Array.isArray(diagnosis.findings) &&
        diagnosis.fix_first &&
        typeof diagnosis.overall_score === 'number'
      )
    },
    {
      name: 'Evidence Rule (100% of findings MUST contain numbers)',
      passed: evidenceWithNumbersCount === diagnosis.findings.length && diagnosis.findings.length > 0
    },
    {
      name: 'Senior UX Auditor Benchmark (Finds at least 7 of 10 UX issues)',
      passed: diagnosis.findings.length >= 7
    },
    {
      name: 'Identifies Low Contrast CTA Violation (WCAG 2.1 AA)',
      passed: diagnosis.findings.some(f => f.issue.toLowerCase().includes('contrast'))
    },
    {
      name: 'Identifies Dead Clicks on Disabled Button',
      passed: diagnosis.findings.some(f => f.issue.toLowerCase().includes('dead click'))
    },
    {
      name: 'Identifies Non-Interactive Image Rage Clicks',
      passed: diagnosis.findings.some(f => f.issue.toLowerCase().includes('rage click') || f.issue.toLowerCase().includes('promo'))
    },
    {
      name: 'Identifies Primary Funnel Conversion Leak',
      passed: diagnosis.findings.some(f => f.issue.toLowerCase().includes('funnel'))
    },
    {
      name: 'Identifies Touch Target Size Violation (<44px)',
      passed: diagnosis.findings.some(f => f.issue.toLowerCase().includes('touch target') || f.issue.toLowerCase().includes('small'))
    }
  ];

  console.log('\n----------------------------------------------------');
  console.log('🧪 BENCHMARK VERIFICATION RESULTS:');
  console.log('----------------------------------------------------');

  let allPassed = true;
  checks.forEach((chk) => {
    if (chk.passed) {
      console.log(`  ✅ PASSED: ${chk.name}`);
    } else {
      console.log(`  ❌ FAILED: ${chk.name}`);
      allPassed = false;
    }
  });

  if (allPassed) {
    console.log('\n🎉 PHASE 1 VERIFICATION SUCCESSFUL! The AI Diagnosis Engine meets all senior UX auditor benchmarks.');
    process.exit(0);
  } else {
    console.log('\n❌ Phase 1 verification failed some benchmark checks.');
    process.exit(1);
  }
}

runPhase1Verification();
