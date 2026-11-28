/**
 * AUDIT ALL ROUTES & CLIENT-SIDE LINKS IN COMPILED OUTPUT
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT_DIR, "out");

const htmlFiles: string[] = [];
function findHtml(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findHtml(full);
    } else if (entry.name.endsWith(".html")) {
      htmlFiles.push(full);
    }
  }
}
findHtml(OUT_DIR);

console.log(`Found ${htmlFiles.length} compiled HTML routes to audit.`);

let deadLinks = 0;
let missingImages = 0;
let jsonLdErrors = 0;

for (const file of htmlFiles) {
  const rel = path.relative(OUT_DIR, file);
  const content = fs.readFileSync(file, "utf-8");

  // Check JSON-LD
  const jsonLdMatches = content.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs);
  for (const match of jsonLdMatches) {
    try {
      JSON.parse(match[1]);
    } catch (e: any) {
      console.error(`❌ [JSON-LD ERROR] in ${rel}: ${e.message}`);
      jsonLdErrors++;
    }
  }

  // Check internal href links
  const hrefMatches = content.matchAll(/href="(\/[^"#?]*)(?:#[^"]*)?(?:\?[^"]*)?"/g);
  for (const match of hrefMatches) {
    const targetUrl = match[1];
    if (targetUrl === "" || targetUrl === "/" || targetUrl.startsWith("/_next")) continue;

    // Resolve in OUT_DIR
    const candidateFile1 = path.join(OUT_DIR, `${targetUrl}.html`);
    const candidateFile2 = path.join(OUT_DIR, targetUrl, "index.html");
    const candidateDir = path.join(OUT_DIR, targetUrl);

    if (!fs.existsSync(candidateFile1) && !fs.existsSync(candidateFile2) && !fs.existsSync(candidateDir)) {
      console.error(`❌ [DEAD LINK] ${rel} -> ${targetUrl}`);
      deadLinks++;
    }
  }

  // Check image sources
  const imgMatches = content.matchAll(/src="(\/[^"?#]+)"/g);
  for (const match of imgMatches) {
    const imgSrc = match[1];
    if (imgSrc.startsWith("/_next")) continue;
    const resolvedPath = path.join(OUT_DIR, imgSrc);
    if (!fs.existsSync(resolvedPath)) {
      console.error(`❌ [MISSING IMAGE] in ${rel}: ${imgSrc}`);
      missingImages++;
    }
  }
}

console.log(`\nAudit Results:`);
console.log(`- Dead internal links: ${deadLinks}`);
console.log(`- Missing images: ${missingImages}`);
console.log(`- JSON-LD syntax errors: ${jsonLdErrors}`);

if (deadLinks > 0 || missingImages > 0 || jsonLdErrors > 0) {
  process.exit(1);
} else {
  console.log(`✅ All HTML routes, internal links, images, and JSON-LD schemas verified cleanly!\n`);
  process.exit(0);
}
