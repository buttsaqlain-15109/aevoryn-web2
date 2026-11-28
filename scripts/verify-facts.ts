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
  corporateStatements,
  getVerified,
} from "../src/data/company.facts.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT_DIR, "src");
const SOURCE_DOCS_DIR = path.join(ROOT_DIR, "source-docs");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");

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
// RULE 0: Machine-Checked Evidence Against source-docs/*.txt
// ----------------------------------------------------------------------------
function loadSourceDocPages(filename: string): Map<number, string> {
  const filePath = path.join(SOURCE_DOCS_DIR, filename);
  const pages = new Map<number, string>();
  if (!fs.existsSync(filePath)) {
    violations.push({
      type: "MISSING_SOURCE_DOC",
      message: `Source doc file '${filename}' not found in ${SOURCE_DOCS_DIR}`,
    });
    return pages;
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const rawSections = content.split(/=== PAGE (\d+) ===/);
  for (let i = 1; i < rawSections.length; i += 2) {
    const pageNum = parseInt(rawSections[i], 10);
    const pageText = rawSections[i + 1] || "";
    pages.set(pageNum, pageText.trim());
  }
  return pages;
}

const sourceDocCache = new Map<string, Map<number, string>>();

function verifyFactEvidence(factName: string, fact: any) {
  if (fact && fact.status === "VERIFIED" && fact.sourceFile && fact.page && fact.quote) {
    if (!sourceDocCache.has(fact.sourceFile)) {
      sourceDocCache.set(fact.sourceFile, loadSourceDocPages(fact.sourceFile));
    }
    const pages = sourceDocCache.get(fact.sourceFile)!;
    const pageContent = pages.get(fact.page);
    if (!pageContent) {
      violations.push({
        type: "FACT_PAGE_NOT_FOUND",
        message: `Fact '${factName}' cites ${fact.sourceFile} page ${fact.page}, but page was not found in source text.`,
      });
      return;
    }

    // Normalize whitespace for quote matching
    const normalize = (s: string) => s.replace(/\r\n/g, "\n").replace(/\s+/g, " ").trim();
    if (!normalize(pageContent).includes(normalize(fact.quote))) {
      violations.push({
        type: "FACT_QUOTE_MISMATCH",
        message: `Fact '${factName}' quote "${fact.quote}" was NOT found verbatim in ${fact.sourceFile} on page ${fact.page}.`,
      });
    }
  }
}

// Check all facts for verbatim machine evidence
Object.entries(legalIdentityFacts).forEach(([k, f]) => verifyFactEvidence(`legalIdentityFacts.${k}`, f));
Object.entries(locationFacts).forEach(([k, f]) => verifyFactEvidence(`locationFacts.${k}`, f));
Object.entries(communicationFacts).forEach(([k, f]) => verifyFactEvidence(`communicationFacts.${k}`, f));
Object.entries(aramcoFacts).forEach(([k, f]) => verifyFactEvidence(`aramcoFacts.${k}`, f));
Object.entries(isoCertificationFacts).forEach(([k, f]) => verifyFactEvidence(`isoCertificationFacts.${k}`, f));
Object.entries(corporateStatements).forEach(([k, f]) => verifyFactEvidence(`corporateStatements.${k}`, f));
divisionFacts.list.forEach((div) => verifyFactEvidence(`division.${div.divisionNumber}`, div));
verifyFactEvidence("clientFacts", clientFacts);

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
// RULE 6: Image License Registry Verification
// ----------------------------------------------------------------------------
const licensesPath = path.join(SRC_DIR, "data", "licenses.json");
if (fs.existsSync(licensesPath)) {
  const registeredLicenses: any[] = JSON.parse(fs.readFileSync(licensesPath, "utf-8"));
  const licensedPaths = new Set(registeredLicenses.map((l) => l.path));

  function scanPublicImages(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanPublicImages(fullPath);
      } else if (entry.isFile() && /\.(jpg|jpeg|png|webp|svg)$/i.test(entry.name)) {
        const relPath = "/" + path.relative(PUBLIC_DIR, fullPath).replace(/\\/g, "/");
        if (!licensedPaths.has(relPath)) {
          violations.push({
            type: "UNLICENSED_IMAGE",
            file: relPath,
            message: `Public image '${relPath}' has no entry in src/data/licenses.json`,
          });
        }
      }
    }
  }

  const imagesDir = path.join(PUBLIC_DIR, "images");
  if (fs.existsSync(imagesDir)) {
    scanPublicImages(imagesDir);
  }
} else {
  violations.push({
    type: "MISSING_LICENSES_REGISTRY",
    message: "src/data/licenses.json does not exist.",
  });
}

// ----------------------------------------------------------------------------
// RULE 7: Banned & Invented Words Scan Across src/
// ----------------------------------------------------------------------------
const BANNED_PATTERNS: { pattern: RegExp; reason: string }[] = [
  { pattern: /\bproctor\b/i, reason: "Invented soil testing claim" },
  { pattern: /\bsieve analysis\b/i, reason: "Invented aggregate testing claim" },
  { pattern: /\bASTM\b/i, reason: "Invented material ASTM standard" },
  { pattern: /\bSASO\b/i, reason: "Invented material SASO standard" },
  { pattern: /\bMill Test\b/i, reason: "Invented mill testing certificate claim" },
  { pattern: /\baggregate\b/i, reason: "Invented aggregate material supply claim" },
  { pattern: /\bquarry\b/i, reason: "Invented quarry ownership claim" },
  { pattern: /\bearthmoving\b/i, reason: "Invented earthmoving scope" },
  { pattern: /\bearthworks?\b/i, reason: "Invented earthwork scope" },
  { pattern: /\blaser grading\b/i, reason: "Invented laser grading claim" },
  { pattern: /\btrenching\b/i, reason: "Invented utility trenching claim" },
  { pattern: /\btelematics\b/i, reason: "Invented equipment tracking claim" },
  { pattern: /\bTUV\b/i, reason: "Unverified third-party inspection claim" },
  { pattern: /\bwet lease\b/i, reason: "Invented leasing claim" },
  { pattern: /\bwet\/dry lease\b/i, reason: "Invented leasing claim" },
  { pattern: /\bQiwa\b/i, reason: "Unverified platform claim" },
  { pattern: /\bgiga-project\b/i, reason: "Unverified marketing claim" },
  { pattern: /\bKingdom-wide\b/i, reason: "Unverified geographic claim" },
  { pattern: /\bVision 2030\b/i, reason: "Unverified national vision claim" },
  { pattern: /Aramco approved vendor/i, reason: "Contradicts 'Service Provider Only' letter" },
  { pattern: /Aramco Approved/i, reason: "Contradicts 'Service Provider Only' letter" },
  { pattern: /Aramco-approved/i, reason: "Contradicts 'Service Provider Only' letter" },
  { pattern: /ISO\s+[0-9:]+\s+compliant/i, reason: "Must use 'certified', not 'compliant'" },
  { pattern: /\bSECTION 0\d\b/i, reason: "Developer wireframe artifact" },
  { pattern: /\bSCROLL PROGRESS\b/i, reason: "Developer wireframe artifact" },
  { pattern: /\bEST\. 2026\b/i, reason: "Contradicts incorporation timeline" },
  { pattern: /\bEST\.\b/i, reason: "Unverified established prefix" },
  { pattern: /\bActive & Verified\b/i, reason: "Prohibited endorsement label" },
  { pattern: /\bRenewal in Progress\b/i, reason: "Unverified status (use 'Expired 17/11/2026')" },
  { pattern: /\bAldsfey\b/i, reason: "Misspelled client name (use Aldayfe or pending_client)" },
  { pattern: /\+966\s*53\s*075\s*2206/, reason: "Unverified phone number" },
  { pattern: /\+966\s*53\s*439\s*7780/, reason: "Unverified phone number" },
  { pattern: /ceo@aevoryn\.net/i, reason: "Executive email removed from public pages" },
  { pattern: /info@aevoryn\.net/i, reason: "Unverified email (admin@aevoryn.net is verified)" },
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
console.log(`Audited: SSOT data registry, ISO scopes, division count, image licenses, and ${SRC_DIR}`);
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
