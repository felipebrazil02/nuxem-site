const menu=document.querySelector('.menu-toggle');
menu?.addEventListener('click',()=>{const open=document.querySelector('#menu-principal').classList.toggle('aberto');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){document.querySelector('#menu-principal')?.classList.remove('aberto');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Abrir menu');}});
const input=document.querySelector('#buscar-artigos');
if(input) input.closest('.blog-search').hidden=false;
input?.addEventListener('input',()=>{const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();const query=norm(input.value.trim());let count=0;document.querySelectorAll('.grupo-blog').forEach(group=>{let visible=0;group.querySelectorAll('.card').forEach(card=>{card.hidden=!norm(card.textContent).includes(query);if(!card.hidden){count++;visible++;}});group.hidden=visible===0;});document.querySelector('#busca-status').textContent=query?`${count} artigo${count===1?'':'s'} encontrado${count===1?'':'s'}.`:'';});
