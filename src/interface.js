const menu=document.querySelector('.menu-toggle');
menu?.addEventListener('click',()=>{const open=document.querySelector('#menu-principal').classList.toggle('aberto');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){document.querySelector('#menu-principal')?.classList.remove('aberto');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Abrir menu');}});
const input=document.querySelector('#buscar-artigos');
if(input) input.closest('.blog-search').hidden=false;
input?.addEventListener('input',()=>{const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();const query=norm(input.value.trim());let count=0;document.querySelectorAll('.grupo-blog').forEach(group=>{let visible=0;group.querySelectorAll('.card').forEach(card=>{card.hidden=!norm(card.textContent).includes(query);if(!card.hidden){count++;visible++;}});group.hidden=visible===0;});document.querySelector('#busca-status').textContent=query?`${count} artigo${count===1?'':'s'} encontrado${count===1?'':'s'}.`:'';});

// Consent Mode v2: the Google tag defaults to denied in <head> and is updated here.
(() => {
  const storageKey = 'nuxem_consent_v1';
  const banner = document.querySelector('.consent-banner');
  if (!banner) return;
  let choice = null;
  try { choice = localStorage.getItem(storageKey); } catch (error) {}
  const show = () => {
    banner.hidden = false;
    document.body.classList.add('has-consent-banner');
  };
  const hide = () => {
    banner.hidden = true;
    document.body.classList.remove('has-consent-banner');
  };
  if (choice !== 'granted' && choice !== 'denied') show();
  document.querySelector('[data-open-consent]')?.addEventListener('click', () => {
    show();
    banner.querySelector('button')?.focus();
  });
  banner.addEventListener('click', event => {
    const button = event.target.closest?.('[data-consent]');
    if (!button) return;
    const granted = button.dataset.consent === 'granted';
    const value = granted ? 'granted' : 'denied';
    try { localStorage.setItem(storageKey, value); } catch (error) {}
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: value,
        ad_user_data: value,
        ad_personalization: value,
        analytics_storage: value,
      });
    }
    hide();
  });
})();

// Contact intent only: opening WhatsApp does not confirm a sent message or sale.
// Never collect form values, link text, telephone numbers or URL query strings.
(() => {
  if (!['nuxemoil.com.br', 'www.nuxemoil.com.br'].includes(location.hostname)) return;
  const path = location.pathname;
  const product = /^\/produtos\/([^/]+)\/?$/.exec(path)?.[1] || 'nao_especificado';
  function track(name, method, placement) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, {
      send_to: 'G-H0XF8SXJ4B',
      contact_method: method,
      contact_placement: placement,
      product_slug: product,
      page_location: location.origin + path,
    });
  }
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    let url;
    try { url = new URL(link.href, location.origin); } catch { return; }
    const placement = link.closest('header') ? 'cabecalho'
      : link.closest('footer') ? 'rodape' : 'conteudo';
    if (['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(url.hostname)) {
      track('whatsapp_click', 'whatsapp', placement);
    } else if (url.protocol === 'tel:') {
      track('phone_click', 'telefone', placement);
    } else if (url.protocol === 'mailto:') {
      track('email_click', 'email', placement);
    } else if (url.origin === location.origin && /^\/contato\/?$/.test(url.pathname)) {
      track('quote_request_click', 'pagina_contato', placement);
    }
  });
  // This existing form prepares a WhatsApp message; it has no server submission.
  const form = document.querySelector('form[onsubmit="enviarZap(event)"]');
  if (form) {
    form.addEventListener('submit', () => {
      if (form.checkValidity()) track('quote_whatsapp_start', 'whatsapp', 'formulario');
    });
  }
})();
