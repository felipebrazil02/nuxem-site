// Dados centrais da Nuxem — tudo que as páginas usam vem daqui.
// Fatos vindos do site antigo e do fundador; nada inventado.

export const EMPRESA = {
  nome: 'Nuxem',
  dominio: 'https://nuxemoil.com.br',
  whatsappPrincipal: '5511915011527',
  whatsappSecundario: '5511945868799',
  telefone: '(11) 97462-0945',
  telefoneLink: 'tel:+5511974620945',
  gaId: 'G-H0XF8SXJ4B',
  email: 'contato@nuxemoil.com',
  endereco: 'Av Brasília, 2242 - Vila Norma, Salto/SP, CEP 13327-896',
  cnpj: '47.626.641/0001-10',
  regiao: 'todo o estado de São Paulo, Minas Gerais e Paraná',
  cidades: 'São Paulo, Campinas, Sorocaba, Jundiaí, Piracicaba, Ribeirão Preto, Belo Horizonte, Betim, Contagem, Uberlândia, Juiz de Fora, Curitiba, Araucária, Ponta Grossa, Londrina, Maringá e São José dos Pinhais',
  diferenciais: [
    { titulo: 'Atendimento 24h', texto: 'Suporte e atendimento a qualquer hora, todos os dias. Operação térmica não espera horário comercial.' },
    { titulo: 'Frota própria', texto: 'Entrega rápida com caminhões próprios, sem depender de terceiros para cumprir prazo.' },
    { titulo: 'Produção sob demanda', texto: 'Combustível produzido conforme a necessidade da sua operação, com padrão constante de qualidade.' },
    { titulo: 'Preço competitivo', texto: 'Alta qualidade com custo justo, para reduzir o custo térmico da sua planta.' },
  ],
};

export const PRODUTOS = [
  {
    "slug": "oleo-bpf",
    "nome": "Óleo BPF",
    "imagem": "produto-oleo-bpf.webp",
    "imagemAlt": "Imagem ilustrativa de óleo combustível para uso industrial",
    "resumo": "Óleo combustível para caldeiras, fornos e usinas de asfalto. Compare classe, viscosidade, enxofre e custo entregue.",
    "title": "Óleo BPF em SP, MG e PR | Fornecedor | Nuxem",
    "description": "Fornecimento de óleo BPF para caldeiras, fornos e usinas de asfalto em SP, MG e PR. Frota própria e atendimento 24h. Solicite cotação.",
    "specs": [
      [
        "Viscosidade cinemática",
        "Solicitar valor em mm²/s (cSt) e temperatura do ensaio"
      ],
      [
        "Poder calorífico",
        "Solicitar PCS ou PCI em kcal/kg ou MJ/kg, identificando a base usada"
      ],
      [
        "Teor de enxofre",
        "Confirmar percentual em massa na especificação do produto cotado"
      ],
      [
        "Ponto de fluidez e ponto de fulgor",
        "Consultar os valores em °C e as condições de manuseio na documentação"
      ],
      [
        "Densidade",
        "Confirmar valor e temperatura de referência para converter litros em massa"
      ]
    ],
    "aplicacoes": "Caldeiras, fornos e outros processos térmicos industriais, mediante avaliação de compatibilidade e dos requisitos da instalação.",
    "corpo": [
      "O óleo BPF (Baixo Ponto de Fluidez) é um combustível derivado de petróleo utilizado na geração de calor industrial. Sua aplicação em caldeiras, fornos e secadores depende da compatibilidade com o sistema de armazenamento, bombeamento e queima.",
      "A designação BPF não substitui a especificação de compra. Confirme a classe do óleo, o teor de enxofre, a viscosidade e o poder calorífico do produto ofertado. Esses dados orientam a regulagem do queimador e a comparação de propostas.",
      "A Nuxem atende São Paulo, Minas Gerais e Paraná com frota própria e atendimento 24 horas. Informe seu consumo e a cidade para consultar o produto disponível e a programação de entrega."
    ],
    "orientacao": "Informe a cidade de entrega, o equipamento, o consumo estimado e o volume desejado. Solicite a ficha técnica e a ficha de dados de segurança do produto cotado; confirme viscosidade, temperatura de ensaio, teor de enxofre e poder calorífico antes da compra. Consulte também o <a href=\"/guia-oleo-bpf/\">guia de óleo BPF</a> e as <a href=\"/cobertura/\">regiões atendidas</a>.",
    "criterio": "Classe do óleo, viscosidade na temperatura de uso e custo por energia útil.",
    "faq": [
      {
        "p": "Qual é o preço do óleo BPF?",
        "r": "A cotação depende do produto, volume, destino, frete, tributos e condições de pagamento. Compare propostas na mesma unidade e inclua o custo entregue e o rendimento do processo."
      },
      {
        "p": "Óleo BPF precisa de aquecimento?",
        "r": "A necessidade e a temperatura de aquecimento dependem da viscosidade do óleo, do clima e dos limites de bombas e queimadores. Defina esses parâmetros com a ficha técnica e o fabricante do equipamento."
      },
      {
        "p": "BPF, A1 e B1 são a mesma especificação?",
        "r": "BPF é uma denominação comercial ampla. A1 e B1 identificam classes de óleo combustível com critérios próprios. Registre na compra a classificação aplicável e os parâmetros do produto fornecido."
      }
    ],
    "notaSpecs": "Os itens abaixo orientam a consulta e não constituem certificado de um lote. Solicite a ficha técnica e a ficha de dados de segurança do produto ofertado."
  },
  {
    "slug": "oleo-apf",
    "nome": "Óleo APF",
    "imagem": "produto-oleo-apf.webp",
    "imagemAlt": "Imagem ilustrativa de óleo combustível para uso industrial",
    "resumo": "Óleo combustível APF: confirme ponto de fluidez, viscosidade e condições de aquecimento antes de escolher.",
    "title": "Óleo APF em SP, MG e PR | Especificação e Cotação | Nuxem",
    "description": "Consulte óleo APF para processos térmicos em SP, MG e PR. Avalie viscosidade, ponto de fluidez e compatibilidade com o queimador. Peça cotação.",
    "specs": [
      [
        "Viscosidade cinemática",
        "Solicitar valor em mm²/s (cSt) e temperatura do ensaio"
      ],
      [
        "Poder calorífico",
        "Solicitar PCS ou PCI em kcal/kg ou MJ/kg, identificando a base usada"
      ],
      [
        "Teor de enxofre",
        "Confirmar percentual em massa na especificação do produto cotado"
      ],
      [
        "Ponto de fluidez e ponto de fulgor",
        "Consultar os valores em °C e as condições de manuseio na documentação"
      ],
      [
        "Densidade",
        "Confirmar valor e temperatura de referência para converter litros em massa"
      ]
    ],
    "aplicacoes": "Caldeiras, fornos e outros processos térmicos industriais, mediante avaliação de compatibilidade e dos requisitos da instalação.",
    "corpo": [
      "APF é a denominação Alto Ponto de Fluidez. Ao consultar esse óleo combustível, solicite a identificação comercial completa e a ficha técnica: a sigla, isoladamente, não informa a viscosidade na temperatura de operação.",
      "Ponto de fluidez e viscosidade representam características diferentes. Não se deve concluir que um óleo APF dispensa aquecimento. O projeto precisa considerar o produto real, a menor temperatura ambiente, as condições de partida e os limites do equipamento.",
      "Para avaliar a aplicação em caldeiras, fornos ou usinas de asfalto, compare as exigências de bombeamento e atomização. A Nuxem atende SP, MG e PR; consulte disponibilidade, documentação e programação para o seu destino."
    ],
    "criterio": "Ponto de fluidez, curva de viscosidade e necessidade de aquecimento.",
    "faq": [
      {
        "p": "APF é sempre mais fluido que BPF?",
        "r": "Não é possível estabelecer essa comparação pela sigla. Compare os valores de viscosidade na mesma temperatura e os pontos de fluidez das duas propostas."
      },
      {
        "p": "Posso usar APF em uma linha sem aquecimento?",
        "r": "Isso exige avaliação do produto, das temperaturas de partida e do sistema. Solicite a curva de viscosidade e consulte o fabricante de bombas e queimadores antes de decidir."
      },
      {
        "p": "O que informar para cotar APF?",
        "r": "Envie cidade, volume, combustível atual, modelo do queimador e condições de aquecimento disponíveis. Peça a especificação do produto ofertado para validar a aplicação."
      }
    ],
    "notaSpecs": "Os itens abaixo orientam a consulta e não constituem certificado de um lote. Solicite a ficha técnica e a ficha de dados de segurança do produto ofertado.",
    "orientacao": "Informe cidade, volume, consumo estimado, combustível atual e modelo do queimador. Envie também os requisitos de aquecimento e as restrições da instalação. Consulte as <a href=\"/cobertura/\">regiões atendidas</a> e veja <a href=\"/blog/como-preparar-uma-solicitacao-de-cotacao-de-oleo-combustivel-industrial/\">como preparar os dados para uma cotação</a>."
  },
  {
    "slug": "oleo-b1",
    "nome": "Óleo B1 (OC-B1)",
    "imagem": "produto-oleo-bpf.webp",
    "imagemAlt": "Imagem ilustrativa de óleo combustível para uso industrial",
    "resumo": "Óleo combustível OCB1: avalie a classe de menor teor de enxofre com a documentação e os requisitos da instalação.",
    "title": "Óleo B1 (OCB1) em SP, MG e PR | Cotação | Nuxem",
    "description": "Óleo combustível B1 para caldeiras e fornos em SP, MG e PR. Consulte especificação, teor de enxofre, viscosidade e entrega. Solicite cotação.",
    "specs": [
      [
        "Classe solicitada",
        "OCB1 — confirmar enquadramento na especificação"
      ],
      [
        "Viscosidade cinemática",
        "Solicitar valor em mm²/s (cSt) e temperatura do ensaio"
      ],
      [
        "Poder calorífico",
        "Solicitar PCS ou PCI em kcal/kg ou MJ/kg, identificando a base usada"
      ],
      [
        "Teor de enxofre",
        "Confirmar percentual em massa na especificação do produto cotado"
      ],
      [
        "Ponto de fluidez e ponto de fulgor",
        "Consultar os valores em °C e as condições de manuseio na documentação"
      ],
      [
        "Densidade",
        "Confirmar valor e temperatura de referência para converter litros em massa"
      ]
    ],
    "aplicacoes": "Caldeiras, fornos e outros processos térmicos industriais, mediante avaliação de compatibilidade e dos requisitos da instalação.",
    "corpo": [
      "O óleo B1, também identificado como OCB1, pertence à classificação de óleos combustíveis de menor teor de enxofre e menor limite de viscosidade dentro dos tipos B1 e B2. A especificação deve ser conferida na documentação do produto cotado.",
      "Um combustível com menor teor de enxofre pode ajudar na gestão das emissões de óxidos de enxofre, mas não comprova sozinho a conformidade ambiental da operação. Licenciamento, equipamento, condições de queima e medições da instalação também precisam ser considerados.",
      "A Nuxem fornece óleo combustível para SP, MG e PR. Informe a classificação exigida no seu processo e encaminhe os requisitos técnicos para consultar uma proposta compatível.",
      "A classificação dos óleos combustíveis pode ser consultada na <a href=\"https://www.gov.br/anp/pt-br/assuntos/producao-de-derivados-de-petroleo-e-processamento-de-gas-natural/producao-de-derivados-de-petroleo-e-processamento-de-gas-natural/oleo-combustivel\">orientação oficial da ANP</a>. Verifique os requisitos vigentes na definição da compra."
    ],
    "criterio": "Classificação OCB1, enxofre documentado e requisitos ambientais da instalação.",
    "faq": [
      {
        "p": "Óleo B1 garante atendimento aos limites de emissões?",
        "r": "Não. A conformidade é avaliada para a instalação e seus limites aplicáveis. O teor de enxofre é um dos parâmetros de seleção; regulagem da queima e monitoramento continuam necessários."
      },
      {
        "p": "Posso substituir A1 por B1?",
        "r": "A troca requer conferir viscosidade, poder calorífico, compatibilidade com o estoque e regulagem do queimador. Planeje a transição e acompanhe consumo e emissões."
      },
      {
        "p": "B1 e BTE são sinônimos?",
        "r": "Não devem ser tratados como uma especificação idêntica. B1 identifica uma classe de óleo combustível; a denominação BTE exige conferir a ficha e a identificação do produto oferecido."
      }
    ],
    "notaSpecs": "Os itens abaixo orientam a consulta e não constituem certificado de um lote. Solicite a ficha técnica e a ficha de dados de segurança do produto ofertado.",
    "orientacao": "Informe cidade, volume, consumo estimado, combustível atual e modelo do queimador. Envie também os requisitos de aquecimento e as restrições da instalação. Consulte as <a href=\"/cobertura/\">regiões atendidas</a> e veja <a href=\"/blog/como-preparar-uma-solicitacao-de-cotacao-de-oleo-combustivel-industrial/\">como preparar os dados para uma cotação</a>."
  },
  {
    "slug": "oleo-a1",
    "nome": "Óleo A1 (OC-A1)",
    "imagem": "produto-oleo-bpf.webp",
    "imagemAlt": "Imagem ilustrativa de óleo combustível para uso industrial",
    "resumo": "Óleo combustível OCA1 para processos térmicos compatíveis. Consulte requisitos de queima e documentação para compra.",
    "title": "Óleo A1 (OCA1) em SP, MG e PR | Óleo BPF A1 | Nuxem",
    "description": "Consulte óleo combustível A1 para caldeiras, fornos e usinas de asfalto em SP, MG e PR. Avalie viscosidade, enxofre e custo entregue. Peça cotação.",
    "specs": [
      [
        "Classe solicitada",
        "OCA1 — confirmar enquadramento na especificação"
      ],
      [
        "Viscosidade cinemática",
        "Solicitar valor em mm²/s (cSt) e temperatura do ensaio"
      ],
      [
        "Poder calorífico",
        "Solicitar PCS ou PCI em kcal/kg ou MJ/kg, identificando a base usada"
      ],
      [
        "Teor de enxofre",
        "Confirmar percentual em massa na especificação do produto cotado"
      ],
      [
        "Ponto de fluidez e ponto de fulgor",
        "Consultar os valores em °C e as condições de manuseio na documentação"
      ],
      [
        "Densidade",
        "Confirmar valor e temperatura de referência para converter litros em massa"
      ]
    ],
    "aplicacoes": "Caldeiras, fornos e outros processos térmicos industriais, mediante avaliação de compatibilidade e dos requisitos da instalação.",
    "corpo": [
      "O óleo A1, ou OCA1, é uma classe de óleo combustível com maior teor de enxofre e menor limite de viscosidade na comparação entre os tipos A1 e A2. A designação orienta a compra, mas não substitui os dados do produto e a avaliação da instalação.",
      "Para aplicação em caldeiras, fornos e usinas de asfalto, verifique se a classe é permitida pelas exigências locais e pela licença da operação. Avalie também a viscosidade de trabalho, a capacidade do aquecimento e a faixa admitida pelo queimador.",
      "Ao comparar propostas de A1, use a mesma unidade de compra e inclua frete, impostos, poder calorífico e consumo medido. A Nuxem atende SP, MG e PR; consulte volume e programação para sua cidade.",
      "A classificação dos óleos combustíveis pode ser consultada na <a href=\"https://www.gov.br/anp/pt-br/assuntos/producao-de-derivados-de-petroleo-e-processamento-de-gas-natural/producao-de-derivados-de-petroleo-e-processamento-de-gas-natural/oleo-combustivel\">orientação oficial da ANP</a>. Verifique os requisitos vigentes na definição da compra."
    ],
    "criterio": "Classificação OCA1, viscosidade, teor de enxofre e licença da operação.",
    "faq": [
      {
        "p": "Qual a diferença entre A1 e A2?",
        "r": "A classificação diferencia, entre outros requisitos, o limite de viscosidade. Isso afeta a análise de bombeamento e aquecimento. Confirme a especificação vigente e as condições do óleo ofertado."
      },
      {
        "p": "A1 pode ser usado em qualquer indústria?",
        "r": "Não. O combustível deve atender às exigências ambientais da localização e da instalação, além dos limites do equipamento. Valide esses critérios antes da compra."
      },
      {
        "p": "O menor preço por litro significa menor custo?",
        "r": "Não necessariamente. Densidade, poder calorífico, rendimento, aquecimento e manutenção influenciam o custo por energia útil. Compare o custo entregue e o desempenho no processo."
      }
    ],
    "notaSpecs": "Os itens abaixo orientam a consulta e não constituem certificado de um lote. Solicite a ficha técnica e a ficha de dados de segurança do produto ofertado.",
    "orientacao": "Informe cidade, volume, consumo estimado, combustível atual e modelo do queimador. Envie também os requisitos de aquecimento e as restrições da instalação. Consulte as <a href=\"/cobertura/\">regiões atendidas</a> e veja <a href=\"/blog/como-preparar-uma-solicitacao-de-cotacao-de-oleo-combustivel-industrial/\">como preparar os dados para uma cotação</a>."
  },
  {
    "slug": "oleo-de-xisto",
    "nome": "Óleo de Xisto (OTE)",
    "imagem": "produto-oleo-bpf.webp",
    "imagemAlt": "Imagem ilustrativa de óleo combustível para uso industrial",
    "resumo": "Óleo de xisto OTE para caldeiras, fornos e usinas de asfalto. Consulte a especificação adequada à sua operação.",
    "title": "Óleo de Xisto OTE em SP, MG e PR | Nuxem",
    "description": "Fornecimento de óleo de xisto OTE para caldeiras, fornos e usinas de asfalto em SP, MG e PR. Consulte especificações e solicite cotação.",
    "specs": [
      [
        "Viscosidade cinemática",
        "Solicitar valor em mm²/s (cSt) e temperatura do ensaio"
      ],
      [
        "Poder calorífico",
        "Solicitar PCS ou PCI em kcal/kg ou MJ/kg, identificando a base usada"
      ],
      [
        "Teor de enxofre",
        "Confirmar percentual em massa na especificação do produto cotado"
      ],
      [
        "Ponto de fluidez e ponto de fulgor",
        "Consultar os valores em °C e as condições de manuseio na documentação"
      ],
      [
        "Densidade",
        "Confirmar valor e temperatura de referência para converter litros em massa"
      ]
    ],
    "aplicacoes": "Caldeiras, fornos e outros processos térmicos industriais, mediante avaliação de compatibilidade e dos requisitos da instalação.",
    "corpo": [
      "O Óleo de Xisto OTE é produzido a partir do xisto betuminoso e utilizado como combustível em processos térmicos industriais. A escolha deve considerar as características do produto fornecido e as exigências do queimador.",
      "Antes de substituir o combustível, confirme viscosidade, teor de enxofre, poder calorífico e condições de armazenamento. A necessidade de aquecimento e os resultados de emissões devem ser avaliados para o produto e a instalação, sem presumir dispensa de aquecimento ou redução de emissões em todos os casos.",
      "A Nuxem fornece óleo de xisto em São Paulo, Minas Gerais e Paraná, com frota própria e atendimento 24 horas. Consulte a programação de entrega para a sua cidade."
    ],
    "orientacao": "Informe cidade de entrega, tipo de queimador, combustível atual e consumo estimado. Solicite a ficha técnica e a ficha de dados de segurança do produto cotado para avaliar a aplicação. Veja a <a href=\"/blog/comparacao-tecnica-oleo-de-xisto-bte-bpf-e-oleos-alternativos/\">comparação entre combustíveis industriais</a> e as <a href=\"/cobertura/\">regiões atendidas</a>.",
    "criterio": "Especificação do OTE, compatibilidade de armazenamento e desempenho na aplicação.",
    "faq": [
      {
        "p": "Óleo de xisto pode substituir o BPF?",
        "r": "Pode ser uma opção após avaliação técnica. Compare viscosidade, poder calorífico, enxofre, estabilidade e exigências do queimador. Planeje a transição do estoque e valide a operação antes de ampliar o uso."
      },
      {
        "p": "OTE dispensa aquecimento?",
        "r": "Não presuma essa condição pela denominação. A necessidade de aquecimento depende da especificação do óleo, da temperatura ambiente e das exigências de bombeamento e atomização."
      },
      {
        "p": "Como comparar o preço do xisto com o BPF?",
        "r": "Converta as propostas para a mesma base de massa e energia e inclua frete, rendimento e custos de adaptação. Registre o consumo por tonelada produzida ou de vapor em condições comparáveis."
      }
    ],
    "notaSpecs": "Os itens abaixo orientam a consulta e não constituem certificado de um lote. Solicite a ficha técnica e a ficha de dados de segurança do produto ofertado."
  },
  {
    "slug": "oleo-bte",
    "nome": "Óleo BTE",
    "imagem": "produto-oleo-bpf.webp",
    "imagemAlt": "Imagem ilustrativa de óleo combustível para uso industrial",
    "resumo": "Óleo BTE: avalie o teor de enxofre documentado, a viscosidade e a aplicação no seu processo térmico.",
    "title": "Óleo BTE em SP, MG e PR | Especificação e Cotação | Nuxem",
    "description": "Consulte óleo BTE para caldeiras e fornos em SP, MG e PR. Compare teor de enxofre, viscosidade, documentação e custo entregue. Solicite cotação.",
    "specs": [
      [
        "Viscosidade cinemática",
        "Solicitar valor em mm²/s (cSt) e temperatura do ensaio"
      ],
      [
        "Poder calorífico",
        "Solicitar PCS ou PCI em kcal/kg ou MJ/kg, identificando a base usada"
      ],
      [
        "Teor de enxofre",
        "Confirmar percentual em massa na especificação do produto cotado"
      ],
      [
        "Ponto de fluidez e ponto de fulgor",
        "Consultar os valores em °C e as condições de manuseio na documentação"
      ],
      [
        "Densidade",
        "Confirmar valor e temperatura de referência para converter litros em massa"
      ]
    ],
    "aplicacoes": "Caldeiras, fornos e outros processos térmicos industriais, mediante avaliação de compatibilidade e dos requisitos da instalação.",
    "corpo": [
      "BTE significa Baixo Teor de Enxofre. Para selecionar esse combustível, confirme o percentual de enxofre, a origem e a identificação comercial na documentação do produto. A denominação não deve ser usada como garantia de uma composição universal.",
      "A redução de enxofre no combustível pode contribuir para controlar emissões de óxidos de enxofre. Ela não garante, isoladamente, menor fuligem ou atendimento a todos os limites ambientais: a formação de material particulado também depende da composição e das condições de combustão.",
      "Compare viscosidade, poder calorífico, compatibilidade de armazenamento e custo por energia útil com o combustível atual. A Nuxem atende SP, MG e PR; consulte disponibilidade e condições para a sua instalação."
    ],
    "criterio": "Teor de enxofre, identificação do fabricante e ficha do produto ofertado.",
    "faq": [
      {
        "p": "Todo BTE tem a mesma especificação?",
        "r": "Não use a denominação como uma ficha técnica. Peça fabricante, identificação comercial, teor de enxofre e propriedades do produto cotado."
      },
      {
        "p": "BTE elimina a necessidade de controlar emissões?",
        "r": "Não. A operação continua sujeita à licença e aos limites aplicáveis. Escolha do combustível, manutenção, regulagem e monitoramento devem ser avaliados em conjunto."
      },
      {
        "p": "Como avaliar a troca para BTE?",
        "r": "Compare dados documentados, compatibilidade do tanque, condições de bombeamento e atomização. Meça consumo e emissões em um teste planejado antes de concluir sobre o benefício."
      }
    ],
    "notaSpecs": "Os itens abaixo orientam a consulta e não constituem certificado de um lote. Solicite a ficha técnica e a ficha de dados de segurança do produto ofertado.",
    "orientacao": "Informe cidade, volume, consumo estimado, combustível atual e modelo do queimador. Envie também os requisitos de aquecimento e as restrições da instalação. Consulte as <a href=\"/cobertura/\">regiões atendidas</a> e veja <a href=\"/blog/como-preparar-uma-solicitacao-de-cotacao-de-oleo-combustivel-industrial/\">como preparar os dados para uma cotação</a>."
  },
  {
    "slug": "oleos-alternativos",
    "nome": "Óleos alternativos",
    "imagem": "queimador-industrial.webp",
    "imagemAlt": "Queimador industrial: aplicação ilustrativa de combustível",
    "resumo": "Avaliação de combustíveis alternativos ao BPF conforme produto disponível, equipamento e requisitos da operação.",
    "title": "Óleos Combustíveis Alternativos ao BPF | Nuxem",
    "description": "Avalie óleos combustíveis alternativos ao BPF para sua operação em SP, MG e PR. Compare documentação, compatibilidade e custo útil. Consulte a Nuxem.",
    "specs": [
      [
        "Viscosidade cinemática",
        "Solicitar valor em mm²/s (cSt) e temperatura do ensaio"
      ],
      [
        "Poder calorífico",
        "Solicitar PCS ou PCI em kcal/kg ou MJ/kg, identificando a base usada"
      ],
      [
        "Teor de enxofre",
        "Confirmar percentual em massa na especificação do produto cotado"
      ],
      [
        "Ponto de fluidez e ponto de fulgor",
        "Consultar os valores em °C e as condições de manuseio na documentação"
      ],
      [
        "Densidade",
        "Confirmar valor e temperatura de referência para converter litros em massa"
      ]
    ],
    "aplicacoes": "Processos térmicos industriais, conforme a identificação do combustível e a avaliação de compatibilidade.",
    "corpo": [
      "Óleos alternativos é uma descrição ampla de opções de combustível para processos térmicos. Cada proposta precisa identificar o produto, sua origem, especificação e condições de uso; não há uma composição única ou desempenho automaticamente equivalente ao BPF.",
      "A seleção começa pelos limites do queimador, do sistema de bombeamento e do armazenamento. Em processos com contato entre gases e produto, é necessário avaliar também os requisitos de qualidade e as restrições específicas da aplicação.",
      "Para comparar a mudança, inclua preço entregue, poder calorífico, rendimento, adaptações e manutenção. A Nuxem atende SP, MG e PR e pode avaliar o fornecimento conforme a necessidade informada; consulte a documentação da opção proposta."
    ],
    "criterio": "Identificação do combustível, compatibilidade técnica e custo da mudança.",
    "faq": [
      {
        "p": "Qual é o melhor combustível alternativo ao BPF?",
        "r": "A resposta depende do equipamento, da carga térmica, das restrições ambientais e da disponibilidade. Compare produtos identificados e documentados para a sua operação."
      },
      {
        "p": "Posso misturar o alternativo com o estoque atual?",
        "r": "Não presuma compatibilidade. Avalie estabilidade da mistura, documentação e procedimento de transição com suporte técnico antes de receber o novo combustível no mesmo tanque."
      },
      {
        "p": "Como comprovar uma economia real?",
        "r": "Registre uma referência de consumo e produção, inclua os custos de adaptação e compare testes em condições equivalentes. O preço por litro, isoladamente, não comprova economia."
      }
    ],
    "notaSpecs": "Os itens abaixo orientam a consulta e não constituem certificado de um lote. Solicite a ficha técnica e a ficha de dados de segurança do produto ofertado.",
    "orientacao": "Informe cidade, volume, consumo estimado, combustível atual e modelo do queimador. Envie também os requisitos de aquecimento e as restrições da instalação. Consulte as <a href=\"/cobertura/\">regiões atendidas</a> e veja <a href=\"/blog/como-preparar-uma-solicitacao-de-cotacao-de-oleo-combustivel-industrial/\">como preparar os dados para uma cotação</a>."
  }
];

export const SOLUCOES = [
  {
    slug: 'usinas-de-asfalto',
    nome: 'Usinas de asfalto',
    imagem: 'hero-usina-asfalto.webp',
    imagemAlt: 'Usina de asfalto ao entardecer com caminhão de óleo combustível',
    resumo: 'Combustível com entrega programada para a usina nunca parar por falta de abastecimento.',
    title: 'Óleo Combustível para Usina de Asfalto | Entrega em SP | Nuxem',
    description: 'Fornecimento de óleo BPF e combustíveis industriais para usinas de asfalto em São Paulo. Entrega rápida com frota própria e atendimento 24h. Solicite cotação.',
    corpo: [
      'Em uma usina de asfalto, o combustível é o coração da produção: sem calor não há secagem de agregados, não há massa asfáltica e não há obra andando. Uma falha de abastecimento para a usina, atrasa o cronograma e gera custo em cascata.',
      'Por isso a Nuxem trata o fornecimento para usinas de asfalto como operação crítica. Trabalhamos com entrega programada e frota própria, para o combustível chegar quando a produção precisa — e com atendimento 24 horas para imprevistos, porque obra não espera.',
      'Fornecemos óleo BPF e alternativas de viscosidades diferentes, com produção sob demanda e padrão constante. Nossa equipe apoia a especificação correta para o seu queimador e o seu regime de produção, em qualquer região do estado de São Paulo.',
    ],
    produtosRelacionados: ['oleo-bpf', 'oleos-alternativos', 'oleo-a1'],
    artigosRelacionados: ['oleo-de-xisto-para-usinas-de-asfalto', 'logistica-de-abastecimento-de-oleo-bpf-entre-sp-mg-e-pr', 'como-programar-o-abastecimento-de-oleo-bpf-para-evitar-paradas'],
  },
  {
    slug: 'caldeiras',
    nome: 'Caldeiras industriais',
    imagem: 'caldeira.webp',
    imagemAlt: 'Caldeira industrial de geração de vapor com queimador',
    resumo: 'Queima estável e fornecimento contínuo para geração de vapor sem sustos.',
    title: 'Óleo Combustível para Caldeira Industrial | Nuxem São Paulo',
    description: 'Óleo BPF e combustíveis industriais para caldeiras com queima estável e fornecimento contínuo. Atendimento 24h em todo o estado de SP. Peça sua cotação.',
    corpo: [
      'Caldeiras industriais operam em regime contínuo, e a estabilidade da queima impacta diretamente a produção de vapor, o consumo específico e a vida útil do equipamento. Variações no combustível aparecem na chama, no rendimento e na manutenção.',
      'A Nuxem fornece óleo BPF e óleos alternativos com padrão constante de qualidade, produzidos sob demanda. Apoiamos a especificação correta para o seu sistema: viscosidade de trabalho, aquecimento de linha, temperatura de atomização e rotina de operação.',
      'Com frota própria e atendimento 24 horas, garantimos o abastecimento contínuo que uma caldeira exige — em todo o estado de São Paulo.',
    ],
    produtosRelacionados: ['oleo-bpf', 'oleo-apf', 'oleo-b1', 'oleo-bte'],
    artigosRelacionados: ['como-especificar-o-oleo-combustivel-certo-para-seu-queimador', 'como-calcular-consumo-de-oleo-combustivel-em-caldeiras', 'impacto-da-viscosidade-do-oleo-bpf-na-eficiencia-da-queima'],
  },
  {
    slug: 'fundicoes',
    nome: 'Fundições',
    imagem: 'fundicao.webp',
    imagemAlt: 'Forno de fundição vertendo metal incandescente',
    resumo: 'Alta carga térmica com consistência de processo e fornecimento confiável.',
    title: 'Óleo Combustível para Fundição | Fornecedor em SP | Nuxem',
    description: 'Combustível industrial para fundições e fornos de alta temperatura. Óleo BPF com qualidade constante, entrega rápida e suporte técnico em São Paulo.',
    corpo: [
      'Fundições trabalham com as cargas térmicas mais exigentes da indústria. A consistência do processo depende de um combustível com padrão estável: variações de qualidade aparecem em comportamento de queima, controle de temperatura e paradas não planejadas.',
      'A Nuxem fornece óleo BPF e alternativas de viscosidades diferentes para fornos de fundição, com produção sob demanda e qualidade constante entre entregas — o que protege a repetibilidade do seu processo.',
      'Nosso atendimento 24 horas e a frota própria garantem que o forno não pare por falta de combustível. Atendemos fundições em todo o estado de São Paulo, com suporte técnico na especificação.',
    ],
    produtosRelacionados: ['oleo-bpf', 'oleos-alternativos'],
    artigosRelacionados: ['compatibilidade-entre-lotes-de-oleo-bpf-como-evitar-borra-na-mistura', 'reducao-de-custos-com-substituicao-de-oleo-combustivel', 'como-especificar-o-oleo-combustivel-certo-para-seu-queimador'],
  },
];

export const HOME = {
  title: 'Nuxem | Fornecedor de Óleo BPF e Combustíveis Industriais em SP, MG e PR',
  description: 'Fornecemos óleo BPF e combustíveis industriais para caldeiras, usinas de asfalto e fundições em São Paulo, Minas Gerais e Paraná. Frota própria, atendimento 24h e produção sob demanda.',
  heroTitulo: 'Óleo BPF e combustíveis industriais para sua operação não parar',
  heroTexto: 'Fornecimento para caldeiras, usinas de asfalto e fundições em São Paulo, Minas Gerais e Paraná — com frota própria, produção sob demanda e atendimento 24 horas.',
};

export const CONTATO = {
  title: 'Contato | Solicite Cotação de Óleo Combustível | Nuxem',
  description: 'Solicite sua cotação de óleo BPF e combustíveis industriais. Atendimento 24h pelo WhatsApp, telefone ou e-mail. Entrega em SP, MG e PR.',
};

export const COBERTURA = [
  {
    slug: 'sao-paulo',
    nome: 'São Paulo',
    uf: 'SP',
    chamada: 'Operação principal, com entrega programada e atendimento 24h em todo o estado.',
    cidades: 'São Paulo, Campinas, Sorocaba, Jundiaí, Piracicaba, Ribeirão Preto, Santos, São José dos Campos e interior',
  },
  {
    slug: 'minas-gerais',
    nome: 'Minas Gerais',
    uf: 'MG',
    chamada: 'Fornecimento de óleo BPF e combustíveis industriais para o polo metalúrgico, usinas de asfalto e caldeiras mineiras.',
    cidades: 'Belo Horizonte, Betim, Contagem, Uberlândia, Juiz de Fora, Ipatinga, Divinópolis e região metropolitana',
  },
  {
    slug: 'parana',
    nome: 'Paraná',
    uf: 'PR',
    chamada: 'Entrega com frota própria para caldeiras, fornos e usinas de asfalto em todo o estado, com apoio no polo de Araucária.',
    cidades: 'Curitiba, Araucária, Ponta Grossa, Londrina, Maringá, São José dos Pinhais, Cascavel e região metropolitana',
  },
];

export const PILAR = {
  slug: 'guia-oleo-bpf',
  title: 'Óleo BPF: Tudo que Sua Indústria Precisa Saber | Guia Completo | Nuxem',
  description: 'Guia completo sobre óleo BPF: o que é, tipos (B1, A1, BTE, Xisto), aplicações em caldeiras, usinas de asfalto e fundições, como escolher e armazenar. Tudo que sua indústria precisa saber.',
  h1: 'Óleo BPF: Tudo que Sua Indústria Precisa Saber',
  resumo: 'Guia completo sobre o principal combustível industrial do Brasil. Saiba o que é, como escolher, onde usar e como garantir o melhor fornecimento para sua operação térmica.',
  secoes: [
    {
      titulo: 'O que é Óleo BPF?',
      paragrafos: [
        'Óleo BPF significa Baixo Ponto de Fluidez. É um combustível industrial derivado de petróleo, classificado pela ANP como óleo combustível pesado, utilizado principalmente em processos de geração de energia térmica em caldeiras, fornos, usinas de asfalto e fundições.',
        'O poder calorífico, o ponto de fluidez e a viscosidade devem ser confirmados para o produto fornecido. A denominação comercial BPF não define sozinha as condições de bombeamento ou atomização.',
        'A ANP apresenta a Resolução nº 899/2022 como referência para óleos combustíveis. As classes A e B distinguem requisitos de enxofre e viscosidade; consulte a especificação vigente na compra.',
      ],
    },
    {
      titulo: 'Tipos de Óleo BPF e Combustíveis Relacionados',
      paragrafos: [
        'Existem diferentes tipos de óleo combustível industrial, cada um com características específicas de viscosidade, teor de enxofre e poder calorífico. A escolha do tipo certo depende do equipamento, da aplicação e das exigências ambientais da sua operação.',
      ],
      lista: [
        { texto: 'Óleo BPF — padrão industrial, alto poder calorífico, ideal para caldeiras e fornos', link: '/produtos/oleo-bpf/' },
        { texto: 'Óleo APF — verificar ponto de fluidez, viscosidade e necessidade de aquecimento', link: '/produtos/oleo-apf/' },
        { texto: 'Óleo B1 (OC-B1) — baixo teor de enxofre (máx 1%), ideal para indústrias com restrição ambiental', link: '/produtos/oleo-b1/' },
        { texto: 'Óleo A1 (OC-A1) — maior teor de enxofre, alta carga energética contínua', link: '/produtos/oleo-a1/' },
        { texto: 'Óleo de Xisto (OTE) — consulte especificações e compatibilidade com o equipamento', link: '/produtos/oleo-de-xisto/' },
        { texto: 'Óleo BTE — confirmar teor de enxofre, origem e especificação do produto', link: '/produtos/oleo-bte/' },
        { texto: 'Óleos Alternativos — viscosidades variadas, sob medida para seu equipamento', link: '/produtos/oleos-alternativos/' },
      ],
    },
    {
      titulo: 'Aplicações Industriais do Óleo BPF',
      paragrafos: [
        'O óleo BPF é amplamente utilizado em diversos segmentos industriais que dependem de geração de calor para seus processos produtivos. Cada aplicação exige um perfil específico de combustível.',
      ],
      lista: [
        { texto: 'Caldeiras Industriais — geração de vapor para processos contínuos', link: '/solucoes/caldeiras/' },
        { texto: 'Usinas de Asfalto — secagem de agregados e produção de massa asfáltica', link: '/solucoes/usinas-de-asfalto/' },
        { texto: 'Fundições — alta carga térmica para fusão de metais', link: '/solucoes/fundicoes/' },
        { texto: 'Fornos Industriais — aquecimento de processos, secagem e tratamento térmico', link: '/solucoes/' },
        { texto: 'Secadores Industriais — aquecimento de ar para secagem de grãos e minerais', link: '/solucoes/' },
      ],
    },
    {
      titulo: 'Como Escolher o Óleo BPF Ideal',
      paragrafos: [
        'A escolha do óleo BPF ideal para sua operação depende de alguns fatores técnicos fundamentais:',
        '1. Tipo de equipamento: queimador, caldeira, forno ou secador — cada um tem exigências diferentes de viscosidade e atomização.',
        '2. Temperatura de operação: a viscosidade do combustível precisa ser compatível com a temperatura de trabalho do sistema de aquecimento.',
        '3. Exigências ambientais: confronte o teor de enxofre documentado e as condições de queima com os limites aplicáveis à instalação. A denominação do combustível não garante conformidade.',
        '4. Infraestrutura de armazenamento: tanques, linhas aquecidas e bombas precisam estar dimensionados para o tipo de combustível.',
        '5. Regime de operação: operações contínuas 24h exigem fornecimento programado e suporte técnico permanente.',
        'A Nuxem oferece suporte técnico gratuito para ajudar na especificação correta do combustível para seu equipamento.',
      ],
    },
    {
      titulo: 'Armazenamento e Manuseio Seguro',
      paragrafos: [
        'O armazenamento adequado do óleo BPF é essencial para preservar suas características e garantir segurança operacional:',
        '- Dimensione o estoque útil e a reserva considerando consumo, prazo de entrega e capacidade operacional do tanque.',
        '- Defina o aquecimento conforme a curva de viscosidade do produto e os limites de bombas, linhas e queimadores.',
        '- Consulte o ponto de fulgor e as medidas de segurança na documentação do produto; controle fontes de ignição conforme o projeto da instalação.',
        '- A manutenção periódica dos tanques evita acúmulo de borra e contaminação do combustível.',
        '- Sistemas de contenção e drenagem devem seguir as normas ambientais vigentes.',
      ],
    },
    {
      titulo: 'Logística e Fornecimento',
      paragrafos: [
        'Uma operação térmica contínua não pode parar por falta de combustível. Por isso, a logística de fornecimento é tão importante quanto a qualidade do produto.',
        'A Nuxem trabalha com frota própria e produção sob demanda em São Paulo, Minas Gerais e Paraná, oferecendo:',
        '- Entrega programada conforme o consumo da sua planta',
        '- Atendimento 24 horas para emergências',
        '- Rastreabilidade completa de cada carga',
        '- Suporte técnico na especificação e no acompanhamento',
        '- Padrão constante de qualidade entre entregas',
      ],
    },
    {
      titulo: 'Perguntas Frequentes (FAQ)',
      ehFaq: true,
      perguntas: [
        { p: 'Qual a diferença entre óleo BPF e óleo APF?', r: 'BPF significa Baixo Ponto de Fluidez e APF significa Alto Ponto de Fluidez. As siglas não substituem os valores da ficha técnica. Compare ponto de fluidez e viscosidade na mesma temperatura antes de definir aquecimento e uso.' },
        { p: 'Óleo BPF é inflamável?', r: 'O óleo BPF é um combustível e exige cuidados contra incêndio. Consulte a classificação de perigo e o ponto de fulgor na ficha de dados de segurança do produto fornecido. Não use o ponto de fulgor isoladamente para concluir que não existe risco de incêndio; siga as orientações de armazenamento e manuseio dessa ficha.' },
        { p: 'Qual o poder calorífico do óleo BPF?', r: 'Solicite o valor do produto cotado em kcal/kg ou MJ/kg, com identificação de PCS ou PCI. Use a mesma base ao comparar propostas ou estimar consumo.' },
        { p: 'Precisa aquecer o óleo BPF para usar?', r: 'A necessidade e a temperatura de aquecimento dependem da viscosidade do produto, do ambiente e dos limites de bombas e queimadores. Consulte a documentação e o fabricante do equipamento.' },
        { p: 'Qual a diferença entre BPF A1 e B1?', r: 'A1 pertence à classe de maior teor de enxofre; B1, à de menor teor. Confirme os limites vigentes e os dados do produto ofertado. A escolha também deve atender às exigências ambientais da instalação.' },
        { p: 'Quanto tempo dura o óleo BPF armazenado?', r: 'A condição de uso após armazenamento depende do produto, do tempo e do controle de água, sedimentos e temperatura. Consulte a orientação do fornecedor e avalie o combustível antes de usar um estoque antigo.' },
      ],
    },
  ],
};
