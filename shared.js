// ═══════════════════════════════════════════════════
// SHARED.JS — Complete Portfolio JavaScript
// ═══════════════════════════════════════════════════

// ── PRELOADER ──
const preloader = document.getElementById('preloader');
if (preloader) {
  window.addEventListener('load', () => {
    preloader.classList.add('done');
    setTimeout(() => preloader.remove(), 700);
  });
}

// ── CUSTOM CURSOR ──
const cursor = document.querySelector('.cursor');
const ring   = document.querySelector('.cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animCursor() {
  if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
  if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
  requestAnimationFrame(animCursor);
}
animCursor();
document.addEventListener('mouseleave', () => { if(cursor)cursor.style.opacity='0'; if(ring)ring.style.opacity='0'; });
document.addEventListener('mouseenter', () => { if(cursor)cursor.style.opacity='1'; if(ring)ring.style.opacity='1'; });

// ── SCROLL PROGRESS BAR ──
const progressBar = document.getElementById('scrollProgress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = ((window.scrollY / total) * 100) + '%';
  }, { passive: true });
}

// ── BACK TO TOP ──
const btt = document.getElementById('backToTop');
if (btt) {
  window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 600), { passive: true });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── MOBILE MENU ──
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose  = document.getElementById('menuClose');
function closeMobileMenu() { if(mobileMenu){mobileMenu.classList.remove('open');document.body.style.overflow='';} }
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => { mobileMenu.classList.add('open'); document.body.style.overflow='hidden'; });
  menuClose && menuClose.addEventListener('click', closeMobileMenu);
  mobileMenu.addEventListener('click', e => { if(e.target===mobileMenu)closeMobileMenu(); });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileMenu));
}

// ── THEME TOGGLE ──
const themeBtn = document.getElementById('themeToggle');
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
  if(themeBtn) themeBtn.textContent = t==='light'?'🌙':'☀️';
}
applyTheme(localStorage.getItem('theme') || 'dark');
if(themeBtn) themeBtn.addEventListener('click', () => {
  applyTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark');
});

// ── SCROLL REVEAL ──
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);} });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.stagger').forEach(el => io.observe(el));

// ── PARALLAX ──
const heroBgEl = document.querySelector('.hero-bg-text,.page-hero-bg');
if (heroBgEl) {
  window.addEventListener('scroll', () => { heroBgEl.style.transform=`translateY(${window.scrollY*0.25}px)`; }, { passive:true });
}

// ── COUNTER ──
function animateCounter(el) {
  const target=parseInt(el.dataset.count), suffix=el.dataset.suffix||'', dur=1600, start=performance.now();
  function step(now) {
    const p=Math.min((now-start)/dur,1), ease=1-Math.pow(1-p,4);
    el.textContent=Math.round(ease*target)+suffix;
    if(p<1)requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
const cntIO = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){animateCounter(e.target);cntIO.unobserve(e.target);} });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => cntIO.observe(el));

// ── SKILL BARS ──
const barIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      const f=e.target.querySelector('.skill-fill');
      if(f) setTimeout(()=>{f.style.width=f.dataset.width;},150);
      barIO.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-chip').forEach(el => barIO.observe(el));

// ── PAGE TRANSITION ──
const overlay = document.querySelector('.page-transition');
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if(!href||href.startsWith('#')||href.startsWith('mailto')||href.startsWith('tel')||href.startsWith('http')||href.startsWith('//'))return;
  link.addEventListener('click', e => {
    e.preventDefault();
    if(!overlay){window.location.href=href;return;}
    overlay.classList.add('enter');
    setTimeout(()=>{window.location.href=href;},480);
  });
});
window.addEventListener('pageshow', () => {
  if(overlay){overlay.classList.remove('enter');overlay.classList.add('exit');setTimeout(()=>overlay.classList.remove('exit'),600);}
});

// ── MAGNETIC BUTTONS ──
document.querySelectorAll('.btn-magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r=btn.getBoundingClientRect();
    btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*0.22}px,${(e.clientY-r.top-r.height/2)*0.35}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transition='transform 0.45s cubic-bezier(0.34,1.56,0.64,1)'; btn.style.transform=''; });
  btn.addEventListener('mouseenter', () => { btn.style.transition='transform 0.08s linear'; });
});

// ── TILT CARDS ──
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-0.5, y=(e.clientY-r.top)/r.height-0.5;
    card.style.transform=`perspective(700px) rotateY(${x*11}deg) rotateX(${-y*11}deg) translateZ(14px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transition='transform 0.55s cubic-bezier(0.16,1,0.3,1)'; card.style.transform=''; });
  card.addEventListener('mouseenter', () => { card.style.transition='transform 0.08s linear'; });
});

// ── TYPEWRITER ──
document.querySelectorAll('[data-type]').forEach(el => {
  const twio = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting) {
      const text=el.dataset.type; el.textContent=''; let i=0;
      const iv=setInterval(()=>{el.textContent+=text[i];i++;if(i>=text.length)clearInterval(iv);},52);
      twio.unobserve(el);
    }
  }, { threshold: 0.5 });
  twio.observe(el);
});

// ── NAV ACTIVE + SHRINK ──
const navEl = document.querySelector('nav');
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur='';
  sections.forEach(s => { if(window.scrollY>=s.offsetTop-130)cur=s.id; });
  navLinks.forEach(a => { a.classList.remove('active'); if(a.getAttribute('href')==='#'+cur)a.classList.add('active'); });
  if(navEl) navEl.classList.toggle('scrolled', window.scrollY>80);
}, { passive: true });

// ── COPY EMAIL ──
document.querySelectorAll('[data-copy]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    navigator.clipboard.writeText(el.dataset.copy).then(() => {
      const orig=el.textContent; el.textContent='✓ Copied!';
      setTimeout(()=>{el.textContent=orig;},2000);
    });
  });
});

// ── KEYBOARD ESC ──
document.addEventListener('keydown', e => { if(e.key==='Escape')closeMobileMenu(); });

// ── LAZY IMAGES ──
if('IntersectionObserver' in window) {
  const imgIO = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){const i=e.target;if(i.dataset.src){i.src=i.dataset.src;i.removeAttribute('data-src');}imgIO.unobserve(i);} });
  }, { rootMargin:'200px' });
  document.querySelectorAll('img[data-src]').forEach(img => imgIO.observe(img));
}

console.log('%c Built with ❤️ + Claude ', 'background:#00c4a0;color:#0a0a09;padding:6px 12px;border-radius:4px;font-weight:bold;font-size:13px;');
