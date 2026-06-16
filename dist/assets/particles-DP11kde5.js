var e=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var t=e((()=>{tailwind.config={darkMode:`class`,theme:{extend:{colors:{"on-tertiary":`#313030`,"surface-container-high":`#292a2a`,"surface-variant":`#343535`,"on-tertiary-fixed-variant":`#474646`,"on-secondary-fixed":`#1c1b1b`,"inverse-surface":`#e3e2e2`,"secondary-fixed-dim":`#c8c6c5`,secondary:`#c8c6c5`,"surface-container-lowest":`#0d0e0f`,"secondary-fixed":`#e5e2e1`,"primary-container":`#ff544b`,tertiary:`#c8c6c5`,"on-surface-variant":`#e7bcb8`,surface:`#0a0a0c`,"on-primary-fixed-variant":`#93000c`,"surface-dim":`#050505`,primary:`#ff2a4b`,"on-primary-container":`#5c0005`,"error-container":`#93000a`,"secondary-container":`#2a2a2c`,"on-error-container":`#ffdad6`,"surface-bright":`#1a1a1c`,"tertiary-container":`#4a4a4c`,"on-error":`#690005`,background:`#050505`,"on-secondary":`#313030`,"on-surface":`#e3e2e2`,error:`#ffb4ab`,"on-secondary-fixed-variant":`#474746`,"on-primary-fixed":`#410002`,"primary-fixed":`#ffdad6`,"tertiary-fixed":`#e5e2e1`,"primary-fixed-dim":`#ffb4ab`,"inverse-primary":`#c00014`,"surface-tint":`#ffb4ab`,"surface-container-highest":`#343535`,"surface-container":`#1a1a1a`,"on-primary":`#000000`,"on-background":`#e3e2e2`,"outline-variant":`#1a1a1a`,"inverse-on-surface":`#2f3131`,outline:`#1a1a1a`,"surface-container-low":`#1a1c1c`,"tertiary-fixed-dim":`#c8c6c5`,"on-tertiary-fixed":`#1c1b1b`,"on-secondary-container":`#b7b5b4`,"on-tertiary-container":`#2a2a29`},borderRadius:{DEFAULT:`0.75rem`,md:`0.5rem`,lg:`1rem`,xl:`1.5rem`,full:`9999px`},spacing:{gutter:`24px`,"section-gap":`80px`,"margin-mobile":`16px`,unit:`4px`,"container-max":`1280px`},fontFamily:{"code-sm":[`JetBrains Mono`,`monospace`],"label-mono":[`JetBrains Mono`,`monospace`],"headline-md-mobile":[`Inter`,`sans-serif`],"body-base":[`JetBrains Mono`,`monospace`],"display-lg":[`Inter`,`sans-serif`],"headline-md":[`Inter`,`sans-serif`]},fontSize:{"code-sm":[`12px`,{lineHeight:`1.5`,fontWeight:`400`}],"label-mono":[`14px`,{lineHeight:`1.4`,letterSpacing:`0.05em`,fontWeight:`500`}],"headline-md-mobile":[`24px`,{lineHeight:`1.2`,fontWeight:`600`}],"body-base":[`14px`,{lineHeight:`1.6`,fontWeight:`400`}],"display-lg":[`56px`,{lineHeight:`1.1`,letterSpacing:`-0.02em`,fontWeight:`700`}],"headline-md":[`32px`,{lineHeight:`1.2`,fontWeight:`600`}]}}}}})),n=e((()=>{(function(){let e=null,t=null,n=document.createElement(`style`);n.textContent=`
    .auth-modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(6px);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .auth-modal-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }
    .auth-modal-content {
      width: 90%;
      max-width: 420px;
      background: #0f0f0f;
      border: 1px solid #ff3131;
      padding: 28px;
      position: relative;
      box-shadow: 0 0 25px rgba(255, 49, 49, 0.25);
      transform: scale(0.95);
      transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .auth-modal-overlay.open .auth-modal-content {
      transform: scale(1);
    }
    .glow-btn-red:hover {
      box-shadow: 0 0 12px rgba(255, 49, 49, 0.4);
    }
  `,document.head.appendChild(n);async function r(){if(window.envLoaded||await new Promise(e=>window.addEventListener(`envLoaded`,e,{once:!0})),!window.env?.FIREBASE_API_KEY){console.warn(`Firebase configuration missing in environment.`);return}let t={apiKey:window.env.FIREBASE_API_KEY,authDomain:window.env.FIREBASE_AUTH_DOMAIN,projectId:window.env.FIREBASE_PROJECT_ID,storageBucket:window.env.FIREBASE_STORAGE_BUCKET,messagingSenderId:window.env.FIREBASE_MESSAGING_SENDER_ID,appId:window.env.FIREBASE_APP_ID};try{firebase.apps.length||firebase.initializeApp(t),e=firebase.auth(),i(),e.onAuthStateChanged(e=>{o(e)})}catch(e){console.error(`Firebase Auth initialization failed:`,e)}}function i(){t=document.createElement(`div`),t.className=`auth-modal-overlay`,t.id=`auth-modal`,t.innerHTML=`
      <div class="auth-modal-content">
        <div class="flex items-center justify-between border-b border-surface-variant pb-3 mb-6">
          <span class="text-primary font-label-mono text-sm tracking-wider font-bold">SECURE_GATE 
          <button id="auth-close" class="text-on-surface-variant hover:text-primary transition-colors text-sm">✖</button>
        </div>
        <p class="text-on-surface-variant font-code-sm text-code-sm mb-6 uppercase tracking-wider leading-relaxed">
          Awaiting verification token. Select a provider below to connect to the DemonDie network.
        </p>
        <div class="flex flex-col gap-4">
          <button id="auth-github-btn" class="group flex items-center justify-center gap-3 bg-transparent text-on-surface border border-surface-variant hover:border-primary hover:text-primary transition-all duration-200 py-3 font-label-mono text-xs glow-btn-red">
            <span class="material-symbols-outlined text-[16px]">terminal</span>
            <span class="font-bold tracking-widest">GITHUB_OAUTH</span>
          </button>
          <button id="auth-google-btn" class="group flex items-center justify-center gap-3 bg-transparent text-on-surface border border-surface-variant hover:border-primary hover:text-primary transition-all duration-200 py-3 font-label-mono text-xs glow-btn-red">
            <span class="material-symbols-outlined text-[16px]">google</span>
            <span class="font-bold tracking-widest">GOOGLE_OAUTH</span>
          </button>
        </div>
      </div>
    `,document.body.appendChild(t),document.getElementById(`auth-close`).addEventListener(`click`,()=>t.classList.remove(`open`)),t.addEventListener(`click`,e=>{e.target===t&&t.classList.remove(`open`)}),document.getElementById(`auth-github-btn`).addEventListener(`click`,()=>a(`github`)),document.getElementById(`auth-google-btn`).addEventListener(`click`,()=>a(`google`))}function a(n){let r;r=n===`github`?new firebase.auth.GithubAuthProvider:new firebase.auth.GoogleAuthProvider,e.signInWithPopup(r).then(()=>{t.classList.remove(`open`)}).catch(e=>{console.error(`Sign-in failed:`,e),alert(`Authentication failure: ${e.message}`)})}function o(n){let r=document.querySelector(`nav button.md\\:hidden, header button.md\\:hidden`);if(!r)return;let i=document.getElementById(`auth-widget`);i||(i=document.createElement(`div`),i.id=`auth-widget`,i.className=`flex items-center gap-4 mr-4`,r.parentNode.insertBefore(i,r));let a=document.getElementById(`add-blog-btn`);if(n){if(a){let e=(n.displayName||``).toLowerCase().replace(/\\s+/g,``),t=(n.email||``).split(`@`)[0].toLowerCase(),r=n.reloadUserInfo&&n.reloadUserInfo.screenName?n.reloadUserInfo.screenName.toLowerCase():``,i=[`rishibyte`,`pranav00076`,`pranavthawait`,`sharanyobanerjee`,`yuvraj`,`yuvraj-sarathe`],o=i.includes(e)||i.includes(t)||i.includes(r);if(!o&&n.providerData){for(let e of n.providerData)if(e.providerId===`github.com`){let t=(e.email||``).split(`@`)[0].toLowerCase(),n=(e.displayName||``).toLowerCase().replace(/\\s+/g,``),r=e.uid;if(i.includes(t)||i.includes(n)||r===`108343166`||r===`140939527`||r===`140889218`||r===`96338573`){o=!0;break}}}o?(a.classList.remove(`hidden`),a.classList.add(`flex`)):(a.classList.add(`hidden`),a.classList.remove(`flex`))}let t=n.photoURL||`https://raw.githubusercontent.com/Demon-Die/Website/refs/heads/main/assets/demondie-logo.webp`;i.innerHTML=`
        <div class="flex items-center gap-3">
          <img class="w-8 h-8 rounded-full border border-primary object-cover" src="${t}" alt="Profile">
          <button id="auth-logout-btn" class="text-on-surface-variant hover:text-primary transition-colors text-[10px] sm:text-xs font-label-mono tracking-wider cursor-pointer">
            [ LOGOUT ]
          </button>
        </div>
      `;let r=document.getElementById(`auth-logout-btn`);r&&r.addEventListener(`click`,()=>e.signOut())}else{a&&(a.classList.add(`hidden`),a.classList.remove(`flex`)),i.innerHTML=`
        <button id="auth-login-trigger" class="flex items-center gap-2 px-3 py-1.5 border border-primary hover:bg-primary/10 transition-all font-label-mono text-[10px] sm:text-xs text-primary tracking-widest cursor-pointer">
          <span class="material-symbols-outlined text-[14px]">login</span>
          LOGIN
        </button>
      `;let e=document.getElementById(`auth-login-trigger`);e&&e.addEventListener(`click`,()=>t.classList.add(`open`))}}document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,r):r()})()})),r=e((()=>{var e=class{constructor(e,t,n){this.canvas=e,this.ctx=e.getContext(`2d`),this.x=t,this.y=n,this.baseX=t,this.baseY=n,this.size=Math.random()*2+1,this.density=Math.random()*30+15,this.color=`rgba(255, 42, 75, 0.4)`,this.angle=Math.random()*Math.PI*2,this.speed=Math.random()*1.2+.4}draw(){this.ctx.fillStyle=this.color,this.ctx.beginPath(),this.ctx.arc(this.x,this.y,this.size,0,Math.PI*2),this.ctx.closePath(),this.ctx.fill()}update(e){if(this.baseX+=Math.cos(this.angle)*this.speed,this.baseY+=Math.sin(this.angle)*this.speed,this.baseX<0&&(this.baseX=this.canvas.width,this.x=this.baseX),this.baseX>this.canvas.width&&(this.baseX=0,this.x=this.baseX),this.baseY<0&&(this.baseY=this.canvas.height,this.y=this.baseY),this.baseY>this.canvas.height&&(this.baseY=0,this.y=this.baseY),e.x!==void 0&&e.y!==void 0){let t=this.x-e.x,n=this.y-e.y,r=Math.sqrt(t*t+n*n);if(r<300){let i=(300-r)/300,a=Math.atan2(n,t)+.16*i*(this.density/15),o=r;o<75&&(o=75+r*.15);let s=e.x+Math.cos(a)*o,c=e.y+Math.sin(a)*o;this.x+=(s-this.x)*.28,this.y+=(c-this.y)*.28}}let t=this.baseX-this.x,n=this.baseY-this.y;this.x+=t*.05,this.y+=n*.05}};(function(){let t,n,r=[],i,a={x:void 0,y:void 0};function o(e){a.x=e.clientX,a.y=e.clientY}function s(){a.x=void 0,a.y=void 0}function c(){for(let e=0;e<r.length;e++)for(let t=e+1;t<r.length;t++){let i=r[e].x-r[t].x,a=r[e].y-r[t].y,o=Math.sqrt(i*i+a*a);if(o<75){let i=1-o/75;n.strokeStyle=`rgba(255, 42, 75, ${i*.15})`,n.lineWidth=.7,n.beginPath(),n.moveTo(r[e].x,r[e].y),n.lineTo(r[t].x,r[t].y),n.stroke()}}}function l(){n.clearRect(0,0,t.width,t.height);for(let e=0;e<r.length;e++)r[e].update(a),r[e].draw();c(),i=requestAnimationFrame(l)}function u(){document.documentElement.style.backgroundColor=`#000000`,document.body.style.backgroundColor=`transparent`,t=document.getElementById(`particles-canvas`),t||(t=document.createElement(`canvas`),t.id=`particles-canvas`,t.style.position=`fixed`,t.style.top=`0`,t.style.left=`0`,t.style.width=`100vw`,t.style.height=`100vh`,t.style.pointerEvents=`none`,t.style.zIndex=`-1`,document.body.prepend(t)),n=t.getContext(`2d`),t.width=window.innerWidth,t.height=window.innerHeight,r=[];let i=Math.min(t.width*t.height/7600,175);for(let n=0;n<i;n++){let n=Math.random()*t.width,i=Math.random()*t.height;r.push(new e(t,n,i))}}function d(){cancelAnimationFrame(i),u(),l()}document.addEventListener(`DOMContentLoaded`,()=>{let e=document.createElement(`link`);e.rel=`preload`,e.as=`image`,e.href=`./cursor/Cursor_64x64.png`,document.head.appendChild(e);let t=document.createElement(`link`);t.rel=`preload`,t.as=`image`,t.href=`./cursor/CursorActiveNew.png?v=2`,document.head.appendChild(t);let n=new Image;n.src=`./cursor/Cursor_64x64.png`;let r=new Image;r.src=`./cursor/CursorActiveNew.png?v=2`;let i=document.createElement(`style`);i.textContent=`
            html, body, a, button, select, [role="button"] {
                cursor: url('./cursor/Cursor_64x64.png') 16 7, auto !important;
            }
            a:hover, button:hover, select:hover, [role="button"]:hover, .cursor-pointer, .cursor-pointer:hover,
            a:active, button:active, select:active, [role="button"]:active, :active {
                cursor: url('./cursor/CursorActiveNew.png?v=2') 16 7, auto !important;
            }
        `,document.head.appendChild(i),u(),l(),window.addEventListener(`mousemove`,o),window.addEventListener(`mouseleave`,s),window.addEventListener(`resize`,d)})})()}));export{e as i,n,t as r,r as t};