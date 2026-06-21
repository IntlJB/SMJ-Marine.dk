import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve(import.meta.dirname, '..');
const marketingPages = [
  'index.html',
  'baadklargoering.html',
  'motorservice.html',
  'polering-bundmaling.html',
  'svejse-metalopgaver.html',
];
const servicePaths = [
  '/baadklargoering.html',
  '/motorservice.html',
  '/polering-bundmaling.html',
  '/svejse-metalopgaver.html',
];

test('marketing pages expose the services dropdown and mobile accordion', async () => {
  for (const page of marketingPages) {
    const html = await readFile(path.join(root, page), 'utf8');
    const desktop = html.match(/<ul class="nav-links">([\s\S]*?)<\/ul>/)?.[1] ?? '';
    const mobileStart = html.indexOf('<div class="mobile-menu" id="mobileMenu">');
    const contentStart = html.indexOf('<main>', mobileStart);
    const heroStart = html.indexOf('<!-- HERO', mobileStart);
    const mobileEnd = contentStart >= 0 ? contentStart : heroStart;
    const mobile = html.slice(mobileStart, mobileEnd);

    assert.ok(desktop.indexOf('>Forside<') < desktop.indexOf('>Ydelser<'), page);
    assert.match(desktop, /href="\/"[^>]*>Forside<\/a>/, page);
    assert.match(desktop, /class="services-toggle"[^>]*aria-expanded="false"/, page);
    assert.match(mobile, /class="mobile-services-toggle"[^>]*aria-expanded="false"[^>]*aria-controls="mobileServicesMenu"/, page);
    assert.match(mobile, /id="mobileServicesMenu"/, page);

    for (const servicePath of servicePaths) {
      assert.equal((desktop.match(new RegExp(`href="${servicePath}"`, 'g')) || []).length, 1, `${page} desktop ${servicePath}`);
      assert.equal((mobile.match(new RegExp(`href="${servicePath}"`, 'g')) || []).length, 1, `${page} mobile ${servicePath}`);
    }
  }
});

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
