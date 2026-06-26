/* ==========================================================================
   FRANÇAIS COMPLET — storage.js
   Gerencia todo o localStorage e o algoritmo SM-2 de repetição espaçada.
   ========================================================================== */
var Storage = (() => {
  const PREFIX = "fc_";

  /* ── Primitivos ── */
  function get(key, def = null) {
    try { const v = localStorage.getItem(PREFIX + key); return v !== null ? JSON.parse(v) : def; }
    catch { return def; }
  }
  function set(key, val) {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(val)); } catch {}
  }

  /* ── Perfil do usuário ── */
  function getProfile() {
    return get("profile", {
      xp: 0, level: 1, streak: 0, lastStudyDate: null,
      totalMinutes: 0, wordsLearned: 0, exercisesDone: 0, correctAnswers: 0,
      unlockedAchievements: [], dailyMissionDate: null, dailyMissionId: null,
      dailyMissionDone: false, calendarDays: []
    });
  }
  function saveProfile(p) { set("profile", p); }

  /* ── Streak ── */
  function updateStreak() {
    const p = getProfile();
    const today = new Date().toISOString().slice(0, 10);
    if (p.lastStudyDate === today) return p;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    p.streak = p.lastStudyDate === yesterday ? p.streak + 1 : 1;
    p.lastStudyDate = today;
    if (!p.calendarDays.includes(today)) p.calendarDays.push(today);
    saveProfile(p);
    return p;
  }

  /* ── XP e Nível ── */
  function addXP(amount) {
    const p = getProfile();
    p.xp += amount;
    // Calcula nível com base em XP_LEVELS (definido em achievements.js)
    if (window.XP_LEVELS) {
      for (let i = window.XP_LEVELS.length - 1; i >= 0; i--) {
        if (p.xp >= window.XP_LEVELS[i].xpRequired) { p.level = window.XP_LEVELS[i].level; break; }
      }
    }
    saveProfile(p);
    return p;
  }

  /* ── Progresso de módulos ── */
  function getModuleProgress(mod) { return get("progress_" + mod, {}); }
  function setModuleProgress(mod, id, data) {
    const p = getModuleProgress(mod);
    p[id] = { ...p[id], ...data, updatedAt: Date.now() };
    set("progress_" + mod, p);
  }
  function isCompleted(mod, id) { const p = getModuleProgress(mod); return !!(p[id] && p[id].done); }
  function markDone(mod, id, extra = {}) { setModuleProgress(mod, id, { done: true, ...extra }); }

  /* ── Estatísticas de exercícios ── */
  function recordExercise(correct) {
    const p = getProfile();
    p.exercisesDone = (p.exercisesDone || 0) + 1;
    if (correct) p.correctAnswers = (p.correctAnswers || 0) + 1;
    saveProfile(p);
  }

  /* ── Vocabulário aprendido ── */
  function markWordLearned(wordId) {
    const learned = get("learned_words", {});
    if (!learned[wordId]) {
      learned[wordId] = Date.now();
      set("learned_words", learned);
      const p = getProfile();
      p.wordsLearned = (p.wordsLearned || 0) + 1;
      saveProfile(p);
    }
  }
  function getLearnedWords() { return get("learned_words", {}); }

  /* ────────────────────────────────
     SM-2: Repetição Espaçada
     ratings: 0=Esqueci  1=Difícil  2=Bom  3=Fácil
  ────────────────────────────────── */
  function getFlashcards() { return get("flashcards", {}); }

  function getFlashcard(id) {
    const all = getFlashcards();
    return all[id] || { id, easiness: 2.5, interval: 1, repetitions: 0, nextReview: Date.now() };
  }

  function reviewFlashcard(id, rating) {
    // rating: 0-3
    const card = getFlashcard(id);
    const q = rating; // 0,1,2,3

    if (q >= 2) {
      if (card.repetitions === 0) card.interval = 1;
      else if (card.repetitions === 1) card.interval = 6;
      else card.interval = Math.round(card.interval * card.easiness);
      card.repetitions++;
    } else {
      card.repetitions = 0;
      card.interval = 1;
    }

    // Atualiza fator de facilidade
    card.easiness = Math.max(1.3,
      card.easiness + 0.1 - (3 - q) * (0.08 + (3 - q) * 0.02)
    );

    card.nextReview = Date.now() + card.interval * 24 * 60 * 60 * 1000;
    card.lastRating = rating;
    card.lastReviewed = Date.now();

    const all = getFlashcards();
    all[id] = card;
    set("flashcards", all);
    return card;
  }

  function getDueFlashcards(vocabIds) {
    const now = Date.now();
    const all = getFlashcards();
    return vocabIds.filter(id => {
      const c = all[id];
      return !c || c.nextReview <= now;
    });
  }

  /* ── Conquistas ── */
  function unlockAchievement(id) {
    const p = getProfile();
    if (!p.unlockedAchievements.includes(id)) {
      p.unlockedAchievements.push(id);
      saveProfile(p);
      // Bônus de XP
      if (window.ACHIEVEMENTS) {
        const a = window.ACHIEVEMENTS.find(x => x.id === id);
        if (a) addXP(a.xp);
      }
      return true; // novo!
    }
    return false;
  }

  /* ── Missão diária ── */
  function getTodayMission() {
    const p = getProfile();
    const today = new Date().toISOString().slice(0, 10);
    if (p.dailyMissionDate === today) {
      return { id: p.dailyMissionId, done: p.dailyMissionDone };
    }
    // sorteia nova missão
    if (window.DAILY_MISSIONS && window.DAILY_MISSIONS.length) {
      const idx = Math.floor(Math.random() * window.DAILY_MISSIONS.length);
      p.dailyMissionDate = today;
      p.dailyMissionId = window.DAILY_MISSIONS[idx].id;
      p.dailyMissionDone = false;
      saveProfile(p);
      return { id: p.dailyMissionId, done: false };
    }
    return null;
  }

  function completeMission() {
    const p = getProfile();
    if (!p.dailyMissionDone) {
      p.dailyMissionDone = true;
      saveProfile(p);
      if (window.XP_REWARDS) addXP(window.XP_REWARDS.dailyGoal);
    }
  }

  /* ── Histórico de pronúncia ── */
  function addPronunciationHistory(entry) {
    const h = get("pron_history", []);
    h.unshift({ ...entry, ts: Date.now() });
    if (h.length > 50) h.pop();
    set("pron_history", h);
  }
  function getPronunciationHistory() { return get("pron_history", []); }

  /* ── Lab: conjugações usadas ── */
  function recordConjugatorUse(verb) {
    const used = get("lab_verbs", []);
    if (!used.includes(verb)) {
      used.push(verb);
      set("lab_verbs", used);
    }
    return used.length;
  }

  /* ── Reset (para fins de debug/teste) ── */
  function resetAll() {
    Object.keys(localStorage)
      .filter(k => k.startsWith(PREFIX))
      .forEach(k => localStorage.removeItem(k));
  }

  return {
    get, set, getProfile, saveProfile, updateStreak, addXP,
    getModuleProgress, setModuleProgress, isCompleted, markDone,
    recordExercise, markWordLearned, getLearnedWords,
    getFlashcards, getFlashcard, reviewFlashcard, getDueFlashcards,
    unlockAchievement, getTodayMission, completeMission,
    addPronunciationHistory, getPronunciationHistory,
    recordConjugatorUse, resetAll
  };
})();
