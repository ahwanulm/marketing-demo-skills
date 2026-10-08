#!/usr/bin/env node
// Generate narasi sebuah iklan dengan ElevenLabs.
// Kalimat dibaca dari <folder-iklan>/narasi.txt (bagian B, blok "[vo-NN.mp3] …"),
// hasilnya ditulis ke <folder-iklan>/audio/vo-NN.mp3 — nama yang dimuat index.html.
//
//   ELEVENLABS_API_KEY=sk_xxx node marketing/tools/generate-voiceover-elevenlabs.mjs marketing/iklan/<nama-iklan>
//
// Opsional:
//   VOICE_ID=...   default QC3gSHMyKh8m20lGyUNZ = voice pilihan owner.
//                  Alternatif: IKne3meq5aSn9XLyUdCD = "Charlie (Pria Natural)" dari Content Creator.
//   MODEL=...      default eleven_multilingual_v2 (stabil untuk Indonesia); eleven_v3 lebih ekspresif
//   SPEED=1.05     0.7–1.2
//   ONLY=3         generate satu kalimat saja (nomor vo)
//
// Butuh Node 18+ (fetch bawaan), tanpa dependency.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readNarration, listAds } from './narasi.mjs';

const adDir = process.argv[2];
if (!adDir) {
  console.error('Pakai: node generate-voiceover-elevenlabs.mjs <folder-iklan>\n\nIklan yang tersedia:');
  listAds(path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'iklan')).forEach(a => console.error('  ' + a));
  process.exit(1);
}

const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.error('Set ELEVENLABS_API_KEY dulu, mis.:\n  ELEVENLABS_API_KEY=sk_xxx node generate-voiceover-elevenlabs.mjs ' + adDir);
  process.exit(1);
}
if (!API_KEY.startsWith('sk_')) {
  console.error('ELEVENLABS_API_KEY harus diawali "sk_". Yang terpasang sepertinya API key ID (label key),\n' +
    'bukan key-nya. Buat key baru di elevenlabs.io → Profile → API Keys, lalu salin nilai sk_… yang muncul.');
  process.exit(1);
}
const VOICE_ID = process.env.VOICE_ID || 'QC3gSHMyKh8m20lGyUNZ';
const MODEL = process.env.MODEL || 'eleven_multilingual_v2';
const SPEED = Math.max(0.7, Math.min(1.2, Number(process.env.SPEED || 1.05)));
const ONLY = process.env.ONLY ? Number(process.env.ONLY) : null;

const lines = readNarration(adDir);
const outDir = path.join(adDir, 'audio');
fs.mkdirSync(outDir, { recursive: true });

for (const [i, { file, text }] of lines.entries()) {
  if (ONLY && ONLY !== Number(file.match(/\d+/)[0])) continue;
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: { 'xi-api-key': API_KEY, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
    body: JSON.stringify({
      text,
      model_id: MODEL,
      language_code: 'id',
      voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.2, speed: SPEED, use_speaker_boost: true },
      // Supaya intonasi antar kalimat nyambung seperti satu narasi utuh
      previous_text: lines[i - 1]?.text,
      next_text: lines[i + 1]?.text,
    }),
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    console.error(`✗ ${file}: ElevenLabs ${res.status} ${msg.slice(0, 300)}`);
    if (res.status === 401) console.error('  API key tidak valid.');
    process.exit(1);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const out = path.join(outDir, file);
  fs.writeFileSync(out, buf);
  console.log(`✓ ${path.relative(process.cwd(), out)}  (${(buf.length / 1024).toFixed(0)} KB)`);
}
console.log('Selesai. Buka index.html di folder iklan — suara otomatis dipakai.');
