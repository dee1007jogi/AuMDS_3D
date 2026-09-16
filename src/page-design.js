(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items=[...document.querySelectorAll('.reveal')];
  const show=el=>el.classList.add('visible');
  if(reduce || !('IntersectionObserver' in window)){items.forEach(show)}else{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){show(e.target);io.unobserve(e.target)}}),{threshold:.08});items.forEach(x=>io.observe(x))}

  const form=document.querySelector('#contactForm');
  if(form){
    const fields=[...form.querySelectorAll('input,textarea')];
    const error=(field,msg)=>{const wrap=field.closest('.field');wrap.classList.add('has-error');field.classList.add('invalid');wrap.querySelector('.field-error').textContent=msg};
    const clear=field=>{const wrap=field.closest('.field');wrap.classList.remove('has-error');field.classList.remove('invalid')};
    fields.forEach(f=>f.addEventListener('input',()=>clear(f)));
    form.addEventListener('submit',e=>{
      e.preventDefault();let ok=true;
      const name=form.querySelector('#name'),email=form.querySelector('#email'),message=form.querySelector('#message'),company=form.querySelector('#company');
      if(name.value.trim().length<2){error(name,'Please enter your name.');ok=false}
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())){error(email,'Please enter a valid email address.');ok=false}
      if(message.value.trim().length<10){error(message,'Please add a little more detail.');ok=false}
      const status=form.querySelector('.status');
      if(!ok){status.textContent='Please check the highlighted fields.';return}
      const body=`Name: ${name.value.trim()}\nEmail: ${email.value.trim()}\nCompany: ${(company?.value||'').trim()}\n\nRequirement:\n${message.value.trim()}`;
      status.textContent='Opening your email application…';
      location.href=`mailto:contact@aumdsorg.com?subject=${encodeURIComponent('AuMDS Enquiry — '+name.value.trim())}&body=${encodeURIComponent(body)}`;
    });
  }

  const year=document.querySelector('[data-year]'); if(year) year.textContent=new Date().getFullYear();
})();
