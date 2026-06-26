/* ==========================================================================
   FRANÇAIS COMPLET — Banco de Gramática
   Estrutura: id, level (CEFR), group (basica/intermediaria/avancada/especialista),
   title, explanation (HTML simples), examples[], exercises[]
   exercise.type: "mcq" | "fill"
   ========================================================================== */
window.GRAMMAR_DATA = [
{
  id:"g01", level:"A1", group:"basica", title:"Artigos definidos e indefinidos",
  explanation:"Em francês, todo substantivo tem um <b>gênero</b> (masculino ou feminino) e precisa de um artigo. <br><br><b>Artigos definidos</b> (o/a/os/as): <i>le</i> (masc.), <i>la</i> (fem.), <i>l'</i> (antes de vogal/h mudo), <i>les</i> (plural). <br><b>Artigos indefinidos</b> (um/uma/uns/umas): <i>un</i> (masc.), <i>une</i> (fem.), <i>des</i> (plural). <br><br>Diferente do português, o gênero de muitas palavras não é intuitivo e precisa ser memorizado junto com a palavra (ex: <i>le soleil</i> = o sol, mas <i>la lune</i> = a lua).",
  examples:[
    {fr:"Le livre est sur la table.", pt:"O livro está sobre a mesa."},
    {fr:"J'ai un chat et une chienne.", pt:"Eu tenho um gato e uma cachorra."},
    {fr:"Les enfants jouent dans le jardin.", pt:"As crianças brincam no jardim."}
  ],
  exercises:[
    {type:"mcq", question:"Complete: ___ maison est grande.", options:["Le","La","Les","Un"], answer:"La", explanation:"'Maison' é feminino, por isso usamos 'la'."},
    {type:"mcq", question:"Complete: J'ai ___ idée.", options:["un","une","des","le"], answer:"une", explanation:"'Idée' é feminino → 'une idée'."},
    {type:"fill", question:"Complete: ___ amis sont arrivés. (artigo definido plural)", answer:"Les", explanation:"Plural sempre usa 'les', independente do gênero."}
  ]
},
{
  id:"g02", level:"A1", group:"basica", title:"Gênero dos substantivos",
  explanation:"Não existe uma regra 100% confiável, mas há padrões úteis: <br>• Terminações tipicamente <b>femininas</b>: -tion, -sion, -té, -ette, -euse, -rice (ex: la nation, la beauté). <br>• Terminações tipicamente <b>masculinas</b>: -age, -ment, -isme, -eau (ex: le voyage, le gouvernement). <br><br>Exceções existem (ex: <i>la page</i>, <i>le silence</i>), então o ideal é aprender cada substantivo já com seu artigo.",
  examples:[
    {fr:"la nation, la télévision, la liberté", pt:"a nação, a televisão, a liberdade"},
    {fr:"le voyage, le gouvernement, le tourisme", pt:"a viagem, o governo, o turismo"}
  ],
  exercises:[
    {type:"mcq", question:"Qual é o gênero mais provável de 'éducation'?", options:["Feminino","Masculino"], answer:"Feminino", explanation:"Terminação -tion é tipicamente feminina."},
    {type:"mcq", question:"Qual é o gênero mais provável de 'logement'?", options:["Feminino","Masculino"], answer:"Masculino", explanation:"Terminação -ment é tipicamente masculina."}
  ]
},
{
  id:"g03", level:"A1", group:"basica", title:"Plural dos substantivos",
  explanation:"A regra geral é adicionar <b>-s</b> ao substantivo (que normalmente não se pronuncia): <i>le livre → les livres</i>. <br><br>Exceções: <br>• Palavras terminadas em -s, -x, -z não mudam: <i>le prix → les prix</i>. <br>• Terminadas em -eau, -eu geralmente recebem -x: <i>le bateau → les bateaux</i>. <br>• Muitas terminadas em -al mudam para -aux: <i>le cheval → les chevaux</i>.",
  examples:[
    {fr:"un livre → des livres", pt:"um livro → uns livros"},
    {fr:"un bateau → des bateaux", pt:"um barco → uns barcos"},
    {fr:"un animal → des animaux", pt:"um animal → uns animais"}
  ],
  exercises:[
    {type:"fill", question:"Plural de 'le journal':", answer:"les journaux", explanation:"-al → -aux: le journal → les journaux."},
    {type:"mcq", question:"Plural de 'le prix':", options:["les prixs","les prix","les prixes"], answer:"les prix", explanation:"Palavras terminadas em -x não mudam no plural."}
  ]
},
{
  id:"g04", level:"A1", group:"basica", title:"Adjetivos: posição e concordância",
  explanation:"Adjetivos concordam em <b>gênero</b> e <b>número</b> com o substantivo. Forma básica: adicione -e para feminino e -s para plural. <br><br>A maioria dos adjetivos vem <b>depois</b> do substantivo (diferente do inglês): <i>une voiture rouge</i>. <br>Mas alguns adjetivos comuns e curtos vêm <b>antes</b>: beau, bon, grand, petit, jeune, vieux, nouveau, joli, mauvais, gros.",
  examples:[
    {fr:"une voiture rouge", pt:"um carro vermelho"},
    {fr:"un petit garçon", pt:"um menino pequeno"},
    {fr:"des fleurs blanches", pt:"flores brancas"}
  ],
  exercises:[
    {type:"mcq", question:"Complete: une histoire ___ (interessante)", options:["intéressant","intéressante","intéressants"], answer:"intéressante", explanation:"'Histoire' é feminino singular → adjetivo recebe -e."},
    {type:"mcq", question:"Onde vai o adjetivo 'petit'?", options:["Antes do substantivo","Depois do substantivo"], answer:"Antes do substantivo", explanation:"'Petit' é um dos adjetivos curtos e comuns que vêm antes."}
  ]
},
{
  id:"g05", level:"A0", group:"basica", title:"Pronomes pessoais sujeito",
  explanation:"Os pronomes sujeito em francês são: <i>je</i> (eu), <i>tu</i> (tu/você informal), <i>il/elle/on</i> (ele/ela/a gente), <i>nous</i> (nós), <i>vous</i> (vocês / você formal), <i>ils/elles</i> (eles/elas). <br><br><b>Atenção:</b> 'vous' é usado tanto para o plural quanto para tratamento formal no singular (como nosso 'o senhor/a senhora'). 'On' é muito usado na fala coloquial no lugar de 'nous'.",
  examples:[
    {fr:"Je suis étudiant.", pt:"Eu sou estudante."},
    {fr:"On va au cinéma ce soir.", pt:"A gente vai ao cinema hoje à noite."},
    {fr:"Vous parlez très bien français.", pt:"O(a) senhor(a) fala francês muito bem."}
  ],
  exercises:[
    {type:"mcq", question:"Qual pronome é usado para tratamento formal no singular?", options:["tu","vous","on"], answer:"vous", explanation:"'Vous' é usado tanto no plural quanto no tratamento formal singular."}
  ]
},
{
  id:"g06", level:"A0", group:"basica", title:"Presente do indicativo: verbos regulares -ER",
  explanation:"Verbos terminados em -ER (como <i>parler</i>) seguem este padrão no presente: <br>je parl<b>e</b> · tu parl<b>es</b> · il/elle parl<b>e</b> · nous parl<b>ons</b> · vous parl<b>ez</b> · ils/elles parl<b>ent</b>. <br><br>As terminações -e, -es, -e, -ent são <b>mudas</b> (não pronunciadas); só -ons e -ez têm som diferente.",
  examples:[
    {fr:"Je parle français et tu parles portugais.", pt:"Eu falo francês e você fala português."},
    {fr:"Nous habitons à Rio de Janeiro.", pt:"Nós moramos no Rio de Janeiro."},
    {fr:"Ils travaillent ensemble.", pt:"Eles trabalham juntos."}
  ],
  exercises:[
    {type:"fill", question:"Conjugue 'manger' com 'nous': Nous ___", answer:"mangeons", explanation:"Verbos -ger recebem um 'e' extra antes de -ons para manter o som suave: nous mangeons."},
    {type:"mcq", question:"Conjugue 'aimer' com 'elle':", options:["aime","aimes","aiment"], answer:"aime", explanation:"il/elle/on usam a mesma forma que 'je': aime."}
  ]
},
{
  id:"g07", level:"A1", group:"basica", title:"Presente do indicativo: verbos -IR e -RE",
  explanation:"Verbos -IR regulares (como <i>finir</i>): je fin<b>is</b>, tu fin<b>is</b>, il fin<b>it</b>, nous fin<b>issons</b>, vous fin<b>issez</b>, ils fin<b>issent</b>. <br><br>Verbos -RE regulares (como <i>vendre</i>): je vend<b>s</b>, tu vend<b>s</b>, il vend, nous vend<b>ons</b>, vous vend<b>ez</b>, ils vend<b>ent</b>. <br><br>Muitos verbos -IR/-RE são irregulares (partir, prendre, etc.) e devem ser memorizados separadamente — use o Conjugador no Laboratório.",
  examples:[
    {fr:"Je finis mes devoirs à 18h.", pt:"Eu termino meu dever de casa às 18h."},
    {fr:"Elle vend des fleurs au marché.", pt:"Ela vende flores na feira."}
  ],
  exercises:[
    {type:"fill", question:"Conjugue 'choisir' com 'vous': Vous ___", answer:"choisissez", explanation:"Verbos -ir regulares: vous + radical + -issez."},
    {type:"mcq", question:"Conjugue 'attendre' com 'il':", options:["attend","attends","attendons"], answer:"attend", explanation:"il/elle/on de verbos -re regulares não recebem terminação extra."}
  ]
},
{
  id:"g08", level:"A1", group:"basica", title:"Negação com ne...pas",
  explanation:"Para negar uma frase, coloca-se <b>ne</b> antes do verbo e <b>pas</b> depois: <i>Je ne sais pas</i>. <br>Antes de vogal ou h mudo, 'ne' vira <b>n'</b>: <i>Je n'aime pas ça</i>. <br><br>Na fala informal, o 'ne' é frequentemente omitido: <i>Je sais pas</i> (coloquial) em vez de <i>Je ne sais pas</i> (formal/escrito).",
  examples:[
    {fr:"Je ne comprends pas.", pt:"Eu não entendo."},
    {fr:"Il n'habite plus ici.", pt:"Ele não mora mais aqui."},
    {fr:"Nous n'avons pas de temps.", pt:"Nós não temos tempo."}
  ],
  exercises:[
    {type:"fill", question:"Negue: 'Je parle anglais.'", answer:"Je ne parle pas anglais.", explanation:"Ne...pas envolve o verbo conjugado."},
    {type:"mcq", question:"Como fica 'ne' antes de 'aime'?", options:["ne aime","n'aime","ne'aime"], answer:"n'aime", explanation:"Antes de vogal, 'ne' faz elisão e vira n'."}
  ]
},
{
  id:"g09", level:"A1", group:"basica", title:"Perguntas: como formular",
  explanation:"Há três formas principais de fazer perguntas em francês: <br>1) <b>Entonação</b> (informal): Tu viens ? <br>2) <b>Est-ce que</b> (neutro): Est-ce que tu viens ? <br>3) <b>Inversão</b> (formal): Viens-tu ? <br><br>Palavras interrogativas comuns: qui (quem), que/quoi (o quê), où (onde), quand (quando), comment (como), pourquoi (por quê), combien (quanto).",
  examples:[
    {fr:"Où est-ce que tu habites ?", pt:"Onde você mora?"},
    {fr:"Comment vous appelez-vous ?", pt:"Como o(a) senhor(a) se chama?"},
    {fr:"Pourquoi tu pleures ?", pt:"Por que você está chorando?"}
  ],
  exercises:[
    {type:"mcq", question:"Qual palavra interrogativa significa 'quando'?", options:["où","quand","comment"], answer:"quand", explanation:"'Quand' = quando."},
    {type:"fill", question:"Transforme em pergunta com est-ce que: 'Tu aimes le café.'", answer:"Est-ce que tu aimes le café ?", explanation:"Basta adicionar 'Est-ce que' no início."}
  ]
},
{
  id:"g10", level:"A1", group:"basica", title:"Preposições de lugar",
  explanation:"Algumas preposições essenciais: <i>à</i> (em/a - cidades), <i>en</i> (em - países femininos), <i>au</i> (em - países masculinos), <i>dans</i> (dentro de), <i>sur</i> (sobre), <i>sous</i> (debaixo de), <i>chez</i> (na casa de). <br><br>Países femininos usam 'en' (en France), países masculinos usam 'au' (au Brésil), países plurais usam 'aux' (aux États-Unis).",
  examples:[
    {fr:"J'habite à Paris, en France.", pt:"Eu moro em Paris, na França."},
    {fr:"Il vit au Brésil.", pt:"Ele vive no Brasil."},
    {fr:"Le chat est sous la table.", pt:"O gato está debaixo da mesa."}
  ],
  exercises:[
    {type:"mcq", question:"Complete: J'habite ___ Portugal.", options:["en","au","à"], answer:"au", explanation:"Portugal é masculino → 'au Portugal'."},
    {type:"mcq", question:"Complete: Je vais ___ chez ma grand-mère.", options:["à","chez","en"], answer:"chez", explanation:"'Chez' indica 'na casa de'."}
  ]
},
{
  id:"g11", level:"A2", group:"intermediaria", title:"Passé composé: formação",
  explanation:"O <b>passé composé</b> expressa ações concluídas no passado (equivalente ao nosso pretérito perfeito). Formação: <b>avoir</b> ou <b>être</b> (no presente) + <b>particípio passado</b>. <br><br>A maioria dos verbos usa <i>avoir</i>: <i>J'ai mangé</i>. <br>Verbos de movimento/mudança de estado (aller, venir, partir, arriver, naître, mourir, monter, descendre, entrer, sortir, retourner, rester, tomber, devenir + reflexivos) usam <i>être</i>, e o particípio concorda com o sujeito: <i>Elle est partie</i>.",
  examples:[
    {fr:"J'ai mangé une crêpe.", pt:"Eu comi uma crepe."},
    {fr:"Elle est arrivée hier soir.", pt:"Ela chegou ontem à noite."},
    {fr:"Nous sommes allés au musée.", pt:"Nós fomos ao museu."}
  ],
  exercises:[
    {type:"mcq", question:"Qual auxiliar usar com 'partir'?", options:["avoir","être"], answer:"être", explanation:"'Partir' é um verbo de movimento que usa 'être'."},
    {type:"fill", question:"Complete: Il ___ (manger) une pomme.", answer:"a mangé", explanation:"Manger usa avoir: il a mangé."}
  ]
},
{
  id:"g12", level:"A2", group:"intermediaria", title:"Particípios passados irregulares comuns",
  explanation:"Muitos verbos frequentes têm particípio passado irregular e devem ser memorizados: <br>être → <b>été</b> · avoir → <b>eu</b> · faire → <b>fait</b> · prendre → <b>pris</b> · voir → <b>vu</b> · dire → <b>dit</b> · mettre → <b>mis</b> · pouvoir → <b>pu</b> · vouloir → <b>voulu</b> · devoir → <b>dû</b> · savoir → <b>su</b> · venir → <b>venu</b> · écrire → <b>écrit</b> · lire → <b>lu</b>.",
  examples:[
    {fr:"J'ai fait mes devoirs.", pt:"Eu fiz meu dever de casa."},
    {fr:"Tu as vu ce film ?", pt:"Você viu esse filme?"},
    {fr:"Nous avons pris le train.", pt:"Nós pegamos o trem."}
  ],
  exercises:[
    {type:"fill", question:"Particípio passado de 'prendre':", answer:"pris", explanation:"prendre → pris (irregular)."},
    {type:"mcq", question:"Particípio passado de 'être':", options:["étant","été","fut"], answer:"été", explanation:"être → été."}
  ]
},
{
  id:"g13", level:"A2", group:"intermediaria", title:"Imparfait",
  explanation:"O <b>imparfait</b> descreve ações habituais, contínuas ou contextos no passado (equivalente ao nosso pretérito imperfeito: 'eu fazia', 'estava fazendo'). <br><br>Formação: radical de 'nous' no presente (sem -ons) + terminações -ais, -ais, -ait, -ions, -iez, -aient. <br>Exceção: être tem radical irregular <i>ét-</i>.",
  examples:[
    {fr:"Quand j'étais petit, j'habitais à Lyon.", pt:"Quando eu era pequeno, eu morava em Lyon."},
    {fr:"Il faisait beau ce jour-là.", pt:"Estava bonito (o tempo) naquele dia."},
    {fr:"Nous mangions ensemble tous les dimanches.", pt:"A gente comia junto todos os domingos."}
  ],
  exercises:[
    {type:"fill", question:"Conjugue 'avoir' no imparfait com 'tu': Tu ___ peur.", answer:"avais", explanation:"avoir → radical av- + ais = avais."},
    {type:"mcq", question:"O imparfait expressa principalmente:", options:["Uma ação pontual concluída","Uma ação habitual ou descrição no passado","Uma ação futura"], answer:"Uma ação habitual ou descrição no passado", explanation:"Correto — é o tempo de descrição e hábito no passado."}
  ]
},
{
  id:"g14", level:"B1", group:"intermediaria", title:"Passé composé x Imparfait",
  explanation:"Esses dois tempos coexistem e têm funções diferentes: <br>• <b>Passé composé</b>: ação pontual, completa, que faz a história avançar. <br>• <b>Imparfait</b>: descrição, contexto, ação habitual ou em andamento (o 'cenário' da história). <br><br>É muito comum os dois aparecerem juntos: o imparfait descreve a cena, o passé composé narra o que aconteceu.",
  examples:[
    {fr:"Il pleuvait (imparfait) quand je suis sorti (passé composé).", pt:"Estava chovendo quando eu saí."},
    {fr:"Je regardais la télé quand le téléphone a sonné.", pt:"Eu estava assistindo TV quando o telefone tocou."}
  ],
  exercises:[
    {type:"mcq", question:"'J'avais 10 ans quand nous ___ (déménager) à Paris.' Qual tempo?", options:["passé composé","imparfait"], answer:"passé composé", explanation:"A mudança é um evento pontual que interrompe o contexto: nous avons déménagé."},
    {type:"fill", question:"Complete com imparfait: 'Le soleil ___ (briller) ce matin-là.'", answer:"brillait", explanation:"Descrição de cenário → imparfait."}
  ]
},
{
  id:"g15", level:"A2", group:"intermediaria", title:"Futur proche e Futur simple",
  explanation:"<b>Futur proche</b> (ação iminente/planejada): aller (no presente) + infinitivo. <i>Je vais partir.</i> <br><br><b>Futur simple</b> (formal, previsões, promessas): infinitivo + terminações -ai, -as, -a, -ons, -ez, -ont (verbos -re perdem o 'e' final). <i>Je partirai.</i> Vários verbos têm radical irregular no futuro: être→ser-, avoir→aur-, aller→ir-, faire→fer-, pouvoir→pourr-, voir→verr-, venir→viendr-.",
  examples:[
    {fr:"Je vais étudier ce soir.", pt:"Eu vou estudar hoje à noite."},
    {fr:"Demain, il fera beau.", pt:"Amanhã, vai fazer um tempo bom."},
    {fr:"Nous serons en France l'année prochaine.", pt:"Nós estaremos na França no ano que vem."}
  ],
  exercises:[
    {type:"fill", question:"Futur simple de 'être' com 'je':", answer:"je serai", explanation:"être tem radical irregular ser-: je serai."},
    {type:"mcq", question:"Futur proche é formado com:", options:["avoir + infinitivo","aller + infinitivo","être + infinitivo"], answer:"aller + infinitivo", explanation:"Correto: aller no presente + infinitivo."}
  ]
},
{
  id:"g16", level:"B1", group:"intermediaria", title:"Pronomes complemento direto (COD) e indireto (COI)",
  explanation:"COD (substitui 'o quê/quem' sem preposição): me, te, le/la, nous, vous, les. <br>COI (substitui pessoas precedidas de 'à'): me, te, lui, nous, vous, leur. <br><br>Esses pronomes vêm <b>antes</b> do verbo conjugado (exceto no imperativo afirmativo).",
  examples:[
    {fr:"Je vois Marie. → Je la vois.", pt:"Eu vejo a Marie. → Eu a vejo."},
    {fr:"Je parle à Paul. → Je lui parle.", pt:"Eu falo com o Paul. → Eu falo com ele."},
    {fr:"Tu m'aimes ?", pt:"Você me ama?"}
  ],
  exercises:[
    {type:"mcq", question:"'Je donne le livre à mon frère.' → 'Je ___ donne le livre.'", options:["le","lui","la"], answer:"lui", explanation:"'à mon frère' é objeto indireto → lui."},
    {type:"fill", question:"Substitua: 'Je regarde les enfants.' → 'Je ___ regarde.'", answer:"les", explanation:"'les enfants' (objeto direto plural) → les."}
  ]
},
{
  id:"g17", level:"B1", group:"intermediaria", title:"Pronomes Y e EN",
  explanation:"<b>Y</b> substitui um lugar ou complemento introduzido por 'à': <i>Je vais à Paris → J'y vais.</i> <br><b>EN</b> substitui um complemento introduzido por 'de' ou uma quantidade: <i>Je veux du pain → J'en veux.</i>",
  examples:[
    {fr:"Tu penses à ton avenir ? — Oui, j'y pense.", pt:"Você pensa no seu futuro? — Sim, eu penso nisso."},
    {fr:"Tu as des frères ? — Oui, j'en ai deux.", pt:"Você tem irmãos? — Sim, eu tenho dois."}
  ],
  exercises:[
    {type:"mcq", question:"'Je viens de Paris.' → 'J'___ viens.'", options:["y","en","le"], answer:"en", explanation:"'de Paris' → en."},
    {type:"mcq", question:"'Il va au marché.' → 'Il ___ va.'", options:["y","en","lui"], answer:"y", explanation:"Lugar com 'à/au' → y."}
  ]
},
{
  id:"g18", level:"B1", group:"intermediaria", title:"Comparativo e superlativo",
  explanation:"<b>Comparativo</b>: plus...que (mais que), moins...que (menos que), aussi...que (tão...quanto). <br><b>Superlativo</b>: le/la/les plus... / le/la/les moins... <br><br>Irregular importante: <i>bon → meilleur (melhor)</i>, não 'plus bon'.",
  examples:[
    {fr:"Paris est plus grande que Lyon.", pt:"Paris é maior que Lyon."},
    {fr:"C'est le meilleur restaurant de la ville.", pt:"É o melhor restaurante da cidade."},
    {fr:"Elle est aussi intelligente que son frère.", pt:"Ela é tão inteligente quanto o irmão."}
  ],
  exercises:[
    {type:"fill", question:"Comparativo de superioridade de 'rapide': Le train est ___ rapide ___ la voiture.", answer:"plus rapide que", explanation:"plus + adjetivo + que."},
    {type:"mcq", question:"Comparativo irregular de 'bon':", options:["plus bon","meilleur","bonnier"], answer:"meilleur", explanation:"'bon' tem forma irregular: meilleur."}
  ]
},
{
  id:"g19", level:"B2", group:"avancada", title:"Subjonctif présent",
  explanation:"O <b>subjuntivo</b> expressa dúvida, desejo, emoção, necessidade ou opinião subjetiva, geralmente após 'que'. É usado depois de expressões como: il faut que, je veux que, je doute que, je suis content que. <br><br>Formação regular: radical de 'ils' no presente + terminações -e, -es, -e, -ions, -iez, -ent. Verbos muito irregulares: être (que je sois), avoir (que j'aie), aller (que j'aille), faire (que je fasse).",
  examples:[
    {fr:"Il faut que tu viennes demain.", pt:"É preciso que você venha amanhã."},
    {fr:"Je doute qu'il soit honnête.", pt:"Eu duvido que ele seja honesto."},
    {fr:"Elle est contente que nous soyons là.", pt:"Ela está contente que estejamos aqui."}
  ],
  exercises:[
    {type:"fill", question:"Subjonctif de 'être' com 'il faut que tu...': il faut que tu ___", answer:"sois", explanation:"être no subjuntivo: que tu sois."},
    {type:"mcq", question:"Subjuntivo é usado após qual expressão?", options:["Je pense que","Il faut que","Je sais que"], answer:"Il faut que", explanation:"'Il faut que' exige subjuntivo por expressar necessidade."}
  ]
},
{
  id:"g20", level:"B2", group:"avancada", title:"Conditionnel présent",
  explanation:"O <b>condicional</b> expressa hipóteses, desejos educados ou conselhos. Formação: radical do futuro + terminações do imparfait (-ais, -ais, -ait, -ions, -iez, -aient). <br><br>Muito usado para pedidos educados: <i>Je voudrais...</i> (eu gostaria de...) e em orações condicionais com 'si' + imparfait.",
  examples:[
    {fr:"Je voudrais un café, s'il vous plaît.", pt:"Eu gostaria de um café, por favor."},
    {fr:"Si j'avais le temps, je voyagerais plus.", pt:"Se eu tivesse tempo, eu viajaria mais."},
    {fr:"Tu devrais te reposer.", pt:"Você deveria descansar."}
  ],
  exercises:[
    {type:"fill", question:"Condicional de 'aimer' com 'je': J'___ voyager.", answer:"aimerais", explanation:"radical futuro aimer- + ais = aimerais."},
    {type:"mcq", question:"'Si j'avais de l'argent, je ___ (acheter) une maison.'", options:["achète","achèterai","achèterais"], answer:"achèterais", explanation:"Si + imparfait → condicional presente na oração principal."}
  ]
},
{
  id:"g21", level:"C1", group:"avancada", title:"Voz passiva",
  explanation:"A voz passiva é formada com <b>être</b> + particípio passado, e o particípio concorda com o sujeito. O agente da ação é introduzido por 'par' (às vezes 'de' com verbos de sentimento). <br><br>O francês usa a voz passiva com menos frequência que o português formal; muitas vezes prefere-se 'on' + verbo ativo.",
  examples:[
    {fr:"Le livre a été écrit par Victor Hugo.", pt:"O livro foi escrito por Victor Hugo."},
    {fr:"Cette décision sera prise demain.", pt:"Essa decisão será tomada amanhã."},
    {fr:"Il est aimé de tous.", pt:"Ele é amado por todos."}
  ],
  exercises:[
    {type:"fill", question:"Passe para a voz passiva: 'Le chef prépare le plat.' → 'Le plat ___ par le chef.'", answer:"est préparé", explanation:"être (presente) + particípio: est préparé."},
    {type:"mcq", question:"Na voz passiva, o particípio concorda com:", options:["O sujeito","O agente","O verbo auxiliar"], answer:"O sujeito", explanation:"Como com être, o particípio concorda com o sujeito da frase."}
  ]
},
{
  id:"g22", level:"C1", group:"avancada", title:"Discurso indireto",
  explanation:"Ao relatar a fala de alguém, mudam-se os pronomes, os tempos verbais (regra de concordância de tempos) e certas expressões de tempo/lugar. <br><br>Presente → Imparfait | Passé composé → Plus-que-parfait | Futur → Conditionnel. Exemplo de expressões que mudam: aujourd'hui → ce jour-là, demain → le lendemain, ici → là.",
  examples:[
    {fr:"Il a dit : « Je suis fatigué. » → Il a dit qu'il était fatigué.", pt:"Ele disse: 'Estou cansado.' → Ele disse que estava cansado."},
    {fr:"Elle a dit : « Je viendrai demain. » → Elle a dit qu'elle viendrait le lendemain.", pt:"Ela disse: 'Virei amanhã.' → Ela disse que viria no dia seguinte."}
  ],
  exercises:[
    {type:"mcq", question:"No discurso indireto, 'je suis' (presente) vira:", options:["j'étais (imparfait)","j'ai été (passé composé)","je serai (futur)"], answer:"j'étais (imparfait)", explanation:"Presente → imparfait na concordância de tempos."},
    {type:"fill", question:"Transforme: Il dit : « Je pars. » → Il a dit qu'il ___", answer:"partait", explanation:"Presente → imparfait: partait."}
  ]
},
{
  id:"g23", level:"C1", group:"avancada", title:"Pronomes relativos: qui, que, dont, où, lequel",
  explanation:"<b>Qui</b> = sujeito da oração relativa (pessoa ou coisa). <b>Que</b> = objeto direto da oração relativa. <b>Dont</b> = substitui complementos com 'de' (dont = do qual/de quem/cujo). <b>Où</b> = lugar ou tempo. <b>Lequel/laquelle/lesquels</b> = usado após preposições (substitui pessoas/coisas).",
  examples:[
    {fr:"La femme qui parle est ma sœur.", pt:"A mulher que está falando é minha irmã."},
    {fr:"Le livre que je lis est passionnant.", pt:"O livro que eu leio é fascinante."},
    {fr:"C'est le sujet dont je parlais.", pt:"É o assunto do qual eu falava."}
  ],
  exercises:[
    {type:"mcq", question:"Complete: 'L'homme ___ je parle est mon professeur.' (de qui)", options:["qui","que","dont"], answer:"dont", explanation:"'Parler de quelqu'un' → dont substitui 'de qui'."},
    {type:"fill", question:"Complete: 'C'est la maison ___ je suis né.' (lugar)", answer:"où", explanation:"'Où' introduz um lugar."}
  ]
},
{
  id:"g24", level:"C1", group:"avancada", title:"Concordância do particípio passado",
  explanation:"Com <b>avoir</b>, o particípio normalmente NÃO concorda com o sujeito, mas concorda com o objeto direto se este vier ANTES do verbo. Com <b>être</b>, o particípio sempre concorda com o sujeito. Verbos pronominais seguem regras parecidas com avoir.",
  examples:[
    {fr:"J'ai vu les photos. (sem concordância, objeto depois)", pt:"Eu vi as fotos."},
    {fr:"Les photos que j'ai vues. (concorda, objeto antes)", pt:"As fotos que eu vi."},
    {fr:"Elle s'est lavée. (concordância pronominal)", pt:"Ela se lavou."}
  ],
  exercises:[
    {type:"mcq", question:"'Les lettres qu'il a ___ (écrire) sont émouvantes.'", options:["écrit","écrite","écrites"], answer:"écrites", explanation:"Objeto direto 'les lettres' (fem. plural) vem antes → concorda: écrites."}
  ]
},
{
  id:"g25", level:"C2", group:"especialista", title:"Francês acadêmico: conectores e argumentação",
  explanation:"Textos acadêmicos usam conectores lógicos precisos para estruturar a argumentação: <br><b>Adição</b>: de plus, en outre, par ailleurs. <br><b>Oposição</b>: cependant, néanmoins, toutefois, en revanche. <br><b>Causa</b>: car, étant donné que, dans la mesure où. <br><b>Consequência</b>: par conséquent, ainsi, dès lors. <br><b>Conclusão</b>: en somme, en définitive, pour conclure.",
  examples:[
    {fr:"Cette étude démontre, par conséquent, l'importance du facteur étudié.", pt:"Este estudo demonstra, portanto, a importância do fator estudado."},
    {fr:"Néanmoins, certaines limites méthodologiques doivent être soulignées.", pt:"No entanto, certas limitações metodológicas devem ser destacadas."}
  ],
  exercises:[
    {type:"mcq", question:"Qual conector expressa oposição formal?", options:["de plus","néanmoins","ainsi"], answer:"néanmoins", explanation:"'Néanmoins' (no entanto) é um conector de oposição típico do registro acadêmico."}
  ]
},
{
  id:"g26", level:"C2", group:"especialista", title:"Francês jurídico: vocabulário e estruturas essenciais",
  explanation:"O francês jurídico usa vocabulário e construções formais específicas: <i>ledit/ladite</i> (o referido/a referida), <i>nonobstant</i> (não obstante), <i>en vertu de</i> (em virtude de), <i>conformément à</i> (conforme/de acordo com), <i>le demandeur/le défendeur</i> (o requerente/o réu), <i>la clause</i> (a cláusula), <i>le contrat</i> (o contrato).",
  examples:[
    {fr:"Conformément à l'article 5 du contrat, les parties s'engagent à...", pt:"Conforme o artigo 5 do contrato, as partes se comprometem a..."},
    {fr:"Le tribunal a statué en faveur du demandeur.", pt:"O tribunal decidiu a favor do requerente."}
  ],
  exercises:[
    {type:"mcq", question:"'Conformément à' significa:", options:["Apesar de","De acordo com","Antes de"], answer:"De acordo com", explanation:"'Conformément à' = em conformidade com / de acordo com."}
  ]
},
{
  id:"g27", level:"C2", group:"especialista", title:"Francês empresarial: correspondência formal",
  explanation:"E-mails e cartas comerciais seguem fórmulas fixas: abertura (<i>Madame, Monsieur,</i>), objeto claro, e fechamento padronizado (<i>Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</i>). Vocabulário-chave: <i>ci-joint</i> (anexo), <i>dans les meilleurs délais</i> (o mais rápido possível), <i>faire suite à</i> (dar seguimento a).",
  examples:[
    {fr:"Faisant suite à notre entretien téléphonique, je vous adresse ci-joint le devis demandé.", pt:"Dando seguimento à nossa conversa telefônica, envio em anexo o orçamento solicitado."},
    {fr:"Je reste à votre disposition pour toute information complémentaire.", pt:"Permaneço à disposição para qualquer informação adicional."}
  ],
  exercises:[
    {type:"mcq", question:"'Ci-joint' significa:", options:["Em anexo","Por fim","No entanto"], answer:"Em anexo", explanation:"'Ci-joint' indica um documento anexado à correspondência."}
  ]
}
];
