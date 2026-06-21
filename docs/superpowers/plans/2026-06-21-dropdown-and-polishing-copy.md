# Dropdown and Polishing Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the desktop services dropdown open while crossing its 4 px visual gap and replace Hempel/Jotun copy with Renskib wording on the polishing page.

**Architecture:** Preserve the self-contained static-page structure. Enforce the shared dropdown CSS contract across all five marketing pages and the supplier-copy contract on the polishing page through Node integration tests.

**Tech Stack:** Static HTML/CSS, Node.js test runner

---

### Task 1: Regression tests

**Files:**
- Modify: `tests/navigation.test.mjs`

- [ ] **Step 1: Write failing tests**

Add assertions that every marketing page uses `top: calc(100% + 4px)` and a `.services-dropdown::after` hover bridge spanning the gap. Add a test asserting that `polering-bundmaling.html` contains `Renskibs produkter` and contains neither `Hempel` nor `Jotun`.

```js
test('desktop services dropdown has a continuous four-pixel hover path', async () => {
  for (const page of marketingPages) {
    const html = await readFile(path.join(root, page), 'utf8');
    assert.match(html, /\.services-dropdown::after\s*\{[^}]*bottom:\s*-4px[^}]*height:\s*4px/s, page);
    assert.match(html, /\.services-dropdown-menu\s*\{[^}]*top:\s*calc\(100% \+ 4px\)/s, page);
  }
});

test('polishing page presents Renskib as the agreed product supplier', async () => {
  const html = await readFile(path.join(root, 'polering-bundmaling.html'), 'utf8');
  assert.match(html, /Renskibs produkter/);
  assert.doesNotMatch(html, /Hempel|Jotun/);
});
```

- [ ] **Step 2: Verify the tests fail**

Run: `node --test tests/navigation.test.mjs`
Expected: FAIL because the pages still use a 1rem gap, have no hover bridge, and still mention Hempel/Jotun.

### Task 2: Minimal implementation

**Files:**
- Modify: `index.html`
- Modify: `baadklargoering.html`
- Modify: `motorservice.html`
- Modify: `polering-bundmaling.html`
- Modify: `svejse-metalopgaver.html`

- [ ] **Step 1: Fix dropdown geometry**

On all five pages, replace `top: calc(100% + 1rem)` with `top: calc(100% + 4px)` and add an absolutely positioned transparent `.services-dropdown::after` pseudo-element covering the 4 px area below the parent while it is hovered or open.

```css
.services-dropdown::after {
  content: '';
  display: none;
  position: absolute;
  right: 0;
  bottom: -4px;
  left: 0;
  height: 4px;
}
.services-dropdown:hover::after,
.services-dropdown.open::after { display: block; }
```

- [ ] **Step 2: Update polishing copy**

Replace every Hempel/Jotun reference in `polering-bundmaling.html` with consistent Renskib wording. Use “Renskibs produkter – eller andet efter aftale” as the primary visible formulation and retain contextual product-selection caveats.

- [ ] **Step 3: Verify the focused tests pass**

Run: `node --test tests/navigation.test.mjs`
Expected: all navigation tests PASS.

- [ ] **Step 4: Verify the full suite**

Run: `npm test`
Expected: all tests PASS with zero failures.

- [ ] **Step 5: Browser verification**

Open the local site at desktop width, hover “Ydelser”, move the pointer slowly through the 4 px gap, and confirm the menu remains open and is visibly closer to the trigger.

- [ ] **Step 6: Commit and push**

Stage the plan, test, and five HTML files; commit with `Dropdown ændring`; push `main` to `origin` and verify the matching production deployment reaches READY.
