
/* ======================================================
 FIREBASE BOOTSTRAP
 Loads Firebase compat SDKs and wires up DB-backed
 credit helpers before the main IIFE runs.
====================================================== */
(function _injectFirebase() {
  if (window.__ckFbLoaded) return;
  window.__ckFbLoaded = true;

  var firebaseConfig = {
    apiKey: 'AIzaSyAySAfeYOX9yKTVBZTXdmGSx4eIAofY0ro',
    authDomain: 'gamle-53778.firebaseapp.com',
    databaseURL: 'https://gamle-53778-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'gamle-53778',
    storageBucket: 'gamle-53778.firebasestorage.app',
    messagingSenderId: '513958176524',
    appId: '1:513958176524:web:c74a2e946da58507200b29',
    measurementId: 'G-EB6SF28HZK',
  };

  function lsGet() { return parseInt(localStorage.getItem('ck-xp') || '0'); }
  function lsAdd(n) {
    var v = lsGet() + n;
    localStorage.setItem('ck-xp', v);
    return Promise.resolve(v);
  }

  window.__ckFirebase = {
    ready: false,
    getCredits: function() { return Promise.resolve(lsGet()); },
    addCredits: lsAdd,
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

            var db = firebase.database();
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

  const NOW = new Date();
  const YEAR = NOW.getFullYear();

  function rand(min, max) { return min + Math.random() * (max - min); }
  function randInt(a, b) { return Math.floor(rand(a, b + 1)); }
  function ls(k, def) { try { return localStorage.getItem(k) ?? def; } catch { return def; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch {} }
  function ss(k) { try { return sessionStorage.getItem(k); } catch { return null; } }
  function ssSet(k, v) { try { sessionStorage.setItem(k, v); } catch {} }

  const T = {
    name: 'Summer', codename: 'Solstice Blaze', version: `v2.${YEAR}`,
    accent: '#ff6b6b',  accent2: '#06b6d4',  accent3: '#f97316',
    glow:   'rgba(255,107,107,.60)',  glow2: 'rgba(6,182,212,.45)',
    bg: '#fff8f0',
    bgGrad: `radial-gradient(ellipse 90% 60% at 15% 10%, rgba(255,200,100,.30), transparent),
             radial-gradient(ellipse 70% 50% at 85% 20%, rgba(6,182,212,.20), transparent),
             radial-gradient(ellipse 50% 60% at 50% 90%, rgba(255,107,107,.16), transparent)`,
    orbColors: ['#ffd166', '#06b6d4', '#ff6b6b'],
    darkAccent: '#ff8e8e', darkAccent2: '#22d3ee', darkAccent3: '#fb923c',
    darkGlow: 'rgba(255,142,142,.55)', darkGlow2: 'rgba(34,211,238,.40)',
    darkBg: '#080c10',
    darkBgGrad: `radial-gradient(ellipse 80% 55% at 20% 15%, rgba(255,107,107,.15), transparent),
                 radial-gradient(ellipse 60% 50% at 80% 25%, rgba(6,182,212,.14), transparent),
                 radial-gradient(ellipse 40% 45% at 50% 85%, rgba(251,115,22,.10), transparent)`,
    darkOrbColors: ['#ffd166', '#22d3ee', '#ff8e8e'],
    particleCount: 50,
    notes: [
      '☀️ Tap the sun in the corner — a secret beach awaits',
      '🏄 A real challenge hides behind the sun. Prize coming soon...',
      '🌊 Solstice Blaze theme is live across AightBet',
      '🌴 Summer particles, sun rays & vibe widgets enabled',
    ],
  };

  function isLightMode() {
    const stored = ls('ck-lightmode', null);
    if (stored !== null) return stored === 'true';
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return false;
    return true;
  }
  function getLM() { return isLightMode(); }

  function injectStyles() {
    const LM = getLM();
    document.documentElement.setAttribute('data-theme', LM ? 'light' : 'dark');
    document.body && document.body.setAttribute('data-theme', LM ? 'light' : 'dark');
    const accent=LM?T.accent:T.darkAccent, accent2=LM?T.accent2:T.darkAccent2, accent3=LM?T.accent3:T.darkAccent3;
    const glow=LM?T.glow:T.darkGlow, bg=LM?T.bg:T.darkBg, bgGrad=LM?T.bgGrad:T.darkBgGrad;
    const orbC=LM?T.orbColors:T.darkOrbColors;
    const textPrimary=LM?'#1a0a0a':'#fff0f0', textSecondary=LM?'#9d2a2a':'#ffc2c2', textMuted=LM?'#c44b4b':'#e87777';
    const cardBg=LM?'rgba(255,248,240,.90)':'rgba(12,4,4,.62)';
    const toastBg=LM?'rgba(255,253,250,.98)':'rgba(14,4,4,.97)';
    const s = document.createElement('style'); s.id='ck-styles';
    s.textContent=`
      :root { --accent:${accent}!important; --accent2:${accent2}!important; --accent3:${accent3}!important; --glow:${glow}!important; --bg:${bg}!important; }
      body { background:${bg}!important; }
      .bg-gradient { background:${bgGrad}!important; }
      .orb-1 { background:${orbC[0]}!important; } .orb-2 { background:${orbC[1]}!important; } .orb-3 { background:${orbC[2]}!important; }
      #ck-canvas { position:fixed; inset:0; z-index:2; pointer-events:none; opacity:${LM?'.65':'1'}; }
      #ck-toast { position:fixed; bottom:62px; left:22px; z-index:9999; width:318px; background:${toastBg}; border:1px solid ${accent}30; border-left:3px solid ${accent}; border-radius:16px; padding:16px 18px; font-family:'Segoe UI',system-ui,sans-serif; backdrop-filter:blur(24px); box-shadow:0 18px 52px rgba(0,0,0,${LM?'.10':'.60'}),0 0 44px -10px ${glow}; opacity:0; transform:translateY(16px); transition:opacity .38s cubic-bezier(.22,1,.36,1),transform .38s cubic-bezier(.22,1,.36,1); pointer-events:none; }
      #ck-toast.ck-visible { opacity:1; transform:translateY(0); pointer-events:auto; }
      #ck-toast .ck-th { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
      #ck-toast .ck-tt { font-size:.78rem; font-weight:800; color:${textPrimary}; display:flex; align-items:center; gap:7px; }
      #ck-toast .ck-tv { font-size:.62rem; font-weight:700; color:${accent}; background:${accent}1c; border:1px solid ${accent}32; border-radius:5px; padding:2px 7px; }
      #ck-toast .ck-tx { width:20px; height:20px; border-radius:50%; background:${LM?'rgba(0,0,0,.06)':'rgba(255,255,255,.07)'}; border:1px solid ${LM?'rgba(0,0,0,.10)':'rgba(255,255,255,.10)'}; cursor:pointer; color:${textSecondary}; font-size:.75rem; display:flex; align-items:center; justify-content:center; font-family:inherit; }
      #ck-toast .ck-div { height:1px; background:${accent}20; margin:8px 0; }
      #ck-toast .ck-note { font-size:.73rem; color:${textSecondary}; margin-bottom:5px; line-height:1.45; display:flex; align-items:flex-start; gap:6px; }
      #ck-toast .ck-note::before { content:'▸'; color:${accent}; flex-shrink:0; margin-top:1px; font-size:.65rem; }
      #ck-widget { position:fixed; top:calc(70px + 14px); left:20px; z-index:89; display:flex; flex-direction:column; gap:8px; }
      .ck-card { width:176px; background:${cardBg}; border:1px solid ${accent}25; border-radius:14px; padding:11px 13px; backdrop-filter:blur(18px); cursor:pointer; transition:border-color .25s,box-shadow .25s,transform .15s; font-family:'Segoe UI',system-ui,sans-serif; user-select:none; box-shadow:${LM?`0 2px 14px rgba(245,158,11,.12)`:'none'}; }
      .ck-card[data-clickable="true"]:hover { border-color:${accent}50; box-shadow:0 4px 24px -6px ${glow}; transform:translateX(2px); }
      .ck-card .cw-lbl { font-size:.58rem; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:${accent}; margin-bottom:4px; display:flex; align-items:center; gap:5px; }
      .ck-card .cw-val { font-size:1.15rem; font-weight:800; color:${textPrimary}; line-height:1.2; word-break:break-word; }
      .ck-card .cw-sub { font-size:.62rem; color:${textMuted}; margin-top:3px; }
      .ck-card .cw-bar { height:3px; background:${LM?'rgba(0,0,0,.08)':'rgba(255,255,255,.07)'}; border-radius:2px; margin-top:8px; overflow:hidden; }
      .ck-card .cw-fill { height:100%; background:linear-gradient(90deg,${accent},${accent3}); border-radius:2px; width:0%; transition:width .9s cubic-bezier(.22,1,.36,1); }
      @media (orientation:landscape) and (max-width:1024px) { #ck-widget,#ck-toast,#ck-sun-btn,#ck-beach-takeover { display:none!important; } }
    `;
    document.head.appendChild(s);
  }

  let __sunHotspot = { x:0, y:0, r:60 };
  function initParticles() {
    const canvas=document.createElement('canvas'); canvas.id='ck-canvas'; document.body.appendChild(canvas);
    const ctx=canvas.getContext('2d'); let W,H; const pool=[];
    function resize() { W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; }
    resize(); window.addEventListener('resize',resize);
    const RAY_COLORS=['#ff6b6b','#ffd166','#06b6d4','#ff9f43','#ff8e8e','#cffafe','#fff0f0'];
    function makeMote(burst) { return {type:'mote', x:rand(0,W), y:burst?rand(0,H):rand(-20,-5), vx:rand(-.3,.3), vy:rand(.25,.75), size:rand(2,7), alpha:rand(.25,.75), color:RAY_COLORS[randInt(0,RAY_COLORS.length-1)], wobble:rand(0,Math.PI*2), pulse:rand(0,Math.PI*2)}; }
    function makeFirefly() { return {type:'firefly', x:rand(0,W), y:rand(H*.2,H*.95), vx:rand(-.4,.4), vy:rand(-.25,.25), size:rand(2.5,5), alpha:rand(.4,.9), phase:rand(0,Math.PI*2), hue:randInt(165,200)}; }
    for (let i=0;i<T.particleCount;i++) pool.push(makeMote(true));
    for (let i=0;i<18;i++) pool.push(makeFirefly());
    function drawMote(x,y,size,color,alpha){ ctx.save();ctx.globalAlpha=alpha;ctx.fillStyle=color;ctx.shadowColor=color;ctx.shadowBlur=size*2.5;ctx.beginPath();ctx.arc(x,y,size*.5,0,Math.PI*2);ctx.fill();ctx.restore(); }
    function drawFirefly(x,y,size,alpha,hue){ const c=`hsl(${hue},90%,65%)`;ctx.save();ctx.globalAlpha=alpha;ctx.shadowColor=c;ctx.shadowBlur=size*5;ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,size,0,Math.PI*2);ctx.fill();ctx.globalAlpha=alpha*1.4;ctx.fillStyle='#fff';ctx.shadowBlur=0;ctx.beginPath();ctx.arc(x,y,size*.4,0,Math.PI*2);ctx.fill();ctx.restore(); }
    function drawSun(t) {
      const LM=isLightMode(); const SX=W-72,SY=68,R=38; const pulse=1+0.06*Math.sin(t*0.04);
      __sunHotspot={x:SX,y:SY,r:R*1.6};
      const haloSizes=[R*3.8,R*2.8,R*2.0]; const haloAlphas=LM?[0.08,0.13,0.18]:[0.12,0.18,0.25];
      haloSizes.forEach((hr,i)=>{ const g=ctx.createRadialGradient(SX,SY,0,SX,SY,hr*pulse); g.addColorStop(0,`rgba(255,220,60,${haloAlphas[i]})`); g.addColorStop(0.5,`rgba(255,140,40,${haloAlphas[i]*0.5})`); g.addColorStop(1,'rgba(255,100,30,0)'); ctx.save();ctx.fillStyle=g;ctx.beginPath();ctx.arc(SX,SY,hr*pulse,0,Math.PI*2);ctx.fill();ctx.restore(); });
      const NUM_RAYS=12,RAY_ROT=t*0.008; ctx.save();ctx.translate(SX,SY);ctx.rotate(RAY_ROT);
      for(let i=0;i<NUM_RAYS;i++){ const angle=(i/NUM_RAYS)*Math.PI*2; const rayLen=(i%2===0?R*2.0:R*1.4)*pulse; const rayW=i%2===0?3.5:2; const alpha=LM?0.55:0.70; ctx.save();ctx.rotate(angle); const rg=ctx.createLinearGradient(R*0.9,0,R*0.9+rayLen,0); rg.addColorStop(0,`rgba(255,230,80,${alpha})`); rg.addColorStop(0.5,`rgba(255,170,40,${alpha*0.6})`); rg.addColorStop(1,'rgba(255,120,30,0)'); ctx.strokeStyle=rg;ctx.lineWidth=rayW;ctx.lineCap='round'; ctx.beginPath();ctx.moveTo(R*0.95,0);ctx.lineTo(R*0.95+rayLen,0);ctx.stroke();ctx.restore(); }
      ctx.restore();
      const cg=ctx.createRadialGradient(SX-R*0.2,SY-R*0.2,0,SX,SY,R*pulse); cg.addColorStop(0,'#fffde0');cg.addColorStop(0.3,'#ffe040');cg.addColorStop(0.7,'#ffaa20');cg.addColorStop(1,'#ff7010');
      ctx.save();ctx.shadowColor='#ffcc00';ctx.shadowBlur=LM?28:44;ctx.fillStyle=cg;ctx.beginPath();ctx.arc(SX,SY,R*pulse,0,Math.PI*2);ctx.fill();ctx.restore();
      ctx.save();ctx.globalAlpha=LM?0.55:0.45; const sg=ctx.createRadialGradient(SX-R*0.35,SY-R*0.35,0,SX-R*0.2,SY-R*0.2,R*0.55); sg.addColorStop(0,'#ffffff');sg.addColorStop(1,'rgba(255,255,255,0)'); ctx.fillStyle=sg;ctx.beginPath();ctx.arc(SX,SY,R*pulse,0,Math.PI*2);ctx.fill();ctx.restore();
    }
    let time=0;
    function tick() {
      if (document.body && document.body.classList.contains('lqm')) { ctx.clearRect(0,0,W,H); requestAnimationFrame(tick); return; }
      ctx.clearRect(0,0,W,H); time++; drawSun(time);
      pool.forEach(p=>{
        if (p.type==='mote') { p.wobble+=.016;p.pulse+=.04; p.x+=p.vx+Math.sin(p.wobble)*.25; p.y+=p.vy; const a=p.alpha*(.7+.3*Math.sin(p.pulse)); if (p.y>H+15) Object.assign(p,makeMote(false)); drawMote(p.x,p.y,p.size,p.color,a); }
        else { p.phase+=.04; p.x+=p.vx+Math.sin(p.phase*.7)*.35; p.y+=p.vy+Math.cos(p.phase*.5)*.2; if(p.x<0)p.vx=Math.abs(p.vx); if(p.x>W)p.vx=-Math.abs(p.vx); if(p.y<H*.1)p.vy=Math.abs(p.vy); if(p.y>H*.98)p.vy=-Math.abs(p.vy); const blink=Math.max(0,Math.sin(p.phase*1.8))*p.alpha; drawFirefly(p.x,p.y,p.size,blink,p.hue); }
      });
      requestAnimationFrame(tick);
    }
    tick();
  }

  function createToast() {
    const toast=document.createElement('div'); toast.id='ck-toast';
    toast.innerHTML=`<div class="ck-th"><div class="ck-tt">☀️ ${T.name.toUpperCase()} UPDATE <span class="ck-tv">${T.version}</span></div><button class="ck-tx" id="ck-toast-close" aria-label="Close">✕</button></div><div class="ck-div"></div>${T.notes.map(n=>`<div class="ck-note">${n}</div>`).join('')}`;
    document.body.appendChild(toast);
    let autoDismiss;
    function dismiss(){ clearTimeout(autoDismiss); toast.classList.remove('ck-visible'); }
    document.getElementById('ck-toast-close').addEventListener('click',dismiss);
    return { show(){ toast.classList.add('ck-visible'); autoDismiss=setTimeout(dismiss,9000); }, dismiss };
  }

  function mountWidget() {
    const container=document.createElement('div'); container.id='ck-widget';
    const TZ='Europe/Riga';
    const _p=new Intl.DateTimeFormat('en-GB',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date());
    const _g=k=>parseInt(_p.find(x=>x.type===k).value,10);
    const RIGA_NOW=new Date(_g('year'),_g('month')-1,_g('day'),_g('hour'),_g('minute'));
    const yr=RIGA_NOW.getFullYear(); const sumStart=new Date(yr,5,1), sumEnd=new Date(yr,8,1); const MS_DAY=86400000;
    let sumPct,sumDaysLeft,sumStateLabel,sumSubLabel;
    if (RIGA_NOW>=sumStart && RIGA_NOW<=sumEnd) { sumPct=Math.round(((RIGA_NOW-sumStart)/(sumEnd-sumStart))*100); sumDaysLeft=Math.max(0,Math.ceil((sumEnd-RIGA_NOW)/MS_DAY)); sumStateLabel=sumPct+'% through'; sumSubLabel=sumDaysLeft+' day'+(sumDaysLeft!==1?'s':'')+' left in summer'; }
    else if (RIGA_NOW<sumStart) { const springStart=new Date(yr,2,20); sumPct=Math.max(0,Math.min(100,Math.round(((RIGA_NOW-springStart)/(sumStart-springStart))*100))); sumDaysLeft=Math.max(0,Math.ceil((sumStart-RIGA_NOW)/MS_DAY)); sumStateLabel=sumDaysLeft+' days until summer'; sumSubLabel='Countdown '+sumPct+'% complete'; }
    else { const nextSummer=new Date(yr+1,5,1); sumPct=Math.max(0,Math.min(100,Math.round(((RIGA_NOW-sumEnd)/(nextSummer-sumEnd))*100))); sumDaysLeft=Math.max(0,Math.ceil((nextSummer-RIGA_NOW)/MS_DAY)); sumStateLabel=sumDaysLeft+' days until summer'; sumSubLabel='Countdown '+sumPct+'% complete'; }
    const cardA=document.createElement('div'); cardA.className='ck-card'; cardA.dataset.clickable='false';
    cardA.innerHTML=`<div class="cw-lbl">🌡️ Summer Progress</div><div class="cw-val">${sumStateLabel}</div><div class="cw-sub">${sumSubLabel}</div><div class="cw-bar"><div class="cw-fill" id="ck-sum-bar"></div></div>`;
    container.appendChild(cardA);
    const cardB=document.createElement('div'); cardB.className='ck-card'; cardB.dataset.clickable='true';
    const beachDays=()=>parseInt(ls('ck-beach','0'));
    cardB.innerHTML=`<div class="cw-lbl">🏖️ Beach Days</div><div class="cw-val">${beachDays()} day${beachDays()!==1?'s':''}</div><div class="cw-sub">${beachDays()>=20?'🌊 Legendary summer!':'Tap to log a beach day!'}</div>`;
    cardB.addEventListener('click',()=>{ const n=beachDays()+1; lsSet('ck-beach',n); cardB.querySelector('.cw-val').textContent=n+' day'+(n!==1?'s':''); cardB.querySelector('.cw-sub').textContent=n>=20?'🌊 Legendary summer!':n>=10?'🏄 Surf legend vibes!':n>=5?'☀️ Sun-kissed!':'Keep it up!'; });
    container.appendChild(cardB);
    document.body.appendChild(container);
    setTimeout(()=>{ const bar=document.getElementById('ck-sum-bar'); if(bar) bar.style.width=sumPct+'%'; },600);
  }

  function mountSunButton() {
    if (document.getElementById('ck-sun-btn')) return;
    const s=document.createElement('style'); s.id='ck-sun-style';
    s.textContent=`#ck-sun-btn{position:fixed;top:14px;right:16px;width:80px;height:80px;border-radius:50%;z-index:9500;background:transparent;border:none;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:transform .25s cubic-bezier(.34,1.56,.64,1);} #ck-sun-btn:hover{transform:scale(1.06);} #ck-sun-btn:active{transform:scale(.94);}`;
    document.head.appendChild(s);
    const btn=document.createElement('button'); btn.id='ck-sun-btn'; btn.title=''; btn.setAttribute('aria-label','Secret');
    document.body.appendChild(btn);
    btn.addEventListener('click',launchBeachChallenge);
  }

  const ASSETS = {
    beachBg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2880&q=80',
    sun:     'https://pngimg.com/uploads/sun/sun_PNG13422.png',
    ball:    'https://pngimg.com/uploads/beach_ball/beach_ball_PNG4990.png',
    cloud1:  'https://pngimg.com/uploads/cloud/cloud_PNG14.png',
    cloud2:  'https://pngimg.com/uploads/cloud/cloud_PNG24.png',
    cloud3:  'https://pngimg.com/uploads/cloud/cloud_PNG10.png',
    palmL:   'https://pngimg.com/uploads/palm_tree/palm_tree_PNG56.png',
    palmR:   'https://pngimg.com/uploads/palm_tree/palm_tree_PNG6.png',
  };
  const TARGET_TAPS=12, TELEPORT_EVERY=3, SUN_BASE=130, SUN_MIN=56;

  function launchBeachChallenge() {
    if (document.getElementById('ck-beach-takeover')) return;
    const HIDE_SELECTORS=['.navbar','.mobile-menu','.bg-gradient','.grid-overlay','.orb','#particles','.main','.footer','#ck-canvas','#ck-widget','#ck-toast','#ck-sun-btn','.support-fab-group','#music-player','.featured','.stats-bar','.hero','.top-players'];
    const stash=[];
    document.querySelectorAll(HIDE_SELECTORS.join(',')).forEach(el=>{ stash.push({el,prev:el.style.display}); el.style.display='none'; });
    document.documentElement.style.overflow='hidden'; document.body.style.overflow='hidden';
    const stage=document.createElement('div'); stage.id='ck-beach-takeover';
    stage.innerHTML=`<div class="ckb-bg"></div><div class="ckb-sky"></div><img class="ckb-cloud ckb-cloud-a" src="${ASSETS.cloud1}" alt=""><img class="ckb-cloud ckb-cloud-b" src="${ASSETS.cloud2}" alt=""><img class="ckb-cloud ckb-cloud-c" src="${ASSETS.cloud3}" alt=""><img class="ckb-palm ckb-palm-l" src="${ASSETS.palmL}" alt=""><img class="ckb-palm ckb-palm-r" src="${ASSETS.palmR}" alt=""><img class="ckb-ball" src="${ASSETS.ball}" alt=""><img class="ckb-sun" id="ckb-sun" src="${ASSETS.sun}" alt=""><div class="ckb-hud" id="ckb-hud"><div class="ckb-progress"><span id="ckb-count">0</span><span class="ckb-slash">/</span><span>${TARGET_TAPS}</span></div><div class="ckb-hint" id="ckb-hint">Tap only the sun. Miss = reset.</div></div><div class="ckb-shake" id="ckb-shake"></div>`;
    document.body.appendChild(stage);
    injectChallengeStyles();
    let count=0, busy=false, won=false; const t0=performance.now();
    const sunEl=document.getElementById('ckb-sun'), countEl=document.getElementById('ckb-count'), hintEl=document.getElementById('ckb-hint'), shakeEl=document.getElementById('ckb-shake');
    let speed=1.0, size=SUN_BASE;
    let cx=window.innerWidth*0.5, cy=window.innerHeight*0.35, ax=window.innerWidth*0.34, ay=window.innerHeight*0.22;
    let phaseA=rand(0,Math.PI*2), phaseB=rand(0,Math.PI*2), freqA=0.6, freqB=0.83;
    sunEl.style.width=size+'px'; sunEl.style.height=size+'px';
    function placeSun(t){ const x=cx+Math.sin((t/1000)*freqA+phaseA)*ax; const y=cy+Math.sin((t/1000)*freqB+phaseB)*ay+Math.cos((t/1000)*freqA*0.5)*(ay*0.25); sunEl.style.left=(x-size/2)+'px'; sunEl.style.top=(y-size/2)+'px'; }
    function rafLoop(now){ if(won) return; placeSun((now-t0)*speed); requestAnimationFrame(rafLoop); }
    requestAnimationFrame(rafLoop);
    function flashShake(red){ shakeEl.classList.remove('ckb-flash-red','ckb-flash-green'); void shakeEl.offsetWidth; shakeEl.classList.add(red?'ckb-flash-red':'ckb-flash-green'); if(red){ stage.classList.remove('ckb-shake-anim'); void stage.offsetWidth; stage.classList.add('ckb-shake-anim'); } }
    function teleportSun(){ busy=true; sunEl.classList.add('ckb-teleport'); setTimeout(()=>{ cx=rand(window.innerWidth*0.18,window.innerWidth*0.82); cy=rand(window.innerHeight*0.12,window.innerHeight*0.55); ax=rand(window.innerWidth*0.18,window.innerWidth*0.40); ay=rand(window.innerHeight*0.10,window.innerHeight*0.28); phaseA=rand(0,Math.PI*2); phaseB=rand(0,Math.PI*2); freqA=rand(0.5,1.2)*(Math.random()<.5?1:-1); freqB=rand(0.6,1.4)*(Math.random()<.5?1:-1); sunEl.classList.remove('ckb-teleport'); busy=false; },280); }
    function onHit(e){ if(busy||won){ e.stopPropagation(); return; } e.stopPropagation(); count++; countEl.textContent=count; flashShake(false); speed*=1.10; size=Math.max(SUN_MIN,size*0.94); sunEl.style.width=size+'px'; sunEl.style.height=size+'px'; sunEl.classList.remove('ckb-pop'); void sunEl.offsetWidth; sunEl.classList.add('ckb-pop'); if(count>=TARGET_TAPS){ winSequence(); return; } if(count%TELEPORT_EVERY===0) teleportSun(); }
    function onMiss(e){ if(busy||won) return; if(e.target===sunEl) return; count=0; countEl.textContent='0'; speed=1.0; size=SUN_BASE; sunEl.style.width=size+'px'; sunEl.style.height=size+'px'; flashShake(true); hintEl.textContent='Missed. Back to zero.'; setTimeout(()=>{ hintEl.textContent='Tap only the sun. Miss = reset.'; },1600); }
    sunEl.addEventListener('click',onHit);
    sunEl.addEventListener('touchstart',(e)=>{ e.preventDefault(); onHit(e); },{passive:false});
    stage.addEventListener('click',onMiss);
    stage.addEventListener('touchstart',(e)=>{ if(e.target===sunEl) return; onMiss(e); },{passive:true});

    function winSequence(){ won=true; busy=true; sunEl.classList.add('ckb-win');
      const overlay=document.createElement('div'); overlay.className='ckb-win-overlay';
      overlay.innerHTML=`<div class="ckb-win-card">
  <div class="ckb-win-title">You found the sun.</div>
  <div class="ckb-win-sub">2 <b style="color:#ffd166">LIMITED</b> items unlocked</div>
  <div class="ckb-win-meta">★ SOLAR ECLIPSE intro &nbsp;·&nbsp; ★ SUNBURST CROWN name fx</div>
</div>`;
      stage.appendChild(overlay); requestAnimationFrame(()=>overlay.classList.add('ckb-vis'));
       lsSet('ck-beach-secret-found','1'); lsSet('ck-beach-secret-at',String(Date.now()));

      // Grant the 2 LIMITED prize items into Firebase inventory
      (function grantPrizes(){
        try {
          var u = firebase.auth().currentUser;
          if (!u) return;
          firebase.database().ref('users/' + u.uid + '/inventory').update({
            'intro_solar_eclipse': true,
            'ne_sunburst_crown':   true
          });
          firebase.database().ref('users/' + u.uid + '/prizes/sunSecret').set({
            at: firebase.database.ServerValue.TIMESTAMP,
            items: ['intro_solar_eclipse', 'ne_sunburst_crown']
          });
        } catch(e){ console.warn('[CK] prize grant failed', e); }
      })();
      setTimeout(()=>{ stage.classList.add('ckb-fade-out'); setTimeout(()=>{ stash.forEach(({el,prev})=>{ el.style.display=prev||''; }); document.documentElement.style.overflow=''; document.body.style.overflow=''; stage.remove(); },700); },3200);
    }
  }

  function injectChallengeStyles() {
    if (document.getElementById('ckb-style')) return;
    const s=document.createElement('style'); s.id='ckb-style';
    s.textContent=`
      #ck-beach-takeover{position:fixed;inset:0;z-index:99999;overflow:hidden;cursor:crosshair;font-family:'Segoe UI',system-ui,sans-serif;background:#f4d3a3;animation:ckb-in .55s ease both;}
      @keyframes ckb-in{from{opacity:0}to{opacity:1}}
      #ck-beach-takeover.ckb-fade-out{animation:ckb-out .7s ease forwards;}
      @keyframes ckb-out{to{opacity:0;transform:scale(1.02)}}
      #ck-beach-takeover .ckb-bg{position:absolute;inset:0;background:url('${ASSETS.beachBg}') center/cover no-repeat;filter:saturate(1.05) contrast(1.02);}
      #ck-beach-takeover .ckb-sky{position:absolute;inset:0;background:radial-gradient(ellipse 70% 50% at 50% 15%,rgba(255,235,170,.35),transparent 60%),linear-gradient(180deg,rgba(125,200,235,.18) 0%,rgba(255,200,140,.00) 35%,rgba(255,160,90,.0) 60%,rgba(0,0,0,.10) 100%);pointer-events:none;}
      #ck-beach-takeover .ckb-cloud{position:absolute;pointer-events:none;opacity:.85;filter:drop-shadow(0 8px 18px rgba(0,0,0,.10));will-change:transform;}
      #ck-beach-takeover .ckb-cloud-a{top:6%;left:-18%;width:32vw;animation:ckb-drift-a 70s linear infinite;}
      #ck-beach-takeover .ckb-cloud-b{top:14%;left:-28%;width:24vw;animation:ckb-drift-b 95s linear infinite;opacity:.7;}
      #ck-beach-takeover .ckb-cloud-c{top:3%;left:-10%;width:18vw;animation:ckb-drift-c 120s linear infinite;opacity:.55;}
      @keyframes ckb-drift-a{0%{transform:translateX(0)}100%{transform:translateX(150vw)}}
      @keyframes ckb-drift-b{0%{transform:translateX(0)}100%{transform:translateX(160vw)}}
      @keyframes ckb-drift-c{0%{transform:translateX(0)}100%{transform:translateX(180vw)}}
      #ck-beach-takeover .ckb-palm{position:absolute;pointer-events:none;bottom:-2%;height:92vh;max-height:880px;filter:drop-shadow(0 30px 30px rgba(0,0,0,.30));transform-origin:bottom center;}
      #ck-beach-takeover .ckb-palm-l{left:-6%;animation:ckb-sway-l 7s ease-in-out infinite;}
      #ck-beach-takeover .ckb-palm-r{right:-8%;animation:ckb-sway-r 8.5s ease-in-out infinite;}
      @keyframes ckb-sway-l{0%,100%{transform:rotate(-1deg)}50%{transform:rotate(2.5deg)}}
      @keyframes ckb-sway-r{0%,100%{transform:rotate(1deg)}50%{transform:rotate(-2.5deg)}}
      #ck-beach-takeover .ckb-ball{position:absolute;pointer-events:none;bottom:6%;left:50%;width:90px;transform:translateX(-50%);filter:drop-shadow(0 14px 12px rgba(0,0,0,.30));animation:ckb-ball-bounce 2.2s cubic-bezier(.55,.05,.45,.95) infinite;}
      @keyframes ckb-ball-bounce{0%{transform:translateX(-50%) translateY(0) rotate(0deg);}50%{transform:translateX(-50%) translateY(-26vh) rotate(180deg);}100%{transform:translateX(-50%) translateY(0) rotate(360deg);}}
      #ck-beach-takeover .ckb-sun{position:absolute;left:0;top:0;width:${SUN_BASE}px;height:${SUN_BASE}px;cursor:pointer;filter:drop-shadow(0 0 22px rgba(255,200,60,.85)) drop-shadow(0 0 60px rgba(255,160,40,.55));user-select:none;-webkit-user-drag:none;transition:width .2s,height .2s,filter .2s,opacity .25s;will-change:left,top,width,height,transform;}
      #ck-beach-takeover .ckb-sun.ckb-pop{animation:ckb-pop .22s ease-out;}
      @keyframes ckb-pop{0%{transform:scale(1);}40%{transform:scale(1.18);filter:drop-shadow(0 0 36px rgba(255,255,180,1));}100%{transform:scale(1);}}
      #ck-beach-takeover .ckb-sun.ckb-teleport{opacity:0;transform:scale(.6);}
      #ck-beach-takeover .ckb-sun.ckb-win{animation:ckb-win-bloom 2.6s ease forwards;pointer-events:none;}
      @keyframes ckb-win-bloom{0%{transform:scale(1);}60%{transform:scale(3.8);filter:drop-shadow(0 0 120px #fff5b3) drop-shadow(0 0 220px #ffb84a);}100%{transform:scale(28);opacity:0;}}
      #ck-beach-takeover .ckb-hud{position:absolute;top:5vh;left:50%;transform:translateX(-50%);text-align:center;pointer-events:none;user-select:none;text-shadow:0 2px 12px rgba(0,0,0,.55),0 1px 2px rgba(0,0,0,.7);}
      #ck-beach-takeover .ckb-progress{font-size:clamp(2.4rem,6vw,4rem);font-weight:900;color:#fff;letter-spacing:1px;line-height:1;display:flex;align-items:baseline;justify-content:center;gap:6px;}
      #ck-beach-takeover .ckb-progress .ckb-slash{opacity:.6;font-weight:700;margin:0 2px;}
      #ck-beach-takeover .ckb-hint{margin-top:10px;font-size:.92rem;font-weight:600;color:rgba(255,255,255,.88);letter-spacing:.04em;}
      #ck-beach-takeover .ckb-shake{position:absolute;inset:0;pointer-events:none;}
      #ck-beach-takeover .ckb-shake.ckb-flash-red{animation:ckb-flash-red .35s ease;}
      #ck-beach-takeover .ckb-shake.ckb-flash-green{animation:ckb-flash-green .25s ease;}
      @keyframes ckb-flash-red{0%{background:rgba(220,30,30,.0)}30%{background:rgba(220,30,30,.32)}100%{background:rgba(220,30,30,0)}}
      @keyframes ckb-flash-green{0%{background:rgba(255,235,120,0)}30%{background:rgba(255,235,120,.18)}100%{background:rgba(255,235,120,0)}}
      #ck-beach-takeover.ckb-shake-anim{animation:ckb-shake .4s cubic-bezier(.36,.07,.19,.97) both;}
      @keyframes ckb-shake{10%,90%{transform:translate3d(-2px,0,0);}20%,80%{transform:translate3d(4px,0,0);}30%,50%,70%{transform:translate3d(-6px,0,0);}40%,60%{transform:translate3d(6px,0,0);}}
      #ck-beach-takeover .ckb-win-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:radial-gradient(ellipse at center,rgba(255,235,180,.0) 0%,rgba(255,200,120,.0) 30%,rgba(0,0,0,.65) 100%);opacity:0;transition:opacity 1.4s ease;pointer-events:none;}
      #ck-beach-takeover .ckb-win-overlay.ckb-vis{opacity:1;}
      #ck-beach-takeover .ckb-win-card{text-align:center;color:#fff8e7;text-shadow:0 2px 14px rgba(0,0,0,.6);animation:ckb-win-in 1.6s cubic-bezier(.22,1,.36,1) .4s both;}
      #ck-beach-takeover .ckb-win-title{font-size:clamp(2rem,6vw,4.2rem);font-weight:900;letter-spacing:1px;background:linear-gradient(135deg,#ffe9a8,#ffb84a 60%,#ff7c2b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
      #ck-beach-takeover .ckb-win-sub{margin-top:14px;font-size:clamp(1rem,2.4vw,1.5rem);font-weight:600;color:#fff;}
      #ck-beach-takeover .ckb-win-meta{margin-top:28px;font-size:.8rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.7);}
      @keyframes ckb-win-in{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
      @media (max-width:640px){#ck-beach-takeover .ckb-palm{height:74vh;} #ck-beach-takeover .ckb-ball{width:64px;}}
    `;
    document.head.appendChild(s);
  }

  function boot() {
    initParticles();
    const isLandscapeMobile=window.matchMedia('(orientation: landscape) and (max-width: 1024px)').matches;
    if (isLandscapeMobile) return;
    mountWidget(); mountSunButton();
    const toastCtrl=createToast();
    if (!ss('ck-shown')) { ssSet('ck-shown','1'); setTimeout(()=>toastCtrl.show(),1300); }
  }

  injectStyles();

  (function injectLQMStyles(){ const s=document.createElement('style'); s.id='ck-lqm-styles';
    s.textContent=`body.lqm .bg-gradient,body.lqm .orb,body.lqm .grid-overlay,body.lqm #particles,body.lqm #ck-canvas{display:none!important;} body.lqm *,body.lqm *::before,body.lqm *::after{animation:none!important;transition:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;will-change:auto!important;} body.lqm .navbar{background:rgba(255,248,240,.97)!important;} body[data-theme="dark"].lqm .navbar{background:rgba(8,12,16,.97)!important;}`;
    document.head.appendChild(s);
  })();

  function ckApplyLQM(on){ document.body && document.body.classList.toggle('lqm',on); try{localStorage.setItem('aightbet-lqm',on?'true':'false');}catch(_){} }
  window.__ckApplyLQM=ckApplyLQM;

  try { if (localStorage.getItem('aightbet-lqm')==='true') { if (document.body) document.body.classList.add('lqm'); else document.addEventListener('DOMContentLoaded',()=>document.body.classList.add('lqm')); } } catch(_){}

  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);
  else boot();

  window.addEventListener('ck-theme-changed',function(){ const old=document.getElementById('ck-styles'); if(old) old.remove(); injectStyles(); });
})();