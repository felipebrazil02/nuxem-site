import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const script = readFileSync(new URL('../src/interface.js', import.meta.url), 'utf8');

function fixture({ search = '', hostname = 'nuxemoil.com.br', pathname = '/contato/', initial = '', missingSelect = false, valid = true } = {}) {
  const options = [
    { value: '', dataset: {} },
    { value: 'Óleo BPF', dataset: { productSlug: 'oleo-bpf' } },
    { value: 'Óleo de Xisto (OTE)', dataset: { productSlug: 'oleo-de-xisto' } },
    { value: 'Óleo APF', dataset: { productSlug: 'oleo-apf' } },
  ];
  const events = [], submits = {}, clicks = {};
  const select = { options, value: initial, get selectedOptions() { return options.filter(o => o.value === this.value); },
    dispatchEvent() { throw new Error('Preselection must not impersonate interaction'); } };
  const form = { checkValidity: () => valid, addEventListener: (name, handler) => { submits[name] = handler; },
    elements: { namedItem(name) { assert.equal(name, 'produto', 'No personal field may be read by Analytics'); return select; } } };
  const document = { querySelector(selector) {
    if (selector === 'select[name="produto"]') return missingSelect ? null : select;
    if (selector === 'form[onsubmit="enviarZap(event)"]') return form;
    return null;
  }, addEventListener: (name, handler) => { clicks[name] = handler; } };
  const window = { gtag: (...args) => events.push(JSON.parse(JSON.stringify(args))), open() { throw new Error('Preselection must not open WhatsApp'); } };
  runInNewContext(script, { document, window, location: { hostname, pathname, origin: `https://${hostname}`, search }, URL, URLSearchParams,
    localStorage: { getItem() { throw new Error('Preselection must not read or update consent'); }, setItem() { throw new Error('Must preserve consent'); } } });
  return { select, events, submit: () => submits.submit?.(), click(href) { clicks.click?.({ target: { closest: () => ({ href, closest: () => null }) } }); } };
}

for (const [slug, label] of [['oleo-bpf', 'Óleo BPF'], ['oleo-de-xisto', 'Óleo de Xisto (OTE)']]) {
  test(`preselects ${slug} without collecting an interaction or submitting the form`, () => {
    const f = fixture({ search: `?produto=${slug}` });
    assert.equal(f.select.value, label);
    assert.deepEqual(f.events, []);
    f.submit();
    assert.equal(f.events.length, 1);
    assert.deepEqual(f.events[0], ['event', 'quote_whatsapp_start', {
      send_to: 'G-H0XF8SXJ4B', contact_method: 'whatsapp', contact_placement: 'formulario', product_slug: slug,
      page_location: 'https://nuxemoil.com.br/contato/',
    }]);
  });
}

test('visitor can change the suggested product and Analytics records the final selection', () => {
  const f = fixture({ search: '?produto=oleo-bpf' });
  f.select.value = 'Óleo de Xisto (OTE)';
  f.submit();
  assert.equal(f.events[0][2].product_slug, 'oleo-de-xisto');
});

test('a browser-restored or existing choice is never overwritten', () => {
  const f = fixture({ search: '?produto=oleo-bpf', initial: 'Óleo APF' });
  assert.equal(f.select.value, 'Óleo APF');
});

test('generic, unsupported, ambiguous and tampered URLs keep the empty choice', () => {
  for (const search of ['', '?produto=', '?produto=oleo-apf', '?produto=OLEO-BPF', '?produto=Pessoa%205511999999999',
    '?produto=%3Cscript%3E', '?produto=oleo-bpf&produto=oleo-de-xisto', '?produto=oleo-bpf&produto=oleo-bpf']) {
    const f = fixture({ search });
    assert.equal(f.select.value, '');
    assert.deepEqual(f.events, []);
  }
});

test('query strings and unrelated personal parameters never enter contact events', () => {
  const f = fixture({ search: '?produto=oleo-bpf&nome=Pessoa&telefone=5511999999999' });
  f.submit();
  assert.equal(f.events[0][2].product_slug, 'oleo-bpf');
  assert.equal(f.events[0][2].page_location, 'https://nuxemoil.com.br/contato/');
  assert.doesNotMatch(JSON.stringify(f.events), /Pessoa|telefone|5511999999999|\?/);
});

test('form convenience works in previews while production analytics stays blocked there', () => {
  for (const hostname of ['localhost', '127.0.0.1', 'deploy-preview-47--mellifluous-dasik-1c2b7c.netlify.app']) {
    const f = fixture({ hostname, search: '?produto=oleo-de-xisto' });
    assert.equal(f.select.value, 'Óleo de Xisto (OTE)');
    f.submit();
    assert.deepEqual(f.events, []);
  }
});

test('only contact pages preselect, and a missing field or invalid form is safe', () => {
  assert.equal(fixture({ pathname: '/produtos/oleo-bpf/', search: '?produto=oleo-bpf' }).select.value, '');
  assert.doesNotThrow(() => fixture({ missingSelect: true, search: '?produto=oleo-bpf' }));
  const f = fixture({ valid: false, search: '?produto=oleo-bpf' });
  f.submit();
  assert.deepEqual(f.events, []);
});

test('product-to-contact click retains its existing event and product context', () => {
  const f = fixture({ pathname: '/produtos/oleo-bpf/' });
  f.click('https://nuxemoil.com.br/contato/?produto=oleo-bpf');
  assert.equal(f.events.length, 1);
  assert.equal(f.events[0][1], 'quote_request_click');
  assert.equal(f.events[0][2].product_slug, 'oleo-bpf');
  assert.equal(f.events[0][2].page_location, 'https://nuxemoil.com.br/produtos/oleo-bpf/');
});
