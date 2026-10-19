import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const script = readFileSync(new URL('../src/interface.js', import.meta.url), 'utf8');

function fixture({ slug, valid = true, hostname = 'nuxemoil.com.br', pathname = '/contato/' } = {}) {
  const events = [];
  const listeners = {};
  const documentListeners = {};
  const form = {
    checkValidity: () => valid,
    addEventListener: (name, handler) => { listeners[name] = handler; },
    elements: { namedItem(name) {
      // A privacy regression that reads any personal field must fail this test.
      assert.equal(name, 'produto');
      return { selectedOptions: slug === undefined ? [] : [{ dataset: { productSlug: slug } }],
        get value() { throw new Error('Raw form values must not reach analytics'); } };
    } },
  };
  const document = {
    querySelector: selector => selector === 'form[onsubmit="enviarZap(event)"]' ? form : null,
    addEventListener: (name, handler) => { documentListeners[name] = handler; },
  };
  runInNewContext(script, { document, location: { hostname, pathname, origin: `https://${hostname}`,
    search: '?nome=Pessoa&telefone=5511999999999', hash: '#mensagem-privada' },
    window: { gtag: (...args) => events.push(JSON.parse(JSON.stringify(args))) }, URL });
  return { events, submit: () => listeners.submit?.(), click(href) {
    documentListeners.click?.({ target: { closest: () => ({ href, closest: () => null }) } });
  } };
}

test('valid form identifies BPF and xisto using approved codes only', () => {
  for (const slug of ['oleo-bpf', 'oleo-de-xisto']) {
    const f = fixture({ slug });
    f.submit();
    assert.deepEqual(f.events, [['event', 'quote_whatsapp_start', {
      send_to: 'G-H0XF8SXJ4B', contact_method: 'whatsapp', contact_placement: 'formulario',
      product_slug: slug, page_location: 'https://nuxemoil.com.br/contato/',
    }]]);
  }
});

test('unknown or tampered selections never leak arbitrary strings', () => {
  for (const slug of [undefined, '', 'Pessoa telefone 5511999999999', '__proto__', 'oleo-bpf?nome=Pessoa']) {
    const f = fixture({ slug });
    f.submit();
    assert.equal(f.events.length, 1);
    assert.equal(f.events[0][2].product_slug, 'nao_especificado');
    assert.ok(!JSON.stringify(f.events).includes('Pessoa'));
  }
});

test('invalid forms and preview hosts do not generate contact events', () => {
  for (const options of [{ valid: false }, { hostname: 'localhost' }, { hostname: 'preview.netlify.app' }]) {
    const f = fixture({ slug: 'oleo-bpf', ...options });
    f.submit();
    assert.deepEqual(f.events, []);
  }
});

test('existing WhatsApp links retain product context and exclude message and URL queries', () => {
  const f = fixture({ pathname: '/produtos/oleo-de-xisto/' });
  f.click('https://wa.me/5511999999999?text=Pessoa%20mensagem');
  assert.equal(f.events.length, 1);
  assert.equal(f.events[0][1], 'whatsapp_click');
  assert.equal(f.events[0][2].product_slug, 'oleo-de-xisto');
  assert.equal(f.events[0][2].page_location, 'https://nuxemoil.com.br/produtos/oleo-de-xisto/');
  assert.ok(!JSON.stringify(f.events).includes('Pessoa'));
});
