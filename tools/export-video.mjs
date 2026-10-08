#!/usr/bin/env node
/**
 * Export motion graphic iklan (HTML + GSAP) menjadi video MP4 dengan audio voiceover.
 *
 * Prasyarat:
 *   - Node.js
 *   - ffmpeg di PATH
 *   - Chromium / Google Chrome
 *   - puppeteer (tersedia di backend/node_modules)
 *
 * Penggunaan:
 *   node marketing/tools/export-video.mjs marketing/iklan/quick-process-auto-upload
 *   node marketing/tools/export-video.mjs marketing/iklan/quick-process-auto-upload --fps=60
 *   node marketing/tools/export-video.mjs marketing/iklan/quick-process-auto-upload --theme=light --nocaps
 *
 * Env / Flags:
 *   --fps=30          frame rate (default: 30)
 *   --crf=18          kualitas video x264 (default: 18)
 *   --theme=light     tema terang; --theme=dark tema gelap (bawaan mengikuti iklan)
 *   --nocaps          tanpa caption
 *   --out=file.mp4    jalur berkas hasil (default: <folder-iklan>/<nama-folder>.mp4)
 */

import path from 'node:path';
import fs from 'node:fs';
import { spawn, execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

function loadPuppeteer() {
  try { return require('puppeteer'); } catch {}
  try {
    const backendPath = path.resolve('backend/node_modules/puppeteer');
    if (fs.existsSync(backendPath)) return require(backendPath);
  } catch {}
  try {
    const root = execFileSync('npm', ['root', '-g']).toString().trim();
    return require(path.join(root, 'puppeteer'));
  } catch {}
  throw new Error('Puppeteer tidak ditemukan. Pasang lewat backend atau `npm i -g puppeteer`.');
}

function resolveChromePath() {
  const candidates = [
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return undefined;
}

const args = process.argv.slice(2);
const adDirArg = args.find(a => !a.startsWith('--'));
if (!adDirArg) {
  console.error('Pakai: node marketing/tools/export-video.mjs <folder-iklan> [--fps=30] [--crf=18] [--out=output.mp4]');
  process.exit(1);
}

const adDir = path.resolve(adDirArg);
const htmlFile = path.join(adDir, 'index.html');
if (!fs.existsSync(htmlFile)) {
  console.error(`Berkas ${htmlFile} tidak ditemukan.`);
  process.exit(1);
}

const getArg = (prefix, def) => {
  const found = args.find(a => a.startsWith(prefix));
  return found ? found.split('=')[1] : def;
};
const hasFlag = flag => args.includes(flag);

const fps = Number(getArg('--fps=', process.env.FPS || 30));
const crf = Number(getArg('--crf=', process.env.CRF || 18));
const isLight = hasFlag('--theme=light') || process.env.THEME === 'light';
const isNoCaps = hasFlag('--nocaps') || !!process.env.NOCAPS;
const isLand = /landscape|quick-process/.test(path.basename(adDir));
const width = isLand ? 1920 : 1080;
const height = isLand ? 1080 : 1920;

const defaultOut = path.join(adDir, `${path.basename(adDir)}.mp4`);
const outFile = path.resolve(getArg('--out=', process.env.OUT || defaultOut));

console.log(`[Export] Memproses iklan: ${path.basename(adDir)}`);
console.log(`[Export] Resolusi: ${width}x${height} @ ${fps} fps (CRF: ${crf})`);
console.log(`[Export] Output: ${outFile}`);

// Audio master:
//  - audio/full-voiceover.mp3 buatan tangan → dipakai apa adanya (tanpa efek).
//  - selain itu disusun otomatis: tiap audio/vo-NN.mp3 di detik mulai cue-nya (`s:` di CUES)
//    + efek suara dari window.__sfx halaman ({t, file, vol}) kalau iklan menyediakannya.
//    Hasil: audio/full-voiceover-auto.mp3 (dibuat ulang tiap ekspor).
const audioDir = path.join(adDir, 'audio');
const manualMaster = path.join(audioDir, 'full-voiceover.mp3');

function buildAutoMaster(sfxList) {
  if (!fs.existsSync(audioDir)) return null;
  const htmlContent = fs.readFileSync(htmlFile, 'utf8');
  const parts = [...htmlContent.matchAll(/\bs:\s*([\d.]+)\s*,\s*e:\s*[\d.]+\s*,\s*file:\s*['"]audio\/(vo-\d+\.mp3)['"]/g)]
    .map(m => ({ start: Number(m[1]), file: path.join(audioDir, m[2]), vol: 1 }))
    .filter(c => fs.existsSync(c.file));
  const nVo = parts.length;
  for (const ev of sfxList || []) {
    const f = path.join(adDir, ev.file);
    if (fs.existsSync(f)) parts.push({ start: Number(ev.t), file: f, vol: Number(ev.vol) || 0.5 });
    else console.warn(`[Export] Efek tidak ditemukan, dilewati: ${ev.file}`);
  }
  if (!parts.length) return null;
  console.log(`[Export] Menyusun audio master: ${nVo} narasi + ${parts.length - nVo} efek suara...`);
  const out = path.join(audioDir, 'full-voiceover-auto.mp3');
  const inputs = parts.flatMap(c => ['-i', c.file]);
  const chains = parts.map((c, i) => {
    const ms = Math.max(0, Math.round(c.start * 1000));
    return `[${i}:a]aformat=sample_rates=44100:channel_layouts=stereo,volume=${c.vol},adelay=${ms}|${ms}[a${i}]`;
  });
  // limiter di akhir: narasi + efek yang berdempetan tidak boleh clipping
  const filter = `${chains.join(';')};${parts.map((_, i) => `[a${i}]`).join('')}amix=inputs=${parts.length}:normalize=0:dropout_transition=0,alimiter=limit=0.95[out]`;
  execFileSync('ffmpeg', ['-y', '-v', 'error', ...inputs, '-filter_complex', filter, '-map', '[out]', '-ac', '2', '-ar', '44100', '-b:a', '192k', out]);
  return out;
}

(async () => {
  const puppeteer = loadPuppeteer();
  const chromePath = resolveChromePath();
  
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width, height });

  const q = new URLSearchParams({ record: '1' });
  if (isLight) q.set('theme', 'light');
  if (hasFlag('--theme=dark') || process.env.THEME === 'dark') q.set('theme', 'dark');
  if (isNoCaps) q.set('nocaps', '1');

  const fileUrl = 'file://' + htmlFile + '?' + q.toString();
  await page.goto(fileUrl, { waitUntil: 'load', timeout: 60000 });
  await page.waitForFunction('window.__ready === true', { timeout: 30000 });

  let masterAudio = fs.existsSync(manualMaster) ? manualMaster : buildAutoMaster(await page.evaluate('window.__sfx || []'));
  const hasAudio = !!masterAudio && fs.existsSync(masterAudio);
  if (hasAudio) console.log(`[Export] Audio: ${path.relative(process.cwd(), masterAudio)}`);
  else console.warn('[Export] Tidak ada audio, render video tanpa suara.');

  const duration = await page.evaluate('window.__duration || 30');
  const totalFrames = Math.ceil(duration * fps);
  console.log(`[Export] Durasi: ${duration}s | Total frame: ${totalFrames}`);

  const ffmpegArgs = [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'png',
    '-framerate', String(fps),
    '-i', '-',
  ];

  if (hasAudio) {
    ffmpegArgs.push('-i', masterAudio);
  }

  ffmpegArgs.push(
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', String(crf),
    '-pix_fmt', 'yuv420p'
  );

  if (hasAudio) {
    // apad: narasi biasanya selesai sebelum video → isi hening supaya -shortest tidak memotong penutup
    ffmpegArgs.push('-af', 'apad', '-c:a', 'aac', '-ac', '2', '-b:a', '192k', '-shortest');
  }

  ffmpegArgs.push(outFile);

  const ffmpeg = spawn('ffmpeg', ffmpegArgs);
  let ffmpegErr = '';
  ffmpeg.stderr.on('data', d => { ffmpegErr += d.toString(); });

  const startTime = Date.now();
  for (let i = 0; i < totalFrames; i++) {
    const t = i / fps;
    await page.evaluate(time => window.__seek(time), t);
    const buf = await page.screenshot({ type: 'png', optimizeForSpeed: true });
    ffmpeg.stdin.write(buf);

    if (i % (fps * 2) === 0 || i === totalFrames - 1) {
      const pct = Math.round(((i + 1) / totalFrames) * 100);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      process.stdout.write(`\r[Export] Render frame ${i + 1}/${totalFrames} (${pct}%) — ${elapsed}s`);
    }
  }

  process.stdout.write('\n[Export] Menunggu FFmpeg finalisasi MP4...\n');
  ffmpeg.stdin.end();

  const code = await new Promise(res => ffmpeg.on('close', res));
  await browser.close();

  if (code !== 0) {
    console.error('[Export] FFmpeg gagal dengan kode', code);
    console.error(ffmpegErr.slice(-500));
    process.exit(code);
  }

  const stat = fs.statSync(outFile);
  const sizeMb = (stat.size / (1024 * 1024)).toFixed(2);
  console.log(`[Export] ✓ Video selesai dibuat!`);
  console.log(`[Export] File: ${outFile} (${sizeMb} MB)`);
})();
