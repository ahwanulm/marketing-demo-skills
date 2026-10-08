/* ================= DOM UI STORY STUDIO =================
   buildStudio(root, { mode: 'd'|'m', aspect: '16:9'|'9:16', logo }) mengisi root (.app) dengan
   layar: daftar proyek (#sList) dan ruang kerja (#sWork: header + #st1..#st4).
   Label & urutan disalin dari ProjectList/ProjectWorkspace/IdeaStep/ScriptStep/StoryboardStep/
   EditorStep/PublishPanel.tsx. */
const _P = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const IC = {
  bulb: _P('<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5M9 18h6M10 22h4"/>'),
  scroll: _P('<path d="M15 12h-5M15 8h-5M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/>'),
  gallery: _P('<path d="M2 7v10M6 5v14"/><rect width="12" height="18" x="10" y="3" rx="2"/>'),
  clapper: _P('<path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"/><path d="m6.2 5.3 3.1 3.9M12.4 3.4l3.1 4M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>'),
  check: _P('<path d="M20 6 9 17l-5-5"/>'),
  back: _P('<path d="m12 19-7-7 7-7M19 12H5"/>'),
  filepen: _P('<path d="M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v9.5"/><path d="M14 2v4a2 2 0 0 0 2 2h4M13.4 12.6a2 2 0 1 1 3 3L11 21l-4 1 1-4Z"/>'),
  palette: _P('<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2a10 10 0 0 0 0 20c.9 0 1.7-.8 1.7-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1a1.6 1.6 0 0 1 1.6-1.7h2A5.6 5.6 0 0 0 22 11.1C22 6.1 17.5 2 12 2Z"/>'),
  clock: _P('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
  vert: _P('<rect width="12" height="20" x="6" y="2" rx="2"/>'),
  hori: _P('<rect width="20" height="12" x="2" y="6" rx="2"/>'),
  lang: _P('<path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"/>'),
  theater: _P('<path d="M2 10s3-3 3-8M22 10s-3-3-3-8M10 2c0 4.4-3.6 8-8 8M14 2c0 4.4 3.6 8 8 8M2 10s2 2 2 5M22 10s-2 2-2 5M8 15h8M2 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1M14 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1"/>'),
  book: _P('<path d="M12 7v14M16 12h2M16 8h2M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3zM6 12h2M6 8h2"/>'),
  user: _P('<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>'),
  users: _P('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>'),
  image: _P('<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>'),
  mic: _P('<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"/>'),
  pen: _P('<path d="M12 20h9M16.4 3.6a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4Z"/>'),
  zap: _P('<path d="M4 14a1 1 0 0 1-.8-1.6l9.9-10.2a.5.5 0 0 1 .9.5l-1.9 6A1 1 0 0 0 13 10h7a1 1 0 0 1 .8 1.6l-9.9 10.2a.5.5 0 0 1-.9-.5l1.9-6A1 1 0 0 0 11 14z"/>'),
  wand: _P('<path d="m21.6 2.4-1.2-1.2a1.2 1.2 0 0 0-1.7 0L1.2 18.7a1.2 1.2 0 0 0 0 1.7l1.2 1.2a1.2 1.2 0 0 0 1.7 0L21.6 4.1a1.2 1.2 0 0 0 0-1.7ZM14 7l3 3M5 6v4M19 14v4M10 2v2M7 8H3M21 16h-4M11 3H9"/>'),
  plus: _P('<path d="M5 12h14M12 5v14"/>'),
  up: _P('<path d="m5 12 7-7 7 7M12 19V5"/>'),
  down: _P('<path d="M12 5v14M19 12l-7 7-7-7"/>'),
  booktext: _P('<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20M8 11h8M8 7h6"/>'),
  sparkles: _P('<path d="M9.9 15.5A2 2 0 0 0 8.5 14l-6.1-1.6a.5.5 0 0 1 0-1L8.5 9.9A2 2 0 0 0 9.9 8.5l1.6-6.1a.5.5 0 0 1 1 0l1.6 6.1a2 2 0 0 0 1.4 1.4l6.1 1.6a.5.5 0 0 1 0 1l-6.1 1.6a2 2 0 0 0-1.4 1.4l-1.6 6.1a.5.5 0 0 1-1 0zM20 3v4M22 5h-4"/>'),
  lines: _P('<path d="M2 10v3M6 6v11M10 3v18M14 8v7M18 5v13M22 10v3"/>'),
  wave: _P('<path d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2"/>'),
  video: _P('<path d="m16 13 5.2 3.5a.5.5 0 0 0 .8-.4V7.9a.5.5 0 0 0-.8-.4L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>'),
  move: _P('<path d="M12 2v20M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M5 9l-3 3 3 3M9 5l3-3 3 3"/>'),
  shuffle: _P('<path d="m18 14 4 4-4 4M18 2l4 4-4 4M2 18h1.9a4 4 0 0 0 3.3-1.7l5.6-8.6A4 4 0 0 1 16.1 6H22M2 6h1.9a4 4 0 0 1 3.4 1.9M22 18h-5.9a4 4 0 0 1-3.3-1.8l-.4-.6"/>'),
  caps: _P('<rect width="18" height="14" x="3" y="5" rx="2"/><path d="M7 15h4M15 15h2M7 11h2M13 11h4"/>'),
  music: _P('<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>'),
  layers: _P('<path d="m12.8 2.2a2 2 0 0 0-1.7 0L2.6 6.1a1 1 0 0 0 0 1.8l8.6 3.9a2 2 0 0 0 1.7 0l8.6-3.9a1 1 0 0 0 0-1.8ZM2 12a1 1 0 0 0 .6.9l8.6 3.9a2 2 0 0 0 1.7 0l8.5-3.9A1 1 0 0 0 22 12M2 17a1 1 0 0 0 .6.9l8.6 3.9a2 2 0 0 0 1.7 0l8.5-3.9A1 1 0 0 0 22 17"/>'),
  monitor: _P('<path d="m9 10 3-3 3 3M12 13V7"/><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M12 17v4M8 21h8"/>'),
  mega: _P('<path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6"/>'),
  film: _P('<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18M3 7.5h4M3 12h18M3 16.5h4M17 3v18M17 7.5h4M17 16.5h4"/>'),
  dl: _P('<path d="M12 15V3M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5"/>'),
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l12-7.5z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
  copy: _P('<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>'),
  cal: _P('<path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5M16 2v4M8 2v4M3 10h5M17.5 17.5 16 16.3V14"/><circle cx="16" cy="16" r="6"/>'),
  sliders: _P('<path d="M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4"/>'),
  info: _P('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>'),
  chev: _P('<path d="m6 9 6 6 6-6"/>'),
  x: _P('<path d="M18 6 6 18M6 6l12 12"/>'),
  refresh: _P('<path d="M3 12a9 9 0 0 1 9-9 9.8 9.8 0 0 1 6.7 2.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.8 9.8 0 0 1-6.7-2.7L3 16M8 16H3v5"/>'),
  home: _P('<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .7-1.5l7-6a2 2 0 0 1 2.6 0l7 6a2 2 0 0 1 .7 1.5v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'),
  folder: _P('<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.7-.9l-.8-1.2A2 2 0 0 0 7.9 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>'),
  chart: _P('<path d="M3 3v16a2 2 0 0 0 2 2h16M18 17V9M13 17V5M8 17v-3"/>'),
  upload: _P('<path d="M12 3v12M17 8l-5-5-5 5M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>'),
};
const ico = (k, cls = '') => IC[k].replace('<svg', `<svg class="${cls}"`);
const PLAT_IC = {
  youtube: '<svg viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#FF0000"/><path d="M26 22l16 10-16 10z" fill="#fff"/></svg>',
  tiktok: '<svg viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#000"/><path d="M38 14c1 5 4 8 9 8v7c-3.3 0-6.3-1-9-2.8V40a11 11 0 1 1-11-11v7a4 4 0 1 0 4 4V14z" fill="#fff"/></svg>',
  instagram: '<svg viewBox="0 0 64 64"><defs><radialGradient id="igS" cx=".3" cy="1" r="1.2"><stop offset="0" stop-color="#FFD600"/><stop offset=".5" stop-color="#FF0069"/><stop offset="1" stop-color="#7638FA"/></radialGradient></defs><rect width="64" height="64" rx="14" fill="url(#igS)"/><rect x="16" y="16" width="32" height="32" rx="10" fill="none" stroke="#fff" stroke-width="4"/><circle cx="32" cy="32" r="7.5" fill="none" stroke="#fff" stroke-width="4"/><circle cx="42" cy="22" r="2.5" fill="#fff"/></svg>',
  threads: '<svg viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#000"/><path d="M40.6 30.4c-.2-.1-.4-.2-.6-.3-.4-6.6-4-10.4-10-10.4-3.6 0-6.6 1.5-8.4 4.3l3.3 2.3c1.4-2.1 3.5-2.5 5.1-2.5 2 0 3.5.6 4.4 1.8.7.8 1.1 2 1.3 3.4-1.7-.3-3.5-.4-5.4-.3-5.4.3-8.9 3.5-8.7 7.9.1 2.2 1.2 4.2 3.1 5.4 1.6 1.1 3.7 1.6 5.8 1.5 2.8-.2 5-1.2 6.6-3.2 1.2-1.5 1.9-3.4 2.3-5.8 1.3.8 2.3 1.9 2.8 3.2.9 2.2 1 5.8-2 8.7-2.6 2.6-5.7 3.7-10.4 3.7-5.2 0-9.2-1.7-11.8-5-2.4-3.1-3.7-7.6-3.7-13.3s1.3-10.2 3.7-13.3c2.6-3.3 6.5-5 11.8-5 5.3 0 9.3 1.7 12 5.1 1.3 1.6 2.3 3.7 2.9 6.1l3.9-1c-.8-3-2-5.6-3.7-7.7-3.5-4.3-8.5-6.5-15.1-6.5-6.5 0-11.5 2.2-14.9 6.5C11.6 21.3 10 26.5 10 32.8v.1c0 6.3 1.6 11.5 4.8 15.4 3.4 4.3 8.4 6.5 14.9 6.5 5.8 0 9.8-1.5 13.2-4.9 4.4-4.4 4.2-9.9 2.8-13.2-1-2.4-3-4.4-5.1-5.3zm-9.5 9c-2.4.1-4.8-.9-4.9-3.1-.1-1.6 1.1-3.4 4.9-3.6h1.3c1.4 0 2.7.1 3.9.4-.5 5.6-3.2 6.2-5.2 6.3z" fill="#fff"/></svg>',
  facebook: '<svg viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0866FF"/><path d="M35.5 52V35h5.8l.9-6.8h-6.7v-4.3c0-2 .6-3.3 3.4-3.3h3.6v-6A48 48 0 0 0 37.3 14c-5.2 0-8.7 3.2-8.7 9v5.2h-5.8V35h5.8v17z" fill="#fff"/></svg>',
};

const STYLE_CARDS = [
  ['stickman', 'Stickman berwarna', 'Sejarah, kisah nyata', '#F2B266', '#1F1D1A'],
  ['flat', 'Kartun flat', 'Sains, fakta, edukasi', '#8CCBE3', '#1F1D1A'],
  ['whiteboard', 'Whiteboard doodle', 'Tutorial, bisnis', '#FFFFFF', '#1F1D1A'],
  ['collage', 'Kolase kertas', 'Dokumenter, jurnalisme', '#E9D8BA', '#1F1D1A'],
  ['watercolor', 'Buku cerita cat air', 'Dongeng anak, religi', '#CFE3B5', '#1F1D1A'],
  ['anime', 'Anime', 'Drama, motivasi, fiksi', '#F5C3CD', '#1F1D1A'],
  ['noir', 'Komik noir', 'Horor, true crime', '#2F3240', '#FAF7F2'],
];
const IDEA_CHIPS = ['Campur', 'Tren hari ini', 'Anak-anak', 'Dokumenter', 'Sejarah', 'Misteri & horor', 'Sains & fakta', 'Legenda & dongeng', 'Motivasi', 'Komedi'];
const SYNOPSIS = 'Legenda Danau Toba. Nelayan bernama Toba menangkap ikan emas yang menjelma putri, lalu menikahinya dengan satu janji. Saat janji itu dilanggar, desanya tenggelam menjadi danau. Suasana haru.';
const NAR1_SHORT = '"Lepaskan aku," pinta ikan itu,';
const NAR1_ADD = ' "dan hidupmu akan berubah."';
const SCH_PLATS = [['youtube', 'YouTube', 'Kisah Nusantara'], ['tiktok', 'TikTok', '@kisahnusantara'], ['facebook', 'Facebook', 'Kisah Nusantara'], ['instagram', 'Instagram', '@kisahnusantara'], ['threads', 'Threads', '@kisahnusantara']];
const CAPTIONS = {
  youtubeTitle: 'Asal-usul Danau Toba yang Bikin Merinding 🌊 #shorts',
  tiktok: 'Satu kalimat marah, satu desa tenggelam 😢 #legenda #danautoba #fyp',
  instagram: 'Janji yang dilanggar, lahirlah Danau Toba 🌊\nKisah rakyat Sumatera Utara dalam 30 detik.\n#ceritarakyat #danautoba #legendanusantara',
};

function buildStudio(root, o) {
  const M = o.mode === 'm', wide = o.aspect === '16:9';
  root.classList.add('app', M ? 'm' : 'd');
  const btn = (id, cls, icn, lbl, cost, busy) => `<span class="btn ${cls}" id="${id}">${icn ? `<span class="ico">${ico(icn, 'ic')}</span>` : ''}<span class="spin"></span><span class="lbl">${lbl}</span>${busy ? `<span class="blbl">${busy}</span>` : ''}${cost != null ? `<span class="cost">${ico('zap')}${cost}</span>` : ''}</span>`;
  const sel = (id, v, cls = '', icn = '', opts = []) => `<span class="selb ${cls}" id="${id}">${icn ? ico(icn) : ''}<span class="v">${v}</span>${ico('chev')}${opts.length ? `<span class="dd">${opts.map((x, k) => `<div data-k="${k}">${x}</div>`).join('')}</span>` : ''}</span>`;
  const secH = (icn, title, aside = '', extra = '') => `<div class="sec-h"><h3>${icn ? ico(icn) : ''}${title}${extra}</h3>${aside ? `<div class="aside">${aside}</div>` : ''}</div>`;

  const steps = [['bulb', 'Ide'], ['scroll', 'Naskah'], ['gallery', 'Storyboard'], ['clapper', 'Editor']];
  const thW = wide ? 128 : 72, thH = wide ? 72 : 128;
  const ar = wide ? '16/9' : '9/16';

  root.innerHTML = `
  ${M ? '' : `<aside class="side">
    <div class="brand"><span class="logoTile" style="width:32px;height:32px"><img alt="Klipers" src="${o.logo}"></span>Klipers</div>
    <div class="planb"><span>Pro</span><b>240<small>cr</small></b></div>
    <div class="mk">${ico('plus', 'ic')}Buat Video</div>
    <div class="mi">${ico('home')}Beranda</div>
    <div class="mi">${ico('folder')}Video Saya</div>
    <div class="mi">${ico('chart')}Alat SEO${ico('chev', 'ic')}</div>
    <div class="mi">${ico('sparkles')}Alat AI${ico('chev', 'ic')}</div>
    <div class="msub">
      <div class="mi">${ico('film')}AI Content Creator<span class="bd">New</span></div>
      <div class="mi on" id="miStory">${ico('gallery')}Story Studio<span class="bd">New</span></div>
      <div class="mi">${ico('zap')}Generate Prompt</div>
      <div class="mi">${ico('music')}Music Generator</div>
      <div class="mi">${ico('mic')}Text To Speech</div>
      <div class="mi">${ico('mic')}Clone Suara<span class="bd">New</span></div>
    </div>
    <div class="mi">${ico('upload')}Auto Upload</div>
  </aside>`}
  <div class="main" id="ssMain">
    <!-- daftar proyek -->
    <section class="scr" id="sList"><div class="scroll">
      <div class="lsthd"><div><h1 class="h1">Story Studio</h1>
        <p class="desc">Ubah ide cerita jadi video: AI menulis naskah dan menyusun visual, kamu rapikan tiap adegan, lalu ekspor MP4 dengan gerak kamera, narasi, dan subtitle.</p></div>
        ${btn('bNew', 'pri lg', 'plus', 'Proyek baru')}</div>
      <div class="pnl empty"><div class="sect" style="gap:12px;align-items:flex-start">
        <h2 class="h2x">Mulai dari satu ide</h2>
        <p class="desc" style="margin:0;max-width:520px">Kisah legenda daerah, sejarah tokoh, atau cerita misteri. Empat langkah sampai jadi video siap unggah.</p>
        ${btn('bFirst', 'pri', 'plus', 'Buat proyek pertama')}</div>
        <ol>${[['bulb', 'Ide', 'Tulis sinopsis, pilih gaya visual dan suara.'], ['scroll', 'Naskah', 'AI menulis adegan, kamu rapikan alurnya.'], ['gallery', 'Storyboard', 'Gambar, suara tiap pemeran, dan efek suara per adegan.'], ['clapper', 'Editor', 'Subtitle, musik otomatis, ekspor, lalu siap unggah.']]
          .map(([ic, t, d], k) => `<li id="intro${k}"><span class="cir">${ico(ic)}</span><span><b><i class="mono">${k + 1}</i>${t}</b><span>${d}</span></span></li>`).join('')}</ol>
      </div>
    </div></section>

    <!-- ruang kerja -->
    <section class="scr" id="sWork"><div class="scroll" id="wScroll">
      <header class="wshd">
        <span class="backb">${ico('back')}</span>
        <span class="ttl" id="wTitle">Proyek tanpa judul</span>
        <span class="svst" id="wSave">${ico('filepen')}<span id="wSaveTx">${M ? 'Draf' : 'Draf, tersimpan setelah naskah ditulis'}</span></span>
        <nav class="stepr">${steps.map(([ic, l], k) => `<span id="sp${k + 1}">${ico(ic, 'si')}${ico('check', 'ok')}${l}</span>`).join('')}</nav>
      </header>
      <div class="aibar" id="aiBar"><span class="sp spinA"></span><span id="aiTx">AI sedang menulis naskah...</span><small>Boleh tinggalkan halaman ini. Hasilnya muncul otomatis saat selesai.</small></div>

      <!-- 1 · IDE -->
      <div class="stp" id="st1"><div class="idea">
        <div class="col">
          <div><h2 class="h2">Ceritakan idemu</h2><p class="desc">Sebut tokoh, tempat, dan akhir ceritanya. Makin jelas, makin rapi susunan adegan dari AI.</p></div>
          <section class="sect">${secH('palette', 'Gaya visual', `<span class="chip s7 on">Semua</span><span class="chip s7">2D</span><span class="chip s7">3D</span><span class="chip s7">Realistis</span>`, '<b id="styleName">Stickman berwarna</b>')}
            <div class="styles" id="styleRow">${STYLE_CARDS.map(([id, n, ni, sw, ink]) => `<span class="stc${id === 'stickman' ? ' on' : ''}" id="sty-${id}"><span class="sw" style="background:${sw};color:${ink};${sw === '#FFFFFF' ? 'box-shadow:inset 0 0 0 1px #e5e5e5' : ''}">${n[0]}</span><span style="min-width:0"><b>${n}</b><small>${ni}</small></span>${ico('check', 'ck')}</span>`).join('')}</div>
          </section>
          <div class="pnl syn">
            <div class="ta"><span class="caret" id="synTx"></span><span class="ph" id="synPh">Tahun 1336 di istana Majapahit. Gajah Mada bersumpah tidak akan menikmati palapa sebelum Nusantara bersatu...</span></div>
            <div class="tbar2">
              ${sel('selDur', '1 menit', 'sm', 'clock', ['30 detik', '1 menit', '3 menit'])}
              <span class="segw"><span id="fmt916" class="on">${ico('vert')}9:16</span><span id="fmt169">${ico('hori')}16:9</span></span>
              <span class="cnt" id="synCnt">±11 adegan · 5 dtk · 0/4.000</span>
            </div>
          </div>
          <section class="sect">${secH('', 'Butuh ide?', 'Pilih jenis cerita, gratis')}
            <div class="ideas">${IDEA_CHIPS.map(c => `<span class="chip">${c}</span>`).join('')}</div></section>
        </div>
        <aside class="sect" style="gap:16px">
          <div class="pnl asd">
            <section class="sect">${secH('lang', 'Bahasa naskah &amp; suara')}${sel('selLang', 'Indonesia')}</section>
            <section class="sect">${secH('theater', 'Gaya bercerita')}${sel('selNar', 'Storytelling')}</section>
            <section class="sect">${secH('book', 'Fokus cerita')}<span class="segw" style="align-self:flex-start"><span class="on">${ico('user')}Bertokoh</span><span>${ico('users')}Topik</span></span><p class="note">Cerita mengikuti tokoh utama.</p></section>
            <div class="hr"></div>
            <section class="sect">${secH('image', 'Model gambar')}${sel('selImg', 'Seedream 5.0 Pro · 4 kredit', '', 'image')}<p class="note">Lembar karakter dipakai sebagai acuan, jadi wajah tokoh tetap sama di semua adegan.</p></section>
            <div class="hr"></div>
            <section class="sect">${secH('mic', 'Suara narator')}${sel('selTts', 'Klipers TTS')}${sel('selVoice', 'Ardi (Indonesia, pria)', '', 'mic')}<p class="note">Suara 1 kredit per adegan.</p></section>
          </div>
          ${btn('bWrite', 'pri lg btnw', 'pen', 'Tulis naskah', 'gratis', 'AI sedang menulis naskah...')}
          <p class="note ctr" style="margin-top:-6px">Kredit baru dipakai saat membuat gambar, suara, dan video.</p>
        </aside>
      </div></div>

      <!-- 2 · NASKAH -->
      <div class="stp" id="st2">
        <div class="stephd"><div><h2 class="h2">Naskah</h2><p class="desc"><span class="mono">5</span> adegan, sekitar <span class="mono">0:30</span>. Baca alurnya dulu; visual dibuat dari naskah final ini.</p></div>
          <div class="acts">${btn('bVis', 'pri', 'wand', 'Susun visual', 'gratis', 'AI sedang menyusun visual...')}</div></div>
        <div class="pnl" id="rows">${ART_SCENES.map((s, k) => `<div class="srow" id="row${k}">
          <div class="no"><b>${String(k + 1).padStart(2, '0')}</b><i>${ico('up')}${ico('down')}</i></div>
          <div style="min-width:0;display:flex;flex-direction:column;gap:8px">
            <div class="st">${s.title}</div>
            <div class="two">
              <div><div class="lbl2"><span>${ico('booktext')}Yang terjadi</span></div><div class="tx2 mu">${s.story}</div></div>
              <div><div class="lbl2"><span>Narasi <span class="spk">${ico('mic')}Narator</span></span><span class="mono" id="wc${k}">${s.nar.split(' ').length} kata · ${(s.nar.split(' ').length * .42 + .6).toFixed(1).replace('.', ',')} dtk</span></div>
                <div class="tx2" id="nar${k}"><span id="narT${k}" class="caret">${k === 1 ? NAR1_SHORT : s.nar}</span></div></div>
            </div></div></div>`).join('')}
          <div class="addrow">${ico('plus')}Tambah adegan</div></div>
      </div>

      <!-- 3 · STORYBOARD -->
      <div class="stp" id="st3">
        <div class="stephd"><div><h2 class="h2">Storyboard</h2><p class="desc">Buat gambar, suara, dan gerak tiap adegan. Semua tombol menampilkan biayanya sebelum kamu menekan.</p></div>
          <div class="acts">${btn('bImgs', 'pri', 'sparkles', 'Buat semua gambar', '24')}${btn('bVoice', 'sec', 'mic', 'Rekam narasi', '5', `Merekam narasi <span class="mono" id="vPct">0%</span>`)}${btn('bToEd', 'gho', 'clapper', 'Ke editor')}</div></div>
        <div class="pnl meters">
          <div class="mtr"><div class="r"><span>${ico('image')}Gambar</span><b><span id="mImg">0</span>/5</b></div><div class="prog"><i id="mImgB"></i></div></div>
          <div class="mtr"><div class="r"><span>${ico('lines')}Suara</span><b><span id="mVo">0</span>/5</b></div><div class="prog"><i id="mVoB"></i></div></div>
          <div class="mx"><span>${ico('wave')}Efek suara <b class="mono" style="color:#171717" id="mSfx">0</b></span>${btn('bSfx', 'gho sm', 'sparkles', 'Pasang otomatis', 'gratis')}</div>
          <div class="mx"><span>${ico('video')}Video AI</span><span class="badge amber">Segera hadir</span></div>
        </div>
        <section class="sect">${secH('users', 'Pemeran', `${ico('plus', 'ic')}<b style="font-weight:600">Tambah pemeran</b>`)}
          <div class="cast">${[['Toba', 'Nelayan Batak, kulit sawo matang, ikat kepala ulos merah bergaris hitam, rompi cokelat, sarung biru.', 1], ['Putri', 'Perempuan anggun, rambut hitam panjang, gaun kuning keemasan, jepit bunga emas.', 0]]
            .map(([n, d, sh], k) => `<div class="pnl ccard" id="cc${k}"><div class="sh"><div class="emp">${ico('user')}<span>Belum ada lembar karakter</span></div><div class="shim" id="sheet${k}" style="position:absolute;inset:0;opacity:0"></div><div class="veil" id="cv${k}"><span class="sp spinA"></span>Membuat lembar</div>${k === 0 ? '<span class="samebd">Acuan wajah</span>' : ''}</div>
            <div class="bd"><b>${n}</b><p>${d}</p></div></div>`).join('')}</div></section>
        <section class="sect">${secH('gallery', 'Adegan', '<span class="mono">5 adegan</span>')}
          <div class="strip">${ART_SCENES.map((s, k) => `<div class="th${k === 0 ? ' on' : ''}" id="th${k}" style="width:${thW}px;height:${thH}px"><div class="em">${ico('image')}</div><div class="im" id="thi${k}"></div><span class="no">${String(k + 1).padStart(2, '0')}</span><span class="au" id="tha${k}">${ico('lines')}</span><div class="veil" id="thv${k}"><span class="sp spinA"></span>${wide ? 'Membuat gambar' : ''}</div></div>`).join('')}</div></section>
        <div class="pnl cpanel" id="cpan">
          <div class="sect" style="gap:12px">
            <div class="row" style="justify-content:space-between"><b style="font:700 16px Inter"><span class="mono fa" style="margin-right:6px">01</span>${ART_SCENES[0].title}</b><span class="badge" id="cpSfx">${ico('wave', 'ic')}Tanpa efek</span></div>
            <div class="bigim" style="aspect-ratio:${ar};${wide ? '' : 'max-width:300px;margin:0 auto;width:100%'}"><div class="mv" id="bigMv"></div><span class="pg">${ico('play')}Putar gerak</span></div>
            <p style="margin:0;font-size:14px;line-height:1.6">${ART_SCENES[0].nar}</p>
          </div>
          <div class="sect" style="gap:18px">
            <section class="sect">${secH('move', 'Gerak')}<div class="chips">${Object.entries({ zoomin: 'Zoom in', zoomout: 'Zoom out', panleft: 'Geser kiri', panright: 'Geser kanan', kenburns: 'Ken Burns', shake: 'Goyang halus', static: 'Diam' }).map(([k, l]) => `<span class="chip${k === 'zoomin' ? ' on' : ''}" id="cam-${k}">${l}</span>`).join('')}</div></section>
            <section class="sect">${secH('shuffle', 'Transisi ke adegan berikutnya')}${sel('selTr', 'Pudar')}</section>
            <section class="sect">${secH('wave', 'Efek suara di awal adegan')}${sel('selSfx', 'Tanpa efek')}</section>
          </div>
        </div>
      </div>

      <!-- 4 · EDITOR -->
      <div class="stp" id="st4">
        <div class="stephd"><div><h2 class="h2">Editor</h2><p class="desc">Atur subtitle, musik, dan logo, ekspor MP4, lalu siapkan unggahannya.${M ? '' : ' Pratinjau memakai gerak kamera, transisi, efek suara, dan posisi yang sama dengan hasil akhir.'}</p></div></div>
        <div class="edg">
          <div class="pnl plc" id="plc"><div class="player" id="player" style="aspect-ratio:${ar};${wide ? '' : 'max-width:260px'}">${ART_SCENES.map((s, k) => `<div class="fr" id="pf${k}"></div>`).join('')}<div class="psub" id="psub" style="bottom:${wide ? 10 : 22}%"></div></div>
            <div class="pbar"><span class="pp">${ico('play')}</span><span class="mono" id="pT">0:00</span><div class="prog"><i id="pBar"></i></div><span class="mono">0:30</span></div></div>
          <div class="pnl" style="display:flex;flex-direction:column">
            <div class="tabs5">${[['caps', 'Subtitle'], ['music', 'Musik'], ['layers', 'Logo &amp; teks'], ['monitor', 'Ekspor'], ['mega', 'Unggah']].map(([ic, l], k) => `<span id="tab${k}">${ico(ic)}${l}</span>`).join('')}</div>
            <div class="tabp">
              <div class="tp" id="tp0">
                <div class="cprev" id="capCard"><div class="pv" id="capPv">Dahulu <span class="on">kala</span></div><div class="in"><span><b id="capName">Karaoke</b><small id="capMeta">Montserrat · 60px · otomatis · posisi 75%</small></span><span class="btn sec sm" id="bCapEdit" style="position:relative">${ico('sliders', 'ic')}Ubah</span></div></div>
                <p class="note fa row" style="align-items:flex-start;gap:6px">${ico('info', 'ic')}<span>Preset, animasi, dan pengaturannya sama dengan Quick Process dan kartu klip.</span></p>
              </div>
              <div class="tp" id="tp1">
                <div class="box"><b>${ico('sparkles')}Musik otomatis</b><p>AI membaca suasana ceritamu lalu memilihkan 3 lagu instrumental bebas royalti (Creative Commons). Gratis.</p>${btn('bMusic', 'pri sm', 'music', 'Cari musik yang cocok')}</div>
                <div><div class="lab"><span>Musik latar</span></div>${sel('selMusic', 'Tanpa musik')}</div>
                <p class="note fa" id="musicNote" style="opacity:0">“Legend of the Lake” oleh Arulo, lisensi Creative Commons lewat Jamendo.</p>
                <div id="volRow" style="opacity:0"><div class="lab"><span>Volume musik</span><span class="mono">-18 dB</span></div><div class="prog"><i style="width:62%"></i></div></div>
              </div>
              <div class="tp" id="tp3">
                <div><div class="lab"><span>Resolusi</span></div><div class="res2"><span class="btn pri sm">1080p</span><span class="btn sec sm">720p</span></div></div>
                <div class="cks"><span><i>${ico('check')}</i>Tempelkan subtitle ke video</span><span><i>${ico('check')}</i>Buat juga file subtitle .srt</span><span><i>${ico('check')}</i>Ratakan volume akhir</span></div>
                ${btn('bExport', 'pri', 'film', 'Ekspor MP4 · 0:30')}
                <div id="renderRow"><p class="note" style="color:#525252" id="renderTx">Merender video 0%</p><div class="prog"><i id="renderB"></i></div></div>
                <div class="pnl excard" id="exCard"><div class="row" style="justify-content:space-between"><b style="font:600 12px Inter;color:#404040">Hasil ekspor terakhir</b><span class="badge green">1080p</span></div>
                  <div class="vid" id="exVid" style="aspect-ratio:${ar};${wide ? '' : 'max-height:150px;margin:0 auto'}"></div>
                  ${btn('bPrep', 'pri sm', 'mega', 'Siapkan unggahan')}</div>
              </div>
              <div class="tp" id="tp4">
                <div class="box"><b>${ico('mega')}Paket unggah</b><p>AI menulis judul, caption, dan tagar untuk YouTube, TikTok, Instagram, dan Facebook, plus beberapa pilihan cover dari gambar adeganmu.</p>${btn('bKit', 'pri sm', 'sparkles', 'Buat paket unggah', 'gratis')}</div>
                <div id="kit" style="display:flex;flex-direction:column;gap:12px;opacity:0">
                  <div><div class="lab"><span>Cover</span></div><div class="covers">${[0, 2, 3, 4].map(k => `<div style="aspect-ratio:${ar}" id="cov${k}"></div>`).join('')}</div></div>
                  ${[['Judul YouTube Shorts', CAPTIONS.youtubeTitle], ['Caption TikTok', CAPTIONS.tiktok], ['Caption Instagram Reels', CAPTIONS.instagram]].map(([l, v], k) => `<div class="cf" id="cf${k}"><div class="h"><span>${l}</span>${ico('copy')}</div><div class="v">${v}</div></div>`).join('')}
                </div>
                <div class="box" id="schBox"><b>${ico('cal')}Jadwalkan unggah</b><p>Unggah hasil ekspor terakhir ke YouTube, TikTok, Facebook, atau Instagram, sekarang atau di jam yang kamu pilih.</p>${btn('bSched', 'pri sm', 'cal', 'Jadwalkan')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></section>

    <div class="modal" id="capModal"><div class="mdl"><div class="mhd">Pengaturan Subtitle ${ico('x', 'ic')}</div>
      <div class="tb"><span class="on">Presets</span><span>Settings</span></div>
      <div class="pgrid">${[['Karaoke', 'karaoke'], ['Klipers Motion', 'motion'], ['Bold Impact', 'bold'], ['Neon Pulse', 'neon'], ['Pop', 'pop'], ['Box', 'box']].map(([n, k]) => `<div class="pt${k === 'karaoke' ? ' on' : ''}" id="pre-${k}"><div class="pv" style="${{ neon: 'color:#7df9ff;-webkit-text-stroke:0;text-shadow:0 0 8px #22d3ee', box: 'background:#171717', motion: 'color:#fff', bold: 'color:#fde047', pop: 'color:#fff' }[k] || ''}">${k === 'box' ? '<span style="background:#fff;color:#000;padding:2px 6px;border-radius:4px;-webkit-text-stroke:0">TOBA</span>' : k === 'karaoke' ? 'IKAN <span style="color:#ffe600">EMAS</span>' : 'IKAN EMAS'}</div><b>${n}</b></div>`).join('')}</div>
      <div class="ft"><span class="btn sec sm">Batal</span><span class="btn pri sm" id="bCapSave">Simpan</span></div></div></div>

    <div class="modal sch" id="schModal"><div class="mdl smd">
      <div class="mhd sh"><span><b>Pengaturan Jadwal</b><small>Jadwalkan upload ke social media</small></span>${ico('x', 'ic')}</div>
      <div class="sbody">
        <div class="msg" id="schMsg">${ico('check', 'ic')}<span>Upload berhasil dijadwalkan ke 5 platform</span></div>
        <label class="flab">Pilih Platform *</label>
        <div class="pgrid2">${SCH_PLATS.map(([k, n, a], j) => `<div class="pl" id="pl-${k}"><span class="rd"></span><span class="pi">${PLAT_IC[k]}</span><span class="pt2"><b>${n}</b><small>${a}</small></span><span class="ok2">${ico('check')}</span></div>`).join('')}</div>
        <label class="flab">Judul Video</label><div class="fin">${CAPTIONS.youtubeTitle}</div>
        <label class="flab">Waktu Rilis</label><div class="fin row" style="justify-content:space-between">Besok, 19.00 WIB ${ico('cal', 'ic')}</div>
      </div>
      <div class="ft">${btn('bSchGo', 'pri btnw', 'cal', 'Jadwalkan', null, 'Menjadwalkan...')}</div></div></div>
    <div class="toast" id="toast">${ico('check')}<span id="toastTx"></span></div>
  </div>
  <svg class="cursor" id="cur" viewBox="0 0 24 24"><path d="M4 2l16 9.2-7 1.7L9 20z" fill="#fff" stroke="#111" stroke-width="1.5" stroke-linejoin="round"/></svg><div class="cring" id="cring"></div>`;

  // gambar
  const put = (sel, k, uid) => { const el = root.querySelector(sel); if (el) el.innerHTML = art(k, { uid }); };
  ART_SCENES.forEach((s, k) => { put('#thi' + k, k, 'th' + k); put('#pf' + k, k, 'pf' + k); });
  put('#bigMv', 0, 'big');
  put('#exVid', 0, 'exv');
  [0, 2, 3, 4].forEach(k => put('#cov' + k, k, 'cov' + k));
  root.querySelector('#sheet0').innerHTML = sheet('sh0');
  root.querySelector('#sheet1').innerHTML = `<svg viewBox="0 0 160 90"><defs>${_wc('sh1')}</defs><rect width="160" height="90" fill="#fbf8f2"/><g filter="url(#wcsh1)">${_putri(40, 62, 2)}${_putri(80, 62, 2)}${_putri(122, 62, 2)}</g><path d="M60 10 V82 M101 10 V82" stroke="#e5e5e5" stroke-width=".5"/></svg>`;
}
