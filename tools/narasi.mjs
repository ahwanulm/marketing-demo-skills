// Parser narasi.txt bersama untuk semua skrip generator suara.
// Format yang dibaca (bagian B di narasi.txt):
//
//   [vo-01.mp3]  Mulai 0,3 dtk – Selesai 4,2 dtk  · Scene: …
//   Kalimat yang dibacakan TTS.
//
// Baris pertama tak-kosong setelah header = teks kalimat.
import fs from 'node:fs';
import path from 'node:path';

export function readNarration(adDir) {
  const file = path.join(adDir, 'narasi.txt');
  if (!fs.existsSync(file)) throw new Error(`narasi.txt tidak ditemukan di ${adDir}`);
  const rows = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const out = [];
  rows.forEach((row, i) => {
    const m = row.match(/^\[(vo-\d+\.mp3)\]/);
    if (!m) return;
    const text = rows.slice(i + 1).find(r => r.trim());
    if (text) out.push({ file: m[1], text: text.trim() });
  });
  if (!out.length) throw new Error(`Tidak ada blok "[vo-NN.mp3]" di ${file}`);
  return out;
}

export function listAds(iklanDir) {
  return fs.existsSync(iklanDir)
    ? fs.readdirSync(iklanDir).filter(d => fs.existsSync(path.join(iklanDir, d, 'narasi.txt'))).map(d => path.join('marketing/iklan', d))
    : [];
}

// CLI: node narasi.mjs <folder-iklan>  → cetak "vo-01.mp3<TAB>kalimat" (dipakai generate-voiceover.sh)
if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) {
  for (const { file, text } of readNarration(process.argv[2] || '.')) console.log(`${file}\t${text}`);
}
