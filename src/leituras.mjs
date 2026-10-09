// Percursos editoriais para as dúvidas de compra e aplicação de cada produto.
const qualidade = ['compatibilidade-entre-lotes-de-oleo-bpf-como-evitar-borra-na-mistura', 'Qualidade do BPF e compatibilidade entre lotes'];
const tipos = ['diferencas-entre-oleo-bpf-a1-e-a2', 'Diferenças entre óleo BPF A1 e A2'];
const preco = ['preco-oleo-bpf-posto-fabrica-comparar-propostas', 'Como comparar o preço do BPF com frete'];
const consumo = ['como-calcular-consumo-de-oleo-combustivel-em-caldeiras', 'Cálculo de consumo de óleo em caldeiras'];
const comparacao = ['oleo-de-xisto-ote-vs-oleo-bpf-diferencas-praticas-para-a-industria', 'Óleo de xisto ou BPF: comparação de custo e consumo'];
const caldeiras = ['oleo-de-xisto-ote-para-caldeiras-industriais-vapor-queima-e-custo', 'Óleo de xisto para caldeiras'];

export const LEITURAS = {
  'produtos/oleo-bpf': [qualidade, tipos, preco],
  'produtos/oleo-de-xisto': [comparacao, caldeiras, consumo],
  'produtos/oleo-apf': [
    ['impacto-da-viscosidade-do-oleo-bpf-na-eficiencia-da-queima', 'Viscosidade e eficiência da queima'],
    ['como-especificar-o-oleo-combustivel-certo-para-seu-queimador', 'Como especificar o combustível para seu queimador'],
    ['comparacao-tecnica-oleo-de-xisto-bte-bpf-e-oleos-alternativos', 'Critérios para comparar combustíveis'],
  ],
  'produtos/oleo-b1': [
    ['normas-anp-para-oleo-combustivel-industrial', 'Especificação ANP e documentação para compra'],
    ['como-especificar-o-oleo-combustivel-certo-para-seu-queimador', 'Compatibilidade com o queimador'],
    qualidade,
  ],
  'produtos/oleo-a1': [tipos, preco,
    ['impacto-da-viscosidade-do-oleo-bpf-na-eficiencia-da-queima', 'Viscosidade e eficiência da queima'],
  ],
  'produtos/oleo-bte': [
    ['normas-anp-para-oleo-combustivel-industrial', 'Requisitos técnicos e ambientais na compra'],
    ['comparacao-tecnica-oleo-de-xisto-bte-bpf-e-oleos-alternativos', 'Comparação entre BTE, BPF, xisto e alternativas'],
    consumo,
  ],
  'produtos/oleos-alternativos': [
    ['comparacao-tecnica-oleo-de-xisto-bte-bpf-e-oleos-alternativos', 'Como comparar as opções de combustível'],
    ['reducao-de-custos-com-substituicao-de-oleo-combustivel', 'Como avaliar custos de substituição'],
    qualidade,
  ],
  'guia-oleo-bpf': [qualidade, consumo, preco],
  blog: [qualidade, tipos, preco, consumo, comparacao, caldeiras],
};

export const CATEGORIAS_BLOG = [
  { slug: 'compra', titulo: 'Escolha e compra de combustível' },
  { slug: 'operacao', titulo: 'Operação, consumo e qualidade' },
  { slug: 'aplicacoes-bpf', titulo: 'Aplicações do óleo BPF' },
  { slug: 'aplicacoes-xisto', titulo: 'Aplicações do óleo de xisto' },
  { slug: 'logistica', titulo: 'Entrega e atendimento regional' },
];
