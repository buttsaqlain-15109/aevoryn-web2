# Aevoryn Services & Contracting Co. — Corporate Web Platform

Official corporate web portal and supplier onboarding system for **Aevoryn Services & Contracting Co.** (Riyadh & Baish, Kingdom of Saudi Arabia).

---

## 1. Compliance Architecture & Single Source of Truth (SSOT)

To guarantee legal compliance, prevent data hallucinations, and satisfy EPC procurement audits, all corporate facts (registration numbers, ISO scopes, addresses, telecommunications, and certified capabilities) are governed strictly by:

- **SSOT Ledger:** [`src/data/company.facts.ts`](src/data/company.facts.ts)
- **Document Register:** [`src/data/documents.json`](src/data/documents.json)
- **Asset Provenance & Licenses:** [`src/data/licenses.json`](src/data/licenses.json)

### Fact Integrity Helper (`getVerified`)
Components MUST access critical corporate facts via the type-safe helper:
```ts
import { legalIdentityFacts, getVerified } from "@/data/company.facts";

const cr = getVerified(legalIdentityFacts.crNumber); // Returns string or throws [FACT_VIOLATION]
```
If a fact has status `"PENDING_CLIENT"`, calling `getVerified()` immediately throws a compile/runtime exception and halts the build.

---

## 2. Document Expiry & Governance Policy

Expired documents (such as certificates awaiting periodic renewal) are governed by strict automated rules:

1. **Zero Active Linking of Expired Documents:** Expired documents (e.g. SPL National Address Proof GEMB7140) must NEVER be displayed or linked as active/current in UI badges or metadata.
2. **Mandatory Expiry Status:** Any expired certificate must carry `isCurrent: false` and explicitly state `EXPIRED - Renewal in Progress` in both English and Arabic.
3. **Automated Expiry Scanner:** `scripts/verify-facts.ts` scans all entries in `src/data/documents.json`:
   - **Build Failure:** If a document is marked `isCurrent: true` but its expiry date is in the past, the build immediately aborts with `EXPIRED_DOCUMENT_MARKED_CURRENT`.
   - **30-Day Expiry Warning:** If a valid document has an expiry date within 30 days of build execution, a high-priority warning is emitted to notify project managers.
4. **Current Status of Key Documents:**
   - **Commercial Registration (CR 7054401679):** Active / Valid.
   - **Saudi Aramco Supplier Code (10120422 / E-Ref 0019448):** Active Service Provider.
   - **Triple ISO Certificates (VC23018822, VC23022982, VC23032689):** Active (Expiry: 03 August 2029).
   - **National Address Certificate (GEMB7140):** Expired 17/11/2026. Official renewal documentation currently in progress with SPL; displayed as `EXPIRED - Renewal in Progress`.

---

## 3. Automated Guardrails & Test Suites

The build pipeline enforces three layers of pre-commit and pre-deployment validation:

### 1. `npm run verify:facts`
- Audits `src/data/company.facts.ts` assertions.
- Scans `src/` for 16 banned or fabricated terms (e.g. "Proctor testing", "Aramco Approved", "telematics", "ASTM C33", "SASO 204", "Active & Verified").
- Enforces shared verbatim ISO scope across all three ISO standards.
- Validates the Document Expiry Policy.

### 2. `npm run test:negative`
Automated test suite demonstrating that the build system rigorously fails when fed invalid inputs:
- **Test 1:** Detects and fails on injected "Proctor testing".
- **Test 2:** Detects and fails on injected "Aramco Approved".
- **Test 3:** Detects and fails if a 5th division is introduced.
- **Test 4:** Detects and fails if ISO scope text is altered from official certificate wording.
- **Test 5:** Detects and fails with `[FACT_VIOLATION]` when attempting to render a `PENDING_CLIENT` fact.

### 3. `npm run verify:out`
Post-build scanner across the compiled `out/` static directory:
- Inspects all HTML, JSON-LD, and XML files for banned phrases.
- **Counts rendered capability division cards in `out/index.html`** (asserts exactly 4 cards with `data-division-card="true"`).
- Cross-checks Baish address, ISO certificate numbers (`VC23018822`, `VC23022982`, `VC23032689`), and Aramco credentials.

---

## 4. Local Development & Deployment

```bash
# Install dependencies
npm install

# Run negative test suite
npm run test:negative

# Run full compliance build & output verification
npm run build

# Start local preview
npm run start
```
