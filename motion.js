(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r=document) => r.querySelectorAll(s);
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('motion-enabled');
    requestAnimationFrame(() => document.querySelector('.nav')?.classList.add('nav-ready'));

    // Reveal all major content as it enters the viewport.
    const selectors = 'section, .service, .highlight, .step, .glass-card, .service-detail, .contact form, footer, .journey-head, .mini-grid, .roles>div';
    $(selectors).forEach((el, i) => {
      if (el.closest('.hero')) return;
      el.classList.add('motion-reveal');
      el.dataset.delay = String(i % 5);
    });
    if (!reduce && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      }), {threshold:.12, rootMargin:'0px 0px -50px'});
      $('.motion-reveal').forEach(el => io.observe(el));
    } else $('.motion-reveal').forEach(el => el.classList.add('is-visible'));

    // Scroll progress + nav state + subtle cursor glow.
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      document.documentElement.style.setProperty('--scroll', max > 0 ? (scrollY / max).toFixed(4) : 0);
      document.querySelector('.nav')?.classList.toggle('scrolled', scrollY > 30);
    };
    addEventListener('scroll', update, {passive:true}); update();

    if (!reduce) {
      addEventListener('pointermove', e => {
        document.documentElement.style.setProperty('--cursor-x', e.clientX+'px');
        document.documentElement.style.setProperty('--cursor-y', e.clientY+'px');
      }, {passive:true});
      // Lightweight 3D tilt for cards; disabled on touch.
      if (matchMedia('(pointer:fine)').matches) {
        $('.service, .highlight, .glass-card').forEach(card => {
          card.addEventListener('pointermove', e => {
            const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
            card.style.transform=`perspective(900px) rotateX(${(-y*5).toFixed(2)}deg) rotateY(${(x*6).toFixed(2)}deg) translateY(-8px)`;
          });
          card.addEventListener('pointerleave', () => card.style.transform='');
        });
      }
      // Magnetic interaction on important CTAs.
      if (matchMedia('(pointer:fine)').matches) $('.button.primary,.nav-cta').forEach(btn=>{
        btn.addEventListener('pointermove',e=>{const r=btn.getBoundingClientRect();btn.style.transform=`translate(${((e.clientX-r.left)/r.width-.5)*8}px,${((e.clientY-r.top)/r.height-.5)*6}px)`});
        btn.addEventListener('pointerleave',()=>btn.style.transform='');
      });
    }

    // Animated number/count-up support for any numeric metric already present in the HTML.
    const nums = $('[data-count]');
    nums.forEach(el => { const target=parseFloat(el.dataset.count); if(!isFinite(target)) return; el.textContent='0'; let started=false;
      const run=()=>{if(started)return;started=true; const t0=performance.now(), dur=1100; const tick=t=>{const p=Math.min(1,(t-t0)/dur),v=target*(1-Math.pow(1-p,3));el.textContent=Number.isInteger(target)?Math.round(v):v.toFixed(1); if(p<1)requestAnimationFrame(tick)}; requestAnimationFrame(tick)};
      if ('IntersectionObserver' in window) new IntersectionObserver(es=>es.forEach(x=>x.isIntersecting&&run()),{threshold:.5}).observe(el); else run();
    });

    // Smooth page transition for internal navigation.
    document.addEventListener('click', e => {
      const a=e.target.closest('a[href]'); if(!a || reduce) return;
      const href=a.getAttribute('href'); if(!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) return;
      if(a.target==='_blank') return; e.preventDefault(); document.body.classList.add('page-leave'); setTimeout(()=>location.href=href,280);
    });

    // Service cards get keyboard-friendly hover-like state.
    $('.service').forEach(s=>{if(!s.hasAttribute('tabindex'))s.setAttribute('tabindex','0');s.addEventListener('focus',()=>s.classList.add('active'));s.addEventListener('blur',()=>s.classList.remove('active'));});

    // Tiny custom cursor for desktop.
    if(!reduce && matchMedia('(pointer:fine)').matches){const c=document.createElement('div');c.className='motion-cursor';document.body.appendChild(c);let x=innerWidth/2,y=innerHeight/2,tx=x,ty=y;addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY},{passive:true});const loop=()=>{x+=(tx-x)*.18;y+=(ty-y)*.18;c.style.left=x+'px';c.style.top=y+'px';requestAnimationFrame(loop)};loop();$('a,button,.service,.highlight').forEach(el=>{el.addEventListener('mouseenter',()=>c.classList.add('hover'));el.addEventListener('mouseleave',()=>c.classList.remove('hover'))});}
  });
})();

// Section depth: subtle scroll-linked parallax on decorative visual blocks.
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const els = document.querySelectorAll('.hero-orbit,.career-orb,.rings,.highlight-grid');
  if (!els.length) return;
  let ticking=false;
  const update=()=>{ticking=false; const vh=innerHeight; els.forEach(el=>{const r=el.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;const p=(r.top+ r.height/2-vh/2)/vh;el.style.setProperty('--depth-y',(-p*18).toFixed(1)+'px');});};
  addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true}); update();
})();
