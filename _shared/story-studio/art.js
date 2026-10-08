/* ================= ILUSTRASI ADEGAN (tiruan hasil gaya "Buku cerita cat air") =================
   Legenda Danau Toba, 5 adegan. Digambar di dunia 160×160 dan dipotong lewat
   preserveAspectRatio="slice", jadi satu gambar bisa dipakai 16:9 maupun 9:16
   (subjek utama selalu di kotak tengah ±90×90).
   art(i, opt): opt.uid wajib unik per instance (id filter/gradient SVG).
   sheet(uid): lembar karakter Toba (3 pose, wajah sama) untuk kartu Pemeran. */
const ART_SCENES = [
  { title: 'Nelayan di tepi danau', story: 'Toba, nelayan miskin, menjala ikan sendirian saat fajar.', nar: 'Dahulu kala, seorang nelayan menangkap ikan emas yang bisa berbicara.', cam: 'kenburns', sfx: 'Ombak tenang' },
  { title: 'Ikan emas di jala', story: 'Jalanya berat. Seekor ikan emas berkilau memohon dilepaskan.', nar: '"Lepaskan aku," pinta ikan itu, "dan hidupmu akan berubah."', cam: 'zoomin', sfx: 'Kilau ajaib' },
  { title: 'Menjadi seorang putri', story: 'Ikan itu berubah menjadi putri cantik. Toba menikahinya dengan satu janji.', nar: 'Ikan itu menjelma putri, dengan satu syarat: jangan pernah ungkit asal-usulnya.', cam: 'zoomout', sfx: 'Denting' },
  { title: 'Janji yang dilanggar', story: 'Bertahun kemudian Toba marah pada anaknya dan mengucap kata terlarang.', nar: 'Suatu hari Toba murka, dan janji itu pun terucap: "Dasar anak ikan!"', cam: 'shake', sfx: 'Guntur' },
  { title: 'Lahirnya Danau Toba', story: 'Hujan turun tanpa henti. Desa tenggelam menjadi danau, menyisakan Pulau Samosir.', nar: 'Hujan turun tanpa henti, dan desa itu menjadi Danau Toba.', cam: 'panright', sfx: 'Hujan lebat' },
];

function _wc(u) {
  // tepi kuas + tekstur kertas
  return `<filter id="wc${u}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="1.3"/></filter>
  <filter id="pp${u}"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 .45  0 0 0 0 .36  0 0 0 0 .25  0 0 0 .55 0"/></filter>
  <radialGradient id="vg${u}" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#3a2a1a" stop-opacity="0"/><stop offset="1" stop-color="#3a2a1a" stop-opacity=".28"/></radialGradient>`;
}
const _lg = (id, a, b, c) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/>${c ? `<stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/>` : `<stop offset="1" stop-color="${b}"/>`}</linearGradient>`;

/* ---------- tokoh (warna & ciri tetap = "wajah sama di tiap adegan") ---------- */
function _toba(x, y, s = 1, pose = 'stand') {
  // ikat kepala ulos merah bergaris hitam, kumis-janggut tipis, rompi cokelat, sarung biru tua
  const arms = {
    stand: '<path d="M-4.2 -9 L-7 -2.5 M4.2 -9 L7 -2.5" stroke="#b07a52" stroke-width="1.9" stroke-linecap="round"/>',
    net: '<path d="M-4.2 -9 L-9 -12 M4.2 -9 L9 -12" stroke="#b07a52" stroke-width="1.9" stroke-linecap="round"/>',
    wow: '<path d="M-4.2 -9 L-8 -16 M4.2 -9 L8 -16" stroke="#b07a52" stroke-width="1.9" stroke-linecap="round"/>',
    point: '<path d="M-4.2 -9 L-6.5 -2.5 M4.2 -9 L12.5 -11" stroke="#b07a52" stroke-width="1.9" stroke-linecap="round"/>',
    back: '<path d="M-4.2 -9 L-6 -2.8 M4.2 -9 L6 -2.8" stroke="#8a5b3a" stroke-width="1.9" stroke-linecap="round"/>',
  }[pose];
  const face = pose === 'back'
    ? '<circle cx="0" cy="-15.5" r="4.4" fill="#2b211b"/>'
    : `<circle cx="0" cy="-15.5" r="4.4" fill="#b07a52"/><path d="M-3.3 -13.4 Q0 -10.2 3.3 -13.4 Q2.6 -11 0 -10.8 Q-2.6 -11 -3.3 -13.4Z" fill="#2b211b"/>
       <circle cx="-1.5" cy="-16" r=".5" fill="#2b211b"/><circle cx="1.5" cy="-16" r=".5" fill="#2b211b"/>${pose === 'point' ? '<path d="M-2.6 -17.6 L-.6 -17 M2.6 -17.6 L.6 -17" stroke="#2b211b" stroke-width=".6"/>' : ''}`;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    ${arms}
    <path d="M-4.6 -10.5 Q0 -12 4.6 -10.5 L4 1 L-4 1Z" fill="#7a4e2e"/><path d="M-1.4 -10.8 L1.4 -10.8 L1 0 L-1 0Z" fill="#e8dcc4"/>
    <path d="M-4.2 0.5 L4.2 0.5 L4.8 10 L-4.8 10Z" fill="#2f4a6b"/><path d="M-4.4 4 L4.5 4" stroke="#c9a24a" stroke-width=".6"/>
    ${face}
    <path d="M-4.7 -17.6 Q0 -21.8 4.7 -17.6 L4.8 -16.4 Q0 -18.6 -4.8 -16.4Z" fill="#b3262c"/><path d="M-4.6 -17.1 Q0 -20 4.6 -17.1" stroke="#1b1b1b" stroke-width=".55" fill="none"/>
    <path d="M4.4 -17 L7.4 -15.4 L6 -14.4" fill="#b3262c"/>
  </g>`;
}
function _putri(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-3.8 -18 Q-6.6 -6 -5.6 4 L-2 2 Z M3.8 -18 Q6.6 -6 5.6 4 L2 2Z" fill="#1d1715"/>
    <path d="M-3.6 -10 Q0 -11.4 3.6 -10 L6.4 11 L-6.4 11Z" fill="#e9b949"/><path d="M-6 9 L6 9" stroke="#b0791e" stroke-width=".7"/><path d="M-2 -10 L0 -6 L2 -10" stroke="#fff3c4" stroke-width=".6" fill="none"/>
    <path d="M-3.6 -8.5 L-6.6 -2 M3.6 -8.5 L6.6 -2" stroke="#d9a27a" stroke-width="1.6" stroke-linecap="round"/>
    <circle cx="0" cy="-15" r="4" fill="#d9a27a"/>
    <path d="M-4.2 -15.5 Q-4 -20.4 0 -20.2 Q4 -20.4 4.2 -15.5 Q2.6 -18.4 0 -18.2 Q-2.6 -18.4 -4.2 -15.5Z" fill="#1d1715"/>
    <circle cx="-1.4" cy="-15.2" r=".45" fill="#2b211b"/><circle cx="1.4" cy="-15.2" r=".45" fill="#2b211b"/><path d="M-1 -13 Q0 -12.4 1 -13" stroke="#a5523f" stroke-width=".5" fill="none"/>
    <circle cx="3.6" cy="-18.6" r="1.1" fill="#f6d36b"/>
  </g>`;
}
function _anak(x, y, s = 1, cry = false) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-3 -7 L-5 -2 M3 -7 L${cry ? '1 -11' : '5 -2'}" stroke="#b07a52" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M-3.2 -7.8 L3.2 -7.8 L3.4 1 L-3.4 1Z" fill="#efe6d4"/><path d="M-3.2 1 L3.2 1 L3.6 7 L-3.6 7Z" fill="#2f4a6b"/>
    <circle cx="0" cy="-11.6" r="3.4" fill="#b07a52"/>
    <path d="M-3.5 -13 Q0 -16.2 3.5 -13 L3.5 -12.2 Q0 -14.2 -3.5 -12.2Z" fill="#b3262c"/>
    ${cry ? '<path d="M-1.4 -11.6 l0 2.4 M1.4 -11.6 l0 2.4" stroke="#7cc6e8" stroke-width=".6"/><path d="M-1 -9.4 Q0 -10.2 1 -9.4" stroke="#2b211b" stroke-width=".45" fill="none"/>' : '<circle cx="-1.2" cy="-11.8" r=".4" fill="#2b211b"/><circle cx="1.2" cy="-11.8" r=".4" fill="#2b211b"/>'}
  </g>`;
}
function _fish(x, y, s = 1, glow = true, u = '') {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    ${glow ? `<circle r="18" fill="url(#fg${u})"/>` : ''}
    <path d="M9 0 L17 -7 Q15 0 17 7Z" fill="#e39a1f"/>
    <path d="M-12 0 Q-6 -9 6 -6 Q10 -3 10 0 Q10 3 6 6 Q-6 9 -12 0Z" fill="#f4b733"/>
    <path d="M-12 0 Q-6 -9 6 -6 Q2 -2 -12 0Z" fill="#ffd767" opacity=".8"/>
    ${[-3, 1, 5].map(d => `<path d="M${d} -4 Q${d + 2.4} 0 ${d} 4" stroke="#c9801a" stroke-width=".5" fill="none"/>`).join('')}
    <path d="M-2 -6.4 Q2 -12 6 -6" fill="#e39a1f"/>
    <circle cx="-7.6" cy="-1.4" r="1.5" fill="#fff"/><circle cx="-7.9" cy="-1.4" r=".8" fill="#2b211b"/>
  </g>`;
}
const _spark = (pts, c = '#fff6d0') => pts.map(([x, y, r]) => `<path d="M${x} ${y - r} L${x + r * .28} ${y - r * .28} L${x + r} ${y} L${x + r * .28} ${y + r * .28} L${x} ${y + r} L${x - r * .28} ${y + r * .28} L${x - r} ${y} L${x - r * .28} ${y - r * .28}Z" fill="${c}"/>`).join('');
function _bolon(x, y, s = 1) {
  // rumah bolon Batak: atap pelana melengkung, dinding berukir segitiga merah-putih-hitam
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-20 -14 Q-10 -6 0 -8 Q10 -6 20 -14 L14 -30 Q0 -22 -14 -30Z" fill="#6e4b3a"/>
    <path d="M-14 -30 Q0 -22 14 -30 L12 -32 Q0 -25 -12 -32Z" fill="#4a3226"/>
    <path d="M-12 -8 L12 -8 L12 4 L-12 4Z" fill="#8a5a3c"/>
    ${[-10, -5, 0, 5].map(d => `<path d="M${d} -6 L${d + 2.5} -1 L${d + 5} -6Z" fill="#b3262c"/><path d="M${d} -1 L${d + 2.5} -6 L${d + 5} -1Z" fill="#efe6d4" opacity=".85"/>`).join('')}
    <path d="M-12 4 L-12 14 M-6 4 L-6 14 M6 4 L6 14 M12 4 L12 14" stroke="#4a3226" stroke-width="1.6"/>
    <path d="M-3 -2 L3 -2 L3 4 L-3 4Z" fill="#2b1d16"/>
  </g>`;
}

function art(i, opt = {}) {
  const u = opt.uid || ('a' + i + Math.random().toString(36).slice(2, 7));
  let defs = _wc(u), g = '';
  if (i === 0) {
    defs += _lg('sk' + u, '#f6c7a0', '#fbe3c6', '#fdf0dc') + _lg('lk' + u, '#a9cdd6', '#7fb0c0');
    g = `<rect width="160" height="160" fill="url(#sk${u})"/>
      <circle cx="108" cy="58" r="13" fill="#fff4d8" opacity=".95"/><circle cx="108" cy="58" r="22" fill="#fff4d8" opacity=".25"/>
      <path d="M0 84 L18 66 L34 76 L52 58 L72 74 L90 62 L112 78 L132 64 L160 80 L160 96 L0 96Z" fill="#a6b9c8" opacity=".85"/>
      <path d="M0 90 L22 78 L44 86 L64 76 L88 88 L110 80 L136 90 L160 84 L160 98 L0 98Z" fill="#7f9f8c"/>
      <rect y="94" width="160" height="66" fill="url(#lk${u})"/>
      <path d="M100 98 L116 98 L112 160 L104 160Z" fill="#fff4d8" opacity=".35"/>
      ${[104, 112, 121, 133, 146].map((y, k) => `<path d="M${10 + k * 9} ${y} h${30 - k * 3}" stroke="#eef6f6" stroke-width=".7" opacity=".7"/>`).join('')}
      <path d="M0 99 Q40 96 80 100 T160 98" stroke="#fff" stroke-width="1.6" opacity=".35" fill="none"/>
      <g><path d="M58 108 Q80 116 104 108 L100 113 Q80 119 62 113Z" fill="#5a3a26"/><path d="M60 109 Q80 115 102 109" stroke="#8a5a3c" stroke-width=".8" fill="none"/></g>
      ${_toba(80, 98, 1, 'net')}
      <path d="M71 86 Q80 80 89 86 L95 108 L65 108Z" fill="none" stroke="#e8dcc4" stroke-width=".35" opacity=".7"/>
      <path d="M40 46 q3 -2 6 0 q3 -2 6 0 M58 40 q2 -1.5 4 0 q2 -1.5 4 0" stroke="#5b4636" stroke-width=".7" fill="none"/>
      <rect y="88" width="160" height="10" fill="#fff" opacity=".18"/>`;
  }
  if (i === 1) {
    defs += _lg('w' + u, '#6aa9bb', '#3f7f95', '#2a5f74') + `<radialGradient id="fg${u}"><stop offset="0" stop-color="#ffe9a6" stop-opacity=".95"/><stop offset="1" stop-color="#ffe9a6" stop-opacity="0"/></radialGradient>`;
    const mesh = [];
    for (let k = -6; k <= 6; k++) { mesh.push(`<path d="M${80 + k * 9} 40 Q${80 + k * 7} 90 ${80 + k * 5} 132" stroke="#eadcc0" stroke-width=".45" fill="none" opacity=".75"/>`); }
    for (let k = 0; k < 9; k++) { const y = 46 + k * 10; mesh.push(`<path d="M${22 + k * 3} ${y} Q80 ${y + 10} ${138 - k * 3} ${y}" stroke="#eadcc0" stroke-width=".45" fill="none" opacity=".75"/>`); }
    g = `<rect width="160" height="160" fill="url(#w${u})"/>
      ${[30, 52, 116, 138].map((y, k) => `<path d="M0 ${y} Q40 ${y - 4} 80 ${y} T160 ${y}" stroke="#bfe3ea" stroke-width=".8" opacity=".45" fill="none"/>`).join('')}
      <ellipse cx="80" cy="88" rx="58" ry="50" fill="#1f4f63" opacity=".35"/>
      ${_fish(80, 86, 1.9, true, u)}
      ${mesh.join('')}
      <path d="M22 46 Q80 30 138 46" stroke="#c7a46a" stroke-width="2.4" fill="none"/>
      <path d="M14 40 q-2 8 6 10 q6 -2 6 -8" fill="#b07a52"/><path d="M146 40 q2 8 -6 10 q-6 -2 -6 -8" fill="#b07a52"/>
      ${_spark([[52, 62, 3], [112, 70, 2.4], [62, 108, 2], [104, 104, 3.2], [80, 54, 1.8]])}
      <circle cx="48" cy="120" r="1.6" fill="#d7f0f4" opacity=".7"/><circle cx="118" cy="126" r="2.2" fill="#d7f0f4" opacity=".6"/>`;
  }
  if (i === 2) {
    defs += _lg('s' + u, '#cdb9e0', '#efcfd6', '#f8e2c8') + `<radialGradient id="fg${u}"><stop offset="0" stop-color="#fff2c2" stop-opacity=".95"/><stop offset="1" stop-color="#fff2c2" stop-opacity="0"/></radialGradient>`;
    g = `<rect width="160" height="160" fill="url(#s${u})"/>
      <path d="M0 96 Q40 88 80 94 T160 92 L160 160 L0 160Z" fill="#9fc2b0"/>
      <path d="M0 112 Q50 104 96 112 T160 110 L160 160 L0 160Z" fill="#86ad97"/>
      <path d="M0 132 Q40 126 80 132 T160 130 L160 160 L0 160Z" fill="#8cb7c6"/>
      <circle cx="88" cy="88" r="30" fill="url(#fg${u})"/>
      ${_putri(88, 104, 1.45)}
      ${_toba(52, 112, 1.15, 'wow')}
      <g opacity=".45">${_fish(118, 70, .7, false)}</g>
      ${_spark([[70, 62, 3], [108, 60, 2.4], [100, 90, 2], [74, 96, 1.8], [118, 84, 2.8], [92, 50, 2]], '#fff8dc')}
      ${[20, 36, 140].map((x, k) => `<path d="M${x} 112 q-2 -10 1 -16 M${x + 3} 112 q1 -8 4 -12" stroke="#5f8a6d" stroke-width=".8" fill="none"/>`).join('')}`;
  }
  if (i === 3) {
    defs += _lg('s' + u, '#6d7383', '#9aa0aa', '#c9c2b6');
    g = `<rect width="160" height="160" fill="url(#s${u})"/>
      <path d="M0 40 Q20 28 44 36 Q60 22 84 32 Q104 20 124 32 Q146 24 160 34 L160 0 L0 0Z" fill="#4c5262"/>
      <path d="M96 36 L90 50 L96 50 L88 66" stroke="#fff3c4" stroke-width="1.4" fill="none"/>
      <path d="M0 104 Q60 98 160 104 L160 160 L0 160Z" fill="#7e8a6c"/>
      ${_bolon(118, 92, 1.25)}
      ${_toba(62, 112, 1.3, 'point')}
      ${_anak(94, 116, 1.15, true)}
      ${_putri(138, 118, .9)}
      ${Array.from({ length: 22 }, (_, k) => `<path d="M${(k * 23) % 160} ${(k * 37) % 110 + 20} l-2 7" stroke="#dfe6ee" stroke-width=".5" opacity=".6"/>`).join('')}
      <rect width="160" height="160" fill="#2a3040" opacity=".08"/>`;
  }
  if (i === 4) {
    defs += _lg('s' + u, '#f2b48c', '#f7d2a8', '#fbe7cc') + _lg('lk' + u, '#8cbccb', '#5e98ac');
    g = `<rect width="160" height="160" fill="url(#s${u})"/>
      <path d="M18 62 A62 62 0 0 1 142 62" stroke="#f6e3b0" stroke-width="3" fill="none" opacity=".55"/>
      <path d="M22 64 A58 58 0 0 1 138 64" stroke="#cfe3c8" stroke-width="2" fill="none" opacity=".45"/>
      <circle cx="80" cy="74" r="10" fill="#fff1cf"/>
      <path d="M0 80 L24 64 L46 76 L66 66 L80 74 L96 64 L118 76 L138 66 L160 78 L160 92 L0 92Z" fill="#9db4a0"/>
      <rect y="88" width="160" height="72" fill="url(#lk${u})"/>
      <path d="M50 104 Q62 94 80 96 Q100 94 112 104 Q96 110 80 110 Q62 110 50 104Z" fill="#7d9e6a"/>
      <path d="M58 103 Q70 97 82 99" stroke="#a8c48e" stroke-width="1.2" fill="none"/>
      <path d="M74 90 L86 90 L90 160 L70 160Z" fill="#fff1cf" opacity=".32"/>
      ${[118, 128, 140].map((y, k) => `<path d="M${16 + k * 10} ${y} h${36 - k * 4} M${108 - k * 4} ${y + 4} h${30 - k * 3}" stroke="#eaf6f6" stroke-width=".6" opacity=".65"/>`).join('')}
      <path d="M0 118 Q22 112 44 116 Q56 119 62 126 L62 160 L0 160Z" fill="#6f8f5e"/>
      ${_toba(50, 120, .85, 'back')}
      <g opacity=".35">${_fish(110, 122, .5, false)}</g>`;
  }
  return `<svg viewBox="0 0 160 160" preserveAspectRatio="xMidYMid slice" ${opt.cls ? `class="${opt.cls}"` : ''}><defs>${defs}</defs>
    <g filter="url(#wc${u})">${g}</g>
    <rect width="160" height="160" filter="url(#pp${u})" opacity=".22" style="mix-blend-mode:multiply"/>
    <rect width="160" height="160" fill="url(#vg${u})"/></svg>`;
}

function sheet(u) {
  // lembar karakter: depan, samping, ekspresi; dasar kertas putih
  return `<svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid meet"><defs>${_wc(u)}</defs>
    <rect width="160" height="90" fill="#fbf8f2"/>
    <g filter="url(#wc${u})">
      ${_toba(34, 60, 2, 'stand')}${_toba(80, 60, 2, 'net')}${_toba(124, 60, 2, 'point')}
    </g>
    <path d="M57 10 V82 M103 10 V82" stroke="#e5e5e5" stroke-width=".5"/>
    <text x="34" y="87" text-anchor="middle" font-family="Inter" font-size="4" fill="#737373">depan</text>
    <text x="80" y="87" text-anchor="middle" font-family="Inter" font-size="4" fill="#737373">aksi</text>
    <text x="126" y="87" text-anchor="middle" font-family="Inter" font-size="4" fill="#737373">ekspresi</text>
  </svg>`;
}
