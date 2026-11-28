# Comprehensive QA Visual, Accessibility & Content Audit Report

**Date:** 2026-11-28T14:38:46.119Z  
**Target:** Local compiled static export (`out/`) & Cloudflare Pages Preview  
**Matrix:**
- **Browsers Tested:** Chromium, WebKit (Safari engine), Firefox
- **Viewports Tested:** 360x800, 390x844, 768x1024, 1024x768, 1280x800, 1536x864, 1920x1080
- **Themes Tested:** Light, Dark (system & UI toggle)
- **Languages Tested:** English, Arabic (RTL)
- **Conditions Tested:** Normal, Reduced Motion, JavaScript Disabled, Slow 4G

---

## Executive Summary of Defect Counts

| Severity | Total Occurrences | Unique Issues |
| :--- | :--- | :--- |
| **CRITICAL** | 12 | 2 |
| **HIGH** | 162 | 15 |
| **MEDIUM** | 10 | 1 |
| **LOW** | 1848 | 1 |
| **TOTAL** | **2032** | **19** |

---

## 1. Critical Defects
### 1. [LAYOUT] /supplier-registration (mobile-iphone, light, en)
- **Details:** [axe button-name] Buttons must have discernible text: Ensure buttons have discernible text (5 occurrences)

### 2. [LAYOUT] /contact (mobile-iphone, light, en)
- **Details:** [axe select-name] Select element must have an accessible name: Ensure select element has an accessible name (1 occurrences)


## 2. High Priority Defects
### 1. [ASSETS] multiple (mobile-xs, dark, en)
- **Details:** Failed network requests detected: GET http://localhost:3590/capabilities/materials/__next._tree.txt?_rsc=FREuGoXx8U58B2rZ (net::ERR_NETWORK_IO_SUSPENDED); GET http://localhost:3590/capabilities/manpower/__next._tree.txt?_rsc=FREuGoXx8U58B2rZ (net::ERR_NETWORK_IO_SUSPENDED)

### 2. [ASSETS] multiple (mobile-xs, dark, en)
- **Details:** Console errors: Failed to load resource: net::ERR_NETWORK_IO_SUSPENDED; Failed to load resource: net::ERR_NETWORK_IO_SUSPENDED

### 3. [LAYOUT] / (mobile-iphone, light, en)
- **Details:** [axe color-contrast-enhanced] Elements must meet enhanced color contrast ratio thresholds: Ensure the contrast between foreground and background colors meets WCAG 2 AAA enhanced contrast ratio thresholds (24 occurrences)

### 4. [LAYOUT] /about (mobile-iphone, light, en)
- **Details:** [axe color-contrast-enhanced] Elements must meet enhanced color contrast ratio thresholds: Ensure the contrast between foreground and background colors meets WCAG 2 AAA enhanced contrast ratio thresholds (3 occurrences)

### 5. [CONTRAST] /about (mobile-iphone, light, en)
- **Details:** [axe color-contrast] Elements must meet minimum color contrast ratio thresholds: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (1 occurrences)

### 6. [LAYOUT] /aramco-registration (mobile-iphone, light, en)
- **Details:** [axe color-contrast-enhanced] Elements must meet enhanced color contrast ratio thresholds: Ensure the contrast between foreground and background colors meets WCAG 2 AAA enhanced contrast ratio thresholds (11 occurrences)

### 7. [CONTRAST] /aramco-registration (mobile-iphone, light, en)
- **Details:** [axe color-contrast] Elements must meet minimum color contrast ratio thresholds: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (2 occurrences)

### 8. [ASSETS] multiple (mobile-iphone, light, ar)
- **Details:** Failed network requests detected: GET http://localhost:3590/__next._tree.txt?_rsc=V8koPtG85CGEv0Wf (net::ERR_ABORTED)

### 9. [CONTRAST] / (mobile-iphone, dark, en)
- **Details:** [axe color-contrast] Elements must meet minimum color contrast ratio thresholds: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (4 occurrences)

### 10. [CONTRAST] /about (mobile-iphone, dark, en)
- **Details:** [axe color-contrast] Elements must meet minimum color contrast ratio thresholds: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (5 occurrences)

### 11. [CONTRAST] /capabilities/infrastructure (mobile-iphone, dark, en)
- **Details:** [axe color-contrast] Elements must meet minimum color contrast ratio thresholds: Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (3 occurrences)

### 12. [LAYOUT] / (desktop-1080p, light, en)
- **Details:** [axe color-contrast-enhanced] Elements must meet enhanced color contrast ratio thresholds: Ensure the contrast between foreground and background colors meets WCAG 2 AAA enhanced contrast ratio thresholds (18 occurrences)

### 13. [LAYOUT] /about (desktop-1080p, light, en)
- **Details:** [axe color-contrast-enhanced] Elements must meet enhanced color contrast ratio thresholds: Ensure the contrast between foreground and background colors meets WCAG 2 AAA enhanced contrast ratio thresholds (4 occurrences)

### 14. [LAYOUT] / (desktop-1080p, light, ar)
- **Details:** [axe color-contrast-enhanced] Elements must meet enhanced color contrast ratio thresholds: Ensure the contrast between foreground and background colors meets WCAG 2 AAA enhanced contrast ratio thresholds (20 occurrences)

### 15. [LAYOUT] / (desktop-1080p, dark, en)
- **Details:** [axe color-contrast-enhanced] Elements must meet enhanced color contrast ratio thresholds: Ensure the contrast between foreground and background colors meets WCAG 2 AAA enhanced contrast ratio thresholds (23 occurrences)


## 3. Medium Priority Defects
### 1. [SHADOWS] / (mobile-xs, light, en)
- **Details:** Box-shadow on button may be clipped by ancestor section with overflow:hidden


## 4. Low Priority & Aesthetic Polish
### 1. [SHADOWS] / (mobile-xs, dark, en)
- **Details:** Dark mode uses black shadow on dark surface, rendering elevation invisible. Needs border or subtle highlight.


---
## 5. Specific Component Audits
- **GlobeHero**: Tested WebGL canvas initialization, fallback rendering, and headline formatting.
- **ServicesScrollSection**: Tested timeline indicator and pinned scroll behaviour across viewports.
- **Accreditation Strips**: Verified all dates, disclaimers, and facility references.
