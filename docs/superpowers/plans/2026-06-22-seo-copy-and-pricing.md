# SEO Copy and Pricing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite SMJ Marine's key SEO copy in natural Danish, publish accurate from-prices, and strengthen the motorservice content without creating unsupported location pages.

**Architecture:** Keep the existing static HTML architecture and page layout. Add focused Node test coverage for required commercial facts, then update visible copy and matching metadata in the three existing pages only.

**Tech Stack:** Static HTML5, JSON-LD, Node.js built-in test runner and assertions

---

## File map

- Create `tests/seo-copy.test.mjs`: regression checks for prices, service topics, natural hero copy, and service-area claims.
- Modify `index.html`: natural homepage hero and truthful service-area copy.
- Modify `baadklargoering.html`: natural hero, cleaning package from-prices, price conditions, and matching metadata.
- Modify `motorservice.html`: natural hero, useful separated service topics, from-price, contact guidance, and matching metadata/JSON-LD.

### Task 1: Add failing SEO copy regression tests

**Files:**
- Create: `tests/seo-copy.test.mjs`

- [ ] **Step 1: Create the tests**

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve(import.meta.dirname, '..');
const readPage = (filename) => readFile(path.join(root, filename), 'utf8');

test('cleaning page publishes all approved from-prices including VAT', async () => {
  const html = await readPage('baadklargoering.html');

  assert.match(html, /op til 20 fod[\s\S]*?fra 1\.499 kr\./i);
  assert.match(html, /20[–-]30 fod[\s\S]*?fra 2\.499 kr\./i);
  assert.match(html, /over 30 fod[\s\S]*?fra 3\.999 kr\./i);
  assert.match(html, /inkl\. moms/i);
  assert.match(html, /stand[\s\S]*adgangsforhold[\s\S]*omfang/i);
});

test('motorservice page publishes the approved from-price and service topics', async () => {
  const html = await readPage('motorservice.html');

  assert.match(html, /fra 799 kr\.[\s\S]*inkl\. moms/i);
  for (const topic of ['Indenbordsmotor', 'Udenbordsmotor', 'Impeller og kølesystem', 'Vinterkonservering', 'Motormærker']) {
    assert.match(html, new RegExp(`<h3[^>]*>${topic}`, 'i'), topic);
  }
  for (const brand of ['Volvo Penta', 'Yanmar', 'Bukh', 'Mercury', 'Yamaha']) {
    assert.match(html, new RegExp(brand, 'i'), brand);
  }
});

test('key pages describe the truthful service area without keyword commentary', async () => {
  for (const filename of ['index.html', 'baadklargoering.html', 'motorservice.html']) {
    const html = await readPage(filename);
    assert.match(html, /hele Sjælland/i, filename);
    assert.match(html, /andre havne efter aftale/i, filename);
    assert.doesNotMatch(html, /relevante for søgninger/i, filename);
    assert.doesNotMatch(html, /Billund|Frederikshavn/i, filename);
  }
});
```

- [ ] **Step 2: Run the new test and confirm it fails against the old copy**

Run: `node --test tests/seo-copy.test.mjs`

Expected: FAIL because the approved from-prices, section headings, and complete service-area wording are not present yet.

- [ ] **Step 3: Commit the failing tests**

```bash
git add tests/seo-copy.test.mjs
git commit -m "test: define SEO copy and pricing requirements"
```

### Task 2: Rewrite homepage positioning and service area

**Files:**
- Modify: `index.html` hero, about text, and contact service-area field
- Test: `tests/seo-copy.test.mjs`

- [ ] **Step 1: Replace the hero paragraph with natural customer-facing copy**

Use this visible hero text:

```html
<p class="hero-sub">
  Vi hjælper bådejere med klargøring, motorservice og løbende vedligeholdelse, så båden er sikker og klar til næste tur.
</p>
```

- [ ] **Step 2: Replace the search-engine commentary in the about section**

Use this visible paragraph:

```html
<p class="about-body">
  Vi dækker hele Sjælland og hjælper også i andre havne efter aftale. Ring eller skriv for at høre, om vi kan hjælpe i din havn.
</p>
```

Change the contact value to:

```html
<span class="cta-contact-value">Hele Sjælland — andre havne efter aftale</span>
```

- [ ] **Step 3: Keep homepage metadata concise and consistent**

Update the HTML description, Open Graph description, Twitter description, and WebPage/LocalBusiness JSON-LD descriptions so they describe boat preparation, motorservice, maintenance, and service on Zealand without adding unsupported towns or keyword lists. Preserve canonical URLs, entity IDs, phone, email, and existing schema structure.

- [ ] **Step 4: Run the focused service-area test**

Run: `node --test --test-name-pattern="truthful service area" tests/seo-copy.test.mjs`

Expected: FAIL only for the two service pages, while `index.html` satisfies all assertions.

- [ ] **Step 5: Commit the homepage copy**

```bash
git add index.html
git commit -m "content: clarify homepage service area"
```

### Task 3: Publish cleaning from-prices and simplify boat-preparation copy

**Files:**
- Modify: `baadklargoering.html` hero, price section, service-area FAQ, metadata, and JSON-LD descriptions
- Test: `tests/seo-copy.test.mjs`

- [ ] **Step 1: Replace the hero paragraph**

Use this visible hero text:

```html
<p class="hero-sub">Vi gør båden klar til sæsonen med rengøring, praktisk gennemgang og de aftalte klargøringsopgaver direkte på havnen.</p>
```

- [ ] **Step 2: Replace the current price cards with approved cleaning packages**

Keep the existing `price-grid` and `price-card` classes. Render these three cards:

```html
<div class="price-card"><h3>Lille båd — op til 20 fod</h3><p><strong>Fra 1.499 kr. inkl. moms</strong></p><p>Udvendig skyl og vask, dæk og cockpit, støvsugning indvendigt og rengøring til sæsonen.</p></div>
<div class="price-card"><h3>Mellem båd — 20–30 fod</h3><p><strong>Fra 2.499 kr. inkl. moms</strong></p><p>Grundig udvendig rengøring samt rengøring af dæk, cockpit, kahyt og sæsonklargøring.</p></div>
<div class="price-card"><h3>Stor båd — over 30 fod</h3><p><strong>Fra 3.999 kr. inkl. moms</strong></p><p>Komplet ydre rengøring samt rengøring af teak, cockpit, kahyt og sæsonklargøring.</p></div>
```

Introduce the cards with this pricing condition and contact guidance:

```html
<p class="price-note">Alle priser er fra-priser inkl. moms. Den endelige pris afhænger af bådens stand, adgangsforhold, opgavens omfang og eventuelle tilvalg. Ring eller skriv med bådtype, længde og havn, så giver vi en konkret vurdering.</p>
```

- [ ] **Step 3: Align service-area copy and metadata**

Update the FAQ answer about locations to state that SMJ Marine covers all of Zealand and other harbours by agreement, with a request to call or write. Mirror the same meaning in the matching FAQPage JSON-LD answer. Simplify metadata descriptions where they currently read as keyword lists, while preserving canonical and schema identifiers.

- [ ] **Step 4: Run the cleaning and service-area tests**

Run: `node --test tests/seo-copy.test.mjs`

Expected: Cleaning and service-area assertions PASS for `baadklargoering.html`; motorservice assertions remain failing.

- [ ] **Step 5: Commit the boat-preparation copy**

```bash
git add baadklargoering.html
git commit -m "content: add cleaning from-prices"
```

### Task 4: Restructure motorservice content and publish its from-price

**Files:**
- Modify: `motorservice.html` hero, service cards, price section, FAQ, metadata, and JSON-LD descriptions
- Test: `tests/seo-copy.test.mjs`

- [ ] **Step 1: Replace the hero paragraph**

Use this visible hero text:

```html
<p class="hero-sub">Vi servicerer og fejlsøger indenbords- og udenbordsmotorer på havnen, så du får en klar vurdering og en motor, du kan stole på.</p>
```

- [ ] **Step 2: Replace the keyword-heavy service grid with five focused cards**

Keep existing service-card styling and use these headings and content:

```html
<h3 class="service-title">Indenbordsmotor</h3>
<p class="service-desc">Et almindeligt eftersyn tilpasses motorens model, alder og servicehistorik. Det kan blandt andet omfatte motorolie, filtre, remme, slanger, køling og anoder.</p>

<h3 class="service-title">Udenbordsmotor</h3>
<p class="service-desc">På udenbordsmotorer gennemgår vi de relevante servicepunkter, eksempelvis motorolie, gearolie, filtre, tændrør, køling og synlige tegn på slid eller utætheder.</p>

<h3 class="service-title">Impeller og kølesystem</h3>
<p class="service-desc">Impelleren sørger for kølevand til motoren. Svag kølestråle, varm motor eller ukendt servicehistorik er gode grunde til at få kølesystemet kontrolleret. Arbejdets omfang afhænger af motortype og adgang.</p>

<h3 class="service-title">Vinterkonservering</h3>
<p class="service-desc">Ved sæsonslut beskytter vinterkonservering motoren mod frost, fugt, korrosion og længere stilstand. Vi tilpasser arbejdet til motor og opbevaringsforhold.</p>

<h3 class="service-title">Motormærker</h3>
<p class="service-desc">Vi hjælper med service og fejlfinding på blandt andet Volvo Penta, Yanmar, Bukh, Mercury og Yamaha. Muligheden afhænger af opgaven og tilgængelige reservedele.</p>
```

- [ ] **Step 3: Replace the price introduction with the approved from-price**

```html
<p class="price-note"><strong>Motorservice fra 799 kr. inkl. moms.</strong> Den endelige pris afhænger af motorens type og model, servicehistorik, adgangsforhold, opgavens omfang samt materialer og reservedele. Send mærke, model, havn og en kort beskrivelse, så giver vi en konkret vurdering.</p>
```

Retain useful price-factor cards, but remove phrases that repeat query variants solely for SEO.

- [ ] **Step 4: Align service area, metadata, and JSON-LD**

Change the visible location FAQ and matching FAQPage answer to “hele Sjælland og andre havne efter aftale” with contact guidance. Rewrite title/description and Service/WebPage descriptions in plain Danish, retaining the canonical URL, schema IDs, supported brands, and truthful areaServed value.

- [ ] **Step 5: Run the complete focused suite**

Run: `node --test tests/seo-copy.test.mjs`

Expected: PASS for all three tests.

- [ ] **Step 6: Commit the motorservice copy**

```bash
git add motorservice.html
git commit -m "content: expand motorservice guidance and pricing"
```

### Task 5: Full verification

**Files:**
- Verify: `index.html`
- Verify: `baadklargoering.html`
- Verify: `motorservice.html`
- Verify: `tests/seo-copy.test.mjs`

- [ ] **Step 1: Run every automated test**

Run: `npm test`

Expected: All Node tests PASS with zero failures.

- [ ] **Step 2: Check formatting and forbidden location claims**

Run: `git diff --check && ! rg -n "Billund|Frederikshavn|relevante for søgninger" index.html baadklargoering.html motorservice.html`

Expected: Exit status 0 and no output.

- [ ] **Step 3: Confirm the intended file scope**

Run: `git status --short`

Expected: Only the three HTML files and `tests/seo-copy.test.mjs` are changed before their respective commits; no unrelated user files are modified.

- [ ] **Step 4: Review the final patch**

Run: `git diff HEAD~4 -- index.html baadklargoering.html motorservice.html tests/seo-copy.test.mjs`

Expected: The patch contains only the approved copy, metadata synchronization, and regression tests. Canonicals, navigation, sitemap, redirects, and contact flow remain unchanged.
