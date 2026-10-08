#!/usr/bin/env node
// Bangun 4 iklan hook dari satu template:
//   iklan/hook-singkat-portrait   (±39 dtk, 1080×1920)
//   iklan/hook-singkat-landscape  (±39 dtk, 1920×1080)
//   iklan/hook-panjang-portrait   (±58 dtk, 1080×1920)
//   iklan/hook-panjang-landscape  (±58 dtk, 1920×1080)
// Tiap folder: index.html (standalone, logo tertanam), tanpa-caption.html, narasi.txt.
//
//   node marketing/tools/build-hooks.mjs
//
// Ubah urutan scene / durasi / kalimat narasi di VARIANTS di bawah, lalu build ulang.
// Tampilan & animasi tiap scene ada di marketing/_shared/hook-template.html (objek SCN).
// Scene yang tersedia: hook, clips, manual, split, tempel, creator, riset, image, video, upload, wall, cta
// (image → video → upload harus berurutan karena memakai kartu yang sama).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const template = fs.readFileSync(path.join(ROOT, '_shared/hook-template.html'), 'utf8');
const logo = 'data:image/png;base64,' + fs.readFileSync(path.join(ROOT, '_shared/logo-klipers.png')).toString('base64');

// `text` = caption di layar; `say` = ejaan untuk TTS (angka & nama model ditulis sesuai ucapan)
const SHORT = [
  { id: 'hook',   text: '1 video panjang, jadi 30 klip viral.', say: 'Satu video panjang, jadi tiga puluh klip viral.' },
  { id: 'clips',  text: 'AI pilih momen terbaik, plus subtitle otomatis.' },
  { id: 'manual', text: 'Atur manual momennya sendiri.' },
  { id: 'split',  text: 'Split cam untuk streamer.' },
  { id: 'tempel', text: 'Konten tempel dengan suara AI.' },
  { id: 'image',  text: 'Gambar AI pakai Seedream 5.0 Pro,', say: 'Gambar AI pakai Seedream lima titik nol Pro,' },
  { id: 'video',  text: 'jadikan video dengan MiniMax H3.', say: 'jadikan video dengan MiniMax H tiga.' },
  { id: 'upload', text: 'Upload otomatis ke 5 platform.', say: 'Upload otomatis ke lima platform.' },
  { id: 'wall',   text: '21 fitur, satu aplikasi.', say: 'Dua puluh satu fitur, satu aplikasi.' },
  { id: 'cta',    text: 'Download Klipers di Google Play.' },
];
const LONG = [
  { id: 'hook',    text: 'Nggak sempat ngedit? Klipers ubah 1 video jadi 30 klip viral.', say: 'Nggak sempat ngedit? Klipers ubah satu video jadi tiga puluh klip viral.' },
  { id: 'clips',   text: 'AI cari momen paling viral, lengkap subtitle dan face tracking.' },
  { id: 'manual',  text: 'Mau kontrol penuh? Pakai atur manual.' },
  { id: 'split',   text: 'Streamer? Split cam pisahkan gameplay dan facecam.' },
  { id: 'tempel',  text: 'Konten tempel: video, judul, dan suara AI.' },
  { id: 'creator', text: 'Content Creator bikin video dari satu topik.' },
  { id: 'riset',   text: 'Cek analitik viral dan optimasi judul.' },
  { id: 'image',   text: 'Bikin gambar AI pakai Seedream 5.0 Pro,', say: 'Bikin gambar AI pakai Seedream lima titik nol Pro,' },
  { id: 'video',   text: 'lalu jadikan video dengan MiniMax H3 atau Seedance 2.', say: 'lalu jadikan video dengan MiniMax H tiga atau Seedance dua.' },
  { id: 'upload',  text: 'Upload otomatis dan terjadwal ke 5 platform.', say: 'Upload otomatis dan terjadwal ke lima platform.' },
  { id: 'wall',    text: '21 fitur AI dalam satu aplikasi.', say: 'Dua puluh satu fitur AI dalam satu aplikasi.' },
  { id: 'cta',     text: 'Download Klipers di Google Play, atau buka klipers.pro.', say: 'Download Klipers di Google Play, atau buka klipers titik pro.' },
];

// Durasi scene dihitung dari panjang kalimat yang diucapkan (±14 huruf/detik) + jeda napas,
// supaya scene tidak berganti sebelum narasinya selesai.
const CHARS_PER_SEC = 14;
const withDur = (scenes, min) => scenes.map(s => {
  const speech = (s.say || s.text).length / CHARS_PER_SEC;
  const dur = Math.max(s.id === 'cta' ? min + 1.3 : min, speech + (s.id === 'cta' ? 2.2 : 1.0));
  return { ...s, dur: Math.ceil(dur * 10) / 10 };
});

const VARIANTS = [
  { slug: 'hook-singkat-portrait',  title: 'Hook Singkat Portrait',  kind: 'singkat', format: 'portrait',  scenes: withDur(SHORT, 3.5) },
  { slug: 'hook-singkat-landscape', title: 'Hook Singkat Landscape', kind: 'singkat', format: 'landscape', scenes: withDur(SHORT, 3.5) },
  { slug: 'hook-panjang-portrait',  title: 'Hook Panjang Portrait',  kind: 'panjang', format: 'portrait',  scenes: withDur(LONG, 4.0) },
  { slug: 'hook-panjang-landscape', title: 'Hook Panjang Landscape', kind: 'panjang', format: 'landscape', scenes: withDur(LONG, 4.0) },
];

const SCENE_LABEL = {
  hook: 'Hook — video panjang dipotong jadi klip', clips: 'Analisis AI: klip + subtitle + face tracking', manual: 'Atur Manual',
  split: 'Split Cam', tempel: 'Konten Tempel', creator: 'Content Creator (topik → naskah → video)', riset: 'Riset viral: analitik + optimasi judul',
  image: 'Klipers AI: gambar AI', video: 'Klipers AI: video AI', upload: 'Auto Upload 5 platform', wall: 'Dinding 21 fitur FeatureGrid', cta: 'Penutup Google Play',
};
const num = n => n.toFixed(2).replace(/0$/, '').replace('.', ',');

function narasi(v) {
  let t = 0;
  const rows = v.scenes.map((s, i) => {
    const start = t + 0.15, end = t + s.dur - 0.15; t += s.dur;
    return { file: `vo-${String(i + 1).padStart(2, '0')}.mp3`, start, end, s };
  });
  const total = t + 0.3;
  const fmt = v.format === 'portrait' ? 'portrait 1080×1920 — Reels / TikTok / Shorts / Stories' : 'landscape 1920×1080 — YouTube in-stream, feed FB/X, web';
  return `NARASI IKLAN KLIPERS — ${v.title.toUpperCase()}
Folder       : marketing/iklan/${v.slug}/
Durasi video : ±${num(total)} detik
Format       : ${fmt}
Bahasa       : Indonesia
Voice        : ElevenLabs QC3gSHMyKh8m20lGyUNZ (default skrip)
               atau Edge-TTS en-AU-WilliamMultilingualNeural
Catatan      : Narasi versi ${v.kind} SAMA untuk portrait & landscape — audio/ bisa disalin antar folder.

=====================================================================
A. NASKAH UTUH — untuk ditempel langsung ke ElevenLabs / TTS lain
=====================================================================

${rows.map(r => r.s.say || r.s.text).join('\n')}


=====================================================================
B. PER KALIMAT — satu file audio per kalimat (supaya sinkron ke animasi)
   Simpan hasilnya sebagai audio/vo-01.mp3 … audio/${rows[rows.length - 1].file}
=====================================================================

${rows.map(r => `[${r.file}]  Mulai ${num(r.start)} – Selesai ${num(r.end)} dtk  (±${num(r.end - r.start)})  · ${SCENE_LABEL[r.s.id]}\n${r.s.say || r.s.text}\n`).join('\n')}

=====================================================================
CATATAN
=====================================================================
- Caption di layar memakai tulisan asli ("30 klip", "Seedream 5.0 Pro", "MiniMax H3", "21 fitur");
  kalimat di atas memakai ejaan ucapan supaya TTS membacanya benar.
- File ini & index.html DIHASILKAN oleh marketing/tools/build-hooks.mjs — ubah kalimat/durasi
  di sana lalu jalankan: node marketing/tools/build-hooks.mjs
- Generate suara:
    ELEVENLABS_API_KEY=sk_xxx node marketing/tools/generate-voiceover-elevenlabs.mjs marketing/iklan/${v.slug}
  atau:
    bash marketing/tools/generate-voiceover.sh marketing/iklan/${v.slug}
  Kalimat terlalu panjang untuk jendelanya? Tambah SPEED=1.1 (ElevenLabs) / RATE=+12% (Edge).
`;
}

const noCaps = title => `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} Tanpa Caption</title>
<!-- Versi tanpa caption dari index.html (parameter lain ikut diteruskan) -->
<script>
  const q = new URLSearchParams(location.search); q.set('nocaps', '1');
  location.replace('index.html?' + q.toString() + location.hash);
</script>
<style>body{margin:0;background:#050505;color:#9ca3af;font:500 15px system-ui;display:flex;align-items:center;justify-content:center;height:100vh}a{color:#fff}</style>
</head>
<body><p>Membuka iklan tanpa caption… <a href="index.html?nocaps=1">klik di sini</a> kalau tidak otomatis.</p></body>
</html>
`;

for (const v of VARIANTS) {
  const dir = path.join(ROOT, 'iklan', v.slug);
  fs.mkdirSync(dir, { recursive: true });
  const cfg = { format: v.format, scenes: v.scenes.map(({ id, dur, text, say }) => ({ id, dur, text, ...(say ? { say } : {}) })) };
  const html = template.replaceAll('__TITLE__', `Klipers ${v.title}`).replace('__CONFIG__', JSON.stringify(cfg)).replace('__KL_LOGO__', logo);
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  fs.writeFileSync(path.join(dir, 'tanpa-caption.html'), noCaps(`Klipers ${v.title}`));
  fs.writeFileSync(path.join(dir, 'narasi.txt'), narasi(v));
  const total = v.scenes.reduce((a, s) => a + s.dur, 0) + 0.3;
  console.log(`✓ iklan/${v.slug}  (${total.toFixed(1)} dtk, ${v.scenes.length} scene)`);
}
