'use strict';
document.body.classList.add('js');
const menu=document.querySelector('#menu'),links=document.querySelector('#links');
menu.hidden=false;
function closeMenu(){links.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='Menu';}
menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Close menu':'Menu';});
links.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&links.classList.contains('open')){closeMenu();menu.focus();}});
const viewer=document.querySelector('#viewer'),photo=document.querySelector('#viewer-image'),caption=document.querySelector('#viewer-caption');
if(typeof viewer.showModal==='function')document.querySelectorAll('.zoom').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();photo.src=a.href;photo.alt=a.querySelector('img')?.alt||a.dataset.caption;caption.textContent=a.dataset.caption;viewer.showModal();}));
document.querySelector('#close-viewer').addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',e=>{if(e.target===viewer){const r=viewer.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)viewer.close();}});
document.querySelector('#year').textContent=new Date().getFullYear();

// Animate on entry without hiding content before JavaScript runs.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){
   entry.target.classList.add('fade-enter');
   observer.unobserve(entry.target);
  }
 }),{threshold:0,rootMargin:'0px 0px -35px 0px'});
 document.querySelectorAll('.hero>div,.section-head,.featured,.gallery figure,.project,.all-work,.about>div,.experience article,.contact').forEach(el=>observer.observe(el));
}

window.matchMedia('(max-width: 720px)').addEventListener('change',closeMenu);
