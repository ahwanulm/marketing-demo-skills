#!/usr/bin/env node
// Render screenshot iklan di detik tertentu — untuk cek visual tanpa menonton manual.
//
//   node marketing/tools/render-frames.cjs <folder-iklan> <detik...>
//   node marketing/tools/render-frames.cjs marketing/iklan/hook-singkat-portrait 1 3.5 12 38
//
// Env opsional:
//   OUT=folder-hasil   (default: <folder-iklan>/_frames, sudah di-.gitignore lewat pola _frames/)
//   GUIDES=1           tampilkan garis safe zone Reels/TikTok (hanya iklan hook-*)
//   THEME=light        tema terang
//   NOCAPS=1           tanpa caption
//   GSAP_LOCAL=path    pakai gsap.min.js lokal kalau cdnjs diblokir (mis. di container)
//
// Butuh Playwright (npm i -g playwright, atau npx playwright). Ukuran viewport dibaca
// dari folder: nama berisi "landscape" atau "quick-process" → 1920×1080, selain itu 1080×1920.
// Iklan harus expose window.__seek(t) & window.__ready di mode ?record=1.
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');

function loadBrowser() {
  try { return { type: 'playwright', mod: require('playwright') }; } catch {}
  try { return { type: 'puppeteer', mod: require('puppeteer') }; } catch {}
  try {
    const local = path.join(__dirname, '../node_modules');
    if (fs.existsSync(path.join(local, 'playwright'))) return { type: 'playwright', mod: require(path.join(local, 'playwright')) };
    if (fs.existsSync(path.join(local, 'puppeteer'))) return { type: 'puppeteer', mod: require(path.join(local, 'puppeteer')) };
  } catch {}
  try {
    const root = execFileSync('npm', ['root', '-g']).toString().trim();
    return { type: 'playwright', mod: require(path.join(root, 'playwright')) };
  } catch {}
  try {
    return { type: 'puppeteer', mod: require(path.resolve('backend/node_modules/puppeteer')) };
  } catch {}
  throw new Error('Neither Playwright nor Puppeteer found. Install with `npm install puppeteer` or `npm install playwright`.');
}

(async () => {
  const [dirArg, ...times] = process.argv.slice(2);
  if (!dirArg || !times.length || !fs.existsSync(path.join(dirArg, 'index.html'))) {
    console.error('Pakai: node marketing/tools/render-frames.cjs <folder-iklan> <detik...>');
    process.exit(1);
  }
  const dir = path.resolve(dirArg);
  const land = /landscape|quick-process/.test(path.basename(dir));
  const out = path.resolve(process.env.OUT || path.join(dir, '_frames'));
  fs.mkdirSync(out, { recursive: true });

  const bInfo = loadBrowser();
  let browser, page;
  const viewport = land ? { width: 1920, height: 1080 } : { width: 1080, height: 1920 };

  if (bInfo.type === 'playwright') {
    browser = await bInfo.mod.chromium.launch();
    page = await browser.newPage({ viewport });
  } else {
    browser = await bInfo.mod.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    page = await browser.newPage();
    await page.setViewport(viewport);
  }
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  if (process.env.GSAP_LOCAL) {
    await page.route('**/cdnjs.cloudflare.com/**', r => r.fulfill({ path: process.env.GSAP_LOCAL, contentType: 'application/javascript' }));
  }

  const q = new URLSearchParams({ record: '1' });
  if (process.env.GUIDES) q.set('guides', '1');
  if (process.env.THEME) q.set('theme', process.env.THEME);
  if (process.env.NOCAPS) q.set('nocaps', '1');
  await page.goto('file://' + path.join(dir, 'index.html') + '?' + q, { waitUntil: 'load', timeout: 60000 });
  await page.waitForFunction('window.__ready === true', { timeout: 30000 });
  const dur = await page.evaluate('window.__duration');

  for (const t of times.map(Number)) {
    await page.evaluate(x => window.__seek(x), t);
    await new Promise(r => setTimeout(r, 80));
    const file = path.join(out, `f_${String(t).replace('.', '_')}.png`);
    await page.screenshot({ path: file });
    console.log('✓', path.relative(process.cwd(), file));
  }
  console.log(`durasi iklan: ${dur} dtk`);
  console.log(errors.length ? 'ERROR halaman:\n' + errors.join('\n') : 'tanpa error halaman');
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
