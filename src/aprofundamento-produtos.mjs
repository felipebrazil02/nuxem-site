// Seções adicionais das páginas de produto APF, A1, B1 e BTE.
// Todo número vem dos dados já publicados nas próprias páginas (limites de classe da ANP,
// laudo da amostra APF, portfólio de referência do BTE) ou dos artigos do blog. Nada é inventado.

const tabelaClasses = destaque => `<table class="specs"><caption>Limites de classe da ANP para óleos combustíveis (viscosidade a 60 °C)</caption><thead><tr><th scope="col">Classe</th><th scope="col">Enxofre (limite da classe)</th><th scope="col">Viscosidade (limite da classe)</th></tr></thead><tbody>${[
  ['OCA1', 'até 2,0% em massa', 'até 620 mm²/s'],
  ['OCA2', 'até 2,0% em massa', 'até 960 mm²/s'],
  ['OCB1', 'até 1,0% em massa', 'até 620 mm²/s'],
  ['OCB2', 'até 1,0% em massa', 'até 960 mm²/s'],
].map(([c, s, v]) => `<tr${c === destaque ? ' aria-current="true"' : ''}><td>${c === destaque ? `<strong>${c}</strong>` : c}</td><td>${s}</td><td>${v}</td></tr>`).join('')}</tbody></table>`;

const notaTabela = '<p class="nota-tecnica">São requisitos da classe, não resultados de um lote. Confirme a especificação vigente e os dados do produto cotado.</p>';

const lista = itens => `<ul>${itens.map(i => `<li>${i}</li>`).join('')}</ul>`;

const condicaoOutros = 'Volume mínimo, disponibilidade e prazo são confirmados na cotação. As condições de fornecimento de BPF e de óleo de xisto não se estendem automaticamente aos demais produtos.';

export const APROFUNDAMENTO = {
  'oleo-a1': {
    secoes: [
      { titulo: 'Como o A1 se compara às classes vizinhas', blocos: [
        'A classe OCA1 reúne os óleos de maior limite de enxofre e menor limite de viscosidade dentro da família A. A tabela mostra onde ela se encaixa entre as quatro classes da ANP.',
        tabelaClasses('OCA1'),
        notaTabela,
        'Na prática, comparar A1 com A2 é comparar o limite de viscosidade, e comparar A1 com B1 é comparar o limite de enxofre. Veja os detalhes em <a href="/blog/diferencas-entre-oleo-bpf-a1-e-a2/">diferenças entre A1 e A2</a> e na página do <a href="/produtos/oleo-b1/">óleo B1</a>.',
      ] },
      { titulo: 'Quando o A1 entra na avaliação', blocos: [
        'O A1 costuma ser avaliado quando a licença da operação e as regras da região permitem o teor de enxofre da classe e quando o queimador admite a viscosidade do produto. A página oficial da ANP sobre óleo combustível lista regiões com condições específicas; consulte-a antes de decidir.',
        lista([
          'A licença e as exigências locais permitem a classe.',
          'O queimador e as bombas admitem a viscosidade nas temperaturas de partida e de regime.',
          'O aquecimento e o tanque têm capacidade para o produto cotado.',
          'O combustível que sobra no tanque é compatível com o novo lote. Veja a <a href="/blog/compatibilidade-entre-lotes-de-oleo-bpf-como-evitar-borra-na-mistura/">compatibilidade entre lotes</a>.',
        ]),
      ] },
      { titulo: 'Como comparar propostas de A1', blocos: [
        lista([
          'Use a mesma unidade de compra (litro, quilo ou tonelada) e converta antes de comparar. O texto sobre <a href="/blog/oleo-bpf-litro-quilo-tonelada-unidade-compra/">litro, quilo ou tonelada</a> mostra como.',
          'Deixe frete e impostos explícitos em todas as propostas.',
          'Compare o poder calorífico na mesma base (PCS ou PCI).',
          'Considere o consumo medido na instalação, e não só o preço por unidade.',
        ]),
        'O método de <a href="/blog/preco-oleo-bpf-posto-fabrica-comparar-propostas/">comparação do preço com frete</a> e o <a href="/blog/como-calcular-consumo-de-oleo-combustivel-em-caldeiras/">cálculo de consumo em caldeiras</a> ajudam a chegar ao custo por energia útil.',
      ] },
      { titulo: 'Documentos para pedir antes de fechar', blocos: [
        lista([
          'Ficha técnica e ficha de dados de segurança (FDS) do produto ofertado.',
          'Resultados do produto: viscosidade com a temperatura de ensaio, enxofre, ponto de fulgor, água e sedimentos, massa específica e poder calorífico.',
          'Identificação do fornecimento, para conferir o recebimento.',
        ]),
        condicaoOutros,
      ] },
    ],
    faq: [
      { p: 'Qual é o limite de enxofre do óleo A1?', r: 'A classe OCA1 admite até 2,0% em massa de enxofre, conforme os limites de classe desta página. O resultado do produto cotado deve constar na documentação do fornecimento.' },
      { p: 'A1 e BPF são a mesma coisa?', r: 'As siglas respondem a perguntas diferentes. BPF indica baixo ponto de fluidez; A1 indica a classe de enxofre e viscosidade. Nenhuma das duas substitui a ficha técnica do produto.' },
      { p: 'Que documentos pedir ao comprar A1?', r: 'Peça a ficha técnica, a ficha de dados de segurança e os resultados do produto ofertado, com a temperatura de ensaio da viscosidade.' },
    ],
  },

  'oleo-b1': {
    secoes: [
      { titulo: 'Como o B1 se compara a A1, A2 e B2', blocos: [
        'A classe OCB1 combina o menor limite de enxofre da classificação com o menor limite de viscosidade. A tabela mostra a posição dela entre as quatro classes da ANP.',
        tabelaClasses('OCB1'),
        notaTabela,
        'O B1 tem o mesmo teto de viscosidade do A1, mas o limite de enxofre é a metade. Isso não significa que um lote de B1 tenha exatamente metade do enxofre de um lote de A1: compare os resultados dos produtos efetivamente ofertados. Comparar B1 com B2 é comparar o limite de viscosidade; veja o texto sobre o <a href="/blog/oleo-b2-ocb2-diferencas-b1-a2-e-quando-usar/">óleo B2 (OCB2)</a>.',
      ] },
      { titulo: 'Quando o B1 entra na avaliação', blocos: [
        lista([
          'A instalação precisa de um combustível de menor teor de enxofre para a gestão de emissões ou para atender à licença.',
          'A documentação e a avaliação técnica confirmam que o produto pode ser bombeado e atomizado nas condições da planta, inclusive na partida.',
        ]),
        'O menor teor de enxofre pode ajudar na gestão das emissões de óxidos de enxofre, mas não comprova sozinho a conformidade ambiental da operação. O <a href="/blog/oleo-b1-ocb1-o-que-e-diferencas-a1-a2-b2-e-quando-usar/">guia completo do óleo B1</a> detalha a classificação.',
      ] },
      { titulo: 'O que o nome B1 não garante', blocos: [
        lista([
          'Bombeamento a frio ou partida mais rápida.',
          'Dispensa de aquecimento da linha ou do tanque.',
          'Conformidade com os limites de emissão da instalação.',
          'Comportamento idêntico entre dois produtos da mesma classe.',
        ]),
        'Esses pontos dependem da curva de viscosidade, do ponto de fluidez, da temperatura ambiente e da infraestrutura. Avalie-os com os dados do produto cotado.',
      ] },
      { titulo: 'Roteiro para trocar A1 por B1', blocos: [
        lista([
          'Compare a viscosidade, informando a temperatura de ensaio.',
          'Compare o poder calorífico na mesma base (PCS ou PCI).',
          'Confira a compatibilidade com o estoque do tanque antes de misturar.',
          'Planeje a transição e a regulagem do queimador.',
          'Acompanhe o consumo e as emissões depois da troca.',
        ]),
        'O <a href="/blog/como-especificar-o-oleo-combustivel-certo-para-seu-queimador/">roteiro de especificação para o queimador</a> organiza esses dados.',
      ] },
      { titulo: 'Documentos e condições de fornecimento', blocos: [
        lista([
          'Ficha técnica e ficha de dados de segurança do produto ofertado.',
          'Resultados do produto, com viscosidade e temperatura de ensaio, enxofre e ponto de fulgor.',
          'Para a escolha entre B1 e BTE, veja a página do <a href="/produtos/oleo-bte/">óleo BTE</a>.',
        ]),
        condicaoOutros,
      ] },
    ],
    faq: [
      { p: 'Qual é o limite de enxofre do óleo B1?', r: 'A classe OCB1 admite até 1,0% em massa de enxofre, metade do limite da classe A1. O resultado do produto cotado deve constar na documentação.' },
      { p: 'O B1 é mais fluido que o A1?', r: 'Os dois têm o mesmo limite de viscosidade de classe, de até 620 mm²/s a 60 °C. A diferença entre eles está no enxofre. A fluidez real depende do produto e da temperatura.' },
      { p: 'O B1 dispensa aquecimento?', r: 'Não é possível concluir isso pela classe. A necessidade de aquecimento depende da viscosidade do produto na temperatura de operação e dos limites de bombas e queimadores.' },
    ],
  },

  'oleo-bte': {
    secoes: [
      { titulo: 'O que o nome BTE indica e o que precisa ser confirmado', blocos: [
        'BTE é uma designação comercial associada ao baixo teor de enxofre. Ao contrário do B1, que é uma classe definida pela ANP, o nome não fixa limites. Por isso a escolha depende dos dados do produto ofertado.',
        lista([
          'Fabricante, origem e identificação comercial.',
          'Teor de enxofre do produto cotado, com unidade e base.',
          'Viscosidade com a temperatura de ensaio.',
          'Ponto de fulgor, densidade e poder calorífico (PCS ou PCI).',
          'Ficha de dados de segurança e certificado do fornecimento.',
        ]),
      ] },
      { titulo: 'Como ler os dados de referência', blocos: [
        lista([
          '<strong>Viscosidade, de 10 a 90 mm²/s:</strong> o portfólio não informa a temperatura de ensaio. Não compare esse valor com limites de classe medidos a 60 °C sem confirmar.',
          '<strong>Enxofre, 0,4% em massa:</strong> é um valor publicado no portfólio, não um limite máximo garantido.',
          '<strong>Ponto de fulgor, mínimo de 66 °C:</strong> a tabela do fabricante o trata como mínimo.',
          '<strong>Descrição:</strong> mistura principalmente de hidrocarbonetos aromáticos, líquido viscoso escuro.',
        ]),
        'Esses dados orientam a avaliação, mas não substituem o certificado nem a ficha de segurança do fornecimento.',
      ] },
      { titulo: 'BTE ou B1: o que cada nome informa', blocos: [
        '<table class="specs"><caption>Comparação entre B1 e BTE, com os dados publicados nas páginas da Nuxem</caption><thead><tr><th scope="col">Critério</th><th scope="col">B1 (OCB1)</th><th scope="col">BTE (portfólio de referência)</th></tr></thead><tbody><tr><td>Natureza do nome</td><td>Classe da ANP</td><td>Designação comercial</td></tr><tr><td>Enxofre</td><td>Máximo de 1,0% em massa (limite da classe)</td><td>0,4% em massa (valor publicado)</td></tr><tr><td>Viscosidade</td><td>Máximo de 620 mm²/s a 60 °C (limite da classe)</td><td>10 a 90 mm²/s, sem temperatura de ensaio informada</td></tr><tr><td>Ponto de fulgor</td><td>Mínimo de 66 °C</td><td>Mínimo de 66 °C</td></tr></tbody></table>',
        'As duas expressões não são sinônimos. Compare a documentação e o enquadramento dos produtos efetivamente ofertados. O texto sobre as <a href="/blog/vantagens-do-oleo-bte-para-industrias-com-restricao-ambiental/">vantagens do BTE em indústrias com restrição ambiental</a> mostra como fazer essa comparação, e a página do <a href="/produtos/oleo-b1/">óleo B1</a> traz os limites da classe.',
      ] },
      { titulo: 'Teste planejado antes da troca', blocos: [
        lista([
          'Confira tanque, vedações, filtros, bombas e controles em contato com o produto.',
          'Avalie as condições de bombeamento e de atomização no queimador.',
          'Verifique o combustível que sobra no tanque e a compatibilidade da mistura.',
          'Meça o consumo e as emissões em um teste planejado, antes de concluir sobre o benefício.',
          'Registre a manutenção antes e depois, sem atribuir toda diferença ao combustível.',
        ]),
        'A <a href="/blog/reducao-de-custos-com-substituicao-de-oleo-combustivel/">análise de custo de substituição</a> e a <a href="/blog/compatibilidade-entre-lotes-de-oleo-bpf-como-evitar-borra-na-mistura/">compatibilidade entre lotes</a> complementam o roteiro.',
      ] },
      { titulo: 'BTE em São Paulo, Minas Gerais e Paraná', blocos: [
        'A Nuxem atende os três estados. Para operações com restrição ambiental no Paraná, veja o artigo sobre <a href="/blog/oleo-bte-e-b1-no-parana-atendendo-restricoes-ambientais/">BTE e B1 no Paraná</a> e a página de <a href="/cobertura/parana/">fornecimento no Paraná</a>. ' + condicaoOutros,
      ] },
    ],
    faq: [
      { p: 'Qual é o teor de enxofre do BTE?', r: 'O portfólio de referência publica 0,4% em massa. É um valor publicado, não um limite máximo garantido. Confirme o teor no certificado do produto cotado.' },
      { p: 'Posso misturar BTE com o combustível que está no tanque?', r: 'Avalie a compatibilidade antes de misturar, com a documentação dos dois produtos e a orientação da equipe técnica. A aprovação comercial de um novo produto não substitui essa avaliação.' },
      { p: 'A Nuxem fornece BTE no Paraná?', r: 'A Nuxem atende São Paulo, Minas Gerais e Paraná. A disponibilidade, o prazo e a documentação do BTE são confirmados por endereço, na cotação.' },
    ],
  },

  'oleo-apf': {
    secoes: [
      { titulo: 'APF e BPF: siglas diferentes, perguntas diferentes', blocos: [
        'APF significa Alto Ponto de Fluidez e BPF significa Baixo Ponto de Fluidez. As siglas não substituem os valores da ficha técnica. Compare o ponto de fluidez e a viscosidade na mesma temperatura antes de definir o aquecimento e o uso.',
        'O APF não é uma especificação fechada como uma classe da ANP. Antes de comprar, confirme os valores reais do produto ofertado. O artigo sobre <a href="/blog/oleo-apf-o-que-e-viscosidade-e-quando-usar/">óleo APF, viscosidade e quando usar</a> detalha o raciocínio.',
      ] },
      { titulo: 'Como ler o laudo da amostra', blocos: [
        lista([
          '<strong>Viscosidade de 28,0 cSt a 60 °C:</strong> cSt é o mesmo que mm²/s. O valor foi medido a 60 °C e não vale como viscosidade à temperatura ambiente.',
          '<strong>PCS de 10.600 kcal/kg e PCI de 10.200 kcal/kg:</strong> o PCI desconta a água da combustão e fica mais próximo da energia aproveitável em caldeiras comuns. Compare propostas sempre na mesma base e na mesma unidade.',
          '<strong>Enxofre abaixo de 0,5% e água e sedimentos de 0,1%:</strong> o documento não informa a base dos percentuais. Confirme na documentação do fornecimento.',
          '<strong>Ponto de fulgor acima de 61,0 °C e fluidez de 1,0 °C:</strong> o ponto de fluidez é a menor temperatura em que o óleo ainda escoa nas condições do ensaio.',
        ]),
        'Os resultados se referem a uma amostra de 1 litro, e não a limites garantidos para todo fornecimento.',
      ] },
      { titulo: 'APF e aquecimento', blocos: [
        'Não presuma que o APF dispensa aquecimento. O que importa é a viscosidade do óleo na temperatura real de partida e de regime e a faixa que a bomba e o bico do queimador admitem. Solicite a curva de viscosidade e consulte o fabricante dos equipamentos.',
        'O <a href="/blog/como-especificar-o-oleo-combustivel-certo-para-seu-queimador/">roteiro de especificação para o queimador</a> vale para o APF, o BPF e qualquer óleo combustível.',
      ] },
      { titulo: 'Quando o APF entra na avaliação', blocos: [
        lista([
          'Operações que buscam simplificar a partida e o manuseio.',
          'Linhas sem aquecimento ou com aquecimento limitado, desde que o produto e o sistema sejam compatíveis.',
          'Instalações em que o fabricante do equipamento admite a viscosidade do produto.',
        ]),
        'Cada caso exige checagem com a ficha do produto cotado.',
      ] },
      { titulo: 'Documentos e condições de fornecimento', blocos: [
        lista([
          'Laudo ou certificado do lote, com número e data de emissão.',
          'Ficha técnica e ficha de dados de segurança do produto ofertado.',
          'Curva de viscosidade e condições de aquecimento recomendadas.',
        ]),
        condicaoOutros,
      ] },
    ],
    faq: [
      { p: 'APF e BPF são o mesmo combustível?', r: 'Não. APF indica alto ponto de fluidez e BPF indica baixo ponto de fluidez. Compare viscosidade, ponto de fluidez e poder calorífico do produto ofertado em cada caso.' },
      { p: 'O que significa o ponto de fluidez do laudo?', r: 'É a menor temperatura em que o óleo ainda escoa nas condições do ensaio. O laudo da amostra registra 1,0 °C. Confirme o método e o valor do lote na documentação do fornecimento.' },
      { p: 'O APF tem baixo teor de enxofre?', r: 'A amostra analisada indica enxofre abaixo de 0,5%, sem informar a base do percentual. Para a compra, confirme o teor do produto ofertado e os requisitos da instalação.' },
    ],
  },
};
