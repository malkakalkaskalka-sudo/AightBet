(function(){
  var page=window.location.pathname.split('/').pop().toLowerCase();
  var exempt=['ban.html','maintenance.html','support.html','index.html',''];
  if(exempt.indexOf(page)!==-1)return;

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
    if(typeof firebase!=='undefined'&&firebase.apps&&firebase.apps.length>0){cb();return;}
    var tries=0;
    var interval=setInterval(function(){
      tries++;
      if(typeof firebase!=='undefined'&&firebase.apps&&firebase.apps.length>0){
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

  // ── EASTER EGG SYSTEM ──
  // Easter eggs:
  //   egg1 = "hacker"  — home page logo x10  → triggers hacker mode
  //   egg2 = "slqm"    — profile page SLQM    → triggers super low quality mode
  //   egg3 = "secretcase" — cases page 6+7 x3 → reveals secret case
  // When all 3 are unlocked → award 5,000,000 credits ONCE.

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

})();
