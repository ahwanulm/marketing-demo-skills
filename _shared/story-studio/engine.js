/* ================= ENGINE BERSAMA demo-story-studio-{landscape,portrait} =================
   Dipakai lewat build: marketing/tools/build-demo-story-studio.mjs menanam berkas ini ke index.html.
   Kontrak iklan: timeline GSAP paused & seek-safe, ?t= ?nocaps=1 ?guides=1 ?record=1,
   window.__seek / __duration / __ready / __sfx (dicampur export-video.mjs). */
function storyEngine(cfg) {
  const { W, H, D, CUES, build, onSync } = cfg;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const Q = new URLSearchParams(location.search);
  const REC = Q.has('record');
  document.body.classList.add('light');
  if (REC) document.body.classList.add('rec');
  if (Q.has('nocaps')) document.body.classList.add('nocaps');
  if (Q.has('guides')) document.body.classList.add('guides');

  function fit() {
    const k = Math.min(innerWidth / W, (innerHeight - (REC ? 0 : 56)) / H);
    document.documentElement.style.setProperty('--k', k);
  }
  fit(); addEventListener('resize', fit);

  /* ---------- caption ---------- */
  CUES.forEach(c => {
    const words = c.text.split(' ');
    const wt = words.map(w => w.length + 2 + (/[.,?:!]$/.test(w) ? 4 : 0));
    const total = wt.reduce((a, b) => a + b, 0);
    const span = (c.e - c.s) - 0.3;
    let acc = 0;
    c.words = words.map((w, i) => { const st = c.s + span * acc / total; acc += wt[i]; return { w, st }; });
    c.chunks = []; let cur = [];
    c.words.forEach((w, i) => {
      cur.push(i);
      if (cur.length >= (cfg.capWords || 6) || (/[.,?:!]$/.test(w.w) && cur.length >= 3)) { c.chunks.push(cur); cur = []; }
    });
    if (cur.length) c.chunks.push(cur);
  });
  const capsEl = $('#caps');
  let capKey = null;
  function renderCaps(t) {
    const ci = CUES.findIndex(c => !c.nocap && t >= c.s && t <= c.e);
    if (ci < 0) { capsEl.style.opacity = 0; capKey = null; return; }
    const c = CUES[ci];
    let wi = 0; c.words.forEach((w, i) => { if (t >= w.st) wi = i; });
    const chunk = c.chunks.find(ch => ch.includes(wi));
    const key = ci + ':' + chunk[0];
    if (key !== capKey) {
      capsEl.innerHTML = '<span class="ln">' + chunk.map(i => `<span class="cw" data-i="${i}">${c.words[i].w}</span>`).join('') + '</span>';
      capKey = key;
    }
    capsEl.querySelectorAll('.cw').forEach(el => el.classList.toggle('on', +el.dataset.i === wi));
    capsEl.style.opacity = 1;
  }

  /* ---------- audio (narasi + efek) ---------- */
  const SFX = [];
  const sfx = (t, name, vol = .5) => SFX.push({ t: +t.toFixed(3), file: `audio/sfx-${name}.mp3`, vol });
  const AUD = CUES.map(c => {
    const a = new Audio(); a.preload = 'auto';
    a.onerror = () => { c.missing = true; updateVoiceNote(); };
    a.src = c.file; return a;
  });
  const SFXA = {};
  const SS = window.speechSynthesis;
  let ttsVoice = null;
  function pickVoice() {
    if (!SS) return;
    const vs = SS.getVoices(); if (!vs.length) return;
    const by = f => vs.find(f);
    ttsVoice = by(v => /^id/i.test(v.lang) && /ardi/i.test(v.name)) || by(v => /^id/i.test(v.lang)) || null;
    updateVoiceNote();
  }
  function updateVoiceNote() {
    if (!CUES.some(c => c.missing)) return;
    const n = $('#audioNote');
    n.style.display = 'inline';
    n.textContent = ttsVoice ? 'Suara: ' + ttsVoice.name.replace(/\s*-\s*.*$/, '') + ' (browser)' : 'File narasi tidak ditemukan';
  }
  if (SS) { pickVoice(); SS.onvoiceschanged = pickVoice; }
  let muted = false, playing = false, lastT = 0;
  function stopAudio() { AUD.forEach(a => a.pause()); Object.values(SFXA).forEach(a => a.pause()); if (SS) SS.cancel(); CUES.forEach(c => { c.started = false; }); }
  function syncAudio(t) {
    if (!playing || muted) { lastT = t; return; }
    CUES.forEach((c, i) => {
      if (c.started) return;
      const a = AUD[i];
      const len = !c.missing && isFinite(a.duration) ? a.duration : (c.e - c.s);
      if (t >= c.s && t < c.s + len) {
        c.started = true;
        if (c.missing) {
          if (SS && t - c.s < .6) { SS.cancel(); const u = new SpeechSynthesisUtterance(c.say || c.text); u.lang = 'id-ID'; try { if (ttsVoice) u.voice = ttsVoice; } catch (e) {} SS.speak(u); }
          return;
        }
        try { a.currentTime = Math.max(0, t - c.s); } catch (e) {}
        a.play().catch(() => {});
      }
    });
    if (t > lastT && t - lastT < .5) SFX.forEach(ev => {
      if (ev.t > lastT && ev.t <= t) {
        const a = SFXA[ev.file + ev.t] || (SFXA[ev.file + ev.t] = new Audio(ev.file));
        a.volume = Math.min(1, ev.vol); try { a.currentTime = 0; } catch (e) {} a.play().catch(() => {});
      }
    });
    lastT = t;
  }

  /* ---------- state diskret (seek-safe) ----------
     flag(t0,t1,el,cls) · say(t,el,teks) · type(t0,t1,el,teks) · count(t0,t1,el,a,b,fmt) */
  const FLAGS = [], TEXTS = new Map(), TYPES = [], COUNTS = [];
  const EL = x => typeof x === 'string' ? $(x) : x;
  const flag = (t0, t1, el, cls) => { el = EL(el); if (!el) throw new Error('flag: elemen tidak ada ' + el); FLAGS.push({ t0, t1: t1 ?? 1e9, el, cls }); };
  const say = (t, el, txt) => { el = EL(el); if (!TEXTS.has(el)) TEXTS.set(el, { init: el.innerHTML, list: [] }); TEXTS.get(el).list.push({ t, txt }); };
  const type = (t0, t1, el, txt, init = '') => TYPES.push({ t0, t1, el: EL(el), txt, init });
  const count = (t0, t1, el, a, b, fmt = v => v) => COUNTS.push({ t0, t1, el: EL(el), a, b, fmt });
  function applyState(t) {
    const want = new Map();
    FLAGS.forEach(f => {
      if (!want.has(f.el)) want.set(f.el, {});
      const m = want.get(f.el); m[f.cls] = m[f.cls] || (t >= f.t0 && t < f.t1);
    });
    want.forEach((m, el) => Object.entries(m).forEach(([c, on]) => el.classList.toggle(c, on)));
    TEXTS.forEach((v, el) => { let cur = v.init; v.list.forEach(x => { if (t >= x.t) cur = x.txt; }); if (el.innerHTML !== cur) el.innerHTML = cur; });
    const typed = new Map();
    TYPES.forEach(x => {
      if (t < x.t0) { if (!typed.has(x.el)) typed.set(x.el, x.init); return; }
      const p = Math.min(1, (t - x.t0) / Math.max(.01, x.t1 - x.t0));
      typed.set(x.el, x.init + x.txt.slice(0, Math.round(x.txt.length * p)));
    });
    typed.forEach((v, el) => { if (el.textContent !== v) el.textContent = v; el.classList.toggle('typing', TYPES.some(x => x.el === el && t >= x.t0 && t < x.t1 + .4)); });
    const cnt = new Map();
    COUNTS.forEach(x => {
      if (t < x.t0 && cnt.has(x.el)) return;
      const p = Math.max(0, Math.min(1, (t - x.t0) / Math.max(.01, x.t1 - x.t0)));
      cnt.set(x.el, x.fmt(Math.round(x.a + (x.b - x.a) * p)));
    });
    cnt.forEach((v, el) => { const s = String(v); if (el.textContent !== s) el.textContent = s; });
  }

  /* posisi elemen relatif kontainer (offset, kebal transform) */
  function rel(el, root) {
    el = EL(el); root = EL(root);
    let x = 0, y = 0, n = el;
    while (n && n !== root) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    if (n !== root) throw new Error('rel: root bukan offsetParent leluhur');
    return { x: x + el.offsetWidth / 2, y: y + el.offsetHeight / 2, l: x, t: y, w: el.offsetWidth, h: el.offsetHeight };
  }

  const tl = gsap.timeline({ paused: true, onUpdate: sync });
  function sync() {
    const t = tl.time();
    applyState(t);
    onSync && onSync(t);
    renderCaps(t);
    syncAudio(t);
    if (!scrubbing) $('#scrub').value = t;
    $('#tlabel').textContent = t.toFixed(1) + ' / ' + D + 's';
  }
  const api = { tl, $, $$, flag, say, type, count, sfx, rel, EL };

  /* ---------- kontrol ---------- */
  let scrubbing = false;
  const scrub = $('#scrub'); scrub.max = D;
  function play() { if (tl.time() >= D - .05) tl.seek(0, false); stopAudio(); lastT = tl.time(); playing = true; tl.play(); $('#bPlay').textContent = '❚❚'; }
  function pause() { playing = false; tl.pause(); stopAudio(); $('#bPlay').textContent = '▶'; }
  $('#bPlay').onclick = () => (playing ? pause() : play());
  $('#bRestart').onclick = () => { stopAudio(); tl.seek(0, false); sync(); play(); };
  $('#bMute').onclick = () => { muted = !muted; $('#bMute').textContent = muted ? '🔇 Bisu' : '🔊 Suara'; if (muted) stopAudio(); };
  function paintCapsBtn() { const off = document.body.classList.contains('nocaps'); $('#bCaps').textContent = 'CC Caption: ' + (off ? 'Off' : 'On'); $('#bCaps').classList.toggle('off', off); }
  $('#bCaps').onclick = () => { document.body.classList.toggle('nocaps'); paintCapsBtn(); };
  paintCapsBtn();
  scrub.addEventListener('input', () => { scrubbing = true; if (playing) pause(); tl.seek(+scrub.value, false); sync(); });
  scrub.addEventListener('change', () => { scrubbing = false; });
  addEventListener('keydown', e => {
    if (e.code === 'Space') { e.preventDefault(); playing ? pause() : play(); }
    if (e.key === 'c' || e.key === 'C') $('#bCaps').click();
  });
  $('#startOverlay').onclick = () => { $('#startOverlay').style.display = 'none'; play(); };

  document.fonts.ready.then(() => requestAnimationFrame(() => {
    build(api);
    tl.set({}, {}, D);
    SFX.sort((a, b) => a.t - b.t);
    window.__sfx = SFX;
    window.__tl = tl;
    window.__duration = D;
    window.__seek = t => { tl.seek(t, false); sync(); };
    const t0 = parseFloat(Q.get('t'));
    tl.seek(isFinite(t0) ? t0 : 0, false);
    sync();
    window.__ready = true;
  }));
  return api;
}
