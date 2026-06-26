/* ==========================================================================
   FRANÇAIS COMPLET — Gamificação: Conquistas, Medalhas e Missões
   ========================================================================== */

/* Níveis de XP — a cada 100 XP o usuário sobe de nível */
window.XP_LEVELS = [
  {level:1,  xpRequired:0,    title:"Débutant",      icon:"🌱"},
  {level:2,  xpRequired:100,  title:"Curieux",       icon:"🔍"},
  {level:3,  xpRequired:250,  title:"Voyageur",      icon:"✈️"},
  {level:4,  xpRequired:450,  title:"Explorateur",   icon:"🗺️"},
  {level:5,  xpRequired:700,  title:"Conversant",    icon:"💬"},
  {level:6,  xpRequired:1000, title:"Communicateur", icon:"📢"},
  {level:7,  xpRequired:1400, title:"Francophone",   icon:"🇫🇷"},
  {level:8,  xpRequired:1900, title:"Érudit",        icon:"📚"},
  {level:9,  xpRequired:2500, title:"Lettré",        icon:"🖊️"},
  {level:10, xpRequired:3200, title:"Maître",        icon:"🏆"}
];

/* XP ganho por ação */
window.XP_REWARDS = {
  exerciseCorrect:10,
  exerciseStreak3:15,
  dialogueComplete:20,
  readingComplete:25,
  flashcardSession:15,
  pronunciationPractice:10,
  testPass:50,
  dailyGoal:30,
  weeklyStreak7:100
};

/* Conquistas desbloqueáveis */
window.ACHIEVEMENTS = [
  {id:"first_lesson",   title:"Bonjour le monde!",  desc:"Complete sua primeira lição.",        icon:"👋", xp:20},
  {id:"first_vocab",    title:"Premier mot",         desc:"Aprenda 10 palavras novas.",          icon:"📝", xp:20},
  {id:"streak3",        title:"Trois de suite",      desc:"3 dias consecutivos de estudo.",      icon:"🔥", xp:30},
  {id:"streak7",        title:"Une semaine !",        desc:"7 dias consecutivos de estudo.",      icon:"🔥", xp:100},
  {id:"streak30",       title:"Un mois de français", desc:"30 dias consecutivos de estudo.",     icon:"🔥", xp:300},
  {id:"vocab100",       title:"Cent mots",           desc:"Aprenda 100 palavras de vocabulário.", icon:"🏅", xp:50},
  {id:"vocab300",       title:"Trois cents mots",    desc:"Aprenda 300 palavras.",               icon:"🥇", xp:150},
  {id:"all_grammar_a1", title:"Bases solides",       desc:"Complete todas as lições A1 de gramática.", icon:"📐", xp:60},
  {id:"all_grammar_b1", title:"Intermédiaire !",     desc:"Complete todas as lições B1 de gramática.", icon:"📐", xp:120},
  {id:"dialogue5",      title:"Bavard",              desc:"Complete 5 diálogos.",                icon:"🗣️", xp:50},
  {id:"dialogue20",     title:"Grand bavard",        desc:"Complete todos os 20 diálogos.",      icon:"🗣️", xp:150},
  {id:"reading_all",    title:"Bibliophile",         desc:"Leia todos os textos de leitura.",    icon:"📖", xp:100},
  {id:"test_a1",        title:"Passeport A1",        desc:"Passe no teste CEFR A1.",             icon:"🛂", xp:80},
  {id:"test_b1",        title:"Passeport B1",        desc:"Passe no teste CEFR B1.",             icon:"🛂", xp:150},
  {id:"test_c1",        title:"Passeport C1",        desc:"Passe no teste CEFR C1.",             icon:"🛂", xp:300},
  {id:"flashcard50",    title:"Mémoriste",           desc:"Revise 50 flashcards.",               icon:"🃏", xp:50},
  {id:"conjugator10",   title:"Conjugueur",          desc:"Conjugue 10 verbos diferentes no Laboratório.", icon:"⚗️", xp:40},
  {id:"pronunciation10",title:"Phonéticien",         desc:"Pratique pronúncia 10 vezes.",        icon:"🎤", xp:40},
  {id:"culture_all",    title:"Culturellement vôtre",desc:"Explore todos os módulos culturais.", icon:"🎨", xp:80},
  {id:"literature_all", title:"Littéraire",          desc:"Leia todas as adaptações literárias.", icon:"✒️", xp:80}
];

/* Missões diárias (uma é sorteada por dia) */
window.DAILY_MISSIONS = [
  {id:"m_vocab",    title:"Vocabulaire du jour",   desc:"Aprenda 5 palavras novas de vocabulário.",        xp:30},
  {id:"m_grammar",  title:"Leçon de grammaire",    desc:"Complete uma lição de gramática com >70% acertos.", xp:35},
  {id:"m_dialogue", title:"Conversation du jour",  desc:"Complete um diálogo de conversação.",              xp:30},
  {id:"m_flashcard",title:"Révision express",      desc:"Revise pelo menos 10 flashcards.",                 xp:25},
  {id:"m_reading",  title:"Lecture du jour",       desc:"Leia e responda às perguntas de um texto.",        xp:35},
  {id:"m_pronun",   title:"Phonétique du jour",    desc:"Pratique pronúncia 3 vezes.",                      xp:25},
  {id:"m_culture",  title:"Culture française",     desc:"Leia um módulo de cultura.",                       xp:20}
];
