# Marketing — Iklan Klipers Pro

> Panduan lengkap untuk agent AI: skill `.claude/skills/marketing-ads/SKILL.md`.

Satu folder = satu model iklan. Setiap folder berisi video (HTML animasi) dan narasinya.

```
marketing/
├─ iklan/
│  ├─ quick-process-auto-upload/     ← iklan web (16:9)
│  ├─ mobile-app-ai-generate/        ← iklan mobile (9:16)
│  ├─ hook-singkat-portrait/         ← hook ±39 dtk, 9:16
│  ├─ hook-singkat-landscape/        ← hook ±39 dtk, 16:9
│  ├─ hook-panjang-portrait/         ← hook ±58 dtk, 9:16
│  ├─ hook-panjang-landscape/        ← hook ±58 dtk, 16:9
│  ├─ demo-ai-content-creator-landscape/  ← demo step by step AI Content Creator ±87 dtk, 16:9
│  ├─ demo-ai-content-creator-portrait/   ← demo yang sama di UI HP Android ±87,5 dtk, 9:16
│  └─ demo-ai-clipping-portrait/          ← demo AI Clipping (Quick Process, Analisis AI, Atur Manual) ±65 dtk, 9:16
│     ├─ index.html                  video iklan (buka di browser, klik ▶)
│     ├─ tanpa-caption.html          versi yang sama tanpa caption
│     ├─ narasi.txt                  naskah voice-over + detik tiap kalimat
│     ├─ caption.md                  caption posting per platform: hook baris pertama, teks iklan, hashtag
│     └─ audio/                      vo-01.mp3 … (hasil generate, belum di-commit)
├─ tools/
│  ├─ generate-voiceover-elevenlabs.mjs   narasi.txt → audio/ via ElevenLabs
│  ├─ generate-voiceover.sh               narasi.txt → audio/ via Edge-TTS (gratis)
│  ├─ build-hooks.mjs                     bangun ke-4 folder hook-* dari template
│  ├─ render-frames.cjs                   screenshot iklan di detik tertentu (cek visual)
│  ├─ export-video.mjs                    render iklan jadi MP4; vo-NN.mp3 otomatis ditaruh di detik cue-nya
│  └─ narasi.mjs                          parser narasi.txt (dipakai kedua skrip)
└─ _shared/
   ├─ logo-klipers.png               logo asli (juga sudah tertanam di tiap index.html)
   └─ hook-template.html             template animasi semua scene hook
```

## Daftar iklan

| Folder | Isi | Durasi |
|---|---|---|
| `iklan/demo-highlight-bola-matchday-portrait` | **Matchday — versi baru, editorial light**: footage asli gol Beşiktaş–Fenerbahçe → hook “Momen golnya seru. Ngeditnya yang makan waktu.” → composer Highlight Bola → Storytelling AI, narator, Skor Klipers → progress → contoh hasil 9:16 → Google Play. Subtitle kata aktif putih dalam blok hitam, tanpa bounce. Footage lokal CC BY 3.0 + atribusi; HTML preview, narasi belum digenerate. | 45 dtk, 1080×1920 |
| `iklan/quick-process-auto-upload` | Tempel link → opsi Quick Process → proses AI → upload otomatis 5 platform → penutup + Play Store | ±37,5 dtk, 1920×1080 |
| `iklan/mobile-app-ai-generate` | UI klipers-mobile-app: tempel link → Quick Process → klip; Klipers AI → AI Image (Seedream 5.0 Pro) → AI Video dari gambar (MiniMax H3) → penutup Google Play | ±42,5 dtk, 1080×1920 (vertikal) |
| `iklan/hook-singkat-portrait` | HOOK cepat: video panjang → 30 klip + subtitle & face tracking → Atur Manual → Split Cam → Konten Tempel → gambar AI → video AI → upload 5 platform → dinding 21 fitur → Google Play | ±39 dtk, 1080×1920 |
| `iklan/hook-singkat-landscape` | Sama dengan di atas, versi 16:9 | ±39 dtk, 1920×1080 |
| `iklan/hook-panjang-portrait` | Versi singkat + **Content Creator** (topik → naskah → video) + **Riset viral** (analitik + optimasi judul), narasi lebih lengkap | ±58 dtk, 1080×1920 |
| `iklan/hook-panjang-landscape` | Sama dengan di atas, versi 16:9 | ±58 dtk, 1920×1080 |
| `iklan/demo-ai-content-creator-landscape` | **Demo step by step AI Content Creator**: sidebar → Langkah 1 (kategori, gaya, fokus cerita, chip topik, tab Topik/YouTube/Artikel-PDF) → Langkah 2 (auto-detect genre/sudut pandang/era/ending + Story Arc) → Langkah 3 (rasio, durasi + Saran AI, transisi, Title Overlay/Subtitle/SFX, overlay, musik, 7 bahasa, suara, visual, Review) → Visual AI Video Full → storyboard → Review & Edit Scene → klip video AI → hasil (Download, Storyboard, Cover, jadwal upload 5 platform, Viral Posting Kit) → Google Play | ±87 dtk, 1920×1080 |
| `iklan/demo-ai-content-creator-portrait` | Demo yang sama di **UI klipers-mobile-app** (HP Android 390 px, tampil utuh): dashboard → tile Content Creator, `<select>` tampil sebagai dialog Android, jadwal upload = bottom sheet. **Tema terang bawaan** (`?theme=dark` untuk gelap), narasi ElevenLabs (Janu - Calm Narrator) + 52 efek suara ElevenLabs (`audio/sfx-*.mp3`, jadwal di `window.__sfx`) | ±87,5 dtk, 1080×1920 |
| `iklan/demo-ai-clipping-portrait` | **Demo AI Clipping di UI HP** (tema terang, HP utuh): hook 1 video panjang → puluhan klip, lalu Cara 1 Quick Process (dashboard → QuickProcessOptions → project diproses → daftar klip + face tracking), Cara 2 Analisis AI (composer + preview, Menganalisis Video, Momen Viral Ditemukan, ShortVideoCard → Proses Video → Unduh hasil), Cara 3 Atur Manual (Load Video, Start/End, rasio, Auto Subtitle → Download) → Google Play. Narasi Edge-TTS + efek suara ElevenLabs | ±65 dtk, 1080×1920 |
| `iklan/demo-gaming-quickprocess-portrait` | **Demo Quick Process Mode Gaming di UI HP** (tema terang, HP utuh): hook stream gameplay 16:9 Windah Basudara → klip vertikal split, tempel link di Dashboard (Claude-style composer), QuickProcessOptions (Jenis Gaming, Posisi Facecam Atas/Kanan Bawah/Default 44%, Sumber Video, Prompt, Range slider, Subtitle preset), project diproses, Semua Clip (Spotlight animasi AI melacak facecam di pojok kanan bawah → cut & move to top → gameplay di bawah), ShortVideoCard (Gaming View toggle, kontrol kamera), Bottom Sheet Auto Upload 5 Platform (YouTube, TikTok, IG, FB, Threads) → Google Play | ±45,5 dtk, 1080×1920 |
| `iklan/demo-story-studio-landscape` | **Demo Story Studio** (tema terang, browser klipers.pro). Hook BERBEDA: video cerita jadi (Legenda Danau Toba, gaya cat air) diputar dulu dengan subtitle karaoke, lalu dibekukan → "Video ini dibuat dari 1 kalimat." Lalu daftar proyek (4 langkah) → Ide (sinopsis, gaya visual, durasi, 16:9, Tulis naskah gratis) → Naskah (5 adegan, edit narasi, Susun visual) → Storyboard (Buat semua gambar, lembar karakter + acuan wajah, Rekam narasi, efek suara otomatis, gerak Ken Burns) → Editor (preset subtitle, Musik otomatis, Ekspor MP4) → Paket unggah (cover + caption) → Pengaturan Jadwal auto upload 5 platform (YouTube, TikTok, Facebook, Instagram, Threads) → Google Play. **Dihasilkan** `tools/build-demo-story-studio.mjs` dari `template.html` + `_shared/story-studio/`; narasi ElevenLabs (vo-01 Kak Ceria = suara cerita, vo-02..11 Zephlyn; cadangan Edge di audio/edge-sementara/) | ±63 dtk, 1920×1080 |
| `iklan/demo-story-studio-portrait` | Demo yang sama di **UI klipers-mobile-app** (HP utuh, judul bab di atas, caption di bawah HP), proyek 9:16. Modul UI & alur sama dengan versi landscape (layout HP = tanpa breakpoint sm:/lg:) | ±63 dtk, 1080×1920 |
| `iklan/demo-highlight-bola-portrait` | **Demo Fitur Highlight Bola di UI HP** (tema terang, HP utuh): hook awal buka Klipers langsung di HP (tap icon Klipers → masuk Dashboard → pilih menu Highlight Bola), UI presisi `SportsHighlightForm` (Claude-Style Composer, YouTube Preview Card di dalam input, Storytelling AI komentator, Papan Skor UEFA broadcast, sensor logo TV, subtitle kinetik Klipers Motion), progress deteksi audio gemuruh stadion & Smart VAR (validasi gol sah), hasil Master Reel 9:16 + filter momen + bottom sheet auto upload 5 platform → Google Play | ±44 dtk, 1080×1920 |



Folder `hook-*` **dihasilkan** oleh `node marketing/tools/build-hooks.mjs` dari `_shared/hook-template.html`. Durasi tiap scene dihitung otomatis dari panjang kalimat narasi (±14 huruf/detik + jeda), jadi scene tidak berganti sebelum narasinya selesai. Ubah kalimat atau urutan scene di `build-hooks.mjs`, lalu jalankan ulang; jangan edit `index.html`-nya langsung. Narasi singkat sama untuk portrait & landscape (begitu juga versi panjang), jadi folder `audio/` bisa disalin antar keduanya.

## Membuat suara

Dari root repo:

```bash
# ElevenLabs (voice default QC3gSHMyKh8m20lGyUNZ; API key harus diawali sk_)
ELEVENLABS_API_KEY=sk_xxx node marketing/tools/generate-voiceover-elevenlabs.mjs marketing/iklan/quick-process-auto-upload

# atau Edge-TTS (pip install edge-tts)
bash marketing/tools/generate-voiceover.sh marketing/iklan/quick-process-auto-upload
```

Kalau file audio belum ada, `index.html` memakai suara bawaan browser (terbaik di Microsoft Edge).

## Membuat versi iklan baru

1. Salin folder iklan yang paling mirip:
   ```bash
   cp -r marketing/iklan/quick-process-auto-upload marketing/iklan/<nama-iklan-baru>
   rm -rf marketing/iklan/<nama-iklan-baru>/audio
   ```
   Nama folder: huruf kecil, pisahkan dengan `-`, mis. `ai-content-creator`, `split-cam-gaming`, `promo-lebaran`.
2. Tulis naskah di `narasi.txt`. Skrip generator membaca bagian B: baris `[vo-NN.mp3] …` lalu baris kalimatnya.
   Untuk variasi hook, cukup tambahkan entri di `VARIANTS` pada `tools/build-hooks.mjs`.
3. Di `index.html`, samakan array `CUES` (teks caption + detik mulai/selesai) dengan `narasi.txt`, lalu ubah scene/animasinya.
4. Generate suara dengan salah satu perintah di atas, memakai folder iklan baru.
5. Tambahkan barisnya ke tabel **Daftar iklan** di atas.

## Cek visual

```bash
node marketing/tools/render-frames.cjs marketing/iklan/hook-singkat-portrait 1 3.5 12 20
GUIDES=1 node marketing/tools/render-frames.cjs marketing/iklan/hook-singkat-portrait 3   # dengan garis safe zone
```
Hasil PNG ada di `<folder-iklan>/_frames/` (tidak di-commit).

## Parameter URL `index.html`

| Parameter | Fungsi |
|---|---|
| `?t=12` | mulai dari detik 12 |
| `?theme=light` | tema terang (default gelap) |
| `?nocaps=1` | tanpa caption (atau tombol CC / tekan C) |
| `?voice=ardi` | pilih voice browser tertentu (saat audio belum ada) |
| `?guides=1` | (hook-*) tampilkan garis safe zone Reels/TikTok |
| `?record=1` | mode rekam: tanpa kontrol, expose `window.__seek(t)` untuk render frame |

## Panduan iklan sosmed

| Platform / penempatan | Format dari folder ini | Rasio | Durasi ideal | Catatan |
|---|---|---|---|---|
| TikTok (In-Feed / Spark Ads) | `hook-singkat-portrait`, `mobile-app-ai-generate` | 9:16 | 20–35 dtk | Jalankan versi hook dulu; teks & caption dijaga di safe zone (`?guides=1`) |
| Instagram & Facebook Reels / Stories | `hook-singkat-portrait` (Reels), potongan 15 dtk pertama (Stories) | 9:16 | ≤15 dtk (Stories), 15–30 dtk (Reels) | Stories: tambahkan stiker link ke Play Store |
| Instagram / Facebook Feed | render portrait lalu crop tengah **4:5 (1080×1350)** | 4:5 | 15–30 dtk | 4:5 memakan layar feed paling besar |
| YouTube Shorts | `hook-singkat-portrait`, `hook-panjang-portrait`, `demo-ai-content-creator-portrait`, `demo-story-studio-portrait` (organik) | 9:16 | ≤60 dtk | Judul Shorts = hook ("1 video panjang jadi 30 klip viral") |
| YouTube in-stream (skippable) | `hook-singkat-landscape`, `hook-panjang-landscape`, `quick-process-auto-upload`, `demo-ai-content-creator-landscape`, `demo-story-studio-landscape` | 16:9 | 30–60 dtk | 5 dtk pertama harus sudah menjelaskan manfaat — sudah sesuai struktur hook |
| Google App Campaigns (install Play Store) | semua video (portrait + landscape, singkat + panjang) + logo + 4–5 kalimat teks | 9:16, 16:9, 1:1 | 10–60 dtk | Google merakit iklan otomatis dari aset; upload keduanya |
| X / LinkedIn feed | `hook-singkat-landscape` | 16:9 | ≤30 dtk | LinkedIn cocok untuk sudut pandang agensi/UMKM |

**Caption posting:** tiap folder iklan punya `caption.md` berisi 3–5 hook baris pertama untuk A/B test, caption siap tempel (TikTok, Reels, Shorts, X, LinkedIn), teks iklan berbayar sesuai batas karakter (Meta, TikTok Ads, YouTube, Google App Campaigns), dan hashtag. `caption.md` ditulis tangan; `build-hooks.mjs` tidak menimpanya.

**Prinsip yang sudah diterapkan di video:**
- **Hook di 2 detik pertama.** Pesan "1 video panjang → 30 klip viral" muncul langsung, tanpa intro logo.
- **Caption selalu menyala.** Sebagian besar iklan sosmed ditonton tanpa suara, jadi kirim versi dengan caption. Versi `tanpa-caption.html` dipakai kalau platform menambahkan caption otomatis.
- **Satu CTA yang jelas** di akhir: Google Play, dengan klipers.pro sebagai alternatif.

**Saran variasi untuk A/B test** (buat folder baru di `iklan/` untuk tiap variasi):
1. **Hook masalah:** "Capek ngedit 2 jam cuma buat 1 video?", lalu tunjukkan solusinya.
2. **Hook hasil/angka:** "30 klip dari 1 podcast dalam 5 menit."
3. **Hook fitur AI:** buka langsung dengan gambar AI jadi video. Cocok untuk audiens kreator AI.
4. **Before–after:** video landscape asli di kiri, klip vertikal bersubtitle di kanan.
5. **UGC / talking head:** rekam wajah kreator asli (HP, tanpa naskah kaku), tempel potongan UI dari iklan ini sebagai B-roll. Biasanya CTR-nya paling tinggi untuk app install.
6. **Carousel statis** (IG/FB): 5 slide = 5 fitur, slide terakhir CTA Play Store. Screenshot frame dengan `?record=1&t=…`.

**Cara menguji:** jalankan 3–5 variasi hook sekaligus dengan budget kecil selama 3–5 hari. Pertahankan variasi dengan CTR dan biaya per install terbaik. Ganti kreatif setiap 2–3 minggu supaya penonton tidak bosan.
