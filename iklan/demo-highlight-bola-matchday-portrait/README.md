# Highlight Bola — Matchday

## Hasil final

Durasi final **31,1 detik**, mengikuti audio ElevenLabs Zan dari user. Hook terbaru: “Mau bikin konten bola, tapi capek potong videonya satu-satu? Biar Klipers bantu.” Lingkaran dekorasi dihapus dan composer disesuaikan kode Klipers. MP4 lokal: `demo-highlight-bola-matchday-portrait.mp4` (1080×1920, 30 fps, H.264 + AAC, 7,84 MiB). Audio master: `audio/full-voiceover.mp3`. MP4/MP3 tidak masuk Git sesuai aturan repo; salin audio master ke lokasi tersebut saat memakai checkout baru. Rincian konsep awal di bawah merupakan rencana sebelum retiming audio.

Konsep disetujui: footage pertandingan membuka demo, hook “Momen golnya seru. Ngeditnya yang makan waktu.” Tema editorial terang, 1080×1920, 45 detik. Subtitle 3–5 kata dengan kata aktif putih pada kotak hitam, tanpa bounce. UI mengacu `frontend/components/video/SportsHighlightForm.tsx`.

## Rencana / rundown

1. 0–7: footage asli, hook masalah editing; bidang video menjadi objek penghubung.
2. 7–15: bidang video mengecil menjadi preview di composer Highlight Bola, URL sumber diketik.
3. 15–23: pengaturan Storytelling AI, narator Andrew, Latar Blur dan Skor Klipers; klik Buat Highlight.
4. 23–30: progress unduh, analisis, potong, render. Waktu dipercepat untuk demo.
5. 30–39: hasil contoh vertikal dengan footage asli, ringkasan pertandingan dan unduh MP4.
6. 39–45: hasil bergeser, logo asli dan Google Play muncul.

Palet monokrom Klipers: tinta #171717, kertas #faf9f6, garis #deddd8. Warna hanya pada footage dan logo. Display Barlow Condensed; UI Inter. Gerak: perubahan ukuran wadah video, geser panel UI, bidang lingkaran lapangan bergerak pelan. Satu bidang video bertahan sepanjang alur. Safe zone penting x=72–960, y=270–1250.

## Buka

Klik dua kali `index.html`. Internet hanya untuk GSAP dan font. Footage ada di `assets/match.webm`; pertahankan folder tersebut saat memindahkan HTML. Logo ditanam oleh builder.

- Space: play/pause. R: ulang. C: caption on/off.
- `?debug=1`: kontrol scrub.
- `?t=32`: tinjau hasil.
- `?record=1`: tahan timeline untuk export.
- `?guides=1`: safe zone.
- `?nocaps=1`: sembunyikan caption narasi iklan.
- `?voice=ardi`: voice browser Indonesia.

`template.html` sumber, `index.html` hasil `node marketing/tools/build-demo-highlight-bola-matchday.mjs`. UI dan hasil adalah simulasi alur produk, bukan rekaman job backend. Footage pertandingan asli. File suara belum dihasilkan; suara browser opsional melalui tombol Suara di debug. Naskah tersedia di `narasi.txt`.

## Footage / atribusi

**beIN SPORTS Türkiye**, “Kaldırım scored the goal for a 3-3 draw (Beşiktaş-Fenerbahçe Derby - February 2019)”. Sumber Wikimedia Commons, tercatat CC BY 3.0 pada metadata saat diambil 2026-10-07.

- Halaman: https://commons.wikimedia.org/w/index.php?curid=119745134
- Sumber asli: https://www.youtube.com/watch?v=sYfsd9Hv7hc
- Lisensi: https://creativecommons.org/licenses/by/3.0/
- Perubahan: diputar tanpa audio, dipilih rentang waktunya, disajikan dalam layout demo dengan teks tambahan. Identitas siaran tidak dihapus.
- Atribusi juga tampil di HTML dan harus disertakan dalam deskripsi saat publikasi video.

## Verifikasi

`node marketing/tools/render-frames.cjs marketing/iklan/demo-highlight-bola-matchday-portrait 2 6 11 18 26 34 42`

Cek gambar tiap fase, video termuat, seek maju/mundur, viewport HP, tanpa caption dan safe zone. Export MP4 belum termasuk tahap HTML ini.
