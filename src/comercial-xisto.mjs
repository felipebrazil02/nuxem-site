export function comercialXisto(empresa) {
  const mensagem = 'Olá! Gostaria de cotar óleo de xisto OTE com a Nuxem.\nCidade/UF de entrega: \nVolume desejado e unidade: \nConsumo mensal estimado: \nEquipamento e combustível atual: \nData desejada para entrega: ';
  const whatsapp = `https://wa.me/${empresa.whatsappPrincipal}?text=${encodeURIComponent(mensagem)}`;
  return {
    whatsapp,
    resumo: 'Fornecimento de óleo de xisto OTE para caldeiras, fornos e usinas de asfalto em SP, MG e PR, para operações com consumo a partir de 200 mil litros por mês. Planejamento mensal obrigatório e atendimento sujeito à disponibilidade.',
    abertura: `<div class="botoes"><a class="btn btn-laranja" href="${whatsapp}">Cotar óleo de xisto pelo WhatsApp</a></div>`,
    fornecimento: `<h2>Óleo de xisto para o processo da sua indústria</h2>
      <p>A Nuxem fornece óleo de xisto OTE em <a href="/cobertura/">São Paulo, Minas Gerais e Paraná</a>. A cotação considera a aplicação, a especificação do combustível, o volume e o destino. Informe se você já utiliza OTE ou está avaliando a substituição do combustível atual.</p>
      <h3>Consumo mínimo e planejamento do fornecimento</h3>
      <p>O fornecimento de óleo de xisto pela Nuxem exige uma demanda mínima de <strong>200.000 litros por mês</strong> e <strong>planejamento mensal</strong>. Esse volume se refere ao consumo mensal da operação; o volume de cada entrega é definido na programação de abastecimento.</p>
      <p>Consulte a disponibilidade antes de programar a compra. A Nuxem trabalha com uma carteira limitada de clientes de OTE para organizar a aquisição do produto e o atendimento às demandas planejadas. A confirmação do fornecimento e dos prazos depende dessa avaliação.</p>
      <h3>Aplicações e informações para a cotação</h3>
      <ul><li><a href="/solucoes/caldeiras/">Caldeiras industriais</a>: informe o modelo do queimador, o consumo atual e a demanda de vapor.</li>
      <li><a href="/blog/oleo-de-xisto-para-usinas-de-asfalto/">Usinas de asfalto</a>: informe a previsão de produção, o combustível utilizado e a frequência de abastecimento.</li>
      <li><a href="/blog/oleo-de-xisto-para-a-industria-ceramica-fornos-secadores-e-abastecimento/">Fornos e secadores industriais</a>: descreva o regime de operação e os requisitos do equipamento.</li></ul>
      <h2>Avalie a troca de BPF por óleo de xisto</h2>
      <p>Para decidir pela troca, compare o produto ofertado com o combustível que sua operação já utiliza. Além do preço, considere o consumo para a mesma produção, o rendimento do processo e eventuais adaptações. A avaliação deve usar as especificações dos produtos e as condições reais da instalação.</p>
      <p>Veja <a href="/blog/oleo-de-xisto-ote-vs-oleo-bpf-diferencas-praticas-para-a-industria/">as diferenças entre óleo de xisto e BPF</a> e <a href="/blog/como-migrar-sua-caldeira-ou-forno-para-oleo-de-xisto-ote/">como planejar a mudança de combustível</a> com o responsável técnico.</p>`,
    cotacao: `<h2 id="cotacao-xisto">Como solicitar sua cotação de óleo de xisto</h2>
      <ol><li><strong>Envie os dados da operação.</strong> Informe cidade/UF, volume e unidade de compra, consumo mensal estimado, combustível atual, equipamento e data desejada.</li>
      <li><strong>Consulte disponibilidade e condições comerciais.</strong> Com base na demanda mínima de 200 mil litros por mês, alinhe o planejamento mensal, solicite a documentação do OTE ofertado e confirme preço, frete, tributos, pagamento e programação de entrega.</li>
      <li><strong>Planeje o recebimento.</strong> Alinhe acesso e descarga. Se houver troca de combustível, combine a transição com o responsável técnico antes do abastecimento.</li></ol>
      <p><a class="btn btn-laranja" href="${whatsapp}">Enviar dados para cotação de OTE</a></p>
      <h2>Preço do óleo de xisto: como comparar propostas</h2>
      <p>O preço é informado por cotação. Compare propostas para a mesma quantidade, destino e especificação, incluindo frete, tributos e condições de pagamento.</p>
      <ul><li><strong>Unidade de compra:</strong> confirme se o valor está em litros, quilos ou toneladas. Para converter massa e volume, utilize a massa específica nas condições informadas.</li>
      <li><strong>Energia disponível:</strong> compare poderes caloríficos na mesma base, sem misturar PCS com PCI.</li>
      <li><strong>Custo da operação:</strong> considere o rendimento e os custos de adaptação, manutenção e aquecimento aplicáveis ao equipamento.</li></ul>
      <p>A escolha não deve se apoiar em uma economia fixa prometida para qualquer instalação. Compare o <a href="/blog/comparacao-tecnica-oleo-de-xisto-bte-bpf-e-oleos-alternativos/">custo por energia útil entre combustíveis</a> com os dados da sua operação.</p>`,
    perguntas: `<h3>Qual é o consumo mínimo para contratar o fornecimento de óleo de xisto?</h3><p>A operação deve ter demanda a partir de 200.000 litros por mês. O fornecimento exige planejamento mensal e consulta de disponibilidade. As quantidades por entrega e os prazos são alinhados na programação.</p>
      <h3>Quais dados preciso enviar para comprar óleo de xisto?</h3><p>Informe cidade de entrega, volume e unidade, consumo mensal, equipamento, combustível atual e data desejada. Esses dados permitem avaliar a disponibilidade e organizar o planejamento mensal para a sua operação.</p>
      <h3>A tabela técnica é um laudo do produto que vou receber?</h3><p>A tabela apresenta referências do catálogo Greca, com a fonte identificada. Antes da compra, solicite a ficha técnica, a ficha de dados de segurança e os documentos correspondentes ao produto ofertado. Referências de catálogo não substituem os resultados de um lote.</p>`,
  };
}
