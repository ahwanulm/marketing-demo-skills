#!/usr/bin/env bash
# Generate narasi sebuah iklan dengan Edge-TTS (gratis).
# Kalimat dibaca dari <folder-iklan>/narasi.txt, hasil ke <folder-iklan>/audio/vo-NN.mp3.
#
#   pip install edge-tts
#   bash marketing/tools/generate-voiceover.sh marketing/iklan/<nama-iklan>
#
# `en-AU-WilliamNeural` hanya bisa bahasa Inggris, jadi default-nya varian multilingual
# yang bisa membaca teks Indonesia. Alternatif: VOICE=id-ID-ArdiNeural
set -euo pipefail
TOOLS="$(cd "$(dirname "$0")" && pwd)"
AD="${1:-}"
if [[ -z "$AD" || ! -f "$AD/narasi.txt" ]]; then
  echo "Pakai: bash generate-voiceover.sh <folder-iklan>   (folder berisi narasi.txt)" >&2
  echo "Iklan yang tersedia:" >&2
  for d in "$TOOLS/../iklan"/*/; do [[ -f "$d/narasi.txt" ]] && echo "  marketing/iklan/$(basename "$d")" >&2; done
  exit 1
fi

VOICE="${VOICE:-en-AU-WilliamMultilingualNeural}"
RATE="${RATE:-+4%}"
mkdir -p "$AD/audio"

while IFS=$'\t' read -r file text; do
  echo "→ $file"
  edge-tts --voice "$VOICE" --rate="$RATE" --text "$text" --write-media "$AD/audio/$file"
done < <(node "$TOOLS/narasi.mjs" "$AD")

# Durasi tiap kalimat, untuk dicocokkan dengan jendela waktu di narasi.txt
if command -v ffprobe >/dev/null; then
  for f in "$AD"/audio/vo-*.mp3; do
    printf "%s  %.2fs\n" "$f" "$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")"
  done
fi
