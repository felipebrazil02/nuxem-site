// Migração Wix: destinos revisados por assunto a partir do Search Console.
// URLs sem conteúdo equivalente devem continuar 404, nunca ir ao índice do blog.
const grupos = [
  ['/guia-oleo-bpf/', [
    'óleo-combustível-bpf-especificações-e-aplicações-industriais',
    'como-funciona-óleo-bpf-na-indústria', 'guia-do-óleo-bpf-para-uso-industrial',
    'tipos-de-óleo-combustível-industrial', 'óleo-pesado-para-geração-térmica-industrial',
  ]],
  ['/guia-oleo-bpf/faq/', ['óleo-bpf-é-inflamável-entenda-o-risco', 'óleo-bpf-ponto-de-fulgor-e-operação-segura', 'segurança-no-uso-de-óleo-combustível-industrial']],
  ['/produtos/oleo-de-xisto/', ['óleo-de-xisto-propriedades-e-aplicações-industriais']],
  ['/produtos/oleo-a1/', ['óleo-combustível-a1-especificações-técnicas-e-aplicações', 'óleo-combustível-a1-compatibilidade-com-equipamentos']],
  ['/produtos/oleo-b1/', ['óleo-combustível-b1-especificações-e-aplicações-industriais', 'óleo-b1-otimização-de-queima-em-caldeiras']],
  ['/produtos/oleos-alternativos/', ['óleo-ocbv-para-caldeira-quando-faz-sentido', 'review-óleo-ocbv-industrial-o-que-avaliar']],
  ['/blog/comparacao-tecnica-oleo-de-xisto-bte-bpf-e-oleos-alternativos/', ['óleo-de-xisto-análise-comparativa', 'óleo-bte-vs-ocbv-qual-faz-sentido']],
  ['/blog/oleo-de-xisto-ote-para-caldeiras-industriais-vapor-queima-e-custo/', ['óleo-de-xisto-benefícios-em-caldeiras']],
  ['/blog/como-especificar-o-oleo-combustivel-certo-para-seu-queimador/', [
    'review-de-queimadores-para-óleo-pesado', 'como-especificar-óleo-para-caldeira',
    'sinais-de-combustível-inadequado-no-processo', 'guia-de-especificação-do-óleo-industrial',
    'como-escolher-óleo-combustível-industrial', 'qual-óleo-usar-em-caldeira-industrial',
    'óleo-para-queima-seleção-e-otimização', 'óleo-industrial-como-escolher-sem-erro',
    'óleo-combustível-para-queimadores-otimização',
  ]],
  ['/blog/como-programar-o-abastecimento-de-oleo-bpf-para-evitar-paradas/', [
    'melhores-práticas-para-abastecimento-industrial-contínuo', 'como-evitar-falhas-no-abastecimento-térmico',
    'quanto-estoque-mínimo-manter-na-operação', 'como-calcular-autonomia-de-combustível',
    'como-reduzir-paradas-por-falta-de-combustível', 'continuidade-operacional-na-indústria',
    'digitalização-do-abastecimento-industrial',
  ]],
  ['/blog/logistica-de-abastecimento-de-oleo-bpf-entre-sp-mg-e-pr/', [
    'logística-de-combustível-industrial-na-prática', 'transporte-de-óleo-combustível-industrial',
    'distribuição-de-óleo-combustível-industrial', 'rastreabilidade-no-abastecimento-industrial',
  ]],
  ['/blog/como-preparar-uma-solicitacao-de-cotacao-de-oleo-combustivel-industrial/', [
    'avaliação-técnica-de-fornecedor-de-combustível', 'fornecedor-de-óleo-combustível-industrial',
    '7-erros-críticos-na-compra-de-combustível', '7-erros-na-compra-de-óleo-bpf',
    'o-que-avaliar-em-fornecedor-energético',
  ]],
  ['/blog/compatibilidade-entre-lotes-de-oleo-bpf-como-evitar-borra-na-mistura/', [
    'como-padronizar-combustível-para-processo-industrial', 'guia-de-recebimento-técnico-de-combustível',
    'óleo-bpf-testes-de-qualidade-e-conformidade',
  ]],
  ['/blog/manutencao-preventiva-em-sistemas-de-armazenamento-de-oleo-bpf/', [
    'manutenção-preventiva-de-linha-térmica', 'óleo-bpf-manutenção-de-equipamentos',
    'armazenamento-de-óleo-combustível-industrial',
  ]],
  ['/blog/como-calcular-consumo-de-oleo-combustivel-em-caldeiras/', ['consumo-de-óleo-combustível-em-caldeira', 'óleo-para-caldeira-eficiência-térmica']],
  ['/blog/diferencas-entre-oleo-bpf-a1-e-a2/', ['óleo-combustível-a2-para-caldeiras-industriais', 'óleo-bpf-a2-eficiência-em-caldeiras']],
  ['/blog/impacto-da-viscosidade-do-oleo-bpf-na-eficiencia-da-queima/', ['como-validar-a-viscosidade-do-combustível']],
  ['/blog/oleo-de-xisto-para-fornos-e-secadores-industriais/', ['óleo-para-secador-rotativo-como-escolher', 'óleo-combustível-para-secagem-industrial', 'óleo-combustível-em-fornos-industriais', 'guia-para-abastecimento-de-forno-industrial']],
  ['/blog/reducao-de-custos-com-substituicao-de-oleo-combustivel/', ['como-reduzir-custo-térmico-industrial', 'quando-trocar-o-tipo-de-combustível-industrial', 'óleo-bpf-vs-gás-qual-faz-mais-sentido', 'exemplo-de-transição-sem-parada-produtiva']],
  ['/blog/normas-anp-para-oleo-combustivel-industrial/', ['óleo-bpf-impacto-ambiental-e-conformidade', 'óleo-bpf-redução-de-emissões-e-sustentabilidade']],
  ['/solucoes/caldeiras/', ['óleo-combustível-para-caldeira-industrial', 'melhores-combustiveis-para-caldeiras-industriais', 'principais-causas-de-instabilidade-termica']],
  ['/solucoes/usinas-de-asfalto/', ['óleo-combustível-para-usina-de-asfalto', 'óleo-combustível-em-usinas-de-asfalto']],
];

export const redirecionamentosLegados = new Map([
  ['/oleo-bpf/', '/produtos/oleo-bpf/'],
]);
for (const [destino, slugs] of grupos) {
  for (const slug of slugs) {
    const semAcentos = slug.normalize('NFD').replace(/\p{M}/gu, '');
    for (const prefixo of ['post', 'blog']) {
      for (const variante of new Set([slug, semAcentos])) {
        const origem = `/${prefixo}/${variante}/`;
        if (origem !== destino) redirecionamentosLegados.set(origem, destino);
      }
    }
  }
}

export function destinoLegado(url) {
  const caminho = decodeURI(url).replace(/\/$/, '') + '/';
  return redirecionamentosLegados.get(caminho) || url;
}
