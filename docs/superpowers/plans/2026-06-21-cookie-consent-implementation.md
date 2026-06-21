# Cookie Consent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Gate SMJ Marines GA4-tag behind explicit consent, provide accessible consent controls on every page, and update the legal pages within the approved content boundaries.

**Architecture:** A shared `/assets/cookie-consent.js` owns consent storage, GA4 loading, cookie cleanup, banner rendering, and settings-link behavior. A shared stylesheet provides responsive SMJ-branded presentation. Every HTML page loads both assets and exposes one footer settings link; no page embeds the Google tag directly.

**Tech Stack:** Static HTML/CSS/JavaScript, Node.js test runner, JSDOM.

---

### Task 1: Add failing consent and integration tests

**Files:**
- Create: `package.json`
- Create: `.gitignore`
- Create: `tests/cookie-consent.test.mjs`
- Create: `tests/html-integration.test.mjs`

- [ ] **Step 1: Define `npm test` with Node's test runner and JSDOM as a development dependency.**
- [ ] **Step 2: Test initial banner display without Google, accept/reject persistence, one-tag loading, analytics-cookie cleanup, and settings reset.**
- [ ] **Step 3: Test all eight HTML pages for one shared stylesheet, one shared script, one settings link, and zero embedded Google tags.**
- [ ] **Step 4: Test that only the cookie policy mentions Google Analytics and neither policy mentions Formspree.**
- [ ] **Step 5: Run `npm test` and confirm failures are caused by the missing consent implementation.**

### Task 2: Implement shared consent assets

**Files:**
- Create: `assets/cookie-consent.js`
- Create: `assets/cookie-consent.css`

- [ ] **Step 1: Implement local storage key `smj_cookie_consent_v1` with `accepted` and `rejected` states.**
- [ ] **Step 2: Dynamically load exactly one Google tag for `G-8GW9DG9DR5` only after acceptance.**
- [ ] **Step 3: Render an accessible banner with equal access to `Afvis` and `Accepter`.**
- [ ] **Step 4: Clear `_ga` and `_ga_*` cookies when consent is rejected or reset.**
- [ ] **Step 5: Style desktop, mobile, hover, and keyboard-focus states with SMJ tokens.**

### Task 3: Integrate all pages and update policies

**Files:**
- Modify: `index.html`
- Modify: `baadklargoering.html`
- Modify: `motorservice.html`
- Modify: `polering-bundmaling.html`
- Modify: `svejse-metalopgaver.html`
- Modify: `cookiepolitik.html`
- Modify: `gdpr.html`
- Modify: `privatlivspolitik.html`

- [ ] **Step 1: Replace every embedded GA4 block with the shared consent stylesheet and deferred script.**
- [ ] **Step 2: Add one `Cookieindstillinger` link with `data-cookie-settings` to every footer.**
- [ ] **Step 3: Update the cookie policy with GA4 purpose, measurement ID, cookie names, provider, duration, consent, and withdrawal. Do not mention Formspree.**
- [ ] **Step 4: Expand the privacy policy with general data-controller, purpose, legal-basis, retention, security, rights, and complaint information. Do not mention Google Analytics or Formspree.**

### Task 4: Verify behavior and presentation

**Files:**
- Test: `tests/cookie-consent.test.mjs`
- Test: `tests/html-integration.test.mjs`

- [ ] **Step 1: Run `npm test`; expected result is all tests passing.**
- [ ] **Step 2: Run `git diff --check` and validate all JSON-LD plus sitemap XML.**
- [ ] **Step 3: Serve the static site locally and verify banner rendering, reject, accept, and settings reset in a browser.**
- [ ] **Step 4: Confirm no Google request occurs before acceptance and exactly one occurs after acceptance.**
