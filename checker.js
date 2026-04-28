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
      '.case-grid,.cases-grid,.game-grid,[class*="-grid"]{'+
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
      '.case-grid,.cases-grid,.game-grid,[class*="-grid"]{grid-template-columns:1fr!important}'+
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
        // Easter egg #1 — fire once
        if(window.__easterEggUnlocked) window.__easterEggUnlocked('hacker');
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

      // ── MYTHIC DROP ANNOUNCEMENTS (auto — cases write to mythicDrops directly) ──
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
            '#mythic-slide.show{transform:translateY(var(--nav-h,64px))}' +
            '#mythic-slide .ms-star{font-size:1.2rem;animation:ms-pop .5s ease}' +
            '#mythic-slide .ms-text{font-size:.85rem;font-weight:700;color:#fff}' +
            '#mythic-slide .ms-user{color:#e0f2fe;font-weight:800}' +
            '#mythic-slide .ms-item{color:#fde68a;font-weight:900}' +
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

        // Listen for new mythicDrops (written by cases.html and case-battles.html)
        var mythicInitDone = false;
        var mythicSeenKeys = {};
        rtdb.ref('mythicDrops').limitToLast(3).on('value', function(snap){
          if(!mythicInitDone){
            snap.forEach(function(child){ mythicSeenKeys[child.key] = true; });
            mythicInitDone = true;
            return;
          }
          snap.forEach(function(child){
            if(!mythicSeenKeys[child.key]){
              mythicSeenKeys[child.key] = true;
              var drop = child.val();
              if(drop && drop.item && drop.user){
                showMythicDropBanner(drop.user, drop.item);
              }
            }
          });
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
        if(slqmOn&&window.__easterEggUnlocked) window.__easterEggUnlocked('slqm');
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

     // ── EASTEREGG1: Both gunman + bigeye → secret cosmetic reward ──
      rtdb.ref('users/'+u.uid+'/easteregg1').on('value',function(snap){
        var ee1=snap.val()||{};
        if(ee1.gunman===true && ee1.bigeye===true){
          // Always grant inventory — set(true) is idempotent, safe to run every time
          var grants={};
          grants['users/'+u.uid+'/inventory/ne_phantom']=true;
          grants['users/'+u.uid+'/inventory/intro_resurrection']=true;
          grants['users/'+u.uid+'/inventory/px_chaos']=true;
          rtdb.ref().update(grants);
          // Only show the popup once
          if(!ee1.secretRewardClaimed){
            rtdb.ref('users/'+u.uid+'/easteregg1/secretRewardClaimed').set(true);
            setTimeout(showEasterEgg1SecretPopup,800);
          }
        }
      });

      // Global messages — check for unseen messages
      checkGlobalMessages(u.uid);

      // ── Check if all 5 secret eggs collected → award 10M credits once ──
      checkEgg2Reward(u.uid);
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

  

  window.__easterEggUnlocked = function(eggKey) {
    waitForFirebase(function() {
      var auth2 = firebase.auth();
      var rtdb2 = firebase.database();
      var u = auth2.currentUser;
      if (!u) return;

      var eggRef = rtdb2.ref('users/' + u.uid + '/easterEggs');
      eggRef.once('value', function(snap) {
        var eggs = snap.val() || {};

        // Already unlocked this egg — do nothing
        if (eggs[eggKey]) return;

        // Mark egg as unlocked
        var update = {};
        update[eggKey] = true;
        eggRef.update(update, function() {
          // Count total unlocked (after this update)
          var newEggs = Object.assign({}, eggs, update);
          var unlockedKeys = ['hacker', 'slqm', 'secretcase'].filter(function(k){ return newEggs[k]; });
          var count = unlockedKeys.length;

          // Show unlock popup
          showEggUnlockPopup(count, eggKey);

          // If all 3 unlocked AND reward not yet claimed → give 5M credits
          if (count === 3 && !eggs.rewardClaimed) {
            eggRef.update({ rewardClaimed: true }, function() {
              rtdb2.ref('users/' + u.uid + '/credits').transaction(function(c) {
                return (c || 0) + 5000000;
              }, function() {
                // Show reward popup after small delay so egg popup is visible first
                setTimeout(showEggRewardPopup, 1800);
              });
            });
          }
        });
      });
    });
  };

  function showEggUnlockPopup(count, eggKey) {
    var names = { hacker: '🖥️ Hacker Mode', slqm: '📺 Super Low Quality Mode', secretcase: '📦 Secret Case' };
    var label = names[eggKey] || eggKey;
    var isAll = count >= 3;

    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99998;display:flex;align-items:flex-end;justify-content:center;padding:32px;pointer-events:none';

    var card = document.createElement('div');
    card.style.cssText = 'background:rgba(15,15,25,.97);border:1px solid rgba(139,92,246,.35);border-radius:18px;padding:20px 24px;max-width:380px;width:100%;pointer-events:auto;animation:eggSlideUp .4s cubic-bezier(.22,1,.36,1);font-family:Segoe UI,system-ui,-apple-system,sans-serif;box-shadow:0 8px 40px rgba(139,92,246,.25)';

    var eggIcons = ['🥚','🐣','🐥'];
    var dots = '';
    for (var i = 0; i < 3; i++) {
      var filled = i < count;
      dots += '<span style="font-size:1.4rem;opacity:' + (filled ? '1' : '0.25') + ';transition:opacity .3s">' + (filled ? '🥚' : '○') + '</span>';
    }

    card.innerHTML =
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">' +
        '<div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0">🥚</div>' +
        '<div>' +
          '<div style="font-size:.75rem;font-weight:700;color:#8b5cf6;text-transform:uppercase;letter-spacing:.08em">Easter Egg Found!</div>' +
          '<div style="font-size:1rem;font-weight:800;color:#e2e8f0">' + label + '</div>' +
        '</div>' +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">' +
        dots +
        '<span style="font-size:.8rem;color:#94a3b8;margin-left:4px">' + count + '/3 Easter Eggs</span>' +
      '</div>' +
      (isAll ? '' : '<div style="font-size:.75rem;color:#94a3b8;margin-top:6px">Find all 3 for a special reward!</div>');

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    var style = document.createElement('style');
    if (!document.getElementById('egg-anim-style')) {
      style.id = 'egg-anim-style';
      style.textContent = '@keyframes eggSlideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}';
      document.head.appendChild(style);
    }

    // Auto-dismiss after 4s
    setTimeout(function() {
      card.style.transition = 'opacity .4s, transform .4s';
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(function() {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 400);
    }, 4000);
  }

  function showEggRewardPopup() {
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.75);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:20px;font-family:Segoe UI,system-ui,-apple-system,sans-serif';

    var card = document.createElement('div');
    card.style.cssText = 'background:rgba(15,15,25,.98);border:1px solid rgba(245,158,11,.4);border-radius:22px;max-width:440px;width:100%;padding:36px 28px;text-align:center;animation:eggSlideUp .45s cubic-bezier(.22,1,.36,1);box-shadow:0 0 80px rgba(245,158,11,.15)';

    card.innerHTML =
      '<div style="font-size:3.5rem;margin-bottom:12px">🎉</div>' +
      '<div style="font-size:1.5rem;font-weight:900;color:#f59e0b;margin-bottom:6px">All Easter Eggs Found!</div>' +
      '<div style="font-size:.95rem;color:#94a3b8;margin-bottom:20px">You discovered all 3 hidden Easter Eggs.<br>Here\'s your reward:</div>' +
      '<div style="background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.25);border-radius:14px;padding:18px;margin-bottom:22px">' +
        '<div style="font-size:2.2rem;font-weight:900;color:#f59e0b">🪙 5,000,000</div>' +
        '<div style="font-size:.85rem;color:#94a3b8;margin-top:4px">Credits added to your account</div>' +
      '</div>' +
      '<button id="eggRewardDismiss" style="width:100%;padding:13px;font-size:.95rem;font-weight:800;color:#fff;background:linear-gradient(135deg,#f59e0b,#d97706);border:none;border-radius:12px;cursor:pointer;font-family:inherit">Awesome! 🥚</button>';

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    card.querySelector('#eggRewardDismiss').addEventListener('click', function() {
      overlay.style.transition = 'opacity .3s';
      overlay.style.opacity = '0';
      setTimeout(function() { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 300);
    });
  }

  // Expose a helper to check if a specific egg is already unlocked (used by pages to skip re-triggering)
  window.__isEggUnlocked = function(eggKey, cb) {
    waitForFirebase(function() {
      var u = firebase.auth().currentUser;
      if (!u) { cb(false); return; }
      firebase.database().ref('users/' + u.uid + '/easterEggs/' + eggKey).once('value', function(snap) {
        cb(snap.val() === true);
      });
    });
  };

 

  // ── Check all 5 secret eggs on login and award credits if not yet claimed ──
  function checkEgg2Reward(uid) {
    var rtdb2 = firebase.database();
    var eggRef = rtdb2.ref('users/' + uid + '/eastereggs2');
    eggRef.once('value', function(snap) {
      var eggs = snap.val() || {};
      var allKeys = ['superblood', 'hackerterminal', 'ghostchannel', 'ghostmachine', 'interrogation'];
      var count = allKeys.filter(function(k){ return eggs[k] === true; }).length;
      if (count >= 5 && !eggs.rewardClaimed) {
        eggRef.update({ rewardClaimed: true }, function() {
          rtdb2.ref('users/' + uid + '/credits').transaction(function(c) {
            return (c || 0) + 10000000;
          }, function() {
            setTimeout(showEgg2RewardPopup, 500);
          });
        });
      }
    });
  }

  window.__easterEgg2Unlocked = function(eggKey) {
    waitForFirebase(function() {
      var auth2 = firebase.auth();
      var rtdb2 = firebase.database();
      var u = auth2.currentUser;
      if (!u) return;

      var eggRef = rtdb2.ref('users/' + u.uid + '/eastereggs2');
      eggRef.once('value', function(snap) {
        var eggs = snap.val() || {};
        var allKeys = ['superblood', 'hackerterminal', 'ghostchannel', 'ghostmachine', 'interrogation'];

        // Mark egg as unlocked (even if already set, update is idempotent)
        var update = {};
        update[eggKey] = true;
        eggRef.update(update, function() {
          var newEggs = Object.assign({}, eggs, update);
          var count = allKeys.filter(function(k){ return newEggs[k] === true; }).length;

          // Only show unlock popup if this egg was newly unlocked
          if (!eggs[eggKey]) {
            showEgg2UnlockPopup(count, eggKey);
          }

          // Award credits if all 5 collected and not yet claimed
          if (count >= 5 && !eggs.rewardClaimed) {
            eggRef.update({ rewardClaimed: true }, function() {
              rtdb2.ref('users/' + u.uid + '/credits').transaction(function(c) {
                return (c || 0) + 10000000;
              }, function() {
                setTimeout(showEgg2RewardPopup, 1800);
              });
            });
          }
        });
      });
    });
  };

  function showEgg2UnlockPopup(count, eggKey) {
    var names = { superblood: '🩸 Super Hacker' };
    var label = names[eggKey] || eggKey;

    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99998;display:flex;align-items:flex-end;justify-content:center;padding:32px;pointer-events:none';

    var card = document.createElement('div');
    card.style.cssText = 'background:rgba(5,0,0,.97);border:1px solid rgba(180,0,0,.5);border-radius:18px;padding:20px 24px;max-width:400px;width:100%;pointer-events:auto;animation:eggSlideUp .4s cubic-bezier(.22,1,.36,1);font-family:monospace;box-shadow:0 8px 40px rgba(200,0,0,.3),0 0 60px rgba(200,0,0,.1)';

    var dots = '';
    for (var i = 0; i < 5; i++) {
      var filled = i < count;
      dots += '<span style="font-size:1.3rem;opacity:' + (filled ? '1' : '0.2') + '">' + (filled ? '🩸' : '○') + '</span>';
    }

    card.innerHTML =
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">' +
        '<div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#8b0000,#cc0000);display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0">🩸</div>' +
        '<div>' +
          '<div style="font-size:.72rem;font-weight:700;color:#cc0000;text-transform:uppercase;letter-spacing:.1em">Secret Egg Found!</div>' +
          '<div style="font-size:1rem;font-weight:800;color:#ff4444">' + label + '</div>' +
        '</div>' +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">' +
        dots +
        '<span style="font-size:.75rem;color:#880000;margin-left:4px">' + count + '/5 Secret Eggs</span>' +
      '</div>' +
      '<div style="font-size:.72rem;color:#660000;margin-top:6px">Find all 5 for a special reward...</div>';

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    if (!document.getElementById('egg-anim-style')) {
      var style = document.createElement('style');
      style.id = 'egg-anim-style';
      style.textContent = '@keyframes eggSlideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}';
      document.head.appendChild(style);
    }

    setTimeout(function() {
      card.style.transition = 'opacity .4s, transform .4s';
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(function() { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 400);
    }, 5000);
  }

  function showEgg2RewardPopup() {
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.85);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:20px;font-family:monospace';

    var card = document.createElement('div');
    card.style.cssText = 'background:rgba(5,0,0,.99);border:1px solid rgba(200,0,0,.5);border-radius:22px;max-width:440px;width:100%;padding:36px 28px;text-align:center;animation:eggSlideUp .45s cubic-bezier(.22,1,.36,1);box-shadow:0 0 100px rgba(200,0,0,.2)';

    card.innerHTML =
      '<div style="font-size:3.5rem;margin-bottom:12px">🩸</div>' +
      '<div style="font-size:1.5rem;font-weight:900;color:#cc0000;margin-bottom:6px">All Secret Eggs Found!</div>' +
      '<div style="font-size:.9rem;color:#660000;margin-bottom:20px">You discovered all 5 hidden secrets.<br>I\'m impressed. Here\'s your reward:</div>' +
      '<div style="background:rgba(150,0,0,.1);border:1px solid rgba(150,0,0,.3);border-radius:14px;padding:18px;margin-bottom:22px">' +
        '<div style="font-size:2.2rem;font-weight:900;color:#cc0000">🩸 10,000,000</div>' +
        '<div style="font-size:.82rem;color:#660000;margin-top:4px">Credits added to your account</div>' +
      '</div>' +
      '<button id="egg2RewardDismiss" style="width:100%;padding:13px;font-size:.95rem;font-weight:800;color:#fff;background:linear-gradient(135deg,#8b0000,#cc0000);border:none;border-radius:12px;cursor:pointer;font-family:monospace">I knew it. 🩸</button>';

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    card.querySelector('#egg2RewardDismiss').addEventListener('click', function() {
      overlay.style.transition = 'opacity .3s';
      overlay.style.opacity = '0';
      setTimeout(function() { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 300);
    });
  }

  
  (function() {
    if (document.getElementById('super-hacker-style')) return;

    var s = document.createElement('style');
    s.id = 'super-hacker-style';
    s.textContent = `
      /* ── Super Hacker: creepy BG letter layer ── */
      #sh-letters {
        position: fixed; inset: 0; z-index: 0;
        pointer-events: none;
        overflow: hidden;
        display: none;
      }
      body.super-hacker #sh-letters { display: block; }

      .sh-letter {
        position: absolute;
        font-family: monospace;
        font-weight: 900;
        font-size: clamp(18px, 3vw, 40px);
        opacity: 0;
        user-select: none;
        pointer-events: none;
        animation: sh-twitch var(--d, 2s) var(--delay, 0s) infinite;
        color: var(--c, #00ff41);
        text-shadow: 0 0 8px var(--c, #00ff41);
      }

      @keyframes sh-twitch {
        0%   { opacity: 0;    transform: translate(0,0) rotate(0deg) scale(1); }
        5%   { opacity: var(--op, 0.12); transform: translate(var(--tx1,2px), var(--ty1,-1px)) rotate(var(--r1, 1deg)) scale(1.02); }
        10%  { opacity: 0;    transform: translate(0,0); }
        15%  { opacity: var(--op, 0.12); transform: translate(var(--tx2,-3px), var(--ty2,2px)) rotate(var(--r2,-2deg)) scale(0.98); }
        20%  { opacity: 0;    transform: translate(0,0); }
        30%  { opacity: var(--op, 0.12); transform: translate(var(--tx1,2px), var(--ty1,-1px)) rotate(var(--r1,1deg)); }
        35%  { opacity: 0;    transform: translate(0,0); }
        50%  { opacity: var(--op, 0.18); transform: translate(var(--tx2,-3px), var(--ty2,2px)) rotate(var(--r2,-2deg)) scale(1.05); }
        55%  { opacity: 0;    transform: translate(1px,-1px); }
        70%  { opacity: var(--op, 0.1); transform: translate(0,0) rotate(0deg); }
        85%  { opacity: 0;    transform: translate(var(--tx1,2px), var(--ty2,2px)); }
        95%  { opacity: var(--op, 0.15); transform: translate(0,0) rotate(var(--r1,1deg)); }
        100% { opacity: 0;    transform: translate(0,0) rotate(0deg); }
      }

      /* Blood-red tint on the hacker canvas when super active */
      body.super-hacker #hacker-canvas {
        filter: hue-rotate(-30deg) saturate(1.2) !important;
        opacity: 0.7 !important;
      }

      /* Navbar subtle red pulsing border */
      body.super-hacker .navbar {
        border-bottom-color: rgba(200,0,0,.25) !important;
        animation: sh-navbar-pulse 3s ease-in-out infinite !important;
      }
      @keyframes sh-navbar-pulse {
        0%,100% { border-bottom-color: rgba(200,0,0,.1) !important; }
        50%      { border-bottom-color: rgba(200,0,0,.45) !important; }
      }

      /* Exit button update in super mode */
      body.super-hacker #hacker-exit {
        color: #ff3333 !important;
        border-color: rgba(200,0,0,.4) !important;
        text-shadow: 0 0 8px rgba(200,0,0,.5) !important;
      }
    `;
    document.head.appendChild(s);

    /* Letter layer canvas */
    var lettersDiv = document.createElement('div');
    lettersDiv.id = 'sh-letters';
    var SH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>{}[]|\\?/';
    var SH_COLORS = ['#00ff41','#ff0000','#cc0000','#ff3333','#ff6666','#00cc33','#008822','#ff9900'];
    var shLetters = [];

    function buildLetters() {
      lettersDiv.innerHTML = '';
      shLetters = [];
      var cols = Math.floor(window.innerWidth / 52) + 2;
      var rows = Math.floor(window.innerHeight / 52) + 2;
      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          var el = document.createElement('span');
          el.className = 'sh-letter';
          var ch = SH_CHARS[Math.floor(Math.random() * SH_CHARS.length)];
          el.textContent = ch;
          var col = SH_COLORS[Math.floor(Math.random() * SH_COLORS.length)];
          var dur = (1.5 + Math.random() * 4).toFixed(2);
          var delay = (Math.random() * 5).toFixed(2);
          var op = (0.06 + Math.random() * 0.16).toFixed(2);
          var tx1 = (Math.random() * 6 - 3).toFixed(1);
          var ty1 = (Math.random() * 6 - 3).toFixed(1);
          var tx2 = (Math.random() * 6 - 3).toFixed(1);
          var ty2 = (Math.random() * 6 - 3).toFixed(1);
          var r1  = (Math.random() * 6 - 3).toFixed(1);
          var r2  = (Math.random() * 6 - 3).toFixed(1);
          el.style.cssText =
            'left:' + (c * 52) + 'px;top:' + (r * 52) + 'px;' +
            '--c:' + col + ';--d:' + dur + 's;--delay:' + delay + 's;--op:' + op + ';' +
            '--tx1:' + tx1 + 'px;--ty1:' + ty1 + 'px;--tx2:' + tx2 + 'px;--ty2:' + ty2 + 'px;' +
            '--r1:' + r1 + 'deg;--r2:' + r2 + 'deg;';
          lettersDiv.appendChild(el);
          shLetters.push(el);
        }
      }
    }

    /* Periodically mutate random letters so they change character + color */
    var shMutateTimer = null;
    function startSHMutate() {
      if (shMutateTimer) return;
      shMutateTimer = setInterval(function() {
        if (!document.body.classList.contains('super-hacker')) { clearInterval(shMutateTimer); shMutateTimer = null; return; }
        var picks = Math.floor(shLetters.length * 0.05);
        for (var i = 0; i < picks; i++) {
          var el = shLetters[Math.floor(Math.random() * shLetters.length)];
          if (!el) continue;
          el.textContent = SH_CHARS[Math.floor(Math.random() * SH_CHARS.length)];
          el.style.setProperty('--c', SH_COLORS[Math.floor(Math.random() * SH_COLORS.length)]);
        }
      }, 400);
    }

    function activateSuperHacker() {
      if (!document.body.classList.contains('super-hacker')) {
        document.body.classList.add('super-hacker');
        if (!document.getElementById('sh-letters')) document.body.appendChild(lettersDiv);
        buildLetters();
        startSHMutate();
        localStorage.setItem('aightbet-super-hacker', 'true');
      }
    }

    function deactivateSuperHacker() {
      document.body.classList.remove('super-hacker');
      localStorage.setItem('aightbet-super-hacker', 'false');
      clearInterval(shMutateTimer);
      shMutateTimer = null;
    }

    window.__activateSuperHacker = activateSuperHacker;
    window.__deactivateSuperHacker = deactivateSuperHacker;

    function injectSH() {
      document.body.appendChild(lettersDiv);
      if (localStorage.getItem('aightbet-super-hacker') === 'true') {
        // Only activate if also in hacker mode
        if (localStorage.getItem('aightbet-hacker') === 'true') {
          activateSuperHacker();
        } else {
          localStorage.setItem('aightbet-super-hacker', 'false');
        }
      }
    }

    document.body ? injectSH() : document.addEventListener('DOMContentLoaded', injectSH);

    /* Deactivate super hacker if hacker mode exits */
    var origSetHacker = window.__setHackerMode;
    window.__setHackerMode = function(on) {
      if (origSetHacker) origSetHacker(on);
      if (!on) deactivateSuperHacker();
    };

    window.addEventListener('resize', function() {
      if (document.body.classList.contains('super-hacker')) buildLetters();
    });
  })();

  /* ══════════════════════════════════════════════════════════════
     EASTEREGG1 SECRET REWARD POPUP
     Fires once when both gunman + bigeye are found.
     Shows an insane particle-burst reveal with the 3 secret rewards.
  ══════════════════════════════════════════════════════════════ */
  function showEasterEgg1SecretPopup(){
    if(!document.getElementById('ee1s-anim')){
      var s=document.createElement('style');
      s.id='ee1s-anim';
      s.textContent=
        '@keyframes ee1sFadeIn{from{opacity:0}to{opacity:1}}'+
        '@keyframes ee1sCardIn{from{opacity:0;transform:translateY(50px) scale(.9)}to{opacity:1;transform:translateY(0) scale(1)}}'+
        '@keyframes ee1sPulseGlow{0%,100%{box-shadow:0 0 0 0 rgba(139,92,246,.0),0 0 60px rgba(139,92,246,.25)}50%{box-shadow:0 0 0 18px rgba(139,92,246,.0),0 0 100px rgba(139,92,246,.5)}}'+
        '@keyframes ee1sShimmer{0%{background-position:300% center}100%{background-position:-300% center}}'+
        '@keyframes ee1sTitlePop{0%{opacity:0;transform:scale(.4) rotate(-4deg)}65%{transform:scale(1.1) rotate(1deg)}100%{opacity:1;transform:scale(1) rotate(0deg)}}'+
        '@keyframes ee1sItemIn{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}'+
        '@keyframes ee1sParticleFly{0%{opacity:1;transform:translate(0,0) scale(1)}100%{opacity:0;transform:translate(var(--ee1tx),var(--ee1ty)) scale(0) rotate(var(--ee1rot))}}'+
        '@keyframes ee1sFlashBg{0%{opacity:0}15%{opacity:1}100%{opacity:0}}'+
        '@keyframes ee1sBtnPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}'+
        '@keyframes ee1sOrbit{0%{transform:rotate(0deg) translateX(var(--ee1orb)) rotate(0deg)}100%{transform:rotate(360deg) translateX(var(--ee1orb)) rotate(-360deg)}}';
      document.head.appendChild(s);
    }

    var overlay=document.createElement('div');
    overlay.id='ee1s-overlay';
    overlay.style.cssText='position:fixed;inset:0;z-index:999999;background:rgba(0,0,0,.94);display:flex;align-items:center;justify-content:center;padding:16px;font-family:Segoe UI,system-ui,-apple-system,sans-serif;animation:ee1sFadeIn .6s ease;overflow:hidden';

    // BG flash
    var flash=document.createElement('div');
    flash.style.cssText='position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,rgba(139,92,246,.55) 0%,transparent 70%);animation:ee1sFlashBg 1.2s ease forwards';
    overlay.appendChild(flash);

    // 120 particle burst
    var pLayer=document.createElement('div');
    pLayer.style.cssText='position:absolute;inset:0;pointer-events:none;overflow:hidden';
    var COLS=['#8b5cf6','#06b6d4','#ec4899','#f59e0b','#22c55e','#fff','#a78bfa','#34d399','#f472b6'];
    for(var pi=0;pi<120;pi++){
      var pel=document.createElement('div');
      var psize=(3+Math.random()*12)|0;
      var angle=Math.random()*360;
      var dist=150+Math.random()*700;
      var tx=Math.cos(angle*Math.PI/180)*dist;
      var ty=Math.sin(angle*Math.PI/180)*dist;
      var dur=(0.5+Math.random()*1.4).toFixed(2);
      var delay=(Math.random()*0.6).toFixed(2);
      var col=COLS[(Math.random()*COLS.length)|0];
      var rot=((Math.random()*720-360)|0)+'deg';
      var shape=Math.random()>.4?'50%':(Math.random()>.5?'3px':'0');
      pel.style.cssText='position:absolute;left:50%;top:50%;width:'+psize+'px;height:'+psize+'px;'+
        'background:'+col+';border-radius:'+shape+';'+
        'margin-left:'+(-psize/2)+'px;margin-top:'+(-psize/2)+'px;'+
        '--ee1tx:'+tx+'px;--ee1ty:'+ty+'px;--ee1rot:'+rot+';'+
        'animation:ee1sParticleFly '+dur+'s '+delay+'s cubic-bezier(.15,.5,.35,1) both';
      pLayer.appendChild(pel);
    }
    overlay.appendChild(pLayer);

    // 3 orbiting glow orbs
    var ORB_COLS=['rgba(139,92,246,.9)','rgba(6,182,212,.9)','rgba(236,72,153,.9)'];
    for(var oi=0;oi<3;oi++){
      var orb=document.createElement('div');
      var orbSize=10+oi*4;
      var orbRadius=230+oi*50;
      orb.style.cssText='position:absolute;left:50%;top:50%;width:'+orbSize+'px;height:'+orbSize+'px;'+
        'border-radius:50%;background:'+ORB_COLS[oi]+';'+
        'box-shadow:0 0 20px '+ORB_COLS[oi]+',0 0 40px '+ORB_COLS[oi]+';'+
        'margin-left:'+(-orbSize/2)+'px;margin-top:'+(-orbSize/2)+'px;'+
        '--ee1orb:'+orbRadius+'px;'+
        'animation:ee1sOrbit '+(4+oi*1.5)+'s '+(oi*.5)+'s linear infinite;pointer-events:none;z-index:1';
      overlay.appendChild(orb);
    }

    // Card
    var card=document.createElement('div');
    card.style.cssText='position:relative;z-index:5;background:rgba(8,6,18,.98);'+
      'border:1px solid rgba(139,92,246,.6);border-radius:28px;max-width:500px;width:100%;padding:40px 32px 32px;text-align:center;'+
      'animation:ee1sCardIn .7s cubic-bezier(.22,1,.36,1) .15s both, ee1sPulseGlow 3s ease 1.5s infinite;'+
      'box-shadow:0 0 0 1px rgba(139,92,246,.1) inset,0 30px 80px rgba(0,0,0,.8)';

    var ring=document.createElement('div');
    ring.style.cssText='position:absolute;inset:6px;border-radius:24px;border:1px solid rgba(139,92,246,.07);pointer-events:none';
    card.appendChild(ring);

    var icon=document.createElement('div');
    icon.style.cssText='font-size:3.5rem;margin-bottom:4px;display:block;animation:ee1sTitlePop .7s cubic-bezier(.22,1,.36,1) .4s both;line-height:1';
    icon.textContent='💀';
    card.appendChild(icon);

    var badge=document.createElement('div');
    badge.style.cssText='font-size:.65rem;font-weight:800;letter-spacing:.3em;text-transform:uppercase;color:#8b5cf6;margin-bottom:12px;animation:ee1sTitlePop .5s ease .55s both';
    badge.textContent='SECRET UNLOCKED';
    card.appendChild(badge);

    var title=document.createElement('div');
    title.style.cssText='font-size:1.75rem;font-weight:900;letter-spacing:-1.5px;margin-bottom:8px;'+
      'background:linear-gradient(90deg,#8b5cf6,#ec4899,#06b6d4,#f59e0b,#22c55e,#8b5cf6);'+
      'background-size:400%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;'+
      'animation:ee1sShimmer 3s linear infinite, ee1sTitlePop .55s ease .65s both';
    title.textContent='YOU FOUND THEM BOTH';
    card.appendChild(title);

    var sub=document.createElement('div');
    sub.style.cssText='font-size:.88rem;color:#94a3b8;line-height:1.65;margin-bottom:28px;animation:ee1sTitlePop .5s ease .75s both';
    sub.innerHTML='The Gunman. The Eye. Both found.<br>These 3 items exist <em>nowhere</em> in the store.<br><span style="color:#8b5cf6;font-weight:700">You cannot buy them. Only finders get them.</span>';
    card.appendChild(sub);

   var rewards=[
  {icon:'🔥',color:'rgba(236,72,153,.12)',border:'rgba(236,72,153,.5)',accent:'#f472b6',cat:'PARTICLES',name:'Insane Particles',desc:'The most unhinged particle effect on the platform. Nothing even comes close.',delay:'.85s'},
  {icon:'💀',color:'rgba(139,92,246,.1)', border:'rgba(139,92,246,.4)',accent:'#a78bfa',cat:'NAME FX',name:'INSANEE Name FX',desc:'A name effect so broken it shouldn\'t exist. You can\'t buy this. Ever.',delay:'1s'},
  {icon:'⚡',color:'rgba(245,158,11,.1)', border:'rgba(245,158,11,.4)',accent:'#fbbf24',cat:'INTRO',name:'CRAZY MINDBLOWING Intro',desc:'Absolutely deranged. Screen-shaking, jaw-dropping. Pure insanity.',delay:'1.15s'},
];
    var rewardWrap=document.createElement('div');
    rewardWrap.style.cssText='display:flex;flex-direction:column;gap:10px;margin-bottom:28px;text-align:left';
    rewards.forEach(function(r){
      var row=document.createElement('div');
      row.style.cssText='background:'+r.color+';border:1px solid '+r.border+';border-radius:14px;padding:14px 16px;'+
        'display:flex;align-items:center;gap:14px;animation:ee1sItemIn .5s ease '+r.delay+' both';
      var ico=document.createElement('div');
      ico.style.cssText='font-size:1.4rem;flex-shrink:0;width:40px;height:40px;border-radius:10px;'+
        'background:'+r.color+';border:1px solid '+r.border+';display:flex;align-items:center;justify-content:center';
      ico.textContent=r.icon;
      var text=document.createElement('div');
      text.innerHTML='<div style="font-size:.58rem;font-weight:800;letter-spacing:.12em;color:'+r.accent+';text-transform:uppercase;margin-bottom:2px">'+r.cat+'</div>'+
        '<div style="font-size:.92rem;font-weight:900;color:#f1f5f9;margin-bottom:2px">'+r.name+'</div>'+
        '<div style="font-size:.72rem;color:#64748b">'+r.desc+'</div>';
      row.appendChild(ico);
      row.appendChild(text);
      rewardWrap.appendChild(row);
    });
    card.appendChild(rewardWrap);

    var btn=document.createElement('button');
    btn.id='ee1sDismissBtn';
    btn.style.cssText='width:100%;padding:15px;font-size:.95rem;font-weight:800;color:#fff;'+
      'background:linear-gradient(135deg,#8b5cf6,#06b6d4);border:none;border-radius:14px;cursor:pointer;'+
      'font-family:inherit;letter-spacing:.04em;'+
      'box-shadow:0 4px 24px rgba(139,92,246,.5);transition:transform .2s,box-shadow .2s';
    btn.textContent='I\'m built different. 💀';
    btn.addEventListener('mouseover',function(){this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 32px rgba(139,92,246,.7)';});
    btn.addEventListener('mouseout',function(){this.style.transform='';this.style.boxShadow='0 4px 24px rgba(139,92,246,.5)';});
    btn.addEventListener('click',function(){
      overlay.style.transition='opacity .4s ease';
      overlay.style.opacity='0';
      setTimeout(function(){ if(overlay.parentNode) overlay.parentNode.removeChild(overlay); },400);
    });
    card.appendChild(btn);

    overlay.appendChild(card);
    document.body.appendChild(overlay);
  }

})();
