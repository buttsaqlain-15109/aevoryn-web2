/**
 * COMPREHENSIVE NEGATIVE TESTS SUITE FOR AEVORYN COMPLIANCE GUARDRAILS
 *
 * Verifies that the automated test & build system rigorously FAILS when
 * fed unverified or prohibited claims:
 *  1. "Proctor testing"
 *  2. "Aramco approved vendor"
 *  3. "sieve analysis"
 *  4. "ASTM"
 *  5. "SASO"
 *  6. "telematics"
 *  7. "TUV"
 *  8. "wet lease"
 *  9. "Qiwa"
 * 10. "giga-project"
 * 11. "Active & Verified"
 * 12. A 5th division card (injected card counted, output says 'found 5')
 * 13. An invented client scope
 * 14. A different ISO scope text
 * 15. A pending_client fact rendered via getVerified()
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import {
  locationFacts,
  getVerified,
} from "../src/data/company.facts.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT_DIR, "src");
const factsFile = path.join(SRC_DIR, "data", "company.facts.ts");

console.log("====================================================");
console.log("AEVORYN COMPLIANCE NEGATIVE TESTS RUNNER");
console.log("====================================================\n");

let passedNegativeTests = 0;
let totalNegativeTests = 0;

// Helper to run verify-facts.ts and check if it fails with expected message
function runVerifyExpectingFailure(testName: string, expectedPattern: RegExp): boolean {
  totalNegativeTests++;
  try {
    execSync("node --experimental-strip-types scripts/verify-facts.ts", {
      cwd: ROOT_DIR,
      stdio: "pipe",
      encoding: "utf-8",
    });
    console.error(`❌ [FAILED] ${testName}: Expected failure, but verify-facts PASSED!`);
    return false;
  } catch (err: any) {
    const output = (err.stdout || "") + (err.stderr || "");
    if (expectedPattern.test(output)) {
      const matchLine = output.split("\n").find((l: string) => expectedPattern.test(l))?.trim();
      console.log(`✅ [PASSED] ${testName}: Caught expected failure.`);
      console.log(`   Captured: ${matchLine}`);
      passedNegativeTests++;
      return true;
    } else {
      console.error(`❌ [FAILED] ${testName}: Failed, but did not match expected pattern '${expectedPattern}'.`);
      console.error(`   Output:\n${output}`);
      return false;
    }
  }
}

function testBannedPhrase(name: string, phrase: string, expectedPattern: RegExp) {
  console.log(`\nRunning Negative Test: '${phrase}' injection...`);
  const tempTestFile = path.join(SRC_DIR, `temp_banned_test_${Date.now()}.ts`);
  fs.writeFileSync(tempTestFile, `export const testClaim = "${phrase}";\n`);
  try {
    runVerifyExpectingFailure(name, expectedPattern);
  } finally {
    if (fs.existsSync(tempTestFile)) fs.unlinkSync(tempTestFile);
  }
}

// ----------------------------------------------------------------------------
// BANNED PHRASES TESTS
// ----------------------------------------------------------------------------
testBannedPhrase("1. Proctor testing", "Proctor compaction and soil testing", /Invented soil testing claim/i);
testBannedPhrase("2. Aramco approved vendor", "Aramco approved vendor certification", /Contradicts 'Service Provider Only' letter/i);
testBannedPhrase("3. sieve analysis", "Aggregate sieve analysis testing", /Invented aggregate testing claim/i);
testBannedPhrase("4. ASTM", "ASTM C33 concrete aggregate grading", /Invented material ASTM standard/i);
testBannedPhrase("5. SASO", "SASO 204 crushed stone compliance", /Invented material SASO standard/i);
testBannedPhrase("6. telematics", "Telematics fleet tracking system", /Invented equipment tracking claim/i);
testBannedPhrase("7. TUV", "TUV certified crane operator", /Unverified third-party inspection claim/i);
testBannedPhrase("8. wet lease", "Heavy equipment wet lease availability", /Invented leasing claim/i);
testBannedPhrase("9. Qiwa", "Qiwa compliance accreditation portal", /Unverified platform claim/i);
testBannedPhrase("10. giga-project", "Exclusive tier-1 giga-project contractor", /Unverified marketing claim/i);
testBannedPhrase("11. Active & Verified", "ISO status: Active & Verified", /Prohibited endorsement label/i);

// ----------------------------------------------------------------------------
// 12. 5th Division Card injection (Counted as 5)
// ----------------------------------------------------------------------------
console.log("\nRunning Negative Test: 5th division card injection (must report 'found 5')...");
const originalFactsContent = fs.readFileSync(factsFile, "utf-8");
try {
  const fifthDivisionObject = `
  {
    id: "specialized-civil-works",
    divisionNumber: "05",
    titleEn: "Specialized Civil Works",
    titleAr: "أعمال مدنية متخصصة",
    scopeSummaryEn: "Injected fifth division for negative testing.",
    scopeSummaryAr: "قطاع خامس إضافي للاختبار السلبي.",
    verbatimBulletsEn: ["Injected test bullet"],
    verbatimBulletsAr: ["عنصر اختباري"],
    route: "/capabilities/civil",
  },
];`;
  const modifiedFacts = originalFactsContent.replace(
    /route: "\/capabilities\/equipment",\s*\n\s*},\s*\n\s*\];/,
    `route: "/capabilities/equipment",\n  },\n${fifthDivisionObject}`
  );
  fs.writeFileSync(factsFile, modifiedFacts);
  runVerifyExpectingFailure("12. 5th division card", /Expected exactly 4 divisions, found 5/i);
} finally {
  fs.writeFileSync(factsFile, originalFactsContent);
}

// ----------------------------------------------------------------------------
// 13. Invented Client Scope injection
// ----------------------------------------------------------------------------
console.log("\nRunning Negative Test: Invented client scope injection...");
try {
  const modifiedClients = originalFactsContent.replace(
    'nameEn: "Alfanar",',
    'nameEn: "Alfanar",\n    scope: "Direct EPC Turnkey Subcontractor for Substation 380kV",'
  );
  fs.writeFileSync(factsFile, modifiedClients);
  runVerifyExpectingFailure("13. Invented client scope", /contains unverified project scope/i);
} finally {
  fs.writeFileSync(factsFile, originalFactsContent);
}

// ----------------------------------------------------------------------------
// 14. Altered ISO Scope Text injection
// ----------------------------------------------------------------------------
console.log("\nRunning Negative Test: Altered ISO Scope Text injection...");
try {
  const targetScopeStr = "Provision of civil, electrical and mechanical construction";
  const modifiedScope = originalFactsContent.replace(
    targetScopeStr,
    "Altered unverified ISO scope text for negative testing"
  );
  fs.writeFileSync(factsFile, modifiedScope);
  runVerifyExpectingFailure("14. Altered ISO Scope", /Shared ISO Scope in company\.facts does not match/i);
} finally {
  fs.writeFileSync(factsFile, originalFactsContent);
}

// ----------------------------------------------------------------------------
// 15. Attempt to render pending_client fact via getVerified()
// ----------------------------------------------------------------------------
console.log("\nRunning Negative Test: Attempt to render pending_client fact via getVerified()...");
totalNegativeTests++;
try {
  getVerified(locationFacts.operationalRiyadhAddress);
  console.error("❌ [FAILED] 15. Pending client fact: getVerified(operationalRiyadhAddress) should have thrown [FACT_VIOLATION]!");
} catch (err: any) {
  if (err.message.includes("[FACT_VIOLATION]") && err.message.includes("PENDING_CLIENT")) {
    console.log("✅ [PASSED] 15. Pending client fact: Caught expected [FACT_VIOLATION] exception for PENDING_CLIENT status.");
    console.log(`   Captured: ${err.message}`);
    passedNegativeTests++;
  } else {
    console.error(`❌ [FAILED] 15. Pending client fact: Threw unexpected error: ${err.message}`);
  }
}

// ----------------------------------------------------------------------------
// SUMMARY
// ----------------------------------------------------------------------------
console.log("\n====================================================");
console.log(`NEGATIVE TESTS RESULT: ${passedNegativeTests}/${totalNegativeTests} PASSED`);
console.log("====================================================");

if (passedNegativeTests === totalNegativeTests) {
  console.log("SUCCESS: All negative tests successfully demonstrated build failures on invalid input.\n");
  process.exit(0);
} else {
  console.error("FAILURE: Some negative tests did not behave as expected.\n");
  process.exit(1);
}
