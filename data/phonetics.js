/* ==========================================================================
   FRANÇAIS COMPLET — Banco de Fonética
   Estrutura: sections[] each { id, title, intro, items[] }
   items: { fr, ipa, ptbr, note, ex_fr, ex_pt } — usado para alfabeto, sons, etc.
   ========================================================================== */
window.PHONETICS_DATA = {
  sections:[
    {
      id:"alfabeto", title:"O alfabeto francês",
      intro:"O alfabeto francês tem as mesmas 26 letras do português, mas vários nomes de letras soam bem diferentes. Aprender a soletrar (épeler) é essencial para entender endereços, e-mails e nomes por telefone.",
      items:[
        {fr:"A", ipa:"/a/", ptbr:"A"}, {fr:"B", ipa:"/be/", ptbr:"BÊ"}, {fr:"C", ipa:"/se/", ptbr:"SÊ"},
        {fr:"D", ipa:"/de/", ptbr:"DÊ"}, {fr:"E", ipa:"/ə/", ptbr:"E (curto)"}, {fr:"F", ipa:"/ɛf/", ptbr:"EF"},
        {fr:"G", ipa:"/ʒe/", ptbr:"JÊ"}, {fr:"H", ipa:"/aʃ/", ptbr:"ASH"}, {fr:"I", ipa:"/i/", ptbr:"I"},
        {fr:"J", ipa:"/ʒi/", ptbr:"JI"}, {fr:"K", ipa:"/ka/", ptbr:"KA"}, {fr:"L", ipa:"/ɛl/", ptbr:"EL"},
        {fr:"M", ipa:"/ɛm/", ptbr:"EM"}, {fr:"N", ipa:"/ɛn/", ptbr:"EN"}, {fr:"O", ipa:"/o/", ptbr:"Ô"},
        {fr:"P", ipa:"/pe/", ptbr:"PÊ"}, {fr:"Q", ipa:"/ky/", ptbr:"KU"}, {fr:"R", ipa:"/ɛʁ/", ptbr:"ER (gutural)"},
        {fr:"S", ipa:"/ɛs/", ptbr:"ES"}, {fr:"T", ipa:"/te/", ptbr:"TÊ"}, {fr:"U", ipa:"/y/", ptbr:"U (fechado)"},
        {fr:"V", ipa:"/ve/", ptbr:"VÊ"}, {fr:"W", ipa:"/dubl(ə) ve/", ptbr:"DUBL-VÊ"}, {fr:"X", ipa:"/iks/", ptbr:"IKS"},
        {fr:"Y", ipa:"/i ɡʁɛk/", ptbr:"I-GREK"}, {fr:"Z", ipa:"/zɛd/", ptbr:"ZED"}
      ]
    },
    {
      id:"sons_inexistentes", title:"Sons que não existem em português",
      intro:"Quatro sons são os maiores desafios para brasileiros: o 'u' fechado [y], o 'eu' [ø]/[œ], o 'r' francês [ʁ], e as vogais nasais (que são diferentes das nasais do português).",
      items:[
        {fr:"u", ipa:"/y/", ptbr:"entre 'i' e 'u'", note:"Arredonde os lábios como para dizer 'u', mas posicione a língua como para dizer 'i'.", ex_fr:"tu, rue, lune", ex_pt:"tu, rua, lua"},
        {fr:"eu (fechado)", ipa:"/ø/", ptbr:"como 'eu' mas com lábios arredondados", note:"Lábios arredondados, língua na posição de 'ê'.", ex_fr:"deux, peu, bleu", ex_pt:"dois, pouco, azul"},
        {fr:"eu (aberto) / œu", ipa:"/œ/", ptbr:"entre 'é' e 'ó'", note:"Versão mais aberta do som anterior.", ex_fr:"sœur, peur, jeune", ex_pt:"irmã, medo, jovem"},
        {fr:"r francês", ipa:"/ʁ/", ptbr:"'r' gutural, na garganta", note:"Não é o 'r' do português. É produzido na garganta, parecido com um som gargarejado suave — semelhante ao 'r' carioca, mas mais para trás.", ex_fr:"rouge, Paris, merci", ex_pt:"vermelho, Paris, obrigado"}
      ]
    },
    {
      id:"nasais", title:"Vogais nasais",
      intro:"O francês tem 4 vogais nasais principais. Diferente do português, em francês a consoante nasal (n/m) que segue a vogal NÃO é pronunciada — apenas nasaliza a vogal anterior.",
      items:[
        {fr:"an / en", ipa:"/ɑ̃/", ptbr:"AN (bem aberto e nasalado)", ex_fr:"France, enfant, dans", ex_pt:"França, criança, dentro"},
        {fr:"on", ipa:"/ɔ̃/", ptbr:"ON (nasalado, boca arredondada)", ex_fr:"bonjour, maison, son", ex_pt:"olá, casa, som"},
        {fr:"in / ain / ein", ipa:"/ɛ̃/", ptbr:"AN (mais fechado, tipo 'ã' curto)", ex_fr:"vin, pain, important", ex_pt:"vinho, pão, importante"},
        {fr:"un", ipa:"/œ̃/", ptbr:"AN (raro, tende a se fundir com /ɛ̃/ no francês moderno)", ex_fr:"un, parfum, lundi", ex_pt:"um, perfume, segunda-feira"}
      ]
    },
    {
      id:"vogais_dificeis", title:"Outras vogais difíceis",
      intro:"Além das nasais, algumas vogais orais exigem atenção pela diferença de abertura e arredondamento dos lábios.",
      items:[
        {fr:"é (fechado)", ipa:"/e/", ptbr:"Ê fechado", ex_fr:"été, café, parler", ex_pt:"verão, café, falar"},
        {fr:"è (aberto)", ipa:"/ɛ/", ptbr:"É aberto", ex_fr:"être, père, mère", ex_pt:"ser, pai, mãe"},
        {fr:"o (fechado)", ipa:"/o/", ptbr:"Ô fechado", ex_fr:"eau, mot, beau", ex_pt:"água, palavra, bonito"},
        {fr:"o (aberto)", ipa:"/ɔ/", ptbr:"Ó aberto", ex_fr:"homme, porte, sport", ex_pt:"homem, porta, esporte"}
      ]
    },
    {
      id:"consoantes", title:"Consoantes especiais",
      intro:"Algumas combinações de letras representam sons consonantais únicos do francês.",
      items:[
        {fr:"gn", ipa:"/ɲ/", ptbr:"NH (como em 'ninho')", ex_fr:"montagne, agneau, champagne", ex_pt:"montanha, cordeiro, champanhe"},
        {fr:"ill / il", ipa:"/j/", ptbr:"Y (como em 'iogurte')", note:"Exceção importante: 'ville', 'mille', 'tranquille' pronunciam o 'l'.", ex_fr:"famille, fille, travail", ex_pt:"família, filha, trabalho"},
        {fr:"ch", ipa:"/ʃ/", ptbr:"SH (como em 'chuva' no sotaque carioca/ch)", ex_fr:"chat, chaise, chocolat", ex_pt:"gato, cadeira, chocolate"},
        {fr:"j / g (antes de e,i)", ipa:"/ʒ/", ptbr:"J (como em 'já')", ex_fr:"jardin, je, manger", ex_pt:"jardim, eu, comer"},
        {fr:"h", ipa:"(muda)", ptbr:"sempre muda, nunca pronunciada", note:"Existe 'h muet' (permite ligação/elisão: l'homme) e 'h aspiré' (bloqueia: le héros).", ex_fr:"homme, héros, hôtel", ex_pt:"homem, herói, hotel"}
      ]
    },
    {
      id:"liaison", title:"A Liaison (ligação)",
      intro:"A liaison é quando uma consoante final, normalmente muda, é pronunciada porque a palavra seguinte começa com vogal ou h mudo. É um dos fenômenos mais característicos do francês falado.",
      items:[
        {fr:"les amis", ipa:"/le.za.mi/", ptbr:"lê-za-MI (o 's' final de 'les' soa como 'z')", ex_fr:"Ce sont les amis de Paul.", ex_pt:"São os amigos do Paul."},
        {fr:"un grand homme", ipa:"/œ̃ ɡʁɑ̃.tɔm/", ptbr:"an-gran-TOM (o 'd' soa como 't')", ex_fr:"C'est un grand homme.", ex_pt:"É um grande homem."},
        {fr:"vous avez", ipa:"/vu.za.ve/", ptbr:"vu-za-VÊ", ex_fr:"Vous avez raison.", ex_pt:"Você tem razão."}
      ]
    },
    {
      id:"elisao", title:"A Elisão",
      intro:"A elisão acontece quando uma vogal final muda (geralmente 'e' ou 'a') é suprimida antes de palavra começando por vogal ou h mudo, sendo substituída por apóstrofo. Ocorre com: je, me, te, se, le, la, de, ne, que, ce, si (apenas antes de 'il').",
      items:[
        {fr:"je + aime → j'aime", ipa:"/ʒɛm/", ptbr:"JEM", ex_fr:"J'aime le chocolat.", ex_pt:"Eu gosto de chocolate."},
        {fr:"la + école → l'école", ipa:"/le.kɔl/", ptbr:"lê-KOL", ex_fr:"L'école commence à huit heures.", ex_pt:"A escola começa às oito horas."},
        {fr:"que + il → qu'il", ipa:"/kil/", ptbr:"KIL", ex_fr:"Je pense qu'il a raison.", ex_pt:"Eu acho que ele tem razão."}
      ]
    },
    {
      id:"entonacao", title:"Entonação e ritmo",
      intro:"O francês tem ritmo silábico relativamente uniforme (diferente do português, que tende a reduzir sílabas átonas). A entonação geralmente sobe no meio da frase e cai no final em afirmações; sobe no final em perguntas com entonação.",
      items:[
        {fr:"Tu viens avec nous ? (pergunta)", ipa:"↗ no final", ptbr:"entonação ascendente", ex_fr:"Tu viens avec nous ?", ex_pt:"Você vem com a gente?"},
        {fr:"Je suis content. (afirmação)", ipa:"↘ no final", ptbr:"entonação descendente", ex_fr:"Je suis très content aujourd'hui.", ex_pt:"Eu estou muito contente hoje."}
      ]
    },
    {
      id:"reducao", title:"Redução sonora e francês falado/informal",
      intro:"Na fala rápida e informal, muitos sons são reduzidos ou omitidos. Reconhecer isso é essencial para a compreensão auditiva real (não apenas a fala 'de livro didático').",
      items:[
        {fr:"tu as → t'as", ipa:"/ta/", ptbr:"TA", note:"Muito comum na fala informal.", ex_fr:"T'as faim ?", ex_pt:"Você tá com fome?"},
        {fr:"je ne sais pas → chais pas", ipa:"/ʃɛ pa/", ptbr:"SHÊ-PA", note:"Redução extrema, muito coloquial.", ex_fr:"Chais pas, on verra.", ex_pt:"Sei lá, a gente vê."},
        {fr:"il y a → y'a", ipa:"/ja/", ptbr:"IA", ex_fr:"Y'a personne ici.", ex_pt:"Não tem ninguém aqui."}
      ]
    }
  ]
};
