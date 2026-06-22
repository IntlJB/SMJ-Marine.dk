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
