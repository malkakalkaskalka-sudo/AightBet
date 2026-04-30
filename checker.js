(function(){
  var page=window.location.pathname.split('/').pop().toLowerCase();
  var exempt=['ban.html','maintenance.html','support.html','index.html','recorder.html'];
  if(exempt.indexOf(page)!==-1)return;

  // ── MOBILE OPTIMIZATION: inject responsive CSS for all pages ──
  (function(){
    if(document.getElementById('mobile-opt-style'))return;
    var ms=document.createElement('style');
    ms.id='mobile-opt-style';
    ms.textContent=
    /* ── Base resets ── */
    '@media(max-width:768px){'+
      'html,body{overflow-x:hidden!important;-webkit-text-size-adjust:100%}'+
      '*{-webkit-tap-highlight-color:transparent}'+

    /* ── Prevent iOS zoom on focus ── */
      'input,select,textarea{font-size:16px!important}'+

    /* ── Navbar ── */
      '.navbar{padding:0 12px!important;height:var(--nav-h-mobile,56px)!important}'+
      '.nav-logo span{font-size:.95rem!important}'+
      '.nav-links{display:none!important}'+
      '.nav-credits-desktop{display:none!important}'+
      '.hamburger{display:flex!important}'+
      '.nav-avatar{width:32px!important;height:32px!important}'+
      '.mobile-menu{width:100%!important;left:0!important;right:0!important;border-radius:0 0 16px 16px!important}'+

    /* ── Main content spacing ── */
      'main,.main{padding-top:calc(var(--nav-h-mobile,56px) + 8px)!important}'+
      '.page-header{padding:16px 16px 8px!important}'+
      '.page-header h1{font-size:1.5rem!important}'+

    /* ── Grid layouts → single column ── */
      '.profile-container{grid-template-columns:1fr!important;gap:16px!important;padding:0 12px!important}'+
      '.settings-panel{gap:12px!important}'+

    /* ── Cards ── */
      '.profile-card{position:relative!important;top:auto!important}'+
      '.settings-card,.profile-card,.post-card,.card,[class*="card"]:not(.post-card):not(#mythic-slide){'+
        'border-radius:14px!important;padding:16px!important}'+

    /* ── Hero section ── */
      '.hero{padding:40px 16px 32px!important;min-height:auto!important}'+
      '.hero h1,.hero-title{font-size:2rem!important;line-height:1.2!important}'+
      '.hero-sub{font-size:.9rem!important}'+
      '.hero-stats{flex-wrap:wrap!important;gap:10px!important;justify-content:center!important}'+
      '.hero-actions{flex-direction:column!important;gap:10px!important;align-items:stretch!important}'+
      '.hero-actions a,.hero-actions button{width:100%!important;text-align:center!important;justify-content:center!important}'+

    /* ── Game/case grids ── */
      '.case-grid,.cases-grid,.game-grid,[class*="-grid"]:not(.number-grid):not(.zero-row):not(.outside-bets):not(.outside-bets-2):not(.rules-grid):not(.stats-grid):not(.store-grid):not(.bg-gradient):not(.grid-overlay){'+
        'grid-template-columns:repeat(2,1fr)!important;gap:10px!important;padding:0 12px!important}'+
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
      '.dm-panel,.chat-panel,.profile-panel,[class*="-panel"]{'+
        'width:100%!important;max-width:100%!important;height:100dvh!important;max-height:100dvh!important;border-radius:0!important}'+

    /* ── Modals ── */
      '.modal-box{max-width:95vw!important;max-height:85vh!important;margin:auto!important;border-radius:16px!important;padding:20px 16px!important}'+
      '.modal-overlay{padding:10px!important}'+

    /* ── Case opening / spinner ── */
      '.case-detail,.case-open-section{padding:0 12px!important}'+
      '.reel-container,.spinner-container{max-width:100%!important;overflow:hidden!important}'+
      '.won-display{padding:16px!important}'+
      '.won-display .won-item-name{font-size:1.1rem!important}'+

    /* ── Case battles ── */
      '.battle-arena{flex-direction:column!important;gap:12px!important}'+
      '.player-panel{width:100%!important;min-width:0!important}'+
      '.battle-vs{margin:4px 0!important}'+
      '.spinner-pair{flex-direction:column!important;gap:8px!important}'+
      '.create-overlay-content{max-width:95vw!important;max-height:85vh!important;overflow-y:auto!important}'+
      '.team-side{flex-direction:column!important}'+

    /* ── Buttons — touch friendly ── */
      'button,.btn,[class*="-btn"]{min-height:42px!important}'+
      '.post-action-btn{min-height:36px!important;padding:8px 12px!important}'+

    /* ── Stats row ── */
      '.dash-stats,.stat-row,.stats-row,.hero-stats{'+
        'flex-wrap:wrap!important;gap:8px!important;padding:12px!important}'+
      '.dash-stat,.stat-card{min-width:calc(50% - 8px)!important;flex:none!important}'+

    /* ── Tables ── */
      'table{display:block!important;overflow-x:auto!important;-webkit-overflow-scrolling:touch!important}'+

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
      '.case-grid,.cases-grid,.game-grid,[class*="-grid"]:not(.number-grid):not(.zero-row):not(.outside-bets):not(.outside-bets-2):not(.rules-grid):not(.stats-grid):not(.store-grid):not(.bg-gradient):not(.grid-overlay){grid-template-columns:1fr!important}'+
      '.hero h1,.hero-title{font-size:1.6rem!important}'+
      '.nav-logo span{font-size:.85rem!important}'+
      '.post-action-btn span{display:none!important}'+
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

      rtdb.ref('users/'+u.uid+'/banned').on('value',function(snap){
        if(snap.val()===true){
          window.location.href='ban.html';
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
      '.up-logo{width:54px;height:54px;border-radius:14px;background:linear-gradient(135deg,#8b5cf6,#6d28d9);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:1.3rem;color:#fff;letter-spacing:.02em;box-shadow:0 8px 24px -6px rgba(139,92,246,.5);flex-shrink:0}'+
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
        '<div class="up-logo">AB</div>'+
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
        background:linear-gradient(135deg, #8b5cf6, #06b6d4);
        display:flex;align-items:center;justify-content:center;font-size:1.8rem;
        box-shadow:0 8px 32px -8px rgba(139,92,246,.5);
        animation: vo-iconBounce 2s ease infinite;
      }
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
        '<div class="vote-icon">🗳️</div>' +
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
            '#mythic-slide .ms-star{font-size:1.2rem;animation:ms-pop .5s ease}' +
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
            '<span class="ms-star">&#10024;</span>' +
            '<span class="ms-text">' +
              '<span class="ms-user">' + escapeHTMLBasic(userName) + '</span>' +
              ' just got ' +
              '<span class="ms-item">' + escapeHTMLBasic(itemName) + '</span>' +
            '</span>' +
            '<span class="ms-star">&#10024;</span>';
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
            '<span class="ms-star">&#128176;</span>' +
            '<span class="ms-text">' +
              '<span class="ms-user">' + escapeHTMLBasic(userName) + '</span>' +
              ' just won ' +
              '<span class="ms-item">' + amountStr + '</span>' +
              (source ? ' on <span class="ms-item">' + escapeHTMLBasic(source) + '</span>' : '') +
            '</span>' +
            '<span class="ms-star">&#128293;</span>';
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
      '@media(max-width:480px){#rec-fab{bottom:16px;left:16px}#rec-fab-btn{width:42px;height:42px}}';
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

    card.innerHTML=badge+'<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px"><div style="width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#06b6d4);display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0"></div><div><div style="font-size:1.1rem;font-weight:900;color:#e2e8f0">Message from AightBet</div><div style="font-size:.75rem;color:#94a3b8">'+date+'</div></div></div><div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:16px;font-size:.92rem;line-height:1.6;color:#e2e8f0;margin-bottom:20px;max-height:200px;overflow-y:auto;word-break:break-word">'+escapeHTMLBasic(msg.text)+'</div><button id="gmDismissBtn" style="width:100%;padding:12px;font-size:.9rem;font-weight:700;color:#fff;background:linear-gradient(135deg,#8b5cf6,#7c3aed);border:none;border-radius:12px;cursor:pointer;font-family:inherit;transition:transform .15s">Got it</button>';

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

  function escapeHTMLBasic(s){
    var d=document.createElement('div');
    d.textContent=s||'';
    return d.innerHTML;
  }

  
})();
