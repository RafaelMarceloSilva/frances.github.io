/* ==========================================================================
   FRANÇAIS COMPLET — storage.js v2
   localStorage + SM-2 + Perfil completo + Favoritos + Missões aprimoradas
   ========================================================================== */
var Storage = (function () {
  var self = {};
  var PREFIX = "fc_";

  /* ── Primitivos ── */
  self.get = function(key, def) {
    if (def === undefined) def = null;
    try { var v = localStorage.getItem(PREFIX + key); return v !== null ? JSON.parse(v) : def; }
    catch(e) { return def; }
  };
  self.set = function(key, val) {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(val)); } catch(e) {}
  };

  /* ══════════════════════════════════════
     PERFIL
  ══════════════════════════════════════ */
  self.getProfile = function() {
    return self.get("profile", {
      name: "Aprendiz",
      avatar: "🧑‍🎓",
      xp: 0, level: 1, streak: 0, lastStudyDate: null,
      totalMinutes: 0,
      wordsLearned: 0, phrasesLearned: 0,
      exercisesDone: 0, correctAnswers: 0,
      lessonsCompleted: 0,
      unlockedAchievements: [],
      dailyMissionDate: null,
      dailyMissions: [],
      calendarDays: [],
      dailyGoalXP: 50
    });
  };
  self.saveProfile = function(p) { self.set("profile", p); };

  self.updateProfile = function(data) {
    var p = self.getProfile();
    Object.assign(p, data);
    self.saveProfile(p);
    return p;
  };

  /* ── Streak ── */
  self.updateStreak = function() {
    var p = self.getProfile();
    var today = new Date().toISOString().slice(0, 10);
    if (p.lastStudyDate === today) return p;
    var yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    p.streak = p.lastStudyDate === yesterday ? p.streak + 1 : 1;
    p.lastStudyDate = today;
    if (!p.calendarDays) p.calendarDays = [];
    if (!p.calendarDays.includes(today)) p.calendarDays.push(today);
    self.saveProfile(p);
    return p;
  };

  /* ── XP e Nível ── */
  self.addXP = function(amount) {
    var p = self.getProfile();
    p.xp = (p.xp || 0) + amount;
    if (window.XP_LEVELS) {
      for (var i = window.XP_LEVELS.length - 1; i >= 0; i--) {
        if (p.xp >= window.XP_LEVELS[i].xpRequired) { p.level = window.XP_LEVELS[i].level; break; }
      }
    }
    self.saveProfile(p);
    return p;
  };

  /* ══════════════════════════════════════
     PROGRESSO DE MÓDULOS
  ══════════════════════════════════════ */
  self.getModuleProgress = function(mod) { return self.get("progress_" + mod, {}); };
  self.setModuleProgress = function(mod, id, data) {
    var p = self.getModuleProgress(mod);
    p[id] = Object.assign({}, p[id] || {}, data, { updatedAt: Date.now() });
    self.set("progress_" + mod, p);
  };
  self.isCompleted = function(mod, id) { var p = self.getModuleProgress(mod); return !!(p[id] && p[id].done); };
  self.markDone = function(mod, id, extra) {
    self.setModuleProgress(mod, id, Object.assign({ done: true }, extra || {}));
    var p = self.getProfile();
    p.lessonsCompleted = (p.lessonsCompleted || 0) + 1;
    self.saveProfile(p);
  };

  /* ── Estatísticas ── */
  self.recordExercise = function(correct) {
    var p = self.getProfile();
    p.exercisesDone = (p.exercisesDone || 0) + 1;
    if (correct) p.correctAnswers = (p.correctAnswers || 0) + 1;
    p.totalMinutes = (p.totalMinutes || 0) + 0.5; // aprox 30s por exercício
    self.saveProfile(p);
  };

  self.addStudyTime = function(minutes) {
    var p = self.getProfile();
    p.totalMinutes = (p.totalMinutes || 0) + minutes;
    self.saveProfile(p);
  };

  self.getWeeklyActivity = function() {
    var p = self.getProfile();
    var days = p.calendarDays || [];
    var result = [];
    for (var i = 6; i >= 0; i--) {
      var d = new Date(Date.now() - i * 86400000);
      var key = d.toISOString().slice(0,10);
      var label = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'][d.getDay()];
      result.push({ label: label, date: key, studied: days.includes(key) });
    }
    return result;
  };

  /* ══════════════════════════════════════
     VOCABULÁRIO + FRASES
  ══════════════════════════════════════ */
  self.getLearnedWords = function() { return self.get("learned_words", {}); };
  self.markWordLearned = function(id) {
    var learned = self.getLearnedWords();
    if (!learned[id]) {
      learned[id] = Date.now();
      self.set("learned_words", learned);
      var p = self.getProfile();
      p.wordsLearned = (p.wordsLearned || 0) + 1;
      self.saveProfile(p);
    }
  };

  self.getFavoriteWords = function() { return self.get("fav_words", {}); };
  self.toggleFavoriteWord = function(id) {
    var favs = self.getFavoriteWords();
    if (favs[id]) { delete favs[id]; } else { favs[id] = Date.now(); }
    self.set("fav_words", favs);
    return !!favs[id];
  };

  self.getLearnedPhrases = function() { return self.get("learned_phrases", {}); };
  self.markPhraseLearned = function(id) {
    var learned = self.getLearnedPhrases();
    if (!learned[id]) {
      learned[id] = Date.now();
      self.set("learned_phrases", learned);
      var p = self.getProfile();
      p.phrasesLearned = (p.phrasesLearned || 0) + 1;
      self.saveProfile(p);
    }
  };

  self.getFavoritePhrases = function() { return self.get("fav_phrases", {}); };
  self.toggleFavoritePhrase = function(id) {
    var favs = self.getFavoritePhrases();
    if (favs[id]) { delete favs[id]; } else { favs[id] = Date.now(); }
    self.set("fav_phrases", favs);
    return !!favs[id];
  };

  /* ══════════════════════════════════════
     SM-2 FLASHCARDS
  ══════════════════════════════════════ */
  self.getFlashcards = function() { return self.get("flashcards", {}); };
  self.getFlashcard = function(id) {
    var all = self.getFlashcards();
    return all[id] || { id: id, easiness: 2.5, interval: 1, repetitions: 0, nextReview: Date.now() };
  };
  self.reviewFlashcard = function(id, rating) {
    var card = self.getFlashcard(id);
    if (rating >= 2) {
      if (card.repetitions === 0) card.interval = 1;
      else if (card.repetitions === 1) card.interval = 6;
      else card.interval = Math.round(card.interval * card.easiness);
      card.repetitions++;
    } else {
      card.repetitions = 0;
      card.interval = 1;
    }
    card.easiness = Math.max(1.3, card.easiness + 0.1 - (3 - rating) * (0.08 + (3 - rating) * 0.02));
    card.nextReview = Date.now() + card.interval * 86400000;
    card.lastRating = rating;
    card.lastReviewed = Date.now();
    var all = self.getFlashcards();
    all[id] = card;
    self.set("flashcards", all);
    return card;
  };
  self.getDueFlashcards = function(ids) {
    var now = Date.now();
    var all = self.getFlashcards();
    return ids.filter(function(id) { var c = all[id]; return !c || c.nextReview <= now; });
  };

  /* ══════════════════════════════════════
     CONQUISTAS
  ══════════════════════════════════════ */
  self.unlockAchievement = function(id) {
    var p = self.getProfile();
    if (!p.unlockedAchievements) p.unlockedAchievements = [];
    if (!p.unlockedAchievements.includes(id)) {
      p.unlockedAchievements.push(id);
      self.saveProfile(p);
      if (window.ACHIEVEMENTS) {
        var a = window.ACHIEVEMENTS.find(function(x){ return x.id === id; });
        if (a) self.addXP(a.xp);
      }
      return true;
    }
    return false;
  };

  /* ══════════════════════════════════════
     SISTEMA DE MISSÕES DIÁRIAS
  ══════════════════════════════════════ */
  var MISSION_TEMPLATES = [
    { id:"learn_words",     title:"Aprender novas palavras",       desc:"Aprenda {n} palavras novas",            xp:30, target:10, action:"vocab"    },
    { id:"review_words",    title:"Revisar vocabulário",           desc:"Revise {n} palavras anteriores",        xp:25, target:10, action:"flashcard" },
    { id:"learn_phrases",   title:"Aprender novas frases",         desc:"Aprenda {n} frases novas",              xp:35, target:5,  action:"phrases"   },
    { id:"dialogue",        title:"Ler um diálogo",                desc:"Leia e complete 1 diálogo",             xp:30, target:1,  action:"conversation" },
    { id:"grammar_quiz",    title:"Quiz de gramática",             desc:"Complete 1 lição de gramática",         xp:35, target:1,  action:"grammar"   },
    { id:"reading",         title:"Leitura do dia",                desc:"Leia 1 texto e responda perguntas",     xp:35, target:1,  action:"reading"   },
    { id:"pronunciation",   title:"Praticar pronúncia",            desc:"Pratique pronúncia {n} vezes",          xp:25, target:5,  action:"phonetics" },
    { id:"flashcard_session",title:"Revisão com flashcards",       desc:"Revise {n} flashcards",                 xp:25, target:10, action:"flashcard" },
    { id:"culture",         title:"Módulo de cultura",             desc:"Explore 1 módulo cultural",             xp:20, target:1,  action:"culture"   },
  ];

  self.getTodayMissions = function() {
    var p = self.getProfile();
    var today = new Date().toISOString().slice(0, 10);

    if (p.dailyMissionDate === today && p.dailyMissions && p.dailyMissions.length) {
      return p.dailyMissions;
    }

    // Gera 5 missões aleatórias para hoje
    var shuffled = MISSION_TEMPLATES.slice().sort(function(){ return Math.random() - 0.5; });
    var selected = shuffled.slice(0, 5);
    var missions = selected.map(function(t) {
      return {
        id: t.id, title: t.title,
        desc: t.desc.replace("{n}", t.target),
        xp: t.xp, target: t.target, progress: 0, done: false, action: t.action
      };
    });

    p.dailyMissionDate = today;
    p.dailyMissions = missions;
    self.saveProfile(p);
    return missions;
  };

  self.progressMission = function(action, amount) {
    amount = amount || 1;
    var p = self.getProfile();
    var today = new Date().toISOString().slice(0, 10);
    if (p.dailyMissionDate !== today || !p.dailyMissions) return;
    var changed = false;
    p.dailyMissions.forEach(function(m) {
      if (m.action === action && !m.done) {
        m.progress = Math.min(m.target, (m.progress || 0) + amount);
        if (m.progress >= m.target) {
          m.done = true;
          self.addXP(m.xp);
          changed = true;
        }
      }
    });
    if (changed) {
      // Verifica se todas as missões foram concluídas
      var allDone = p.dailyMissions.every(function(m){ return m.done; });
      if (allDone && !p.dailyAllDone) {
        p.dailyAllDone = true;
        self.addXP(150); // Bônus por completar todas (+150 XP conforme spec)
      }
    }
    self.saveProfile(p);
  };

  self.getMissionSummary = function() {
    var missions = self.getTodayMissions();
    var done = missions.filter(function(m){ return m.done; }).length;
    var totalXP = missions.reduce(function(s, m){ return s + (m.done ? m.xp : 0); }, 0);
    var pct = Math.round((done / missions.length) * 100);
    return { missions: missions, done: done, total: missions.length, pct: pct, totalXP: totalXP };
  };

  /* ── Histórico de pronúncia ── */
  self.addPronunciationHistory = function(entry) {
    var h = self.get("pron_history", []);
    h.unshift(Object.assign({}, entry, { ts: Date.now() }));
    if (h.length > 50) h.pop();
    self.set("pron_history", h);
  };
  self.getPronunciationHistory = function() { return self.get("pron_history", []); };

  /* ── Lab: conjugações usadas ── */
  self.recordConjugatorUse = function(verb) {
    var used = self.get("lab_verbs", []);
    if (!used.includes(verb)) { used.push(verb); self.set("lab_verbs", used); }
    return used.length;
  };

  /* ══════════════════════════════════════
     RESET COMPLETO DE PROGRESSO
  ══════════════════════════════════════ */
  self.resetProgress = function() {
    var keysToReset = [
      "profile", "progress_grammar", "progress_dialogue", "progress_reading",
      "progress_culture", "progress_literature", "progress_test",
      "learned_words", "learned_phrases", "fav_words", "fav_phrases",
      "flashcards", "pron_history", "lab_verbs"
    ];
    keysToReset.forEach(function(k) {
      try { localStorage.removeItem(PREFIX + k); } catch(e) {}
    });
  };

  self.resetAll = function() {
    Object.keys(localStorage).filter(function(k){ return k.startsWith(PREFIX); })
      .forEach(function(k){ localStorage.removeItem(k); });
  };

  return self;
})();
