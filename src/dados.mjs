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
    "h1": "Fornecedor de óleo BPF para indústria em SP, MG e PR",
    "imagem": "produto-oleo-bpf.webp",
    "imagemAlt": "Imagem ilustrativa de óleo combustível para uso industrial",
    "resumo": "Óleo combustível para caldeiras, fornos e usinas de asfalto. Compare classe, viscosidade, enxofre e custo entregue.",
    "title": "Óleo BPF: preço, cotação e fornecimento em SP, MG e PR | Nuxem",
    "description": "Cote óleo BPF a partir de 5.000 L por entrega em SP, MG e PR. Veja como comparar preço e frete e informe cidade, volume e consumo para a proposta.",
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
    "orientacao": "Informe a cidade de entrega, o equipamento, o consumo estimado e o volume desejado. Veja <a href=\"/blog/ficha-tecnica-fds-e-laudo-de-oleo-combustivel-como-ler-antes-de-comprar/\">como conferir ficha técnica, FDS e laudo</a> do produto cotado; confirme viscosidade, temperatura de ensaio, teor de enxofre e poder calorífico antes da compra. Consulte também o <a href=\"/guia-oleo-bpf/\">guia de óleo BPF</a> e as <a href=\"/cobertura/\">regiões atendidas</a>.",
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
    "title": "Óleo A1 (OCA1): especificação e cotação em SP, MG e PR | Nuxem",
    "description": "Óleo combustível A1 (OCA1) para caldeiras, fornos e usinas de asfalto em SP, MG e PR. Veja viscosidade e enxofre e peça cotação à Nuxem.",
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
    "h1": "Fornecedor de óleo de xisto OTE em SP, MG e PR",
    "imagem": "produto-oleo-bpf.webp",
    "imagemAlt": "Imagem ilustrativa de óleo combustível para uso industrial",
    "resumo": "Óleo de xisto OTE para caldeiras, fornos e usinas de asfalto. Consulte a especificação adequada à sua operação.",
    "title": "Óleo de Xisto (OTE): cotação em SP, MG e PR | Nuxem",
    "description": "Óleo de xisto (OTE) para caldeiras e fornos em SP, MG e PR, para consumo a partir de 200 mil L/mês. Veja especificação, preço e disponibilidade.",
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
    "orientacao": "Informe cidade de entrega, tipo de queimador, combustível atual e consumo estimado. Solicite a ficha técnica e a ficha de dados de segurança do produto cotado para avaliar a aplicação. Consulte o <a href=\"/guia-oleo-de-xisto/\">guia de óleo de xisto: origem e aplicações</a>, a <a href=\"/blog/comparacao-tecnica-oleo-de-xisto-bte-bpf-e-oleos-alternativos/\">comparação entre combustíveis industriais</a> e as <a href=\"/cobertura/\">regiões atendidas</a>.",
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
    resumo: 'Combustível com entrega programada conforme o consumo e o cronograma de produção da usina.',
    title: 'Óleo Combustível para Usina de Asfalto | SP, MG e PR | Nuxem',
    description: 'Óleo BPF e combustíveis industriais para usinas de asfalto em SP, MG e PR. Entrega programada com frota própria e atendimento 24h. Solicite cotação.',
    corpo: [
      'Em uma usina de asfalto, o combustível é o coração da produção: sem calor não há secagem de agregados, não há massa asfáltica e não há obra andando. Uma falha de abastecimento para a usina, atrasa o cronograma e gera custo em cascata.',
      'Por isso a Nuxem trata o fornecimento para usinas de asfalto como operação crítica. Trabalhamos com entrega programada e frota própria, para o combustível chegar quando a produção precisa — e com atendimento 24 horas para imprevistos, porque obra não espera.',
      'Fornecemos óleo BPF e alternativas de viscosidades diferentes, com produção sob demanda e padrão constante. Nossa equipe apoia a especificação correta para o seu queimador e o seu regime de produção, em São Paulo, Minas Gerais e Paraná.',
    ],
    secoes: [
      { titulo: 'Dados que a usina deve informar para cotar', paragrafos: [
        'Para uma proposta confiável, informe o consumo médio por turno ou por tonelada produzida, a capacidade do tanque, o modelo do queimador, o sistema de aquecimento do óleo e o endereço da usina. Com esses dados, a Nuxem indica o produto e organiza entregas compatíveis com o ritmo de produção.',
        'Se a usina já usa óleo BPF, informe também o tipo atual e o estoque remanescente. A troca de fornecedor deve considerar a <a href="/blog/compatibilidade-entre-lotes-de-oleo-bpf-como-evitar-borra-na-mistura/">compatibilidade entre lotes</a>.',
      ] },
      { titulo: 'Programação de entregas e continuidade da produção', paragrafos: [
        'O consumo de uma usina varia conforme a carteira de obras. Por isso o fornecimento é planejado todo mês e as entregas são programadas: no óleo BPF, a partir de 5.000 litros por entrega. Avise a Nuxem sempre que o cronograma de produção mudar.',
        'O artigo sobre <a href="/blog/como-programar-o-abastecimento-de-oleo-bpf-para-evitar-paradas/">como programar o abastecimento para evitar paradas</a> mostra como calcular estoque, autonomia e ponto de pedido.',
      ] },
      { titulo: 'Combustível do queimador, óleo térmico e CAP', paragrafos: [
        'São insumos diferentes da usina. O combustível alimenta o queimador do secador de agregados; o óleo térmico aquece o CAP e os tanques. Veja a diferença no artigo <a href="/blog/oleo-combustivel-oleo-termico-cap-usina-asfalto/">óleo combustível, óleo térmico e CAP na usina</a>.',
      ] },
    ],
    faq: [
      { p: 'Qual óleo combustível é usado em usina de asfalto?', r: 'O óleo BPF é uma opção comum para o queimador do secador de agregados. A escolha depende do queimador e da especificação aprovada para a instalação, e alternativas como o óleo de xisto (OTE) podem ser avaliadas caso a caso.' },
      { p: 'A Nuxem entrega em usinas de asfalto de Minas Gerais e do Paraná?', r: 'Sim. A Nuxem atende São Paulo, Minas Gerais e Paraná. O prazo e a disponibilidade são confirmados pelo endereço da usina.' },
      { p: 'Qual é o volume mínimo de fornecimento?', r: 'Para o óleo BPF, a partir de 5.000 litros por entrega, sob demanda e com planejamento mensal. Para o óleo de xisto OTE, o consumo deve ser de pelo menos 200 mil litros por mês.' },
    ],
    produtosRelacionados: ['oleo-bpf', 'oleos-alternativos', 'oleo-a1'],
    artigosRelacionados: ['oleo-bpf-para-usinas-de-asfalto', 'oleo-combustivel-oleo-termico-cap-usina-asfalto', 'oleo-de-xisto-para-usinas-de-asfalto', 'oleo-bpf-para-usinas-de-asfalto-no-triangulo-mineiro-e-interior-de-mg', 'logistica-de-abastecimento-de-oleo-bpf-entre-sp-mg-e-pr', 'como-programar-o-abastecimento-de-oleo-bpf-para-evitar-paradas'],
  },
  {
    slug: 'caldeiras',
    nome: 'Caldeiras industriais',
    imagem: 'caldeira.webp',
    imagemAlt: 'Caldeira industrial de geração de vapor com queimador',
    resumo: 'Queima estável e fornecimento contínuo para geração de vapor sem sustos.',
    title: 'Óleo Combustível para Caldeira Industrial | SP, MG e PR | Nuxem',
    description: 'Óleo BPF e combustíveis industriais para caldeiras, com fornecimento contínuo em SP, MG e PR. Atendimento 24h e frota própria. Peça sua cotação.',
    corpo: [
      'Caldeiras industriais operam em regime contínuo, e a estabilidade da queima impacta diretamente a produção de vapor, o consumo específico e a vida útil do equipamento. Variações no combustível aparecem na chama, no rendimento e na manutenção.',
      'A Nuxem fornece óleo BPF e óleos alternativos com padrão constante de qualidade, produzidos sob demanda. Apoiamos a especificação correta para o seu sistema: viscosidade de trabalho, aquecimento de linha, temperatura de atomização e rotina de operação.',
      'Com frota própria e atendimento 24 horas, planejamos o abastecimento conforme o consumo da caldeira. Consulte disponibilidade e programação para sua cidade em São Paulo, Minas Gerais ou Paraná.',
    ],
    secoes: [
      { titulo: 'Dados para especificar o combustível da caldeira', paragrafos: [
        'Informe o consumo de combustível por hora ou a produção de vapor, o regime de operação, o modelo do queimador, o sistema de aquecimento de linha e a capacidade do tanque. A especificação vem do equipamento, e o nome comercial do óleo não substitui a ficha técnica do produto cotado.',
        'O roteiro de <a href="/blog/como-especificar-o-oleo-combustivel-certo-para-seu-queimador/">especificação para o queimador</a> organiza esses dados antes da cotação.',
      ] },
      { titulo: 'Consumo, viscosidade e estabilidade da queima', paragrafos: [
        'O consumo depende da produção de vapor, do poder calorífico do combustível e do rendimento da caldeira. Veja a fórmula e um exemplo em <a href="/blog/como-calcular-consumo-de-oleo-combustivel-em-caldeiras/">como calcular o consumo de óleo em caldeiras</a>.',
        'A viscosidade na entrada do queimador afeta atomização e queima; entenda o efeito em <a href="/blog/impacto-da-viscosidade-do-oleo-bpf-na-eficiencia-da-queima/">viscosidade do óleo BPF e eficiência da queima</a>. Para caldeiras de vapor em têxteis, veja o caso de <a href="/blog/oleo-bpf-para-industria-textil-vapor-em-tinturarias-e-lavanderias/">tinturarias e lavanderias</a>.',
      ] },
      { titulo: 'Abastecimento contínuo', paragrafos: [
        'Caldeiras de operação contínua precisam de reposição planejada. A Nuxem programa as entregas conforme o consumo informado, com planejamento mensal, e atende São Paulo, Minas Gerais e Paraná. No Paraná, veja também o artigo sobre <a href="/blog/oleo-combustivel-para-caldeiras-no-parana-fornecimento-continuo/">combustível para caldeiras no Paraná</a>.',
      ] },
    ],
    faq: [
      { p: 'Qual óleo usar em caldeira industrial?', r: 'Depende do queimador e da instalação. O óleo BPF é uma das opções mais consultadas, e alternativas como APF, B1, BTE ou xisto OTE devem ser avaliadas conforme a especificação aprovada para o equipamento.' },
      { p: 'Como calcular quanto óleo a caldeira consome?', r: 'Divida a energia necessária para produzir o vapor pelo poder calorífico do combustível e pelo rendimento da caldeira. O artigo de cálculo de consumo traz a fórmula e um exemplo numérico.' },
      { p: 'Vale trocar o combustível da caldeira por óleo de xisto?', r: 'Depende do custo entregue, da compatibilidade do queimador e do consumo da planta. O xisto OTE exige consumo a partir de 200 mil litros por mês. Compare as opções antes de decidir.' },
    ],
    produtosRelacionados: ['oleo-bpf', 'oleo-apf', 'oleo-b1', 'oleo-bte'],
    artigosRelacionados: ['como-especificar-o-oleo-combustivel-certo-para-seu-queimador', 'como-calcular-consumo-de-oleo-combustivel-em-caldeiras', 'impacto-da-viscosidade-do-oleo-bpf-na-eficiencia-da-queima', 'oleo-bpf-para-industria-textil-vapor-em-tinturarias-e-lavanderias', 'oleo-combustivel-para-caldeiras-no-parana-fornecimento-continuo'],
  },
  {
    slug: 'fundicoes',
    nome: 'Fundições',
    imagem: 'fundicao.webp',
    imagemAlt: 'Forno de fundição vertendo metal incandescente',
    resumo: 'Alta carga térmica com consistência de processo e fornecimento confiável.',
    title: 'Óleo Combustível para Fundição | SP, MG e PR | Nuxem',
    description: 'Combustível industrial para fundições e fornos de alta temperatura em SP, MG e PR. Óleo BPF com qualidade constante, frota própria e suporte técnico.',
    corpo: [
      'Fundições trabalham com as cargas térmicas mais exigentes da indústria. A consistência do processo depende de um combustível com padrão estável: variações de qualidade aparecem em comportamento de queima, controle de temperatura e paradas não planejadas.',
      'A Nuxem fornece óleo BPF e alternativas de viscosidades diferentes para fornos de fundição, com produção sob demanda e qualidade constante entre entregas — o que protege a repetibilidade do seu processo.',
      'Com atendimento 24 horas e frota própria, organizamos o fornecimento conforme a demanda e a programação da fundição. Atendemos São Paulo, Minas Gerais e Paraná, com suporte técnico na especificação e confirmação das condições de entrega.',
      'Antes da cotação, veja <a href="/blog/oleo-combustivel-para-fundicao-como-escolher-e-avaliar-o-fornecimento/">como avaliar o combustível e o fornecimento para fundição</a>: tipo de forno, regime por batelada ou contínuo, consumo específico e requisitos do queimador.',
    ],
    secoes: [
      { titulo: 'Forno e regime de operação', paragrafos: [
        'Informe o tipo de forno, se a operação é por batelada ou contínua, a frequência de partidas, o consumo e o modelo do queimador. Esses dados definem o produto e o ritmo de reposição; o nome do setor, sozinho, não descreve a exigência térmica.',
        'O artigo <a href="/blog/oleo-combustivel-para-fundicao-como-escolher-e-avaliar-o-fornecimento/">óleo combustível para fundição: como escolher e avaliar o fornecimento</a> detalha o que conferir.',
      ] },
      { titulo: 'Qualidade constante entre entregas', paragrafos: [
        'Na fundição, a repetibilidade do processo depende de combustível com padrão estável. Ao trocar de fornecedor ou de lote, avalie a mistura com o estoque do tanque e registre cada recebimento. Veja os cuidados em <a href="/blog/compatibilidade-entre-lotes-de-oleo-bpf-como-evitar-borra-na-mistura/">compatibilidade entre lotes de óleo BPF</a>.',
      ] },
      { titulo: 'Atendimento em SP, MG e PR', paragrafos: [
        'A Nuxem atende fundições em São Paulo, Minas Gerais e Paraná, com atendimento 24 horas e frota própria. Para o polo metalúrgico de Minas, veja o artigo sobre <a href="/blog/oleo-bpf-para-o-polo-metalurgico-de-betim-e-contagem-mg/">óleo BPF em Betim e Contagem</a>.',
      ] },
    ],
    faq: [
      { p: 'Que combustível usar em forno de fundição?', r: 'O óleo BPF é uma das opções para fornos de fundição, mas a escolha depende do tipo de forno, do queimador e da especificação aprovada pela engenharia da planta. Confirme a ficha técnica do produto cotado.' },
      { p: 'Como evitar variação de qualidade entre as entregas?', r: 'Peça a identificação do produto e a documentação a cada entrega, registre os recebimentos e avalie a mistura com o estoque do tanque antes de trocar de fornecedor.' },
      { p: 'A Nuxem atende fundições fora de São Paulo?', r: 'Sim. A Nuxem atende São Paulo, Minas Gerais e Paraná, e confirma prazo e disponibilidade pelo endereço da fundição.' },
    ],
    produtosRelacionados: ['oleo-bpf', 'oleos-alternativos'],
    artigosRelacionados: ['compatibilidade-entre-lotes-de-oleo-bpf-como-evitar-borra-na-mistura', 'reducao-de-custos-com-substituicao-de-oleo-combustivel', 'como-especificar-o-oleo-combustivel-certo-para-seu-queimador', 'oleo-bpf-para-o-polo-metalurgico-de-betim-e-contagem-mg'],
  },
  {
    slug: 'fornos-e-secadores',
    nome: 'Fornos e secadores industriais',
    imagem: 'forno-industrial.webp',
    imagemAlt: 'Forno industrial de alta temperatura',
    resumo: 'Combustível para fornos, estufas e secadores, com especificação alinhada ao queimador e ao processo.',
    title: 'Óleo Combustível para Fornos e Secadores | SP, MG e PR | Nuxem',
    description: 'Óleo BPF e óleo de xisto para fornos, estufas e secadores industriais em SP, MG e PR. Informe queimador e consumo e solicite cotação à Nuxem.',
    corpo: [
      'Fornos, estufas e secadores trabalham com cargas térmicas e arranjos de combustão muito diferentes. Por isso o combustível deve ser avaliado pelo processo e pelo queimador, e não apenas pela temperatura de trabalho.',
      'A Nuxem fornece óleo BPF e óleos alternativos, e o óleo de xisto (OTE) para consumos a partir de 200 mil litros por mês. Atendemos São Paulo, Minas Gerais e Paraná, com frota própria, produção sob demanda e atendimento 24 horas.',
    ],
    secoes: [
      { titulo: 'Aquecimento direto ou indireto', paragrafos: [
        'Informe se os gases de combustão entram em contato com o material ou se há um sistema intermediário de transferência de calor. Um combustível aprovado em um arranjo não fica automaticamente aprovado em outro, e o critério de qualidade do material processado deve constar na avaliação.',
        'O roteiro de <a href="/blog/queima-de-oleo-de-xisto-ote-atomizacao-e-ajuste-de-queimador/">atomização e ajuste do queimador para xisto OTE</a> ajuda a separar essas condições.',
      ] },
      { titulo: 'Dados para a cotação', paragrafos: [
        'Envie cidade, aplicação, modelo do equipamento, combustível atual, regime de operação e consumo. Informe se a instalação já está aprovada para o produto ou se a consulta faz parte de um estudo.',
        'Para secadores e estufas agrícolas, veja os artigos sobre <a href="/blog/oleo-combustivel-para-estufas-e-secadores-agricolas/">estufas e secadores agrícolas</a> e <a href="/blog/oleo-combustivel-para-estufas-e-secadores-agricolas-no-parana/">secadores no Paraná</a>. Para cerâmica, veja <a href="/blog/oleo-bpf-para-a-industria-ceramica-fornos-secadores-e-abastecimento/">fornos e secadores cerâmicos com óleo de xisto</a>.',
      ] },
      { titulo: 'Como comparar o resultado no processo', paragrafos: [
        'Compare o consumo para a mesma entrega térmica ou a mesma produção, incluindo os critérios de qualidade do material. Considere os custos de adaptação e de auxiliares, como descreve a <a href="/blog/reducao-de-custos-com-substituicao-de-oleo-combustivel/">análise de custo de substituição de combustível</a>.',
      ] },
    ],
    faq: [
      { p: 'Qual combustível usar em forno ou secador industrial?', r: 'Depende do queimador, do regime de operação e do processo. O óleo BPF e o óleo de xisto OTE são opções para consulta, sempre confirmadas pela ficha técnica e pela aprovação da engenharia da planta.' },
      { p: 'O óleo de xisto serve para fornos e secadores?', r: 'Pode ser avaliado para fornos e secadores, desde que o queimador e o processo sejam compatíveis. O fornecimento da Nuxem exige consumo a partir de 200 mil litros por mês e planejamento mensal.' },
      { p: 'A Nuxem atende estufas e secadores agrícolas?', r: 'Sim, em São Paulo, Minas Gerais e Paraná. Informe o endereço, o equipamento e o consumo para confirmar produto, prazo e disponibilidade.' },
    ],
    produtosRelacionados: ['oleo-bpf', 'oleo-de-xisto', 'oleos-alternativos'],
    artigosRelacionados: ['oleo-de-xisto-para-fornos-e-secadores-industriais', 'oleo-combustivel-para-estufas-e-secadores-agricolas', 'oleo-bpf-para-a-industria-ceramica-fornos-secadores-e-abastecimento', 'queima-de-oleo-de-xisto-ote-atomizacao-e-ajuste-de-queimador'],
  },
];

// Artigos de setor que reúnem óleo BPF e óleo de xisto (fusão de 09/11/2026).
export const SETORES_BPF_XISTO = ['oleo-bpf-para-a-industria-de-papel-e-celulose', 'oleo-bpf-para-industria-textil-vapor-em-tinturarias-e-lavanderias', 'oleo-bpf-para-a-industria-ceramica-fornos-secadores-e-abastecimento', 'oleo-bpf-para-laticinios-e-agroindustria-de-leite-em-mg', 'oleo-bpf-para-geracao-de-vapor-na-industria-de-alimentos'];

export const HOME = {
  title: 'Fornecedor de Óleo BPF e Óleo de Xisto em SP, MG e PR | Nuxem',
  description: 'Óleo BPF, óleo de xisto e combustíveis industriais para caldeiras, usinas de asfalto e fundições em SP, MG e PR. Frota própria e atendimento 24h.',
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
    title: 'Óleo BPF e Óleo de Xisto em São Paulo | Fornecedor | Nuxem',
    description: 'Fornecedor de óleo BPF e óleo de xisto em São Paulo, com base em Salto. Frota própria, atendimento 24h e cotação por cidade. Solicite sua proposta.',
    h1: 'Fornecedor de óleo BPF e óleo de xisto em São Paulo',
    resumo: 'A Nuxem opera a partir de Salto/SP e atende indústrias de todo o estado com frota própria, produção sob demanda e atendimento 24 horas.',
    paragrafos: [
      'São Paulo é a operação principal da Nuxem: a sede e a base de distribuição ficam em Salto, no interior do estado. A partir dela, a frota própria atende caldeiras, usinas de asfalto, fundições, fornos e secadores de toda a região.',
      'Para o óleo BPF, o fornecimento é feito a partir de 5.000 litros por entrega, sob demanda e com planejamento mensal. Até 200 km de Salto, a entrega ocorre no mesmo dia ou em até 1 dia útil, mediante confirmação da programação. Fora desse raio, prazo e disponibilidade são confirmados na cotação.',
      'O óleo de xisto (OTE) atende consumos a partir de 200 mil litros por mês, com planejamento mensal obrigatório e disponibilidade sob consulta. Os prazos do BPF não se aplicam automaticamente ao xisto.',
    ],
    aplicacoes: ['usinas-de-asfalto', 'caldeiras', 'fundicoes', 'fornos-e-secadores'],
    polos: 'Entre os polos industriais atendidos estão Campinas, Sorocaba, Jundiaí, Piracicaba, Ribeirão Preto, Santos, São José dos Campos e a região de Santa Gertrudes, polo cerâmico do interior paulista.',
    artigos: ['oleo-de-xisto-ote-para-o-polo-ceramico-de-santa-gertrudes-sp', 'oleo-de-xisto-ote-assistencia-tecnica-e-abastecimento-em-sp-mg-pr', 'logistica-de-abastecimento-de-oleo-bpf-entre-sp-mg-e-pr', 'preco-oleo-bpf-posto-fabrica-comparar-propostas'],
    faq: [
      { p: 'A Nuxem entrega óleo BPF em todo o estado de São Paulo?', r: 'Sim. A Nuxem atende indústrias de todo o estado. Até 200 km de Salto, a entrega ocorre no mesmo dia ou em até 1 dia útil, mediante confirmação da programação; para outras cidades, o prazo é confirmado na cotação.' },
      { p: 'Qual é o pedido mínimo de óleo BPF em São Paulo?', r: 'A partir de 5.000 litros por entrega, sob demanda e com planejamento mensal.' },
      { p: 'Como solicitar uma cotação?', r: 'Informe produto, cidade, volume e consumo pelo formulário, pelo WhatsApp (11) 91501-1527 ou por e-mail. A equipe confirma especificação, documentação e programação para o seu endereço.' },
    ],
  },
  {
    slug: 'minas-gerais',
    nome: 'Minas Gerais',
    uf: 'MG',
    chamada: 'Fornecimento de óleo BPF e combustíveis industriais para o polo metalúrgico, usinas de asfalto e caldeiras mineiras.',
    cidades: 'Belo Horizonte, Betim, Contagem, Uberlândia, Juiz de Fora, Ipatinga, Divinópolis e região metropolitana',
    title: 'Fornecedor de Óleo BPF em Minas Gerais (MG) | Nuxem',
    description: 'Óleo BPF e óleo de xisto em Minas Gerais: Belo Horizonte, Betim, Contagem, Uberlândia e Juiz de Fora. Frota própria, atendimento 24h e cotação por endereço.',
    h1: 'Fornecedor de óleo BPF e óleo de xisto em Minas Gerais',
    resumo: 'Fornecimento para o polo metalúrgico, usinas de asfalto, caldeiras e laticínios mineiros, com cotação feita para o endereço da sua unidade.',
    paragrafos: [
      'A Nuxem atende Minas Gerais com frota própria e atendimento 24 horas, a partir da operação de Salto/SP. O fornecimento cobre a região metropolitana de Belo Horizonte, Betim e Contagem, o Triângulo Mineiro, Juiz de Fora, Ipatinga e Divinópolis.',
      'Prazo, frete e disponibilidade são confirmados por endereço: uma proposta para Betim não vale como referência para Uberlândia. Informe o município, o equipamento, o consumo e as condições de recebimento da unidade para receber uma cotação precisa.',
      'O óleo BPF é fornecido a partir de 5.000 litros por entrega, sob demanda e com planejamento mensal. O óleo de xisto (OTE) atende consumos a partir de 200 mil litros por mês, com disponibilidade sob consulta.',
    ],
    aplicacoes: ['usinas-de-asfalto', 'caldeiras', 'fundicoes', 'fornos-e-secadores'],
    polos: 'Os segmentos mais frequentes no estado são o polo metalúrgico de Betim e Contagem, as usinas de asfalto do Triângulo Mineiro e do interior, e a agroindústria de leite, que usa vapor de caldeira.',
    artigos: ['fornecedor-de-oleo-bpf-em-minas-gerais-como-escolher-certo', 'oleo-bpf-para-o-polo-metalurgico-de-betim-e-contagem-mg', 'oleo-bpf-para-usinas-de-asfalto-no-triangulo-mineiro-e-interior-de-mg', 'oleo-bpf-para-laticinios-e-agroindustria-de-leite-em-mg'],
    faq: [
      { p: 'A Nuxem fornece óleo BPF em Minas Gerais?', r: 'Sim. A Nuxem atende Minas Gerais com frota própria. Os prazos e as condições de entrega são confirmados pelo endereço industrial da unidade.' },
      { p: 'Quais cidades de Minas Gerais a Nuxem atende?', r: 'Belo Horizonte, Betim, Contagem, Uberlândia, Juiz de Fora, Ipatinga, Divinópolis e a região metropolitana, além de outras localidades consultadas por endereço.' },
      { p: 'O que informar para cotar em Minas Gerais?', r: 'Município e endereço industrial, equipamento, produto utilizado, consumo, quantidade desejada e restrições de recebimento. Com esses dados, a proposta confirma especificação, documentação e programação.' },
    ],
  },
  {
    slug: 'parana',
    nome: 'Paraná',
    uf: 'PR',
    chamada: 'Entrega com frota própria para caldeiras, fornos e usinas de asfalto em todo o estado, com apoio no polo de Araucária.',
    cidades: 'Curitiba, Araucária, Ponta Grossa, Londrina, Maringá, São José dos Pinhais, Cascavel e região metropolitana',
    title: 'Fornecedor de Óleo BPF no Paraná (PR) | Nuxem',
    description: 'Óleo BPF, BTE e óleo de xisto no Paraná: Curitiba, Araucária, Ponta Grossa, Londrina e Maringá. Frota própria, atendimento 24h e cotação por endereço.',
    h1: 'Fornecedor de óleo BPF e óleo de xisto no Paraná',
    resumo: 'Entrega para caldeiras, fornos, secadores e usinas de asfalto paranaenses, com apoio no polo de Araucária e programação por unidade.',
    paragrafos: [
      'A Nuxem atende todo o Paraná com frota própria e atendimento 24 horas, com apoio no polo de Araucária. O fornecimento cobre Curitiba e região metropolitana, Ponta Grossa, Londrina, Maringá, São José dos Pinhais e Cascavel.',
      'O estado de destino, sozinho, não determina o produto: a especificação vem do queimador e da instalação. A Nuxem fornece óleo BPF, BTE e alternativas, e o óleo de xisto (OTE) para consumos a partir de 200 mil litros por mês. Prazos são confirmados por endereço.',
      'O óleo BPF é fornecido a partir de 5.000 litros por entrega, sob demanda e com planejamento mensal. Em operações contínuas, como caldeiras, a reposição deve ser programada conforme o consumo da unidade.',
    ],
    aplicacoes: ['caldeiras', 'fornos-e-secadores', 'usinas-de-asfalto', 'fundicoes'],
    polos: 'No Paraná, as demandas mais frequentes vêm de caldeiras de vapor, de estufas e secadores agrícolas e de indústrias com restrição ambiental, que consultam o óleo BTE e o B1.',
    artigos: ['oleo-combustivel-para-caldeiras-no-parana-fornecimento-continuo', 'oleo-combustivel-para-estufas-e-secadores-agricolas-no-parana', 'oleo-bte-e-b1-no-parana-atendendo-restricoes-ambientais', 'vantagens-do-oleo-bte-para-industrias-com-restricao-ambiental'],
    faq: [
      { p: 'A Nuxem fornece óleo BPF no Paraná?', r: 'Sim. A Nuxem atende o Paraná com frota própria e apoio no polo de Araucária. Prazo e disponibilidade são confirmados pelo endereço da unidade.' },
      { p: 'A Nuxem fornece óleo BTE e B1 no Paraná?', r: 'Sim. O óleo BTE e o B1 podem ser consultados para operações com restrição ambiental. Confirme a ficha técnica e os requisitos da instalação na cotação.' },
      { p: 'Como solicitar uma cotação no Paraná?', r: 'Informe produto, cidade, volume e consumo pelo formulário, pelo WhatsApp (11) 91501-1527 ou por e-mail. A equipe confirma a programação para o seu endereço.' },
    ],
  },
];

export const PILAR = {
  slug: 'guia-oleo-bpf',
  title: 'Óleo BPF: o que é, para que serve e tipos | Nuxem',
  description: 'BPF significa Baixo Ponto de Fluidez: combustível industrial de caldeiras, fornos e usinas de asfalto. Veja tipos, classes ANP e como comparar antes de comprar.',
  h1: 'Óleo BPF: o que é, tipos e aplicações na indústria',
  resumo: 'Entenda o significado de BPF, onde o combustível é utilizado e como comparar os tipos e a especificação antes de comprar para caldeiras, fornos ou usinas de asfalto.',
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
        'Para interpretar a classificação, confira as <a href="/blog/oleo-b1-ocb1-o-que-e-diferencas-a1-a2-b2-e-quando-usar/">diferenças entre B1, B2 e A1</a>. Os limites de classe não substituem os resultados do produto fornecido.',
      ],
      lista: [
        { texto: 'Óleo BPF — padrão industrial, alto poder calorífico, ideal para caldeiras e fornos', link: '/produtos/oleo-bpf/' },
        { texto: 'Óleo APF — verificar ponto de fluidez, viscosidade e necessidade de aquecimento', link: '/produtos/oleo-apf/' },
        { texto: 'Óleo B1 (OCB1) — máximo de 1,0% em massa de enxofre; avaliar os requisitos ambientais da instalação', link: '/produtos/oleo-b1/' },
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
        'Em usinas de asfalto, veja como relacionar <a href="/blog/oleo-bpf-para-usinas-de-asfalto/">consumo de óleo BPF, compatibilidade do queimador e planejamento do abastecimento</a> com a campanha de produção.',
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
        'Para comprar, consulte as condições de <a href="/produtos/oleo-bpf/#cotacao-bpf">fornecimento e cotação de óleo BPF</a>. A Nuxem atende pedidos a partir de 5.000 litros por entrega, sob demanda e com planejamento mensal.',
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
