<?php
declare(strict_types=1);

require dirname(__DIR__) . '/bootstrap.php';
rate_limit('chats_reply', 20, 60);

$input    = json_input();
$messages = $input['messages'] ?? [];
$userName = trim((string)($input['userName'] ?? ''));

// Collect the last few user messages for context
$lastMsg   = '';
$allText   = '';
if (is_array($messages)) {
    foreach ($messages as $m) {
        if (($m['role'] ?? '') === 'user') {
            $allText  .= ' ' . strtolower(trim((string)($m['content'] ?? '')));
            $lastMsg   = strtolower(trim((string)($m['content'] ?? '')));
        }
    }
}

$name = $userName ? ", {$userName}" : '';

// ---------------------------------------------------------------------------
// Keyword helpers
// ---------------------------------------------------------------------------
function has(string $haystack, array $needles): bool
{
    foreach ($needles as $n) {
        if (str_contains($haystack, $n)) return true;
    }
    return false;
}

// Use both last message and accumulated context for matching
$ctx = $lastMsg . ' ' . $allText;

// ---------------------------------------------------------------------------
// Greeting / apresentação
// ---------------------------------------------------------------------------
if (has($ctx, ['oi', 'olá', 'ola', 'hello', 'hi ', 'bom dia', 'boa tarde', 'boa noite', 'tudo bem', 'tudo bom'])) {
    $reply = "Olá{$name}! 👋 Sou a assistente virtual da **Sklyra**. Ajudo brasileiros nos EUA a crescerem digitalmente com sites profissionais, automações e presença no Google.\n\nO que você quer saber? Posso te contar sobre nossos **planos**, **serviços**, **prazo de entrega** ou fazer sua **auditoria gratuita**.";
    json_response(['reply' => $reply]);
}

// ---------------------------------------------------------------------------
// Preço / valor / investimento
// ---------------------------------------------------------------------------
if (has($ctx, ['preço', 'preco', 'valor', 'quanto custa', 'custa', 'custo', 'investimento', 'price', 'cost', 'quanto é', 'quanto e', 'cobram', 'cobra'])) {
    $reply = "Temos dois planos{$name}:\n\n**Essential Engine — \$997** (setup único + \$79/mês)\n• Site bilíngue premium de 1 a 3 páginas, mobile-first\n• Google Business Profile + SEO local\n• Copywriting em inglês e português\n• Botões de ação rápida: WhatsApp, ligação e formulário\n• Hospedagem, SSL, backups e ajustes mensais\n\n**Growth Engine — \$1.850** (setup único + \$129/mês)\n• Tudo do Essential + até 6 páginas bilíngues\n• Catálogo com filtros (produtos, pratos ou serviços)\n• Automações de IA e pré-atendimento com triagem de leads\n• SEO local avançado com análise de concorrência\n• Suporte prioritário\n\n💡 Agências americanas cobram \$3.500 a \$5.000 e levam 2 meses. Nós entregamos em **5 dias**.\n\nQuer fazer uma **auditoria gratuita** do seu negócio?";
    json_response(['reply' => $reply]);
}

// ---------------------------------------------------------------------------
// Planos / plano
// ---------------------------------------------------------------------------
if (has($ctx, ['plano', 'pacote', 'opção', 'opcao', 'essential', 'growth', 'qual plano', 'diferença', 'diferenca', 'melhor plano'])) {
    $reply = "Temos dois planos{$name}:\n\n🔹 **Essential Engine (\$997 + \$79/mês)** — Ideal para autônomos e serviços de casa: limpeza, handyman, pintores, estética. Site bilíngue de até 3 páginas com Google Maps e WhatsApp integrado.\n\n🔸 **Growth Engine (\$1.850 + \$129/mês)** — Ideal para restaurantes, lojas com catálogo, clínicas e reformas maiores. Inclui automações de IA, catálogo com filtros e SEO avançado.\n\nMe conta um pouco do seu negócio e te digo qual é o ideal para você.";
    json_response(['reply' => $reply]);
}

// ---------------------------------------------------------------------------
// Serviços
// ---------------------------------------------------------------------------
if (has($ctx, ['serviço', 'servico', 'serviços', 'servicos', 'fazem', 'oferecem', 'incluem', 'o que vocês', 'o que voces'])) {
    $reply = "A Sklyra oferece{$name}:\n\n🌐 **Sites institucionais e comerciais** — Criação ou reconstrução focada em conversão e velocidade\n\n📈 **Funis de conversão** — Estrutura com CTAs, prova social e métricas claras\n\n🤖 **Automação de atendimento** — WhatsApp, e-mail e formulários integrados e automatizados\n\n🔗 **Integração de sistemas** — Conexão entre site, CRM e processos internos\n\n⚡ **Otimização e performance** — Velocidade, SEO técnico e estrutura para escalar\n\nTrabalhamos exclusivamente com **brasileiros nos EUA**. Quer saber qual serviço faz mais sentido para o seu nicho?";
    json_response(['reply' => $reply]);
}

// ---------------------------------------------------------------------------
// Prazo / tempo / entrega
// ---------------------------------------------------------------------------
if (has($ctx, ['prazo', 'tempo', 'dias', 'quanto tempo', 'demora', 'entrega', 'deadline', 'how long', 'rápido', 'rapido'])) {
    $reply = "Nosso processo é fixo e rápido{$name} ⚡\n\n**5 dias úteis** para o site ir ao ar. Veja como funciona:\n\n1️⃣ **Briefing e onboarding** — Um formulário inteligente, sem calls longas\n2️⃣ **Copywriting bilíngue** — Inglês e português escritos para converter\n3️⃣ **Design e construção** — Mobile-first, feito para gerar ligações\n4️⃣ **SEO local + Google Maps** — Google Business Profile otimizado\n5️⃣ **Testes e lançamento** — Revisão, aprovação e apontamento do domínio\n\n⚠️ Se atrasar, o **primeiro mês é por nossa conta**.\n\nProjetos com catálogo e automações ficam prontos em até **10 dias úteis**.";
    json_response(['reply' => $reply]);
}

// ---------------------------------------------------------------------------
// Google / SEO / Maps
// ---------------------------------------------------------------------------
if (has($ctx, ['google', 'seo', 'mapa', 'maps', 'busca', 'aparecer', 'encontrar', 'ranquear', 'ranking', 'pesquisa'])) {
    $reply = "Sim{$name}, SEO local e Google Maps fazem parte de todos os nossos planos! 📍\n\n• **Google Business Profile** otimizado para buscas em inglês na sua cidade\n• Palavras-chave mapeadas para o seu nicho e região\n• Site configurado para aparecer nas buscas locais (Orlando, Miami, Boston, Newark e outras cidades)\n• **Garantia de 30 dias**: se em 30 dias você não receber contatos via Google, refazemos a otimização sem custo.\n\nOu seja — se o cliente pesquisar no Google por um serviço como o seu, você aparece. Quer fazer a auditoria gratuita da sua presença atual?";
    json_response(['reply' => $reply]);
}

// ---------------------------------------------------------------------------
// WhatsApp / automação / formulário
// ---------------------------------------------------------------------------
if (has($ctx, ['whatsapp', 'automação', 'automacao', 'automatizar', 'bot', 'formulário', 'formulario', 'atendimento', 'lead', 'crm'])) {
    $reply = "Boa pergunta{$name}! Automação é um dos nossos diferenciais 🤖\n\n• **Botão de WhatsApp** com link direto para você receber contatos instantaneamente\n• **Formulários de orçamento** que chegam no seu e-mail e/ou WhatsApp\n• **Automações de atendimento**: respostas automáticas, triagem de leads e pré-qualificação (plano Growth)\n• **Integração com CRM** para organizar seus contatos e acompanhar cada lead\n\nNo plano **Growth Engine** incluímos automações de IA para triagem de leads — você só fala com quem tem potencial real de fechar negócio.\n\nQuer entender como isso funcionaria no seu negócio?";
    json_response(['reply' => $reply]);
}

// ---------------------------------------------------------------------------
// Nicho / segmento / área de atuação
// ---------------------------------------------------------------------------
if (has($ctx, ['limpeza', 'cleaning', 'handyman', 'pintura', 'paint', 'landscaping', 'hvac', 'construção', 'construcao', 'reforma', 'home service', 'house cleaning', 'maid'])) {
    $reply = "Perfeito{$name}! Trabalhamos muito com **Home Services** nos EUA 🏠\n\nPara esse nicho, o **Essential Engine (\$997)** costuma ser o mais indicado:\n• Site bilíngue com fotos dos seus serviços\n• Botão de ligação direta e WhatsApp\n• Google Maps otimizado para quem busca \"cleaning service near me\" ou similar\n• Formulário de orçamento que chega direto no seu WhatsApp\n\nNossas estimativas para Home Services: **15 a 40 pedidos de orçamento/mês**. Fechando 25%, são 4 a 10 novos clientes por mês — um único contrato recorrente paga o setup no primeiro mês.\n\nQuer fazer a auditoria gratuita do seu negócio?";
    json_response(['reply' => $reply]);
}

if (has($ctx, ['restaurante', 'restaurant', 'comida', 'food', 'cardápio', 'cardapio', 'delivery', 'lanchonete', 'catering', 'truck'])) {
    $reply = "Ótimo{$name}! Temos experiência com **restaurantes e alimentação** nos EUA 🍽️\n\nPara esse segmento, recomendamos o **Growth Engine (\$1.850)**:\n• Cardápio digital bilíngue com fotos e filtros\n• Botão de reserva, delivery e pedido pelo WhatsApp\n• Google Maps otimizado para aparecer quando alguém pesquisa comida brasileira na sua cidade\n• Galeria de fotos que faz o cliente chegar já com vontade\n\nEstimativas para restaurantes: **100 a 300 cliques em \"Como chegar\"/mês**, além de visualizações do cardápio e ligações diretas.\n\nQuer ver um exemplo de site que fizemos para o segmento?";
    json_response(['reply' => $reply]);
}

if (has($ctx, ['estética', 'estetica', 'salão', 'salao', 'clínica', 'clinica', 'saúde', 'saude', 'beleza', 'beauty', 'consultoria', 'consultor', 'contador', 'contabilidade'])) {
    $reply = "Trabalhamos bastante com **Saúde, Estética e Serviços Profissionais**{$name} 💼\n\nPara esse nicho:\n• Site bilíngue com apresentação dos serviços e equipe\n• **Agendamento direto** pelo site ou WhatsApp\n• Google Maps otimizado para buscas locais em inglês\n• Prova social com depoimentos de clientes\n\nEstimativas: **10 a 25 pedidos de agendamento/mês** com site + Google Maps otimizados.\n\nO plano ideal depende de quantas páginas e se você precisa de automações. Quer fazer a auditoria gratuita?";
    json_response(['reply' => $reply]);
}

// ---------------------------------------------------------------------------
// Regiões / localização
// ---------------------------------------------------------------------------
if (has($ctx, ['orlando', 'miami', 'florida', 'flórida', 'boston', 'massachusetts', 'newark', 'new jersey', 'new york', 'nova york', 'eua', 'estados unidos', 'america', 'usa'])) {
    $reply = "Atendemos brasileiros em todo os **Estados Unidos**{$name} 🇺🇸\n\nNossas regiões com maior demanda:\n• **Flórida** — Orlando e Miami\n• **Massachusetts** — Boston e região\n• **New Jersey** — Newark e arredores\n• **New York** — Comunidades brasileiras em todo o estado\n\nMas atendemos qualquer cidade! O trabalho é 100% remoto — do briefing ao lançamento, tudo online, sem calls longas.\n\nSeu negócio está em qual cidade?";
    json_response(['reply' => $reply]);
}

// ---------------------------------------------------------------------------
// Auditoria / diagnóstico / gratuito
// ---------------------------------------------------------------------------
if (has($ctx, ['auditoria', 'diagnóstico', 'diagnostico', 'gratuito', 'grátis', 'gratis', 'free', 'análise', 'analise', 'avaliar', 'avaliação', 'avaliacao'])) {
    $reply = "Sim{$name}, oferecemos **auditoria gratuita e sem compromisso** 🎯\n\nO que analisamos:\n• Sua presença atual no Google (site e Google Maps)\n• O que concorrentes estão fazendo que você ainda não faz\n• Oportunidades de palavras-chave para o seu nicho e cidade\n• O que está travando seu crescimento digital\n\nPara agendar, é só clicar no botão **\"Quero minha auditoria gratuita\"** no site ou me contar seu nicho e cidade que eu já te direciono.\n\nQual é o seu negócio e onde você está nos EUA?";
    json_response(['reply' => $reply]);
}

// ---------------------------------------------------------------------------
// Garantia / contrato / cancelamento
// ---------------------------------------------------------------------------
if (has($ctx, ['garantia', 'contrato', 'cancelar', 'cancelamento', 'fidelidade', 'risco', 'devolução', 'devolucao', 'reembolso'])) {
    $reply = "Trabalhamos com **transparência total**{$name} ✅\n\n• **Sem contrato de fidelidade** — a mensalidade cobre hospedagem, ajustes e suporte. Cancele quando quiser.\n• **Garantia de entrega em 5 dias úteis** — se atrasar, o primeiro mês é por nossa conta.\n• **Garantia de performance de 30 dias** — se em 30 dias você não receber contatos via Google ou site, refazemos a otimização de palavras-chave sem custo.\n• **Auditoria gratuita antes de pagar qualquer coisa** — você avalia o valor antes de decidir.\n\nSem letras miúdas, sem surpresa.";
    json_response(['reply' => $reply]);
}

// ---------------------------------------------------------------------------
// Orçamento / quero contratar
// ---------------------------------------------------------------------------
if (has($ctx, ['orçamento', 'orcamento', 'contratar', 'fechar', 'começar', 'comecar', 'iniciar', 'quero', 'interest', 'next step', 'próximo passo'])) {
    $reply = "Ótimo{$name}! Vamos dar o próximo passo 🚀\n\nPara te enviar uma proposta personalizada, me conta:\n\n1. **Qual é o seu negócio?** (ex: limpeza, restaurante, clínica)\n2. **Em qual cidade você está nos EUA?**\n3. **Você já tem site?** (ou está começando do zero?)\n4. **Qual é o seu principal objetivo?** (mais ligações, mais leads, aparecer no Google...)\n\nCom isso, te indico o plano certo e agendamos a auditoria gratuita. Resposta em até **24 horas**.";
    json_response(['reply' => $reply]);
}

// ---------------------------------------------------------------------------
// Como funciona / processo
// ---------------------------------------------------------------------------
if (has($ctx, ['como funciona', 'processo', 'etapa', 'passo', 'briefing', 'onboarding', 'como é', 'como e', 'funciona', 'método', 'metodo'])) {
    $reply = "Nosso processo é simples e sem enrolação{$name} ⚡\n\n**1. Briefing inteligente** — Você preenche um formulário completo. Sem calls longas desnecessárias.\n**2. Copywriting bilíngue** — Nossa equipe escreve todos os textos em inglês e português. Você não escreve nada.\n**3. Design e construção** — Site mobile-first, rápido e focado em gerar contatos.\n**4. SEO local + Google Maps** — Google Business Profile otimizado para buscas em inglês na sua cidade.\n**5. Revisão e lançamento** — Você aprova, a gente aponta o domínio e coloca no ar.\n\n⏱️ Tudo isso em **5 dias úteis**. Se atrasar, o primeiro mês é grátis.\n\nQuer começar?";
    json_response(['reply' => $reply]);
}

// ---------------------------------------------------------------------------
// Pagamento / parcelamento
// ---------------------------------------------------------------------------
if (has($ctx, ['pagar', 'pagamento', 'parcel', 'cartão', 'cartao', 'pix', 'boleto', 'dólar', 'dolar', 'real', 'moeda'])) {
    $reply = "Sobre pagamento{$name}:\n\n• **Essential Engine**: \$997 à vista ou 2x de \$550\n• **Growth Engine**: \$1.850 à vista ou 2x de \$975\n• Mensalidade em USD via cartão de crédito ou transferência bancária\n\nAceitamos pagamentos internacionais sem complicação.\n\nQuer fazer a auditoria gratuita antes de decidir? É sem compromisso.";
    json_response(['reply' => $reply]);
}

// ---------------------------------------------------------------------------
// Suporte / manutenção
// ---------------------------------------------------------------------------
if (has($ctx, ['suporte', 'manutenção', 'manutencao', 'ajuda', 'problema', 'atualizar', 'atualização', 'atualizacao', 'alterar', 'mudar', 'support'])) {
    $reply = "Sim{$name}, suporte e manutenção estão inclusos na mensalidade 🛠️\n\n• Pequenos ajustes mensais sem custo adicional\n• Hospedagem ultrarrápida com SSL e backups automáticos\n• Suporte que responde em **minutos**, não em dias\n• Plano Growth inclui **suporte prioritário**\n\nComo uma cliente nossa disse: *\"O suporte responde em minutos, não em dias — isso pra mim já vale o investimento.\"*\n\nQuer saber mais sobre algum serviço específico?";
    json_response(['reply' => $reply]);
}

// ---------------------------------------------------------------------------
// Diferencial / por que Sklyra / concorrentes
// ---------------------------------------------------------------------------
if (has($ctx, ['diferencial', 'por que vocês', 'por que voces', 'por que sklyra', 'melhor que', 'diferente', 'vantagem', 'why', 'choose'])) {
    $reply = "Ótima pergunta{$name}! O que nos diferencia:\n\n✅ **Especialistas em brasileiros nos EUA** — Entendemos a dupla realidade: cliente americano + dono brasileiro\n✅ **Entrega em 5 dias** — Agências americanas levam 2 meses e cobram \$3.500+\n✅ **Copywriting incluído** — Você não escreve nada, nós fazemos os textos em inglês e português\n✅ **Sem contrato de fidelidade** — Cancele quando quiser\n✅ **Auditoria gratuita** — Você vê o valor antes de pagar qualquer coisa\n✅ **Suporte humano e rápido** — Resposta em minutos, não em dias\n✅ **Garantia real** — Se não funcionar, refazemos sem custo\n\nQuer começar com a auditoria gratuita?";
    json_response(['reply' => $reply]);
}

// ---------------------------------------------------------------------------
// Contato / falar com humano
// ---------------------------------------------------------------------------
if (has($ctx, ['falar com', 'atendente', 'humano', 'pessoa', 'equipe', 'ligar', 'telefone', 'email', 'e-mail', 'contact', 'speak'])) {
    $reply = "Claro{$name}! Você pode falar com nossa equipe por:\n\n📞 **Telefone**: +1 (718) 249-0931\n📧 **E-mail**: equipe@sklyra.com\n\nOu preenche o formulário no site que respondemos em até **24 horas**.\n\nPara agilizar, você também pode iniciar a **auditoria gratuita** — nossa equipe entra em contato logo depois para apresentar o diagnóstico do seu negócio.";
    json_response(['reply' => $reply]);
}

// ---------------------------------------------------------------------------
// Depoimentos / resultados / cases
// ---------------------------------------------------------------------------
if (has($ctx, ['resultado', 'depoimento', 'case', 'cliente', 'exemplo', 'prova', 'funciona mesmo', 'comprovado'])) {
    $reply = "Alguns resultados reais de clientes{$name} 📊\n\n💬 *\"A Sklyra refez nosso site em cinco dias. Em duas semanas já estava recebendo ligação direto do Google Maps — se pagou no primeiro serviço.\"* — Marcos Ferreira\n\n💬 *\"Só o botão do WhatsApp já mudou a velocidade que os leads chegam até mim, todo dia entra gente nova.\"* — Eduardo Lima\n\n💬 *\"A Sklyra não fez só um site, fez um sistema que continua gerando ligação toda semana. Melhor investimento que fizemos esse ano.\"* — Fernando Ribeiro\n\nTemos cases de Home Services, restaurantes, estética e mais. Quer ver um exemplo do seu segmento?";
    json_response(['reply' => $reply]);
}

// ---------------------------------------------------------------------------
// Site / domínio / hospedagem
// ---------------------------------------------------------------------------
if (has($ctx, ['domínio', 'dominio', 'hospedagem', 'hosting', 'servidor', 'url', 'www', 'wordpress', 'wix', 'squarespace'])) {
    $reply = "Cuidamos de tudo relacionado ao site{$name} 🌐\n\n• **Domínio**: indicamos o melhor domínio para o seu negócio (compra separada, ~\$15/ano)\n• **Hospedagem ultrarrápida** incluída na mensalidade — CDN global, carrega em menos de 2 segundos\n• **SSL** (cadeado de segurança) já configurado\n• **Backups automáticos** diários\n• Site 100% **mobile-first** — funciona perfeito no celular\n\nNão usamos Wix, Squarespace ou WordPress. Construímos do zero com tecnologia moderna para máxima performance.\n\nQuer saber mais sobre alguma parte técnica?";
    json_response(['reply' => $reply]);
}

// ---------------------------------------------------------------------------
// Obrigado / encerramento
// ---------------------------------------------------------------------------
if (has($ctx, ['obrigado', 'obrigada', 'thanks', 'thank you', 'valeu', 'até logo', 'ate logo', 'tchau', 'bye', 'ok', 'entendi'])) {
    $reply = "Disponha{$name}! 😊 Se tiver mais dúvidas, pode falar aqui a qualquer momento.\n\nSe quiser dar o próximo passo, é só clicar em **\"Quero minha auditoria gratuita\"** no site — nossa equipe entra em contato em até 24 horas. Boa sorte com seu negócio! 🚀";
    json_response(['reply' => $reply]);
}

// ---------------------------------------------------------------------------
// Default — redirecionar para serviços
// ---------------------------------------------------------------------------
$reply = "Entendido{$name}! Posso te ajudar com informações sobre:\n\n• 💰 **Preços e planos** — Essential (\$997) ou Growth (\$1.850)\n• 🛠️ **Serviços** — Sites, SEO, automações, funis de vendas\n• ⏱️ **Prazo** — Site no ar em 5 dias úteis\n• 📍 **Regiões** — Atendemos brasileiros em todo os EUA\n• 🎯 **Auditoria gratuita** — Sem compromisso\n• 📞 **Contato** — Falar com a equipe\n\nSobre o que você quer saber mais?";
json_response(['reply' => $reply]);
