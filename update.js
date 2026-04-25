/*!
 * update.js — AightBet Spring Theme System
 * ──────────────────────────────────────────
 * Drop ONE line into any page you want themed:
 *   <script src="update.js"></script>
 *
 * Spring Edition — Blossom Drop
 *   • Spring cherry-blossom palette + petal particles
 *   • Patch-notes toast on first visit
 *   • Floating widget with spring mini-features
 *   • Season badge (click to re-open patch notes)
 *   • 🌸 Credits tap-button with anti-autoclicker (Firebase-backed)
 *   • ☀️ Light mode support (toggle via Settings)
 */

/* ======================================================
   FIREBASE BOOTSTRAP
   Loads Firebase compat SDKs and wires up DB-backed
   credit helpers before the main IIFE runs.
====================================================== */
(function _injectFirebase() {
  if (window.__ckFbLoaded) return;
  window.__ckFbLoaded = true;

  var firebaseConfig = {
    apiKey:            'AIzaSyAySAfeYOX9yKTVBZTXdmGSx4eIAofY0ro',
    authDomain:        'gamle-53778.firebaseapp.com',
    databaseURL:       'https://gamle-53778-default-rtdb.europe-west1.firebasedatabase.app',
    projectId:         'gamle-53778',
    storageBucket:     'gamle-53778.firebasestorage.app',
    messagingSenderId: '513958176524',
    appId:             '1:513958176524:web:c74a2e946da58507200b29',
    measurementId:     'G-EB6SF28HZK',
  };

 

  /* LocalStorage fallbacks until the SDK has loaded */
  function lsGet()  { return parseInt(localStorage.getItem('ck-spring-credits') || '0'); }
  function lsAdd(n) {
    var v = lsGet() + n;
    localStorage.setItem('ck-spring-credits', v);
    return Promise.resolve(v);
  }

  window.__ckFirebase = {
    ready:           false,
    getCredits:      function() { return Promise.resolve(lsGet()); },
    addCredits:      lsAdd,
    onCreditsChange: function(cb) { cb(lsGet()); },
  };

  function loadScript(src, cb) {
    var s = document.createElement('script');
    s.src = src; s.defer = true;
    s.onload = cb;
    s.onerror = function() { console.warn('[CK] Failed to load', src); cb(); };
    document.head.appendChild(s);
  }

  var CDN = 'https://www.gstatic.com/firebasejs/9.22.2/';
 // REPLACE lines 77-105 with this:
loadScript(CDN + 'firebase-app-compat.js', function() {
  loadScript(CDN + 'firebase-database-compat.js', function() {
    loadScript(CDN + 'firebase-auth-compat.js', function() {  // ← ADD auth SDK
      try {
        if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
        
        // Wait for auth before touching the DB
        firebase.auth().onAuthStateChanged(function(user) {
          var uid;
          if (user) {
            uid = user.uid;
          } else {
            // sign in anonymously so auth.uid exists in DB rules
            firebase.auth().signInAnonymously().catch(function(e) {
              console.warn('[CK] Anon sign-in failed', e);
            });
            return; // onAuthStateChanged will fire again after sign-in
          }

          var db  = firebase.database();
          var ref = db.ref('users/' + uid + '/credits');

          window.__ckFirebase.getCredits = function() {
            return ref.once('value').then(function(snap) { return snap.val() || 0; });
          };
          window.__ckFirebase.addCredits = function(n) {
            return ref.transaction(function(cur) { return (cur || 0) + n; })
              .then(function(res) { return res.snapshot.val(); });
          };
          window.__ckFirebase.onCreditsChange = function(cb) {
            ref.on('value', function(snap) { cb(snap.val() || 0); });
          };

          window.__ckFirebase.ready = true;
          window.dispatchEvent(new Event('ck-firebase-ready'));
        });

      } catch (e) {
        console.warn('[CK] Firebase init failed — credits stored locally only', e);
      }
    });
  });
});
})();

(function () {
  'use strict';

  /* ══════════════════════════════════════════════
     0 · HELPERS
  ══════════════════════════════════════════════ */
  const NOW  = new Date();
  const YEAR = NOW.getFullYear();
  const DAY  = NOW.getDate();

  function rand(min, max)  { return min + Math.random() * (max - min); }
  function randInt(a, b)   { return Math.floor(rand(a, b + 1)); }
  function ls(k, def)      { try { return localStorage.getItem(k) ?? def; } catch { return def; } }
  function lsSet(k, v)     { try { localStorage.setItem(k, v); } catch {} }
  function ss(k)           { try { return sessionStorage.getItem(k); } catch { return null; } }
  function ssSet(k, v)     { try { sessionStorage.setItem(k, v); } catch {} }

  /* ══════════════════════════════════════════════
     1 · SPRING THEME
  ══════════════════════════════════════════════ */
  const T = {
    name:     'Spring',
    codename: 'Blossom Drop',
    version:  `v1.${YEAR}`,

    /* Dark palette */
    accent:    '#f472b6',
    accent2:   '#86efac',
    accent3:   '#fbbf24',
    glow:      'rgba(244,114,182,.55)',
    glow2:     'rgba(134,239,172,.4)',
    bg:        '#0c0610',
    bgGrad: `radial-gradient(ellipse 80% 60% at 20% 30%, rgba(244,114,182,.16), transparent),
             radial-gradient(ellipse 60% 50% at 80% 70%, rgba(134,239,172,.13), transparent),
             radial-gradient(ellipse 40% 40% at 55% 60%, rgba(251,191,36,.07), transparent)`,
    orbColors: ['#f472b6', '#86efac', '#fbbf24'],

    /* Light palette */
    lightAccent:    '#be185d',
    lightAccent2:   '#16a34a',
    lightAccent3:   '#d97706',
    lightGlow:      'rgba(190,24,93,.28)',
    lightGlow2:     'rgba(22,163,74,.22)',
    lightBg:        '#fdf2f8',
    lightBgGrad: `radial-gradient(ellipse 80% 60% at 20% 30%, rgba(244,114,182,.12), transparent),
                  radial-gradient(ellipse 60% 50% at 80% 70%, rgba(134,239,172,.10), transparent)`,
    lightOrbColors: ['#f9a8d4', '#86efac', '#fde68a'],

    particle: 'petals',
    particleCount: 45,

    notes: [
      '🌸  Blossom Drop is live — spring has officially arrived',
      '🌺  Cherry-blossom petal rain now drifting across all pages',
      '🌿  Spring bloom counter unlocked in the widget panel',
      '☀️  Light mode now supported — toggle it in Settings',
      '🪙  Spring Credits earned by tapping the blossom button',
    ],
  };

  /* ══════════════════════════════════════════════
     1b · LIGHT MODE DETECTION
  ══════════════════════════════════════════════ */
  function isLightMode() {
    /* Check localStorage setting first, then system preference */
    const stored = ls('ck-lightmode', null);
    if (stored !== null) return stored === 'true';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  }

  function getLM() { return isLightMode(); }

  /* ══════════════════════════════════════════════
     2 · CSS INJECTION
  ══════════════════════════════════════════════ */
  function injectStyles() {
    const LM = getLM();
    /* Sync data-theme attr so external CSS files (light.css) work too */
    document.documentElement.setAttribute('data-theme', LM ? 'light' : 'dark');
    document.body && document.body.setAttribute('data-theme', LM ? 'light' : 'dark');
    const accent  = LM ? T.lightAccent  : T.accent;
    const accent2 = LM ? T.lightAccent2 : T.accent2;
    const accent3 = LM ? T.lightAccent3 : T.accent3;
    const glow    = LM ? T.lightGlow    : T.glow;
    const glow2   = LM ? T.lightGlow2   : T.glow2;
    const bg      = LM ? T.lightBg      : T.bg;
    const bgGrad  = LM ? T.lightBgGrad  : T.bgGrad;
    const orbC    = LM ? T.lightOrbColors : T.orbColors;

    /* Text colours */
    const textPrimary   = LM ? '#1e1b2e' : '#fff';
    const textSecondary = LM ? '#6b7280' : '#94a3b8';
    const textMuted     = LM ? '#9ca3af' : '#475569';
    const cardBg        = LM ? 'rgba(255,255,255,.82)' : 'rgba(4,2,14,.58)';
    const toastBg       = LM ? 'rgba(255,248,254,.97)' : 'rgba(6,4,18,.96)';
    const badgeBg       = LM ? 'rgba(255,255,255,.75)' : 'rgba(0,0,0,.55)';
    const creditsBtnBg  = LM
      ? `linear-gradient(135deg, #fce7f3, #f0fdf4)`
      : `linear-gradient(135deg, rgba(244,114,182,.15), rgba(134,239,172,.12))`;
    const creditsBtnBorder = LM ? `${accent}55` : `${accent}38`;

    const s = document.createElement('style');
    s.id = 'ck-styles';
    s.textContent = `

      /* ─── CSS Variable Overrides ──────────────── */
      :root {
        --accent : ${accent}  !important;
        --accent2: ${accent2} !important;
        --accent3: ${accent3} !important;
        --glow   : ${glow}    !important;
        --glow2  : ${glow2}   !important;
        --bg     : ${bg}      !important;
      }
      body { background: ${bg} !important; }
      .bg-gradient { background: ${bgGrad} !important; }
      .orb-1 { background: ${orbC[0]} !important; }
      .orb-2 { background: ${orbC[1]} !important; }
      .orb-3 { background: ${orbC[2]} !important; }

      /* Light-mode body text fix */
      ${LM ? `
      body, body * { color: inherit; }
      body { color: #1e1b2e !important; }
      ` : ''}

      /* ─── Particle Canvas ─────────────────────── */
      #ck-canvas {
        position: fixed; inset: 0;
        z-index: 2;
        pointer-events: none;
        opacity: ${LM ? '.55' : '1'};
      }

      /* ─── Season Badge ────────────────────────── */
      #ck-badge {
        position: fixed;
        bottom: 22px; left: 22px;
        z-index: 9998;
        display: inline-flex; align-items: center; gap: 7px;
        padding: 7px 14px;
        background: ${badgeBg};
        border: 1px solid ${accent}38;
        border-radius: 100px;
        font-size: .68rem; font-weight: 700; letter-spacing: .05em;
        text-transform: uppercase; color: ${accent};
        backdrop-filter: blur(14px);
        cursor: pointer;
        font-family: 'Segoe UI', system-ui, sans-serif;
        transition: border-color .2s, box-shadow .2s, transform .15s;
        user-select: none;
        box-shadow: ${LM ? '0 2px 12px rgba(244,114,182,.18)' : 'none'};
      }
      #ck-badge:hover {
        border-color: ${accent}70;
        box-shadow: 0 0 18px -4px ${glow};
        transform: translateY(-1px);
      }
      #ck-badge .ck-dot {
        width: 6px; height: 6px; border-radius: 50%;
        background: ${accent};
        animation: ck-pulse 2s ease-in-out infinite;
        flex-shrink: 0;
      }

      /* ─── Update Toast ────────────────────────── */
      #ck-toast {
        position: fixed;
        bottom: 62px; left: 22px;
        z-index: 9999;
        width: 310px;
        background: ${toastBg};
        border: 1px solid ${accent}28;
        border-left: 3px solid ${accent};
        border-radius: 14px;
        padding: 16px 18px;
        font-family: 'Segoe UI', system-ui, sans-serif;
        backdrop-filter: blur(22px);
        box-shadow: 0 16px 48px rgba(0,0,0,${LM ? '.12' : '.55'}), 0 0 40px -10px ${glow};
        opacity: 0;
        transform: translateY(14px);
        transition: opacity .4s cubic-bezier(.22,1,.36,1),
                    transform .4s cubic-bezier(.22,1,.36,1);
        pointer-events: none;
      }
      #ck-toast.ck-visible {
        opacity: 1; transform: translateY(0);
        pointer-events: auto;
      }
      #ck-toast .ck-th {
        display: flex; align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      #ck-toast .ck-tt {
        font-size: .78rem; font-weight: 800; color: ${textPrimary};
        display: flex; align-items: center; gap: 7px;
      }
      #ck-toast .ck-tv {
        font-size: .62rem; font-weight: 700;
        color: ${accent};
        background: ${accent}18;
        border: 1px solid ${accent}30;
        border-radius: 5px;
        padding: 2px 7px;
      }
      #ck-toast .ck-tx {
        width: 20px; height: 20px; border-radius: 50%;
        background: ${LM ? 'rgba(0,0,0,.06)' : 'rgba(255,255,255,.07)'};
        border: 1px solid ${LM ? 'rgba(0,0,0,.1)' : 'rgba(255,255,255,.1)'};
        cursor: pointer; color: ${textSecondary};
        font-size: .75rem;
        display: flex; align-items: center; justify-content: center;
        transition: background .2s;
        font-family: inherit; flex-shrink: 0;
      }
      #ck-toast .ck-tx:hover { background: ${LM ? 'rgba(0,0,0,.12)' : 'rgba(255,255,255,.14)'}; }
      #ck-toast .ck-div { height: 1px; background: ${accent}1e; margin: 8px 0; }
      #ck-toast .ck-note {
        font-size: .73rem; color: ${textSecondary};
        margin-bottom: 5px; line-height: 1.45;
        display: flex; align-items: flex-start; gap: 6px;
      }
      #ck-toast .ck-note::before {
        content: '▸'; color: ${accent};
        flex-shrink: 0; margin-top: 1px; font-size: .65rem;
      }
      #ck-toast .ck-note:last-child { margin-bottom: 0; }

      /* ─── Widget ──────────────────────────────── */
      #ck-widget {
        position: fixed;
        top: calc(70px + 14px); left: 20px;
        z-index: 89;
        display: flex; flex-direction: column;
        gap: 8px;
      }
      .ck-card {
        width: 176px;
        background: ${cardBg};
        border: 1px solid ${accent}22;
        border-radius: 12px;
        padding: 11px 13px;
        backdrop-filter: blur(16px);
        cursor: pointer;
        transition: border-color .25s, box-shadow .25s, transform .15s;
        font-family: 'Segoe UI', system-ui, sans-serif;
        user-select: none;
        box-shadow: ${LM ? '0 2px 10px rgba(244,114,182,.09)' : 'none'};
      }
      .ck-card[data-clickable="true"]:hover {
        border-color: ${accent}48;
        box-shadow: 0 4px 22px -6px ${glow};
        transform: translateX(2px);
      }
      .ck-card[data-clickable="false"] { cursor: default; }
      .ck-card .cw-lbl {
        font-size: .58rem; font-weight: 700; text-transform: uppercase;
        letter-spacing: .06em; color: ${accent};
        margin-bottom: 4px;
        display: flex; align-items: center; gap: 5px;
      }
      .ck-card .cw-val {
        font-size: 1.15rem; font-weight: 800;
        color: ${textPrimary}; line-height: 1.2;
        word-break: break-word;
      }
      .ck-card .cw-sub {
        font-size: .62rem; color: ${textMuted};
        margin-top: 3px;
      }
      .ck-card .cw-bar {
        height: 3px; background: ${LM ? 'rgba(0,0,0,.08)' : 'rgba(255,255,255,.07)'};
        border-radius: 2px; margin-top: 8px; overflow: hidden;
      }
      .ck-card .cw-fill {
        height: 100%;
        background: linear-gradient(90deg, ${accent}, ${accent2});
        border-radius: 2px;
        width: 0%; transition: width .9s cubic-bezier(.22,1,.36,1);
      }

      /* ─── Credits Button ──────────────────────── */
      #ck-credits-btn {
        width: 176px;
        background: ${creditsBtnBg};
        border: 1px solid ${creditsBtnBorder};
        border-radius: 12px;
        padding: 11px 13px;
        backdrop-filter: blur(16px);
        cursor: pointer;
        font-family: 'Segoe UI', system-ui, sans-serif;
        user-select: none;
        text-align: left;
        transition: border-color .25s, box-shadow .25s, transform .15s;
        box-shadow: ${LM ? '0 2px 10px rgba(244,114,182,.09)' : 'none'};
        position: relative;
        overflow: hidden;
      }
      #ck-credits-btn:hover:not(:disabled) {
        border-color: ${accent}58;
        box-shadow: 0 4px 22px -6px ${glow};
        transform: translateX(2px);
      }
      #ck-credits-btn:disabled {
        cursor: not-allowed;
        opacity: .55;
      }
      #ck-credits-btn .cbtn-lbl {
        font-size: .58rem; font-weight: 700; text-transform: uppercase;
        letter-spacing: .06em; color: ${accent};
        margin-bottom: 4px;
      }
      #ck-credits-btn .cbtn-val {
        font-size: 1.15rem; font-weight: 800;
        color: ${textPrimary}; line-height: 1.2;
      }
      #ck-credits-btn .cbtn-sub {
        font-size: .62rem; color: ${textMuted};
        margin-top: 3px;
      }
      #ck-credits-btn .cbtn-cd {
        font-size: .6rem; color: ${accent};
        margin-top: 4px; font-weight: 700;
        min-height: 12px;
      }

      /* ─── Tap sparkle burst ───────────────────── */
      .ck-sparkle {
        position: fixed;
        pointer-events: none;
        z-index: 9997;
        font-size: 1rem;
        animation: ck-spark-anim .65s ease-out forwards;
      }
      @keyframes ck-spark-anim {
        0%   { opacity:1; transform: translate(-50%,-50%) scale(1); }
        100% { opacity:0; transform: translate(-50%,-120%) scale(.4); }
      }

      /* ─── Light Mode Toggle (Settings icon area) ─ */
      #ck-lm-toggle {
        position: fixed;
        bottom: 22px; right: 22px;
        z-index: 9998;
        display: inline-flex; align-items: center; gap: 6px;
        padding: 7px 13px;
        background: ${badgeBg};
        border: 1px solid ${accent}38;
        border-radius: 100px;
        font-size: .68rem; font-weight: 700;
        color: ${accent};
        backdrop-filter: blur(14px);
        cursor: pointer;
        font-family: 'Segoe UI', system-ui, sans-serif;
        transition: border-color .2s, box-shadow .2s, transform .15s;
        user-select: none;
        letter-spacing: .04em;
        box-shadow: ${LM ? '0 2px 12px rgba(244,114,182,.18)' : 'none'};
      }
      #ck-lm-toggle:hover {
        border-color: ${accent}70;
        box-shadow: 0 0 18px -4px ${glow};
        transform: translateY(-1px);
      }

      /* ─── Keyframes ───────────────────────────── */
      @keyframes ck-pulse {
        0%,100% { opacity:1; transform:scale(1); }
        50%      { opacity:.35; transform:scale(.65); }
      }

      /* ─── Mobile ──────────────────────────────── */
      @media (max-width: 768px) {
        #ck-widget, #ck-credits-btn { display: none; }
        #ck-badge    { bottom: 14px; left: 14px; font-size: .62rem; padding: 6px 12px; }
        #ck-toast    { width: calc(100vw - 28px); left: 14px; bottom: 54px; }
        #ck-lm-toggle { bottom: 14px; right: 14px; font-size: .62rem; padding: 6px 12px; }
      }
    `;
    document.head.appendChild(s);
  }

  /* ══════════════════════════════════════════════
     3 · PARTICLE SYSTEM — PETALS + BUTTERFLIES
  ══════════════════════════════════════════════ */
  function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'ck-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let W, H;
    const pool = [];

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const PETAL_COLORS = ['#f9a8d4','#fbcfe8','#f472b6','#fde68a','#86efac','#d9f99d','#fff1f2'];

    function makePetal(burst) {
      return {
        type: 'petal',
        x: rand(0, W),
        y: burst ? rand(0, H) : -rand(10, 40),
        vx: rand(-.5, .5),
        vy: rand(.4, 1.1),
        size: rand(5, 13),
        angle: rand(0, Math.PI * 2),
        spin: rand(-.03, .03),
        alpha: rand(.4, .88),
        color: PETAL_COLORS[randInt(0, PETAL_COLORS.length - 1)],
        wobble: rand(0, Math.PI * 2),
      };
    }

    function makeButterfly() {
      return {
        type: 'butterfly',
        x: rand(-60, W + 60),
        y: rand(H * .1, H * .75),
        vx: rand(.35, .9) * (Math.random() > .5 ? 1 : -1),
        vy: rand(-.2, .2),
        size: rand(7, 13),
        flapT: rand(0, Math.PI * 2),
        alpha: rand(.35, .7),
        hue: randInt(300, 360),
      };
    }

    /* Seed pool */
    for (let i = 0; i < T.particleCount; i++) {
      pool.push(makePetal(true));
    }
    /* A handful of butterflies */
    for (let i = 0; i < 6; i++) {
      pool.push(makeButterfly());
    }

    function drawPetal(x, y, size, color, alpha, angle) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.ellipse(0, 0, size * .45, size, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawButterfly(x, y, size, alpha, hue, flapT) {
      const flap = Math.abs(Math.sin(flapT));
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(x, y);
      const c1 = `hsl(${hue},80%,72%)`;
      const c2 = `hsl(${(hue + 40) % 360},80%,65%)`;
      /* left wing */
      ctx.save();
      ctx.scale(-flap, 1);
      ctx.fillStyle = c1;
      ctx.shadowColor = c1; ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.ellipse(-size * .55, -size * .2, size * .75, size * .45, -0.4, 0, Math.PI * 2);
      ctx.fill();
      /* lower left */
      ctx.fillStyle = c2;
      ctx.beginPath();
      ctx.ellipse(-size * .45, size * .2, size * .5, size * .3, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      /* right wing */
      ctx.save();
      ctx.scale(flap, 1);
      ctx.fillStyle = c1;
      ctx.shadowColor = c1; ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.ellipse(size * .55, -size * .2, size * .75, size * .45, 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = c2;
      ctx.beginPath();
      ctx.ellipse(size * .45, size * .2, size * .5, size * .3, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      /* body */
      ctx.fillStyle = '#1e1b2e';
      ctx.globalAlpha = alpha * .6;
      ctx.beginPath();
      ctx.ellipse(0, 0, 1.5, size * .4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    let time = 0;
    function tick() {
      if (document.body && document.body.classList.contains('lqm')) {
        ctx.clearRect(0, 0, W, H);
        requestAnimationFrame(tick);
        return;
      }
      ctx.clearRect(0, 0, W, H);
      time++;
      pool.forEach((p, i) => {
        if (p.type === 'petal') {
          p.wobble += .018;
          p.x += p.vx + Math.sin(p.wobble) * .3;
          p.y += p.vy;
          p.angle += p.spin;
          if (p.y > H + 20) Object.assign(p, makePetal(false));
          drawPetal(p.x, p.y, p.size, p.color, p.alpha, p.angle);
        } else {
          p.flapT += .1;
          p.x += p.vx;
          p.y += p.vy + Math.sin(p.flapT * .25) * .4;
          if (p.x < -80)  p.x = W + 80;
          if (p.x > W + 80) p.x = -80;
          if (p.y < H * .05)  p.vy =  Math.abs(p.vy);
          if (p.y > H * .85)  p.vy = -Math.abs(p.vy);
          drawButterfly(p.x, p.y, p.size, p.alpha, p.hue, p.flapT);
        }
      });
      requestAnimationFrame(tick);
    }
    tick();
  }

  /* ══════════════════════════════════════════════
     4 · UPDATE TOAST
  ══════════════════════════════════════════════ */
  function createToast() {
    const toast = document.createElement('div');
    toast.id = 'ck-toast';
    toast.innerHTML = `
      <div class="ck-th">
        <div class="ck-tt">
          🌸 ${T.name.toUpperCase()} UPDATE
          <span class="ck-tv">${T.version}</span>
        </div>
        <button class="ck-tx" id="ck-toast-close" title="Dismiss">✕</button>
      </div>
      <div class="ck-div"></div>
      ${T.notes.map(n => `<div class="ck-note">${n}</div>`).join('')}
    `;
    document.body.appendChild(toast);

    let autoDismiss;
    function dismiss() {
      clearTimeout(autoDismiss);
      toast.classList.remove('ck-visible');
    }
    document.getElementById('ck-toast-close').addEventListener('click', dismiss);

    return {
      show() {
        toast.classList.add('ck-visible');
        autoDismiss = setTimeout(dismiss, 9000);
      },
      dismiss,
    };
  }

  /* ══════════════════════════════════════════════
     5 · SEASON BADGE
  ══════════════════════════════════════════════ */
  function mountBadge(toastCtrl) {
    const badge = document.createElement('div');
    badge.id = 'ck-badge';
    badge.title = `${T.codename} — ${T.version}  (click for patch notes)`;
    badge.innerHTML = `<div class="ck-dot"></div>🌸 ${T.codename}`;
    badge.addEventListener('click', () => toastCtrl.show());
    document.body.appendChild(badge);
  }

  /* ══════════════════════════════════════════════
     6 · CREDITS SYSTEM WITH ANTI-AUTOCLICKER
  ══════════════════════════════════════════════ */
  function mountCreditsButton() {
    /*
      Anti-autoclicker logic:
        – Track timestamps of last N clicks in a ring buffer
        – If any 3 clicks happen within 800ms → cooldown triggered
        – Cooldown grows: 5s → 15s → 45s → 120s (capped)
        – Human variance check: reject clicks < 180ms apart
        – Cooldown state persisted in localStorage so it survives refresh
    */
    const CLICK_WINDOW_MS  = 800;   // 3 clicks within this = bot-like
    const MIN_INTERVAL_MS  = 180;   // too fast = bot
    const MAX_CREDITS_TICK = 2;     // credits earned per valid click
    const COOLDOWN_LEVELS  = [5, 15, 45, 120]; // seconds

    let clickTimes = [];
    let cdLevel    = parseInt(ls('ck-cd-level', '0'));
    let cdUntil    = parseInt(ls('ck-cd-until', '0'));

    /* Credits are now stored in Firebase (falls back to localStorage if SDK
       not yet loaded). All reads/writes are async Promises. */
    function getCredits()  { return window.__ckFirebase.getCredits(); }
    function addCredits(n) { return window.__ckFirebase.addCredits(n); }

    function getRemainingCooldown() {
      return Math.max(0, Math.ceil((cdUntil - Date.now()) / 1000));
    }

    function triggerCooldown() {
      cdLevel = Math.min(cdLevel + 1, COOLDOWN_LEVELS.length - 1);
      const secs = COOLDOWN_LEVELS[cdLevel - 1] || COOLDOWN_LEVELS[0];
      cdUntil = Date.now() + secs * 1000;
      lsSet('ck-cd-level', cdLevel);
      lsSet('ck-cd-until', cdUntil);
      return secs;
    }

    const btn = document.createElement('button');
    btn.id = 'ck-credits-btn';
    btn.innerHTML = `
      <div class="cbtn-lbl">🪙 Spring Credits</div>
      <div class="cbtn-val" id="cbtn-val">… credits</div>
      <div class="cbtn-sub">Tap the blossom to earn</div>
      <div class="cbtn-cd" id="cbtn-cd"></div>
    `;

    const valEl = () => document.getElementById('cbtn-val');
    const cdEl  = () => document.getElementById('cbtn-cd');

    /* Load initial balance from Firebase (or localStorage fallback) */
    getCredits().then(n => {
      if (valEl()) valEl().textContent = n + ' credits';
    });

    /* Live-sync: whenever the DB value changes, update the display.
       This also picks up changes from other tabs/devices. */
    window.__ckFirebase.onCreditsChange(n => {
      if (valEl()) valEl().textContent = n + ' credits';
    });

    /* If Firebase SDK finishes loading after the button is already mounted,
       refresh the display immediately. */
    window.addEventListener('ck-firebase-ready', () => {
      getCredits().then(n => {
        if (valEl()) valEl().textContent = n + ' credits';
      });
      window.__ckFirebase.onCreditsChange(n => {
        if (valEl()) valEl().textContent = n + ' credits';
      });
    }, { once: true });

    /* Cooldown ticker */
    let cdTimer = null;
    function startCdTick() {
      clearInterval(cdTimer);
      cdTimer = setInterval(() => {
        const rem = getRemainingCooldown();
        if (rem <= 0) {
          clearInterval(cdTimer);
          btn.disabled = false;
          cdEl().textContent = '';
          /* Decay cooldown level over time if user was good */
          if (cdLevel > 0) {
            cdLevel = Math.max(0, cdLevel - 1);
            lsSet('ck-cd-level', cdLevel);
          }
        } else {
          btn.disabled = true;
          cdEl().textContent = `⏳ Cooldown: ${rem}s`;
        }
      }, 500);
    }

    /* Resume cooldown if page was refreshed mid-cooldown */
    if (getRemainingCooldown() > 0) {
      btn.disabled = true;
      cdEl && startCdTick();
    }

    /* Sparkle burst helper */
    function spawnSparkle(x, y) {
      const emojis = ['🌸','🌺','🌼','🌿','🍃','✨','💐'];
      const el = document.createElement('div');
      el.className = 'ck-sparkle';
      el.textContent = emojis[randInt(0, emojis.length - 1)];
      el.style.left = x + 'px';
      el.style.top  = y + 'px';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 700);
    }

    btn.addEventListener('click', function(e) {
      const now = Date.now();

      /* 1 — Hard cooldown active */
      if (getRemainingCooldown() > 0) return;

      /* 2 — Minimum human interval check */
      const last = clickTimes[clickTimes.length - 1] || 0;
      if (now - last < MIN_INTERVAL_MS) {
        const secs = triggerCooldown();
        cdEl().textContent = `⚠️ Too fast! Cooldown: ${secs}s`;
        btn.disabled = true;
        startCdTick();
        clickTimes = [];
        return;
      }

      /* 3 — Record click */
      clickTimes.push(now);
      if (clickTimes.length > 5) clickTimes.shift();

      /* 4 — Check for rapid burst (3 clicks in CLICK_WINDOW_MS) */
      const recent = clickTimes.filter(t => now - t < CLICK_WINDOW_MS);
      if (recent.length >= 3) {
        const secs = triggerCooldown();
        cdEl().textContent = `🌿 Slow down! Cooldown: ${secs}s`;
        btn.disabled = true;
        startCdTick();
        clickTimes = [];
        return;
      }

      /* 5 — Valid click — award credits (Firebase async) */
      const earned = randInt(1, MAX_CREDITS_TICK);
      btn.disabled = true;                // prevent double-tap during write
      addCredits(earned).then(newTotal => {
        valEl().textContent = newTotal + ' credits';
        btn.disabled = (getRemainingCooldown() > 0);
      }).catch(() => {
        /* If DB write fails just re-enable */
        btn.disabled = (getRemainingCooldown() > 0);
      });

      /* Tiny feedback */
      const rect = btn.getBoundingClientRect();
      spawnSparkle(
        rect.left + rand(20, rect.width - 20),
        rect.top  + rand(10, rect.height - 10)
      );

      /* Decay cooldown level on legit click after a while */
      if (clickTimes.length === 1 && cdLevel > 0) {
        cdLevel = Math.max(0, cdLevel - 1);
        lsSet('ck-cd-level', cdLevel);
      }
    });

    /* Mount below widget cards */
    const widget = document.getElementById('ck-widget');
    if (widget) widget.appendChild(btn);
    else document.body.appendChild(btn);

    /* Kick off tick if already in cooldown */
    if (getRemainingCooldown() > 0) startCdTick();
  }

  /* ══════════════════════════════════════════════
     7 · FEATURE WIDGET
  ══════════════════════════════════════════════ */
  function mountWidget() {
    const container = document.createElement('div');
    container.id = 'ck-widget';

    /* Determine spring progress */
    const sprStart = new Date(YEAR, 2, 20);  // Mar 20
    const sprEnd   = new Date(YEAR, 5, 20);  // Jun 20
    const sprPct   = Math.max(0, Math.min(100,
      Math.round(((NOW - sprStart) / (sprEnd - sprStart)) * 100)
    ));
    const sprDaysLeft = Math.max(0, Math.ceil((sprEnd - NOW) / 86400000));

    /* ── Card: Spring Season Progress ── */
    const cardA = document.createElement('div');
    cardA.className = 'ck-card';
    cardA.dataset.clickable = 'false';
    cardA.title = 'How far through spring we are';
    cardA.innerHTML = `
      <div class="cw-lbl">🌱 Spring Progress</div>
      <div class="cw-val">${sprPct}% through</div>
      <div class="cw-sub">${sprDaysLeft} days left in spring</div>
      <div class="cw-bar"><div class="cw-fill" id="ck-spr-bar"></div></div>
    `;
    container.appendChild(cardA);

    /* ── Card: Bloom Garden ── */
    const cardB = document.createElement('div');
    cardB.className = 'ck-card';
    cardB.dataset.clickable = 'true';
    cardB.title = 'Click to plant a bloom in your spring garden';
    const blooms = () => parseInt(ls('ck-blooms', '0'));
    cardB.innerHTML = `
      <div class="cw-lbl">🌺 My Garden</div>
      <div class="cw-val">${blooms()} bloom${blooms() !== 1 ? 's' : ''}</div>
      <div class="cw-sub">${blooms() >= 20 ? '🌷 Garden is FULL' : 'Tap to plant!'}</div>
    `;
    cardB.addEventListener('click', () => {
      const n = blooms() + 1;
      lsSet('ck-blooms', n);
      cardB.querySelector('.cw-val').textContent = n + ' bloom' + (n !== 1 ? 's' : '');
      cardB.querySelector('.cw-sub').textContent =
        n >= 20 ? '🌷 Garden is FULL!' : n >= 10 ? '🌸 Beautiful garden!' : 'Keep planting!';
    });
    container.appendChild(cardB);

    /* ── Card: Daily Mood ── */
    const cardC = document.createElement('div');
    cardC.className = 'ck-card';
    cardC.dataset.clickable = 'true';
    cardC.title = 'Tap for a springtime vibe check';
    cardC.innerHTML = `
      <div class="cw-lbl">☀️ Spring Vibe</div>
      <div class="cw-val">Tap me 🌸</div>
      <div class="cw-sub">Get your daily boost</div>
    `;
    cardC.addEventListener('click', () => {
      const pool = [
        '🌸 Blooming day ahead!',
        '🌿 Fresh start energy!',
        '☀️ Sunshine luck is live!',
        '🦋 Big wins incoming!',
        '🌺 Spring favours the bold!',
        '🌼 Nature\'s on your side!',
        '🍀 Lucky petal found!',
      ];
      cardC.querySelector('.cw-val').textContent = pool[randInt(0, pool.length - 1)];
      cardC.querySelector('.cw-sub').textContent = 'Refreshed!';
    });
    container.appendChild(cardC);

    document.body.appendChild(container);

    /* Animate spring bar */
    setTimeout(() => {
      const bar = document.getElementById('ck-spr-bar');
      if (bar) bar.style.width = sprPct + '%';
    }, 600);
  }

  

  /* ══════════════════════════════════════════════
     9 · BOOTSTRAP
  ══════════════════════════════════════════════ */
  function boot() {
    initParticles();
    mountWidget();
    mountCreditsButton();
    const toastCtrl = createToast();
    mountBadge(toastCtrl);

    if (!ss('ck-shown')) {
      ssSet('ck-shown', '1');
      setTimeout(() => toastCtrl.show(), 1300);
    }
  }

  injectStyles();

  /* ── Global Low Quality Mode ──────────────────────────
     Reads localStorage on every page that loads update.js.
     body.lqm kills animations, backdrop-filters, orbs, and
     the petal canvas without touching any other behaviour.
  ─────────────────────────────────────────────────────── */
  (function injectLQMStyles() {
    const s = document.createElement('style');
    s.id = 'ck-lqm-styles';
    s.textContent = `
      body.lqm .bg-gradient,
      body.lqm .orb,
      body.lqm .grid-overlay,
      body.lqm #particles,
      body.lqm #ck-canvas { display: none !important; }

      body.lqm *,
      body.lqm *::before,
      body.lqm *::after {
        animation: none !important;
        transition: none !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        will-change: auto !important;
      }
      body.lqm .navbar { background: rgba(10,10,15,.97) !important; }
      body.lqm .settings-card,
      body.lqm .profile-card { background: rgba(255,255,255,.06) !important; }
      body[data-theme="light"].lqm .settings-card,
      body[data-theme="light"].lqm .profile-card { background: rgba(255,255,255,.92) !important; }
      body[data-theme="light"].lqm .navbar { background: rgba(10,10,15,.97) !important; }
    `;
    document.head.appendChild(s);
  })();

  /* Apply LQM immediately from localStorage on every page */
  function ckApplyLQM(on) {
    document.body && document.body.classList.toggle('lqm', on);
    try { localStorage.setItem('aightbet-lqm', on ? 'true' : 'false'); } catch {}
  }
  window.__ckApplyLQM = ckApplyLQM;

  try {
    if (localStorage.getItem('aightbet-lqm') === 'true') {
      if (document.body) document.body.classList.add('lqm');
      else document.addEventListener('DOMContentLoaded', () => document.body.classList.add('lqm'));
    }
  } catch {}

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }


  // Sync theme when profile.html toggle fires
window.addEventListener('ck-theme-changed', function() {
  const old = document.getElementById('ck-styles');
  if (old) old.remove();
  injectStyles();
});
})();
