
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $$ = (s,r=document)=>[...r.querySelectorAll(s)];

  function prepareWords() {
    $$('h1, h2').forEach(el=>{
      if(el.closest('.nav,.footer,.hero-orbit')) return;
      if(el.dataset.scWords) return;
      const html=el.innerHTML;
      // Keep existing inline emphasis while animating text as words.
      const temp=document.createElement('span');
      temp.innerHTML=html;
      const walker=document.createTreeWalker(temp,NodeFilter.SHOW_TEXT);
      const nodes=[];
      while(walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node=>{
        const frag=document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(part=>{
          if(!part.trim()){frag.appendChild(document.createTextNode(part));return}
          const s=document.createElement('span'); s.className='sc-word'; s.textContent=part;
          s.style.setProperty('--i', String(frag.childNodes.length));
          frag.appendChild(s);
        });
        node.parentNode.replaceChild(frag,node);
      });
      el.innerHTML=temp.innerHTML;
      el.dataset.scWords='1';
    });
  }

  function markSections(){
    $$('.hero,.statement,.about,.services,.journey,.highlights,.contact').forEach(s=>s.classList.add('sc-depth-section'));
    $$('.about-visual,.hero-orbit,.career-orb,.highlight-grid').forEach(e=>e.classList.add('sc-parallax','sc-depth-item'));
    $$('.about-visual,.hero-orbit,.career-orb').forEach(e=>e.classList.add('sc-portal'));
    $$('.service-grid').forEach(g=>g.classList.add('sc-stack'));
    $$('.journey').forEach(j=>j.classList.add('sc-progress-line'));
    $$('.step').forEach(s=>s.classList.add('sc-fold'));
    $$('.statement p,.about-copy,.contact-left p,.contact form,.service-detail,.manifesto blockquote').forEach(e=>e.classList.add('sc-clip-reveal'));
  }

  function observer(){
    if(!('IntersectionObserver' in window)){ $$('.sc-clip-reveal,.sc-word').forEach(e=>e.classList.add('sc-active')); document.body.classList.add('sc-words-ready'); return; }
    const io=new IntersectionObserver(entries=>{
      entries.forEach(x=>{
        if(x.isIntersecting){
          x.target.classList.add('sc-active');
          if(x.target.matches('h1,h2')) x.target.classList.add('sc-words-ready');
          io.unobserve(x.target);
        }
      })
    },{threshold:0.01,rootMargin:'0px'});
    $$('.sc-clip-reveal,.sc-portal,h1,h2').forEach(e=>io.observe(e));
  }

  function scrollScene(){
    if(reduce)return;
    let ticking=false;
    const update=()=>{
      ticking=false;
      const vh=innerHeight;
      $$('.sc-clip-reveal,.sc-portal,h1,h2').forEach(el=>{
        const r=el.getBoundingClientRect();
        if(r.top<vh*.92&&r.bottom>vh*.08){
          el.classList.add('sc-active');
          if(el.matches('h1,h2'))el.classList.add('sc-words-ready');
        }
      });
      $$('.sc-parallax').forEach(el=>{
        const r=el.getBoundingClientRect(), center=r.top+r.height/2, d=(center-vh/2)/vh;
        const amount=el.closest('.hero')?d*-18:d*-28;
        el.style.transform=`translate3d(0,${amount.toFixed(1)}px,0) rotateX(${(d*2.2).toFixed(2)}deg)`;
      });
      $$('.sc-stack').forEach(grid=>{
        const r=grid.getBoundingClientRect();
        const p=Math.max(0,Math.min(1,(vh-r.top)/(vh+r.height)));
        $$('.service',grid).forEach((card,i)=>{
          const depth=(i/(Math.max(1,grid.children.length-1))-.5);
          const y=(p-.5)*-28*(1+i*.08);
          const rot=depth*3.5*(1-p);
          const z=-i*8;
          card.style.transform=`perspective(1000px) translate3d(0,${y.toFixed(1)}px,${z}px) rotateX(${rot.toFixed(2)}deg)`;
          card.style.opacity=String(Math.max(.72,1-Math.abs(depth)*.12));
        });
      });
      $$('.journey').forEach(j=>{
        const r=j.getBoundingClientRect();
        const p=Math.max(0,Math.min(1,(vh*.8-r.top)/(Math.max(1,r.height-vh*.2))));
        j.style.setProperty('--journey-progress',(p*100).toFixed(1));
        $$('.step',j).forEach((s,i)=>{
          const sr=s.getBoundingClientRect(), q=Math.max(0,Math.min(1,(vh-sr.top)/(vh*.65)));
          s.style.transform=`perspective(900px) rotateX(${(1-q)*12}deg) translateZ(${q*18}px)`;
          s.style.opacity=.58+q*.42;
        });
      });
      requestAnimationFrame(()=>{});
    };
    addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});
    update();
  }

  function addReferenceLabels(){
    const services=document.querySelector('.services');
    if(services && !services.querySelector('.sc-horizontal-hint')){
      const hint=document.createElement('div');
      hint.className='sc-horizontal-hint';
      hint.textContent='Scroll to move through the solution layers';
      hint.style.cssText='margin:0 0 24px 0';
      services.prepend(hint);
    }
  }

  document.addEventListener('DOMContentLoaded',()=>{
    markSections();
    if(!reduce) prepareWords();
    observer();
    scrollScene();
    addReferenceLabels();
  });
})();
