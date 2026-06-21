# Services Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a desktop services dropdown and mobile services accordion linking the four existing service pages across the five public marketing pages.

**Architecture:** Keep each static page self-contained and use identical semantic navigation markup, CSS classes, and small JavaScript handlers across all five pages. Extend the existing HTML integration test to enforce navigation structure and link targets.

**Tech Stack:** Static HTML, CSS, browser JavaScript, Node.js test runner

---

### Task 1: Navigation contract tests

**Files:**
- Modify: `tests/html-integration.test.mjs`

- [ ] **Step 1: Write the failing test**

Add a test that reads the five marketing pages, extracts `.nav-links` and `#mobileMenu`, and asserts that `Forside` precedes `Ydelser`, `/` is the home target, all four service paths occur in each desktop and mobile service submenu, and the mobile toggle has `aria-expanded="false"` plus `aria-controls="mobileServicesMenu"`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL because the current navigation has no dropdown or accordion.

- [ ] **Step 3: Keep the failing test for implementation**

Do not weaken assertions to fit current markup.

### Task 2: Desktop dropdown and mobile accordion

**Files:**
- Modify: `index.html`
- Modify: `baadklargoering.html`
- Modify: `motorservice.html`
- Modify: `polering-bundmaling.html`
- Modify: `svejse-metalopgaver.html`

- [ ] **Step 1: Add identical semantic markup**

Use `.services-dropdown`, `.services-toggle`, `.services-dropdown-menu`, `.mobile-services-toggle`, and `#mobileServicesMenu`. The desktop button must expose `aria-expanded`; the mobile button must expose `aria-expanded="false"` and `aria-controls="mobileServicesMenu"`.

- [ ] **Step 2: Add styles**

Add an absolutely positioned desktop dropdown that opens through `.open` and `:hover`, animated service-link hover states, an accordion-style mobile submenu, a rotating indicator, and a `prefers-reduced-motion` override.

- [ ] **Step 3: Add interactions**

Click toggles the desktop menu, outside click and Escape close it, and focus alone does nothing. Mobile click toggles its submenu and updates `aria-expanded`; closing the overlay also resets the submenu.

- [ ] **Step 4: Run automated tests**

Run: `npm test`

Expected: all tests PASS.

### Task 3: Browser verification and publication

**Files:**
- Verify all five modified HTML files and `tests/html-integration.test.mjs`

- [ ] **Step 1: Serve and inspect**

Run a local static server and verify desktop hover/click/outside-click/Escape plus mobile open/close and each service link.

- [ ] **Step 2: Review the diff**

Run: `git diff --check` and inspect the scoped diff, ensuring unrelated cookie/privacy changes remain unstaged.

- [ ] **Step 3: Commit the scoped changes**

Run: `git add index.html baadklargoering.html motorservice.html polering-bundmaling.html svejse-metalopgaver.html tests/html-integration.test.mjs docs/superpowers/plans/2026-06-21-services-navigation.md && git commit -m "Navigation m/ ydelser"`

- [ ] **Step 4: Push**

Run: `git push origin HEAD`

Expected: the current branch is updated on `origin`.
