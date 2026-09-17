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
    name: 'Autumn', codename: 'Amber Harvest', version: `v3.${YEAR}`,
    accent: '#e8722c',  accent2: '#b5541a',  accent3: '#c9a13b',
    glow:   'rgba(232,114,44,.60)',  glow2: 'rgba(197,120,30,.45)',
    bg: '#fdf6ec',
    bgGrad: `radial-gradient(ellipse 90% 60% at 15% 10%, rgba(232,150,60,.30), transparent),
             radial-gradient(ellipse 70% 50% at 85% 20%, rgba(160,70,20,.20), transparent),
             radial-gradient(ellipse 50% 60% at 50% 90%, rgba(201,161,59,.18), transparent)`,
    orbColors: ['#e8722c', '#c9a13b', '#8a3b12'],
    darkAccent: '#ff9a52', darkAccent2: '#d98a3d', darkAccent3: '#e0bc63',
    darkGlow: 'rgba(255,154,82,.55)', darkGlow2: 'rgba(217,138,61,.40)',
    darkBg: '#100a06',
    darkBgGrad: `radial-gradient(ellipse 80% 55% at 20% 15%, rgba(232,114,44,.15), transparent),
                 radial-gradient(ellipse 60% 50% at 80% 25%, rgba(160,70,20,.16), transparent),
                 radial-gradient(ellipse 40% 45% at 50% 85%, rgba(201,161,59,.12), transparent)`,
    darkOrbColors: ['#ff9a52', '#e0bc63', '#c96a2a'],
    particleCount: 50,
    notes: [
      '🍂 Collect 100 leaves to unlock a secret challenge',
      '🎃 A real prize hides behind it. Coming soon...',
      '🌙 Amber Harvest theme is live across AightBet',
      '🍁 Falling leaves, harvest-moon glow & cozy widgets enabled',
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
      @media (orientation:landscape) and (max-width:1024px) { #ck-widget,#ck-toast,#ck-patch-takeover { display:none!important; } }
    `;
    document.head.appendChild(s);
  }

  let __sunHotspot = { x:0, y:0, r:60 };
  function initParticles() {
    const canvas=document.createElement('canvas'); canvas.id='ck-canvas'; document.body.appendChild(canvas);
    const ctx=canvas.getContext('2d'); let W,H; const pool=[];
    function resize() { W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; }
    resize(); window.addEventListener('resize',resize);
    const LEAF_COLORS=['#e8722c','#c9a13b','#b5541a','#8a3b12','#e0bc63','#a8471f','#d98a3d'];
    const EMBER_COLORS=['#ff9a52','#ffcf8a'];
    function makeLeaf(burst) { return {type:'leaf', x:rand(0,W), y:burst?rand(0,H):rand(-20,-5), vx:rand(-.4,.4), vy:rand(.35,.9), size:rand(6,13), alpha:rand(.5,.95), color:LEAF_COLORS[randInt(0,LEAF_COLORS.length-1)], rot:rand(0,Math.PI*2), rotSpeed:rand(-.03,.03), sway:rand(0,Math.PI*2)}; }
    function makeEmber() { return {type:'ember', x:rand(0,W), y:rand(H*.2,H*.95), vx:rand(-.3,.3), vy:rand(-.2,-.05), size:rand(2,4.5), alpha:rand(.35,.85), phase:rand(0,Math.PI*2), hue:randInt(25,45)}; }
    for (let i=0;i<T.particleCount;i++) pool.push(makeLeaf(true));
    for (let i=0;i<18;i++) pool.push(makeEmber());
    function drawLeaf(p){
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot); ctx.globalAlpha=p.alpha;
      ctx.fillStyle=p.color; ctx.shadowColor=p.color; ctx.shadowBlur=p.size*0.8;
      const s=p.size;
      ctx.beginPath();
      ctx.moveTo(0,-s); ctx.quadraticCurveTo(s*0.9,-s*0.3,0,s); ctx.quadraticCurveTo(-s*0.9,-s*0.3,0,-s);
      ctx.fill();
      ctx.strokeStyle='rgba(0,0,0,.18)'; ctx.lineWidth=0.6; ctx.beginPath(); ctx.moveTo(0,-s); ctx.lineTo(0,s); ctx.stroke();
      ctx.restore();
    }
    function drawEmber(x,y,size,alpha,hue){ const c=`hsl(${hue},90%,65%)`;ctx.save();ctx.globalAlpha=alpha;ctx.shadowColor=c;ctx.shadowBlur=size*5;ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,size,0,Math.PI*2);ctx.fill();ctx.globalAlpha=alpha*1.4;ctx.fillStyle='#fff8ec';ctx.shadowBlur=0;ctx.beginPath();ctx.arc(x,y,size*.4,0,Math.PI*2);ctx.fill();ctx.restore(); }
    function drawMoon(t) {
      const LM=isLightMode(); const SX=W-72,SY=68,R=36; const pulse=1+0.05*Math.sin(t*0.03);
      __sunHotspot={x:SX,y:SY,r:R*1.6};
      const haloSizes=[R*3.6,R*2.6,R*1.9]; const haloAlphas=LM?[0.07,0.11,0.15]:[0.12,0.18,0.24];
      haloSizes.forEach((hr,i)=>{ const g=ctx.createRadialGradient(SX,SY,0,SX,SY,hr*pulse); g.addColorStop(0,`rgba(232,150,60,${haloAlphas[i]})`); g.addColorStop(0.5,`rgba(180,90,30,${haloAlphas[i]*0.5})`); g.addColorStop(1,'rgba(140,60,20,0)'); ctx.save();ctx.fillStyle=g;ctx.beginPath();ctx.arc(SX,SY,hr*pulse,0,Math.PI*2);ctx.fill();ctx.restore(); });
      const cg=ctx.createRadialGradient(SX-R*0.25,SY-R*0.25,0,SX,SY,R*pulse); cg.addColorStop(0,'#fff3d6');cg.addColorStop(0.35,'#ffd98a');cg.addColorStop(0.75,'#e8a94a');cg.addColorStop(1,'#c9741f');
      ctx.save();ctx.shadowColor='#e8b25a';ctx.shadowBlur=LM?24:40;ctx.fillStyle=cg;ctx.beginPath();ctx.arc(SX,SY,R*pulse,0,Math.PI*2);ctx.fill();ctx.restore();
      // crescent shading — carve out a "harvest moon" sliver shadow
      ctx.save(); ctx.globalCompositeOperation='destination-out'; ctx.globalAlpha=LM?0.30:0.42;
      ctx.beginPath(); ctx.arc(SX+R*0.42,SY-R*0.18,R*0.92,0,Math.PI*2); ctx.fill(); ctx.restore();
      ctx.save();ctx.globalAlpha=LM?0.45:0.35; const sg=ctx.createRadialGradient(SX-R*0.35,SY-R*0.35,0,SX-R*0.2,SY-R*0.2,R*0.5); sg.addColorStop(0,'#fffdf5');sg.addColorStop(1,'rgba(255,253,245,0)'); ctx.fillStyle=sg;ctx.beginPath();ctx.arc(SX,SY,R*pulse,0,Math.PI*2);ctx.fill();ctx.restore();
    }
    let time=0;
    function tick() {
      if (document.body && document.body.classList.contains('lqm')) { ctx.clearRect(0,0,W,H); requestAnimationFrame(tick); return; }
      ctx.clearRect(0,0,W,H); time++; drawMoon(time);
      pool.forEach(p=>{
        if (p.type==='leaf') { p.sway+=.02; p.rot+=p.rotSpeed; p.x+=p.vx+Math.sin(p.sway)*.6; p.y+=p.vy; if (p.y>H+15) Object.assign(p,makeLeaf(false)); drawLeaf(p); }
        else { p.phase+=.04; p.x+=p.vx+Math.sin(p.phase*.7)*.35; p.y+=p.vy+Math.cos(p.phase*.5)*.15; if(p.x<0)p.vx=Math.abs(p.vx); if(p.x>W)p.vx=-Math.abs(p.vx); if(p.y<H*.05)p.vy=Math.abs(p.vy)*0.3; if(p.y>H*.98)Object.assign(p,makeEmber()); const blink=Math.max(0,Math.sin(p.phase*1.8))*p.alpha; drawEmber(p.x,p.y,p.size,blink,p.hue); }
      });
      requestAnimationFrame(tick);
    }
    tick();
  }

  function createToast() {
    const toast=document.createElement('div'); toast.id='ck-toast';
    toast.innerHTML=`<div class="ck-th"><div class="ck-tt">🍂 ${T.name.toUpperCase()} UPDATE <span class="ck-tv">${T.version}</span></div><button class="ck-tx" id="ck-toast-close" aria-label="Close">✕</button></div><div class="ck-div"></div>${T.notes.map(n=>`<div class="ck-note">${n}</div>`).join('')}`;
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
    const MS_DAY=86400000;
    // Autumn window: Sep 1 -> Dec 1. Always resolve to whichever cycle (this
    // year's or next year's) is the one currently relevant, so the countdown
    // to the END of autumn is always correct no matter what day it is.
    const yr=RIGA_NOW.getFullYear();
    let autumnStart=new Date(yr,8,1), autumnEnd=new Date(yr,11,1);
    if (RIGA_NOW>=autumnEnd) { autumnStart=new Date(yr+1,8,1); autumnEnd=new Date(yr+1,11,1); }
    let sumPct,sumDaysLeft,sumStateLabel,sumSubLabel;
    if (RIGA_NOW>=autumnStart && RIGA_NOW<autumnEnd) {
      sumPct=Math.round(((RIGA_NOW-autumnStart)/(autumnEnd-autumnStart))*100);
      sumDaysLeft=Math.max(0,Math.ceil((autumnEnd-RIGA_NOW)/MS_DAY));
      sumStateLabel=sumDaysLeft+' day'+(sumDaysLeft!==1?'s':'')+' left';
      sumSubLabel=sumPct+'% through autumn';
    } else {
      const cycleStart=new Date(autumnStart.getFullYear(),autumnStart.getMonth()-3,autumnStart.getDate());
      sumDaysLeft=Math.max(0,Math.ceil((autumnStart-RIGA_NOW)/MS_DAY));
      sumPct=Math.max(0,Math.min(100,Math.round(((RIGA_NOW-cycleStart)/(autumnStart-cycleStart))*100)));
      sumStateLabel=sumDaysLeft+' day'+(sumDaysLeft!==1?'s':'')+' until autumn';
      sumSubLabel='Countdown '+sumPct+'% complete';
    }
    const cardA=document.createElement('div'); cardA.className='ck-card'; cardA.dataset.clickable='false';
    cardA.innerHTML=`<div class="cw-lbl">🍁 Autumn Countdown</div><div class="cw-val">${sumStateLabel}</div><div class="cw-sub">${sumSubLabel}</div><div class="cw-bar"><div class="cw-fill" id="ck-sum-bar"></div></div>`;
    container.appendChild(cardA);

    const cardB=document.createElement('div'); cardB.className='ck-card'; cardB.dataset.clickable='true';
    const LEAF_TARGET=100;
    const leavesCollected=()=>parseInt(ls('ck-leaves','0'));
    const leafSub=n=> n>=LEAF_TARGET ? '🎉 Secret unlocked!' : n>=75 ? '🍁 So close...' : n>=40 ? '🍂 Halfway there' : n>=10 ? 'Keep tapping!' : 'Tap to collect a leaf!';
    cardB.innerHTML=`<div class="cw-lbl">🍂 Leaves Collected</div><div class="cw-val">${Math.min(leavesCollected(),LEAF_TARGET)} / ${LEAF_TARGET}</div><div class="cw-sub">${leafSub(leavesCollected())}</div>`;
    cardB.addEventListener('click',()=>{
      const n=leavesCollected()+1; lsSet('ck-leaves',n);
      cardB.querySelector('.cw-val').textContent=Math.min(n,LEAF_TARGET)+' / '+LEAF_TARGET;
      cardB.querySelector('.cw-sub').textContent=leafSub(n);
      if (n>=LEAF_TARGET && !ls('ck-leaf-secret-found',null)) { launchLeafCollector(); }
    });
    container.appendChild(cardB);
    document.body.appendChild(container);
    setTimeout(()=>{ const bar=document.getElementById('ck-sum-bar'); if(bar) bar.style.width=sumPct+'%'; },600);
  }

  const ASSETS = {
    patchBg: 'https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?auto=format&fit=crop&w=2880&q=80',
    leafA:   'https://pngimg.com/uploads/autumn_leaves/autumn_leaves_PNG28.png',
    cloud1:  'https://pngimg.com/uploads/cloud/cloud_PNG14.png',
    cloud2:  'https://pngimg.com/uploads/cloud/cloud_PNG24.png',
    cloud3:  'https://pngimg.com/uploads/cloud/cloud_PNG10.png',
    treeL:   'https://pngimg.com/uploads/autumn_tree/autumn_tree_PNG2.png',
    treeR:   'https://pngimg.com/uploads/autumn_tree/autumn_tree_PNG9.png',
  };

  const LEAF_TARGET=100;

  function launchLeafCollector() {
    if (document.getElementById('ck-patch-takeover')) return;
    const HIDE_SELECTORS=['.navbar','.mobile-menu','.bg-gradient','.grid-overlay','.orb','#particles','.main','.footer','#ck-canvas','#ck-widget','#ck-toast','.support-fab-group','#music-player','.featured','.stats-bar','.hero','.top-players'];
    const stash=[];
    document.querySelectorAll(HIDE_SELECTORS.join(',')).forEach(el=>{ stash.push({el,prev:el.style.display}); el.style.display='none'; });
    document.documentElement.style.overflow='hidden'; document.body.style.overflow='hidden';
    const stage=document.createElement('div'); stage.id='ck-patch-takeover';
    stage.innerHTML=`<div class="ckb-bg"></div><div class="ckb-sky"></div><img class="ckb-cloud ckb-cloud-a" src="${ASSETS.cloud1}" alt=""><img class="ckb-cloud ckb-cloud-b" src="${ASSETS.cloud2}" alt=""><img class="ckb-cloud ckb-cloud-c" src="${ASSETS.cloud3}" alt=""><img class="ckb-palm ckb-palm-l" src="${ASSETS.treeL}" alt=""><img class="ckb-palm ckb-palm-r" src="${ASSETS.treeR}" alt=""><div class="ckb-leaf-layer" id="ckb-leaf-layer"></div><div class="ckb-hud" id="ckb-hud"><div class="ckb-progress"><span id="ckb-count">0</span><span class="ckb-slash">/</span><span>${LEAF_TARGET}</span></div><div class="ckb-hint" id="ckb-hint">Tap the falling leaves. Collect ${LEAF_TARGET} to unlock new items!</div></div>`;
    document.body.appendChild(stage);
    injectChallengeStyles();

    let collected=0, won=false;
    const layer=document.getElementById('ckb-leaf-layer');
    const countEl=document.getElementById('ckb-count');

    function spawnLeaf(){
      if (won) return;
      const leaf=document.createElement('img');
      leaf.src=ASSETS.leafA; leaf.alt=''; leaf.className='ckb-fall-leaf';
      const startX=rand(2,96), size=rand(28,50), duration=rand(5.5,9.5), drift=rand(-70,70), spin=(Math.random()<0.5?-1:1)*rand(220,420);
      leaf.style.left=startX+'vw';
      leaf.style.width=size+'px';
      leaf.style.setProperty('--drift',drift+'px');
      leaf.style.setProperty('--spin',spin+'deg');
      leaf.style.animationDuration=duration+'s';
      layer.appendChild(leaf);
      const cleanup=()=>{ if(leaf.parentNode) leaf.remove(); };
      leaf.addEventListener('animationend',cleanup);
      const collect=(e)=>{
        if (won) return;
        e.preventDefault(); e.stopPropagation();
        collected++; countEl.textContent=collected;
        leaf.removeEventListener('animationend',cleanup);
        leaf.classList.add('ckb-leaf-caught');
        setTimeout(cleanup,260);
        if (collected>=LEAF_TARGET) winSequence();
      };
      leaf.addEventListener('click',collect);
      leaf.addEventListener('touchstart',collect,{passive:false});
    }
    for (let i=0;i<7;i++) setTimeout(spawnLeaf,i*140);
    const spawnTimer=setInterval(spawnLeaf,280);

    function winSequence(){
      won=true; clearInterval(spawnTimer);
      Array.prototype.forEach.call(layer.querySelectorAll('.ckb-fall-leaf'),el=>el.remove());
      const overlay=document.createElement('div'); overlay.className='ckb-win-overlay';
      overlay.innerHTML=`<div class="ckb-win-card">
  <div class="ckb-win-title">100 leaves collected.</div>
  <div class="ckb-win-sub">New <b style="color:#e0bc63">LIMITED</b> items unlock soon</div>
  <div class="ckb-win-meta">Check back for the harvest reward drop</div>
</div>`;
      stage.appendChild(overlay); requestAnimationFrame(()=>overlay.classList.add('ckb-vis'));
      lsSet('ck-leaf-secret-found','1'); lsSet('ck-leaf-secret-at',String(Date.now()));

      // Mark progress in Firebase so items can be granted later once ready
      (function markPending(){
        try {
          var u = firebase.auth().currentUser;
          if (!u) return;
          firebase.database().ref('users/' + u.uid + '/prizes/leafSecret').set({
            at: firebase.database.ServerValue.TIMESTAMP,
            status: 'pending'
          });
        } catch(e){ console.warn('[CK] leaf secret mark failed', e); }
      })();
      setTimeout(()=>{ stage.classList.add('ckb-fade-out'); setTimeout(()=>{ stash.forEach(({el,prev})=>{ el.style.display=prev||''; }); document.documentElement.style.overflow=''; document.body.style.overflow=''; stage.remove(); },700); },3200);
    }
  }

  function injectChallengeStyles() {
    if (document.getElementById('ckb-style')) return;
    const s=document.createElement('style'); s.id='ckb-style';
    s.textContent=`
      #ck-patch-takeover{position:fixed;inset:0;z-index:99999;overflow:hidden;cursor:crosshair;font-family:'Segoe UI',system-ui,sans-serif;background:#d9a86a;animation:ckb-in .55s ease both;}
      @keyframes ckb-in{from{opacity:0}to{opacity:1}}
      #ck-patch-takeover.ckb-fade-out{animation:ckb-out .7s ease forwards;}
      @keyframes ckb-out{to{opacity:0;transform:scale(1.02)}}
      #ck-patch-takeover .ckb-bg{position:absolute;inset:0;background:url('${ASSETS.patchBg}') center/cover no-repeat;filter:saturate(1.05) contrast(1.02);}
      #ck-patch-takeover .ckb-sky{position:absolute;inset:0;background:radial-gradient(ellipse 70% 50% at 50% 15%,rgba(232,180,120,.35),transparent 60%),linear-gradient(180deg,rgba(180,140,110,.18) 0%,rgba(232,150,90,.00) 35%,rgba(150,90,50,.0) 60%,rgba(0,0,0,.14) 100%);pointer-events:none;}
      #ck-patch-takeover .ckb-cloud{position:absolute;pointer-events:none;opacity:.85;filter:drop-shadow(0 8px 18px rgba(0,0,0,.10));will-change:transform;}
      #ck-patch-takeover .ckb-cloud-a{top:6%;left:-18%;width:32vw;animation:ckb-drift-a 70s linear infinite;}
      #ck-patch-takeover .ckb-cloud-b{top:14%;left:-28%;width:24vw;animation:ckb-drift-b 95s linear infinite;opacity:.7;}
      #ck-patch-takeover .ckb-cloud-c{top:3%;left:-10%;width:18vw;animation:ckb-drift-c 120s linear infinite;opacity:.55;}
      @keyframes ckb-drift-a{0%{transform:translateX(0)}100%{transform:translateX(150vw)}}
      @keyframes ckb-drift-b{0%{transform:translateX(0)}100%{transform:translateX(160vw)}}
      @keyframes ckb-drift-c{0%{transform:translateX(0)}100%{transform:translateX(180vw)}}
      #ck-patch-takeover .ckb-palm{position:absolute;pointer-events:none;bottom:-2%;height:92vh;max-height:880px;filter:drop-shadow(0 30px 30px rgba(0,0,0,.30));transform-origin:bottom center;}
      #ck-patch-takeover .ckb-palm-l{left:-6%;animation:ckb-sway-l 7s ease-in-out infinite;}
      #ck-patch-takeover .ckb-palm-r{right:-8%;animation:ckb-sway-r 8.5s ease-in-out infinite;}
      @keyframes ckb-sway-l{0%,100%{transform:rotate(-1deg)}50%{transform:rotate(2.5deg)}}
      @keyframes ckb-sway-r{0%,100%{transform:rotate(1deg)}50%{transform:rotate(-2.5deg)}}
      #ck-patch-takeover .ckb-leaf-layer{position:absolute;inset:0;overflow:hidden;pointer-events:none;}
      #ck-patch-takeover .ckb-fall-leaf{position:absolute;top:-8vh;pointer-events:auto;cursor:pointer;user-select:none;-webkit-user-drag:none;filter:drop-shadow(0 4px 10px rgba(0,0,0,.25));will-change:transform;animation:ckb-leaf-fall linear forwards;}
      @keyframes ckb-leaf-fall{
        0%{transform:translate(0,0) rotate(0deg);opacity:0;}
        6%{opacity:1;}
        100%{transform:translate(var(--drift),118vh) rotate(var(--spin));opacity:1;}
      }
      #ck-patch-takeover .ckb-fall-leaf.ckb-leaf-caught{animation:none!important;transform:scale(1.5)!important;opacity:0!important;transition:transform .26s ease,opacity .26s ease;}
      #ck-patch-takeover .ckb-hud{position:absolute;top:5vh;left:50%;transform:translateX(-50%);text-align:center;pointer-events:none;user-select:none;text-shadow:0 2px 12px rgba(0,0,0,.55),0 1px 2px rgba(0,0,0,.7);}
      #ck-patch-takeover .ckb-progress{font-size:clamp(2.4rem,6vw,4rem);font-weight:900;color:#fff;letter-spacing:1px;line-height:1;display:flex;align-items:baseline;justify-content:center;gap:6px;}
      #ck-patch-takeover .ckb-progress .ckb-slash{opacity:.6;font-weight:700;margin:0 2px;}
      #ck-patch-takeover .ckb-hint{margin-top:10px;font-size:.92rem;font-weight:600;color:rgba(255,255,255,.88);letter-spacing:.04em;}
      #ck-patch-takeover .ckb-win-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:radial-gradient(ellipse at center,rgba(255,235,180,.0) 0%,rgba(255,200,120,.0) 30%,rgba(0,0,0,.65) 100%);opacity:0;transition:opacity 1.4s ease;pointer-events:none;}
      #ck-patch-takeover .ckb-win-overlay.ckb-vis{opacity:1;}
      #ck-patch-takeover .ckb-win-card{text-align:center;color:#fff8e7;text-shadow:0 2px 14px rgba(0,0,0,.6);animation:ckb-win-in 1.6s cubic-bezier(.22,1,.36,1) .4s both;}
      #ck-patch-takeover .ckb-win-title{font-size:clamp(2rem,6vw,4.2rem);font-weight:900;letter-spacing:1px;background:linear-gradient(135deg,#ffd9a0,#e0762c 60%,#8a3b12);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
      #ck-patch-takeover .ckb-win-sub{margin-top:14px;font-size:clamp(1rem,2.4vw,1.5rem);font-weight:600;color:#fff;}
      #ck-patch-takeover .ckb-win-meta{margin-top:28px;font-size:.8rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.7);}
      @keyframes ckb-win-in{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
      @media (max-width:640px){#ck-patch-takeover .ckb-palm{height:74vh;}}
    `;
    document.head.appendChild(s);
  }

  function boot() {
    initParticles();
    const isLandscapeMobile=window.matchMedia('(orientation: landscape) and (max-width: 1024px)').matches;
    if (isLandscapeMobile) return;
    mountWidget();
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