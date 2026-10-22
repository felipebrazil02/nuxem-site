// Aviso sobre a navegação e os canais efetivamente implementados neste site.
// Não presume prazos internos de retenção nem práticas fora do site.
export function conteudoPrivacidade(empresa) {
  return `<div class="pagina-topo"><div class="container">
  <h1>Privacidade e uso de dados no site da Nuxem</h1>
  <p class="resumo">Informações sobre os contatos iniciados pelo site, medição de acesso e suas preferências de cookies.</p>
</div></div>
<section><div class="container artigo">
  <p>Atualizado em 22 de outubro de 2026. Este aviso descreve a navegação em <strong>nuxemoil.com.br</strong> e os canais de contato disponíveis no site.</p>
  <h2>Quem atende suas solicitações</h2>
  <p>O site apresenta os produtos e serviços da Nuxem Comércio e Transporte de Óleos LTDA, CNPJ ${empresa.cnpj}, com endereço em ${empresa.endereco}. Para dúvidas ou solicitações sobre seus dados, escreva para <a href="mailto:${empresa.email}">${empresa.email}</a>.</p>
  <h2>Informações para solicitar uma cotação</h2>
  <p>O formulário solicita nome, empresa, produto, cidade e estado de entrega. Você pode também informar telefone, consumo, volume, aplicação e uma mensagem. Esses dados ajudam a equipe a entender a demanda e responder ao pedido de cotação. Evite inserir documentos pessoais, senhas ou outras informações que não sejam necessárias ao atendimento.</p>
  <p>Ao selecionar “Continuar cotação no WhatsApp”, o site prepara uma mensagem e abre o WhatsApp. O envio da mensagem depende da sua confirmação no próprio WhatsApp. O formulário não registra uma solicitação em um servidor do site. Se você optar pelo e-mail ou telefone, o contato ocorre pelo canal escolhido.</p>
  <h2>Google Analytics e eventos de contato</h2>
  <p>Usamos o Google Analytics para entender a navegação e as interações com os canais de atendimento. Os eventos de contato configurados pelo site identificam o tipo de ação, o canal, a posição do botão, o código do produto e o endereço da página sem os parâmetros de consulta. Os campos preenchidos no formulário, como nome, telefone e mensagem, não são incluídos nesses eventos.</p>
  <p>A medição de um clique ou da abertura do WhatsApp indica uma intenção de contato; não comprova o envio da mensagem, uma proposta ou uma venda.</p>
  <h2>Cookies e suas escolhas</h2>
  <p>Você pode aceitar ou recusar cookies pelo aviso de privacidade. O site começa com o armazenamento de Analytics e publicidade negado e atualiza a escolha quando você usa os botões do aviso. A preferência é lembrada no armazenamento local do navegador, na chave <code>nuxem_consent_v1</code>.</p>
  <p>Ao aceitar todos, você permite o armazenamento de cookies de medição e publicidade pelo Google. Ao recusar, o modo de consentimento mantém esse armazenamento negado; a tag do Google pode transmitir sinais de medição limitados, sem cookies. Recusar cookies não impede a consulta aos produtos nem o contato com a Nuxem.</p>
  <p>Para rever sua escolha, use <strong>“Preferências de privacidade”</strong> no rodapé. Uma nova escolha vale para o funcionamento futuro da tag; não apaga automaticamente dados anteriormente processados. Você também pode administrar cookies e armazenamento nas configurações do seu navegador.</p>
  <h2>Serviços utilizados e links externos</h2>
  <p>O site é hospedado na Netlify e utiliza a tag do Google para medição. O acesso ao site envolve o processamento de informações técnicas necessárias à conexão, como o endereço IP. Os provedores também descrevem seus próprios tratamentos de dados em suas políticas.</p>
  <p>Ao abrir o WhatsApp ou outro serviço externo, o uso daquele serviço segue também as regras do respectivo provedor. Consulte as informações de privacidade do <a href="https://policies.google.com/privacy" rel="noopener noreferrer">Google</a>, da <a href="https://www.netlify.com/privacy/" rel="noopener noreferrer">Netlify</a> e do <a href="https://www.whatsapp.com/legal/privacy-policy" rel="noopener noreferrer">WhatsApp</a>.</p>
  <h2>Dúvidas e solicitações sobre seus dados</h2>
  <p>Para pedir informações sobre dados relacionados ao seu atendimento, sua utilização ou prazo de conservação, ou solicitar acesso, correção ou exclusão quando aplicável, entre em contato por <a href="mailto:${empresa.email}">${empresa.email}</a>. Informe apenas o necessário para localizar o atendimento. A equipe poderá precisar confirmar sua identidade antes de responder.</p>
  <p>O prazo aplicável aos registros de atendimento deve ser informado pela equipe conforme o contexto da solicitação; esta página não estabelece um prazo único para todos os registros comerciais ou para os serviços externos.</p>
</div></section>`;
}
