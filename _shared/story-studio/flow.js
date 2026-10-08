/* ================= ALUR DEMO STORY STUDIO (11,0 – 51,0 dtk) =================
   Dipakai bersama portrait & landscape. Waktu mengikuti narasi vo-03 … vo-09.
   F (dari template): { root, vh, aspect: '16:9'|'9:16', cam?(t, el, zoom, d) }.
   Mengembalikan onSync(t) untuk pemutar pratinjau Editor. */
function storyFlow(A, F) {
  const { tl, $, flag, say, type, count, sfx, rel } = A;
  const R = F.root, main = $('#ssMain');
  const wide = F.aspect === '16:9';
  let SY = 0;                                   // posisi gulir #wScroll (px app) setelah view terakhir
  const shown = (ids, fn) => { const els = ids.map(x => $(x)); const add = els.filter(e => !e.classList.contains('show')); add.forEach(e => e.classList.add('show')); const r = fn(); add.forEach(e => e.classList.remove('show')); return r; };
  const yOf = el => rel(el, main).t;
  function view(t, y, d = .6) { tl.to('#wScroll', { y: -y, duration: d, ease: 'power2.inOut' }, t); SY = y; }
  function viewEl(t, el, top, d) {
    const max = Math.max(0, $('#wScroll').offsetHeight - F.vh);
    view(t, Math.max(0, Math.min(max, yOf(el) - top)), d);
  }
  // fokus: gulir supaya el terlihat (top px dari atas viewport) + kamera (landscape)
  function focus(t, el, o = {}) {
    const d = o.d ?? .6;
    if (!o.noView) viewEl(t, el, o.top ?? (F.mode === 'm' ? 80 : F.vh * .22), d);
    F.cam && F.cam(t, o.camEl || el, o.zoom || 1, d, o.el2, SY);
  }
  // kursor: tiba di elemen tepat pada t lalu klik
  let cx = F.cursorStart ? F.cursorStart.x : 600, cy0 = F.cursorStart ? F.cursorStart.y : 500;
  tl.set('#cur', { x: cx, y: cy0, autoAlpha: 0 }, 0);
  function cur(t, el, o = {}) {
    const p = rel(el, R);
    const x = p.x + (o.dx || 0), y = p.y - (o.noScroll ? 0 : SY) + (o.dy || 0);
    tl.to('#cur', { x, y, duration: o.d || .55, ease: 'power2.inOut' }, t - (o.d || .55));
    if (o.move) return;
    tl.fromTo('#cring', { x, y, scale: .4, opacity: .9 }, { scale: 1.6, opacity: 0, duration: .45, ease: 'power2.out', immediateRender: false }, t);
    tl.to('#cur', { scale: .85, duration: .08, yoyo: true, repeat: 1, transformOrigin: '0 0' }, t);
    sfx(t, 'click', .55);
  }
  const busy = (t0, t1, el) => flag(t0, t1, el, 'busy');
  const toast = (t0, t1, txt) => { say(t0, '#toastTx', txt); tl.fromTo('#toast', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .3, immediateRender: false }, t0); tl.to('#toast', { opacity: 0, duration: .25 }, t1); };
  const aibar = (t0, t1, txt) => { say(t0, '#aiTx', txt); flag(t0, t1, '#aiBar', 'vis'); };
  // header stepper: aktif / selesai per waktu
  [[16.1, 24.0], [24.0, 29.8], [29.8, 41.0], [41.0, 99]].forEach(([a, b], k) => {
    flag(a, b, '#sp' + (k + 1), 'on');
    flag(b, 99, '#sp' + (k + 1), 'done');
  });
  const steps = { 1: [16.1, 24.0], 2: [24.0, 29.8], 3: [29.8, 41.0], 4: [41.0, 99] };
  Object.entries(steps).forEach(([n, [a, b]]) => flag(a, b, '#st' + n, 'show'));

  /* ---------- 1 · daftar proyek (11,0 – 16,1) ---------- */
  tl.set('#sList', { autoAlpha: 1 }, 0);
  tl.set('#sList', { autoAlpha: 0 }, 16.1);
  tl.set('#sWork', { autoAlpha: 0 }, 0);
  tl.set('#sWork', { autoAlpha: 1 }, 16.1);
  tl.set('#cur', { autoAlpha: 1 }, 12.6);
  [13.9, 14.35, 14.8, 15.25].forEach((t, k) => flag(t, 16.1, '#intro' + k, 'hl'));
  [13.9, 14.35, 14.8, 15.25].forEach(t => sfx(t, 'click', .18));
    focus(11.2, '#sList', { zoom: 1, d: .01, noView: true });
  cur(15.85, '#bNew', { noScroll: true });

  /* ---------- 2 · ide (16,1 – 24,0) ---------- */
  const ST1 = ['#st1'];
  shown(ST1, () => {
    focus(16.2, '#st1 .col', { zoom: 1.22, d: .8, noView: true });
    cur(16.75, '#synTx', { dx: 40 });
    flag(16.75, null, '#synPh', 'gone');
    type(16.8, 19.1, '#synTx', SYNOPSIS);
    for (let t = 16.9; t < 19.1; t += .22) sfx(t, 'click', .1);
    say(19.15, '#synCnt', `±11 adegan · 5 dtk · ${SYNOPSIS.length}/4.000`);
    cur(19.6, '#sty-watercolor');
    flag(0, 19.6, '#sty-stickman', 'on');
    flag(19.6, null, '#sty-watercolor', 'on');
    say(19.6, '#styleName', 'Buku cerita cat air');
    cur(20.55, '#selDur');
    flag(20.55, 21.35, '#selDur', 'open');
    flag(20.9, 21.35, '#selDur .dd div[data-k="0"]', 'hi');
    cur(21.3, '#selDur', { move: true, dy: 40, d: .35 });
    say(21.35, '#selDur .v', '30 detik');
    say(21.35, '#synCnt', `±5 adegan · 6 dtk · ${SYNOPSIS.length}/4.000`);
    sfx(21.35, 'click', .45);
    if (wide) {
      cur(22.0, '#fmt169');
      flag(0, 22.0, '#fmt916', 'on');
      flag(22.0, null, '#fmt169', 'on');
    }
    focus(22.0, '#bWrite', { zoom: 1.15, d: .6, top: F.mode === 'm' ? F.vh - 140 : 300 });
    cur(22.8, '#bWrite');
    busy(22.8, 24.0, '#bWrite');
    aibar(22.85, 24.0, 'AI sedang menulis naskah...');
    sfx(22.85, 'processing', .35);
  });
  say(24.0, '#wTitle', 'Legenda Danau Toba');
  say(24.0, '#wSaveTx', 'Tersimpan');
  view(24.0, 0, .01);

  /* ---------- 3 · naskah (24,0 – 29,8) ---------- */
  shown(['#st2'], () => {
    focus(24.0, '#rows', { zoom: 1.12, d: .01, noView: true });
    ART_SCENES.forEach((s, k) => tl.fromTo('#row' + k, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .35, ease: 'power2.out', immediateRender: false }, 24.1 + k * .28));
    tl.set(ART_SCENES.map((s, k) => '#row' + k), { opacity: 0 }, 0);
    sfx(24.1, 'whoosh', .3);
    focus(25.5, '#row1', { top: F.mode === 'm' ? 70 : 150, zoom: 1.3, d: .7 });
    cur(26.3, '#narT1', { dx: 60 });
    flag(26.3, 27.9, '#nar1', 'foc');
    say(0, '#wc1', '5 kata · 2,7 dtk');
    type(26.45, 27.6, '#narT1', NAR1_ADD, NAR1_SHORT);
    for (let t = 26.5; t < 27.6; t += .2) sfx(t, 'click', .1);
    say(27.6, '#wc1', '9 kata · 4,4 dtk');
    view(28.0, 0, .55);
    focus(28.0, '#bVis', { zoom: 1.25, d: .55, noView: true });
    cur(28.75, '#bVis');
    busy(28.75, 29.8, '#bVis');
    aibar(28.8, 29.8, 'AI sedang menyusun visual...');
    sfx(28.8, 'processing', .35);
  });

  /* ---------- 4 · storyboard (29,8 – 41,0) ---------- */
  shown(['#st3'], () => {
    view(29.8, 0, .01);
    focus(29.8, '#st3 .stephd', { zoom: 1.12, d: .01, noView: true });
    toast(29.9, 31.6, 'Visual tiap adegan siap. Sekarang buat gambar dan suaranya.');
    cur(30.45, '#bImgs');
    busy(30.45, 34.0, '#bImgs');
    sfx(30.5, 'riser', .3);
    focus(30.6, '.cast', { top: F.mode === 'm' ? 30 : 120, zoom: 1.18, d: .7 });
    [0, 1].forEach(k => {
      tl.to('#cv' + k, { opacity: 1, duration: .2 }, 30.55);
      tl.to('#cv' + k, { opacity: 0, duration: .25 }, 31.6 + k * .2);
      tl.to('#sheet' + k, { opacity: 1, duration: .3 }, 31.6 + k * .2);
    });
    sfx(31.7, 'regenerate', .3);
    focus(32.0, '.strip', { top: F.mode === 'm' ? 150 : 300, zoom: 1.25, d: .7 });
    ART_SCENES.forEach((s, k) => {
      const t = 32.1 + k * .42;
      tl.to('#thv' + k, { opacity: 1, duration: .2 }, 31.0);
      tl.to('#thv' + k, { opacity: 0, duration: .2 }, t);
      tl.fromTo('#thi' + k, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: .35, immediateRender: false }, t);
      sfx(t, 'click', .22);
    });
    count(32.1, 33.8, '#mImg', 0, 5);
    tl.fromTo('#mImgB', { width: '0%' }, { width: '100%', duration: 1.8, ease: 'none', immediateRender: false }, 32.1);
    // wajah sama di tiap adegan
    focus(34.1, '.cast', { top: F.mode === 'm' ? 30 : 110, zoom: 1.02, d: .6, el2: '.strip' });
    ['#cc0', '#th0', '#th1', '#th3', '#th4'].forEach((s, k) => flag(34.3 + k * .12, 35.7, s, 'same'));
    sfx(34.3, 'success', .3);
    flag(34.0, null, '#bImgs', 'gone');
    flag(34.0, null, '#bVoice', 'pri');
    // narasi
    view(35.75, 0, .5);
    focus(35.75, '#st3 .stephd', { zoom: 1.15, d: .5, noView: true });
    cur(36.3, '#bVoice');
    busy(36.3, 37.5, '#bVoice');
    count(36.35, 37.45, '#vPct', 0, 100, v => v + '%');
    count(36.35, 37.45, '#mVo', 0, 5);
    tl.fromTo('#mVoB', { width: '0%' }, { width: '100%', duration: 1.1, ease: 'none', immediateRender: false }, 36.35);
    ART_SCENES.forEach((s, k) => tl.to('#tha' + k, { opacity: 1, duration: .15 }, 36.45 + k * .22));
    sfx(36.35, 'processing', .3);
    cur(37.75, '#bSfx');
    busy(37.75, 38.25, '#bSfx');
    count(38.25, 38.3, '#mSfx', 0, 5);
    say(38.25, '#cpSfx', ico('wave', 'ic') + 'Ombak tenang');
    say(38.25, '#selSfx .v', 'Ombak tenang');
    sfx(38.25, 'success', .25);
    focus(38.55, '#cpan', { top: F.mode === 'm' ? 10 : 30, zoom: 1.12, d: .6 });
    if (F.mode === 'm') viewEl(39.0, '#cam-kenburns', 300, .3);
    cur(39.35, '#cam-kenburns');
    flag(0, 39.35, '#cam-zoomin', 'on');
    flag(39.35, null, '#cam-kenburns', 'on');
    tl.fromTo('#bigMv', { scale: 1, x: 0 }, { scale: 1.16, x: wide ? -30 : -14, y: -8, duration: 1.4, ease: 'sine.inOut', immediateRender: false }, 39.45);
    view(40.3, 0, .4);
    focus(40.3, '#bToEd', { zoom: 1.15, d: .4, noView: true });
    cur(40.85, '#bToEd');
  });

  /* ---------- 5 · editor + unggah (41,0 – 51,0) ---------- */
  shown(['#st4'], () => {
    view(41.0, 0, .01);
    focus(41.0, '#st4 .edg', { zoom: 1.08, d: .01, noView: true });
    const tab = (k, t0, t1) => { flag(t0, t1, '#tab' + k, 'on'); flag(t0, t1, '#tp' + k, 'show'); };
    tab(0, 41.0, 43.3); tab(1, 43.3, 44.8); tab(3, 44.8, 47.1); tab(4, 47.1, 99);
    focus(41.2, '.tabs5', { top: F.mode === 'm' ? 60 : 120, zoom: 1.3, d: .6, el2: '#capCard' });
    cur(41.75, '#bCapEdit');
    tl.set('#capModal', { autoAlpha: 0 }, 0);
    tl.to('#capModal', { autoAlpha: 1, duration: .2 }, 41.8);
    tl.to('#capModal', { autoAlpha: 0, duration: .2 }, 43.0);
    F.cam && F.cam(41.85, '#capModal .mdl', 1.25, .4, null, 0);
    cur(42.4, '#pre-motion', { noScroll: true });
    flag(0, 42.4, '#pre-karaoke', 'on');
    flag(42.4, null, '#pre-motion', 'on');
    cur(42.9, '#bCapSave', { noScroll: true });
    say(42.95, '#capName', 'Klipers Motion');
    say(42.95, '#capMeta', 'Montserrat · 60px · 3 kata · posisi 75%');
    flag(42.95, null, '#psub', 'motion');
    focus(43.0, '.tabs5', { zoom: 1.3, d: .4, el2: '#tp1', noView: true });
    cur(43.35, '#tab1');
    cur(43.85, '#bMusic');
    busy(43.85, 44.4, '#bMusic');
    say(44.4, '#selMusic .v', 'Legend of the Lake (1:12)');
    tl.to(['#musicNote', '#volRow'], { opacity: 1, duration: .3 }, 44.4);
    toast(44.4, 45.7, 'Musik dipasang. Ada 3 pilihan lagu di daftar musik.');
    cur(44.85, '#tab3');
    cur(45.35, '#bExport');
    flag(45.35, 46.6, '#renderRow', 'show');
    flag(45.35, 46.6, '#bExport', 'dis');
    count(45.4, 46.5, '#renderTx', 0, 100, v => `Merender video ${v}%`);
    tl.fromTo('#renderB', { width: '0%' }, { width: '100%', duration: 1.1, ease: 'none', immediateRender: false }, 45.4);
    sfx(45.4, 'processing', .3);
    tl.to('#exCard', { opacity: 1, duration: .3 }, 46.6);
    sfx(46.6, 'success', .3);
    cur(47.05, '#bPrep');
    focus(47.1, '.tabs5', { zoom: 1.25, d: .5, el2: '#tp4', noView: true });
    cur(47.65, '#bKit');
    busy(47.65, 48.35, '#bKit');
    tl.to('#kit', { opacity: 1, duration: .3 }, 48.35);
    ['#cf0', '#cf1', '#cf2'].forEach((s, k) => tl.fromTo(s, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .3, immediateRender: false }, 48.45 + k * .2));
    sfx(48.4, 'success', .3);
    toast(48.5, 49.4, 'Paket unggah siap: caption tiap platform dan cover.');
    // auto upload 5 platform (modal Pengaturan Jadwal)
    if (F.mode === 'm') viewEl(48.7, '#schBox', F.vh - 230, .7);
    else focus(48.7, '#schBox', { top: F.vh - 200, zoom: 1.2, d: .7, camEl: '#cf1', el2: '#schBox' });
    cur(49.55, '#bSched');
    tl.set('#schModal', { autoAlpha: 0 }, 0);
    tl.to('#schModal', { autoAlpha: 1, duration: .25 }, 49.65);
    tl.to('#schModal', { autoAlpha: 0, duration: .3 }, 54.3);
    F.cam && F.cam(49.65, '#schModal .mdl', 1.32, .5, null, 0);
    sfx(49.65, 'whoosh', .3);
    SCH_PLATS.forEach(([k], j) => {
      const t = 50.4 + j * .36;
      cur(t, '#pl-' + k, { noScroll: true, d: .3 });
      flag(t, null, '#pl-' + k, 'on');
    });
    cur(52.55, '#bSchGo', { noScroll: true, d: .4 });
    busy(52.55, 53.05, '#bSchGo');
    flag(53.05, null, '#schMsg', 'show');
    SCH_PLATS.forEach(([k], j) => { flag(53.1 + j * .1, null, '#pl-' + k, 'done'); });
    sfx(53.1, 'success', .4);
  });
  tl.to('#cur', { autoAlpha: 0, duration: .2 }, 54.0);

  /* ---------- pemutar pratinjau editor ---------- */
  const SUBW = ART_SCENES.map(s => s.nar.replace(/"/g, '').split(' '));
  let lastKey = '';
  return function onSync(t) {
    if (t < 40.9) return;
    const pt = Math.max(0, t - 41.0) % 30, k = Math.min(4, Math.floor(pt / 6)), lp = (pt % 6) / 6;
    for (let j = 0; j < 5; j++) {
      const el = R.querySelector('#pf' + j);
      el.style.opacity = j === k ? 1 : 0;
      if (j === k) el.style.transform = `scale(${1.04 + lp * .1}) translateX(${(k % 2 ? -1 : 1) * lp * 2}%)`;
    }
    const w = SUBW[k], idx = Math.min(w.length - 1, Math.floor(lp * w.length * 1.05));
    const c0 = Math.floor(idx / 3) * 3, chunk = w.slice(c0, c0 + 3);
    const key = k + ':' + c0 + ':' + idx;
    if (key !== lastKey) {
      R.querySelector('#psub').innerHTML = chunk.map((x, n) => c0 + n === idx ? `<span class="on">${x}</span>` : x).join(' ');
      lastKey = key;
    }
    R.querySelector('#pT').textContent = '0:' + String(Math.floor(pt)).padStart(2, '0');
    R.querySelector('#pBar').style.width = (pt / 30 * 100) + '%';
  };
}
