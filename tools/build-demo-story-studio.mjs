// Build demo-story-studio-{landscape,portrait}: template.html + modul bersama → index.html standalone.
//   node marketing/tools/build-demo-story-studio.mjs
// Modul bersama di marketing/_shared/story-studio/: art.js (ilustrasi), ui.js + ui.css (UI Story
// Studio), engine.js (timeline, caption, audio), flow.js (alur Ide → Unggah). CUES sama untuk kedua
// format karena narasinya sama (audio/vo-*.mp3 cukup di-generate sekali lalu disalin).
import fs from 'node:fs';
import path from 'node:path';

const SH = 'marketing/_shared/story-studio';
const read = f => fs.readFileSync(path.join(SH, f), 'utf8');
const logo = `data:image/png;base64,${fs.readFileSync('marketing/_shared/logo-klipers.png').toString('base64')}`;

const CUES = [
  { s: 0.4, e: 4.5, file: 'audio/vo-01.mp3', nocap: true, text: 'Dahulu kala, seorang nelayan menangkap ikan emas yang bisa berbicara.' },
  { s: 6.0, e: 10.9, file: 'audio/vo-02.mp3', text: 'Video tadi, dari gambar sampai suaranya, dibuat cuma dari satu kalimat ide.' },
  { s: 11.0, e: 16.5, file: 'audio/vo-03.mp3', text: 'Namanya Story Studio di Klipers. Empat langkah, dari ide jadi video.' },
  { s: 16.6, e: 22.95, file: 'audio/vo-04.mp3', text: 'Tulis idemu, pilih gaya visual, durasi, dan format. Lalu klik Tulis naskah, gratis.' },
  { s: 24.1, e: 29.2, file: 'audio/vo-05.mp3', text: 'AI menyusun adegan demi adegan, lengkap dengan narasinya. Tinggal kamu rapikan.' },
  { s: 29.8, e: 35.3, file: 'audio/vo-06.mp3', text: 'Di Storyboard, buat semua gambar sekali klik. Wajah tokohnya tetap sama di tiap adegan.' },
  { s: 35.9, e: 40.85, file: 'audio/vo-07.mp3', text: 'Rekam narasi dengan suara AI, pasang efek suara otomatis, dan atur gerak kamera.' },
  { s: 41.1, e: 45.75, file: 'audio/vo-08.mp3', text: 'Di Editor, pilih gaya subtitle dan musik latar, lalu ekspor MP4.', say: 'Di Editor, pilih gaya subtitle dan musik latar, lalu ekspor em pe empat.' },
  { s: 46.0, e: 49.0, file: 'audio/vo-09.mp3', text: 'Judul, caption, dan cover juga disiapkan.' },
  { s: 49.8, e: 54.35, file: 'audio/vo-10.mp3', text: 'Lalu jadwalkan auto upload ke lima platform sekaligus, langsung dari Klipers.' },
  { s: 55.4, e: 61.1, file: 'audio/vo-11.mp3', text: 'Story Studio di Klipers. Satu ide, jadi video cerita. Download di Google Play sekarang.' },
];
// satu cue per baris supaya export-video.mjs bisa membaca `s:` + `file:` lewat regex
const cuesSrc = '[\n' + CUES.map(c => '  ' + JSON.stringify(c).replace(/"(\w+)":/g, '$1: ')).join(',\n') + '\n]';

for (const slug of ['demo-story-studio-landscape', 'demo-story-studio-portrait']) {
  const dir = path.join('marketing/iklan', slug);
  const tpl = path.join(dir, 'template.html');
  if (!fs.existsSync(tpl)) { console.warn('lewati (belum ada template):', slug); continue; }
  let html = fs.readFileSync(tpl, 'utf8');
  const parts = {
    '/*__UICSS__*/': read('ui.css'),
    '/*__ART__*/': read('art.js'),
    '/*__UI__*/': read('ui.js'),
    '/*__ENGINE__*/': read('engine.js'),
    '/*__FLOW__*/': read('flow.js'),
    '/*__CUES__*/': cuesSrc,
  };
  for (const [k, v] of Object.entries(parts)) {
    if (!html.includes(k)) throw new Error(`${slug}: placeholder ${k} tidak ada di template`);
    html = html.split(k).join(v);
  }
  html = html.split('__LOGO__').join(logo);
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`✓ ${dir}/index.html (${(html.length / 1024).toFixed(0)} KB)`);
}
