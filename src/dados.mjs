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
        "OCA1 — viscosidade a 60 °C e enxofre",
        "Máximo 620 mm²/s; máximo 2,0% em massa de enxofre"
      ],
      [
        "OCB1 — viscosidade a 60 °C e enxofre",
        "Máximo 620 mm²/s; máximo 1,0% em massa de enxofre"
      ],
      [
        "OCA2 — viscosidade a 60 °C e enxofre",
        "Máximo 960 mm²/s; máximo 2,0% em massa de enxofre"
      ],
      [
        "OCB2 — viscosidade a 60 °C e enxofre",
        "Máximo 960 mm²/s; máximo 1,0% em massa de enxofre"
      ],
      [
        "Poder calorífico",
        "Solicitar PCS ou PCI em kcal/kg ou MJ/kg"
      ],
      [
        "Massa específica e ponto de fluidez",
        "Conferir os valores e as condições na documentação do produto"
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
    "notaSpecs": "BPF é uma denominação comercial ampla. As classes abaixo possuem limites diferentes de enxofre e viscosidade; confirme qual delas corresponde ao produto cotado. Referências: classificação ANP e manual técnico Petrobras.",
    "tituloSpecs": "Referências técnicas para especificar óleo BPF",
    "observacaoSpecs": "Os valores são limites das classes, não características universais de todo óleo BPF. O manual Petrobras consultado é a versão 1.4, de 15/01/2019; os limites de classe também são apresentados no glossário atual da ANP. Consulte ficha técnica, ficha de dados de segurança e certificado do fornecimento.",
    "documentos": [
      {
        "titulo": "ANP — classificação e regulamentação dos óleos combustíveis",
        "url": "https://www.gov.br/anp/pt-br/assuntos/producao-de-derivados-de-petroleo-e-processamento-de-gas-natural/producao-de-derivados-de-petroleo-e-processamento-de-gas-natural/oleo-combustivel"
      },
      {
        "titulo": "ANP — limites das classes OCA1, OCA2, OCB1 e OCB2",
        "url": "https://www.gov.br/anp/pt-br/acesso-a-informacao/glossario/o"
      },
      {
        "titulo": "Petrobras — Manual técnico de óleo combustível (versão 1.4, 15/01/2019, PDF)",
        "url": "https://petrobras.com.br/documents/2677942/3190768/manual-tecnico-oleo-combustivel-assistencia-tecnica-petrobras.pdf/7ff0d6b9-3f9f-95f6-2e57-6c6730e851ce?download=true&t=1691773221000&version=1.0"
      }
    ]
  },
  {
    "slug": "oleo-apf",
    "nome": "Óleo APF",
    "imagem": "produto-oleo-apf.webp",
    "imagemAlt": "Imagem ilustrativa de óleo combustível para uso industrial",
    "resumo": "Óleo combustível APF com resultados de análise disponíveis para consulta. Veja as propriedades da amostra e solicite cotação.",
    "title": "Óleo APF em SP, MG e PR | Especificação e Cotação | Nuxem",
    "description": "Consulte os resultados da análise do óleo APF: viscosidade, massa específica, enxofre, PCI e PCS. Atendimento em SP, MG e PR. Solicite cotação.",
    "specs": [
      [
        "Aspecto",
        "Turvo"
      ],
      [
        "Cor",
        "Castanho"
      ],
      [
        "Massa específica a 20 °C",
        "860,0 kg/m³"
      ],
      [
        "Ponto de fulgor",
        "> 61,0 °C"
      ],
      [
        "Viscosidade cinemática a 60 °C",
        "28,0 cSt"
      ],
      [
        "Fluidez",
        "1,0 °C"
      ],
      [
        "Água e sedimentos",
        "0,1%"
      ],
      [
        "Enxofre",
        "< 0,5%"
      ],
      [
        "Poder calorífico inferior (PCI)",
        "10.200 kcal/kg"
      ],
      [
        "Poder calorífico superior (PCS)",
        "10.600 kcal/kg"
      ]
    ],
    "aplicacoes": "Caldeiras, fornos e outros processos térmicos industriais, mediante avaliação de compatibilidade e dos requisitos da instalação.",
    "corpo": [
      "O óleo APF fornecido pela Nuxem possui um documento de análise disponível nesta página. A tabela apresenta os resultados da amostra identificada como Óleo APF, de 1 litro, incluindo viscosidade, massa específica, ponto de fulgor e poder calorífico.",
      "Esses resultados ajudam a avaliar bombeamento, armazenamento e queima. A viscosidade foi medida a 60 °C; esse valor não deve ser interpretado como viscosidade à temperatura ambiente nem como garantia de uso sem aquecimento.",
      "A aplicação em caldeiras, fornos e usinas de asfalto depende dos limites do equipamento e dos requisitos da instalação. A Nuxem atende SP, MG e PR; informe o consumo, o volume e o endereço de entrega para consultar as condições de fornecimento."
    ],
    "criterio": "Resultados da amostra analisada, viscosidade e compatibilidade com a instalação.",
    "faq": [
      {
        "p": "Os valores da tabela valem para qualquer entrega?",
        "r": "A tabela reproduz resultados de uma amostra de 1 litro. Para a compra, confirme a ficha técnica e os dados do fornecimento; os resultados da amostra não são uma garantia universal de composição."
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
    "notaSpecs": "Fonte: Laudo de Análise — Óleo APF, Nuxem. Os resultados referem-se exclusivamente à amostra de 1 litro identificada no documento; não são limites garantidos para todos os fornecimentos.",
    "orientacao": "Informe cidade, volume, consumo estimado, combustível atual e modelo do queimador. Envie também os requisitos de aquecimento e as restrições da instalação. Consulte as <a href=\"/cobertura/\">regiões atendidas</a> e veja <a href=\"/blog/como-preparar-uma-solicitacao-de-cotacao-de-oleo-combustivel-industrial/\">como preparar os dados para uma cotação</a>.",
    "tituloSpecs": "Resultados da análise do óleo APF",
    "observacaoSpecs": "O documento não informa data de emissão ou número de lote, nem especifica a base dos percentuais de enxofre e de água e sedimentos. Consulte a documentação correspondente ao fornecimento para confirmar os valores aplicáveis. Os métodos de ensaio estão reproduzidos no PDF original; este laudo não substitui a ficha de dados de segurança.",
    "documentos": [
      {
        "titulo": "Consultar laudo de análise do APF — amostra de 1 litro (PDF)",
        "url": "/documentos/laudo-oleo-apf.pdf"
      }
    ]
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
        "Classificação",
        "OCB1"
      ],
      [
        "Viscosidade cinemática a 60 °C",
        "Máximo 620 mm²/s (cSt)"
      ],
      [
        "Teor de enxofre",
        "Máximo 1,0% em massa"
      ],
      [
        "Água e sedimentos",
        "Máximo 2,0% em volume"
      ],
      [
        "Ponto de fulgor",
        "Mínimo 66 °C"
      ],
      [
        "Massa específica a 20 °C",
        "Valor a informar na documentação do fornecimento"
      ],
      [
        "Poder calorífico",
        "Solicitar PCS ou PCI em kcal/kg ou MJ/kg"
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
    "notaSpecs": "Limites da Tabela 1 da Resolução ANP nº 899/2022 para a classe OCB1. São requisitos da classe, não resultados de análise de um lote. O manual técnico da Petrobras complementa as orientações de aplicação e manuseio.",
    "orientacao": "Informe cidade, volume, consumo estimado, combustível atual e modelo do queimador. Envie também os requisitos de aquecimento e as restrições da instalação. Consulte as <a href=\"/cobertura/\">regiões atendidas</a> e veja <a href=\"/blog/como-preparar-uma-solicitacao-de-cotacao-de-oleo-combustivel-industrial/\">como preparar os dados para uma cotação</a>.",
    "tituloSpecs": "Limites de referência da classe OCB1",
    "observacaoSpecs": "A seleção também depende das exigências ambientais da localidade e da instalação. Confirme os resultados do produto cotado, a ficha técnica e a ficha de dados de segurança. O manual Petrobras é a versão 1.4, de 15/01/2019; a referência regulatória dos limites acima é a Resolução ANP nº 899/2022.",
    "documentos": [
      {
        "titulo": "ANP — classificação e regulamentação dos óleos combustíveis",
        "url": "https://www.gov.br/anp/pt-br/assuntos/producao-de-derivados-de-petroleo-e-processamento-de-gas-natural/producao-de-derivados-de-petroleo-e-processamento-de-gas-natural/oleo-combustivel"
      },
      {
        "titulo": "ANP — limites das classes OCA1, OCA2, OCB1 e OCB2",
        "url": "https://www.gov.br/anp/pt-br/acesso-a-informacao/glossario/o"
      },
      {
        "titulo": "Resolução ANP nº 899/2022 — anexo, Tabela 1 (DOU, 23/11/2022, página 64)",
        "url": "https://pesquisa.in.gov.br/imprensa/servlet/INPDFViewer?captchafield=firstAccess&data=23%2F11%2F2022&jornal=515&pagina=64"
      },
      {
        "titulo": "Petrobras — Manual técnico de óleo combustível (versão 1.4, 15/01/2019, PDF)",
        "url": "https://petrobras.com.br/documents/2677942/3190768/manual-tecnico-oleo-combustivel-assistencia-tecnica-petrobras.pdf/7ff0d6b9-3f9f-95f6-2e57-6c6730e851ce?download=true&t=1691773221000&version=1.0"
      }
    ]
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
        "Classificação",
        "OCA1"
      ],
      [
        "Viscosidade cinemática a 60 °C",
        "Máximo 620 mm²/s (cSt)"
      ],
      [
        "Teor de enxofre",
        "Máximo 2,0% em massa"
      ],
      [
        "Água e sedimentos",
        "Máximo 2,0% em volume"
      ],
      [
        "Ponto de fulgor",
        "Mínimo 66 °C"
      ],
      [
        "Massa específica a 20 °C",
        "Valor a informar na documentação do fornecimento"
      ],
      [
        "Poder calorífico",
        "Solicitar PCS ou PCI em kcal/kg ou MJ/kg"
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
    "notaSpecs": "Limites da Tabela 1 da Resolução ANP nº 899/2022 para a classe OCA1. São requisitos da classe, não resultados de análise de um lote. O manual técnico da Petrobras complementa as orientações de aplicação e manuseio.",
    "orientacao": "Informe cidade, volume, consumo estimado, combustível atual e modelo do queimador. Envie também os requisitos de aquecimento e as restrições da instalação. Consulte as <a href=\"/cobertura/\">regiões atendidas</a> e veja <a href=\"/blog/como-preparar-uma-solicitacao-de-cotacao-de-oleo-combustivel-industrial/\">como preparar os dados para uma cotação</a>.",
    "tituloSpecs": "Limites de referência da classe OCA1",
    "observacaoSpecs": "A seleção também depende das exigências ambientais da localidade e da instalação. Confirme os resultados do produto cotado, a ficha técnica e a ficha de dados de segurança. O manual Petrobras é a versão 1.4, de 15/01/2019; a referência regulatória dos limites acima é a Resolução ANP nº 899/2022.",
    "documentos": [
      {
        "titulo": "ANP — classificação e regulamentação dos óleos combustíveis",
        "url": "https://www.gov.br/anp/pt-br/assuntos/producao-de-derivados-de-petroleo-e-processamento-de-gas-natural/producao-de-derivados-de-petroleo-e-processamento-de-gas-natural/oleo-combustivel"
      },
      {
        "titulo": "ANP — limites das classes OCA1, OCA2, OCB1 e OCB2",
        "url": "https://www.gov.br/anp/pt-br/acesso-a-informacao/glossario/o"
      },
      {
        "titulo": "Resolução ANP nº 899/2022 — anexo, Tabela 1 (DOU, 23/11/2022, página 64)",
        "url": "https://pesquisa.in.gov.br/imprensa/servlet/INPDFViewer?captchafield=firstAccess&data=23%2F11%2F2022&jornal=515&pagina=64"
      },
      {
        "titulo": "Petrobras — Manual técnico de óleo combustível (versão 1.4, 15/01/2019, PDF)",
        "url": "https://petrobras.com.br/documents/2677942/3190768/manual-tecnico-oleo-combustivel-assistencia-tecnica-petrobras.pdf/7ff0d6b9-3f9f-95f6-2e57-6c6730e851ce?download=true&t=1691773221000&version=1.0"
      }
    ]
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
        "Viscosidade a 60 °C — ASTM D445",
        "Máximo 48,0 cSt"
      ],
      [
        "Ponto de fulgor — ASTM D93",
        "Mínimo 66,0 °C"
      ],
      [
        "Ponto de fluidez — ABNT NBR 11349",
        "Máximo 9,0 °C"
      ],
      [
        "Enxofre total — ASTM D5453",
        "Máximo 1,0% em massa"
      ],
      [
        "Densidade relativa a 20/4 °C — ASTM D4052",
        "0,97 (adimensional)"
      ],
      [
        "Poder calorífico superior (PCS) — ASTM D240",
        "10.170 kcal/kg"
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
    "notaSpecs": "Dados publicados no catálogo oficial da Greca para o OTE. Os limites máximos e mínimos estão identificados abaixo; densidade relativa e PCS são valores publicados sem indicação de limite. Confirme a documentação do produto cotado.",
    "tituloSpecs": "Especificações de referência — OTE Greca",
    "observacaoSpecs": "Referência técnica do catálogo, não um laudo de lote da Nuxem. A densidade relativa é adimensional e não deve ser apresentada como massa específica em kg/m³. Solicite ficha técnica e ficha de dados de segurança para definir as condições de manuseio.",
    "documentos": [
      {
        "titulo": "Greca — catálogo oficial, especificações do OTE na página 34 (PDF)",
        "url": "https://www.grupogreca.com.br/wp-content/uploads/2024/05/catalogo-produtos-greca-asfaltos-web.pdf"
      },
      {
        "titulo": "Greca — página oficial do OTE",
        "url": "https://www.grupogreca.com.br/produto/ote/"
      }
    ]
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
        "Viscosidade",
        "10 a 90 mm²/s — temperatura de ensaio não informada no portfólio"
      ],
      [
        "Teor de enxofre",
        "0,4% em massa — valor publicado no portfólio"
      ],
      [
        "Ponto de fulgor",
        "Mínimo 66 °C"
      ],
      [
        "Descrição do produto",
        "Mistura principalmente de hidrocarbonetos aromáticos; líquido viscoso escuro"
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
    "notaSpecs": "Valores publicados no portfólio oficial de combustíveis da Braskem. A tabela do fabricante informa o ponto de fulgor como mínimo; não identifica o teor de enxofre como limite máximo nem apresenta a temperatura de ensaio da viscosidade.",
    "orientacao": "Informe cidade, volume, consumo estimado, combustível atual e modelo do queimador. Envie também os requisitos de aquecimento e as restrições da instalação. Consulte as <a href=\"/cobertura/\">regiões atendidas</a> e veja <a href=\"/blog/como-preparar-uma-solicitacao-de-cotacao-de-oleo-combustivel-industrial/\">como preparar os dados para uma cotação</a>.",
    "tituloSpecs": "Dados de referência — óleo BTE Braskem",
    "observacaoSpecs": "Confirme a especificação comercial do BTE ofertado, inclusive temperatura de ensaio, densidade e PCS ou PCI, antes de comparar propostas. O portfólio não substitui o certificado do fornecimento nem a ficha de dados de segurança.",
    "documentos": [
      {
        "titulo": "Braskem — portfólio de combustíveis, Óleo BTE na página 4 (PDF)",
        "url": "https://www.braskem.com.br/portal/Principal/arquivos/listas/13478/thumb.pdf"
      },
      {
        "titulo": "Braskem — óleo combustível BTE e ficha de segurança",
        "url": "https://www.braskem.com.br/usa/product-search?p=483"
      }
    ]
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
    "notaSpecs": "Esta página reúne opções de combustíveis, sem representar uma formulação única. A documentação deve corresponder ao produto identificado na proposta. Consulte as referências específicas de APF, OTE e BTE nas páginas abaixo.",
    "orientacao": "Informe cidade, volume, consumo estimado, combustível atual e modelo do queimador. Envie também os requisitos de aquecimento e as restrições da instalação. Consulte as <a href=\"/cobertura/\">regiões atendidas</a> e veja <a href=\"/blog/como-preparar-uma-solicitacao-de-cotacao-de-oleo-combustivel-industrial/\">como preparar os dados para uma cotação</a>.",
    "tituloSpecs": "Documentação para comparar as alternativas",
    "documentos": [
      {
        "titulo": "APF — resultados da amostra e laudo disponível",
        "url": "/produtos/oleo-apf/"
      },
      {
        "titulo": "OTE — especificações publicadas pela Greca",
        "url": "/produtos/oleo-de-xisto/"
      },
      {
        "titulo": "BTE — dados do portfólio Braskem",
        "url": "/produtos/oleo-bte/"
      }
    ],
    "observacaoSpecs": "Não existe uma ficha única para todos os óleos alternativos. Identifique o produto e confirme a ficha técnica, a ficha de dados de segurança e a compatibilidade com a instalação na cotação."
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
