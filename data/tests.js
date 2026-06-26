/* ==========================================================================
   FRANÇAIS COMPLET — Testes de Nível CEFR
   Cada teste tem ~12 questões mistas (vocab, gramática, compreensão)
   type: "mcq" (múltipla escolha) | "fill" (completar)
   ========================================================================== */
window.TESTS_DATA = [
  {
    id:"test_a1", level:"A1", title:"Test de niveau — A1",
    desc:"Avalia o nível A1: saudações, artigos, presentes simples, vocabulário básico.",
    questions:[
      {type:"mcq", q:"Qu'est-ce que ça veut dire : 'bonjour' ?", options:["Boa tarde","Bom dia / Olá","Boa noite"], answer:"Bom dia / Olá"},
      {type:"mcq", q:"Choisissez le bon article : ___ livre est intéressant.", options:["La","Le","Les"], answer:"Le"},
      {type:"mcq", q:"Je ___ français (parler, je).", options:["parles","parle","parlons"], answer:"parle"},
      {type:"mcq", q:"'La maison' signifie :", options:["A escola","A casa","O apartamento"], answer:"A casa"},
      {type:"fill", q:"Négation : Je ___ comprends pas. (ne)", answer:"ne"},
      {type:"mcq", q:"Comment dit-on 'merci' en portugais ?", options:["Por favor","Com licença","Obrigado/Obrigada"], answer:"Obrigado/Obrigada"},
      {type:"mcq", q:"Quel est le pluriel de 'un livre' ?", options:["des livres","des livreux","les livre"], answer:"des livres"},
      {type:"mcq", q:"'Tu t'appelles comment ?' signifie :", options:["Où habites-tu ?","Como você se chama?","D'où viens-tu ?"], answer:"Como você se chama?"},
      {type:"mcq", q:"Quelle heure est-il? ___ sept heures.", options:["C'est","Il est","Il y a"], answer:"Il est"},
      {type:"mcq", q:"'Je voudrais un café' est une façon de dire :", options:["Eu não gosto de café","Eu gostaria de um café","Eu preciso de café"], answer:"Eu gostaria de um café"},
      {type:"fill", q:"Complétez : Elle ___ (habiter) à Lyon.", answer:"habite"},
      {type:"mcq", q:"'Au revoir' signifie :", options:["Obrigado","Até logo","Com licença"], answer:"Até logo"}
    ]
  },
  {
    id:"test_a2", level:"A2", title:"Test de niveau — A2",
    desc:"Avalia o nível A2: passé composé, vocabulário cotidiano, perguntas complexas.",
    questions:[
      {type:"mcq", q:"Passé composé de 'aller' avec 'je' :", options:["j'ai allé","je suis allé","j'allais"], answer:"je suis allé"},
      {type:"mcq", q:"'Je suis allé au marché.' — Pourquoi utilise-t-on 'être' ?", options:["'Aller' est un verbe régulier","'Aller' est un verbe de mouvement qui utilise 'être'","Il n'y a pas de règle"], answer:"'Aller' est un verbe de mouvement qui utilise 'être'"},
      {type:"fill", q:"Participe passé de 'faire' :", answer:"fait"},
      {type:"mcq", q:"'Tu as mangé hier soir ?' — Cette phrase est au :", options:["Présent","Passé composé","Imparfait"], answer:"Passé composé"},
      {type:"mcq", q:"Comment dit-on 'aéroport' en français ?", options:["aéroport","aéroplage","aérogare"], answer:"aéroport"},
      {type:"mcq", q:"Choisissez la bonne préposition : J'habite ___ Brésil.", options:["en","à","au"], answer:"au"},
      {type:"mcq", q:"'Vous avez combien de chambres ?' — On est dans quel lieu probable ?", options:["À la pharmacie","À l'hôtel","Au restaurant"], answer:"À l'hôtel"},
      {type:"fill", q:"Complétez : Est-ce que tu ___ (vouloir) un café ? (présent)", answer:"veux"},
      {type:"mcq", q:"'Tournez à gauche' signifie :", options:["Vire à direita","Vire à esquerda","Siga em frente"], answer:"Vire à esquerda"},
      {type:"mcq", q:"Imparfait de 'être' avec 'il' :", options:["il était","il est","il sera"], answer:"il était"},
      {type:"mcq", q:"'Je voudrais de l'eau, s'il vous plaît.' — On est probablement :", options:["Dans un bus","Au restaurant","Dans un magasin"], answer:"Au restaurant"},
      {type:"fill", q:"Complétez : Il fait ___ aujourd'hui. (froid / beau / chaud — choisissez 'chaud')", answer:"chaud"}
    ]
  },
  {
    id:"test_b1", level:"B1", title:"Test de niveau — B1",
    desc:"Avalia nível B1: imparfait vs passé composé, pronomes, futur, compreensão de textos simples.",
    questions:[
      {type:"mcq", q:"Choisissez le bon temps : 'Quand j'étais enfant, je ___ du vélo tous les jours.' (faire)", options:["faisais","ai fait","ferai"], answer:"faisais"},
      {type:"mcq", q:"'Je lui téléphone chaque soir.' — À qui téléphone-t-il ?", options:["À une chose","À une personne","Il téléphone à lui-même"], answer:"À une personne"},
      {type:"fill", q:"Remplacez : 'Je mange les pommes.' → 'Je ___ mange.'", answer:"les"},
      {type:"mcq", q:"'Il pleuvait quand nous sommes arrivés.' — Quel temps est utilisé pour la description ?", options:["Passé composé","Imparfait","Futur"], answer:"Imparfait"},
      {type:"mcq", q:"Futur simple de 'avoir' avec 'nous' :", options:["nous avons","nous aurons","nous aurions"], answer:"nous aurons"},
      {type:"mcq", q:"'Je doute qu'il ___ là.' (être — subjonctif)", options:["est","soit","serait"], answer:"soit"},
      {type:"mcq", q:"Que signifie 'néanmoins' ?", options:["Portanto","No entanto","Além disso"], answer:"No entanto"},
      {type:"fill", q:"Complétez avec 'y' ou 'en' : 'Tu vas à Paris ? — Oui, j'___ vais demain.'", answer:"y"},
      {type:"mcq", q:"'Nous sommes partis tôt.' — Pourquoi 'être' ?", options:["Partir est un verbe de mouvement","Partir est régulier","Le sujet est féminin"], answer:"Partir est un verbe de mouvement"},
      {type:"mcq", q:"Conditionnel de 'vouloir' avec 'je' (forme polie) :", options:["je veux","je voulais","je voudrais"], answer:"je voudrais"},
      {type:"mcq", q:"Quel pronom relatif complète : 'C'est le livre ___ j'ai lu.'", options:["qui","que","dont"], answer:"que"},
      {type:"fill", q:"Subjonctif de 'venir' : 'Il faut que tu ___ maintenant.'", answer:"viennes"}
    ]
  },
  {
    id:"test_b2", level:"B2", title:"Test de niveau — B2",
    desc:"Avalia nível B2: subjonctif, conditionnel, voix passive, argumentation, textos.",
    questions:[
      {type:"mcq", q:"Voix passive : 'Le chef a préparé le plat.' →", options:["Le plat a été préparé par le chef.","Le plat a préparé par le chef.","Le plat était préparé du chef."], answer:"Le plat a été préparé par le chef."},
      {type:"mcq", q:"'Si j'avais le temps, je ___ ce livre.' (lire)", options:["lirais","lirai","lisais"], answer:"lirais"},
      {type:"mcq", q:"Discours indirect : 'Elle a dit : « Je viendrai demain. »' →", options:["Elle a dit qu'elle viendrait le lendemain.","Elle a dit qu'elle vient demain.","Elle a dit qu'elle est venue."], answer:"Elle a dit qu'elle viendrait le lendemain."},
      {type:"fill", q:"Pronom relatif : 'C'est l'ami ___ je t'ai parlé.'", answer:"dont"},
      {type:"mcq", q:"'Il est urgent que nous ___ une solution.' (trouver — subjonctif)", options:["trouvons","trouvions","trouverons"], answer:"trouvions"},
      {type:"mcq", q:"Quel mot exprime la CONSÉQUENCE logique ?", options:["Néanmoins","Par conséquent","En outre"], answer:"Par conséquent"},
      {type:"mcq", q:"Accord du participe passé : 'Les lettres qu'il a ___.' (écrire)", options:["écrit","écrites","écrits"], answer:"écrites"},
      {type:"mcq", q:"Gérondif de 'manger' :", options:["mangeant","en mangeant","mangé"], answer:"en mangeant"},
      {type:"fill", q:"Complétez : 'La décision ___ (prendre) demain sera importante.' (futur passif)", answer:"qui sera prise"},
      {type:"mcq", q:"'Nonobstant' est un terme :", options:["Littéraire et courant","Juridique et formel","Familier"], answer:"Juridique et formel"},
      {type:"mcq", q:"'Loin de s'améliorer, la situation se dégrade.' — Quel sens a 'loin de' ici ?", options:["Au lieu de / Ao contrário de","Perto de","Apesar de"], answer:"Au lieu de / Ao contrário de"},
      {type:"mcq", q:"Conditionnel passé de 'faire' avec 'il' :", options:["il ferait","il faisait","il aurait fait"], answer:"il aurait fait"}
    ]
  },
  {
    id:"test_c1", level:"C1", title:"Test de niveau — C1",
    desc:"Avalia nível C1: estruturas avançadas, conectores formais, nuances de sentido e texto complexo.",
    questions:[
      {type:"mcq", q:"Quel temps exprime une hypothèse irréelle dans le passé ?", options:["Conditionnel présent","Conditionnel passé","Subjonctif présent"], answer:"Conditionnel passé"},
      {type:"fill", q:"Complétez : 'Quoi qu'il ___  (faire), le résultat sera le même.' (subjonctif)", answer:"fasse"},
      {type:"mcq", q:"Quel connecteur exprime une CONCESSION ?", options:["Ainsi","Bien que","De plus"], answer:"Bien que"},
      {type:"mcq", q:"'La mémoire est une faculté reconstructive, ___ que l'on pourrait le croire.' (concession)", options:["plutôt","bien","davantage"], answer:"plutôt"},
      {type:"mcq", q:"Style indirect libre : 'Elle sourit. La vie valait la peine d'être vécue.' — Ce passage est vu de quel point de vue ?", options:["Le narrateur omniscient externe","Le personnage lui-même (intérieur)","Un autre personnage"], answer:"Le personnage lui-même (intérieur)"},
      {type:"fill", q:"Complétez : 'C'est une décision ___ (dont/à laquelle/qui) nous devons réfléchir.'", answer:"à laquelle"},
      {type:"mcq", q:"Que signifie 'dans la mesure où' ?", options:["À cause de","Dans la proportion où / visto que","Malgré le fait que"], answer:"Dans la proportion où / visto que"},
      {type:"mcq", q:"Phrase correcte ?", options:["Il faut que tu sois présent.","Il faut que tu es présent.","Il faut que tu seras présent."], answer:"Il faut que tu sois présent."},
      {type:"fill", q:"Nominalisez : 'décider' → la ___", answer:"décision"},
      {type:"mcq", q:"'Eu sei lá' en français familier :", options:["je sais comment","chais pas","je ne sais plus"], answer:"chais pas"},
      {type:"mcq", q:"Quel verbe régit le subjonctif ?", options:["Je pense que","Je suis sûr que","Je doute que"], answer:"Je doute que"},
      {type:"mcq", q:"'Son discours, pourtant clair, n'a convaincu personne.' — 'Pourtant' exprime :", options:["Une cause","Une conséquence","Une concession / opposition"], answer:"Une concession / opposition"}
    ]
  }
];
