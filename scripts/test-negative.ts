/**
 * NEGATIVE TESTS RUNNER FOR AEVORYN COMPLIANCE GUARDRAILS
 *
 * Verifies that the automated test & build system rigorously FAILS when
 * fed unverified or prohibited claims:
 * 1. "Proctor testing"
 * 2. "Aramco Approved"
 * 3. A 5th division card
 * 4. A different ISO scope text
 * 5. A pending_client fact rendered via getVerified()
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

console.log("====================================================");
console.log("AEVORYN COMPLIANCE NEGATIVE TESTS RUNNER");
console.log("====================================================\n");

let passedNegativeTests = 0;
const totalNegativeTests = 5;

// Helper to run verify-facts.ts and check if it fails with expected message
function runVerifyExpectingFailure(testName: string, expectedPattern: RegExp): boolean {
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
      console.log(`✅ [PASSED] ${testName}: Caught expected failure.`);
      console.log(`   Captured output: ${output.split("\n").find((l: string) => expectedPattern.test(l))?.trim()}`);
      return true;
    } else {
      console.error(`❌ [FAILED] ${testName}: Failed, but did not match expected pattern '${expectedPattern}'.`);
      console.error(`   Output: ${output}`);
      return false;
    }
  }
}

// ----------------------------------------------------------------------------
// TEST 1: Proctor testing detection
// ----------------------------------------------------------------------------
console.log("Running Negative Test 1/5: 'Proctor testing' injection...");
const tempTestFile1 = path.join(SRC_DIR, "temp_proctor_test.ts");
fs.writeFileSync(tempTestFile1, 'export const dummy = "Proctor testing soil standard";');
try {
  if (runVerifyExpectingFailure("Test 1: Proctor testing", /Invented soil testing claim/i)) {
    passedNegativeTests++;
  }
} finally {
  if (fs.existsSync(tempTestFile1)) fs.unlinkSync(tempTestFile1);
}

// ----------------------------------------------------------------------------
// TEST 2: Aramco Approved detection
// ----------------------------------------------------------------------------
console.log("\nRunning Negative Test 2/5: 'Aramco Approved' injection...");
const tempTestFile2 = path.join(SRC_DIR, "temp_aramco_test.ts");
fs.writeFileSync(tempTestFile2, 'export const dummy = "Aramco Approved Safety Officers on site";');
try {
  if (runVerifyExpectingFailure("Test 2: Aramco Approved", /Contradicts 'Service Provider Only' letter/i)) {
    passedNegativeTests++;
  }
} finally {
  if (fs.existsSync(tempTestFile2)) fs.unlinkSync(tempTestFile2);
}

// ----------------------------------------------------------------------------
// TEST 3: 5th Division Card detection
// ----------------------------------------------------------------------------
console.log("\nRunning Negative Test 3/5: 5th division card injection...");
const factsFile = path.join(SRC_DIR, "data", "company.facts.ts");
const originalFactsContent = fs.readFileSync(factsFile, "utf-8");
try {
  // Temporarily change divisionsCount to 5
  const modifiedFacts = originalFactsContent.replace(
    "divisionsCount: 4,",
    "divisionsCount: 5,"
  );
  fs.writeFileSync(factsFile, modifiedFacts);
  if (runVerifyExpectingFailure("Test 3: 5th division card", /Expected exactly 4 divisions/i)) {
    passedNegativeTests++;
  }
} finally {
  fs.writeFileSync(factsFile, originalFactsContent);
}

// ----------------------------------------------------------------------------
// TEST 4: Altered ISO Scope Text detection
// ----------------------------------------------------------------------------
console.log("\nRunning Negative Test 4/5: Altered ISO Scope Text injection...");
try {
  const targetScopeStr = "Provision of civil, electrical and mechanical construction";
  const modifiedScope = originalFactsContent.replace(
    targetScopeStr,
    "Altered unverified ISO scope text for testing"
  );
  fs.writeFileSync(factsFile, modifiedScope);
  if (runVerifyExpectingFailure("Test 4: Altered ISO Scope", /Shared ISO Scope in company\.facts does not match/i)) {
    passedNegativeTests++;
  }
} finally {
  fs.writeFileSync(factsFile, originalFactsContent);
}

// ----------------------------------------------------------------------------
// TEST 5: Render pending_client Fact via getVerified()
// ----------------------------------------------------------------------------
console.log("\nRunning Negative Test 5/5: Attempt to render pending_client fact via getVerified()...");
try {
  getVerified(locationFacts.operationalRiyadhAddress);
  console.error("❌ [FAILED] Test 5: getVerified(operationalRiyadhAddress) should have thrown [FACT_VIOLATION]!");
} catch (err: any) {
  if (err.message.includes("[FACT_VIOLATION]") && err.message.includes("PENDING_CLIENT")) {
    console.log("✅ [PASSED] Test 5: Caught expected [FACT_VIOLATION] exception for PENDING_CLIENT status.");
    console.log(`   Captured error: ${err.message}`);
    passedNegativeTests++;
  } else {
    console.error(`❌ [FAILED] Test 5: Threw unexpected error: ${err.message}`);
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
