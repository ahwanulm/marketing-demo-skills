---
name: marketing-ads
description: Membuat, merevisi, dan memverifikasi iklan video motion-graphic KlipersPro (HTML + GSAP) di folder marketing/ — termasuk hook portrait/landscape singkat & panjang, iklan web Quick Process, iklan mobile app, narasi voice-over (ElevenLabs / Edge-TTS), versi tanpa caption, safe zone Reels/TikTok, dan panduan format iklan sosmed. Gunakan SETIAP KALI user menyebut "iklan", "ads", "marketing", "motion graphic", "hook", "promo video", "narasi", "voice over", "TTS iklan", "ElevenLabs", "Reels", "TikTok ads", "YouTube ads", "Play Store promo", atau minta variasi iklan baru.
---

# Iklan Motion Graphic KlipersPro (`marketing/`)

Semua iklan = **satu file HTML standalone** (GSAP 3.12.5 dari cdnjs, font Google, logo base64 tertanam) yang diputar di browser lalu direkam jadi video. Satu folder = satu model iklan.

```
marketing/
├─ README.md                     daftar iklan, param URL, panduan sosmed (UPDATE tiap tambah iklan)
├─ iklan/<slug>/
│  ├─ index.html                 video iklan
│  ├─ tanpa-caption.html         redirect ke index.html?nocaps=1
│  ├─ narasi.txt                 naskah VO: bagian A (utuh) + B (per kalimat [vo-NN.mp3]) + CATATAN
│  └─ audio/vo-NN.mp3            hasil TTS (*.mp3 di-.gitignore — JANGAN commit)
├─ tools/
│  ├─ build-hooks.mjs            GENERATOR 4 iklan hook dari template (lihat §2)
│  ├─ generate-voiceover-elevenlabs.mjs   narasi.txt → audio/ (ElevenLabs)
│  ├─ generate-voiceover.sh      narasi.txt → audio/ (Edge-TTS, gratis)
│  ├─ narasi.mjs                 parser bagian B narasi.txt (dipakai kedua skrip TTS)
│  ├─ render-frames.cjs          screenshot iklan di detik tertentu (verifikasi visual, butuh Playwright)
│  └─ export-video.mjs           iklan → MP4 (puppeteer backend + ffmpeg); tanpa full-voiceover.mp3, vo-NN.mp3 disusun per detik cue + efek dari window.__sfx (limiter)
└─ _shared/
   ├─ logo-klipers.png           logo ASLI (sumber base64)
   └─ hook-template.html         template animasi semua scene hook
```

## 1. Iklan yang ada

| Folder | Isi | Format |
|---|---|---|
| `quick-process-auto-upload` | UI web Quick Process → proses AI → auto upload 5 platform → Play Store | 16:9, ±37,5 dtk, ditulis tangan |
| `mobile-app-ai-generate` | Mockup HP UI klipers-mobile-app + Klipers AI gambar/video (Seedream 5.0 Pro, MiniMax H3) | 9:16, ±42,5 dtk, ditulis tangan, ⚠️ belum safe-zone |
| `hook-singkat-{portrait,landscape}` | Hook cepat 10 scene | ±39 dtk, **dihasilkan build-hooks** |
| `hook-panjang-{portrait,landscape}` | + Content Creator & Riset viral, 12 scene | ±58 dtk, **dihasilkan build-hooks** |
| `demo-ai-content-creator-landscape` | Demo step by step AI Content Creator (wizard 3 langkah → Generating → Review & Edit Scene → hasil + Viral Posting Kit). Label/pilihan disalin dari `AIContentCreator.tsx`; state diskret lewat `flag()`/`say()` (seek-safe), kursor per panel, kamera `cam()` | 16:9, ±87 dtk, ditulis tangan |
| `demo-ai-content-creator-portrait` | Demo yang sama di UI HP (klipers-mobile-app 390 px). **Pilihan owner: HP tampil UTUH** (y 300–1782, layar ×1,7231, tanpa zoom/geser kamera), judul di atas, caption di bawah HP, tema terang bawaan. Konten panjang digulir di dalam layar dan dikunci di ujung konten (`MAXS`). Jangan memotong HP dengan mask di bawah caption: pernah dikomplain "subtitle memotong UI". Efek suara lewat `sfx(t, name, vol)` → `window.__sfx`; `export-video.mjs` mencampurnya. Waktu animasi disesuaikan ke tempo suara aktif lewat `W()` | 9:16, ±87,5 dtk, ditulis tangan |
| `demo-ai-clipping-portrait` | Demo AI Clipping di UI HP: Quick Process, Analisis AI, Atur Manual. Engine & CSS disalin dari demo-ai-content-creator-portrait (HP utuh, tema terang, dialog Android, `W()`, `sfx()`). ⚠️ Nama class bentrok: `.apg` = grid popup Klipers AI di CSS engine; kartu progres analisis memakai `.anl`. Tab "Highlight Bola" tidak ditampilkan | 9:16, ±65 dtk, ditulis tangan |
| `demo-gaming-quickprocess-portrait` | Demo Quick Process Mode Gaming di UI HP (tema terang, HP utuh): hook stream 16:9 Windah Basudara → klip vertikal split, tempel link di Dashboard (Claude-style composer), QuickProcessOptions (Gaming, Posisi Facecam Atas/Kanan Bawah/Default 44%, Sumber Video, Prompt, Range slider, Subtitle preset), project diproses, Semua Clip (Spotlight animasi AI melacak facecam di pojok kanan bawah → cut & move to top → gameplay di bawah), ShortVideoCard (Gaming View toggle, kontrol kamera), Bottom Sheet Auto Upload 5 Platform (YouTube, TikTok, IG, FB, Threads) → Google Play | 9:16, ±45,5 dtk, ditulis tangan |

## 2. Iklan hook — WAJIB lewat generator

Folder `hook-*` **dihasilkan**. Jangan edit `index.html`/`narasi.txt` di sana — akan tertimpa.

```bash
node marketing/tools/build-hooks.mjs      # build ulang ke-4 folder hook
```

- **Kalimat / urutan scene** → array `SHORT` / `LONG` di `build-hooks.mjs`. Tiap entri `{ id, text, say? }`:
  - `text` = caption di layar (tulisan asli: "30 klip", "Seedream 5.0 Pro", "MiniMax H3").
  - `say` = ejaan untuk TTS ("tiga puluh", "Seedream lima titik nol Pro", "MiniMax H tiga", "klipers titik pro"). Isi hanya kalau beda dari `text`.
- **Durasi dihitung otomatis** oleh `withDur()` dari panjang kalimat: `CHARS_PER_SEC = 14` + jeda 1 dtk, minimum 3,5 dtk (singkat) / 4 dtk (panjang), CTA lebih lama. Owner pernah komplain "scene terlalu cepat" saat durasi di-hardcode → jangan kembali ke durasi manual. Terasa masih cepat → turunkan `CHARS_PER_SEC`.
  - Target: singkat = "30-an detik" (≤ ±40), panjang = di atasnya (±55–60). Kalau kebablasan, **persingkat kalimat**, jangan percepat scene.
- **Varian baru** (mis. hook 15 dtk, hook khusus AI) → tambah array scene + entri di `VARIANTS` (`slug`, `title`, `kind`, `format`, `scenes: withDur(ARR, min)`), build, lalu tambahkan baris di README.
- **Scene yang tersedia** (objek `SCN` di `hook-template.html`): `hook, clips, manual, split, tempel, creator, riset, image, video, upload, wall, cta`. `image → video → upload` harus berurutan (kartu yang sama berlanjut).
- **Menambah scene baru** di template:
  1. DOM di dalam `#vis` (800×900, diskalakan per format) + CSS.
  2. `gsap.set(..., {autoAlpha:0})` di awal `build()`.
  3. Fungsi `SCN.<id>(sc, T, d, k)`: pakai `T(x)` (waktu relatif ter-skala = `sc.t + x*k`), `d(v)` (durasi ter-skala, dibatasi 1,5×), keluar di `sc.e - 0.1`. `k = dur / BASE[id]` — daftarkan `BASE.<id>` (durasi desain asli).
  4. Judul besar: tambah `#tX` + masukkan ke map `TITLE`.
  5. Label di `SCENE_LABEL` (build-hooks) untuk narasi.txt.

## 3. Aturan desain (sudah disetujui owner — jangan dilanggar)

- **Bahasa Indonesia** untuk narasi, caption, dan semua teks UI.
- **Warna monokrom dark/light saja** (tokens CSS di `:root`, `?theme=light`). Aksen warna hanya untuk ikon platform/brand & thumbnail konten.
- **Logo Klipers ASLI, tidak transparan**, di lingkaran putih solid; tertanam base64 dari `_shared/logo-klipers.png` (kalau pakai path relatif, logo blank saat HTML dibuka sendirian).
- UI harus **mirip frontend asli** (komponen di `frontend/` / `klipers-mobile-app/`), bukan UI karangan.
- Penutup: **"Tersedia di Google Play" — nama app "Klipers - Ai Video Clipping"**, badge muncul cepat (jangan delay panjang).
- Fitur yang ditampilkan harus benar-benar ADA. Daftar resmi = FeatureGrid (21 fitur): Analisis AI, Atur Manual, Split Cam, Konten Tempel, Video Editor, Merge Video, Loop Video, AI Workflow, Content Creator, Buat Cerita, Klipers AI, Generate Prompt, Music Generator, Text To Speech, Analitik Viral, Saran Viral AI, Optimasi Judul, Transcript AI, WA Story HD, Auto Upload, Video Saya. ("Highlight Bola" TIDAK ada → jangan ditampilkan.)
- Model AI terbaru (dari `grok_media_pricing` / `backend/scripts/register-*.mjs`): gambar Seedream 5.0 Pro, Krea 2 Turbo, GPT Image 2, Nano Banana 2 Lite; video MiniMax H3, Gemini Omni Flash, Seedance 2, Wan 2.7. Cek ulang status `is_enabled` produksi sebelum tayang.
- Auto upload = **5 platform** (YouTube, TikTok, Facebook, Instagram, Google Drive — lihat iklan yang ada).
- **Portrait 9:16 wajib safe zone Reels/TikTok**: atas 270px, bawah 670px, kanan 120px. Teks & caption penting di dalamnya; cek dengan `?guides=1`. Caption portrait diletakkan di bawah judul, bukan di bawah layar.
- Setiap iklan punya versi **tanpa caption** (`tanpa-caption.html`, `?nocaps=1`).

## 4. Kontrak teknis setiap `index.html`

- Timeline GSAP **paused & seek-safe**: state awal pakai `gsap.set`, animasi pakai `tl.to/fromTo(..., immediateRender:false)`; posisi apa pun harus benar saat `tl.seek(t,false)`.
- Param URL: `?t=12`, `?theme=light`, `?nocaps=1`, `?voice=ardi`, `?guides=1` (hook), `?record=1` (tanpa kontrol; expose `window.__seek(t)`, `window.__duration`, `window.__ready = true`).
- Narasi: array `CUES` `{s, e, file:'audio/vo-NN.mp3', text, say}` — **satu cue per scene**; caption = potongan kata dari `text` dengan highlight kata aktif. Audio file per cue; kalau file tidak ada → fallback Web Speech browser (prioritas William Multilingual, lalu id-ID Ardi).
- `narasi.txt` bagian B wajib berformat `[vo-NN.mp3] ...` lalu satu baris kalimat — dibaca `tools/narasi.mjs`. Jendela Mulai–Selesai = cue di HTML.
- Stage diskalakan via CSS var `--k`; layout harus aman di layar HP.

## 5. Suara (TTS)

```bash
# ElevenLabs — voice default QC3gSHMyKh8m20lGyUNZ, model eleven_multilingual_v2, SPEED 1.05
ELEVENLABS_API_KEY=sk_xxx node marketing/tools/generate-voiceover-elevenlabs.mjs marketing/iklan/<slug>
#   ONLY=3 → hanya vo-03; SPEED=1.1 kalau kalimat melebihi jendelanya
# Edge-TTS gratis — VOICE default en-AU-WilliamMultilingualNeural, RATE +4%
bash marketing/tools/generate-voiceover.sh marketing/iklan/<slug>
```

- API key ElevenLabs **harus diawali `sk_`**. String hex panjang = key ID → error `api_key_id_used_as_api_key`.
- **JANGAN** simpan API key di file/commit/chat. Pakai env var atau secret environment.
- Container cloud memblokir `speech.platform.bing.com` & `api.elevenlabs.io` → generate suara di mesin user.
- Narasi hook sama untuk portrait & landscape dengan panjang yang sama → generate sekali, salin `audio/`.

## 6. Verifikasi sebelum menyerahkan (WAJIB)

```bash
node marketing/tools/build-hooks.mjs                       # kalau menyentuh hook
node marketing/tools/render-frames.cjs marketing/iklan/<slug> 1 3.5 12 20     # screenshot ke <slug>/_frames/
GUIDES=1 node marketing/tools/render-frames.cjs marketing/iklan/hook-singkat-portrait 3 10
# di container (cdnjs diblokir): GSAP_LOCAL=/path/gsap.min.js  (npm pack gsap@3.12.5 → package/dist/gsap.min.js)
```

Buka PNG-nya dan cek: tidak ada `ERROR halaman`, elemen tidak kosong/terpotong, teks portrait di dalam safe zone, tiap scene cukup lama untuk kalimatnya, logo tampil. Cek minimal satu frame per scene yang diubah, di portrait DAN landscape.

## 7. Setelah selesai

1. Update tabel **Daftar iklan** + panduan sosmed di `marketing/README.md` bila ada iklan/format baru.
2. Entri newest-first di `.multibrain/indexes/ui.md`.
3. Commit + `env -u GITHUB_TOKEN git push`. Beri tahu user cara ambil tanpa checkout branch (menghindari konflik file lokal seperti `klipers-mobile-app/ota-version.json`):
   ```bash
   git fetch origin <branch>
   git restore --source=origin/<branch> --worktree -- marketing
   ```

## 8. Jebakan yang pernah terjadi

| Gejala | Penyebab / solusi |
|---|---|
| Logo blank | path relatif → tanam base64 |
| Foto/gambar hitam atau kosong di panel preview (MP4 tetap benar) | sama: path relatif `assets/…` tidak termuat saat HTML dibuka sendirian → tanam base64 (simpan sumbernya di `assets/`) |
| "Cannot access 'SC' before initialization" | hitung `D` setelah `SC`/`CUES` terbentuk |
| Scene berganti sebelum narasi selesai | durasi hardcode → pakai `withDur()` |
| Kartu hook kosong (cuma gradient) | isi `.seg .mini` (wajah + subtitle + skor) |
| Caption portrait tertutup UI TikTok | caption di bawah judul (`top:548px`), `#vis` top 655 |
| Satu cue narasi melintasi beberapa scene → tidak sinkron | satu cue per scene |
| Kartu flex melar | `align-items:flex-start` |
| Nav bawah HP tersangkut highlight | animasikan overlay `.onbg`, bukan class |
