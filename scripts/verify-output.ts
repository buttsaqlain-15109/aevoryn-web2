/**
 * AEVORYN OUTPUT VERIFICATION SCANNER
 *
 * Scans all compiled static files in `out/` after `next build`:
 * 1. Checks all HTML, JSON, JSON-LD, XML, and text files for banned phrases.
 * 2. Counts actual rendered capability cards in out/index.html (asserts exactly 4).
 * 3. Cross-checks registered Baish address, ISO certificate numbers, shared scope,
 *    and Aramco credentials against company.facts.ts SSOT.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  legalIdentityFacts,
  locationFacts,
  aramcoFacts,
  isoCertificationFacts,
  getVerified,
} from "../src/data/company.facts.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT_DIR, "out");

if (!fs.existsSync(OUT_DIR)) {
  console.error("ERROR: out/ directory does not exist. Run 'npm run build' first.");
  process.exit(1);
}

console.log("====================================================");
console.log("AEVORYN STATIC OUTPUT VERIFICATION SCANNER");
console.log("====================================================\n");

interface OutputViolation {
  file: string;
  type: string;
  message: string;
}

const violations: OutputViolation[] = [];

// ----------------------------------------------------------------------------
// 1. Banned Pattern Scan Across out/
// ----------------------------------------------------------------------------
const BANNED_OUTPUT_PATTERNS = [
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
  { pattern: /\bKingdom-wide\b/i, reason: "Unverified geographic claim" },
  { pattern: /\bVision 2030\b/i, reason: "Unverified national vision claim" },
  { pattern: /ISO\s+[0-9:]+\s+compliant/i, reason: "Must use 'certified', not 'compliant'" },
  { pattern: /\bEST\.\b/i, reason: "Unverified established prefix" },
  { pattern: /Aramco approved vendor/i, reason: "Contradicts 'Service Provider Only' letter" },
  { pattern: /Aramco Approved/i, reason: "Contradicts 'Service Provider Only' letter" },
  { pattern: /Aramco-approved/i, reason: "Contradicts 'Service Provider Only' letter" },
  { pattern: /\btelematics\b/i, reason: "Invented equipment tracking claim" },
  { pattern: /\bTUV\b/i, reason: "Unverified third-party inspection claim" },
  { pattern: /\bwet lease\b/i, reason: "Invented equipment lease claim" },
  { pattern: /\bwet\/dry lease\b/i, reason: "Invented leasing claim" },
  { pattern: /\bQiwa\b/i, reason: "Unverified platform claim" },
  { pattern: /\bgiga-project\b/i, reason: "Unverified marketing claim" },
  { pattern: /\bSECTION 0\d\b/i, reason: "Developer wireframe artifact" },
  { pattern: /\bSCROLL PROGRESS\b/i, reason: "Developer wireframe artifact" },
  { pattern: /\bActive & Verified\b/i, reason: "Prohibited endorsement label" },
  { pattern: /\bRenewal in Progress\b/i, reason: "Unverified status (use 'Expired 17/11/2026')" },
  { pattern: /\+966\s*53\s*075\s*2206/, reason: "Unverified phone number" },
  { pattern: /\+966\s*53\s*439\s*7780/, reason: "Unverified phone number" },
  { pattern: /ceo@aevoryn\.net/i, reason: "Internal executive email exposed publicly" },
  { pattern: /chairman@aevoryn\.net/i, reason: "Internal executive email exposed publicly" },
  { pattern: /\+966\s*17\s*322\s*9527/, reason: "Pending client landline number" },
  { pattern: /\+966173229527/, reason: "Pending client landline number" },
  { pattern: /info@aevoryn\.net/i, reason: "Unverified email (admin@aevoryn.net is verified)" },
];

let scannedFilesCount = 0;

function scanOutDir(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanOutDir(fullPath);
    } else if (
      entry.isFile() &&
      /\.(html|json|xml|txt)$/i.test(entry.name) &&
      !entry.name.endsWith(".map")
    ) {
      scannedFilesCount++;
      const relative = path.relative(OUT_DIR, fullPath);
      const content = fs.readFileSync(fullPath, "utf-8");

      for (const { pattern, reason } of BANNED_OUTPUT_PATTERNS) {
        if (pattern.test(content)) {
          violations.push({
            file: relative,
            type: "BANNED_PHRASE_IN_OUTPUT",
            message: `Prohibited content detected '${pattern.source}': ${reason}`,
          });
        }
      }
    }
  }
}

scanOutDir(OUT_DIR);

// ----------------------------------------------------------------------------
// 2. Count Actual Rendered Division Cards in out/index.html
// ----------------------------------------------------------------------------
const indexPath = path.join(OUT_DIR, "index.html");
if (fs.existsSync(indexPath)) {
  const indexHtml = fs.readFileSync(indexPath, "utf-8");
  const cardMatches = indexHtml.match(/data-division-card="true"/g) || [];
  const renderedCardCount = cardMatches.length;

  console.log(`Rendered capability division cards in out/index.html: ${renderedCardCount}`);
  if (renderedCardCount !== 4) {
    violations.push({
      file: "index.html",
      type: "RENDERED_CARD_COUNT_MISMATCH",
      message: `Expected exactly 4 rendered capability division cards in out/index.html, but found ${renderedCardCount}.`,
    });
  }
} else {
  violations.push({
    file: "index.html",
    type: "MISSING_INDEX_HTML",
    message: "out/index.html was not generated by Next.js build.",
  });
}

// ----------------------------------------------------------------------------
// 3. Cross-Check SSOT Data in Compiled Output
// ----------------------------------------------------------------------------
const certsPath = path.join(OUT_DIR, "certifications.html");
if (fs.existsSync(certsPath)) {
  const certsHtml = fs.readFileSync(certsPath, "utf-8");

  const expectedCertNumbers = [
    isoCertificationFacts.iso9001.value.certificateNumber,
    isoCertificationFacts.iso14001.value.certificateNumber,
    isoCertificationFacts.iso45001.value.certificateNumber,
  ];

  for (const certNo of expectedCertNumbers) {
    if (!certsHtml.includes(certNo)) {
      violations.push({
        file: "certifications.html",
        type: "MISSING_ISO_CERT_NUMBER",
        message: `Compiled certifications page is missing expected ISO cert '${certNo}'.`,
      });
    }
  }
}

// Check Baish Address in Header / Footer / Layout on index.html
if (fs.existsSync(indexPath)) {
  const indexHtml = fs.readFileSync(indexPath, "utf-8");
  if (!indexHtml.includes("Baish") || !indexHtml.includes("7140")) {
    violations.push({
      file: "index.html",
      type: "MISSING_REGISTERED_ADDRESS",
      message: "Compiled homepage is missing verified registered address (Baish, Bldg 7140).",
    });
  }

  const cr = getVerified(legalIdentityFacts.crNumber);
  if (!indexHtml.includes(cr)) {
    violations.push({
      file: "index.html",
      type: "MISSING_CR_NUMBER",
      message: `Compiled homepage is missing verified CR '${cr}'.`,
    });
  }

  const vendorCode = getVerified(aramcoFacts.vendorCode);
  if (!indexHtml.includes(vendorCode)) {
    violations.push({
      file: "index.html",
      type: "MISSING_ARAMCO_CODE",
      message: `Compiled homepage is missing verified Aramco Vendor Code '${vendorCode}'.`,
    });
  }
}

// ----------------------------------------------------------------------------
// REPORT
// ----------------------------------------------------------------------------
console.log(`Scanned ${scannedFilesCount} output files in ${OUT_DIR}`);

if (violations.length > 0) {
  console.error(`\nFAILED: Found ${violations.length} output compliance violation(s):`);
  violations.forEach((v, idx) => {
    console.error(`  ${idx + 1}. [${v.type}] ${v.file}: ${v.message}`);
  });
  process.exit(1);
} else {
  console.log("\nSUCCESS: Consistent with facts file.\n");
  process.exit(0);
}
