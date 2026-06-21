import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve(import.meta.dirname, '..');

async function htmlFiles() {
  const entries = await readdir(root, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => path.join(root, entry.name))
    .sort();
}

test('every page includes consent assets and settings without an embedded Google tag', async () => {
  const files = await htmlFiles();
  assert.equal(files.length, 8);

  for (const file of files) {
    const html = await readFile(file, 'utf8');
    assert.equal((html.match(/\/assets\/cookie-consent\.css/g) || []).length, 1, file);
    assert.equal((html.match(/\/assets\/cookie-consent\.js/g) || []).length, 1, file);
    assert.equal((html.match(/data-cookie-settings/g) || []).length, 1, file);
    assert.equal((html.match(/googletagmanager\.com\/gtag\/js/g) || []).length, 0, file);
  }
});

test('cookie policy documents GA4 and excludes Formspree', async () => {
  const policy = await readFile(path.join(root, 'cookiepolitik.html'), 'utf8');

  assert.match(policy, /Google Analytics 4/);
  assert.match(policy, /G-8GW9DG9DR5/);
  assert.match(policy, /_ga/);
  assert.match(policy, /Cookieindstillinger/);
  assert.doesNotMatch(policy, /Formspree/i);
});

test('privacy policy excludes Google Analytics and Formspree', async () => {
  const policy = await readFile(path.join(root, 'privatlivspolitik.html'), 'utf8');

  assert.doesNotMatch(policy, /Google Analytics/i);
  assert.doesNotMatch(policy, /Formspree/i);
});

test('consent stylesheet includes fixed, responsive, and keyboard-focus states', async () => {
  const css = await readFile(path.join(root, 'assets/cookie-consent.css'), 'utf8');

  assert.match(css, /position:\s*fixed/);
  assert.match(css, /bottom:\s*0/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media/);
});
