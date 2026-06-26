/* ==========================================================================
   FRANÇAIS COMPLET — Banco de Diálogos / Conversação
   Estrutura: id, level, title, situation, lines: [{speaker, fr, pt}], questions[]
   ========================================================================== */
window.DIALOGUES_DATA = [
{
  id:"d01", level:"A1", title:"Au restaurant", situation:"Restaurante",
  lines:[
    {speaker:"Serveur", fr:"Bonjour, vous avez réservé ?", pt:"Olá, fizeram reserva?"},
    {speaker:"Client", fr:"Oui, au nom de Silva, pour deux personnes.", pt:"Sim, no nome de Silva, para duas pessoas."},
    {speaker:"Serveur", fr:"Très bien, suivez-moi. Voici la carte.", pt:"Muito bem, me sigam. Aqui está o cardápio."},
    {speaker:"Client", fr:"Merci. Qu'est-ce que vous nous recommandez ?", pt:"Obrigado. O que vocês nos recomendam?"},
    {speaker:"Serveur", fr:"Le poisson du jour est excellent aujourd'hui.", pt:"O peixe do dia está excelente hoje."},
    {speaker:"Client", fr:"Parfait, je vais prendre ça, avec un verre de vin blanc.", pt:"Perfeito, vou pedir isso, com uma taça de vinho branco."},
    {speaker:"Serveur", fr:"Très bon choix. Et pour madame ?", pt:"Ótima escolha. E para a senhora?"},
    {speaker:"Cliente", fr:"Je voudrais une salade César, s'il vous plaît.", pt:"Eu gostaria de uma salada César, por favor."}
  ],
  questions:[
    {q:"Pour combien de personnes est la réservation ?", options:["Une","Deux","Trois"], answer:"Deux"},
    {q:"Que recommande le serveur ?", options:["Le poisson du jour","Le poulet","La salade"], answer:"Le poisson du jour"}
  ]
},
{
  id:"d02", level:"A1", title:"À l'hôtel", situation:"Hotel",
  lines:[
    {speaker:"Réceptionniste", fr:"Bonsoir, bienvenue à l'hôtel. Vous avez une réservation ?", pt:"Boa noite, bem-vindo ao hotel. Tem uma reserva?"},
    {speaker:"Client", fr:"Oui, une chambre double pour trois nuits.", pt:"Sim, um quarto de casal por três noites."},
    {speaker:"Réceptionniste", fr:"Parfait, votre passeport, s'il vous plaît.", pt:"Perfeito, seu passaporte, por favor."},
    {speaker:"Client", fr:"Le voici. À quelle heure est le petit-déjeuner ?", pt:"Aqui está. A que horas é o café da manhã?"},
    {speaker:"Réceptionniste", fr:"De 7h à 10h30, au rez-de-chaussée.", pt:"Das 7h às 10h30, no térreo."},
    {speaker:"Client", fr:"Très bien, merci. Et le Wi-Fi ?", pt:"Muito bem, obrigado. E o Wi-Fi?"},
    {speaker:"Réceptionniste", fr:"Le mot de passe est sur la carte de bienvenue.", pt:"A senha está no cartão de boas-vindas."}
  ],
  questions:[
    {q:"Pour combien de nuits est la réservation ?", options:["Deux","Trois","Quatre"], answer:"Trois"},
    {q:"Où est le mot de passe Wi-Fi ?", options:["Sur la carte de bienvenue","Sur la porte","Au téléphone"], answer:"Sur la carte de bienvenue"}
  ]
},
{
  id:"d03", level:"A2", title:"À l'université", situation:"Universidade",
  lines:[
    {speaker:"Étudiante", fr:"Excusez-moi, où se trouve l'amphithéâtre B ?", pt:"Com licença, onde fica o anfiteatro B?"},
    {speaker:"Agent", fr:"Au deuxième étage, à côté de la bibliothèque.", pt:"No segundo andar, ao lado da biblioteca."},
    {speaker:"Étudiante", fr:"Merci. Et je dois m'inscrire au cours de littérature, c'est où ?", pt:"Obrigada. E eu preciso me inscrever no curso de literatura, é onde?"},
    {speaker:"Agent", fr:"Au secrétariat, bâtiment principal, bureau 12.", pt:"Na secretaria, prédio principal, sala 12."},
    {speaker:"Étudiante", fr:"D'accord, merci beaucoup pour votre aide.", pt:"Tudo bem, muito obrigada pela ajuda."}
  ],
  questions:[
    {q:"Où se trouve l'amphithéâtre B ?", options:["Au premier étage","Au deuxième étage","Au rez-de-chaussée"], answer:"Au deuxième étage"}
  ]
},
{
  id:"d04", level:"B1", title:"Entretien d'embauche", situation:"Entrevista de emprego",
  lines:[
    {speaker:"Recruteur", fr:"Bonjour, merci d'être venu. Parlez-moi un peu de votre parcours.", pt:"Olá, obrigado por vir. Me fale um pouco sobre sua trajetória."},
    {speaker:"Candidat", fr:"Bonjour. J'ai un master en informatique et trois ans d'expérience en développement web.", pt:"Olá. Eu tenho mestrado em informática e três anos de experiência em desenvolvimento web."},
    {speaker:"Recruteur", fr:"Pourquoi souhaitez-vous rejoindre notre entreprise ?", pt:"Por que você deseja se juntar à nossa empresa?"},
    {speaker:"Candidat", fr:"Votre entreprise innove constamment, et je veux contribuer à des projets ambitieux.", pt:"Sua empresa inova constantemente, e eu quero contribuir com projetos ambiciosos."},
    {speaker:"Recruteur", fr:"Quelles sont vos prétentions salariales ?", pt:"Quais são suas pretensões salariais?"},
    {speaker:"Candidat", fr:"Je suis flexible, mais j'envisage un salaire autour de 45 000 euros par an.", pt:"Sou flexível, mas penso em um salário em torno de 45 mil euros por ano."}
  ],
  questions:[
    {q:"Combien d'années d'expérience a le candidat ?", options:["Une","Deux","Trois"], answer:"Trois"}
  ]
},
{
  id:"d05", level:"A2", title:"À l'aéroport", situation:"Aeroporto",
  lines:[
    {speaker:"Agent", fr:"Bonjour, votre billet et votre passeport, s'il vous plaît.", pt:"Olá, sua passagem e seu passaporte, por favor."},
    {speaker:"Passager", fr:"Les voici. J'ai une valise à enregistrer.", pt:"Aqui estão. Eu tenho uma mala para despachar."},
    {speaker:"Agent", fr:"Très bien, mettez-la sur la balance, s'il vous plaît.", pt:"Muito bem, coloque na balança, por favor."},
    {speaker:"Passager", fr:"Voilà. Quelle est la porte d'embarquement ?", pt:"Aqui está. Qual é o portão de embarque?"},
    {speaker:"Agent", fr:"Porte 23, l'embarquement commence dans une heure.", pt:"Portão 23, o embarque começa em uma hora."}
  ],
  questions:[
    {q:"Quelle est la porte d'embarquement ?", options:["Porte 12","Porte 23","Porte 30"], answer:"Porte 23"}
  ]
},
{
  id:"d06", level:"B1", title:"Aux urgences", situation:"Hospital",
  lines:[
    {speaker:"Infirmier", fr:"Bonjour, quel est le motif de votre visite ?", pt:"Olá, qual o motivo da sua visita?"},
    {speaker:"Patient", fr:"J'ai une douleur très forte au ventre depuis ce matin.", pt:"Estou com uma dor muito forte na barriga desde a manhã."},
    {speaker:"Infirmier", fr:"Avez-vous de la fièvre ?", pt:"Você está com febre?"},
    {speaker:"Patient", fr:"Oui, un peu, 38 degrés.", pt:"Sim, um pouco, 38 graus."},
    {speaker:"Infirmier", fr:"Le médecin va vous examiner. Asseyez-vous en salle d'attente, s'il vous plaît.", pt:"O médico vai examiná-lo. Sente-se na sala de espera, por favor."}
  ],
  questions:[
    {q:"Où a-t-il mal ?", options:["À la tête","Au ventre","Au dos"], answer:"Au ventre"}
  ]
},
{
  id:"d07", level:"B2", title:"En réunion de travail", situation:"Reunião de trabalho",
  lines:[
    {speaker:"Directrice", fr:"Bien, commençons. Où en sommes-nous sur le projet Atlas ?", pt:"Bem, vamos começar. Onde estamos no projeto Atlas?"},
    {speaker:"Chef de projet", fr:"Nous avons pris du retard à cause d'un problème technique, mais nous rattrapons le calendrier.", pt:"Tivemos um atraso por causa de um problema técnico, mas estamos recuperando o cronograma."},
    {speaker:"Directrice", fr:"Quel impact cela a-t-il sur le budget ?", pt:"Qual o impacto disso no orçamento?"},
    {speaker:"Chef de projet", fr:"Un surcoût d'environ cinq pour cent, que nous pouvons absorber.", pt:"Um custo adicional de cerca de cinco por cento, que conseguimos absorver."},
    {speaker:"Directrice", fr:"Très bien. Tenez-moi informée chaque semaine, s'il vous plaît.", pt:"Muito bem. Me mantenha informada toda semana, por favor."}
  ],
  questions:[
    {q:"Quel est le surcoût mentionné ?", options:["Environ 2%","Environ 5%","Environ 10%"], answer:"Environ 5%"}
  ]
},
{
  id:"d08", level:"B2", title:"Congrès scientifique", situation:"Congresso científico",
  lines:[
    {speaker:"Modérateur", fr:"Nous accueillons maintenant le professeur Lambert pour présenter ses recherches.", pt:"Recebemos agora o professor Lambert para apresentar suas pesquisas."},
    {speaker:"Professeur", fr:"Merci. Notre étude porte sur l'impact du réchauffement climatique sur la biodiversité marine.", pt:"Obrigado. Nosso estudo trata do impacto do aquecimento global na biodiversidade marinha."},
    {speaker:"Participant", fr:"Quelle méthodologie avez-vous employée ?", pt:"Qual metodologia vocês usaram?"},
    {speaker:"Professeur", fr:"Nous avons combiné des données satellites avec des relevés sur le terrain pendant cinq ans.", pt:"Nós combinamos dados de satélite com levantamentos de campo durante cinco anos."},
    {speaker:"Participant", fr:"Et quelles sont vos conclusions principales ?", pt:"E quais são suas conclusões principais?"},
    {speaker:"Professeur", fr:"La température des océans augmente plus vite que prévu dans les modèles précédents.", pt:"A temperatura dos oceanos aumenta mais rápido do que previam os modelos anteriores."}
  ],
  questions:[
    {q:"Sur quoi porte l'étude ?", options:["L'économie mondiale","La biodiversité marine","La politique étrangère"], answer:"La biodiversité marine"}
  ]
},
{
  id:"d09", level:"A1", title:"Au marché", situation:"Mercado/feira",
  lines:[
    {speaker:"Vendeur", fr:"Bonjour madame, vous désirez ?", pt:"Bom dia senhora, o que deseja?"},
    {speaker:"Cliente", fr:"Bonjour, je voudrais un kilo de tomates et des pommes, s'il vous plaît.", pt:"Bom dia, eu gostaria de um quilo de tomates e maçãs, por favor."},
    {speaker:"Vendeur", fr:"Voilà. Ça fera six euros cinquante.", pt:"Aqui está. Isso vai dar seis euros e cinquenta."},
    {speaker:"Cliente", fr:"Voici dix euros.", pt:"Aqui estão dez euros."},
    {speaker:"Vendeur", fr:"Merci, et voici votre monnaie : trois euros cinquante.", pt:"Obrigado, e aqui está seu troco: três euros e cinquenta."}
  ],
  questions:[
    {q:"Combien coûtent les achats ?", options:["5,50€","6,50€","10€"], answer:"6,50€"}
  ]
},
{
  id:"d10", level:"A2", title:"À la pharmacie", situation:"Farmácia",
  lines:[
    {speaker:"Pharmacien", fr:"Bonjour, je peux vous aider ?", pt:"Olá, posso ajudá-lo?"},
    {speaker:"Client", fr:"Oui, j'ai mal à la gorge et je tousse beaucoup.", pt:"Sim, estou com dor de garganta e tossindo muito."},
    {speaker:"Pharmacien", fr:"Depuis combien de temps ?", pt:"Há quanto tempo?"},
    {speaker:"Client", fr:"Depuis deux jours.", pt:"Há dois dias."},
    {speaker:"Pharmacien", fr:"Je vous conseille ce sirop, trois fois par jour après les repas.", pt:"Eu recomendo esse xarope, três vezes ao dia depois das refeições."},
    {speaker:"Client", fr:"D'accord, merci. Ça coûte combien ?", pt:"Tudo bem, obrigado. Quanto custa?"}
  ],
  questions:[
    {q:"Depuis quand le client a-t-il mal à la gorge ?", options:["Un jour","Deux jours","Une semaine"], answer:"Deux jours"}
  ]
},
{
  id:"d11", level:"B1", title:"À la banque", situation:"Banco",
  lines:[
    {speaker:"Conseiller", fr:"Bonjour, en quoi puis-je vous aider ?", pt:"Olá, em que posso ajudá-lo?"},
    {speaker:"Client", fr:"Je voudrais ouvrir un compte courant.", pt:"Eu gostaria de abrir uma conta corrente."},
    {speaker:"Conseiller", fr:"Très bien. Vous avez une pièce d'identité et un justificatif de domicile ?", pt:"Muito bem. Você tem um documento de identidade e um comprovante de residência?"},
    {speaker:"Client", fr:"Oui, les voici.", pt:"Sim, aqui estão."},
    {speaker:"Conseiller", fr:"Parfait. Vous recevrez votre carte bancaire sous une semaine.", pt:"Perfeito. Você receberá seu cartão bancário em uma semana."}
  ],
  questions:[
    {q:"Que veut faire le client ?", options:["Fermer un compte","Ouvrir un compte courant","Faire un prêt"], answer:"Ouvrir un compte courant"}
  ]
},
{
  id:"d12", level:"A1", title:"Au téléphone", situation:"Ao telefone",
  lines:[
    {speaker:"Léa", fr:"Allô, bonjour, c'est Léa à l'appareil.", pt:"Alô, oi, aqui é a Léa."},
    {speaker:"Marc", fr:"Salut Léa, ça va ?", pt:"Oi Léa, tudo bem?"},
    {speaker:"Léa", fr:"Ça va bien, merci. On se voit toujours ce soir ?", pt:"Tudo bem, obrigada. A gente ainda se vê hoje à noite?"},
    {speaker:"Marc", fr:"Oui, bien sûr ! À quelle heure ?", pt:"Sim, claro! A que horas?"},
    {speaker:"Léa", fr:"Vers 19h, au café près de chez toi.", pt:"Por volta das 19h, no café perto da sua casa."},
    {speaker:"Marc", fr:"Parfait, à tout à l'heure !", pt:"Perfeito, até logo!"}
  ],
  questions:[
    {q:"À quelle heure se voient-ils ?", options:["18h","19h","20h"], answer:"19h"}
  ]
},
{
  id:"d13", level:"A2", title:"Dans les transports en commun", situation:"Transporte público",
  lines:[
    {speaker:"Touriste", fr:"Excusez-moi, ce bus va bien au centre-ville ?", pt:"Com licença, esse ônibus vai mesmo para o centro?"},
    {speaker:"Passager", fr:"Oui, descendez à l'arrêt Opéra, c'est le troisième.", pt:"Sim, desça no ponto Opéra, é o terceiro."},
    {speaker:"Touriste", fr:"Merci ! Il faut combien de temps ?", pt:"Obrigado! Quanto tempo demora?"},
    {speaker:"Passager", fr:"Environ quinze minutes, ça dépend de la circulation.", pt:"Cerca de quinze minutos, depende do trânsito."}
  ],
  questions:[
    {q:"À quel arrêt doit descendre le touriste ?", options:["Opéra","Bastille","République"], answer:"Opéra"}
  ]
},
{
  id:"d14", level:"B1", title:"Chez le médecin", situation:"Consulta médica",
  lines:[
    {speaker:"Médecin", fr:"Bonjour, qu'est-ce qui vous amène aujourd'hui ?", pt:"Olá, o que o traz aqui hoje?"},
    {speaker:"Patient", fr:"J'ai des maux de tête fréquents depuis deux semaines.", pt:"Tenho dores de cabeça frequentes há duas semanas."},
    {speaker:"Médecin", fr:"Vous dormez bien ? Vous êtes stressé en ce moment ?", pt:"Você dorme bem? Está estressado nesse momento?"},
    {speaker:"Patient", fr:"Pas vraiment, j'ai beaucoup de travail.", pt:"Não muito bem, tenho bastante trabalho."},
    {speaker:"Médecin", fr:"Je vais vous prescrire des analyses pour écarter toute cause sérieuse.", pt:"Vou prescrever exames para descartar qualquer causa séria."}
  ],
  questions:[
    {q:"Depuis quand le patient a-t-il mal à la tête ?", options:["Deux jours","Deux semaines","Deux mois"], answer:"Deux semaines"}
  ]
},
{
  id:"d15", level:"A2", title:"Au cinéma", situation:"Cinema",
  lines:[
    {speaker:"Caissier", fr:"Bonjour, vous voulez voir quel film ?", pt:"Olá, vocês querem ver qual filme?"},
    {speaker:"Client", fr:"Deux places pour la séance de 20h, s'il vous plaît.", pt:"Duas entradas para a sessão das 20h, por favor."},
    {speaker:"Caissier", fr:"Ça fait vingt euros. Vous voulez du pop-corn ?", pt:"Isso dá vinte euros. Vocês querem pipoca?"},
    {speaker:"Client", fr:"Oui, un grand, s'il vous plaît.", pt:"Sim, um grande, por favor."},
    {speaker:"Caissier", fr:"La salle 3, au fond à droite.", pt:"Sala 3, no fundo à direita."}
  ],
  questions:[
    {q:"Pour quelle séance sont les billets ?", options:["18h","19h","20h"], answer:"20h"}
  ]
},
{
  id:"d16", level:"B2", title:"À la poste et chez le notaire", situation:"Correios e cartório",
  lines:[
    {speaker:"Employé", fr:"Bonjour, vous souhaitez envoyer ce colis en recommandé ?", pt:"Olá, deseja enviar esse pacote registrado?"},
    {speaker:"Client", fr:"Oui, avec accusé de réception si possible.", pt:"Sim, com aviso de recebimento se possível."},
    {speaker:"Employé", fr:"Très bien. Cela coûtera douze euros et arrivera sous trois jours ouvrés.", pt:"Muito bem. Isso vai custar doze euros e chegará em três dias úteis."},
    {speaker:"Client", fr:"D'accord, et j'aurais aussi besoin de faire authentifier un document.", pt:"Tudo bem, e eu também precisaria autenticar um documento."},
    {speaker:"Employé", fr:"Pour cela, il faut vous adresser à un notaire ou une mairie.", pt:"Para isso, você precisa procurar um cartório ou a prefeitura."}
  ],
  questions:[
    {q:"Combien coûte l'envoi recommandé ?", options:["8€","12€","20€"], answer:"12€"}
  ]
},
{
  id:"d17", level:"A1", title:"Faire connaissance", situation:"Conhecendo alguém",
  lines:[
    {speaker:"Tom", fr:"Bonjour, je m'appelle Tom. Et toi ?", pt:"Oi, meu nome é Tom. E o seu?"},
    {speaker:"Julie", fr:"Moi, c'est Julie. Enchantée !", pt:"Eu sou a Julie. Prazer!"},
    {speaker:"Tom", fr:"Tu es d'où ?", pt:"De onde você é?"},
    {speaker:"Julie", fr:"Je suis française, de Marseille. Et toi ?", pt:"Sou francesa, de Marselha. E você?"},
    {speaker:"Tom", fr:"Je suis brésilien, je viens d'arriver à Paris pour étudier.", pt:"Sou brasileiro, acabei de chegar a Paris para estudar."},
    {speaker:"Julie", fr:"Super ! Qu'est-ce que tu étudies ?", pt:"Que legal! O que você estuda?"}
  ],
  questions:[
    {q:"D'où vient Julie ?", options:["Paris","Marseille","Lyon"], answer:"Marseille"}
  ]
},
{
  id:"d18", level:"B1", title:"Dans un magasin de vêtements", situation:"Loja de roupas",
  lines:[
    {speaker:"Vendeuse", fr:"Bonjour, je peux vous renseigner ?", pt:"Olá, posso ajudar?"},
    {speaker:"Cliente", fr:"Oui, je cherche une veste pour l'hiver.", pt:"Sim, estou procurando um casaco para o inverno."},
    {speaker:"Vendeuse", fr:"Quelle taille faites-vous ?", pt:"Qual é o seu tamanho?"},
    {speaker:"Cliente", fr:"Je fais du quarante.", pt:"Eu visto 40."},
    {speaker:"Vendeuse", fr:"Voici un modèle très chaud, vous voulez l'essayer ?", pt:"Aqui está um modelo bem quente, quer experimentar?"},
    {speaker:"Cliente", fr:"Oui, où sont les cabines d'essayage ?", pt:"Sim, onde ficam os provadores?"},
    {speaker:"Vendeuse", fr:"Au fond, à gauche.", pt:"No fundo, à esquerda."}
  ],
  questions:[
    {q:"Que cherche la cliente ?", options:["Une robe","Une veste","Un pantalon"], answer:"Une veste"}
  ]
},
{
  id:"d19", level:"A2", title:"Demander son chemin", situation:"Pedindo informações na rua",
  lines:[
    {speaker:"Touriste", fr:"Pardon, pour aller à la tour Eiffel, s'il vous plaît ?", pt:"Com licença, como faço para ir à Torre Eiffel, por favor?"},
    {speaker:"Passant", fr:"Continuez tout droit, puis tournez à gauche après le pont.", pt:"Continue em frente, depois vire à esquerda depois da ponte."},
    {speaker:"Touriste", fr:"C'est loin d'ici ?", pt:"É longe daqui?"},
    {speaker:"Passant", fr:"Non, environ dix minutes à pied.", pt:"Não, cerca de dez minutos a pé."},
    {speaker:"Touriste", fr:"Merci beaucoup !", pt:"Muito obrigado!"}
  ],
  questions:[
    {q:"Combien de temps faut-il à pied ?", options:["5 minutes","10 minutes","30 minutes"], answer:"10 minutes"}
  ]
},
{
  id:"d20", level:"C1", title:"Débat sur l'environnement", situation:"Debate formal",
  lines:[
    {speaker:"Animateur", fr:"Ce soir, nous débattons de la transition énergétique. Madame Roche, votre avis ?", pt:"Hoje à noite, debatemos a transição energética. Senhora Roche, sua opinião?"},
    {speaker:"Mme Roche", fr:"Il est urgent d'investir massivement dans les énergies renouvelables, sans quoi nous risquons une catastrophe.", pt:"É urgente investir maciçamente em energias renováveis, do contrário corremos o risco de uma catástrofe."},
    {speaker:"Animateur", fr:"Monsieur Petit, vous semblez plus nuancé.", pt:"Senhor Petit, o senhor parece mais ponderado."},
    {speaker:"M. Petit", fr:"En effet, je pense qu'il faut concilier ambition écologique et réalisme économique.", pt:"De fato, acho que é preciso conciliar ambição ecológica e realismo econômico."},
    {speaker:"Mme Roche", fr:"Mais ce réalisme ne doit pas servir d'excuse pour retarder l'action.", pt:"Mas esse realismo não deve servir de desculpa para atrasar a ação."}
  ],
  questions:[
    {q:"Quel est le sujet du débat ?", options:["L'éducation","La transition énergétique","Le tourisme"], answer:"La transition énergétique"}
  ]
}
];
