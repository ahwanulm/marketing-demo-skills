# 🎬 Marketing Demo Skills — Cinematic HTML+GSAP Video Ads Toolkit

<p align="center">
  <a href="https://github.com/ahwanulm/marketing-demo-skills/stargazers"><img src="https://img.shields.io/github/stars/ahwanulm/marketing-demo-skills?style=for-the-badge&logo=github&color=gold" alt="GitHub Stars"></a>
  <a href="https://github.com/ahwanulm/marketing-demo-skills/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License: MIT"></a>
  <img src="https://img.shields.io/badge/GSAP-3.12.5-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP 3">
  <img src="https://img.shields.io/badge/Agent_Skills-Claude_%7C_Antigravity_%7C_Codex-purple?style=for-the-badge" alt="Agent Skills">
  <img src="https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node 18+">
</p>

<p align="center">
  <b>Programmatic motion graphic video creation engine built with HTML, CSS, and GSAP.</b><br>
  Dirancang untuk AI Agent dan kreator video guna menghasilkan iklan video 16:9 & 9:16 (TikTok/Reels/Shorts) berkualitas sinematik langsung lewat kode — <b>tanpa Adobe After Effects atau Premiere Pro</b>.
</p>

---

## 🌟 Mengapa Toolkit Ini Berbeda?

Sebagian besar AI generator hanya memberikan teks naskah atau video AI generatif yang mahal dan sulit diedit. **Marketing Demo Skills** mengambil pendekatan rekayasa visual (*creative coding*):

1. **100% Standalone HTML** — Setiap iklan adalah satu file HTML mandiri dengan GSAP 3.12.5, Google Fonts, dan aset Base64. Dapat diputar langsung di browser tanpa build step.
2. **Deterministic & Seek-Safe Engine** — Animasi dirancang dengan timeline diskret (`tl.seek(t, false)`). Tidak ada glitch atau desync saat di-scrubbing.
3. **Sinkronisasi Voiceover Otomatis** — Naskah dibagi per kalimat (`[vo-NN.mp3]`) dengan timestamp terkalibrasi. Mendukung ElevenLabs (audio studio) dan Edge-TTS (100% gratis).
4. **Proteksi Safe-Zone Medsos (9:16)** — UI dan teks penting otomatis dijaga agar tidak tertutup header, tombol like, username, atau caption TikTok & Instagram Reels.
5. **Headless MP4 Rendering** — Skrip otomatis via Puppeteer / Playwright + FFmpeg untuk mengekspor animasi web menjadi video MP4 60 FPS berkualitas tinggi.
6. **Agent Skill Ready** — Dilengkapi file `SKILL.md` berstandar industri agar Claude Code, Antigravity, OpenCode, atau Codex dapat merancang iklan secara mandiri.

---

## 🗂️ Struktur Proyek

```
marketing-demo-skills/
├── SKILL.md              # 🧠 Otak & panduan aturan lengkap untuk AI agent
├── README.md             # Dokumentasi utama proyek
├── package.json          # Script otomatis & dependensi headless browser
├── _shared/
│   ├── hook-template.html# Engine animasi serbaguna untuk iklan hook
│   ├── logo-klipers.png  # Aset logo master (tertanam base64 di HTML)
│   └── story-studio/     # Modul UI engine untuk demo Story Studio
├── tools/
│   ├── build-hooks.mjs   # Generator otomatis 4 varian iklan hook
│   ├── generate-voiceover-elevenlabs.mjs # TTS ElevenLabs API (sk_*)
│   ├── generate-voiceover.sh             # TTS Microsoft Edge (gratis)
│   ├── narasi.mjs        # Parser naskah narasi.txt per detik
│   ├── render-frames.cjs # Screenshot frame detik tertentu (Playwright/Puppeteer)
│   └── export-video.mjs  # Render animasi HTML ke MP4 + FFmpeg muxing
└── iklan/                # Katalog modul iklan (1 folder = 1 video)
    ├── quick-process-auto-upload/
    ├── mobile-app-ai-generate/
    ├── hook-singkat-portrait/
    ├── hook-singkat-landscape/
    ├── hook-panjang-portrait/
    ├── hook-panjang-landscape/
    ├── demo-ai-content-creator-landscape/
    ├── demo-ai-content-creator-portrait/
    ├── demo-ai-clipping-portrait/
    ├── demo-gaming-quickprocess-portrait/
    ├── demo-highlight-bola-portrait/
    ├── demo-highlight-bola-matchday-portrait/
    ├── demo-story-studio-landscape/
    └── demo-story-studio-portrait/
```

---

## 🎬 Katalog Model Iklan

| Folder Iklan | Rasio | Durasi | Highlight Animasi |
|---|---|---|---|
| `iklan/hook-singkat-portrait` | **9:16** | ±39s | Hook cepat: 1 video panjang → 30 klip + subtitle kinetik + face tracking + 21 fitur. |
| `iklan/hook-singkat-landscape` | **16:9** | ±39s | Versi 16:9 desktop dengan layout grid responsif. |
| `iklan/hook-panjang-portrait` | **9:16** | ±58s | Hook lengkap: + modul Content Creator AI (topik ke video) & riset viral. |
| `iklan/demo-gaming-quickprocess-portrait` | **9:16** | ±45,5s | Mockup gameplay streaming Windah Basudara + auto facecam split vertikal. |
| `iklan/demo-ai-content-creator-portrait` | **9:16** | ±87,5s | Demo UI HP Android utuh, 52 efek suara (SFX), dan alur 3 langkah AI wizard. |
| `iklan/demo-highlight-bola-portrait` | **9:16** | ±44s | Deteksi audio gemuruh stadion, sensor logo TV, Smart VAR, dan papan skor siaran. |
| `iklan/demo-story-studio-landscape` | **16:9** | ±63s | 1 kalimat ide cerita diubah menjadi video cat air animasi dengan Ken Burns motion. |
| `iklan/quick-process-auto-upload` | **16:9** | ±37,5s | Web Dashboard: Tempel Link → Proses AI → Jadwal Auto Upload ke 5 Platform. |

---

## 🚀 Panduan Memulai (Quick Start)

### 1. Clone Repository & Install Dependensi

```bash
git clone https://github.com/ahwanulm/marketing-demo-skills.git
cd marketing-demo-skills
npm install
```

### 2. Putar Iklan Langsung di Browser

Buka salah satu file `index.html` langsung di browser Anda (Google Chrome, Microsoft Edge, atau Firefox):

```bash
# macOS
open iklan/hook-singkat-portrait/index.html

# Linux
xdg-open iklan/hook-singkat-portrait/index.html

# Windows
start iklan/hook-singkat-portrait/index.html
```

> **Tips Interaktif:** Klik tombol **▶ Play** di layar. Gunakan parameter URL:
> - `?theme=light` untuk mode terang.
> - `?nocaps=1` untuk mematikan teks subtitle/caption.
> - `?guides=1` untuk memunculkan garis safe zone TikTok/Reels.
> - `?t=15` untuk langsung melompat ke detik 15.

---

## 🎙️ Menghasilkan Suara (Voice-Over TTS)

Tiap folder iklan memiliki file `narasi.txt` yang berisi naskah utuh dan pemotongan per cue detik.

### Opsi A — Edge-TTS (100% Gratis & Cepat)
Pastikan Python & edge-tts terpasang (`pip install edge-tts`), lalu jalankan:

```bash
npm run voiceover:edge iklan/hook-singkat-portrait
```

### Opsi B — ElevenLabs (Kualitas Studio)
```bash
ELEVENLABS_API_KEY=sk_your_api_key npm run voiceover:elevenlabs iklan/hook-singkat-portrait
# Opsi render cue tertentu saja:
ONLY=3 ELEVENLABS_API_KEY=sk_xxx npm run voiceover:elevenlabs iklan/hook-singkat-portrait
```

---

## 📸 Verifikasi Visual (Screenshot Frame)

Sebelum merender video panjang, tangkap beberapa frame kunci untuk memeriksa safe zone dan tata letak teks:

```bash
# Tangkap frame di detik 1, 3.5, 12, dan 20
npm run render:frames iklan/hook-singkat-portrait 1 3.5 12 20

# Tampilkan garis bantu safe-zone
GUIDES=1 npm run render:frames iklan/hook-singkat-portrait 3 10
```
Hasil PNG tersimpan di folder `<nama-iklan>/_frames/`.

---

## 📹 Ekspor ke File Video MP4

Render animasi web menjadi file video MP4 60 FPS (membutuhkan FFmpeg di sistem):

```bash
npm run export:video iklan/hook-singkat-portrait
```

Skrip ini akan:
1. Membuka headless browser pada resolusi target (1080×1920 atau 1920×1080).
2. Men-scrubbing timeline frame per frame tanpa frame drop.
3. Menggabungkan audio voice-over dan sound effects (SFX) dari `window.__sfx`.
4. Menghasilkan file MP4 siap tayang di medsos.

---

## 🤖 Memasang Sebagai Agent Skill (Claude / Antigravity / Codex)

Skill ini dapat langsung diintegrasikan ke AI agent coding favorit Anda:

### Untuk Claude Code
```bash
mkdir -p ~/.claude/skills/marketing-ads
cp SKILL.md ~/.claude/skills/marketing-ads/
```

### Untuk Antigravity / Gemini CLI
```bash
mkdir -p ~/.gemini/antigravity/skills/marketing-ads
cp SKILL.md ~/.gemini/antigravity/skills/marketing-ads/
```

### Untuk Codex / Shared Agent Skills
```bash
mkdir -p ~/.agents/skills/marketing-ads
cp SKILL.md ~/.agents/skills/marketing-ads/
```

---

## 📐 Aturan Safe Zone (9:16 Vertikal)

Ketika membuat varian iklan vertikal, perhatikan batas aman agar elemen tidak tertutup antarmuka medsos:
- **Atas:** `270px` (area pencarian dan header).
- **Bawah:** `670px` (area username, caption, tombol like, komentar, dan bookmark).
- **Kanan:** `120px` (kolom tombol aksi samping).

---

## ⭐️ Dukung Proyek Ini

Jika toolkit ini membantu Anda atau tim Anda menghemat waktu produksi video promosi, mohon berikan **Star (⭐️)** di GitHub!

[![Star on GitHub](https://img.shields.io/badge/Star%20on%20GitHub-⭐%20Leave%20a%20Star-yellow?style=for-the-badge&logo=github)](https://github.com/ahwanulm/marketing-demo-skills)

---

## 📄 Lisensi

Didistribusikan di bawah Lisensi **MIT**. Silakan gunakan secara bebas untuk keperluan personal maupun komersial.
