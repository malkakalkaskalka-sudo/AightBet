

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
  function lsGet()  { return parseInt(localStorage.getItem('ck-xp') || '0'); }
  function lsAdd(n) {
    var v = lsGet() + n;
    localStorage.setItem('ck-xp', v);
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
  loadScript(CDN + 'firebase-app-compat.js', function() {
    loadScript(CDN + 'firebase-database-compat.js', function() {
      loadScript(CDN + 'firebase-auth-compat.js', function() {
        try {
          if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

          firebase.auth().onAuthStateChanged(function(user) {
            var uid;
            if (user) {
              uid = user.uid;
            } else {
              firebase.auth().signInAnonymously().catch(function(e) {
                console.warn('[CK] Anon sign-in failed', e);
              });
              return;
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
     1 · SUMMER THEME
  ══════════════════════════════════════════════ */
  const T = {
    name:     'Summer',
    codename: 'Solstice Blaze',
    version:  `v2.${YEAR}`,

    /* Light palette (summer defaults to LIGHT) */
    accent:    '#ff6b6b',   // coral red
    accent2:   '#06b6d4',   // aqua / ocean cyan
    accent3:   '#f97316',   // sunset orange
    glow:      'rgba(255,107,107,.60)',
    glow2:     'rgba(6,182,212,.45)',
    bg:        '#fff8f0',   // warm sand
    bgGrad: `radial-gradient(ellipse 90% 60% at 15% 10%, rgba(255,200,100,.30), transparent),
             radial-gradient(ellipse 70% 50% at 85% 20%, rgba(6,182,212,.20), transparent),
             radial-gradient(ellipse 50% 60% at 50% 90%, rgba(255,107,107,.16), transparent)`,
    orbColors: ['#ffd166', '#06b6d4', '#ff6b6b'],

    /* Dark palette */
    darkAccent:    '#ff8e8e',
    darkAccent2:   '#22d3ee',
    darkAccent3:   '#fb923c',
    darkGlow:      'rgba(255,142,142,.55)',
    darkGlow2:     'rgba(34,211,238,.40)',
    darkBg:        '#080c10',
    darkBgGrad: `radial-gradient(ellipse 80% 55% at 20% 15%, rgba(255,107,107,.15), transparent),
                 radial-gradient(ellipse 60% 50% at 80% 25%, rgba(6,182,212,.14), transparent),
                 radial-gradient(ellipse 40% 45% at 50% 85%, rgba(251,115,22,.10), transparent)`,
    darkOrbColors: ['#ffd166', '#22d3ee', '#ff8e8e'],

    particle: 'sunrays',
    particleCount: 50,

    notes: [
      '🌊  Solstice Blaze is live — surf season has arrived',
      '🏄  Coral & aqua particles now lighting up every wave',
      '🏖️  Summer Heat Meter unlocked in the widget panel',
      '🌊  Surf Score live — tap to ride the wave & earn points',
      '🌴  Level up your vibe by scoring every day',
    ],
  };

  /* ══════════════════════════════════════════════
     1b · LIGHT MODE DETECTION
     (Summer defaults to LIGHT; dark is the override)
  ══════════════════════════════════════════════ */
  function isLightMode() {
    const stored = ls('ck-lightmode', null);
    if (stored !== null) return stored === 'true';
    /* Summer default: light unless system says dark */
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return false;
    return true;
  }

  function getLM() { return isLightMode(); }

  /* ══════════════════════════════════════════════
     2 · CSS INJECTION
  ══════════════════════════════════════════════ */
  function injectStyles() {
    const LM = getLM();
    document.documentElement.setAttribute('data-theme', LM ? 'light' : 'dark');
    document.body && document.body.setAttribute('data-theme', LM ? 'light' : 'dark');

    const accent  = LM ? T.accent  : T.darkAccent;
    const accent2 = LM ? T.accent2 : T.darkAccent2;
    const accent3 = LM ? T.accent3 : T.darkAccent3;
    const glow    = LM ? T.glow    : T.darkGlow;
    const glow2   = LM ? T.glow2   : T.darkGlow2;
    const bg      = LM ? T.bg      : T.darkBg;
    const bgGrad  = LM ? T.bgGrad  : T.darkBgGrad;
    const orbC    = LM ? T.orbColors : T.darkOrbColors;

    /* Text colours */
    const textPrimary   = LM ? '#1a0a0a' : '#fff0f0';
    const textSecondary = LM ? '#9d2a2a' : '#ffc2c2';
    const textMuted     = LM ? '#c44b4b' : '#e87777';
    const cardBg        = LM ? 'rgba(255,248,240,.90)' : 'rgba(12,4,4,.62)';
    const toastBg       = LM ? 'rgba(255,253,250,.98)' : 'rgba(14,4,4,.97)';
    const badgeBg       = LM ? 'rgba(255,248,240,.80)' : 'rgba(0,0,0,.58)';
    const creditsBtnBg  = LM
      ? `linear-gradient(135deg, #ffe8e8, #cffafe)`
      : `linear-gradient(135deg, rgba(255,107,107,.18), rgba(6,182,212,.14))`;
    const creditsBtnBorder = LM ? `${accent}60` : `${accent}40`;

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

      ${LM ? `
      body, body * { color: inherit; }
      body { color: #1c1207 !important; }
      ` : ''}

      /* ─── Particle Canvas ─────────────────────── */
      #ck-canvas {
        position: fixed; inset: 0;
        z-index: 2;
        pointer-events: none;
        opacity: ${LM ? '.65' : '1'};
      }

      /* ─── Update Toast ────────────────────────── */
      #ck-toast {
        position: fixed;
        bottom: 62px; left: 22px;
        z-index: 9999;
        width: 318px;
        background: ${toastBg};
        border: 1px solid ${accent}30;
        border-left: 3px solid ${accent};
        border-radius: 16px;
        padding: 16px 18px;
        font-family: 'Segoe UI', system-ui, sans-serif;
        backdrop-filter: blur(24px);
        box-shadow: 0 18px 52px rgba(0,0,0,${LM ? '.10' : '.60'}), 0 0 44px -10px ${glow};
        opacity: 0;
        transform: translateY(16px);
        transition: opacity .38s cubic-bezier(.22,1,.36,1),
                    transform .38s cubic-bezier(.22,1,.36,1);
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
        background: ${accent}1c;
        border: 1px solid ${accent}32;
        border-radius: 5px;
        padding: 2px 7px;
      }
      #ck-toast .ck-tx {
        width: 20px; height: 20px; border-radius: 50%;
        background: ${LM ? 'rgba(0,0,0,.06)' : 'rgba(255,255,255,.07)'};
        border: 1px solid ${LM ? 'rgba(0,0,0,.10)' : 'rgba(255,255,255,.10)'};
        cursor: pointer; color: ${textSecondary};
        font-size: .75rem;
        display: flex; align-items: center; justify-content: center;
        transition: background .2s;
        font-family: inherit; flex-shrink: 0;
      }
      #ck-toast .ck-tx:hover { background: ${LM ? 'rgba(0,0,0,.12)' : 'rgba(255,255,255,.14)'}; }
      #ck-toast .ck-div { height: 1px; background: ${accent}20; margin: 8px 0; }
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
        border: 1px solid ${accent}25;
        border-radius: 14px;
        padding: 11px 13px;
        backdrop-filter: blur(18px);
        cursor: pointer;
        transition: border-color .25s, box-shadow .25s, transform .15s;
        font-family: 'Segoe UI', system-ui, sans-serif;
        user-select: none;
        box-shadow: ${LM ? `0 2px 14px rgba(245,158,11,.12)` : 'none'};
      }
      .ck-card[data-clickable="true"]:hover {
        border-color: ${accent}50;
        box-shadow: 0 4px 24px -6px ${glow};
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
        background: linear-gradient(90deg, ${accent}, ${accent3});
        border-radius: 2px;
        width: 0%; transition: width .9s cubic-bezier(.22,1,.36,1);
      }

      /* ─── Credits Button ──────────────────────── */
      #ck-credits-btn {
        width: 176px;
        background: ${creditsBtnBg};
        border: 1px solid ${creditsBtnBorder};
        border-radius: 14px;
        padding: 11px 13px;
        backdrop-filter: blur(18px);
        cursor: pointer;
        font-family: 'Segoe UI', system-ui, sans-serif;
        user-select: none;
        text-align: left;
        transition: border-color .25s, box-shadow .25s, transform .15s;
        box-shadow: ${LM ? `0 2px 14px rgba(245,158,11,.12)` : 'none'};
        position: relative;
        overflow: hidden;
      }
      #ck-credits-btn:hover:not(:disabled) {
        border-color: ${accent}60;
        box-shadow: 0 4px 24px -6px ${glow};
        transform: translateX(2px);
      }
      #ck-credits-btn:disabled {
        cursor: not-allowed;
        opacity: .50;
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
        0%   { opacity:1; transform: translate(-50%,-50%) scale(1.1); }
        100% { opacity:0; transform: translate(-50%,-130%) scale(.3); }
      }


      @media (orientation: landscape) and (max-width: 1024px) {
        #ck-widget, #ck-credits-btn, #ck-toast { display: none !important; }
      }

      /* ─── Keyframes ───────────────────────────── */
      @keyframes ck-pulse {
        0%,100% { opacity:1; transform:scale(1); }
        50%      { opacity:.3; transform:scale(.6); }
      }
      @keyframes ck-sunpulse {
        0%,100% { box-shadow: 0 0 18px -4px ${glow}; }
        50%      { box-shadow: 0 0 34px -2px ${glow}; }
      }

      @media (orientation: landscape) and (max-width: 1024px) {
        #ck-widget,
        #ck-credits-btn,
        #ck-badge,
        #ck-toast,
        .ck-sparkle,
        #rec-fab {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(s);
  }

  /* ══════════════════════════════════════════════
     3 · PARTICLE SYSTEM — SUNRAYS + FIREFLIES
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

    /* Warm sun-ray dust motes */
    const RAY_COLORS = ['#ff6b6b','#ffd166','#06b6d4','#ff9f43','#ff8e8e','#cffafe','#fff0f0'];

    function makeMote(burst) {
      return {
        type: 'mote',
        x: rand(0, W),
        y: burst ? rand(0, H) : rand(-20, -5),
        vx: rand(-.3, .3),
        vy: rand(.25, .75),
        size: rand(2, 7),
        alpha: rand(.25, .75),
        color: RAY_COLORS[randInt(0, RAY_COLORS.length - 1)],
        wobble: rand(0, Math.PI * 2),
        pulse: rand(0, Math.PI * 2),
      };
    }

    /* Fireflies — teal/cyan glow dots */
    function makeFirefly() {
      return {
        type: 'firefly',
        x: rand(0, W),
        y: rand(H * .2, H * .95),
        vx: rand(-.4, .4),
        vy: rand(-.25, .25),
        size: rand(2.5, 5),
        alpha: rand(.4, .9),
        phase: rand(0, Math.PI * 2),
        hue: randInt(165, 200),  // aqua-cyan range
      };
    }

    /* Seed pool */
    for (let i = 0; i < T.particleCount; i++) pool.push(makeMote(true));
    for (let i = 0; i < 18; i++) pool.push(makeFirefly());

    function drawMote(x, y, size, color, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = size * 2.5;
      ctx.beginPath();
      ctx.arc(x, y, size * .5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawFirefly(x, y, size, alpha, hue) {
      const color = `hsl(${hue},90%,65%)`;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.shadowColor = color;
      ctx.shadowBlur = size * 5;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      /* inner bright core */
      ctx.globalAlpha = alpha * 1.4;
      ctx.fillStyle = '#fff';
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(x, y, size * .4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    /* ── Blazing Sun (top-right corner) ── */
    function drawSun(t) {
      const LM   = isLightMode();
      const SX   = W - 72;   // centre x — hugs top-right corner
      const SY   = 68;       // centre y
      const R    = 38;       // core radius
      const pulse = 1 + 0.06 * Math.sin(t * 0.04);   // gentle breathing

      /* ── outer halo layers ── */
      const haloSizes  = [R * 3.8, R * 2.8, R * 2.0];
      const haloAlphas = LM ? [0.08, 0.13, 0.18] : [0.12, 0.18, 0.25];
      haloSizes.forEach((hr, i) => {
        const g = ctx.createRadialGradient(SX, SY, 0, SX, SY, hr * pulse);
        g.addColorStop(0,   `rgba(255,220,60,${haloAlphas[i]})`);
        g.addColorStop(0.5, `rgba(255,140,40,${haloAlphas[i] * 0.5})`);
        g.addColorStop(1,   'rgba(255,100,30,0)');
        ctx.save();
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(SX, SY, hr * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      /* ── rotating rays ── */
      const NUM_RAYS  = 12;
      const RAY_ROT   = t * 0.008;   // slow spin
      ctx.save();
      ctx.translate(SX, SY);
      ctx.rotate(RAY_ROT);
      for (let i = 0; i < NUM_RAYS; i++) {
        const angle   = (i / NUM_RAYS) * Math.PI * 2;
        const rayLen  = (i % 2 === 0 ? R * 2.0 : R * 1.4) * pulse;
        const rayW    = i % 2 === 0 ? 3.5 : 2;
        const alpha   = LM ? 0.55 : 0.70;
        ctx.save();
        ctx.rotate(angle);
        const rg = ctx.createLinearGradient(R * 0.9, 0, R * 0.9 + rayLen, 0);
        rg.addColorStop(0,   `rgba(255,230,80,${alpha})`);
        rg.addColorStop(0.5, `rgba(255,170,40,${alpha * 0.6})`);
        rg.addColorStop(1,   'rgba(255,120,30,0)');
        ctx.strokeStyle = rg;
        ctx.lineWidth   = rayW;
        ctx.lineCap     = 'round';
        ctx.beginPath();
        ctx.moveTo(R * 0.95, 0);
        ctx.lineTo(R * 0.95 + rayLen, 0);
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();

      /* ── glowing core ── */
      const cg = ctx.createRadialGradient(SX - R*0.2, SY - R*0.2, 0, SX, SY, R * pulse);
      cg.addColorStop(0,   '#fffde0');
      cg.addColorStop(0.3, '#ffe040');
      cg.addColorStop(0.7, '#ffaa20');
      cg.addColorStop(1,   '#ff7010');
      ctx.save();
      ctx.shadowColor = '#ffcc00';
      ctx.shadowBlur  = LM ? 28 : 44;
      ctx.fillStyle   = cg;
      ctx.beginPath();
      ctx.arc(SX, SY, R * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      /* ── bright specular highlight ── */
      ctx.save();
      ctx.globalAlpha = LM ? 0.55 : 0.45;
      const sg = ctx.createRadialGradient(SX - R*0.35, SY - R*0.35, 0, SX - R*0.2, SY - R*0.2, R * 0.55);
      sg.addColorStop(0, '#ffffff');
      sg.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = sg;
      ctx.beginPath();
      ctx.arc(SX, SY, R * pulse, 0, Math.PI * 2);
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
      drawSun(time);
      pool.forEach((p) => {
        if (p.type === 'mote') {
          p.wobble += .016;
          p.pulse  += .04;
          p.x += p.vx + Math.sin(p.wobble) * .25;
          p.y += p.vy;
          const pulsedAlpha = p.alpha * (.7 + .3 * Math.sin(p.pulse));
          if (p.y > H + 15) Object.assign(p, makeMote(false));
          drawMote(p.x, p.y, p.size, p.color, pulsedAlpha);
        } else {
          /* firefly wanders + blinks */
          p.phase += .04;
          p.x += p.vx + Math.sin(p.phase * .7) * .35;
          p.y += p.vy + Math.cos(p.phase * .5) * .2;
          /* soft bounce off edges */
          if (p.x < 0)  p.vx =  Math.abs(p.vx);
          if (p.x > W)  p.vx = -Math.abs(p.vx);
          if (p.y < H * .1) p.vy =  Math.abs(p.vy);
          if (p.y > H * .98) p.vy = -Math.abs(p.vy);
          const blink = Math.max(0, Math.sin(p.phase * 1.8)) * p.alpha;
          drawFirefly(p.x, p.y, p.size, blink, p.hue);
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
          ☀️ ${T.name.toUpperCase()} UPDATE
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
     6 · CREDITS SYSTEM WITH ANTI-AUTOCLICKER
  ══════════════════════════════════════════════ */
  function mountCreditsButton() {
    const CLICK_WINDOW_MS  = 800;
    const MIN_INTERVAL_MS  = 180;
    const MAX_CREDITS_TICK = 2;
    const COOLDOWN_LEVELS  = [5, 15, 45, 120];

    let clickTimes = [];
    let cdLevel    = parseInt(ls('ck-cd-level', '0'));
    let cdUntil    = parseInt(ls('ck-cd-until', '0'));

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
      <div class="cbtn-lbl">🌊 Surf Score</div>
      <div class="cbtn-val" id="cbtn-val">… 🏄</div>
      <div class="cbtn-sub">Tap to ride the wave!</div>
      <div class="cbtn-cd" id="cbtn-cd"></div>
    `;

    const valEl = () => document.getElementById('cbtn-val');
    const cdEl  = () => document.getElementById('cbtn-cd');

    getCredits().then(n => {
      if (valEl()) valEl().textContent = n + ' 🏄';
    });

    window.__ckFirebase.onCreditsChange(n => {
      if (valEl()) valEl().textContent = n + ' 🏄';
    });

    window.addEventListener('ck-firebase-ready', () => {
      getCredits().then(n => {
        if (valEl()) valEl().textContent = n + ' 🏄';
      });
      window.__ckFirebase.onCreditsChange(n => {
        if (valEl()) valEl().textContent = n + ' 🏄';
      });
    }, { once: true });

    let cdTimer = null;
    function startCdTick() {
      clearInterval(cdTimer);
      cdTimer = setInterval(() => {
        const rem = getRemainingCooldown();
        if (rem <= 0) {
          clearInterval(cdTimer);
          btn.disabled = false;
          cdEl().textContent = '';
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

    if (getRemainingCooldown() > 0) {
      btn.disabled = true;
      cdEl && startCdTick();
    }

    /* Sparkle burst — summer emojis */
    function spawnSparkle(x, y) {
      const emojis = ['🌊','🏄','☀️','🌴','🍹','🐚','🌺','🦀','⛵','🌸'];
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

      if (getRemainingCooldown() > 0) return;

      const last = clickTimes[clickTimes.length - 1] || 0;
      if (now - last < MIN_INTERVAL_MS) {
        const secs = triggerCooldown();
        cdEl().textContent = `🌊 Whoa, too fast! Cooldown: ${secs}s`;
        btn.disabled = true;
        startCdTick();
        clickTimes = [];
        return;
      }

      clickTimes.push(now);
      if (clickTimes.length > 5) clickTimes.shift();

      const recent = clickTimes.filter(t => now - t < CLICK_WINDOW_MS);
      if (recent.length >= 3) {
        const secs = triggerCooldown();
        cdEl().textContent = `🏄 Paddle back! Cooldown: ${secs}s`;
        btn.disabled = true;
        startCdTick();
        clickTimes = [];
        return;
      }

      const earned = randInt(1, MAX_CREDITS_TICK);
      btn.disabled = true;
      addCredits(earned).then(newTotal => {
        valEl().textContent = newTotal + ' 🏄';
        btn.disabled = (getRemainingCooldown() > 0);
      }).catch(() => {
        btn.disabled = (getRemainingCooldown() > 0);
      });

      const rect = btn.getBoundingClientRect();
      spawnSparkle(
        rect.left + rand(20, rect.width - 20),
        rect.top  + rand(10, rect.height - 10)
      );

      if (clickTimes.length === 1 && cdLevel > 0) {
        cdLevel = Math.max(0, cdLevel - 1);
        lsSet('ck-cd-level', cdLevel);
      }
    });

    const widget = document.getElementById('ck-widget');
    if (widget) widget.appendChild(btn);
    else document.body.appendChild(btn);

    if (getRemainingCooldown() > 0) startCdTick();
  }

  /* ══════════════════════════════════════════════
     7 · FEATURE WIDGET
  ══════════════════════════════════════════════ */
  function mountWidget() {
    const container = document.createElement('div');
    container.id = 'ck-widget';

    const TZ = 'Europe/Riga';
    const _p = new Intl.DateTimeFormat('en-GB', {
      timeZone: TZ, year:'numeric', month:'2-digit', day:'2-digit',
      hour:'2-digit', minute:'2-digit', hour12:false
    }).formatToParts(new Date());
    const _g = k => parseInt(_p.find(x => x.type === k).value, 10);
    const RIGA_NOW = new Date(_g('year'), _g('month')-1, _g('day'), _g('hour'), _g('minute'));

    const yr       = RIGA_NOW.getFullYear();
    const sumStart = new Date(yr, 5, 1);    // Jun 1
    const sumEnd   = new Date(yr, 8, 1);    // Sep 1
    const MS_DAY   = 86400000;
    let sumPct, sumDaysLeft, sumStateLabel, sumSubLabel;

    if (RIGA_NOW >= sumStart && RIGA_NOW <= sumEnd) {
      sumPct        = Math.round(((RIGA_NOW - sumStart) / (sumEnd - sumStart)) * 100);
      sumDaysLeft   = Math.max(0, Math.ceil((sumEnd - RIGA_NOW) / MS_DAY));
      sumStateLabel = sumPct + '% through';
      sumSubLabel   = sumDaysLeft + ' day' + (sumDaysLeft !== 1 ? 's' : '') + ' left in summer';
    } else if (RIGA_NOW < sumStart) {
      const springStart = new Date(yr, 2, 20);
      sumPct        = Math.max(0, Math.min(100, Math.round(((RIGA_NOW - springStart) / (sumStart - springStart)) * 100)));
      sumDaysLeft   = Math.max(0, Math.ceil((sumStart - RIGA_NOW) / MS_DAY));
      sumStateLabel = sumDaysLeft + ' days until summer';
      sumSubLabel   = 'Countdown ' + sumPct + '% complete';
    } else {
      const nextSummer = new Date(yr + 1, 5, 1);
      sumPct        = Math.max(0, Math.min(100, Math.round(((RIGA_NOW - sumEnd) / (nextSummer - sumEnd)) * 100)));
      sumDaysLeft   = Math.max(0, Math.ceil((nextSummer - RIGA_NOW) / MS_DAY));
      sumStateLabel = sumDaysLeft + ' days until summer';
      sumSubLabel   = 'Countdown ' + sumPct + '% complete';
    }

    /* ── Card A: Summer Season Progress ── */
    const cardA = document.createElement('div');
    cardA.className = 'ck-card';
    cardA.dataset.clickable = 'false';
    cardA.title = 'Summer season progress / countdown';
    cardA.innerHTML = `
      <div class="cw-lbl">🌡️ Summer Progress</div>
      <div class="cw-val">${sumStateLabel}</div>
      <div class="cw-sub">${sumSubLabel}</div>
      <div class="cw-bar"><div class="cw-fill" id="ck-sum-bar"></div></div>
    `;
    container.appendChild(cardA);

    /* ── Card B: Beach Day Tracker ── */
    const cardB = document.createElement('div');
    cardB.className = 'ck-card';
    cardB.dataset.clickable = 'true';
    cardB.title = 'Click to log a beach day';
    const beachDays = () => parseInt(ls('ck-beach', '0'));
    cardB.innerHTML = `
      <div class="cw-lbl">🏖️ Beach Days</div>
      <div class="cw-val">${beachDays()} day${beachDays() !== 1 ? 's' : ''}</div>
      <div class="cw-sub">${beachDays() >= 20 ? '🌊 Legendary summer!' : 'Tap to log a beach day!'}</div>
    `;
    cardB.addEventListener('click', () => {
      const n = beachDays() + 1;
      lsSet('ck-beach', n);
      cardB.querySelector('.cw-val').textContent = n + ' day' + (n !== 1 ? 's' : '');
      cardB.querySelector('.cw-sub').textContent =
        n >= 20 ? '🌊 Legendary summer!' :
        n >= 10 ? '🏄 Surf legend vibes!' :
        n >= 5  ? '☀️ Sun-kissed!' : 'Keep it up!';
    });
    container.appendChild(cardB);

    /* ── Card C: Summer Vibe Check ── */
    const cardC = document.createElement('div');
    cardC.className = 'ck-card';
    cardC.dataset.clickable = 'true';
    cardC.title = 'Tap for a summer vibe check';
    cardC.innerHTML = `
      <div class="cw-lbl">🔥 Vibe Check</div>
      <div class="cw-val">Tap me ☀️</div>
      <div class="cw-sub">Get your daily heat</div>
    `;
    cardC.addEventListener('click', () => {
      const pool = [
        '🌅 Golden hour energy!',
        '🌊 Ride the wave today!',
        '🔥 You\'re on fire!',
        '🍹 Sipping on wins!',
        '🌴 Island mode: ON',
        '☀️ Max solar power!',
        '🏄 Big surf incoming!',
        '🌻 Radiating summer luck!',
      ];
      const chosen = pool[randInt(0, pool.length - 1)];
      cardC.querySelector('.cw-val').textContent = chosen;
      cardC.querySelector('.cw-sub').textContent = 'Recharged!';
      if (chosen === '🔥 You\'re on fire!') {
        window.__summerBlazeActive = Date.now();
      }
    });
    container.appendChild(cardC);

    document.body.appendChild(container);

    mountCreditsButton();

    /* Animate summer bar */
    setTimeout(() => {
      const bar = document.getElementById('ck-sum-bar');
      if (bar) bar.style.width = sumPct + '%';
    }, 600);
  }

  /* ══════════════════════════════════════════════
     9 · BOOTSTRAP
  ══════════════════════════════════════════════ */
  function boot() {
    initParticles();

    const isLandscapeMobile = window.matchMedia(
      '(orientation: landscape) and (max-width: 1024px)'
    ).matches;

    if (isLandscapeMobile) return;

    mountWidget();
    const toastCtrl = createToast();
    if (!ss('ck-shown')) {
      ssSet('ck-shown', '1');
      setTimeout(() => toastCtrl.show(), 1300);
    }
  }

  injectStyles();

  function ckApplyOrientationVisibility() {
    const hide = window.matchMedia(
      '(orientation: landscape) and (max-width: 1024px)'
    ).matches;

    ['ck-widget', 'ck-credits-btn', 'ck-toast', 'rec-fab']
      .forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = hide ? 'none' : '';
      });

    if (!hide && !document.getElementById('ck-widget')) {
      mountWidget();
      mountCreditsButton();
    }
  }

  window.addEventListener('resize', ckApplyOrientationVisibility);
  window.addEventListener('orientationchange', ckApplyOrientationVisibility);

  /* ── Global Low Quality Mode ───────────────── */
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
      body.lqm .navbar { background: rgba(255,248,240,.97) !important; }
      body.lqm .settings-card,
      body.lqm .profile-card { background: rgba(255,255,255,.06) !important; }
      body[data-theme="dark"].lqm .settings-card,
      body[data-theme="dark"].lqm .profile-card { background: rgba(255,255,255,.06) !important; }
      body[data-theme="dark"].lqm .navbar { background: rgba(8,12,16,.97) !important; }
    `;
    document.head.appendChild(s);
  })();

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

  window.addEventListener('ck-theme-changed', function() {
    const old = document.getElementById('ck-styles');
    if (old) old.remove();
    injectStyles();
  });
})();
