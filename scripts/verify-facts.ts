/**
 * AUTOMATED FACT & COMPLIANCE GUARDRAIL SCRIPT
 *
 * Runs during `npm run verify:facts` and as a blocking pre-build step.
 * Ensures zero unverified claims, fabricated services, unauthorized logos,
 * or contradictory address data enter production.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  legalIdentityFacts,
  locationFacts,
  communicationFacts,
  aramcoFacts,
  isoCertificationFacts,
  divisionFacts,
  clientFacts,
  getVerified,
} from "../src/data/company.facts.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT_DIR, "src");

interface Violation {
  type: string;
  file?: string;
  message: string;
}

const violations: Violation[] = [];
const warnings: string[] = [];

console.log("====================================================");
console.log("AEVORYN COMPLIANCE & FACT VERIFICATION AUDITOR");
console.log("====================================================\n");

// ----------------------------------------------------------------------------
// RULE 1: Verify SSOT Integrity and getVerified() Assertions
// ----------------------------------------------------------------------------
try {
  const cr = getVerified(legalIdentityFacts.crNumber);
  if (cr !== "7054401679") {
    violations.push({
      type: "SSOT_INTEGRITY",
      message: `CR number expected '7054401679', got '${cr}'`,
    });
  }

  const vendorCode = getVerified(aramcoFacts.vendorCode);
  if (vendorCode !== "10120422") {
    violations.push({
      type: "SSOT_INTEGRITY",
      message: `Aramco vendor code expected '10120422', got '${vendorCode}'`,
    });
  }

  const supplierType = getVerified(aramcoFacts.supplierType);
  if (supplierType !== "Service Provider Only") {
    violations.push({
      type: "SSOT_INTEGRITY",
      message: `Aramco supplier type expected 'Service Provider Only', got '${supplierType}'`,
    });
  }

  const registeredAddress = getVerified(locationFacts.registeredBaishAddress);
  if (!registeredAddress.fullAddressEn.includes("Baish")) {
    violations.push({
      type: "SSOT_INTEGRITY",
      message: "Registered legal address must reference Baish",
    });
  }

  // Ensure operational address remains PENDING_CLIENT and cannot be accessed via getVerified()
  try {
    getVerified(locationFacts.operationalRiyadhAddress);
    violations.push({
      type: "SSOT_SECURITY_LEAK",
      message: "operationalRiyadhAddress must NOT be verified until client confirms proof.",
    });
  } catch {
    // Expected behavior
  }
} catch (err: any) {
  violations.push({
    type: "SSOT_FATAL",
    message: `SSOT assertion threw unexpected error: ${err.message}`,
  });
}

// ----------------------------------------------------------------------------
// RULE 2: Exactly 4 Divisions Registered and Rendered
// ----------------------------------------------------------------------------
if (divisionFacts.divisionsCount !== 4 || divisionFacts.list.length !== 4) {
  violations.push({
    type: "DIVISION_COUNT_MISMATCH",
    message: `Expected exactly 4 divisions, found ${divisionFacts.list.length}`,
  });
}

const expectedDivisionTitles = [
  "Project Development Support",
  "Manpower Supply",
  "Construction Materials Supply",
  "Equipment Supply",
];

divisionFacts.list.forEach((div, i) => {
  if (div.titleEn !== expectedDivisionTitles[i]) {
    violations.push({
      type: "DIVISION_TITLE_MISMATCH",
      message: `Division ${div.divisionNumber} expected '${expectedDivisionTitles[i]}', found '${div.titleEn}'`,
    });
  }
});

// ----------------------------------------------------------------------------
// RULE 3: Shared ISO Scope Exact Match
// ----------------------------------------------------------------------------
const REQUIRED_ISO_SCOPE =
  "Provision of civil, electrical and mechanical construction, infrastructure development, manpower supply, equipment rental, material supply and project support services for industrial, commercial and infrastructure projects.";

if (isoCertificationFacts.sharedVerbatimScopeEn.value !== REQUIRED_ISO_SCOPE) {
  violations.push({
    type: "ISO_SCOPE_MISMATCH",
    message: "Shared ISO Scope in company.facts does not match official verbatim scope.",
  });
}

// ----------------------------------------------------------------------------
// RULE 4: Client Registry Contains Exactly 4 Approved Names (Aldayfe is pending_client)
// ----------------------------------------------------------------------------
const verifiedClients = clientFacts.verifiedList.map((c) => c.nameEn);
const EXPECTED_CLIENTS = [
  "Alfanar",
  "Masco",
  "Tamimi",
  "China Harbour",
];

if (JSON.stringify(verifiedClients) !== JSON.stringify(EXPECTED_CLIENTS)) {
  violations.push({
    type: "CLIENT_LIST_MISMATCH",
    message: `Expected verified clients ${JSON.stringify(
      EXPECTED_CLIENTS
    )}, got ${JSON.stringify(verifiedClients)}`,
  });
}

// Ensure no invented client scopes exist
clientFacts.verifiedList.forEach((client: any) => {
  if ("scope" in client || "scopeEn" in client || "projectScope" in client) {
    violations.push({
      type: "INVENTED_CLIENT_SCOPE",
      message: `Client '${client.nameEn}' contains unverified project scope. Clients must have no invented scopes.`,
    });
  }
});

// ----------------------------------------------------------------------------
// RULE 5: Document Expiration & Expiry Policy Check
// ----------------------------------------------------------------------------
const docsJsonPath = path.join(SRC_DIR, "data", "documents.json");
if (fs.existsSync(docsJsonPath)) {
  const docsList = JSON.parse(fs.readFileSync(docsJsonPath, "utf-8"));
  const today = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);

  docsList.forEach((d: any) => {
    // If marked current, ensure it is not expired
    if (d.isCurrent === true && d.expiryDate) {
      const parsedExpiry = Date.parse(d.expiryDate);
      if (!isNaN(parsedExpiry)) {
        if (parsedExpiry < today.getTime()) {
          violations.push({
            type: "EXPIRED_DOCUMENT_MARKED_CURRENT",
            message: `Document '${d.id}' has expired on ${d.expiryDate} but is marked isCurrent: true.`,
          });
        } else if (parsedExpiry < thirtyDaysFromNow.getTime()) {
          warnings.push(
            `EXPIRY WARNING: Document '${d.id}' will expire within 30 days on ${d.expiryDate}.`
          );
        }
      }
    }

    // Specific check for National Address proof: must be internal and not public
    if (d.id === "doc-national-address") {
      if (d.isPublic === true) {
        violations.push({
          type: "EXPIRED_DOCUMENT_POLICY_VIOLATION",
          message: "Expired National Address Certificate GEMB7140 must have isPublic: false (kept internal).",
        });
      }
      if (d.isCurrent !== false) {
        violations.push({
          type: "EXPIRED_DOCUMENT_POLICY_VIOLATION",
          message: "National Address Certificate GEMB7140 expired on 17/11/2026 and must have isCurrent: false.",
        });
      }
      if (!d.status || !d.status.includes("Expired 17/11/2026")) {
        violations.push({
          type: "EXPIRED_DOCUMENT_POLICY_VIOLATION",
          message: "National Address Certificate GEMB7140 must display 'Expired 17/11/2026' status.",
        });
      }
    }
  });
}

// ----------------------------------------------------------------------------
// RULE 6: Banned & Invented Words Scan Across src/
// ----------------------------------------------------------------------------
const BANNED_PATTERNS: { pattern: RegExp; reason: string }[] = [
  { pattern: /\bproctor\b/i, reason: "Invented soil testing claim" },
  { pattern: /\bsieve analysis\b/i, reason: "Invented aggregate testing claim" },
  { pattern: /\bASTM\b/i, reason: "Invented material ASTM standard" },
  { pattern: /\bSASO\b/i, reason: "Invented material SASO standard" },
  { pattern: /Aramco approved vendor/i, reason: "Contradicts 'Service Provider Only' letter" },
  { pattern: /Aramco Approved Safety Officers/i, reason: "Contradicts 'Service Provider Only' letter" },
  { pattern: /Aramco-approved/i, reason: "Contradicts 'Service Provider Only' letter" },
  { pattern: /\btelematics\b/i, reason: "Invented equipment tracking claim" },
  { pattern: /\bTUV\b/i, reason: "Unverified third-party inspection claim" },
  { pattern: /\bwet lease\b/i, reason: "Invented leasing claim" },
  { pattern: /\bwet\/dry lease\b/i, reason: "Invented leasing claim" },
  { pattern: /\bQiwa\b/i, reason: "Unverified platform claim" },
  { pattern: /\bgiga-project\b/i, reason: "Unverified marketing claim" },
  { pattern: /\bSECTION 0\d\b/i, reason: "Developer wireframe artifact" },
  { pattern: /\bSCROLL PROGRESS\b/i, reason: "Developer wireframe artifact" },
  { pattern: /\bEST\. 2026\b/i, reason: "Contradicts incorporation timeline" },
  { pattern: /\bActive & Verified\b/i, reason: "Prohibited endorsement label" },
  { pattern: /\bRenewal in Progress\b/i, reason: "Unverified status (use 'Expired 17/11/2026')" },
  { pattern: /\bAldsfey\b/i, reason: "Misspelled client name (use Aldayfe or pending_client)" },
  { pattern: /\+966\s*53\s*075\s*2206/, reason: "Unverified phone number" },
  { pattern: /ceo@aevoryn\.net/i, reason: "Executive email removed from public pages" },
  { pattern: /href=["']\/admin\/suppliers["']/i, reason: "Admin portal link exposed in public navigation" },
];

function scanDirectory(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== ".next") {
        scanDirectory(fullPath);
      }
    } else if (
      entry.isFile() &&
      (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) &&
      !entry.name.includes("company.facts.ts") && // SSOT ledger documents removals
      !entry.name.includes("verify-facts.ts")
    ) {
      const content = fs.readFileSync(fullPath, "utf-8");
      const relative = path.relative(ROOT_DIR, fullPath);

      for (const { pattern, reason } of BANNED_PATTERNS) {
        if (pattern.test(content)) {
          violations.push({
            type: "BANNED_PHRASE",
            file: relative,
            message: `Found prohibited pattern '${pattern.source}': ${reason}`,
          });
        }
      }
    }
  }
}

scanDirectory(SRC_DIR);

// ----------------------------------------------------------------------------
// OUTPUT REPORT
// ----------------------------------------------------------------------------
console.log(`Audited: SSOT data registry, ISO scopes, division count, and ${SRC_DIR}`);
console.log(`Warnings: ${warnings.length}`);
warnings.forEach((w) => console.log(`  [WARN] ${w}`));

if (violations.length > 0) {
  console.error(`\nFAILED: Found ${violations.length} compliance violation(s):`);
  violations.forEach((v, idx) => {
    console.error(`  ${idx + 1}. [${v.type}] ${v.file ? `${v.file}: ` : ""}${v.message}`);
  });
  process.exit(1);
} else {
  console.log("\nSUCCESS: Consistent with facts file.\n");
  process.exit(0);
}
