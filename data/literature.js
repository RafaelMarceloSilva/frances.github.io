/* ==========================================================================
   FRANÇAIS COMPLET — Banco de Literatura Francesa
   Estrutura: authors[] { id, name, years, bio_pt, work, adaptation: {level, text_fr, text_pt, note} }
   IMPORTANTE: os textos de "adaptation" são adaptações graduadas ORIGINAIS,
   escritas para o ensino, inspiradas no tema/estilo da obra — não são
   transcrições das obras originais.
   ========================================================================== */
window.LITERATURE_DATA = {
  authors:[
    {
      id:"hugo", name:"Victor Hugo", years:"1802–1885",
      bio_pt:"Um dos maiores escritores da língua francesa, poeta, romancista e dramaturgo. Engajado politicamente, defendeu causas sociais como a abolição da pena de morte. Suas obras retratam com profundidade a miséria social e a redenção humana.",
      work:"Les Misérables (1862)",
      adaptation:{
        level:"B1",
        text_fr:"Jean avait faim. Depuis des jours, il n'avait rien mangé. Devant la boulangerie, il regardait le pain à travers la vitre.\n\nIl pensa à sa sœur et à ses enfants, qui attendaient chez eux, sans nourriture. Alors, dans un moment de désespoir, il cassa la vitre et prit un pain.\n\nLe boulanger le vit et appela la police. Jean fut arrêté. Ce petit vol allait changer toute sa vie : il passa de longues années en prison pour ce simple morceau de pain.",
        text_pt:"Jean estava com fome. Fazia dias que não comia nada. Diante da padaria, ele olhava o pão através da vitrine.\n\nEle pensou na irmã e nos sobrinhos, que esperavam em casa, sem comida. Então, num momento de desespero, ele quebrou o vidro e pegou um pão.\n\nO padeiro o viu e chamou a polícia. Jean foi preso. Esse pequeno roubo mudaria toda a sua vida: ele passou longos anos na prisão por aquele simples pedaço de pão.",
        note:"Adaptação simplificada inspirada na história de Jean Valjean, personagem central de 'Les Misérables'."
      }
    },
    {
      id:"dumas", name:"Alexandre Dumas", years:"1802–1870",
      bio_pt:"Romancista prolífico, mestre do romance de aventura e capa e espada. Suas histórias, cheias de ação, traição e amizade, continuam populares em todo o mundo.",
      work:"Les Trois Mousquetaires (1844)",
      adaptation:{
        level:"B1",
        text_fr:"D'Artagnan arriva à Paris avec un seul rêve : devenir mousquetaire du roi. Jeune et courageux, il ne possédait presque rien, seulement une vieille épée et beaucoup d'ambition.\n\nDès son premier jour, il provoqua, sans le vouloir, trois mousquetaires célèbres : Athos, Porthos et Aramis. Au lieu de se battre entre eux, ils devinrent les meilleurs amis du monde.\n\nEnsemble, ils défendirent l'honneur et la justice, prêts à risquer leur vie les uns pour les autres. Leur devise était simple : « Un pour tous, tous pour un ! »",
        text_pt:"D'Artagnan chegou a Paris com um único sonho: tornar-se mosqueteiro do rei. Jovem e corajoso, ele quase não possuía nada, apenas uma espada velha e muita ambição.\n\nLogo no primeiro dia, ele provocou, sem querer, três mosqueteiros famosos: Athos, Porthos e Aramis. Em vez de brigarem entre si, eles se tornaram os melhores amigos do mundo.\n\nJuntos, defenderam a honra e a justiça, prontos para arriscar a vida uns pelos outros. O lema deles era simples: 'Um por todos, todos por um!'",
        note:"Adaptação simplificada inspirada em 'Les Trois Mousquetaires'."
      }
    },
    {
      id:"verne", name:"Jules Verne", years:"1828–1905",
      bio_pt:"Pioneiro da ficção científica, imaginou submarinos, viagens à lua e expedições extraordinárias décadas antes de essas tecnologias existirem. Sua obra une aventura, ciência e um fascínio profundo pela exploração.",
      work:"Vingt mille lieues sous les mers (1870)",
      adaptation:{
        level:"B2",
        text_fr:"Le capitaine Nemo vivait loin de la société des hommes, à bord d'un submarin extraordinaire qu'il avait conçu lui-même : le Nautilus. Sous les océans, il avait trouvé une liberté que la terre ferme ne lui offrait plus.\n\nLorsque le professeur Aronnax fut recueilli à bord, il découvrit un monde fascinant : des forêts de corail, des créatures jamais observées, des trésors engloutis depuis des siècles. Mais il comprit aussi que Nemo cachait un lourd secret, une blessure du passé qui expliquait son exil volontaire sous les mers.\n\n« La mer ne appartient pas aux despotes », disait Nemo. « C'est ici, et seulement ici, que je suis véritablement libre. »",
        text_pt:"O capitão Nemo vivia longe da sociedade dos homens, a bordo de um submarino extraordinário que ele mesmo havia projetado: o Nautilus. Sob os oceanos, ele havia encontrado uma liberdade que a terra firme não lhe oferecia mais.\n\nQuando o professor Aronnax foi recolhido a bordo, ele descobriu um mundo fascinante: florestas de coral, criaturas nunca observadas, tesouros submersos havia séculos. Mas ele também compreendeu que Nemo escondia um pesado segredo, uma ferida do passado que explicava seu exílio voluntário sob os mares.\n\n'O mar não pertence aos déspotas', dizia Nemo. 'É aqui, e somente aqui, que sou verdadeiramente livre.'",
        note:"Adaptação simplificada inspirada em 'Vingt mille lieues sous les mers'."
      }
    },
    {
      id:"camus", name:"Albert Camus", years:"1913–1960",
      bio_pt:"Filósofo e escritor, associado ao existencialismo e ao 'absurdo' — a ideia de que o universo não oferece sentido inerente, cabendo ao indivíduo construir seu próprio caminho diante dessa realidade. Recebeu o Prêmio Nobel de Literatura em 1957.",
      work:"L'Étranger (1942)",
      adaptation:{
        level:"C1",
        text_fr:"Le soleil tapait fort ce jour-là, et Antoine sentait la sueur couler le long de son dos. Tout lui paraissait étrangement distant : les voix autour de lui, les visages, même ses propres pensées.\n\nIl avait appris la nouvelle la veille, mais aucune émotion particulière ne montait en lui — ni tristesse profonde, ni soulagement. Simplement une sorte d'indifférence tranquille face à l'absurdité de l'existence, comme si rien, finalement, n'avait vraiment d'importance.\n\nLes gens autour de lui semblaient attendre une réaction qu'il ne pouvait pas leur offrir. Il continua à marcher sous le soleil, conscient que la vie suivrait simplement son cours, indifférente à ses sentiments comme à son absence de sentiments.",
        text_pt:"O sol batia forte naquele dia, e Antoine sentia o suor escorrer pelas costas. Tudo lhe parecia estranhamente distante: as vozes ao redor, os rostos, até seus próprios pensamentos.\n\nEle tinha recebido a notícia na véspera, mas nenhuma emoção particular surgia nele — nem tristeza profunda, nem alívio. Apenas uma espécie de indiferença tranquila diante do absurdo da existência, como se nada, no fim, tivesse realmente importância.\n\nAs pessoas ao redor pareciam esperar uma reação que ele não conseguia lhes oferecer. Ele continuou a caminhar sob o sol, ciente de que a vida simplesmente seguiria seu curso, indiferente a seus sentimentos como à sua ausência de sentimentos.",
        note:"Texto original inspirado nos temas do absurdo e da indiferença existencial explorados em 'L'Étranger' — não é uma transcrição da obra."
      }
    },
    {
      id:"proust", name:"Marcel Proust", years:"1871–1922",
      bio_pt:"Autor de uma das obras mais ambiciosas da literatura mundial, 'À la recherche du temps perdu', conhecido por frases longas, análise psicológica minuciosa e pelo tema da memória involuntária — como um simples sabor pode trazer à tona lembranças inteiras do passado.",
      work:"À la recherche du temps perdu (1913–1927)",
      adaptation:{
        level:"C2",
        text_fr:"Il suffit parfois d'un détail infime — une odeur, une saveur, un son lointain — pour que ressurgisse, intacte, toute une période oubliée de notre existence. Ainsi, lorsque je portai à mes lèvres cette tasse de chocolat chaud, ce fut tout un pan de mon enfance qui revint soudainement à ma mémoire, avec une précision presque douloureuse.\n\nJe revis la cuisine de ma grand-mère, la lumière particulière des après-midis d'hiver, le bruit familier des pas dans l'escalier de bois. Rien de tout cela n'avait été consciemment recherché ; tout avait simplement attendu, patiemment enfoui, qu'un goût familier vienne en libérer le souvenir.\n\nC'est ainsi, je crois, que fonctionne véritablement le passé : non comme un livre que l'on consulte à volonté, mais comme un trésor dormant, accessible seulement par les voies détournées et imprévisibles de la sensation.",
        text_pt:"Às vezes basta um detalhe ínfimo — um cheiro, um sabor, um som distante — para que ressurja, intacto, todo um período esquecido da nossa existência. Assim, quando levei aos lábios aquela xícara de chocolate quente, foi todo um pedaço da minha infância que voltou subitamente à minha memória, com uma precisão quase dolorosa.\n\nEu revi a cozinha da minha avó, a luz particular das tardes de inverno, o som familiar dos passos na escada de madeira. Nada disso havia sido conscientemente buscado; tudo simplesmente esperava, pacientemente enterrado, que um sabor familiar viesse libertar a lembrança.\n\nÉ assim, creio eu, que funciona verdadeiramente o passado: não como um livro que se consulta à vontade, mas como um tesouro adormecido, acessível apenas pelos caminhos indiretos e imprevisíveis da sensação.",
        note:"Texto original inspirado no tema da 'memória involuntária', central em 'À la recherche du temps perdu' — não é uma transcrição da obra."
      }
    }
  ]
};
