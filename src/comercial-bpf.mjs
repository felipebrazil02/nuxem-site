// Condições de fornecimento confirmadas pelo responsável da Nuxem em 13/10/2026.
export function comercialBpf(empresa) {
  const mensagem = 'Olá! Gostaria de cotar óleo BPF com a Nuxem.\nCidade/UF de entrega: \nVolume desejado (a partir de 5.000 L): \nConsumo mensal estimado: \nEquipamento e combustível atual: \nData desejada para entrega: ';
  const whatsapp = `https://wa.me/${empresa.whatsappPrincipal}?text=${encodeURIComponent(mensagem)}`;
  return {
    whatsapp,
    resumo: 'Consulte preço e fornecimento de óleo BPF para caldeiras, fornos e usinas de asfalto em SP, MG e PR. Pedidos a partir de 5.000 litros por entrega, com planejamento mensal conforme o consumo da sua operação.',
    abertura: `<div class="botoes"><a class="btn btn-laranja" href="${whatsapp}">Iniciar cotação de BPF no WhatsApp</a></div>
      <p>Informe cidade/UF, volume por entrega e consumo mensal para consultar preço, frete e disponibilidade.</p>
      <p class="resumo">Até 200 km de Salto/SP: entrega no mesmo dia ou em até 1 dia útil, mediante confirmação da programação. Consulte as condições abaixo.</p>`,
    painelTitulo: 'Cote o BPF para sua operação',
    painelTexto: 'Pedidos a partir de 5.000 L por entrega. Informe cidade e consumo mensal para consultar preço, frete e programação.',
    painelBotao: 'Preparar cotação de BPF ↗',
    fornecimento: `<h2>Óleo BPF com entrega programada para sua indústria</h2>
      <p>A Nuxem fornece óleo BPF a partir de <strong>5.000 litros por entrega</strong>, com frota própria e atendimento 24 horas em <a href="/cobertura/">São Paulo, Minas Gerais e Paraná</a>. A proposta considera o produto adequado ao seu processo, o volume e o local de recebimento.</p>
      <h3>Prazo de entrega e região atendida</h3>
      <p>Em um raio de até <strong>200 km de Salto/SP</strong>, a entrega pode ocorrer <strong>no mesmo dia ou em até 1 dia útil</strong>, mediante confirmação da programação. Para outras localidades de SP, MG e PR, consulte o prazo na cotação.</p>
      <h3>Planejamento mensal do abastecimento</h3>
      <p>Trabalhamos sob demanda. Antes de programar o fornecimento, precisamos conhecer a operação, o consumo previsto e a frequência das entregas. Esse levantamento permite organizar o planejamento mensal e confirmar a capacidade de atendimento. O prazo regional não representa disponibilidade imediata para qualquer pedido.</p>
      <p>Informe o consumo mensal, o volume por entrega e as datas previstas. Se sua produção variar, comunique a nova necessidade para revisar a programação. Veja <a href="/blog/como-programar-o-abastecimento-de-oleo-bpf-para-evitar-paradas/">como planejar o abastecimento de óleo BPF</a>.</p>
      <h2>Fornecimento para caldeiras, fornos e usinas de asfalto</h2>
      <ul><li><a href="/solucoes/caldeiras/">Caldeiras industriais</a>: informe a demanda de vapor, o combustível atual e o consumo estimado.</li>
      <li><a href="/solucoes/usinas-de-asfalto/">Usinas de asfalto</a>: informe o consumo por período e a previsão de produção para planejar as entregas. Consulte o roteiro de <a href="/blog/oleo-bpf-para-usinas-de-asfalto/">consumo, queimador e abastecimento de BPF na usina</a>.</li>
      <li>Fornos e <a href="/solucoes/fundicoes/">fundições</a>: informe o processo, o regime de operação e a especificação de combustível exigida pelo equipamento.</li></ul>
      <p>A escolha do óleo depende da compatibilidade com o equipamento e dos requisitos da instalação. Consulte abaixo as referências de classe e os documentos necessários para a compra.</p>`,
    cotacao: `<h2 id="cotacao-bpf">Solicite preço e programação de entrega de óleo BPF</h2>
      <ol><li><strong>Informe sua necessidade.</strong> Envie cidade/UF, volume a partir de 5.000 L, consumo mensal estimado, equipamento, combustível atual e data desejada.</li>
      <li><strong>Confira a proposta.</strong> Confirme a especificação do produto, a unidade de venda, o frete, os tributos, as condições de pagamento e a programação de entrega.</li>
      <li><strong>Organize o recebimento.</strong> Alinhe o horário de descarga, as condições de acesso e o abastecimento recorrente conforme o planejamento da operação.</li></ol>
      <p><a class="btn btn-laranja" href="${whatsapp}">Preparar pedido de cotação no WhatsApp</a></p>
      <h2>Preço do óleo BPF: compare o custo entregue</h2>
      <p>O preço é informado por cotação, conforme o produto, o volume e o destino. Para comparar fornecedores, registre os itens abaixo na mesma base:</p>
      <ul><li><strong>Unidade:</strong> verifique se a proposta está em litros, quilos ou toneladas. A conversão entre massa e volume depende da massa específica e das condições informadas.</li>
      <li><strong>Custo entregue:</strong> confira frete, tributos e condições de pagamento.</li>
      <li><strong>Especificação:</strong> compare classe, viscosidade, enxofre e poder calorífico com a documentação do produto.</li>
      <li><strong>Operação:</strong> avalie o rendimento e eventuais necessidades de adaptação com o responsável técnico.</li></ul>
      <p>Veja o passo a passo para <a href="/blog/preco-oleo-bpf-posto-fabrica-comparar-propostas/">comparar o preço do BPF com frete</a>.</p>`,
    perguntas: `<h3>Qual é o pedido mínimo de óleo BPF?</h3><p>O fornecimento começa em 5.000 litros por entrega. Informe sua cidade e o consumo previsto para consultar a programação.</p>
      <h3>Vocês entregam óleo BPF no mesmo dia?</h3><p>Em um raio de até 200 km de Salto/SP, a entrega pode ser feita no mesmo dia ou em até 1 dia útil, mediante confirmação da programação. Como o fornecimento é sob demanda, precisamos conhecer a operação e o consumo do cliente para organizar o atendimento.</p>
      <h3>Como funciona o fornecimento recorrente?</h3><p>A programação parte do consumo mensal estimado, do volume por entrega e da frequência necessária. Essas informações orientam o planejamento mensal; confirme as datas com a equipe e avise quando houver mudanças de demanda.</p>`,
  };
}
