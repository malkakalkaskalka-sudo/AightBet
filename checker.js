(function(){
  // ── FAVICON: ensure every page has favicon.png (runs on ALL pages, even exempt ones) ──
  (function(){
    try{
      var add=function(){
        // Remove existing icon links to avoid duplicates / wrong paths
        var existing=document.querySelectorAll('link[rel="icon"],link[rel="shortcut icon"],link[rel="apple-touch-icon"],link[rel="apple-touch-icon-precomposed"]');
        for(var i=0;i<existing.length;i++){existing[i].parentNode.removeChild(existing[i]);}
        // Multiple sizes so the browser/OS picks a LARGE one wherever icons are shown
        // (tab favicon, bookmarks, home-screen, PWA install, share sheets, etc.)
        var sizes=[
          {rel:'icon',type:'image/png',sizes:'16x16',href:'favicon.png'},
          {rel:'icon',type:'image/png',sizes:'32x32',href:'favicon.png'},
          {rel:'icon',type:'image/png',sizes:'48x48',href:'favicon.png'},
          {rel:'icon',type:'image/png',sizes:'96x96',href:'favicon.png'},
          {rel:'icon',type:'image/png',sizes:'192x192',href:'favicon.png'},
          {rel:'icon',type:'image/png',sizes:'512x512',href:'favicon.png'},
          {rel:'shortcut icon',type:'image/png',href:'favicon.png'},
          {rel:'apple-touch-icon',sizes:'120x120',href:'favicon.png'},
          {rel:'apple-touch-icon',sizes:'152x152',href:'favicon.png'},
          {rel:'apple-touch-icon',sizes:'167x167',href:'favicon.png'},
          {rel:'apple-touch-icon',sizes:'180x180',href:'favicon.png'},
          {rel:'apple-touch-icon-precomposed',href:'favicon.png'}
        ];
        for(var j=0;j<sizes.length;j++){
          var s=sizes[j];
          var l=document.createElement('link');
          l.rel=s.rel;
          if(s.type)l.type=s.type;
          if(s.sizes)l.setAttribute('sizes',s.sizes);
          l.href=s.href;
          document.head.appendChild(l);
        }
      };
      if(document.head){add();}
      else{document.addEventListener('DOMContentLoaded',add);}
    }catch(e){}
  })();

  var page=window.location.pathname.split('/').pop().toLowerCase();
  var exempt=['ban.html','maintenance.html','support.html','index.html','recorder.html'];
  if(exempt.indexOf(page)!==-1)return;


/* ════════════════════════════════════════════════════════════
   LIMITED PRIZE ITEMS — Solar Eclipse intro + Sunburst Crown FX
   v2 — Absolutely UNHINGED visuals. Self-registering.
   ════════════════════════════════════════════════════════════ */
(function _registerLimitedPrizes(){

  /* ── Shared CSS (injected once) ───────────────────────── */
  if (!document.getElementById('ck-limited-prizes-css')) {
    var css = document.createElement('style');
    css.id = 'ck-limited-prizes-css';
    css.textContent = `
      /* ═════════ SOLAR ECLIPSE intro ═════════ */
      @keyframes se-stage{0%{opacity:0}5%,94%{opacity:1}100%{opacity:0}}
      .se-stage{position:fixed;inset:0;z-index:99998;background:radial-gradient(ellipse at center,#2a0700 0%,#0a0200 55%,#000 100%);overflow:hidden;pointer-events:none;animation:se-stage 5.8s ease forwards;perspective:1400px}

      /* heat-haze repeating scanlines */
      .se-warp{position:absolute;inset:-12%;background:repeating-linear-gradient(0deg,rgba(255,160,30,.045) 0,rgba(255,160,30,.045) 2px,transparent 2px,transparent 4px);mix-blend-mode:screen;animation:se-warp 5.8s linear infinite;opacity:.7}
      @keyframes se-warp{0%{transform:translateY(0) skewX(0)}50%{transform:translateY(-14px) skewX(.7deg)}100%{transform:translateY(0) skewX(0)}}

      /* horizon plasma glow */
      .se-horizon{position:absolute;left:-10%;right:-10%;bottom:0;height:60%;background:radial-gradient(ellipse at 50% 100%,#ff5a00 0%,#7a1400 35%,transparent 72%);opacity:0;animation:se-horizon 5.8s ease forwards;mix-blend-mode:screen}
      @keyframes se-horizon{0%{opacity:0;transform:scaleY(.15)}14%{opacity:1;transform:scaleY(1)}55%{opacity:.55}80%{opacity:.18}100%{opacity:0}}

      /* THE SUN */
      .se-sun{position:absolute;top:50%;left:50%;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff 0%,#ffe27a 18%,#ffb84a 42%,#ff7c2b 62%,#7a1400 86%,#000 100%);transform:translate(-50%,-50%) scale(0);box-shadow:0 0 260px 90px rgba(255,180,40,.95),0 0 520px 180px rgba(255,90,0,.55);animation:se-sun 5.8s cubic-bezier(.2,1.2,.4,1) forwards;filter:brightness(1.1)}
      @keyframes se-sun{
        0%{transform:translate(-50%,-50%) scale(0) rotate(0)}
        12%{transform:translate(-50%,-50%) scale(2.6) rotate(60deg);box-shadow:0 0 340px 100px rgba(255,200,80,1),0 0 680px 220px rgba(255,90,0,.85)}
        35%{transform:translate(-50%,-50%) scale(1.9) rotate(140deg)}
        50%{transform:translate(-50%,-50%) scale(.6) rotate(260deg);background:radial-gradient(circle,#000 56%,#ffd166 62%,#ff7c2b 70%,transparent 82%);box-shadow:0 0 200px 50px #ffd166,0 0 420px 130px rgba(255,140,40,.9),inset 0 0 70px 14px #000}
        62%{transform:translate(-50%,-50%) scale(.56) rotate(340deg);background:radial-gradient(circle,#000 60%,#ffe27a 64%,#ff3b0a 74%,transparent 86%);box-shadow:0 0 240px 60px #fff5b3,0 0 500px 160px #ff7c2b,inset 0 0 90px 18px #000}
        80%{transform:translate(-50%,-50%) scale(.54) rotate(460deg)}
        100%{transform:translate(-50%,-50%) scale(.52) rotate(560deg);opacity:0}
      }

      /* outer corona — rainbow plasma */
      .se-corona{position:absolute;top:50%;left:50%;width:760px;height:760px;border-radius:50%;background:conic-gradient(from 0deg,#ffe27a,#ff7c2b,#fff,#ffd166,#ff3b0a,#ffe27a,#fff5b3,#ff7c2b,#ffe27a);transform:translate(-50%,-50%) scale(0) rotate(0);filter:blur(3px) saturate(1.7);mix-blend-mode:screen;animation:se-corona 5.8s ease-out forwards;opacity:0}
      @keyframes se-corona{
        0%{transform:translate(-50%,-50%) scale(0) rotate(0);opacity:0}
        36%{transform:translate(-50%,-50%) scale(1.6) rotate(200deg);opacity:.85}
        52%{transform:translate(-50%,-50%) scale(3) rotate(420deg);opacity:1;filter:blur(2px) saturate(2.2)}
        72%{transform:translate(-50%,-50%) scale(3.9) rotate(760deg);opacity:.85}
        100%{transform:translate(-50%,-50%) scale(5) rotate(1120deg);opacity:0}
      }
      /* inner counter-spin corona */
      .se-corona2{position:absolute;top:50%;left:50%;width:560px;height:560px;border-radius:50%;background:conic-gradient(from 90deg,transparent 0deg,#fff 10deg,transparent 32deg,#ffe27a 90deg,transparent 112deg,#ff3b0a 180deg,transparent 200deg,#ffd166 270deg,transparent 292deg,#fff 350deg,transparent 360deg);transform:translate(-50%,-50%) scale(0) rotate(0);filter:blur(5px);mix-blend-mode:screen;animation:se-corona2 5.8s ease-out forwards;opacity:0}
      @keyframes se-corona2{
        0%{transform:translate(-50%,-50%) scale(0) rotate(0);opacity:0}
        42%{transform:translate(-50%,-50%) scale(2.2) rotate(-380deg);opacity:.95}
        66%{transform:translate(-50%,-50%) scale(3.2) rotate(-760deg);opacity:.7}
        100%{transform:translate(-50%,-50%) scale(4.2) rotate(-1120deg);opacity:0}
      }

      /* shockwave rings */
      .se-ring{position:absolute;top:50%;left:50%;border-radius:50%;border:6px solid #fff;transform:translate(-50%,-50%) scale(0);width:320px;height:320px;animation:se-ring 3.4s cubic-bezier(.1,.7,.3,1) forwards;mix-blend-mode:screen}
      .se-ring-1{animation-delay:.55s;border-color:#ffe27a;box-shadow:0 0 60px #ffe27a}
      .se-ring-2{animation-delay:.90s;border-color:#ff7c2b;box-shadow:0 0 80px #ff7c2b}
      .se-ring-3{animation-delay:1.20s;border-color:#fff5b3;box-shadow:0 0 100px #fff}
      .se-ring-4{animation-delay:1.55s;border-color:#ff3b0a;box-shadow:0 0 70px #ff3b0a;animation-duration:3.8s}
      .se-ring-5{animation-delay:1.90s;border-color:#fff;box-shadow:0 0 120px #fff,0 0 200px #ffd166;animation-duration:4.2s}
      @keyframes se-ring{0%{transform:translate(-50%,-50%) scale(0);opacity:1;border-width:8px}100%{transform:translate(-50%,-50%) scale(16);opacity:0;border-width:.5px}}

      /* solar prominence flares — 8 plasma jets */
      .se-flare{position:absolute;top:50%;left:50%;width:7px;height:0;background:linear-gradient(180deg,transparent 0%,#ff3b0a 35%,#ffe27a 70%,#fff 100%);transform-origin:50% 100%;opacity:0;filter:blur(2px);mix-blend-mode:screen;animation:se-flare 5.8s ease-out forwards}
      .se-flare:nth-child(1){animation-delay:.5s;transform:translate(-50%,-100%) rotate(0deg)}
      .se-flare:nth-child(2){animation-delay:.6s;transform:translate(-50%,-100%) rotate(45deg)}
      .se-flare:nth-child(3){animation-delay:.7s;transform:translate(-50%,-100%) rotate(90deg)}
      .se-flare:nth-child(4){animation-delay:.8s;transform:translate(-50%,-100%) rotate(135deg)}
      .se-flare:nth-child(5){animation-delay:.9s;transform:translate(-50%,-100%) rotate(180deg)}
      .se-flare:nth-child(6){animation-delay:1.0s;transform:translate(-50%,-100%) rotate(225deg)}
      .se-flare:nth-child(7){animation-delay:1.1s;transform:translate(-50%,-100%) rotate(270deg)}
      .se-flare:nth-child(8){animation-delay:1.2s;transform:translate(-50%,-100%) rotate(315deg)}
      @keyframes se-flare{0%{opacity:0;height:0}20%{opacity:1;height:560px}42%{opacity:.85;height:620px}72%{opacity:.35;height:360px}100%{opacity:0;height:0}}

      /* white-out + chromatic */
      .se-flash{position:absolute;inset:0;background:radial-gradient(circle at center,#fff 0%,#ffe27a 38%,transparent 78%);opacity:0;mix-blend-mode:screen;animation:se-flash 5.8s steps(1) forwards}
      @keyframes se-flash{0%,42%{opacity:0}45%,49%{opacity:1}52%,77%{opacity:0}79%,82%{opacity:.9}84%,100%{opacity:0}}
      .se-chroma{position:absolute;inset:0;mix-blend-mode:screen;opacity:0;background:linear-gradient(90deg,rgba(255,0,80,.22),transparent 50%,rgba(0,220,255,.22));animation:se-chroma 5.8s ease forwards}
      @keyframes se-chroma{0%,30%{opacity:0}45%,75%{opacity:1}100%{opacity:0}}

      /* the name itself */
      .se-name{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(.4) rotate(-6deg);font-family:'Segoe UI',system-ui,sans-serif;font-weight:900;font-size:clamp(2.2rem,8vw,6rem);letter-spacing:.22em;color:transparent;background:linear-gradient(135deg,#fff 0%,#fff5b3 22%,#ffe27a 42%,#ff7c2b 65%,#ff3b0a 85%,#fff 100%);background-size:320% 100%;-webkit-background-clip:text;background-clip:text;text-shadow:0 0 60px rgba(255,200,80,.95),0 0 120px rgba(255,90,0,.7);opacity:0;animation:se-name 5.8s cubic-bezier(.22,1,.36,1) forwards;white-space:nowrap;text-align:center;filter:drop-shadow(0 0 14px #ffd166) drop-shadow(0 0 36px #ff7c2b)}
      @keyframes se-name{
        0%,50%{opacity:0;transform:translate(-50%,-50%) scale(.4) rotate(-6deg);background-position:0% 50%}
        62%{opacity:1;transform:translate(-50%,-50%) scale(1.18) rotate(0deg);background-position:50% 50%}
        72%{opacity:1;transform:translate(-50%,-50%) scale(.98) rotate(0deg)}
        86%{opacity:1;transform:translate(-50%,-50%) scale(1) rotate(0deg);background-position:100% 50%}
        100%{opacity:0;transform:translate(-50%,-50%) scale(1.5) rotate(0deg);background-position:220% 50%}
      }

      /* shake */
      @keyframes se-shake{
        0%,100%{transform:translate(0,0)}
        10%{transform:translate(-9px,5px)}20%{transform:translate(8px,-6px)}
        30%{transform:translate(-7px,-5px)}40%{transform:translate(6px,6px)}
        50%{transform:translate(-5px,-3px)}60%{transform:translate(5px,4px)}
        70%{transform:translate(-3px,3px)}80%{transform:translate(3px,-4px)}90%{transform:translate(-2px,2px)}
      }

      /* ═════════ SUNBURST CROWN name fx ═════════ */
      .nfx-sunburst{position:relative;display:inline-block;isolation:isolate;padding:6px 26px;line-height:1.2}

      .nfx-sunburst .nfx-sb-corona{position:absolute;inset:-100% -50%;z-index:-3;border-radius:50%;background:conic-gradient(from 0deg,transparent 0deg,#ffe27a 18deg,#ff7c2b 50deg,transparent 78deg,transparent 130deg,#ffd166 160deg,#fff5b3 190deg,transparent 220deg,transparent 280deg,#ff3b0a 305deg,#ffe27a 335deg,transparent 360deg);filter:blur(9px) saturate(1.7);animation:nfx-sb-spin 7s linear infinite;opacity:.95;pointer-events:none}
      @keyframes nfx-sb-spin{to{transform:rotate(360deg)}}

      .nfx-sunburst .nfx-sb-corona2{position:absolute;inset:-65% -28%;z-index:-3;border-radius:50%;background:conic-gradient(from 180deg,transparent 0deg,#fff 12deg,transparent 36deg,#ffd166 90deg,transparent 120deg,#ff7c2b 200deg,transparent 240deg,#fff5b3 300deg,transparent 330deg);filter:blur(6px) saturate(1.5);animation:nfx-sb-spin-rev 5s linear infinite;opacity:.9;pointer-events:none;mix-blend-mode:screen}
      @keyframes nfx-sb-spin-rev{to{transform:rotate(-360deg)}}

      .nfx-sunburst .nfx-sb-rays{position:absolute;inset:-85% -32%;z-index:-3;border-radius:50%;background:repeating-conic-gradient(from 0deg,rgba(255,200,80,0) 0deg,rgba(255,220,120,.5) 3deg,rgba(255,200,80,0) 9deg);animation:nfx-sb-pulse 2.4s ease-in-out infinite;pointer-events:none;mix-blend-mode:screen}
      @keyframes nfx-sb-pulse{0%,100%{opacity:.45;transform:scale(1)}50%{opacity:.9;transform:scale(1.1)}}

      .nfx-sunburst .nfx-sb-haze{position:absolute;inset:-32% -18%;z-index:-2;background:radial-gradient(ellipse at center,rgba(255,200,80,.55) 0%,rgba(255,90,0,.25) 40%,transparent 72%);filter:blur(16px);animation:nfx-sb-haze 3s ease-in-out infinite alternate;pointer-events:none;mix-blend-mode:screen}
      @keyframes nfx-sb-haze{from{opacity:.6;transform:scale(.95)}to{opacity:1;transform:scale(1.12)}}

      .nfx-sunburst .nfx-sb-text{position:relative;background:linear-gradient(120deg,#fff 0%,#fff5b3 18%,#ffe27a 32%,#ffd166 48%,#ff7c2b 65%,#ff3b0a 80%,#ffe27a 92%,#fff 100%);background-size:320% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;font-weight:900;letter-spacing:.04em;text-shadow:0 0 24px rgba(255,210,80,.9),0 0 48px rgba(255,120,40,.6);filter:drop-shadow(0 0 10px rgba(255,200,80,.75)) drop-shadow(0 0 24px rgba(255,120,40,.6)) drop-shadow(0 0 38px rgba(255,60,0,.4));animation:nfx-sb-shimmer 3s linear infinite,nfx-sb-glow 1.6s ease-in-out infinite}
      @keyframes nfx-sb-shimmer{0%{background-position:0% 50%}100%{background-position:320% 50%}}
      @keyframes nfx-sb-glow{
        0%,100%{filter:drop-shadow(0 0 10px rgba(255,200,80,.75)) drop-shadow(0 0 24px rgba(255,120,40,.6)) drop-shadow(0 0 38px rgba(255,60,0,.4))}
        50%{filter:drop-shadow(0 0 22px #ffe27a) drop-shadow(0 0 44px #ffb84a) drop-shadow(0 0 76px #ff3b0a)}
      }

      .nfx-sunburst .nfx-sb-spark{position:absolute;top:50%;left:50%;font-size:.9em;color:#fffbe0;text-shadow:0 0 14px #ffd166,0 0 28px #ff7c2b,0 0 46px #fff5b3;animation:nfx-sb-orbit 4s linear infinite;pointer-events:none;z-index:-1;will-change:transform}
      .nfx-sunburst .nfx-sb-spark.s2{animation-duration:5.5s;animation-direction:reverse;font-size:.7em}
      .nfx-sunburst .nfx-sb-spark.s3{animation-duration:6.8s;font-size:.6em;color:#ffe27a;text-shadow:0 0 14px #ff3b0a,0 0 28px #ffd166}
      .nfx-sunburst .nfx-sb-spark.s4{animation-duration:3.2s;animation-direction:reverse;font-size:.55em}
      @keyframes nfx-sb-orbit{
        0%{transform:translate(-50%,-50%) rotate(0deg) translateX(64px) rotate(0deg);opacity:1}
        50%{opacity:.4}
        100%{transform:translate(-50%,-50%) rotate(360deg) translateX(64px) rotate(-360deg);opacity:1}
      }

      .nfx-sunburst .nfx-sb-ghost{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:6px 26px;pointer-events:none;font-weight:900;letter-spacing:.04em;animation:nfx-sb-ghost 2.6s ease-in-out infinite;z-index:-1}
      .nfx-sunburst .nfx-sb-ghost.g1{color:rgba(255,80,30,.55);transform:translate(3px,0);mix-blend-mode:screen;filter:blur(.5px)}
      .nfx-sunburst .nfx-sb-ghost.g2{color:rgba(255,220,80,.45);transform:translate(-3px,0);mix-blend-mode:screen;filter:blur(.5px)}
      @keyframes nfx-sb-ghost{0%,100%{transform:translate(2px,0)}50%{transform:translate(-2px,0)}}
    `;
    document.head.appendChild(css);
  }

  /* ── SOLAR ECLIPSE intro player ───────────────────────── */
  function playSolarEclipse(displayName) {
    var nm = (displayName || window.userName || 'PLAYER').toString().toUpperCase();
    var stage = document.createElement('div');
    stage.className = 'se-stage';
    stage.innerHTML =
      '<div class="se-warp"></div>' +
      '<div class="se-horizon"></div>' +
      '<div class="se-flare"></div><div class="se-flare"></div><div class="se-flare"></div><div class="se-flare"></div>' +
      '<div class="se-flare"></div><div class="se-flare"></div><div class="se-flare"></div><div class="se-flare"></div>' +
      '<div class="se-corona"></div>' +
      '<div class="se-corona2"></div>' +
      '<div class="se-sun"></div>' +
      '<div class="se-ring se-ring-1"></div>' +
      '<div class="se-ring se-ring-2"></div>' +
      '<div class="se-ring se-ring-3"></div>' +
      '<div class="se-ring se-ring-4"></div>' +
      '<div class="se-ring se-ring-5"></div>' +
      '<div class="se-chroma"></div>' +
      '<div class="se-flash"></div>' +
      '<div class="se-name">' + nm + '</div>';
    document.body.appendChild(stage);
    document.body.style.animation = 'se-shake .14s steps(2) 22';
    setTimeout(function(){
      stage.remove();
      document.body.style.animation = '';
    }, 5900);
  }

  /* ── SUNBURST CROWN name effect applier ───────────────── */
  function applySunburstCrown(el) {
    if (!el) return;
    if (el.classList.contains('nfx-sunburst')) return;
    el.classList.add('nfx-sunburst');
    var text = el.textContent;
    el.innerHTML =
      '<span class="nfx-sb-corona"></span>' +
      '<span class="nfx-sb-corona2"></span>' +
      '<span class="nfx-sb-rays"></span>' +
      '<span class="nfx-sb-haze"></span>' +
      '<span class="nfx-sb-ghost g1">' + text + '</span>' +
      '<span class="nfx-sb-ghost g2">' + text + '</span>' +
      '<span class="nfx-sb-text">' + text + '</span>' +
      '<span class="nfx-sb-spark">✦</span>' +
      '<span class="nfx-sb-spark s2">✧</span>' +
      '<span class="nfx-sb-spark s3">★</span>' +
      '<span class="nfx-sb-spark s4">✦</span>';
  }

  /* ── Expose globally so dispatchers can call ── */
  window.playSolarEclipse   = playSolarEclipse;
  window.applySunburstCrown = applySunburstCrown;

  /* ── Auto-hook into existing intro/name-fx dispatchers ── */
  var _origPlayIntro = window.playIntro;
  window.playIntro = function(val, name) {
    if (val === 'solar_eclipse') return playSolarEclipse(name);
    if (typeof _origPlayIntro === 'function') return _origPlayIntro.apply(this, arguments);
  };

  var _origApplyNameEffect = window.applyNameEffect;
  window.applyNameEffect = function(el, val) {
    if (val === 'sunburst_crown') return applySunburstCrown(el);
    if (typeof _origApplyNameEffect === 'function') return _origApplyNameEffect.apply(this, arguments);
  };

})();
  // ── MOBILE OPTIMIZATION: inject responsive CSS for all pages ──
  (function(){
    if(document.getElementById('mobile-opt-style'))return;
    var ms=document.createElement('style');
    ms.id='mobile-opt-style';
    ms.textContent=
    /* ── Base resets ── */
    '@media(max-width:768px){'+
      'html,body{overflow-x:hidden!important;-webkit-text-size-adjust:100%;max-width:100vw!important}'+
      '*{-webkit-tap-highlight-color:transparent;box-sizing:border-box!important}'+

    /* ── Prevent iOS zoom on focus ── */
      'input,select,textarea{font-size:16px!important;max-width:100%!important}'+

    /* ── Navbar ── */
      '.navbar{padding:0 12px!important;height:var(--nav-h-mobile,56px)!important}'+
      '.nav-logo span{font-size:.95rem!important}'+
      '.nav-links{display:none!important}'+
      '.nav-credits-desktop{display:none!important}'+
      '.hamburger{display:flex!important}'+
      '.nav-avatar{width:32px!important;height:32px!important}'+
      '.mobile-menu{width:100%!important;left:0!important;right:0!important;border-radius:0 0 16px 16px!important}'+

    /* ── Main content spacing ── */
      'main,.main{padding-top:calc(var(--nav-h-mobile,56px) + 8px)!important;padding-left:0!important;padding-right:0!important;width:100%!important;max-width:100vw!important;overflow-x:hidden!important}'+
      '.page-header{padding:16px 16px 8px!important}'+
      '.page-header h1{font-size:1.5rem!important}'+

    /* ── Grid layouts → single column ── */
      '.profile-container{grid-template-columns:1fr!important;gap:16px!important;padding:0 12px!important}'+
      '.settings-panel{gap:12px!important}'+

    /* ── Cards ── */
      '.profile-card{position:relative!important;top:auto!important}'+
      '.settings-card,.profile-card,.post-card,.card,[class*="card"]:not(.post-card):not(#mythic-slide){'+
        'border-radius:14px!important;padding:16px!important;max-width:100%!important}'+

    /* ── Hero section ── */
      '.hero{padding:40px 16px 32px!important;min-height:auto!important}'+
      '.hero h1,.hero-title{font-size:2rem!important;line-height:1.2!important}'+
      '.hero-sub{font-size:.9rem!important}'+
      '.hero-stats{flex-wrap:wrap!important;gap:10px!important;justify-content:center!important}'+
      '.hero-actions{flex-direction:column!important;gap:10px!important;align-items:stretch!important}'+
      '.hero-actions a,.hero-actions button{width:100%!important;text-align:center!important;justify-content:center!important}'+

    /* ── Game/case grids (lobby) ── */
      '.case-grid,.cases-grid,.game-grid,[class*="-grid"]:not(.number-grid):not(.zero-row):not(.outside-bets):not(.outside-bets-2):not(.rules-grid):not(.stats-grid):not(.store-grid):not(.bg-gradient):not(.grid-overlay):not(.mines-grid):not(.tower-grid):not(.towers-grid):not(.keno-grid):not(.plinko-grid):not(.slot-grid):not(.slots-grid){'+
        'grid-template-columns:repeat(2,1fr)!important;gap:10px!important;padding:0 12px!important}'+

    /* ══════════════════════════════════════════════ */
    /* ═══ GAME PAGES — PREVENT DIV OVERLAP ═══════ */
    /* ══════════════════════════════════════════════ */

    /* ── Universal game shell: stack everything vertically, kill side-by-side overlap ── */
      '.game-page,.game-container,.game-wrapper,.game-layout,.game-stage,.game-board-wrap,'+
      '.game-area,.game-main,.game-content,.game-shell,.game-root,.game-view,'+
      '.roulette-container,.roulette-layout,.roulette-game,.roulette-page,.roulette-wrap,'+
      '.blackjack-container,.blackjack-layout,.bj-container,.bj-layout,.bj-page,.bj-wrap,'+
      '.plinko-container,.plinko-layout,.plinko-game,.plinko-stage,.plinko-page,.plinko-wrap,'+
      '.mines-container,.mines-layout,.mines-game,.mines-page,.mines-wrap,'+
      '.crash-container,.crash-layout,.crash-game,.crash-page,.crash-wrap,'+
      '.dice-container,.dice-layout,.dice-game,.dice-page,.dice-wrap,'+
      '.slots-container,.slots-layout,.slots-game,.slots-page,.slot-container,.slot-layout,.slot-page,'+
      '.coinflip-container,.coinflip-layout,.cf-container,.cf-layout,.coinflip-page,'+
      '.tower-container,.tower-layout,.tower-game,.tower-page,.towers-container,.towers-layout,'+
      '.keno-container,.keno-layout,.keno-page,'+
      '.limbo-container,.limbo-layout,.limbo-page,'+
      '.hilo-container,.hilo-layout,.hilo-page,'+
      '.duel-container,.duels-container,.duel-layout,.duels-layout,.duel-page,'+
      '.case-detail,.case-open-section,.case-page,.cases-page,'+
      '[class*="-game-"][class*="container"],[class*="-game-"][class*="layout"]{'+
        'display:flex!important;flex-direction:column!important;'+
        'width:100%!important;max-width:100vw!important;'+
        'min-width:0!important;min-height:0!important;'+
        'padding:8px!important;gap:12px!important;'+
        'grid-template-columns:1fr!important;grid-template-rows:auto!important;'+
        'align-items:stretch!important;justify-content:flex-start!important;'+
        'position:relative!important;left:auto!important;right:auto!important;'+
        'transform:none!important;float:none!important}'+

    /* ── Direct children of game shells: full width, no float, reset offsets ── */
      '.game-page>*,.game-container>*,.game-wrapper>*,.game-layout>*,.game-area>*,.game-main>*,'+
      '.roulette-container>*,.roulette-layout>*,'+
      '.blackjack-container>*,.bj-container>*,.bj-layout>*,'+
      '.plinko-container>*,.plinko-layout>*,'+
      '.mines-container>*,.mines-layout>*,'+
      '.crash-container>*,.crash-layout>*,'+
      '.dice-container>*,.dice-layout>*,'+
      '.slots-container>*,.slot-container>*,'+
      '.coinflip-container>*,.cf-container>*,'+
      '.tower-container>*,.towers-container>*,'+
      '.keno-container>*,.limbo-container>*,.hilo-container>*,'+
      '.duel-container>*,.duels-container>*{'+
        'width:100%!important;max-width:100%!important;'+
        'min-width:0!important;flex:0 0 auto!important;'+
        'float:none!important;clear:both!important;'+
        'margin-left:0!important;margin-right:0!important}'+

    /* ── Bet panels / control sidebars: always full width below the board ── */
      '.bet-panel,.bet-controls,.bet-area,.bet-section,.bet-sidebar,.bet-box,.betting-panel,.betting-area,'+
      '.game-controls,.game-sidebar,.controls-panel,.controls-sidebar,.control-panel,'+
      '.left-panel,.right-panel,.side-panel,.left-side,.right-side,.game-left,.game-right,'+
      '.sidebar-left,.sidebar-right,.game-aside,'+
      '[class*="bet-panel"],[class*="bet-controls"],[class*="bet-sidebar"],'+
      '[class*="control-panel"],[class*="controls-panel"]{'+
        'width:100%!important;max-width:100%!important;min-width:0!important;'+
        'position:static!important;top:auto!important;bottom:auto!important;'+
        'left:auto!important;right:auto!important;transform:none!important;'+
        'flex:0 0 auto!important;float:none!important;'+
        'order:2!important}'+

    /* ── Game board itself: appears first (above controls) ── */
      '.game-board,.board,.game-stage-inner,'+
      '.roulette-table,.roulette-felt,.roulette-layout-table,'+
      '.bj-table,.bj-felt,.blackjack-table,.blackjack-felt,'+
      '.plinko-board,.plinko-stage-inner,'+
      '.mines-board,.mines-grid-wrap,'+
      '.crash-chart-wrap,.crash-display,'+
      '.dice-display,.dice-stage,'+
      '.slot-machine,.slots-cabinet,.slots-display,'+
      '.coinflip-stage,.cf-stage,'+
      '.tower-board,.towers-board,.tower-stage,'+
      '.keno-board,.limbo-display,.hilo-stage{'+
        'width:100%!important;max-width:100%!important;min-width:0!important;'+
        'order:1!important;margin:0 0 8px!important}'+

    /* ── ROULETTE specifics ── */
      '.roulette-table,.roulette-layout-table,.roulette-felt{'+
        'overflow-x:auto!important;-webkit-overflow-scrolling:touch!important}'+
      '.number-grid,.zero-row,.outside-bets,.outside-bets-2{'+
        'min-width:0!important;width:100%!important}'+
      '.roulette-wheel,.wheel-container,.wheel-wrap{'+
        'max-width:88vw!important;width:88vw!important;height:auto!important;'+
        'aspect-ratio:1/1!important;margin:0 auto!important}'+

    /* ── BLACKJACK specifics ── */
      '.bj-table,.blackjack-table{min-height:auto!important;padding:16px 8px!important}'+
      '.dealer-area,.player-area,.bj-dealer,.bj-player,.bj-hand-area{'+
        'width:100%!important;margin:8px 0!important;position:static!important;'+
        'left:auto!important;right:auto!important;top:auto!important;transform:none!important}'+

    /* ── PLINKO specifics ── */
      '.plinko-board,.plinko-canvas,.plinko-stage-inner{'+
        'width:100%!important;max-width:100%!important;height:auto!important;'+
        'aspect-ratio:4/5!important}'+
      '.plinko-multipliers,.multiplier-row{'+
        'flex-wrap:nowrap!important;overflow-x:auto!important;width:100%!important;'+
        '-webkit-overflow-scrolling:touch!important;gap:2px!important}'+
      '.plinko-multiplier,.mult-cell{flex-shrink:0!important;font-size:.7rem!important}'+

    /* ── MINES specifics ── */
      '.mines-grid{'+
        'width:min(95vw,420px)!important;max-width:100%!important;height:auto!important;'+
        'aspect-ratio:1/1!important;margin:0 auto!important;gap:4px!important;'+
        'grid-template-columns:repeat(5,1fr)!important;grid-template-rows:repeat(5,1fr)!important}'+
      '.mines-tile,.mine-cell,.mines-cell{'+
        'aspect-ratio:1/1!important;height:auto!important;min-height:0!important;'+
        'width:auto!important;min-width:0!important;'+
        'font-size:clamp(.8rem,4vw,1.2rem)!important;padding:0!important}'+

    /* ── CRASH specifics ── */
      '.crash-chart,.crash-canvas,.crash-graph,.crash-chart-canvas{'+
        'width:100%!important;max-width:100%!important;height:240px!important}'+
      '.crash-multiplier,.crash-current,.crash-mult{font-size:2.4rem!important}'+
      '.crash-bets,.crash-history,.crash-players{width:100%!important;overflow-x:auto!important}'+

    /* ── DICE / LIMBO specifics ── */
      '.dice-slider,.limbo-slider,.slider-track,.slider-bar{width:100%!important}'+
      '.dice-result,.limbo-result,.roll-display,.roll-value{font-size:2.4rem!important}'+

    /* ── SLOTS specifics ── */
      '.slot-machine,.slots-reels,.slots-cabinet,.reels-container{'+
        'width:100%!important;max-width:100vw!important;transform:none!important;'+
        'left:auto!important;right:auto!important}'+
      '.reel,.slot-reel{width:auto!important;flex:1 1 0!important;min-width:0!important}'+
      '.slot-grid,.slots-grid{display:grid!important}'+

    /* ── COINFLIP specifics ── */
      '.coin,.coinflip-coin,.cf-coin,.flip-coin{'+
        'width:140px!important;height:140px!important;margin:0 auto!important}'+
      '.cf-history,.coinflip-history,.flip-history{width:100%!important;overflow-x:auto!important}'+

    /* ── TOWER / TOWERS specifics ── */
      '.tower-grid,.tower-board,.towers-grid,.towers-board{'+
        'width:min(95vw,420px)!important;max-width:100%!important;'+
        'margin:0 auto!important;display:grid!important}'+
      '.tower-row,.towers-row{width:100%!important;gap:4px!important;display:flex!important}'+
      '.tower-cell,.tower-tile,.towers-cell,.towers-tile{'+
        'flex:1 1 0!important;min-width:0!important;width:auto!important;'+
        'aspect-ratio:1/1!important;height:auto!important}'+

    /* ── KENO specifics ── */
      '.keno-grid,.keno-board{'+
        'width:min(95vw,460px)!important;max-width:100%!important;'+
        'margin:0 auto!important;display:grid!important;'+
        'grid-template-columns:repeat(8,1fr)!important;gap:3px!important}'+
      '.keno-cell,.keno-tile,.keno-number{'+
        'aspect-ratio:1/1!important;height:auto!important;min-height:0!important;'+
        'width:auto!important;min-width:0!important;'+
        'font-size:clamp(.7rem,3vw,1rem)!important}'+
      

    /* ── DUELS specifics ── */
      '.duel-arena,.duels-arena,.duel-stage,.duels-stage{'+
        'flex-direction:column!important;gap:12px!important}'+
      '.duel-player,.duels-player,.duel-side,.duels-side{'+
        'width:100%!important;min-width:0!important;max-width:100%!important}'+
      '.duel-vs,.duels-vs{margin:4px 0!important}'+

    /* ── Generic split / two-column game layouts → single column ── */
      '[class*="split"],[class*="two-col"],[class*="2col"],'+
      '[class*="-row"][class*="game"],[class*="game"][class*="-row"]{'+
        'flex-direction:column!important;grid-template-columns:1fr!important;'+
        'width:100%!important;max-width:100%!important}'+

    /* ── Tower-specific (the game uses .tower-area + .tower-wrap + .side-panel inside .game-panel) ── */
      '.game-panel,.info-panel{'+
        'overflow:visible!important;height:auto!important;max-height:none!important;'+
        'min-height:0!important;width:100%!important;max-width:100%!important}'+
      '.tower-area{display:flex!important;flex-direction:column!important;'+
        'flex-wrap:nowrap!important;padding:12px!important;gap:12px!important;'+
        'width:100%!important;max-width:100%!important}'+
      '.tower-wrap{flex:0 0 auto!important;width:100%!important;max-width:100%!important;'+
        'min-width:0!important;order:1!important}'+
      '.tower-scroll{max-height:60vh!important;width:100%!important}'+
      '.side-panel .sp-card{width:100%!important;max-width:100%!important}'+

    /* ── Canvases responsive ── */
      'canvas{max-width:100%!important;height:auto!important}'+

    /* ── Kill any element wider than viewport ── */
      'main *,.main *{max-width:100vw!important}'+

    /* ── Social feed ── */
      '#postsContainer,.posts-container{padding:0 8px!important}'+
      '.post-card{margin:0 0 10px!important;border-radius:14px!important}'+
      '.post-header{padding:12px!important}'+
      '.post-body{padding:0 12px 12px!important}'+
      '.post-image{border-radius:10px!important}'+
      '.post-actions{padding:8px 12px!important}'+
      '.post-text{font-size:.9rem!important}'+
      '.compose-card{margin:0 8px 12px!important;border-radius:14px!important}'+

    /* ── Social sidebar ── */
      '.social-sidebar,.sidebar-right,.sidebar-left{display:none!important}'+
      '.social-layout,.feed-layout{grid-template-columns:1fr!important;max-width:100%!important}'+
      '.feed-container{max-width:100%!important;padding:0!important}'+

    /* ── DMs / Chat overlays ── */
      '.dm-overlay,.chat-overlay,.profile-overlay,[class*="-overlay"]:not(.bg-gradient){'+
        'padding:0!important}'+
      '.dm-panel,.chat-panel,.profile-panel{'+
        'width:100%!important;max-width:100%!important;height:100dvh!important;max-height:100dvh!important;border-radius:0!important}'+

    /* ── Modals ── */
      '.modal-box{max-width:95vw!important;max-height:85vh!important;margin:auto!important;border-radius:16px!important;padding:20px 16px!important}'+
      '.modal-overlay{padding:10px!important}'+

    /* ── Case opening / spinner ── */
      '.case-detail,.case-open-section{padding:0 12px!important}'+
      '.reel-container,.spinner-container,.reel-window,.spinner-window{'+
        'max-width:100%!important;width:100%!important;overflow:hidden!important}'+
      '.won-display{padding:16px!important}'+
      '.won-display .won-item-name{font-size:1.1rem!important}'+

    /* ── Case battles ── */
      '.battle-arena{flex-direction:column!important;gap:12px!important}'+
      '.player-panel{width:100%!important;min-width:0!important;max-width:100%!important}'+
      '.battle-vs{margin:4px 0!important}'+
      '.spinner-pair{flex-direction:column!important;gap:8px!important}'+
      '.create-overlay-content{max-width:95vw!important;max-height:85vh!important;overflow-y:auto!important}'+
      '.team-side{flex-direction:column!important;width:100%!important}'+

    /* ── Buttons — touch friendly ── */
      'button,.btn,[class*="-btn"]{min-height:42px!important;max-width:100%!important}'+
      '.post-action-btn{min-height:36px!important;padding:8px 12px!important}'+

    /* ── Stats row ── */
      '.dash-stats,.stat-row,.stats-row,.hero-stats{'+
        'flex-wrap:wrap!important;gap:8px!important;padding:12px!important}'+
      '.dash-stat,.stat-card{min-width:calc(50% - 8px)!important;flex:none!important}'+

    /* ── Tables ── */
      'table{display:block!important;overflow-x:auto!important;-webkit-overflow-scrolling:touch!important;max-width:100%!important}'+

    /* ── Images ── */
      'img{max-width:100%!important;height:auto!important}'+

    /* ── Tabs scrollable ── */
      '.dash-tabs,.tabs,.tab-row,[class*="-tabs"]{'+
        'overflow-x:auto!important;-webkit-overflow-scrolling:touch!important;flex-wrap:nowrap!important;padding:0 12px!important;gap:6px!important}'+
      '.dash-tab,.tab,[class*="-tab"]:not([class*="-table"]){flex-shrink:0!important}'+

    /* ── Forms ── */
      '.form-group{margin-bottom:12px!important}'+
      '.form-input,.form-textarea{width:100%!important;padding:12px!important}'+

    /* ── FABs positioning ── */
      '.support-fab-group{top:calc(var(--nav-h-mobile,56px) + 8px)!important;right:10px!important}'+
      '.support-fab{width:38px!important;height:38px!important}'+
      '#rec-fab{bottom:16px!important;left:12px!important}'+

    /* ── Support chat ── */
      '.support-chat-overlay{padding:0!important}'+
      '.support-chat-panel{width:100%!important;max-width:100%!important;max-height:100dvh!important;border-radius:0!important}'+

    /* ── Giveaway banners ── */
      '.giveaway-banner{padding:14px!important;border-radius:12px!important}'+

    /* ── Footer ── */
      '.footer,footer{padding:16px 12px!important;font-size:.75rem!important;text-align:center!important}'+

    /* ── Mythic drop banner ── */
      '#mythic-slide{padding:8px 14px!important;gap:6px!important}'+
      '#mythic-slide .ms-text{font-size:.78rem!important}'+

    /* ── Scrollbars thin on mobile ── */
      '::-webkit-scrollbar{width:4px!important;height:4px!important}'+

    /* ── Smooth scroll ── */
      'html{scroll-behavior:smooth!important}'+
    '}'+

 /* ── Extra small phones ── */
    '@media(max-width:380px){'+
      '.case-grid,.cases-grid,.game-grid,[class*="-grid"]:not(.number-grid):not(.zero-row):not(.outside-bets):not(.outside-bets-2):not(.rules-grid):not(.stats-grid):not(.store-grid):not(.bg-gradient):not(.grid-overlay):not(.mines-grid):not(.tower-grid):not(.towers-grid):not(.keno-grid):not(.plinko-grid):not(.slot-grid):not(.slots-grid){grid-template-columns:1fr!important}'+
      '.hero h1,.hero-title{font-size:1.6rem!important}'+
      '.nav-logo span{font-size:.85rem!important}'+
      '.post-action-btn span{display:none!important}'+
      '.roulette-wheel,.wheel-container,.wheel-wrap{max-width:92vw!important;width:92vw!important}'+
      '.crash-multiplier,.crash-current,.dice-result,.limbo-result{font-size:2rem!important}'+
      '.coin,.coinflip-coin,.cf-coin{width:120px!important;height:120px!important}'+
    '}';

    document.head.appendChild(ms);
  })();

  // ── LQM: apply instantly from localStorage to avoid flash, then sync from DB ──
  (function(){
    var lqmStyle=document.createElement('style');
    lqmStyle.id='lqm-style';
    lqmStyle.textContent=
      'body.lqm .bg-gradient,body.lqm .orb,body.lqm .grid-overlay,body.lqm #particles{display:none!important}'+
      'body.lqm *,body.lqm *::before,body.lqm *::after{animation:none!important;transition:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;will-change:auto!important}'+
      'body.lqm .navbar{background:rgba(10,10,15,.97)!important}';
    if(!document.getElementById('lqm-style'))document.head.appendChild(lqmStyle);

    // Apply immediately from localStorage so there's no animation flash on load
    if(localStorage.getItem('aightbet-lqm')==='true'){
      document.body?document.body.classList.add('lqm'):document.addEventListener('DOMContentLoaded',function(){document.body.classList.add('lqm');});
    }
  })();

  // ── HACKER MODE: inject styles + canvas rain, apply from localStorage instantly ──
  (function(){
    if(document.getElementById('hacker-style'))return;

    // CSS
    var s=document.createElement('style');
    s.id='hacker-style';
    s.textContent=
      '#hacker-canvas{position:fixed;inset:0;z-index:0;pointer-events:none;display:none}'+
      'body.hacker #hacker-canvas{display:block}'+
      'body.hacker{background:#000!important;color:#00ff41!important;font-family:monospace!important}'+
      'body.hacker .bg-gradient,body.hacker .orb,body.hacker .grid-overlay{display:none!important}'+
      'body.hacker #particles{display:none!important}'+
      'body.hacker .navbar{background:rgba(0,0,0,.92)!important;border-bottom-color:rgba(0,255,65,.15)!important}'+
      'body.hacker .nav-link,body.hacker .nav-logo span{color:#00ff41!important;-webkit-text-fill-color:#00ff41!important}'+
      'body.hacker .nav-link:hover,body.hacker .nav-link.active{background:rgba(0,255,65,.08)!important;color:#00ff41!important}'+
      'body.hacker a{color:#00ff41!important}'+
      'body.hacker .settings-card,body.hacker .profile-card,body.hacker .card,body.hacker [class*="card"]{background:rgba(0,20,0,.7)!important;border-color:rgba(0,255,65,.15)!important}'+
      'body.hacker input,body.hacker textarea{background:rgba(0,20,0,.8)!important;border-color:rgba(0,255,65,.25)!important;color:#00ff41!important}'+
      'body.hacker button:not(#hacker-exit){background:rgba(0,255,65,.1)!important;border-color:rgba(0,255,65,.3)!important;color:#00ff41!important}'+
      'body.hacker ::-webkit-scrollbar-track{background:#000}body.hacker ::-webkit-scrollbar-thumb{background:#00ff41}'+
      '#hacker-exit{position:fixed;bottom:32px;right:32px;z-index:9999;padding:10px 20px;font-size:.8rem;font-weight:700;color:#00ff41;background:rgba(0,20,0,.95);border:1px solid rgba(0,255,65,.4);border-radius:8px;cursor:pointer;font-family:monospace;display:none;letter-spacing:.05em}'+
      '#hacker-exit.visible{display:block}'+
      '#hacker-exit:hover{background:rgba(0,255,65,.12)}';
    document.head.appendChild(s);

    // Canvas rain
    var cv=document.createElement('canvas');
    cv.id='hacker-canvas';
    var raf=null,cols=[],fontSize=14,running=false;

    function startRain(){
      if(running)return;
      running=true;
      var ctx=cv.getContext('2d');
      function resize(){
        cv.width=window.innerWidth;
        cv.height=window.innerHeight;
        cols=Array(Math.floor(cv.width/fontSize)+1).fill(1);
      }
      resize();
      window.addEventListener('resize',resize);
      var chars='0123456789ABCDEF<>{}[]|/\\!@#$%^&*';
      function draw(){
        ctx.fillStyle='rgba(0,0,0,0.05)';
        ctx.fillRect(0,0,cv.width,cv.height);
        ctx.fillStyle='#00ff41';
        ctx.font=fontSize+'px monospace';
        for(var i=0;i<cols.length;i++){
          var c=chars[Math.floor(Math.random()*chars.length)];
          ctx.fillStyle=Math.random()>0.95?'#fff':'#00ff41';
          ctx.fillText(c,i*fontSize,cols[i]*fontSize);
          if(cols[i]*fontSize>cv.height&&Math.random()>0.975) cols[i]=0;
          cols[i]++;
        }
        raf=requestAnimationFrame(draw);
      }
      draw();
    }

    function stopRain(){
      running=false;
      if(raf){cancelAnimationFrame(raf);raf=null;}
    }

    // Exit button
    var exitBtn=document.createElement('button');
    exitBtn.id='hacker-exit';
    exitBtn.textContent='> EXIT_HACKER_MODE';

    function applyHacker(on,persist){
      document.body.classList.toggle('hacker',on);
      exitBtn.classList.toggle('visible',on);
      localStorage.setItem('aightbet-hacker',on?'true':'false');
      if(on){
        startRain();
      }else{stopRain();}
      if(persist!==false){
        var doSave=function(){
          if(typeof firebase!=='undefined'&&firebase.apps&&firebase.apps.length>0){
            var u=firebase.auth().currentUser;
            if(u)firebase.database().ref('users/'+u.uid).update({hacker:on});
          }
        };
        // slight delay to let firebase load if needed
        setTimeout(doSave,500);
      }
    }

    exitBtn.addEventListener('click',function(){applyHacker(false);});

    // Expose globally so home.html trigger can call it
    window.__setHackerMode=function(on){applyHacker(on);};

    function inject(){
      document.body.appendChild(cv);
      document.body.appendChild(exitBtn);
      // restore from localStorage
      if(localStorage.getItem('aightbet-hacker')==='true') applyHacker(true,false);
    }

    document.body?inject():document.addEventListener('DOMContentLoaded',inject);
  })();
  (function(){
    // Inject CSS
    if(!document.getElementById('slqm-style')){
      var slqmStyle=document.createElement('style');
      slqmStyle.id='slqm-style';
      slqmStyle.textContent=
        'body.slqm .bg-gradient,body.slqm .orb,body.slqm .grid-overlay,body.slqm #particles,body.slqm .main,body.slqm .navbar,body.slqm .footer{filter:blur(6px)}'+
        '#slqm-exit{position:fixed;bottom:32px;left:50%;transform:translateX(-50%);z-index:9999;padding:12px 28px;font-size:.9rem;font-weight:700;color:#fff;background:rgba(239,68,68,.9);border:1px solid rgba(239,68,68,.6);border-radius:12px;cursor:pointer;font-family:inherit;display:none;filter:none!important}'+
        '#slqm-exit.visible{display:block}';
      document.head.appendChild(slqmStyle);
    }

    // Inject exit button if not already on the page
    function injectExitBtn(){
      if(document.getElementById('slqm-exit'))return;
      var btn=document.createElement('button');
      btn.id='slqm-exit';
      btn.textContent='Exit Super Low Quality Mode';
      btn.addEventListener('click',function(){
        document.body.classList.remove('slqm');
        btn.classList.remove('visible');
        localStorage.setItem('aightbet-slqm','false');
        if(typeof firebase!=='undefined'&&firebase.apps&&firebase.apps.length>0){
          var auth=firebase.auth();
          var u=auth.currentUser;
          if(u)firebase.database().ref('users/'+u.uid).update({slqm:false});
        }
      });
      document.body?document.body.appendChild(btn):document.addEventListener('DOMContentLoaded',function(){document.body.appendChild(btn);});
    }

    // Apply immediately from localStorage
    if(localStorage.getItem('aightbet-slqm')==='true'){
      var doApply=function(){
        document.body.classList.add('slqm');
        injectExitBtn();
        var exitBtn=document.getElementById('slqm-exit');
        if(exitBtn)exitBtn.classList.add('visible');
      };
      document.body?doApply():document.addEventListener('DOMContentLoaded',doApply);
    } else {
      document.addEventListener('DOMContentLoaded',injectExitBtn);
    }
  })();

  function waitForFirebase(cb){
    if(typeof firebase!=='undefined'&&firebase.apps&&firebase.apps.length>0&&typeof firebase.auth==='function'){cb();return;}
    var tries=0;
    var interval=setInterval(function(){
      tries++;
      if(typeof firebase!=='undefined'&&firebase.apps&&firebase.apps.length>0&&typeof firebase.auth==='function'){
        clearInterval(interval);
        cb();
      }
      if(tries>100){clearInterval(interval);}
    },100);
  }

  waitForFirebase(function(){
    var rtdb=firebase.database();
    var auth=firebase.auth();

    // Maintenance check
    rtdb.ref('settings/maintenance').on('value',function(snap){
      if(snap.val()===true){
        window.location.href='maintenance.html';
      }
    });
// ── FORCE REFRESH ──
// ── FORCE REFRESH — paste inside the existing auth.onAuthStateChanged block ──
var refreshKey = 'aightbet-refresh-seen';
rtdb.ref('settings/forceRefresh').on('value', function(snap){
  var val = snap.val();
  if(!val) return;
  var ts = String(val);
  var seen = localStorage.getItem(refreshKey) || '0';
  if(ts === '0') return;
  if(ts !== seen){
    localStorage.setItem(refreshKey, ts);
    setTimeout(function(){
      window.location.replace(window.location.origin + window.location.pathname + '?v=' + ts);
    }, 100);
  }
});
    /* DEPRECATED: per-game announce helper. The credit-balance watcher
       (set up after auth, below) now handles all big-win detection
       automatically based on actual credit deltas. We keep this stub so
       any leftover calls in older game code don't error or double-push. */
    window.announceBigWin = function(amount, source){
      console.log('[BIGWIN-SEND] (no-op, balance watcher handles this)', { amount: amount, source: source });
      return Promise.resolve(null);
    };

    // Ban check + global messages + LQM sync
    auth.onAuthStateChanged(function(u){
      if(!u)return;
      if(u.email==='support@support.com')return;

      // ── BAN ENFORCEMENT: redirect to ban.html.
      //    For temp bans, auto-unban once expiry passes.
      rtdb.ref('users/'+u.uid).on('value',function(snap){
        var d=snap.val()||{};
        if(d.banned===true){
          var exp=Number(d.banExpiresAt||0);
          if(exp>0 && Date.now()>=exp){
            // Temp ban expired → clear it and let the page load normally.
            var clr={};
            clr['users/'+u.uid+'/banned']=null;
            clr['users/'+u.uid+'/banReason']=null;
            clr['users/'+u.uid+'/bannedAt']=null;
            clr['users/'+u.uid+'/banExpiresAt']=null;
            rtdb.ref().update(clr).catch(function(){});
            try{
              rtdb.ref('moderationLog').push({
                action:'auto_unban_expired', uid:u.uid,
                by:'system', byName:'System',
                at: firebase.database.ServerValue.TIMESTAMP
              });
            }catch(_){}
            return;
          }
          window.location.href='ban.html';
        }
      });

      // ── FORCE LOGOUT: when support sets users/$uid/forceLogoutAt > current
      //    session start, sign out + redirect to index.html on every device.
      try{
        if(!sessionStorage.getItem('aightbet-session-start')){
          sessionStorage.setItem('aightbet-session-start', String(Date.now()));
        }
      }catch(_){}
      var sessionStart = (function(){
        try{ return parseInt(sessionStorage.getItem('aightbet-session-start')||'0'); }
        catch(_){ return 0; }
      })();
      rtdb.ref('users/'+u.uid+'/forceLogoutAt').on('value',function(snap){
        var v=snap.val();
        if(typeof v!=='number' || v<=0) return;
        if(v > sessionStart){
          try{ sessionStorage.removeItem('aightbet-session-start'); }catch(_){}
          try{ auth.signOut(); }catch(_){}
          window.location.href='index.html';
        }
      });

      // ── LOGIN HISTORY: record one entry per browser session ──
      try{
        if(!sessionStorage.getItem('aightbet-login-logged')){
          var sid='sess_'+Date.now()+'_'+Math.random().toString(36).slice(2,10);
          sessionStorage.setItem('aightbet-login-logged','1');
          sessionStorage.setItem('aightbet-session-id',sid);
          rtdb.ref('moderation/'+u.uid+'/loginLog').push({
            at: firebase.database.ServerValue.TIMESTAMP,
            ua: (navigator.userAgent||'').substring(0,300),
            page: (window.location.pathname||'/').substring(0,80),
            session: sid
          }).catch(function(){});
        }
      }catch(_){}

      // ── TARGETED MESSAGES: pop unseen support DMs as overlays ──
      rtdb.ref('targetedMessages/'+u.uid).on('value',function(snap){
        var msgs=snap.val()||{};
        var unseen=[];
        for(var id in msgs){
          var m=msgs[id]||{};
          if(!m.seen) unseen.push({id:id, text:m.text||'', at:m.at||0, byName:m.byName||'Support'});
        }
        if(unseen.length){
          unseen.sort(function(a,b){return (a.at||0)-(b.at||0);});
          showTargetedMessageQueue(u.uid, unseen, 0);
        }
      });

      // ── WARNINGS: pop unseen warnings once per session ──
      rtdb.ref('moderation/'+u.uid+'/warnings').on('value',function(snap){
        var warns=snap.val()||{};
        var unseen=[];
        for(var id in warns){
          var w=warns[id]||{};
          if(!w.cleared && !w.seen) unseen.push({id:id, reason:w.reason||'', at:w.at||0, byName:w.byName||'Support'});
        }
        if(unseen.length){
          unseen.sort(function(a,b){return (a.at||0)-(b.at||0);});
          showWarningQueue(u.uid, unseen, 0);
        }
      });

      // ── PRESENCE: track which user is online (by UID) ──
      var presRef = rtdb.ref('presence/' + u.uid);
      presRef.onDisconnect().remove();
      presRef.set(true);


      
      /* CREDIT-BALANCE WATCHER ─ Big-win detection.
         The cleanest, most general approach: watch the user's own credits
         balance and broadcast when it jumps by ≥ 1,000,000 in one update.
         Catches wins from EVERY source — cases, case-battles, duels, blackjack,
         credit transfers, support gifts — without per-game wiring.
         Each user only watches their own balance so writes are minimal.
         A local 5-second dedupe lock avoids double-pushes from multi-tab.

         Loans / refunds / other intentionally-non-win credit increases can
         opt out via window.suppressNextBigWin(expectedDelta) — see helper. */
      (function(){
        var prevCredits = null;
        var BIGWIN_MIN = 1000000;
        var DEDUPE_KEY = 'aightbet-last-bigwin-' + u.uid;
        var DEDUPE_MS  = 5000;
        var SUPPRESS_KEY = 'aightbet-suppress-bigwin';
        var SUPPRESS_TTL = 15000; // 15s grace for the credit transaction to land

        // Public helper any module (e.g. credits.html loan flow) can call
        // BEFORE writing a non-win credit increase to skip the upcoming banner.
        // Pass the expected delta so we only suppress that exact-ish jump.
        window.suppressNextBigWin = function(expectedDelta, reason){
          try {
            var payload = { ts: Date.now(), amount: Math.floor(Number(expectedDelta)||0), reason: reason || 'loan' };
            localStorage.setItem(SUPPRESS_KEY, JSON.stringify(payload));
            console.log('[BIGWIN-WATCH] next jump suppressed', payload);
          } catch(_){}
        };

        function consumeSuppression(delta){
          try {
            var raw = localStorage.getItem(SUPPRESS_KEY);
            if(!raw) return false;
            var p = JSON.parse(raw);
            if(!p || typeof p.ts !== 'number') { localStorage.removeItem(SUPPRESS_KEY); return false; }
            // Expired?
            if(Date.now() - p.ts > SUPPRESS_TTL){ localStorage.removeItem(SUPPRESS_KEY); return false; }
            // Match: same delta within a small tolerance (penalties / interest may shift it)
            var expected = Math.floor(Number(p.amount)||0);
            if(expected > 0 && Math.abs(delta - expected) <= Math.max(100, expected * 0.05)){
              localStorage.removeItem(SUPPRESS_KEY);
              return p.reason || 'suppressed';
            }
            return false;
          } catch(_){ return false; }
        }

        rtdb.ref('users/'+u.uid+'/credits').on('value', function(snap){
          var cur = snap.val();
          if(typeof cur !== 'number') return;
          // First fire — establish baseline, don't trigger.
          if(prevCredits === null){
            prevCredits = cur;
            return;
          }
          var delta = cur - prevCredits;
          prevCredits = cur;
          if(delta < BIGWIN_MIN) return;

          // Check for caller-suppressed jump (loans etc.)
          var suppressed = consumeSuppression(delta);
          if(suppressed){
            console.log('[BIGWIN-WATCH] +'+delta+' skipped — '+suppressed);
            return;
          }

          // Local multi-tab dedupe
          try {
            var last = parseInt(localStorage.getItem(DEDUPE_KEY)||'0');
            if(Date.now() - last < DEDUPE_MS){
              console.log('[BIGWIN-WATCH] dedupe — recent push, skipping');
              return;
            }
            localStorage.setItem(DEDUPE_KEY, Date.now().toString());
          } catch(_){}

          console.log('[BIGWIN-WATCH] balance jumped +'+delta+', broadcasting');

          rtdb.ref('users/'+u.uid).once('value').then(function(s){
            var d = s.val()||{};
            var name = d.username||d.nickname||u.displayName||u.email||'Someone';
            return rtdb.ref('mythicDrops').push({
              type: 'big_win',
              user: name,
              uid: u.uid,
              amount: delta,
              source: 'a big win',
              timestamp: firebase.database.ServerValue.TIMESTAMP
            });
          }).then(function(ref){
            if(ref) console.log('[BIGWIN-WATCH] pushed', ref.key);
          }).catch(function(e){ console.warn('[BIGWIN-WATCH]', e); });
        });
      })();

      // ── UPDATE NOTIFICATION POPUP ──
rtdb.ref('settings/updateNotification').on('value', function(snap){
  var upd = snap.val();
  if (!upd || !upd.version || !upd.name) return;

  var seenKey = 'aightbet-update-seen-v' + upd.version;
  if (localStorage.getItem(seenKey) === '1') return;
  if (document.getElementById('update-popup-overlay')) return;

  showUpdatePopup(upd, seenKey);
});

function showUpdatePopup(upd, seenKey){
  if (!document.getElementById('update-popup-style')) {
    var us = document.createElement('style');
    us.id = 'update-popup-style';
    us.textContent =
      '#update-popup-overlay{position:fixed;inset:0;z-index:999999;background:rgba(0,0,0,.72);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:20px;animation:upFade .3s ease;font-family:"Segoe UI",system-ui,-apple-system,sans-serif}'+
      '@keyframes upFade{from{opacity:0}to{opacity:1}}'+
      '@keyframes upSlide{from{opacity:0;transform:scale(.9) translateY(30px)}to{opacity:1;transform:scale(1) translateY(0)}}'+
      '@keyframes upShine{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}'+
      '@keyframes upBadgePulse{0%,100%{transform:scale(1);box-shadow:0 0 24px -4px rgba(139,92,246,.5)}50%{transform:scale(1.05);box-shadow:0 0 32px -2px rgba(139,92,246,.8)}}'+
      '#update-popup-card{position:relative;background:rgba(15,12,30,.96);border:1px solid rgba(139,92,246,.3);border-radius:22px;max-width:480px;width:100%;padding:30px 28px;animation:upSlide .4s cubic-bezier(.175,.885,.32,1.275);box-shadow:0 20px 60px -10px rgba(139,92,246,.35),inset 0 1px 0 rgba(255,255,255,.06)}'+
      '#update-popup-card::before{content:"";position:absolute;inset:-1px;border-radius:22px;padding:1px;background:linear-gradient(135deg,#8b5cf6,#06b6d4,#ec4899,#8b5cf6);background-size:300% 300%;animation:upShine 4s ease infinite;-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:.55;pointer-events:none}'+
      '.up-header{display:flex;align-items:center;gap:14px;margin-bottom:18px;position:relative}'+
      '.up-logo{width:54px;height:54px;border-radius:14px;background:rgba(139,92,246,.12);border:1px solid rgba(139,92,246,.25);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;box-shadow:0 8px 24px -6px rgba(139,92,246,.5)}'+
      '.up-logo img{width:100%;height:100%;object-fit:contain;display:block}'+
      '.up-head-text{display:flex;flex-direction:column;gap:4px;min-width:0}'+
      '.up-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;background:linear-gradient(135deg,#8b5cf6,#ec4899);border-radius:999px;font-size:.65rem;font-weight:900;letter-spacing:.12em;color:#fff;text-transform:uppercase;width:fit-content;animation:upBadgePulse 2.2s ease infinite}'+
      '.up-brand{font-size:1.15rem;font-weight:900;color:#fff;letter-spacing:-.01em}'+
      '.up-brand .up-ver{background:linear-gradient(135deg,#c4b5fd,#f0abfc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-left:6px}'+
      '.up-name{font-size:.95rem;font-weight:700;color:#e2e8f0;margin:6px 0 10px;line-height:1.35}'+
      '.up-desc{font-size:.88rem;line-height:1.55;color:#cbd5e1;white-space:pre-wrap;word-wrap:break-word;max-height:240px;overflow-y:auto;padding:14px 16px;background:rgba(139,92,246,.06);border:1px solid rgba(139,92,246,.14);border-radius:12px;margin-bottom:18px}'+
      '.up-ok{width:100%;padding:14px;font-size:.95rem;font-weight:800;color:#fff;border:none;border-radius:12px;cursor:pointer;font-family:inherit;letter-spacing:.03em;background:linear-gradient(135deg,#8b5cf6,#7c3aed);box-shadow:0 8px 24px -8px rgba(139,92,246,.45);transition:transform .15s,box-shadow .25s}'+
      '.up-ok:hover{transform:translateY(-2px);box-shadow:0 12px 32px -6px rgba(139,92,246,.6)}'+
      '.up-ok:active{transform:translateY(0)}';
    document.head.appendChild(us);
  }

  var overlay = document.createElement('div');
  overlay.id = 'update-popup-overlay';
  overlay.innerHTML =
    '<div id="update-popup-card">'+
      '<div class="up-header">'+
        '<div class="up-logo"><img src="Images/logo.png" alt="AightBet" onerror="this.parentNode.textContent=\'AB\'"></div>'+
        '<div class="up-head-text">'+
          '<span class="up-badge">✨ New Update</span>'+
          '<div class="up-brand">AightBet<span class="up-ver">V'+escapeHTMLBasic(upd.version)+'</span></div>'+
        '</div>'+
      '</div>'+
      '<div class="up-name">'+escapeHTMLBasic(upd.name)+'</div>'+
      '<div class="up-desc">'+escapeHTMLBasic(upd.description)+'</div>'+
      '<button class="up-ok" id="up-ok-btn">Ok</button>'+
    '</div>';
  document.body.appendChild(overlay);

  overlay.querySelector('#up-ok-btn').addEventListener('click', function(){
    try { localStorage.setItem(seenKey, '1'); } catch(_){}
    // Also record per-user in DB so the support panel can see reach
    try {
      var u = firebase.auth().currentUser;
      if (u) rtdb.ref('settings/updateNotification/seenBy/'+u.uid).set(true);
    } catch(_){}
    overlay.style.transition = 'opacity .25s';
    overlay.style.opacity = '0';
    setTimeout(function(){ if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 250);
  });
}

// ══════════════════════════════════════════════════════
// POLL VOTE OVERLAY — EPIC EVENT STYLE
// Add inside auth.onAuthStateChanged after ban check
// ══════════════════════════════════════════════════════

(function(){
  var pollRef = rtdb.ref('settings/poll');

  pollRef.on('value', function(snap) {
    var poll = snap.val();
    var existing = document.getElementById('vote-overlay');
    if (existing) existing.remove();

    if (!poll || !poll.question) return;
    if (poll.votes && poll.votes[u.uid]) return;

    showVoteOverlay(poll, u.uid);
  });
})();

function showVoteOverlay(poll, uid) {
  if (!document.getElementById('vote-overlay-style')) {
    var vs = document.createElement('style');
    vs.id = 'vote-overlay-style';
    vs.textContent = `
      #vote-overlay {
        position:fixed;inset:0;z-index:999999;
        display:flex;align-items:center;justify-content:center;padding:20px;
        animation: vo-fadeIn .4s ease;
        overflow:hidden;
      }
      #vote-overlay::before {
        content:'';position:absolute;inset:0;
        background:radial-gradient(ellipse at 30% 20%, rgba(139,92,246,.25) 0%, transparent 50%),
                   radial-gradient(ellipse at 70% 80%, rgba(6,182,212,.2) 0%, transparent 50%),
                   rgba(0,0,0,.92);
        z-index:0;
      }
      @keyframes vo-fadeIn{from{opacity:0}to{opacity:1}}

      /* ── Floating particles ── */
      .vote-particle {
        position:absolute;border-radius:50%;pointer-events:none;z-index:1;
        animation: vo-float linear infinite;
        opacity:0;
      }
      @keyframes vo-float {
        0%   { transform:translateY(100vh) scale(0); opacity:0; }
        10%  { opacity:1; }
        90%  { opacity:.6; }
        100% { transform:translateY(-100px) scale(1); opacity:0; }
      }

      /* ── Glow ring behind card ── */
      .vote-glow-ring {
        position:absolute;width:500px;height:500px;border-radius:50%;z-index:1;
        background:conic-gradient(from 0deg, #8b5cf6, #06b6d4, #ec4899, #8b5cf6);
        filter:blur(80px);opacity:.3;
        animation: vo-spin 8s linear infinite;
      }
      @keyframes vo-spin { to { transform:rotate(360deg); } }

      /* ── Card ── */
      #vote-card {
        position:relative;z-index:2;
        background:rgba(15,12,30,.85);
        border:1px solid rgba(139,92,246,.3);
        border-radius:24px;
        max-width:500px;width:100%;padding:36px 32px;
        backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
        box-shadow: 0 0 60px -10px rgba(139,92,246,.3),
                    0 0 120px -20px rgba(6,182,212,.15),
                    inset 0 1px 0 rgba(255,255,255,.08);
        animation: vo-cardIn .5s cubic-bezier(.175,.885,.32,1.275);
      }
      @keyframes vo-cardIn {
        from { opacity:0; transform:scale(.8) translateY(40px) rotateX(10deg); }
        to   { opacity:1; transform:scale(1) translateY(0) rotateX(0); }
      }

      /* ── Shimmer border ── */
      #vote-card::before {
        content:'';position:absolute;inset:-1px;border-radius:24px;padding:1px;
        background:linear-gradient(135deg, #8b5cf6, #06b6d4, #ec4899, #8b5cf6);
        background-size:300% 300%;
        animation: vo-shimmer 4s ease infinite;
        -webkit-mask:linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite:xor;mask-composite:exclude;
        opacity:.6;
      }
      @keyframes vo-shimmer { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }

      /* ── Header ── */
      .vote-header { text-align:center;margin-bottom:24px; }
      .vote-icon {
        width:64px;height:64px;margin:0 auto 14px;border-radius:16px;
        background:rgba(139,92,246,.12);
        border:1px solid rgba(139,92,246,.3);
        display:flex;align-items:center;justify-content:center;
        overflow:hidden;
        box-shadow:0 8px 32px -8px rgba(139,92,246,.5);
        animation: vo-iconBounce 2s ease infinite;
      }
      .vote-icon img { width:100%; height:100%; object-fit:contain; display:block; }
      @keyframes vo-iconBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      .vote-title {
        font-size:1.3rem;font-weight:900;
        background:linear-gradient(135deg,#e2e8f0,#8b5cf6);
        -webkit-background-clip:text;-webkit-text-fill-color:transparent;
        background-clip:text;
        margin:0 0 6px;
      }
      .vote-subtitle {
        font-size:.8rem;color:#64748b;font-weight:500;
        letter-spacing:.03em;
      }

      /* ── Options ── */
      .vote-options { display:flex;flex-direction:column;gap:10px;margin-bottom:20px; }
      .vote-option {
        width:100%;padding:16px 20px;text-align:left;
        font-size:.9rem;font-weight:600;color:#c4b5fd;
        background:rgba(139,92,246,.06);
        border:1px solid rgba(139,92,246,.15);
        border-radius:14px;cursor:pointer;
        font-family:inherit;position:relative;overflow:hidden;
        transition:all .2s cubic-bezier(.4,0,.2,1);
        animation: vo-optIn .4s ease backwards;
      }
      .vote-option:nth-child(1){animation-delay:.1s}
      .vote-option:nth-child(2){animation-delay:.18s}
      .vote-option:nth-child(3){animation-delay:.26s}
      .vote-option:nth-child(4){animation-delay:.34s}
      .vote-option:nth-child(5){animation-delay:.42s}
      .vote-option:nth-child(6){animation-delay:.5s}
      @keyframes vo-optIn { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }

      .vote-option::before {
        content:'';position:absolute;inset:0;
        background:linear-gradient(135deg,rgba(139,92,246,.15),rgba(6,182,212,.1));
        opacity:0;transition:opacity .2s;
      }
      .vote-option:hover {
        border-color:rgba(139,92,246,.4);
        transform:translateX(6px) scale(1.01);
        box-shadow:0 4px 20px -4px rgba(139,92,246,.25);
      }
      .vote-option:hover::before { opacity:1; }

      .vote-option.selected {
        background:rgba(139,92,246,.15);
        border-color:#8b5cf6;
        color:#fff;
        box-shadow:0 0 24px -4px rgba(139,92,246,.4), inset 0 0 20px rgba(139,92,246,.1);
        transform:translateX(6px) scale(1.02);
      }
      .vote-option.selected::after {
        content:'✓';position:absolute;right:16px;top:50%;transform:translateY(-50%);
        font-size:1.1rem;color:#8b5cf6;font-weight:900;
        animation: vo-check .3s cubic-bezier(.175,.885,.32,1.275);
      }
      @keyframes vo-check { from{transform:translateY(-50%) scale(0)} to{transform:translateY(-50%) scale(1)} }

      /* ── Custom input ── */
      .vote-custom-input {
        width:100%;padding:14px 18px;margin-top:10px;
        background:rgba(139,92,246,.05);
        border:1px solid rgba(139,92,246,.2);
        border-radius:12px;color:#e2e8f0;font-size:.88rem;
        outline:none;font-family:inherit;
        display:none;
        transition:border-color .2s, box-shadow .2s;
      }
      .vote-custom-input:focus {
        border-color:#8b5cf6;
        box-shadow:0 0 16px -4px rgba(139,92,246,.3);
      }
      .vote-custom-input.show { display:block;animation:vo-optIn .3s ease; }

      /* ── Submit button ── */
      .vote-submit {
        width:100%;padding:16px;font-size:1rem;font-weight:800;
        color:#fff;border:none;border-radius:14px;
        cursor:pointer;font-family:inherit;
        background:linear-gradient(135deg,#8b5cf6,#7c3aed,#6d28d9);
        background-size:200% 200%;
        box-shadow:0 8px 32px -8px rgba(139,92,246,.4);
        opacity:.4;pointer-events:none;
        transition:all .3s cubic-bezier(.4,0,.2,1);
        position:relative;overflow:hidden;
        letter-spacing:.02em;
      }
      .vote-submit::before {
        content:'';position:absolute;inset:0;
        background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);
        transform:translateX(-100%);
        transition:transform .6s;
      }
      .vote-submit.active {
        opacity:1;pointer-events:auto;
        animation: vo-btnPulse 2s ease infinite;
      }
      .vote-submit.active:hover {
        transform:translateY(-2px) scale(1.02);
        box-shadow:0 12px 40px -8px rgba(139,92,246,.5);
      }
      .vote-submit.active:hover::before { transform:translateX(100%); }
      @keyframes vo-btnPulse {
        0%,100%{box-shadow:0 8px 32px -8px rgba(139,92,246,.4)}
        50%{box-shadow:0 8px 40px -4px rgba(139,92,246,.6)}
      }

      /* ── Exit animation ── */
      #vote-overlay.closing {
        animation: vo-fadeOut .4s ease forwards;
      }
      #vote-overlay.closing #vote-card {
        animation: vo-cardOut .4s cubic-bezier(.6,-.28,.74,.05) forwards;
      }
      @keyframes vo-fadeOut { to{opacity:0} }
      @keyframes vo-cardOut { to{opacity:0;transform:scale(.9) translateY(-30px)} }

      /* ── Confetti burst ── */
      .vote-confetti {
        position:absolute;width:8px;height:8px;border-radius:2px;
        z-index:10;pointer-events:none;
        animation: vo-confettiFall 1s cubic-bezier(.25,.46,.45,.94) forwards;
      }
      @keyframes vo-confettiFall {
        0%   { transform:translate(0,0) rotate(0deg) scale(1); opacity:1; }
        100% { transform:translate(var(--cx),var(--cy)) rotate(720deg) scale(0); opacity:0; }
      }
    `;
    document.head.appendChild(vs);
  }

  var overlay = document.createElement('div');
  overlay.id = 'vote-overlay';

  // Floating particles
  var particlesHTML = '';
  for (var p = 0; p < 20; p++) {
    var size = Math.random() * 6 + 3;
    var left = Math.random() * 100;
    var dur = Math.random() * 6 + 4;
    var delay = Math.random() * 5;
    var color = ['#8b5cf6','#06b6d4','#ec4899','#a78bfa','#67e8f9'][Math.floor(Math.random()*5)];
    particlesHTML += '<div class="vote-particle" style="width:'+size+'px;height:'+size+'px;left:'+left+'%;background:'+color+';animation-duration:'+dur+'s;animation-delay:'+delay+'s"></div>';
  }

  // Options HTML
  var optionsHTML = '';
  poll.options.forEach(function(opt, i) {
    optionsHTML += '<button class="vote-option" data-index="'+i+'" data-value="'+escapeHTMLBasic(opt)+'">'+escapeHTMLBasic(opt)+'</button>';
  });
  if (poll.allowCustom) {
    optionsHTML += '<button class="vote-option" data-index="custom" data-value="__custom__">✏️ Type your own suggestion</button>';
  }

  overlay.innerHTML =
    particlesHTML +
    '<div class="vote-glow-ring"></div>' +
    '<div id="vote-card">' +
      '<div class="vote-header">' +
        '<div class="vote-icon"><img src="Images/logo.png" alt="AightBet" onerror="this.parentNode.textContent=\'🗳️\';this.parentNode.style.fontSize=\'1.8rem\'"></div>' +
        '<h2 class="vote-title">' + escapeHTMLBasic(poll.question) + '</h2>' +
        '<p class="vote-subtitle">YOUR VOTE IS NEEDED — PICK ONE TO CONTINUE</p>' +
      '</div>' +
      '<div class="vote-options">' + optionsHTML + '</div>' +
      (poll.allowCustom ? '<input type="text" class="vote-custom-input" id="vote-custom-text" placeholder="Type your suggestion here...">' : '') +
      '<button class="vote-submit" id="vote-submit-btn">⚡ Submit Vote</button>' +
    '</div>';

  document.body.appendChild(overlay);

  // ── Logic ──
  var selectedChoice = null;
  var isCustom = false;
  var options = overlay.querySelectorAll('.vote-option');
  var submitBtn = overlay.querySelector('#vote-submit-btn');
  var customInput = overlay.querySelector('#vote-custom-text');

  options.forEach(function(btn) {
    btn.addEventListener('click', function() {
      options.forEach(function(b) { b.classList.remove('selected'); });
      btn.classList.add('selected');

      if (btn.dataset.index === 'custom') {
        isCustom = true;
        selectedChoice = null;
        if (customInput) { customInput.classList.add('show'); customInput.focus(); }
        submitBtn.classList.toggle('active', !!(customInput && customInput.value.trim()));
      } else {
        isCustom = false;
        selectedChoice = btn.dataset.value;
        if (customInput) customInput.classList.remove('show');
        submitBtn.classList.add('active');
      }
    });
  });

  if (customInput) {
    customInput.addEventListener('input', function() {
      if (isCustom) submitBtn.classList.toggle('active', !!customInput.value.trim());
    });
  }

  submitBtn.addEventListener('click', function() {
    if (!submitBtn.classList.contains('active')) return;

    var voteData = {};
    if (isCustom) { voteData.custom = customInput.value.trim(); }
    else { voteData.choice = selectedChoice; }
    voteData.votedAt = firebase.database.ServerValue.TIMESTAMP;

    // Confetti burst!
    spawnConfetti(overlay);

    firebase.database().ref('settings/poll/votes/' + uid).set(voteData).then(function() {
      setTimeout(function() {
        overlay.classList.add('closing');
        setTimeout(function() { if (overlay.parentNode) overlay.remove(); }, 400);
      }, 600);
    }).catch(function(err) { console.error('[POLL] vote error', err); });
  });
}

function spawnConfetti(container) {
  var colors = ['#8b5cf6','#06b6d4','#ec4899','#f59e0b','#10b981','#fff'];
  for (var i = 0; i < 40; i++) {
    var conf = document.createElement('div');
    conf.className = 'vote-confetti';
    var cx = (Math.random() - 0.5) * 500;
    var cy = (Math.random() - 0.5) * 500 - 200;
    conf.style.cssText = 'left:50%;top:50%;background:'+colors[Math.floor(Math.random()*colors.length)]+';--cx:'+cx+'px;--cy:'+cy+'px;animation-delay:'+(Math.random()*0.2)+'s;width:'+(Math.random()*8+4)+'px;height:'+(Math.random()*8+4)+'px';
    container.appendChild(conf);
    setTimeout(function(el){ if(el.parentNode) el.remove(); }.bind(null,conf), 1200);
  }
}
      // ── MYTHIC DROP & BIG-WIN ANNOUNCEMENTS (auto — games push to mythicDrops directly) ──
      (function(){
        // CSS for the slide banner
        if(!document.getElementById('mythic-banner-style')){
          var mbs = document.createElement('style');
          mbs.id = 'mythic-banner-style';
          mbs.textContent =
            '#mythic-slide{position:fixed;top:0;left:0;right:0;z-index:99;' +
            'transform:translateY(-100%);' +
            'display:flex;align-items:center;justify-content:center;gap:10px;' +
            'padding:10px 20px;' +
            'background:linear-gradient(135deg,rgba(139,92,246,.92),rgba(236,72,153,.88));' +
            'border-bottom:1px solid rgba(255,255,255,.15);' +
            'backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);' +
            'box-shadow:0 4px 24px rgba(139,92,246,.3);' +
            'font-family:"Segoe UI",system-ui,sans-serif;' +
            'transition:transform .45s cubic-bezier(.4,0,.2,1)}' +
            '#mythic-slide.bigwin{background:linear-gradient(135deg,rgba(245,158,11,.95),rgba(220,38,38,.9))}' +
            '#mythic-slide.show{transform:translateY(var(--nav-h,64px))}' +
            '#mythic-slide .ms-star{font-size:1.2rem;animation:ms-pop .5s ease;display:inline-flex;align-items:center;justify-content:center}' +
            '#mythic-slide .ms-logo{width:24px;height:24px;border-radius:6px;object-fit:contain;animation:ms-pop .5s ease;flex-shrink:0;display:block}' +
            '#mythic-slide .ms-text{font-size:.85rem;font-weight:700;color:#fff}' +
            '#mythic-slide .ms-user{color:#e0f2fe;font-weight:800}' +
            '#mythic-slide .ms-item{color:#fde68a;font-weight:900}' +
            '#mythic-slide.bigwin .ms-user{color:#fef3c7}' +
            '#mythic-slide.bigwin .ms-item{color:#fff}' +
            '@keyframes ms-pop{0%{transform:scale(0) rotate(-20deg)}60%{transform:scale(1.3) rotate(5deg)}100%{transform:scale(1) rotate(0)}}';
          document.head.appendChild(mbs);
        }

        // Show the slide bar below navbar
        function showMythicDropBanner(userName, itemName){
          var old = document.getElementById('mythic-slide');
          if(old) old.parentNode.removeChild(old);
          var bar = document.createElement('div');
          bar.id = 'mythic-slide';
          bar.innerHTML =
            '<img class="ms-logo" src="Images/logo.png" alt="" onerror="this.outerHTML=\'<span class=ms-star>&#10024;</span>\'">' +
            '<span class="ms-text">' +
              '<span class="ms-user">' + escapeHTMLBasic(userName) + '</span>' +
              ' just got ' +
              '<span class="ms-item">' + escapeHTMLBasic(itemName) + '</span>' +
            '</span>' +
            '<img class="ms-logo" src="Images/logo.png" alt="" onerror="this.outerHTML=\'<span class=ms-star>&#10024;</span>\'">';
          document.body.appendChild(bar);
          requestAnimationFrame(function(){ requestAnimationFrame(function(){ bar.classList.add('show'); }); });
          setTimeout(function(){
            bar.classList.remove('show');
            setTimeout(function(){ if(bar.parentNode) bar.parentNode.removeChild(bar); }, 500);
          }, 5000);
        }

        function showBigWinBanner(userName, amount, source){
          var old = document.getElementById('mythic-slide');
          if(old) old.parentNode.removeChild(old);
          var bar = document.createElement('div');
          bar.id = 'mythic-slide';
          bar.classList.add('bigwin');
          var amountStr = '🪙 ' + Number(amount||0).toLocaleString();
          bar.innerHTML =
            '<img class="ms-logo" src="Images/logo.png" alt="" onerror="this.outerHTML=\'<span class=ms-star>&#128176;</span>\'">' +
            '<span class="ms-text">' +
              '<span class="ms-user">' + escapeHTMLBasic(userName) + '</span>' +
              ' just won ' +
              '<span class="ms-item">' + amountStr + '</span>' +
              (source ? ' on <span class="ms-item">' + escapeHTMLBasic(source) + '</span>' : '') +
            '</span>' +
            '<img class="ms-logo" src="Images/logo.png" alt="" onerror="this.outerHTML=\'<span class=ms-star>&#128293;</span>\'">';
          document.body.appendChild(bar);
          requestAnimationFrame(function(){ requestAnimationFrame(function(){ bar.classList.add('show'); }); });
          setTimeout(function(){
            bar.classList.remove('show');
            setTimeout(function(){ if(bar.parentNode) bar.parentNode.removeChild(bar); }, 500);
          }, 5500);
        }

        // Listen for new mythicDrops (mythic case loot AND big credit wins from any game).
        // Use child_added with an age filter — much more reliable than value+seen-key
        // diffing, which can silently drop events when limitToLast bumps entries out
        // of the window between init and the next fire.
        var bigwinSeen = {};
        var BIGWIN_MAX_AGE_MS = 30000; // 30s grace — newer entries always show
        rtdb.ref('mythicDrops').limitToLast(50).on('child_added', function(snap){
          var key = snap.key;
          if(bigwinSeen[key]) return;
          bigwinSeen[key] = true;
          var drop = snap.val();
          if(!drop) return;
          // Filter out historical entries (loaded on initial fetch) by age.
          // Server timestamps reconcile across clients; if absent, skip.
          if(typeof drop.timestamp !== 'number') return;
          var ageMs = Date.now() - drop.timestamp;
          if(ageMs > BIGWIN_MAX_AGE_MS) return;
          if(drop.type === 'big_win' && drop.user && drop.amount){
            console.log('[BIGWIN-RECV]', drop);
            showBigWinBanner(drop.user, drop.amount, drop.source || '');
          } else if(drop.item && drop.user){
            console.log('[MYTHIC-RECV]', drop);
            showMythicDropBanner(drop.user, drop.item);
          }
        });
      })();

      // ── LQM: sync from DB (source of truth), update localStorage to match ──
      rtdb.ref('users/'+u.uid+'/lqm').once('value',function(snap){
        var lqmOn=snap.val()===true;
        document.body.classList.toggle('lqm',lqmOn);
        localStorage.setItem('aightbet-lqm',lqmOn?'true':'false');
      });

      // ── SLQM: sync from DB (source of truth), update localStorage to match ──
      rtdb.ref('users/'+u.uid+'/slqm').once('value',function(snap){
        var slqmOn=snap.val()===true;
        document.body.classList.toggle('slqm',slqmOn);
        localStorage.setItem('aightbet-slqm',slqmOn?'true':'false');
        var exitBtn=document.getElementById('slqm-exit');
        if(exitBtn)exitBtn.classList.toggle('visible',slqmOn);
      });


      (function(){
    /* ── CSS ── */
    var recStyle = document.createElement('style');
    recStyle.id = 'rec-fab-style';
    recStyle.textContent =
      '#rec-fab{position:fixed;bottom:68px;left:24px;z-index:9998;display:flex;align-items:center;gap:8px;cursor:pointer;user-select:none;-webkit-user-select:none}' +
      '#rec-fab-btn{width:48px;height:48px;border-radius:50%;border:1px solid rgba(239,68,68,.3);background:rgba(239,68,68,.12);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .15s,background .2s,box-shadow .25s}' +
      '#rec-fab-btn:hover{transform:scale(1.1);background:rgba(239,68,68,.2);box-shadow:0 6px 24px -4px rgba(239,68,68,.4)}' +
      '#rec-fab-btn .rec-dot{width:18px;height:18px;background:#ef4444;border-radius:50%;transition:all .2s}' +
      '#rec-fab.recording #rec-fab-btn{background:rgba(239,68,68,.25);border-color:rgba(239,68,68,.5);box-shadow:0 0 20px rgba(239,68,68,.3)}' +
      '#rec-fab.recording #rec-fab-btn .rec-dot{width:14px;height:14px;border-radius:3px;animation:rec-pulse 1s ease-in-out infinite}' +
      '@keyframes rec-pulse{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(239,68,68,.4)}50%{opacity:.7;box-shadow:0 0 0 8px rgba(239,68,68,0)}}' +
      '#rec-timer{display:none;padding:6px 12px;background:rgba(239,68,68,.15);backdrop-filter:blur(12px);border:1px solid rgba(239,68,68,.25);border-radius:8px;font-size:.78rem;font-weight:700;color:#f87171;font-variant-numeric:tabular-nums;letter-spacing:.02em;font-family:monospace}' +
      '#rec-fab.recording #rec-timer{display:block}' +
      '#rec-stop-label{display:none;font-size:.65rem;color:#f87171;font-weight:700;opacity:.7}' +
      '#rec-fab.recording #rec-stop-label{display:block}' +
      /* Hide on mobile if too crowded */
'@media(max-width:768px){#rec-fab{bottom:96px!important;left:12px!important}#rec-fab-btn{width:42px;height:42px}}' +
'@media(orientation:landscape)and(max-width:1024px){#rec-fab{display:none!important}}';
  if(!document.getElementById('rec-fab-style')) document.head.appendChild(recStyle);

    /* ── HTML ── */
    var fab = document.createElement('div');
    fab.id = 'rec-fab';
    fab.innerHTML =
      '<div id="rec-fab-btn" title="Record this tab"><div class="rec-dot"></div></div>' +
      '<div style="display:flex;flex-direction:column;gap:2px">' +
        '<div id="rec-timer">00:00</div>' +
        '<div id="rec-stop-label">click to stop</div>' +
      '</div>';

    /* ── BroadcastChannel ── */
    var bc = new BroadcastChannel('aightbet-recorder');
    var isRecording = false;
    var recStartTime = 0;
    var timerInterval = null;
    var recPopup = null;

    function updateTimer(){
      if(!recStartTime) return;
      var elapsed = Math.floor((Date.now() - recStartTime) / 1000);
      var m = Math.floor(elapsed / 60);
      var s = elapsed % 60;
      var el = document.getElementById('rec-timer');
      if(el) el.textContent = String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
    }
function updateRecFabVisibility() {
  var fab = document.getElementById('rec-fab');
  if (!fab) return;
  var isLandscapeMobile =
    window.matchMedia('(orientation:landscape) and (max-width:1024px)').matches;
  fab.style.display = isLandscapeMobile ? 'none' : '';
}

window.addEventListener('orientationchange', updateRecFabVisibility);
window.addEventListener('resize', updateRecFabVisibility); // catches desktop resize too
updateRecFabVisibility(); // run once on load
    function setRecordingState(on, start){
      isRecording = on;
      if(on){
        recStartTime = start || Date.now();
        fab.classList.add('recording');
        fab.querySelector('#rec-fab-btn').title = 'Stop recording';
        clearInterval(timerInterval);
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
      } else {
        fab.classList.remove('recording');
        fab.querySelector('#rec-fab-btn').title = 'Record this tab';
        clearInterval(timerInterval);
        var el = document.getElementById('rec-timer');
        if(el) el.textContent = '00:00';
        recStartTime = 0;
      }
    }

    /* ── Click handler ── */
    function onFabClick(){
      if(isRecording){
        /* Send stop to popup */
        bc.postMessage({ type: 'stop' });
        setRecordingState(false);
      } else {
        /* Open recorder popup */
       var w = 520, h = 460;
        var left = (screen.width - w) / 2;
        var top  = (screen.height - h) / 2;
        recPopup = window.open(
          'recorder.html',
          'aightbet-recorder',
          'width=' + w + ',height=' + h + ',top=' + top + ',left=' + left + ',resizable=no,scrollbars=no,menubar=no,toolbar=no,status=no'
        );
      }
    }

    /* ── BroadcastChannel listener ── */
    bc.onmessage = function(e){
      if(!e.data) return;
      if(e.data.type === 'recording'){
        setRecordingState(e.data.recording, e.data.startTime);
      }
      if(e.data.type === 'saved'){
        setRecordingState(false);
      }
    };

    /* ── Inject ── */
    function inject(){
      document.body.appendChild(fab);
      fab.querySelector('#rec-fab-btn').addEventListener('click', onFabClick);

      /* Check if a recording is already active (from sessionStorage, set by popup) */
      if(sessionStorage.getItem('aightbet-rec-active') === '1'){
        var st = parseInt(sessionStorage.getItem('aightbet-rec-start') || '0');
        setRecordingState(true, st || Date.now());
        /* Ping the popup to confirm it's still alive */
        bc.postMessage({ type: 'ping' });
      }
    }

    document.body ? inject() : document.addEventListener('DOMContentLoaded', inject);
  })();


      // ── Hacker mode: sync from DB ──
      rtdb.ref('users/'+u.uid+'/hacker').once('value',function(snap){
        var on=snap.val()===true;
        localStorage.setItem('aightbet-hacker',on?'true':'false');
        if(window.__setHackerMode) window.__setHackerMode(on);
      });


      // Global messages — check for unseen messages
      checkGlobalMessages(u.uid);


    });
  });

  function checkGlobalMessages(uid){
    var rtdb=firebase.database();
    var shown=false;

    rtdb.ref('globalMessages').on('value',function(snap){
      if(shown)return;
      var messages=snap.val();
      if(!messages)return;

      var unseen=[];
      for(var id in messages){
        var m=messages[id];
        if(!m.seenBy||!m.seenBy[uid]){
          unseen.push({id:id,text:m.text,createdAt:m.createdAt||0});
        }
      }
      if(!unseen.length)return;
      unseen.sort(function(a,b){return a.createdAt-b.createdAt;});

      shown=true;
      showMessagePopup(unseen,0,uid,function(){shown=false;});
    });
  }

  function showMessagePopup(messages,index,uid,onDone){
    if(index>=messages.length){onDone();return;}

    var msg=messages[index];
    var remaining=messages.length-index;

    var overlay=document.createElement('div');
    overlay.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.7);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px;animation:gmFadeIn .3s ease';

    var card=document.createElement('div');
    card.style.cssText='background:rgba(15,15,25,.97);border:1px solid rgba(255,255,255,.12);border-radius:20px;max-width:500px;width:100%;padding:28px;position:relative;animation:gmSlideIn .35s ease;font-family:Segoe UI,system-ui,-apple-system,sans-serif';

    var badge=remaining>1?'<span style="position:absolute;top:16px;right:16px;background:rgba(139,92,246,.15);color:#8b5cf6;font-size:.7rem;font-weight:700;padding:3px 10px;border-radius:6px">'+remaining+' message'+(remaining>1?'s':'')+'</span>':'';

    var date=msg.createdAt?new Date(msg.createdAt).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric',hour:'2-digit',minute:'2-digit'}):'';

    card.innerHTML=badge+'<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px"><div style="width:42px;height:42px;border-radius:10px;background:rgba(139,92,246,.12);border:1px solid rgba(139,92,246,.3);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0"><img src="Images/logo.png" alt="AightBet" style="width:100%;height:100%;object-fit:contain;display:block" onerror="this.parentNode.style.background=\'linear-gradient(135deg,#8b5cf6,#06b6d4)\';this.remove()"></div><div><div style="font-size:1.1rem;font-weight:900;color:#e2e8f0">Message from AightBet</div><div style="font-size:.75rem;color:#94a3b8">'+date+'</div></div></div><div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:16px;font-size:.92rem;line-height:1.6;color:#e2e8f0;margin-bottom:20px;max-height:200px;overflow-y:auto;word-break:break-word">'+escapeHTMLBasic(msg.text)+'</div><button id="gmDismissBtn" style="width:100%;padding:12px;font-size:.9rem;font-weight:700;color:#fff;background:linear-gradient(135deg,#8b5cf6,#7c3aed);border:none;border-radius:12px;cursor:pointer;font-family:inherit;transition:transform .15s">Got it</button>';

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    var style=document.createElement('style');
    style.id='gm-anim-style';
    if(!document.getElementById('gm-anim-style')){
      style.textContent='@keyframes gmFadeIn{from{opacity:0}to{opacity:1}}@keyframes gmSlideIn{from{opacity:0;transform:scale(.95) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}';
      document.head.appendChild(style);
    }

    card.querySelector('#gmDismissBtn').addEventListener('click',function(){
      firebase.database().ref('globalMessages/'+msg.id+'/seenBy/'+uid).set(true);

      overlay.style.transition='opacity .25s';
      overlay.style.opacity='0';
      setTimeout(function(){
        if(overlay.parentNode)overlay.parentNode.removeChild(overlay);
        showMessagePopup(messages,index+1,uid,onDone);
      },250);
    });
  }

  // ══════════════════════════════════════════════════════
  // TARGETED MESSAGE OVERLAY (private DM from support to one user)
  // Marks each message seen as the user dismisses it.
  // ══════════════════════════════════════════════════════
  function showTargetedMessageQueue(uid, queue, index){
    if(index>=queue.length) return;
    var msg=queue[index];

    if(!document.getElementById('tm-popup-style')){
      var ts=document.createElement('style');
      ts.id='tm-popup-style';
      ts.textContent=
        '#tm-popup-overlay{position:fixed;inset:0;z-index:999998;background:rgba(0,0,0,.7);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px;animation:tmFadeIn .3s ease;font-family:"Segoe UI",system-ui,-apple-system,sans-serif}'+
        '@keyframes tmFadeIn{from{opacity:0}to{opacity:1}}'+
        '@keyframes tmSlideIn{from{opacity:0;transform:scale(.95) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}'+
        '#tm-popup-card{background:rgba(15,15,25,.97);border:1px solid rgba(139,92,246,.3);border-radius:18px;max-width:480px;width:100%;padding:26px;animation:tmSlideIn .35s ease;box-shadow:0 20px 60px -10px rgba(139,92,246,.35)}'+
        '.tm-pop-head{display:flex;align-items:center;gap:10px;margin-bottom:14px}'+
        '.tm-pop-icon{width:42px;height:42px;border-radius:12px;background:rgba(139,92,246,.15);border:1px solid rgba(139,92,246,.3);display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;color:#c4b5fd;font-weight:900}'+
        '.tm-pop-title{font-size:1.05rem;font-weight:900;color:#e2e8f0}'+
        '.tm-pop-meta{font-size:.7rem;color:#94a3b8}'+
        '.tm-pop-body{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:14px;font-size:.9rem;line-height:1.55;color:#e2e8f0;margin-bottom:18px;max-height:240px;overflow-y:auto;word-break:break-word}'+
        '.tm-pop-badge{display:inline-block;font-size:.6rem;font-weight:800;letter-spacing:.06em;padding:2px 8px;border-radius:5px;background:rgba(139,92,246,.18);color:#c4b5fd;margin-bottom:6px;text-transform:uppercase}'+
        '.tm-pop-ok{width:100%;padding:12px;font-size:.9rem;font-weight:800;color:#fff;background:linear-gradient(135deg,#8b5cf6,#7c3aed);border:none;border-radius:12px;cursor:pointer;font-family:inherit;letter-spacing:.02em;transition:transform .15s}'+
        '.tm-pop-ok:hover{transform:translateY(-1px)}';
      document.head.appendChild(ts);
    }

    var date = msg.at ? new Date(msg.at).toLocaleString(undefined,{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}) : '';
    var remaining = queue.length-index;

    var overlay=document.createElement('div');
    overlay.id='tm-popup-overlay';
    overlay.innerHTML=
      '<div id="tm-popup-card">'+
        '<div class="tm-pop-head">'+
          '<div class="tm-pop-icon">!</div>'+
          '<div style="flex:1">'+
            '<span class="tm-pop-badge">Support Notice'+(remaining>1?(' · '+remaining+' to read'):'')+'</span>'+
            '<div class="tm-pop-title">Message from '+escapeHTMLBasic(msg.byName||'Support')+'</div>'+
            '<div class="tm-pop-meta">'+escapeHTMLBasic(date)+'</div>'+
          '</div>'+
        '</div>'+
        '<div class="tm-pop-body">'+escapeHTMLBasic(msg.text||'')+'</div>'+
        '<button class="tm-pop-ok" id="tm-pop-ok-btn">Got it</button>'+
      '</div>';
    document.body.appendChild(overlay);

    overlay.querySelector('#tm-pop-ok-btn').addEventListener('click', function(){
      try{
        firebase.database().ref('targetedMessages/'+uid+'/'+msg.id).update({
          seen:true, seenAt: firebase.database.ServerValue.TIMESTAMP
        }).catch(function(){});
      }catch(_){}
      overlay.style.transition='opacity .25s';
      overlay.style.opacity='0';
      setTimeout(function(){
        if(overlay.parentNode) overlay.parentNode.removeChild(overlay);
        showTargetedMessageQueue(uid, queue, index+1);
      },250);
    });
  }

  // ══════════════════════════════════════════════════════
  // WARNING OVERLAY (issued by support; user must acknowledge)
  // ══════════════════════════════════════════════════════
  function showWarningQueue(uid, queue, index){
    if(index>=queue.length) return;
    var w=queue[index];

    if(!document.getElementById('warn-popup-style')){
      var ws=document.createElement('style');
      ws.id='warn-popup-style';
      ws.textContent=
        '#warn-popup-overlay{position:fixed;inset:0;z-index:999998;background:rgba(0,0,0,.78);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:20px;animation:wFadeIn .3s ease;font-family:"Segoe UI",system-ui,-apple-system,sans-serif}'+
        '@keyframes wFadeIn{from{opacity:0}to{opacity:1}}'+
        '@keyframes wPop{0%{transform:scale(.85);opacity:0}60%{transform:scale(1.04)}100%{transform:scale(1);opacity:1}}'+
        '#warn-popup-card{background:rgba(20,15,10,.98);border:1px solid rgba(245,158,11,.45);border-radius:18px;max-width:460px;width:100%;padding:26px;animation:wPop .4s cubic-bezier(.175,.885,.32,1.275);box-shadow:0 20px 60px -10px rgba(245,158,11,.4)}'+
        '.w-pop-head{display:flex;align-items:center;gap:12px;margin-bottom:14px}'+
        '.w-pop-icon{width:48px;height:48px;border-radius:14px;background:rgba(245,158,11,.18);border:1px solid rgba(245,158,11,.45);display:flex;align-items:center;justify-content:center;font-size:1.4rem;font-weight:900;color:#fbbf24;flex-shrink:0}'+
        '.w-pop-title{font-size:1.15rem;font-weight:900;color:#fef3c7}'+
        '.w-pop-meta{font-size:.7rem;color:#fbbf24}'+
        '.w-pop-reason{background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.2);border-radius:12px;padding:14px;font-size:.92rem;line-height:1.55;color:#fef3c7;margin-bottom:18px;max-height:200px;overflow-y:auto;word-break:break-word}'+
        '.w-pop-note{font-size:.75rem;color:#cbd5e1;margin-bottom:14px;line-height:1.5}'+
        '.w-pop-ok{width:100%;padding:13px;font-size:.92rem;font-weight:800;color:#1f1300;background:linear-gradient(135deg,#fbbf24,#f59e0b);border:none;border-radius:12px;cursor:pointer;font-family:inherit;letter-spacing:.02em;transition:transform .15s}'+
        '.w-pop-ok:hover{transform:translateY(-1px)}';
      document.head.appendChild(ws);
    }

    var date = w.at ? new Date(w.at).toLocaleString(undefined,{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}) : '';
    var remaining = queue.length-index;

    var overlay=document.createElement('div');
    overlay.id='warn-popup-overlay';
    overlay.innerHTML=
      '<div id="warn-popup-card">'+
        '<div class="w-pop-head">'+
          '<div class="w-pop-icon">!</div>'+
          '<div style="flex:1">'+
            '<div class="w-pop-title">Warning from '+escapeHTMLBasic(w.byName||'Support')+'</div>'+
            '<div class="w-pop-meta">'+escapeHTMLBasic(date)+(remaining>1?(' · '+remaining+' warnings to acknowledge'):'')+'</div>'+
          '</div>'+
        '</div>'+
        '<div class="w-pop-note">You have received an official warning. Please review the reason below — repeat infractions may result in a ban.</div>'+
        '<div class="w-pop-reason"><strong>Reason:</strong> '+escapeHTMLBasic(w.reason||'(no reason provided)')+'</div>'+
        '<button class="w-pop-ok" id="w-pop-ok-btn">I understand</button>'+
      '</div>';
    document.body.appendChild(overlay);

    overlay.querySelector('#w-pop-ok-btn').addEventListener('click', function(){
      try{
        firebase.database().ref('moderation/'+uid+'/warnings/'+w.id).update({
          seen:true, seenAt: firebase.database.ServerValue.TIMESTAMP
        }).catch(function(){});
      }catch(_){}
      overlay.style.transition='opacity .25s';
      overlay.style.opacity='0';
      setTimeout(function(){
        if(overlay.parentNode) overlay.parentNode.removeChild(overlay);
        showWarningQueue(uid, queue, index+1);
      },250);
    });
  }


  function escapeHTMLBasic(s){
    var d=document.createElement('div');
    d.textContent=s||'';
    return d.innerHTML;
  }


 // ══════════════════════════════════════════════════════
// BG MUSIC
// ══════════════════════════════════════════════════════
(function(){
  /* ── Persistent media cache (IndexedDB) — shared across all pages.
     Once a song's audio/cover is fetched it is stored locally, so replays
     and reloads never re-download from the database. New songs still come
     from the DB the first time, then get cached too. ── */
  if(!window.FMCache){
    window.FMCache = (function(){
      var DBN='AightbetFMCache', _db=null;
      function open(){
        return new Promise(function(res,rej){
          if(_db){ res(_db); return; }
          try{
            var r=indexedDB.open(DBN,1);
            r.onupgradeneeded=function(e){ var db=e.target.result;
              if(!db.objectStoreNames.contains('audio')) db.createObjectStore('audio');
              if(!db.objectStoreNames.contains('cover')) db.createObjectStore('cover');
              if(!db.objectStoreNames.contains('meta'))  db.createObjectStore('meta');
            };
            r.onsuccess=function(e){ _db=e.target.result; res(_db); };
            r.onerror=function(){ rej(r.error); };
          }catch(e){ rej(e); }
        });
      }
      function get(store,key){ return open().then(function(db){ return new Promise(function(res){ try{ var rq=db.transaction(store,'readonly').objectStore(store).get(key); rq.onsuccess=function(){ res(rq.result===undefined?null:rq.result); }; rq.onerror=function(){ res(null); }; }catch(e){ res(null); } }); }).catch(function(){ return null; }); }
      function put(store,key,val){ return open().then(function(db){ return new Promise(function(res){ try{ var tx=db.transaction(store,'readwrite'); tx.objectStore(store).put(val,key); tx.oncomplete=function(){ res(true); }; tx.onerror=function(){ res(false); }; }catch(e){ res(false); } }); }).catch(function(){ return false; }); }
      return {
        getAudio:function(id){ return get('audio',id); }, putAudio:function(id,v){ return put('audio',id,v); },
        getCover:function(id){ return get('cover',id); }, putCover:function(id,v){ return put('cover',id,v); },
        getMeta:function(k){ return get('meta',k); },     putMeta:function(k,v){ return put('meta',k,v); }
      };
    })();
  }

  var MUSIC_KEY  = 'aightbet-bgmusic';
  var PLAYER_ID  = 'aightbet-bgmusic-player';
  var KEY_ID     = 'aightbet-music-id';
  var KEY_TIME   = 'aightbet-music-time';
  var KEY_PAUSED = 'aightbet-music-paused';

  if(document.getElementById(PLAYER_ID)) return;
  if(localStorage.getItem(MUSIC_KEY) === 'off') return;

  /* Tracks are pulled live from the Aightbet FM library (Firebase `songs`).
     Each track: { id, src, title, album, art }. The little music bar widget
     reads window._musicPlayer.tracks / getIdx / setIdx as before. */
 var tracks   = [];
var idx      = 0;
var pendingSeek = 0;
var isReady  = false;

// Prevent old async audio loads from taking control
// after the user has selected another song.
var switchToken = 0;
  var readyCbs = [];

  var audio = document.createElement('audio');
  audio.id     = PLAYER_ID;
  audio.loop   = false;
  audio.volume = 0.25;
  try{
    var _savedVol = parseFloat(localStorage.getItem('aightbet-music-vol'));
    if(!isNaN(_savedVol) && _savedVol >= 0 && _savedVol <= 1) audio.volume = _savedVol;
  }catch(e){}
  document.body.appendChild(audio);

  function findById(id){ for(var i=0;i<tracks.length;i++){ if(tracks[i].id===id) return i; } return -1; }
  function replaceTracks(list){
    tracks.length = 0;
    for(var i=0;i<list.length;i++) tracks.push(list[i]);
    window._musicPlayer.tracks = tracks;
  }
  function saveState(){
    try{
      if(tracks[idx]) localStorage.setItem(KEY_ID, tracks[idx].id || '');
      /* While a resume seek is in flight (pendingSeek > 0) the audio element's
         currentTime is still 0/stale — don't overwrite the saved position with
         it, or we'd lose where the user actually left off. */
      if(pendingSeek <= 0 && (audio.currentTime || 0) > 0){
        localStorage.setItem(KEY_TIME, audio.currentTime);
      }
      /* IMPORTANT: KEY_PAUSED is NOT written here. Browsers auto-pause audio
         on page unload, which would falsely persist "user paused" and stop
         the next page from autoplaying. Paused state is only written via
         setUserPaused() at explicit user actions (toggle, play, next, etc.) */
    }catch(e){}
  }
  function setUserPaused(paused){
    try{ localStorage.setItem(KEY_PAUSED, paused ? '1' : '0'); }catch(e){}
  }
 function resolveSrc(t, cb){
  if(!t){ cb(null); return; }

  // Direct URL already supplied
  if(t.src){
    cb(t.src);
    return;
  }

  // Browser cache
  if(t._cached){
    cb(t._cached);
    return;
  }

  function fromDb(){
    try{
      // New Storage-based audio URL
      if(t.audioUrl){
        t._cached = t.audioUrl;
        if(window.FMCache) window.FMCache.putAudio(t.id, t.audioUrl);
        cb(t.audioUrl);
        return;
      }

      // Existing songAudio database location
      firebase.database().ref('songAudio/'+t.id).once('value').then(function(snap){
        var dd = snap.val();

        if(dd){
          t._cached = dd;
          if(window.FMCache) window.FMCache.putAudio(t.id, dd);
          cb(dd);
          return;
        }

        // Legacy songs/{id}/audio
        firebase.database().ref('songs/'+t.id+'/audio').once('value').then(function(s2){
          var d2 = s2.val();

          if(d2){
            t._cached = d2;
            if(window.FMCache) window.FMCache.putAudio(t.id, d2);
          }

          cb(d2 || null);
        }).catch(function(){
          cb(null);
        });

      }).catch(function(){
        cb(null);
      });

    }catch(e){
      cb(null);
    }
  }

  // IndexedDB first
  if(window.FMCache){
    window.FMCache.getAudio(t.id)
      .then(function(c){
        if(c){
          t._cached = c;
          cb(c);
        }else{
          fromDb();
        }
      })
      .catch(fromDb);
  }else{
    fromDb();
  }
}
 function loadTrack(i, autoplay){

  if(!tracks.length) return;

  // Every manual/automatic track change gets a new token.
  var myToken = ++switchToken;

  var newIdx = ((i % tracks.length) + tracks.length) % tracks.length;
  var t = tracks[newIdx];

  // Set the selected track immediately.
  idx = newIdx;

  if(t && localStorage.getItem(KEY_ID) === t.id && pendingSeek <= 0){

    var st = parseFloat(
      localStorage.getItem(KEY_TIME) || '0'
    );

    if(st > 0){
      pendingSeek = st;
    }
  }

  saveState();

  resolveSrc(t, function(src){

    // A newer song was selected while this one was loading.
    // Ignore this old request completely.
    if(myToken !== switchToken){
      return;
    }

    // Track list changed while loading.
    if(tracks[idx] !== t){
      return;
    }

    if(!src){

      if(
        autoplay &&
        tracks.length > 1 &&
        myToken === switchToken
      ){
        loadTrack(idx + 1, true);
      }

      return;
    }

    // Final safety check before changing the audio.
    if(myToken !== switchToken){
      return;
    }

    audio.src = src;

    if(autoplay){
      audio.play().catch(function(){});
    }

    // Warm the next track, but DON'T let it control playback.
    if(tracks.length > 1){

      var nextIdx = (idx + 1) % tracks.length;
      var nx = tracks[nextIdx];

      if(nx && nx !== t){

        resolveSrc(nx, function(){
          // Intentionally nothing.
          // This is only a cache warm-up.
        });

      }
    }

  });
}

  audio.addEventListener('ended', function(){ if(tracks.length) loadTrack(idx + 1, true); });
  audio.addEventListener('canplay', function(){ if(pendingSeek>0){ try{ audio.currentTime = pendingSeek; }catch(e){} pendingSeek = 0; } });
  audio.addEventListener('play', saveState);
  audio.addEventListener('pause', saveState);
  window.addEventListener('pagehide', saveState);
  window.addEventListener('beforeunload', saveState);
  setInterval(saveState, 1500);

  /* Public API — keeps the existing little-bar widget working, plus new helpers */
  window._musicPlayer = {
    tracks:  tracks,
    getIdx:  function(){ return idx; },
    setIdx:  function(i){ var wasPlaying = !audio.paused; loadTrack(i, wasPlaying); },
    getAudio:function(){ return audio; },
    saveState: saveState,
    isReady: function(){ return isReady; },
    onReady: function(cb){ if(isReady){ try{cb();}catch(e){} } else readyCbs.push(cb); },
    next:    function(){ setUserPaused(false); loadTrack(idx + 1, true); },
    prev:    function(){ setUserPaused(false); loadTrack(idx - 1, true); },
    toggle:  function(){ if(audio.paused){ setUserPaused(false); audio.play().catch(function(){}); } else { setUserPaused(true); audio.pause(); } },
    playId:  function(id){ var i = findById(id); if(i >= 0){ setUserPaused(false); loadTrack(i, true); } },
    playTracks: function(list, i){

  if(!list || !list.length) return;

  // Invalidate every previous async request.
  ++switchToken;

  setUserPaused(false);

  replaceTracks(list);

  var requestedIndex =
    Math.max(0, Math.min(
      Number.isFinite(i) ? i : 0,
      list.length - 1
    ));

  loadTrack(requestedIndex, true);
}
  };

  function tryPlay(shouldPlay){
    if(!tracks.length || window._musicPlayerNoAutoplay) return;
    resolveSrc(tracks[idx], function(src){
      if(window._musicPlayerNoAutoplay) return;
      if(src && !audio.src) audio.src = src;
      if(shouldPlay === false) return;   // just load + seek, stay paused as it was left
      audio.play().catch(function(){
        function onGesture(){
          if(!window._musicPlayerNoAutoplay) audio.play().catch(function(){});
          document.removeEventListener('click',   onGesture);
          document.removeEventListener('keydown', onGesture);
        }
        document.addEventListener('click',   onGesture);
        document.addEventListener('keydown', onGesture);
      });
    });
  }

  function buildTracks(arr){
    var savedId = localStorage.getItem(KEY_ID);
    var hasSaved = savedId && arr.some(function(t){ return t.id===savedId; });
    /* If the user was last listening to a song that isn't in the 30-most-recent
       window (or in the cached list), fetch that specific song directly from
       Firebase and prepend it so the bar can resume it across pages. */
    if(savedId && !hasSaved){
      try{
        if(typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length){
          firebase.database().ref('songs/'+savedId).once('value').then(function(snap){
            var s = snap.val();
            if(s){
              arr.unshift({ id:savedId, src:(s.audioUrl || s.audio || null), title:(s.title||'Untitled'), album:(s.album||(s.posterName||'Aightbet FM')), art:(s.cover||null), createdAt:(s.createdAt||0) });
            }
            _finalizeBuild(arr);
          }).catch(function(){ _finalizeBuild(arr); });
          return;
        }
      }catch(e){}
    }
    _finalizeBuild(arr);
  }

 function _finalizeBuild(arr){

  var prevId = tracks[idx] ? tracks[idx].id : null;
  var curId  = prevId || localStorage.getItem(KEY_ID);

  replaceTracks(arr);

  var fi = curId ? findById(curId) : -1;
  idx = fi >= 0 ? fi : 0;

  if(!isReady){

    var savedTime =
      parseFloat(localStorage.getItem(KEY_TIME) || '0');

    var savedPaused =
      localStorage.getItem(KEY_PAUSED) === '1';

    pendingSeek = savedTime > 0 ? savedTime : 0;

    isReady = true;

    readyCbs.forEach(function(cb){
      try{
        cb();
      }catch(e){}
    });

    readyCbs.length = 0;

    if(tracks[idx]){
      resolveSrc(tracks[idx], function(){});
    }

    tryPlay(!savedPaused);

  }else{

    // Firebase refreshed the song list.
    // NEVER reload the audio here.
    // The user may have selected another song.

    updateBar();
  }

  try{
    window.dispatchEvent(
      new Event('aightbet-music-ready')
    );
  }catch(e){}
  
  updateBar();
}

  function songsToTracks(data){
  var arr = [];

  Object.keys(data || {}).forEach(function(k){
    var s = data[k] || {};

    arr.push({
      id: k,
      src: s.audioUrl || s.audio || null,
      audioUrl: s.audioUrl || null,
      title: s.title || 'Untitled',
      album: s.album || (s.posterName || 'Aightbet FM'),
      art: s.cover || null,
      createdAt: s.createdAt || 0
    });
  });

  arr.sort(function(a,b){
    return (b.createdAt || 0) - (a.createdAt || 0);
  });

  return arr;
}

  var _fbTries = 0;
  function loadSongs(){
    /* 1) Instant: build the bar from the cached track list (no network wait).
       Skip the cached path if the user's last-played song isn't in the cache —
       otherwise the bar would briefly start the wrong song before the fresh
       database load corrects it. */
    if(window.FMCache && !isReady){
      window.FMCache.getMeta('barTracks').then(function(cached){
        if(!isReady && cached && cached.length){
          var sid = localStorage.getItem(KEY_ID);
          if(!sid || cached.some(function(t){ return t.id===sid; })) buildTracks(cached);
        }
      }).catch(function(){});
    }
    /* 2) Fresh: refresh from the database in the background, then re-cache */
    try{
      if(typeof firebase === 'undefined' || !firebase.apps || !firebase.apps.length){
        if(_fbTries++ < 30) setTimeout(loadSongs, 400);
        return;
      }
      var db = firebase.database();
      firebase.auth().onAuthStateChanged(function(u){
        if(!u) return; // songs require auth to read
        db.ref('songs').orderByChild('createdAt').limitToLast(30).once('value').then(function(snap){
          var arr = songsToTracks(snap.val() || {});
          buildTracks(arr);
          if(window.FMCache) window.FMCache.putMeta('barTracks', arr.map(function(t){ return { id:t.id, title:t.title, album:t.album, createdAt:t.createdAt }; }));
        }).catch(function(e){ /* read denied / offline */ });
      });
    }catch(e){ if(_fbTries++ < 30) setTimeout(loadSongs, 600); }
  }

  /* ── Cover art for the bar (cached / lazy) ── */
  function getArt(t, cb){
    if(!t){ cb(null); return; }
    if(t.art){ cb(t.art); return; }
    if(t._art !== undefined){ cb(t._art); return; }
    function done(d){ t._art = d || null; cb(t._art); }
    function db(){
      try{
        firebase.database().ref('songCover/'+t.id).once('value').then(function(s){
          var d = s.val(); if(d){ if(window.FMCache) window.FMCache.putCover(t.id, d); done(d); return; }
          firebase.database().ref('songs/'+t.id+'/cover').once('value').then(function(s2){ done(s2.val()); }).catch(function(){ done(null); });
        }).catch(function(){ done(null); });
      }catch(e){ done(null); }
    }
    if(window.FMCache){ window.FMCache.getCover(t.id).then(function(c){ if(c){ done(c); } else db(); }).catch(db); } else db();
  }

  /* ════════ Visible mini music bar ════════ */
  var ICON_NOTE  = '<svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:#fff;fill:none;stroke-width:1.8"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';
  var ICON_PLAY  = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
  var ICON_PAUSE = '<svg viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>';
  var ICON_PREV  = '<svg viewBox="0 0 24 24"><path d="M19 20L9 12l10-8v16zM5 19V5h2v14H5z"/></svg>';
  var ICON_NEXT  = '<svg viewBox="0 0 24 24"><path d="M5 4l10 8-10 8V4zm12 1h2v14h-2V5z"/></svg>';
  var ICON_LIB   = '<svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>';
  var ICON_CHEV_DOWN = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2.3;stroke-linecap:round;stroke-linejoin:round"><polyline points="6 9 12 15 18 9"/></svg>';
  var ICON_CHEV_UP   = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2.3;stroke-linecap:round;stroke-linejoin:round"><polyline points="18 15 12 9 6 15"/></svg>';
  function volIcon(level){
    if(level<=0) return '<svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>';
    if(level===1) return '<svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M16 9.5a4.5 4.5 0 0 1 0 5"/></svg>';
    return '<svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M16 9.5a4.5 4.5 0 0 1 0 5"/><path d="M19.5 7a8 8 0 0 1 0 10"/></svg>';
  }
  function fmtTime(s){ if(!isFinite(s) || s<0) s=0; s=Math.floor(s); var m=Math.floor(s/60), sec=s%60; return m+':'+(sec<10?'0':'')+sec; }

  function updateProgress(){
    var bar = document.getElementById('fm-mini-bar'); if(!bar) return;
    var fill = bar.querySelector('.fmb-progress-fill'), thumb = bar.querySelector('.fmb-progress-thumb'),
        curEl = bar.querySelector('.fmb-time-cur'), durEl = bar.querySelector('.fmb-time-dur');
    if(!fill) return;
    var d = audio.duration, c = audio.currentTime || 0;
    var pct = (d && isFinite(d) && d > 0) ? Math.min(100, (c / d) * 100) : 0;
    fill.style.width = pct + '%';
    if(thumb) thumb.style.left = pct + '%';
    if(curEl) curEl.textContent = fmtTime(c);
    if(durEl) durEl.textContent = fmtTime(d && isFinite(d) ? d : 0);
  }

  function updateBar(){
    var bar = document.getElementById('fm-mini-bar'); if(!bar) return;
    var t = tracks[idx];
    var titleEl = bar.querySelector('.fmb-title'), subEl = bar.querySelector('.fmb-sub'),
        artEl = bar.querySelector('.fmb-art'), playEl = bar.querySelector('.fmb-play');
    if(t){
      titleEl.textContent = t.title || 'Untitled';
      subEl.textContent   = t.album || 'Aightbet FM';
      if(bar._artId !== t.id){ bar._artId = t.id; artEl.innerHTML = ICON_NOTE; getArt(t, function(src){ if(bar._artId === t.id) artEl.innerHTML = src ? '<img src="'+src+'"/>' : ICON_NOTE; }); }
    }else{
      titleEl.textContent = 'Nothing playing';
      subEl.textContent   = 'Tap to open Aightbet FM';
      artEl.innerHTML = ICON_NOTE; bar._artId = null;
    }
    playEl.innerHTML = audio.paused ? ICON_PLAY : ICON_PAUSE;
    bar.classList.toggle('playing', !audio.paused);
    updateProgress();
  }

  function buildBarUI(){
    if(document.getElementById('fm-mini-bar')) return;
    var path = (location.pathname || '').toLowerCase();
    if(/music\.html$/.test(path)) return;                  // the full FM page is its own player
    var setting = localStorage.getItem('aightbet-musicbar') || 'all';
    var isHome  = /home\.html$/.test(path);
    if(setting === 'home' && !isHome) return;              // home-only mode

    var st = document.createElement('style');
    st.textContent =
      '#fm-mini-bar{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:99990;display:flex;flex-direction:column;padding:10px 16px 12px;background:linear-gradient(180deg,rgba(28,24,42,.92),rgba(16,14,24,.92));backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.13);border-radius:24px;box-shadow:0 16px 44px -12px rgba(0,0,0,.75),inset 0 1px 0 rgba(255,255,255,.07);max-width:min(440px,92vw);font-family:"Segoe UI",system-ui,sans-serif;animation:fmbIn .4s cubic-bezier(.2,.9,.3,1.2);transition:padding .3s ease,border-radius .3s ease}'+
      '@keyframes fmbIn{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}'+
      '#fm-mini-bar .fmb-row{display:flex;align-items:center;gap:12px;width:100%}'+
      '#fm-mini-bar .fmb-art{position:relative;width:44px;height:44px;border-radius:50%;flex-shrink:0;overflow:hidden;background:linear-gradient(135deg,#8b5cf6,#06b6d4);display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 3px 10px -2px rgba(0,0,0,.5);transition:width .3s,height .3s}'+
      '#fm-mini-bar .fmb-art img{width:100%;height:100%;object-fit:cover}'+
      '#fm-mini-bar .fmb-art::before{content:"";position:absolute;inset:-5px;border-radius:50%;border:2px solid #8b5cf6;opacity:0;pointer-events:none}'+
      '#fm-mini-bar.playing .fmb-art::before{animation:fmbPulse 1.8s ease-out infinite}'+
      '@keyframes fmbPulse{0%{transform:scale(.82);opacity:.65}100%{transform:scale(1.4);opacity:0}}'+
      '#fm-mini-bar .fmb-meta{min-width:0;cursor:pointer;max-width:140px}'+
      '#fm-mini-bar .fmb-title{font-size:.82rem;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
      '#fm-mini-bar .fmb-sub{font-size:.7rem;color:#9aa0b0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px}'+
      '#fm-mini-bar .fmb-ctrls{display:flex;align-items:center;gap:2px;margin-left:auto}'+
      '#fm-mini-bar button{background:none;border:none;cursor:pointer;color:#cbd5e1;display:flex;align-items:center;justify-content:center;padding:6px;border-radius:50%;transition:color .15s,background .15s,transform .15s}'+
      '#fm-mini-bar button:hover{color:#fff;background:rgba(255,255,255,.08)}'+
      '#fm-mini-bar button:active{transform:scale(.92)}'+
      '#fm-mini-bar button svg{width:18px;height:18px;fill:currentColor;stroke:none}'+
      '#fm-mini-bar .fmb-play{width:36px;height:36px;background:#fff;color:#12101c;box-shadow:0 3px 12px -2px rgba(255,255,255,.3);margin:0 2px}'+
      '#fm-mini-bar .fmb-play:hover{background:#fff;color:#12101c;transform:scale(1.06)}'+
      '#fm-mini-bar .fmb-play svg{width:17px;height:17px}'+
      '#fm-mini-bar .fmb-lib,#fm-mini-bar .fmb-vol,#fm-mini-bar .fmb-min{color:#9aa0b0}'+
      '#fm-mini-bar .fmb-lib svg,#fm-mini-bar .fmb-vol svg{fill:none;stroke:currentColor;stroke-width:2}'+
      '#fm-mini-bar .fmb-vol.active{color:#fff;background:rgba(255,255,255,.08)}'+
      '#fm-mini-bar .fmb-vol-wrap{position:relative}'+
      '#fm-mini-bar .fmb-vol-pop{position:absolute;bottom:48px;left:50%;transform:translateX(-50%) translateY(6px);background:rgba(24,22,36,.97);border:1px solid rgba(255,255,255,.14);border-radius:14px;padding:10px 12px;box-shadow:0 16px 36px -10px rgba(0,0,0,.65);opacity:0;pointer-events:none;transition:opacity .15s,transform .15s;display:flex;align-items:center}'+
      '#fm-mini-bar .fmb-vol-pop.open{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0)}'+
      '#fm-mini-bar .fmb-vol-range{-webkit-appearance:none;appearance:none;width:90px;height:4px;border-radius:4px;background:rgba(255,255,255,.18);outline:none;cursor:pointer}'+
      '#fm-mini-bar .fmb-vol-range::-webkit-slider-thumb{-webkit-appearance:none;width:13px;height:13px;border-radius:50%;background:#fff;box-shadow:0 0 0 3px rgba(139,92,246,.4),0 2px 5px rgba(0,0,0,.4);cursor:pointer}'+
      '#fm-mini-bar .fmb-vol-range::-moz-range-thumb{width:13px;height:13px;border:none;border-radius:50%;background:#fff;box-shadow:0 0 0 3px rgba(139,92,246,.4);cursor:pointer}'+
      '#fm-mini-bar .fmb-progress-row{display:flex;align-items:center;gap:8px;width:100%;margin-top:8px}'+
      '#fm-mini-bar .fmb-time-cur,#fm-mini-bar .fmb-time-dur{font-size:.62rem;color:#9aa0b0;font-weight:600;flex-shrink:0;min-width:28px;text-align:center;font-variant-numeric:tabular-nums}'+
      '#fm-mini-bar .fmb-progress-track{flex:1;position:relative;height:14px;display:flex;align-items:center;cursor:pointer;touch-action:none;user-select:none}'+
      '#fm-mini-bar .fmb-progress-line{position:relative;width:100%;height:4px;border-radius:4px;background:rgba(255,255,255,.15);overflow:hidden}'+
      '#fm-mini-bar .fmb-progress-fill{position:absolute;left:0;top:0;height:100%;width:0%;border-radius:4px;background:linear-gradient(90deg,#8b5cf6,#06b6d4)}'+
      '#fm-mini-bar .fmb-progress-thumb{position:absolute;top:50%;left:0%;width:10px;height:10px;border-radius:50%;background:#fff;box-shadow:0 0 0 3px rgba(255,255,255,.18),0 2px 6px rgba(0,0,0,.4);transform:translate(-50%,-50%);opacity:0;transition:opacity .15s}'+
      '#fm-mini-bar .fmb-progress-track:hover .fmb-progress-thumb,#fm-mini-bar .fmb-progress-track.dragging .fmb-progress-thumb{opacity:1}'+
      '#fm-mini-bar .fmb-progress-track.dragging .fmb-progress-fill{background:linear-gradient(90deg,#a78bfa,#22d3ee)}'+
      '#fm-mini-bar.mini{padding:7px;border-radius:50%}'+
      '#fm-mini-bar.mini .fmb-row{gap:0}'+
      '#fm-mini-bar.mini .fmb-meta,#fm-mini-bar.mini .fmb-ctrls,#fm-mini-bar.mini .fmb-progress-row{display:none}'+
      '#fm-mini-bar.mini .fmb-art{width:46px;height:46px}'+
      '#fm-lib-pop{position:fixed;inset:0;z-index:99991;display:none;align-items:flex-end;justify-content:center;background:rgba(0,0,0,.5);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);padding:0 0 96px}'+
      '#fm-lib-pop.open{display:flex;animation:fmbIn .25s ease}'+
      '#fm-lib-pop .flp-panel{width:min(440px,94vw);max-height:64vh;display:flex;flex-direction:column;background:rgba(20,18,30,.97);border:1px solid rgba(255,255,255,.12);border-radius:20px;box-shadow:0 24px 60px -12px rgba(0,0,0,.8);overflow:hidden;font-family:"Segoe UI",system-ui,sans-serif}'+
      '#fm-lib-pop .flp-head{display:flex;align-items:center;justify-content:space-between;padding:16px 18px 10px}'+
      '#fm-lib-pop .flp-head h3{font-size:1.05rem;font-weight:800;color:#fff;margin:0}'+
      '#fm-lib-pop .flp-x{background:none;border:none;color:#9aa0b0;cursor:pointer;padding:4px}'+
      '#fm-lib-pop .flp-x svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2.2}'+
      '#fm-lib-pop .flp-tabs{display:flex;gap:6px;padding:0 18px 12px}'+
      '#fm-lib-pop .flp-tab{flex:1;padding:8px;border-radius:20px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:#9aa0b0;font-size:.78rem;font-weight:700;cursor:pointer}'+
      '#fm-lib-pop .flp-tab.on{background:#8b5cf6;color:#fff;border-color:transparent}'+
      '#fm-lib-pop .flp-body{overflow-y:auto;padding:4px 12px 14px;flex:1}'+
      '#fm-lib-pop .flp-row{display:flex;align-items:center;gap:11px;padding:8px;border-radius:11px;cursor:pointer}'+
      '#fm-lib-pop .flp-row:hover{background:rgba(255,255,255,.06)}'+
      '#fm-lib-pop .flp-art{width:42px;height:42px;border-radius:8px;flex-shrink:0;overflow:hidden;background:linear-gradient(135deg,#8b5cf6,#06b6d4);display:flex;align-items:center;justify-content:center}'+
      '#fm-lib-pop .flp-art.round{border-radius:50%}'+
      '#fm-lib-pop .flp-art img{width:100%;height:100%;object-fit:cover}'+
      '#fm-lib-pop .flp-art.liked{background:linear-gradient(135deg,#7c3aed,#ec4899)}'+
      '#fm-lib-pop .flp-meta{flex:1;min-width:0}'+
      '#fm-lib-pop .flp-name{font-size:.86rem;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
      '#fm-lib-pop .flp-sub{font-size:.72rem;color:#9aa0b0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
      '#fm-lib-pop .flp-like{background:none;border:none;cursor:pointer;padding:6px;flex-shrink:0}'+
      '#fm-lib-pop .flp-empty{text-align:center;color:#9aa0b0;font-size:.82rem;padding:30px 10px}'+
      '@media(max-width:560px){#fm-mini-bar{bottom:12px;padding:8px 12px 10px}#fm-mini-bar .fmb-meta{max-width:92px}#fm-mini-bar .fmb-ctrls{gap:0}#fm-mini-bar button{padding:5px}}'+
      '@media(max-width:380px){#fm-mini-bar .fmb-time-cur,#fm-mini-bar .fmb-time-dur{display:none}}';
    document.head.appendChild(st);

    var bar = document.createElement('div');
    bar.id = 'fm-mini-bar';
    bar.innerHTML =
      '<div class="fmb-row">'+
        '<div class="fmb-art"></div>'+
        '<div class="fmb-meta"><div class="fmb-title">Loading…</div><div class="fmb-sub">Aightbet FM</div></div>'+
        '<div class="fmb-ctrls">'+
          '<button class="fmb-prev" title="Previous">'+ICON_PREV+'</button>'+
          '<button class="fmb-play" title="Play / Pause">'+ICON_PLAY+'</button>'+
          '<button class="fmb-next" title="Next">'+ICON_NEXT+'</button>'+
          '<div class="fmb-vol-wrap">'+
            '<button class="fmb-vol" title="Volume">'+volIcon(audio.volume<=0?0:(audio.volume<0.5?1:2))+'</button>'+
            '<div class="fmb-vol-pop"><input type="range" class="fmb-vol-range" min="0" max="100" step="1" value="'+Math.round(audio.volume*100)+'"></div>'+
          '</div>'+
          '<button class="fmb-lib" title="Library">'+ICON_LIB+'</button>'+
          '<button class="fmb-min" title="Minimize">'+ICON_CHEV_DOWN+'</button>'+
        '</div>'+
      '</div>'+
      '<div class="fmb-progress-row">'+
        '<span class="fmb-time-cur">0:00</span>'+
        '<div class="fmb-progress-track"><div class="fmb-progress-line"><div class="fmb-progress-fill"></div></div><div class="fmb-progress-thumb"></div></div>'+
        '<span class="fmb-time-dur">0:00</span>'+
      '</div>';
    (document.body || document.documentElement).appendChild(bar);

    bar.querySelector('.fmb-prev').addEventListener('click', function(){ window._musicPlayer && window._musicPlayer.prev(); });
    bar.querySelector('.fmb-next').addEventListener('click', function(){ window._musicPlayer && window._musicPlayer.next(); });
    bar.querySelector('.fmb-play').addEventListener('click', function(){ window._musicPlayer && window._musicPlayer.toggle(); });
    bar.querySelector('.fmb-lib').addEventListener('click', function(){ openLibPopup(); });
    function goFM(){ location.href = 'music.html'; }

    /* minimize / expand */
    var volPop = bar.querySelector('.fmb-vol-pop'), volBtn = bar.querySelector('.fmb-vol');
    function setMini(on){
      bar.classList.toggle('mini', on);
      try{ localStorage.setItem('aightbet-musicbar-mini', on ? '1' : '0'); }catch(e){}
      var minBtn = bar.querySelector('.fmb-min');
      if(minBtn){ minBtn.innerHTML = on ? ICON_CHEV_UP : ICON_CHEV_DOWN; minBtn.title = on ? 'Expand' : 'Minimize'; }
      if(on){ volPop.classList.remove('open'); volBtn.classList.remove('active'); }
    }
    bar.querySelector('.fmb-min').addEventListener('click', function(e){ e.stopPropagation(); setMini(!bar.classList.contains('mini')); });
    bar.querySelector('.fmb-art').addEventListener('click', function(){ if(bar.classList.contains('mini')) setMini(false); else goFM(); });
    bar.querySelector('.fmb-meta').addEventListener('click', goFM);
    try{ if(localStorage.getItem('aightbet-musicbar-mini') === '1') setMini(true); }catch(e){}

    /* volume */
    var volRange = bar.querySelector('.fmb-vol-range');
    function refreshVolIcon(){ volBtn.innerHTML = volIcon(audio.volume<=0 ? 0 : (audio.volume<0.5 ? 1 : 2)); }
    volBtn.addEventListener('click', function(e){ e.stopPropagation(); var open = volPop.classList.toggle('open'); volBtn.classList.toggle('active', open); });
    volRange.addEventListener('input', function(){
      var v = volRange.value / 100; audio.volume = v;
      try{ localStorage.setItem('aightbet-music-vol', v); }catch(e){}
      refreshVolIcon();
    });
    document.addEventListener('click', function(e){ if(!e.target.closest('.fmb-vol-wrap')){ volPop.classList.remove('open'); volBtn.classList.remove('active'); } });

    /* progress / seek */
    var track = bar.querySelector('.fmb-progress-track');
    var dragging = false;
    function ratioFromEvent(e){
      var rect = track.getBoundingClientRect();
      var x = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
      return Math.min(1, Math.max(0, (x - rect.left) / rect.width));
    }
    function seekTo(ratio){
      if(!audio.duration || !isFinite(audio.duration)) return;
      audio.currentTime = ratio * audio.duration;
      updateProgress();
    }
    track.addEventListener('pointerdown', function(e){ dragging = true; track.classList.add('dragging'); seekTo(ratioFromEvent(e)); });
    window.addEventListener('pointermove', function(e){ if(dragging) seekTo(ratioFromEvent(e)); });
    window.addEventListener('pointerup', function(){ if(dragging){ dragging = false; track.classList.remove('dragging'); } });

    audio.addEventListener('play', updateBar);
    audio.addEventListener('pause', updateBar);
    audio.addEventListener('loadstart', updateBar);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);
    window.addEventListener('aightbet-music-ready', updateBar);
    updateBar();
  }

  /* ════════ Library popup (songs / playlists / artists, with likes) ════════ */
  var lib = { loaded:false, songs:{}, authors:{}, playlists:{}, likedP:{}, likedA:{}, likedS:{}, tab:'playlists' };
  function esc2(s){ return (''+(s==null?'':s)).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }

  function loadLibrary(cb){
    try{
      var db = firebase.database(), u = firebase.auth().currentUser;
      Promise.all([
        db.ref('songs').once('value'),
        db.ref('authors').once('value'),
        db.ref('playlists').once('value'),
        u ? db.ref('users/'+u.uid+'/likedPlaylists').once('value') : Promise.resolve(null),
        u ? db.ref('users/'+u.uid+'/likedAuthors').once('value')   : Promise.resolve(null),
        u ? db.ref('users/'+u.uid+'/likedSongs').once('value')    : Promise.resolve(null)
      ]).then(function(r){
        lib.songs     = (r[0]&&r[0].val()) || {};
        lib.authors   = (r[1]&&r[1].val()) || {};
        lib.playlists = (r[2]&&r[2].val()) || {};
        lib.likedP    = (r[3]&&r[3].val()) || {};
        lib.likedA    = (r[4]&&r[4].val()) || {};
        lib.likedS    = (r[5]&&r[5].val()) || {};
        lib.loaded = true; cb && cb();
      }).catch(function(){ cb && cb(); });
    }catch(e){ cb && cb(); }
  }
  function refreshLikes(cb){
    var u = firebase.auth().currentUser; if(!u){ cb && cb(); return; }
    var db = firebase.database();
    Promise.all([ db.ref('users/'+u.uid+'/likedPlaylists').once('value'), db.ref('users/'+u.uid+'/likedAuthors').once('value'), db.ref('users/'+u.uid+'/likedSongs').once('value') ]).then(function(r){
      lib.likedP = (r[0]&&r[0].val()) || {}; lib.likedA = (r[1]&&r[1].val()) || {}; lib.likedS = (r[2]&&r[2].val()) || {}; cb && cb();
    }).catch(function(){ cb && cb(); });
  }

 function makeTrack(id){
  var s = lib.songs[id] || {};

  return {
    id: id,
    src: (s.audioUrl || s.audio || null),
    audioUrl: (s.audioUrl || null),
    title: (s.title || 'Untitled'),
    album: (s.album || (s.posterName || 'Aightbet FM')),
    art: (s.cover || null),
    createdAt: (s.createdAt || 0)
  };
}
  function songIdsSorted(){ return Object.keys(lib.songs).sort(function(a,b){ return ((lib.songs[b]||{}).createdAt||0) - ((lib.songs[a]||{}).createdAt||0); }); }
  function playSongId(id){ var ids = songIdsSorted(); var i = ids.indexOf(id); if(window._musicPlayer) window._musicPlayer.playTracks(ids.map(makeTrack), i<0?0:i); }
  function playPlaylistId(pid){ var p = lib.playlists[pid]||{}; var obj = p.songs||{}; var ids = Object.keys(obj).filter(function(k){ return lib.songs[k]; }).sort(function(a,b){ return (obj[a]||0)-(obj[b]||0); }); if(ids.length && window._musicPlayer) window._musicPlayer.playTracks(ids.map(makeTrack), 0); }
  function playAuthorId(aid){ var ids = Object.keys(lib.songs).filter(function(k){ return (lib.songs[k]||{}).authorId===aid; }).sort(function(a,b){ return ((lib.songs[b]||{}).createdAt||0)-((lib.songs[a]||{}).createdAt||0); }); if(ids.length && window._musicPlayer) window._musicPlayer.playTracks(ids.map(makeTrack), 0); }
  function playLikedSongs(){ var ids = songIdsSorted().filter(function(id){ return lib.likedS[id]; }); if(ids.length && window._musicPlayer) window._musicPlayer.playTracks(ids.map(makeTrack), 0); }

  function toggleLikeP(pid){ var u = firebase.auth().currentUser; if(!u) return; var ref = firebase.database().ref('users/'+u.uid+'/likedPlaylists/'+pid); if(lib.likedP[pid]){ ref.remove(); delete lib.likedP[pid]; } else { ref.set(Date.now()); lib.likedP[pid]=Date.now(); } renderLibPop(); }
  function toggleLikeA(aid){ var u = firebase.auth().currentUser; if(!u) return; var ref = firebase.database().ref('users/'+u.uid+'/likedAuthors/'+aid); if(lib.likedA[aid]){ ref.remove(); delete lib.likedA[aid]; } else { ref.set(Date.now()); lib.likedA[aid]=Date.now(); } renderLibPop(); }

  function popHeart(on){ return '<svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:'+(on?'#ec4899':'#9aa0b0')+';fill:'+(on?'#ec4899':'none')+';stroke-width:2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>'; }
  var ICON_HEART_FILL = '<svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:#fff;stroke:none"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>';
  function libArt(img, round){ return '<div class="flp-art'+(round?' round':'')+'">'+(img?'<img src="'+img+'"/>':ICON_NOTE)+'</div>'; }

  function renderLibPop(){
    var body = document.getElementById('fm-lib-body'); if(!body) return;
    var uid = (firebase.auth().currentUser||{}).uid;
    var html = '';
    if(lib.tab==='playlists'){
      var likedSongIds = Object.keys(lib.likedS).filter(function(id){ return lib.songs[id]; });
      html += '<div class="flp-row" data-playliked="1">'+
        '<div class="flp-art liked">'+ICON_HEART_FILL+'</div>'+
        '<div class="flp-meta"><div class="flp-name">Liked Songs</div><div class="flp-sub">'+likedSongIds.length+' song'+(likedSongIds.length===1?'':'s')+'</div></div></div>';
      var pls = Object.keys(lib.playlists).map(function(id){ return Object.assign({id:id}, lib.playlists[id]); })
        .filter(function(p){ return p.official || p.public || (uid && p.ownerUid===uid); })
        .sort(function(a,b){ var al=lib.likedP[a.id]?0:1, bl=lib.likedP[b.id]?0:1; if(al!==bl) return al-bl; return (b.createdAt||0)-(a.createdAt||0); });
      if(!pls.length) html += '<div class="flp-empty">No playlists yet.</div>';
      pls.forEach(function(p){
        var n = p.songs?Object.keys(p.songs).length:0;
        var sub = (p.official?'Official':(p.ownerName||'Playlist'))+' · '+n+' song'+(n===1?'':'s');
        html += '<div class="flp-row" data-playpl="'+p.id+'">'+libArt(p.image,false)+
          '<div class="flp-meta"><div class="flp-name">'+esc2(p.name||'Untitled')+'</div><div class="flp-sub">'+esc2(sub)+'</div></div>'+
          '<button class="flp-like" data-likep="'+p.id+'">'+popHeart(!!lib.likedP[p.id])+'</button></div>';
      });
    } else if(lib.tab==='artists'){
      var au = Object.keys(lib.authors).map(function(id){ return Object.assign({id:id}, lib.authors[id]); })
        .sort(function(a,b){ var al=lib.likedA[a.id]?0:1, bl=lib.likedA[b.id]?0:1; if(al!==bl) return al-bl; return (a.name||'').localeCompare(b.name||''); });
      if(!au.length) html = '<div class="flp-empty">No artists yet.</div>';
      au.forEach(function(a){
        var cnt = Object.keys(lib.songs).filter(function(k){ return (lib.songs[k]||{}).authorId===a.id; }).length;
        html += '<div class="flp-row" data-playauthor="'+a.id+'">'+libArt(a.image,true)+
          '<div class="flp-meta"><div class="flp-name">'+esc2(a.name||'Unknown')+'</div><div class="flp-sub">'+cnt+' track'+(cnt===1?'':'s')+'</div></div>'+
          '<button class="flp-like" data-likea="'+a.id+'">'+popHeart(!!lib.likedA[a.id])+'</button></div>';
      });
    } else {
      var ids = songIdsSorted();
      if(!ids.length) html = '<div class="flp-empty">No songs yet.</div>';
      ids.forEach(function(id){ var s = lib.songs[id]||{};
        html += '<div class="flp-row" data-playsong="'+id+'">'+libArt(s.cover,false)+
          '<div class="flp-meta"><div class="flp-name">'+esc2(s.title||'Untitled')+'</div><div class="flp-sub">'+esc2(s.album||s.posterName||'Aightbet FM')+'</div></div></div>';
      });
    }
    body.innerHTML = html;
  }
  function updateTabs(pop){ Array.prototype.forEach.call(pop.querySelectorAll('.flp-tab'), function(t){ t.classList.toggle('on', t.getAttribute('data-tab')===lib.tab); }); }
  function closeLibPop(){ var p = document.getElementById('fm-lib-pop'); if(p) p.classList.remove('open'); }
  function createLibPop(){
    var pop = document.createElement('div'); pop.id = 'fm-lib-pop';
    pop.innerHTML =
      '<div class="flp-panel">'+
        '<div class="flp-head"><h3>Your Library</h3><button class="flp-x" title="Close"><svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>'+
        '<div class="flp-tabs"><button class="flp-tab" data-tab="playlists">Playlists</button><button class="flp-tab" data-tab="artists">Artists</button><button class="flp-tab" data-tab="songs">Songs</button></div>'+
        '<div class="flp-body" id="fm-lib-body"></div>'+
      '</div>';
    document.body.appendChild(pop);
    pop.addEventListener('click', function(e){ if(e.target===pop) closeLibPop(); });
    pop.querySelector('.flp-x').addEventListener('click', closeLibPop);
    Array.prototype.forEach.call(pop.querySelectorAll('.flp-tab'), function(t){ t.addEventListener('click', function(){ lib.tab = t.getAttribute('data-tab'); updateTabs(pop); renderLibPop(); }); });
    pop.querySelector('#fm-lib-body').addEventListener('click', function(e){
      var lp=e.target.closest('[data-likep]');     if(lp){ e.stopPropagation(); toggleLikeP(lp.getAttribute('data-likep')); return; }
      var la=e.target.closest('[data-likea]');     if(la){ e.stopPropagation(); toggleLikeA(la.getAttribute('data-likea')); return; }
      var ps=e.target.closest('[data-playsong]');  if(ps){ playSongId(ps.getAttribute('data-playsong')); closeLibPop(); return; }
      var pp=e.target.closest('[data-playpl]');    if(pp){ playPlaylistId(pp.getAttribute('data-playpl')); closeLibPop(); return; }
      var pa=e.target.closest('[data-playauthor]');if(pa){ playAuthorId(pa.getAttribute('data-playauthor')); closeLibPop(); return; }
      var pk=e.target.closest('[data-playliked]'); if(pk){ playLikedSongs(); closeLibPop(); return; }
    });
    updateTabs(pop);
    return pop;
  }
  function openLibPopup(){
    var pop = document.getElementById('fm-lib-pop') || createLibPop();
    pop.classList.add('open');
    if(lib.loaded){ renderLibPop(); refreshLikes(function(){ renderLibPop(); }); }
    else { var b=document.getElementById('fm-lib-body'); if(b) b.innerHTML='<div class="flp-empty">Loading…</div>'; loadLibrary(function(){ renderLibPop(); }); }
  }

  /* ── INSTANT RESUME from local IndexedDB cache ──────────────────
     Tries to start the saved song from local cache before Firebase has
     even finished auth + library load. On repeat visits this brings the
     bar from "silent for a long time" to "playing within a few hundred ms". */
  function instantResume(){
    try{
      if(window._musicPlayerNoAutoplay) return;
      if(!window.FMCache || audio.src || isReady) return;
      var savedId = localStorage.getItem(KEY_ID);
      if(!savedId) return;
      var savedPaused = localStorage.getItem(KEY_PAUSED) === '1';
      var savedTime   = parseFloat(localStorage.getItem(KEY_TIME) || '0');
      window.FMCache.getAudio(savedId).then(function(audioData){
        if(!audioData || audio.src || isReady) return; // already resolved through fresh path
        audio.src = audioData;
        if(savedTime > 0) pendingSeek = savedTime;
        if(!savedPaused){
          audio.play().catch(function(){
            function onGesture(){
              if(!window._musicPlayerNoAutoplay) audio.play().catch(function(){});
              document.removeEventListener('click',   onGesture);
              document.removeEventListener('keydown', onGesture);
            }
            document.addEventListener('click',   onGesture);
            document.addEventListener('keydown', onGesture);
          });
        }
        /* Seed a stub track so the bar UI shows something while the full
           library list streams in from Firebase. */
        if(!tracks.length){
          tracks.push({ id:savedId, src:audioData, _cached:audioData, title:'…', album:'Aightbet FM', art:null, createdAt:0 });
          window._musicPlayer.tracks = tracks;
          idx = 0;
          try{
            window.FMCache.getCover(savedId).then(function(c){
              if(c && tracks[0] && tracks[0].id===savedId){ tracks[0].art = c; if(typeof updateBar==='function') updateBar(); }
            }).catch(function(){});
            window.FMCache.getMeta('barTracks').then(function(meta){
              if(meta && meta.length){
                for(var i=0;i<meta.length;i++){
                  if(meta[i].id===savedId && tracks[0] && tracks[0].id===savedId){
                    tracks[0].title = meta[i].title || tracks[0].title;
                    tracks[0].album = meta[i].album || tracks[0].album;
                    break;
                  }
                }
                if(typeof updateBar==='function') updateBar();
              }
            }).catch(function(){});
          }catch(e){}
          if(typeof updateBar==='function') updateBar();
        }
      }).catch(function(){});
    }catch(e){}
  }

  window.__fmBuildBar = buildBarUI;
  if(document.body) buildBarUI(); else document.addEventListener('DOMContentLoaded', buildBarUI);
  instantResume();
  loadSongs();
})();
  
})();
