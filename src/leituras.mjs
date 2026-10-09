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
  'guia-oleo-bpf': [qualidade, consumo, preco],
  blog: [qualidade, tipos, preco, consumo, comparacao, caldeiras],
};
