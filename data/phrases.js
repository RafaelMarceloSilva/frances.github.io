/* ==========================================================================
   FRANÇAIS COMPLET — Banco de Frases / Phrase Library
   Estrutura: { id, fr, pt, literal, level, cat, note, ex_context }
   Níveis: easy/medium/hard  |  Categorias: ver PHRASE_CATEGORIES
   ========================================================================== */
window.PHRASE_CATEGORIES = [
  {id:"saudacoes",      label:"Saudações",           icon:"👋"},
  {id:"apresentacao",   label:"Apresentações",        icon:"🤝"},
  {id:"restaurante",    label:"Restaurante",          icon:"🍽️"},
  {id:"direcoes",       label:"Pedir direções",       icon:"🗺️"},
  {id:"compras",        label:"Compras",              icon:"🛍️"},
  {id:"trabalho",       label:"No trabalho",          icon:"💼"},
  {id:"escola",         label:"Na escola",            icon:"📚"},
  {id:"aeroporto",      label:"Aeroporto",            icon:"✈️"},
  {id:"hotel",          label:"Hotel",                icon:"🏨"},
  {id:"emergencia",     label:"Emergência",           icon:"🚨"},
  {id:"hospital",       label:"Hospital",             icon:"🏥"},
  {id:"telefone",       label:"Ao telefone",          icon:"📞"},
  {id:"cotidiano",      label:"Rotina diária",        icon:"☀️"},
  {id:"viagens",        label:"Viagens",              icon:"🌍"},
  {id:"smalltalk",      label:"Conversa casual",      icon:"💬"},
  {id:"negocios",       label:"Negócios",             icon:"📊"},
  {id:"sentimentos",    label:"Sentimentos",          icon:"❤️"},
  {id:"tecnologia",     label:"Tecnologia",           icon:"💻"},
  {id:"familia",        label:"Família",              icon:"👨‍👩‍👧"},
  {id:"educacao",       label:"Educação",             icon:"🎓"}
];

window.PHRASES_DATA = [
/* ── SAUDAÇÕES ─────────────────────────────────────────────── */
{id:"p001",fr:"Bonjour, comment allez-vous ?",pt:"Bom dia, como vai?",literal:"Bom dia, como vais-vos?",level:"easy",cat:"saudacoes",note:"Forma formal. Use 'tu vas?' com amigos.",ex_context:"Ao cumprimentar colega de trabalho ou desconhecido."},
{id:"p002",fr:"Ça va bien, merci ! Et vous ?",pt:"Vou bem, obrigado! E você?",literal:"Isso vai bem, obrigado! E você?",level:"easy",cat:"saudacoes",note:"Resposta padrão à pergunta 'comment allez-vous'."},
{id:"p003",fr:"Salut ! Ça fait longtemps !",pt:"Oi! Há quanto tempo!",literal:"Olá! Faz muito tempo!",level:"easy",cat:"saudacoes",note:"Informal. Use com amigos que você não via há tempo."},
{id:"p004",fr:"Bonne soirée !",pt:"Boa noite! (despedida)",literal:"Boa tarde/noite!",level:"easy",cat:"saudacoes",note:"'Bonne soirée' é ao se despedir à noite. 'Bonsoir' é ao chegar."},
{id:"p005",fr:"À bientôt !",pt:"Até logo!",literal:"Até breve!",level:"easy",cat:"saudacoes",note:"Indica que você vai se ver em breve. Mais positivo que 'au revoir'."},
{id:"p006",fr:"Enchanté(e) de faire votre connaissance.",pt:"Muito prazer em conhecê-lo(a).",literal:"Encantado de fazer seu conhecimento.",level:"medium",cat:"saudacoes",note:"Forma formal de dizer 'prazer'. O(a) concorda com o sexo de quem fala."},
{id:"p007",fr:"Passez une excellente journée !",pt:"Tenha um excelente dia!",literal:"Passe um excelente dia!",level:"medium",cat:"saudacoes",note:"Frase de despedida educada e calorosa."},

/* ── APRESENTAÇÃO ───────────────────────────────────────────── */
{id:"p008",fr:"Je m'appelle Marie, et vous ?",pt:"Me chamo Marie, e você?",literal:"Eu me chamo Marie, e você?",level:"easy",cat:"apresentacao",note:"Forma padrão de se apresentar. Aguarda a apresentação do outro."},
{id:"p009",fr:"Je viens du Brésil, de São Paulo.",pt:"Sou do Brasil, de São Paulo.",literal:"Eu venho do Brasil, de São Paulo.",level:"easy",cat:"apresentacao",note:"'Venir de' indica origem. Para cidades, sempre 'de'."},
{id:"p010",fr:"Je travaille comme ingénieur dans une entreprise technologique.",pt:"Trabalho como engenheiro em uma empresa de tecnologia.",literal:"Eu trabalho como engenheiro em uma empresa tecnológica.",level:"medium",cat:"apresentacao",note:"'Comme' antes de profissão sem artigo."},
{id:"p011",fr:"J'apprends le français depuis six mois.",pt:"Estou aprendendo francês há seis meses.",literal:"Eu aprendo o francês desde seis meses.",level:"medium",cat:"apresentacao",note:"'Depuis' + présent para ação que continua até o momento atual."},
{id:"p012",fr:"Je suis passionné(e) par la musique et la cuisine.",pt:"Sou apaixonado(a) por música e culinária.",literal:"Eu sou apaixonado pela música e a culinária.",level:"medium",cat:"apresentacao",note:"'Être passionné par' = ser apaixonado por. Artigo definido após 'par'."},

/* ── RESTAURANTE ─────────────────────────────────────────────── */
{id:"p013",fr:"Une table pour deux personnes, s'il vous plaît.",pt:"Uma mesa para duas pessoas, por favor.",literal:"Uma mesa para duas pessoas, se você quiser.",level:"easy",cat:"restaurante",note:"Frase essencial ao entrar em um restaurante."},
{id:"p014",fr:"Je voudrais voir la carte, s'il vous plaît.",pt:"Eu gostaria de ver o cardápio, por favor.",literal:"Eu gostaria ver a carta, se você quiser.",level:"easy",cat:"restaurante",note:"'Je voudrais' é mais educado que 'je veux'. Muito usado em restaurantes."},
{id:"p015",fr:"Qu'est-ce que vous me recommandez aujourd'hui ?",pt:"O que você me recomenda hoje?",literal:"O que é que você me recomenda hoje?",level:"medium",cat:"restaurante",note:"Excelente para explorar o menu. Mostra confiança no garçom."},
{id:"p016",fr:"Je suis allergique aux fruits de mer.",pt:"Sou alérgico(a) a frutos do mar.",literal:"Eu sou alérgico aos frutos do mar.",level:"medium",cat:"restaurante",note:"Essencial para segurança alimentar. 'Aux' = à + les."},
{id:"p017",fr:"L'addition, s'il vous plaît.",pt:"A conta, por favor.",literal:"A adição, se você quiser.",level:"easy",cat:"restaurante",note:"'L'addition' é sempre feminino e o jeito correto de pedir a conta."},
{id:"p018",fr:"C'était délicieux, mes compliments au chef !",pt:"Estava delicioso, meus parabéns ao chef!",literal:"Era delicioso, meus cumprimentos ao chef!",level:"medium",cat:"restaurante",note:"Elogio elegante para o final de uma refeição excelente."},
{id:"p019",fr:"Puis-je avoir un peu plus de pain, s'il vous plaît ?",pt:"Posso pedir um pouco mais de pão, por favor?",literal:"Posso ter um pouco mais de pão, se você quiser?",level:"medium",cat:"restaurante",note:"'Puis-je' é inversão formal de 'je peux'. Muito educado."},

/* ── PEDIR DIREÇÕES ─────────────────────────────────────────── */
{id:"p020",fr:"Excusez-moi, pourriez-vous m'indiquer le chemin pour la gare ?",pt:"Com licença, poderia me indicar o caminho para a estação?",literal:"Excuse-me, você poderia me indicar o caminho para a estação?",level:"medium",cat:"direcoes",note:"'Pourriez-vous' é condicional formal. Muito educado para pedir informações."},
{id:"p021",fr:"C'est à quelle distance d'ici à pied ?",pt:"Qual é a distância daqui a pé?",literal:"É a qual distância daqui a pé?",level:"easy",cat:"direcoes",note:"Útil para saber se vale ir andando ou pegar transporte."},
{id:"p022",fr:"Continuez tout droit, puis tournez à gauche au carrefour.",pt:"Continue em frente, depois vire à esquerda no cruzamento.",literal:"Continue completamente reto, depois vire à esquerda no cruzamento.",level:"medium",cat:"direcoes",note:"Vocabulário chave: tout droit (em frente), à gauche (esquerda), à droite (direita)."},
{id:"p023",fr:"Je suis complètement perdu(e). Pouvez-vous m'aider ?",pt:"Estou completamente perdido(a). Pode me ajudar?",literal:"Eu sou completamente perdido. Você pode me ajudar?",level:"easy",cat:"direcoes",note:"Honesto e direto. Franceses geralmente gostam de ajudar turistas educados."},

/* ── COMPRAS ─────────────────────────────────────────────────── */
{id:"p024",fr:"Je cherche quelque chose pour offrir en cadeau.",pt:"Estou procurando algo para dar de presente.",literal:"Eu procuro algo para oferecer como presente.",level:"medium",cat:"compras",note:"'Offrir' = dar de presente. 'Quelque chose' = alguma coisa."},
{id:"p025",fr:"Avez-vous ce modèle en taille 40 ?",pt:"Você tem esse modelo no tamanho 40?",literal:"Você tem este modelo em tamanho 40?",level:"easy",cat:"compras",note:"'Ce modèle' = esse modelo. Tamanhos franceses diferem dos brasileiros."},
{id:"p026",fr:"C'est un peu trop cher pour moi. Vous avez quelque chose de moins cher ?",pt:"Está um pouco caro para mim. Você tem algo mais barato?",literal:"É um pouco muito caro para mim. Você tem algo de menos caro?",level:"medium",cat:"compras",note:"Forma educada de negociar ou pedir alternativa mais barata."},
{id:"p027",fr:"Je vais juste regarder, merci.",pt:"Vou só dar uma olhada, obrigado.",literal:"Vou somente olhar, obrigado.",level:"easy",cat:"compras",note:"Essencial para dispensar vendedores sem ser rude."},
{id:"p028",fr:"Est-ce que vous acceptez les cartes bancaires ?",pt:"Vocês aceitam cartão de crédito/débito?",literal:"É que você aceita os cartões bancários?",level:"easy",cat:"compras",note:"'Cartes bancaires' inclui crédito e débito. Sempre bom verificar."},

/* ── NO TRABALHO ─────────────────────────────────────────────── */
{id:"p029",fr:"Je vous contacte au sujet de notre réunion de demain.",pt:"Estou entrando em contato sobre nossa reunião de amanhã.",literal:"Eu vos contato a respeito de nossa reunião de amanhã.",level:"medium",cat:"trabalho",note:"'Au sujet de' = a respeito de / sobre. Formal e profissional."},
{id:"p030",fr:"Pourriez-vous m'envoyer le compte rendu de la réunion ?",pt:"Você poderia me enviar a ata da reunião?",literal:"Você poderia me enviar o relatório da reunião?",level:"hard",cat:"trabalho",note:"'Compte rendu' = ata/resumo. 'Pourriez-vous' = condicional formal."},
{id:"p031",fr:"Je suis disponible pour un appel jeudi matin.",pt:"Estou disponível para uma ligação na quinta de manhã.",literal:"Eu sou disponível para uma chamada quinta-feira manhã.",level:"medium",cat:"trabalho",note:"'Disponible' = disponível. Muito usado em e-mails profissionais."},
{id:"p032",fr:"Nous avons pris du retard sur le projet, mais nous rattrapons le calendrier.",pt:"Tivemos atraso no projeto, mas estamos recuperando o cronograma.",literal:"Nós tomamos do atraso no projeto, mas nós alcançamos o calendário.",level:"hard",cat:"trabalho",note:"'Prendre du retard' = atrasar. 'Rattraper' = recuperar, alcançar."},
{id:"p033",fr:"Je vous ferai parvenir le rapport d'ici vendredi.",pt:"Enviarei o relatório até sexta-feira.",literal:"Eu vos farei chegar o relatório daqui sexta-feira.",level:"hard",cat:"trabalho",note:"'Faire parvenir' = fazer chegar / enviar (formal). Muito usado em contexto profissional."},

/* ── NA ESCOLA / UNIVERSIDADE ───────────────────────────────── */
{id:"p034",fr:"Excusez-moi, je n'ai pas bien compris. Pourriez-vous répéter ?",pt:"Com licença, não entendi bem. Poderia repetir?",literal:"Excuse-me, eu não bem compreendi. Você poderia repetir?",level:"easy",cat:"escola",note:"Essencial em sala de aula. Nunca hesite em pedir para repetir."},
{id:"p035",fr:"À quelle heure commence le cours de linguistique ?",pt:"A que horas começa a aula de linguística?",literal:"A qual hora começa o curso de linguística?",level:"easy",cat:"escola",note:"'Cours' (m.) = aula/curso. 'À quelle heure' = a que horas."},
{id:"p036",fr:"Où se trouve la bibliothèque universitaire ?",pt:"Onde fica a biblioteca universitária?",literal:"Onde se encontra a biblioteca universitária?",level:"medium",cat:"escola",note:"'Se trouver' = estar localizado. Alternativa de 'être' para lugares."},
{id:"p037",fr:"Puis-je emprunter vos notes de cours ?",pt:"Posso pegar emprestado suas anotações de aula?",literal:"Posso eu emprestar suas notas de curso?",level:"medium",cat:"escola",note:"'Emprunter' = pegar emprestado (não 'prêter' que é emprestar para alguém)."},

/* ── AEROPORTO ───────────────────────────────────────────────── */
{id:"p038",fr:"À quelle heure est l'embarquement pour le vol AF023 ?",pt:"A que horas é o embarque para o voo AF023?",literal:"A qual hora é o embarque para o voo AF023?",level:"easy",cat:"aeroporto",note:"'Embarquement' = embarque. Número do voo sem 'número'."},
{id:"p039",fr:"J'ai raté mon vol de correspondance. Que dois-je faire ?",pt:"Perdi meu voo de conexão. O que devo fazer?",literal:"Eu errei meu voo de correspondência. O que devo eu fazer?",level:"hard",cat:"aeroporto",note:"'Rater' = perder/errar. 'Vol de correspondance' = voo de conexão."},
{id:"p040",fr:"Ma valise n'est pas arrivée sur le tapis roulant.",pt:"Minha mala não chegou na esteira.",literal:"Minha mala não é chegada sobre o tapete rolante.",level:"medium",cat:"aeroporto",note:"'Tapis roulant' = esteira de bagagem. 'Valise' = mala."},
{id:"p041",fr:"Où se trouve le bureau des objets trouvés ?",pt:"Onde fica o balcão de achados e perdidos?",literal:"Onde se encontra o escritório dos objetos encontrados?",level:"medium",cat:"aeroporto",note:"'Objets trouvés' = achados e perdidos. Expressão fixa em francês."},

/* ── HOTEL ───────────────────────────────────────────────────── */
{id:"p042",fr:"J'ai une réservation au nom de Silva.",pt:"Tenho uma reserva no nome de Silva.",literal:"Eu tenho uma reserva ao nome de Silva.",level:"easy",cat:"hotel",note:"'Au nom de' = no nome de. Essencial no check-in."},
{id:"p043",fr:"Pourriez-vous me réveiller à sept heures demain matin ?",pt:"Você poderia me acordar às sete horas amanhã de manhã?",literal:"Você poderia me despertar às sete horas amanhã manhã?",level:"medium",cat:"hotel",note:"'Réveiller' = acordar/despertar. Serviço de wake-up call."},
{id:"p044",fr:"La climatisation ne fonctionne pas dans ma chambre.",pt:"O ar-condicionado não está funcionando no meu quarto.",literal:"A climatização não funciona no meu quarto.",level:"medium",cat:"hotel",note:"'Fonctionner' = funcionar. 'Climatisation' = ar-condicionado."},
{id:"p045",fr:"À quelle heure est le check-out ?",pt:"A que horas é o check-out?",literal:"A qual hora é o check-out?",level:"easy",cat:"hotel",note:"'Check-out' é usado em francês. Alternativamente: 'à quelle heure dois-je libérer la chambre?'"},

/* ── EMERGÊNCIA ──────────────────────────────────────────────── */
{id:"p046",fr:"Au secours ! Appelez la police !",pt:"Socorro! Chame a polícia!",literal:"Ao socorro! Chame a polícia!",level:"easy",cat:"emergencia",note:"CRÍTICO. 'Au secours' = socorro. Polícia France: 17. SAMU: 15. Pompiers: 18."},
{id:"p047",fr:"Il y a eu un accident. Appelez le SAMU, s'il vous plaît !",pt:"Houve um acidente. Chame o SAMU, por favor!",literal:"Houve um acidente. Chame o SAMU, se você quiser!",level:"medium",cat:"emergencia",note:"SAMU = Serviço de Atendimento Médico de Urgência (número 15 na França)."},
{id:"p048",fr:"On m'a volé mon portefeuille.",pt:"Roubaram minha carteira.",literal:"Me roubaram minha carteira.",level:"medium",cat:"emergencia",note:"'On m'a volé' = me roubaram (passivo com 'on'). 'Portefeuille' = carteira."},

/* ── HOSPITAL ────────────────────────────────────────────────── */
{id:"p049",fr:"J'ai une douleur aiguë à la poitrine depuis ce matin.",pt:"Estou com uma dor aguda no peito desde essa manhã.",literal:"Eu tenho uma dor aguda ao peito desde esta manhã.",level:"hard",cat:"hospital",note:"'Douleur aiguë' = dor aguda. 'Poitrine' = peito/tórax. Sintoma de emergência."},
{id:"p050",fr:"Je prends ce médicament deux fois par jour.",pt:"Tomo este medicamento duas vezes por dia.",literal:"Eu tomo este medicamento duas vezes por dia.",level:"medium",cat:"hospital",note:"Estrutura útil: 'X fois par jour/semaine'. Sem artigo antes do número."},
{id:"p051",fr:"Êtes-vous allergique à certains médicaments ?",pt:"Você é alérgico(a) a algum medicamento?",literal:"Você é alérgico a certos medicamentos?",level:"medium",cat:"hospital",note:"Pergunta padrão médica. 'Certains' = alguns/certos."},
{id:"p052",fr:"Je voudrais un rendez-vous avec un médecin généraliste.",pt:"Gostaria de uma consulta com um clínico geral.",literal:"Eu gostaria de um encontro com um médico generalista.",level:"medium",cat:"hospital",note:"'Rendez-vous' = consulta/encontro. 'Médecin généraliste' = clínico geral."},

/* ── AO TELEFONE ─────────────────────────────────────────────── */
{id:"p053",fr:"Pourriez-vous me passer le service des ressources humaines ?",pt:"Você poderia me transferir para o RH?",literal:"Você poderia me passar o serviço dos recursos humanos?",level:"hard",cat:"telefone",note:"'Passer' = transferir (ligação). 'RH' = Ressources Humaines."},
{id:"p054",fr:"Je rappellerai dans une heure.",pt:"Voltarei a ligar em uma hora.",literal:"Eu ligo de volta em uma hora.",level:"medium",cat:"telefone",note:"'Rappeler' = ligar de volta. Futuro simples = 'rappellerai'."},
{id:"p055",fr:"Désolé(e), vous avez fait un mauvais numéro.",pt:"Desculpe, você discou o número errado.",literal:"Desculpado, você fez um mau número.",level:"medium",cat:"telefone",note:"'Mauvais numéro' = número errado. Frase essencial para engano telefônico."},
{id:"p056",fr:"Laissez-moi un message après le bip, je vous rappellerai.",pt:"Deixe uma mensagem após o bipe, retornarei sua ligação.",literal:"Deixe-me uma mensagem após o bip, eu te religo.",level:"medium",cat:"telefone",note:"Estrutura de correio de voz. 'Après le bip' = após o bipe."},

/* ── ROTINA DIÁRIA ───────────────────────────────────────────── */
{id:"p057",fr:"Je me lève généralement vers sept heures du matin.",pt:"Geralmente acordo por volta das sete da manhã.",literal:"Eu me levanto geralmente em direção às sete horas da manhã.",level:"easy",cat:"cotidiano",note:"'Se lever' = levantar-se. 'Vers' = por volta de (tempo aproximado)."},
{id:"p058",fr:"Je prends mon café en lisant les nouvelles du jour.",pt:"Tomo meu café enquanto leio as notícias do dia.",literal:"Eu tomo meu café lendo as novidades do dia.",level:"medium",cat:"cotidiano",note:"Gérondif 'en lisant' = enquanto lê / lendo. Ação simultânea."},
{id:"p059",fr:"Je fais la cuisine le soir plutôt que commander à livrer.",pt:"Prefiro cozinhar à noite a pedir delivery.",literal:"Eu faço a cozinha a noite mais do que comandar a livrar.",level:"hard",cat:"cotidiano",note:"'Plutôt que' = em vez de / ao invés de. 'Commander à livrer' = pedir delivery."},
{id:"p060",fr:"Je me couche rarement avant minuit.",pt:"Raramente vou dormir antes de meia-noite.",literal:"Eu me deito raramente antes da meia-noite.",level:"medium",cat:"cotidiano",note:"'Se coucher' = ir dormir/deitar. 'Rarement' = raramente. Advérbio antes do verbo."},

/* ── VIAGENS ─────────────────────────────────────────────────── */
{id:"p061",fr:"C'est la première fois que je visite Paris, j'ai hâte !",pt:"É a primeira vez que visito Paris, mal posso esperar!",literal:"É a primeira vez que eu visito Paris, eu tenho pressa!",level:"medium",cat:"viagens",note:"'Avoir hâte' = estar ansioso/mal poder esperar. Expressão muito comum."},
{id:"p062",fr:"Quels sites touristiques me conseillez-vous de visiter ?",pt:"Quais pontos turísticos você me recomenda visitar?",literal:"Quais sítios turísticos me aconselhais de visitar?",level:"medium",cat:"viagens",note:"'Conseiller de + infinitif' = recomendar fazer algo. Formal e polido."},
{id:"p063",fr:"Je préfère voyager léger avec juste un bagage à main.",pt:"Prefiro viajar leve com apenas uma bagagem de mão.",literal:"Eu prefiro viajar leve com apenas uma bagagem à mão.",level:"medium",cat:"viagens",note:"'Bagage à main' = bagagem de mão. 'Voyager léger' = viajar leve."},
{id:"p064",fr:"Y a-t-il des réductions pour les étudiants ?",pt:"Há descontos para estudantes?",literal:"Há reduções para os estudantes?",level:"easy",cat:"viagens",note:"'Réduction' = desconto. 'Y a-t-il' = existe? / há? (inversão formal)."},

/* ── CONVERSA CASUAL ─────────────────────────────────────────── */
{id:"p065",fr:"Tu as vu le match hier soir ? C'était incroyable !",pt:"Você viu o jogo ontem à noite? Foi incrível!",literal:"Tu viste o jogo ontem à noite? Era incrível!",level:"easy",cat:"smalltalk",note:"Informal. 'Tu as vu' = você viu (passé composé). Ótimo para conversar sobre esportes."},
{id:"p066",fr:"Il paraît qu'il va faire beau tout le week-end.",pt:"Parece que vai fazer bom tempo o fim de semana todo.",literal:"Parece que vai fazer belo todo o fim de semana.",level:"medium",cat:"smalltalk",note:"'Il paraît que' = parece que / dizem que. 'Faire beau' = estar bom o tempo."},
{id:"p067",fr:"Tu as des plans pour les vacances ?",pt:"Você tem planos para as férias?",literal:"Tu tens planos para as férias?",level:"easy",cat:"smalltalk",note:"'Avoir des plans' = ter planos. Ótima pergunta para iniciar conversa."},
{id:"p068",fr:"À vrai dire, je n'en suis pas si sûr(e).",pt:"Sinceramente, não tenho tanta certeza disso.",literal:"A verdade a dizer, eu não sou tão seguro disso.",level:"hard",cat:"smalltalk",note:"'À vrai dire' = sinceramente / na verdade. Expressão para expressar dúvida educada."},

/* ── NEGÓCIOS ────────────────────────────────────────────────── */
{id:"p069",fr:"Permettez-moi de vous présenter notre nouvelle gamme de produits.",pt:"Permita-me apresentar nossa nova linha de produtos.",literal:"Permita-me vos apresentar nossa nova gama de produtos.",level:"hard",cat:"negocios",note:"'Gamme' = linha/gama de produtos. Tom formal e comercial."},
{id:"p070",fr:"Nous sommes prêts à vous faire une offre compétitive.",pt:"Estamos prontos para fazer uma oferta competitiva.",literal:"Nós somos prontos a vos fazer uma oferta competitiva.",level:"hard",cat:"negocios",note:"'Prêt à' = pronto para. Usado em negociações comerciais."},
{id:"p071",fr:"Je vous soumets notre proposition en pièce jointe.",pt:"Envio nossa proposta em anexo.",literal:"Eu vos submeto nossa proposição em peça juntada.",level:"hard",cat:"negocios",note:"'Pièce jointe' = anexo (e-mail). 'Soumettre' = submeter/enviar formalmente."},
{id:"p072",fr:"Dans les grandes lignes, voici notre stratégie.",pt:"Em linhas gerais, eis nossa estratégia.",literal:"Nas grandes linhas, eis nossa estratégia.",level:"hard",cat:"negocios",note:"'Dans les grandes lignes' = em linhas gerais. 'Voici' = eis / aqui está."},

/* ── SENTIMENTOS ─────────────────────────────────────────────── */
{id:"p073",fr:"Je suis vraiment touché(e) par votre geste.",pt:"Estou realmente tocado(a) pelo seu gesto.",literal:"Eu sou verdadeiramente tocado pelo seu gesto.",level:"medium",cat:"sentimentos",note:"'Touché(e)' = emocionado/tocado. Expressão genuína de gratidão."},
{id:"p074",fr:"Je ne me sens pas très bien en ce moment.",pt:"Não estou me sentindo muito bem agora.",literal:"Eu não me sinto muito bem neste momento.",level:"easy",cat:"sentimentos",note:"'Se sentir' = sentir-se. 'En ce moment' = agora / neste momento."},
{id:"p075",fr:"Je suis stressé(e) à cause des examens.",pt:"Estou estressado(a) por causa das provas.",literal:"Eu sou estressado a causa dos exames.",level:"easy",cat:"sentimentos",note:"'À cause de' = por causa de. 'Stressé' veio do inglês, muito usado."},
{id:"p076",fr:"Je suis ravi(e) d'avoir pu vous rencontrer.",pt:"Estou encantado(a) de ter podido encontrá-lo(a).",literal:"Eu sou radiante de ter podido vos encontrar.",level:"medium",cat:"sentimentos",note:"'Ravi(e)' = encantado/feliz. Forma elegante de encerrar um encontro."},

/* ── TECNOLOGIA ──────────────────────────────────────────────── */
{id:"p077",fr:"Mon téléphone est à court de batterie.",pt:"Meu celular está sem bateria.",literal:"Meu telefone está a curto de bateria.",level:"easy",cat:"tecnologia",note:"'À court de' = sem / faltando. 'Batterie' = bateria."},
{id:"p078",fr:"Pourriez-vous me donner le mot de passe Wi-Fi ?",pt:"Poderia me dar a senha do Wi-Fi?",literal:"Você poderia me dar a palavra de passe Wi-Fi?",level:"easy",cat:"tecnologia",note:"'Mot de passe' = senha (literalmente: palavra de passe). Muito pedido em cafés."},
{id:"p079",fr:"L'application a planté, je dois la redémarrer.",pt:"O aplicativo travou, preciso reiniciá-lo.",literal:"A aplicação plantou, eu devo a recomeçar.",level:"medium",cat:"tecnologia",note:"'Planter' (fam.) = travar/crashar. 'Redémarrer' = reiniciar."},
{id:"p080",fr:"Je travaille à distance depuis chez moi la plupart du temps.",pt:"Trabalho remotamente de casa na maior parte do tempo.",literal:"Eu trabalho à distância desde chez moi a maior parte do tempo.",level:"medium",cat:"tecnologia",note:"'À distance' = remotamente. 'La plupart du temps' = na maior parte do tempo."},

/* ── FAMÍLIA ─────────────────────────────────────────────────── */
{id:"p081",fr:"Nous nous réunissons en famille tous les dimanches.",pt:"Nos reunimos em família todos os domingos.",literal:"Nós nos reunimos em família todos os domingos.",level:"medium",cat:"familia",note:"'Se réunir' = reunir-se. 'En famille' = em família (sem artigo)."},
{id:"p082",fr:"Ma mère me manque énormément depuis que je vis à l'étranger.",pt:"Estou com muita saudade da minha mãe desde que moro no exterior.",literal:"Minha mãe me falta enormemente desde que eu vivo no estrangeiro.",level:"hard",cat:"familia",note:"'Manquer' funciona invertido: 'Ma mère me manque' = sinto falta da minha mãe."},
{id:"p083",fr:"On attend un bébé pour le mois de mars.",pt:"Estamos esperando um bebê para o mês de março.",literal:"Nós esperamos um bebê para o mês de março.",level:"medium",cat:"familia",note:"'Attendre un bébé' = estar grávida / esperando bebê. 'On' informal = nous."},

/* ── EDUCAÇÃO ────────────────────────────────────────────────── */
{id:"p084",fr:"Je cherche à m'inscrire en master de langues étrangères.",pt:"Estou procurando me inscrever no mestrado em línguas estrangeiras.",literal:"Eu procuro a me inscrever em mestrado de línguas estrangeiras.",level:"hard",cat:"educacao",note:"'S'inscrire en' = se inscrever em (curso). 'Master' = mestrado na França."},
{id:"p085",fr:"Cette matière est vraiment difficile, mais je m'accroche.",pt:"Esta matéria é muito difícil, mas estou me segurando.",literal:"Esta matéria é verdadeiramente difícil, mas eu me penduro.",level:"medium",cat:"educacao",note:"'S'accrocher' (fam.) = persistir / não desistir. Expressão motivacional comum."},
{id:"p086",fr:"J'ai obtenu ma licence avec mention très bien.",pt:"Me formei na graduação com distinção máxima.",literal:"Eu obtive minha licença com menção muito bem.",level:"hard",cat:"educacao",note:"'Licence' = graduação (3 anos). 'Mention très bien' = distinção máxima (acima de 16/20)."},
{id:"p087",fr:"Le professeur nous a donné beaucoup de travail à faire à la maison.",pt:"O professor nos deu muito dever de casa.",literal:"O professor nos deu muito trabalho a fazer em casa.",level:"medium",cat:"educacao",note:"'Travail à la maison' = dever de casa (alternativa a 'devoirs')."},
{id:"p088",fr:"Je révise mes notes avant chaque examen.",pt:"Reviso minhas anotações antes de cada prova.",literal:"Eu reviso minhas notas antes de cada exame.",level:"easy",cat:"educacao",note:"'Réviser' = estudar/revisar para exame. 'Notes' = anotações."},

/* ── EXTRAS ÚTEIS ────────────────────────────────────────────── */
{id:"p089",fr:"Je ne comprends pas. Pourriez-vous parler plus lentement ?",pt:"Não entendo. Poderia falar mais devagar?",literal:"Eu não compreendo. Você poderia falar mais lentamente?",level:"easy",cat:"cotidiano",note:"A frase mais importante para aprendizes! 'Plus lentement' = mais devagar."},
{id:"p090",fr:"Comment dit-on 'saudade' en français ?",pt:"Como se diz 'saudade' em francês?",literal:"Como diz-se 'saudade' em francês?",level:"medium",cat:"cotidiano",note:"Estrutura: 'Comment dit-on X en français/anglais?' = Como se diz X em francês/inglês?"},
{id:"p091",fr:"Je vais réfléchir à votre proposition et vous revenir là-dessus.",pt:"Vou pensar na sua proposta e retornar com uma resposta.",literal:"Vou refletir sobre sua proposição e vos voltar sobre isso.",level:"hard",cat:"negocios",note:"'Revenir sur' = voltar a tratar de. Útil para adiar uma decisão educadamente."},
{id:"p092",fr:"Cela dit, je pense qu'il faut nuancer notre position.",pt:"Dito isso, acho que precisamos matizar nossa posição.",literal:"Isso dito, eu penso que é preciso nuançar nossa posição.",level:"hard",cat:"smalltalk",note:"'Cela dit' = dito isso. 'Nuancer' = matizar / sutilizar. C1/C2."},
];
