/* ==========================================================================
   FRANÇAIS COMPLET — pages.js
   Usa "var self = {}" internamente para que TODOS os métodos Pages._xxx
   sobrevivam ao retorno do IIFE e fiquem acessíveis via onclick="Pages._xxx()"
   ========================================================================== */
var Pages = (function () {
  var self = {};          // acumulador — será o Pages final
  self._activeQuestions = {};

  /* ── Helpers internos ── */
  function show(id) {
    document.querySelectorAll(".page").forEach(function(p){ p.classList.add("hidden"); });
    var el = document.getElementById(id);
    if (el) el.classList.remove("hidden");
  }

  function speakBtn(text, label) {
    label = label || "🔊 Ouvir";
    var safe = text.replace(/\\/g,"\\\\").replace(/'/g,"\\'");
    return '<button class="btn-listen" onclick="Speech.speak(\'' + safe + '\')">' + label + '</button>';
  }

  function mcqBlock(questions, prefix, onDone) {
    var wrap = document.createElement("div");
    wrap.className = "exercise-block";
    self._activeQuestions[prefix] = { questions: questions, score: 0, answered: 0, total: questions.length, onDone: onDone };
    questions.forEach(function(q, i) {
      var qDiv = document.createElement("div");
      qDiv.className = "question";
      qDiv.id = prefix + "_q" + i;
      var html = '<p class="q-text"><b>Q' + (i+1) + '.</b> ' + (q.q || q.question) + '</p>';
      if (q.type === "fill") {
        html += '<div class="fill-row"><input type="text" class="fill-input" placeholder="Sua resposta…" id="' + prefix + '_i' + i + '">' +
          '<button class="btn-check" onclick="Pages._checkFill(\'' + prefix + '\',' + i + ')">Verificar</button></div>' +
          '<div class="q-feedback" id="' + prefix + '_f' + i + '"></div>';
      } else {
        var opts = (q.options || []).map(function(o){
          return '<button class="opt-btn" onclick="Pages._checkMCQ(\'' + prefix + '\',' + i + ',\'' + o.replace(/'/g,"\\'") + '\')">' + o + '</button>';
        }).join("");
        html += '<div class="opts">' + opts + '</div><div class="q-feedback" id="' + prefix + '_f' + i + '"></div>';
      }
      qDiv.innerHTML = html;
      wrap.appendChild(qDiv);
    });
    return wrap;
  }

  self._checkMCQ = function(prefix, i, chosen) {
    var state = self._activeQuestions[prefix];
    if (!state) return;
    var q = state.questions[i];
    var fbEl = document.getElementById(prefix + "_f" + i);
    var qDiv = document.getElementById(prefix + "_q" + i);
    if (!fbEl || qDiv.dataset.answered) return;
    qDiv.dataset.answered = "1";
    qDiv.querySelectorAll(".opt-btn").forEach(function(b) {
      b.disabled = true;
      if (b.textContent.trim() === q.answer) b.classList.add("correct");
      else if (b.textContent.trim() === chosen) b.classList.add("wrong");
    });
    var ok = chosen === q.answer;
    if (ok) state.score++;
    state.answered++;
    fbEl.innerHTML = ok ? '<span class="fb-ok">✓ Correto!</span>' : '<span class="fb-err">✗ Resposta: <b>' + q.answer + '</b></span>';
    if (q.explanation) fbEl.innerHTML += ' <span class="fb-exp">' + q.explanation + '</span>';
    Storage.recordExercise(ok);
    if (ok) Storage.addXP(window.XP_REWARDS ? window.XP_REWARDS.exerciseCorrect : 10);
    App.updateXPBar();
    if (state.answered === state.total && state.onDone) state.onDone(state.score, state.total);
  };

  self._checkFill = function(prefix, i) {
    var state = self._activeQuestions[prefix];
    if (!state) return;
    var q = state.questions[i];
    var inp = document.getElementById(prefix + "_i" + i);
    var fbEl = document.getElementById(prefix + "_f" + i);
    var qDiv = document.getElementById(prefix + "_q" + i);
    if (!inp || !fbEl || qDiv.dataset.answered) return;
    qDiv.dataset.answered = "1";
    inp.disabled = true;
    var val = inp.value.trim().toLowerCase();
    var ans = q.answer.toLowerCase();
    var ok = val === ans;
    if (ok) state.score++;
    state.answered++;
    fbEl.innerHTML = ok ? '<span class="fb-ok">✓ Correto!</span>' : '<span class="fb-err">✗ Resposta: <b>' + q.answer + '</b></span>';
    if (q.explanation) fbEl.innerHTML += ' <span class="fb-exp">' + q.explanation + '</span>';
    Storage.recordExercise(ok);
    if (ok) Storage.addXP(window.XP_REWARDS ? window.XP_REWARDS.exerciseCorrect : 10);
    App.updateXPBar();
    if (state.answered === state.total && state.onDone) state.onDone(state.score, state.total);
  };

  /* ════════════════════════════════════════════════════
     DASHBOARD
  ════════════════════════════════════════════════════ */
  self.dashboard = function() {
    show("page-dashboard");
    var p = Storage.getProfile();
    var pct = p.exercisesDone > 0 ? Math.round((p.correctAnswers / p.exercisesDone) * 100) : 0;
    var learned = Object.keys(Storage.getLearnedWords()).length;
    var lvl = (window.XP_LEVELS || []).find(function(l){ return l.level === p.level; }) || {};
    var mission = Storage.getTodayMission();
    var missionData = (window.DAILY_MISSIONS || []).find(function(m){ return m.id === (mission && mission.id); });
    var el = document.getElementById("page-dashboard");

    el.innerHTML =
      '<div class="page-header"><h1>🗺️ Carnet de bord</h1></div>' +
      '<div class="stats-grid">' +
        '<div class="stat-card"><div class="stat-val">' + p.xp + '<span class="stat-unit"> XP</span></div><div class="stat-label">Total XP</div></div>' +
        '<div class="stat-card"><div class="stat-val">' + (lvl.icon||"🌱") + ' ' + p.level + '</div><div class="stat-label">Nível · ' + (lvl.title||"Débutant") + '</div></div>' +
        '<div class="stat-card accent"><div class="stat-val">🔥 ' + p.streak + '</div><div class="stat-label">Dias consecutivos</div></div>' +
        '<div class="stat-card"><div class="stat-val">' + learned + '</div><div class="stat-label">Palavras aprendidas</div></div>' +
        '<div class="stat-card"><div class="stat-val">' + p.exercisesDone + '</div><div class="stat-label">Exercícios feitos</div></div>' +
        '<div class="stat-card"><div class="stat-val">' + pct + '%</div><div class="stat-label">Precisão geral</div></div>' +
      '</div>' +
      '<div class="section-title">🎯 Missão do dia</div>' +
      '<div class="mission-card' + (mission && mission.done ? ' done' : '') + '">' +
        (missionData ? '<b>' + missionData.title + '</b> <span class="mission-xp">+' + missionData.xp + ' XP</span><br><span>' + missionData.desc + '</span>' +
          (mission && mission.done ? '<span class="mission-badge">✓ Concluída!</span>' : '') : '<span>Nenhuma missão.</span>') +
      '</div>' +
      '<div class="section-title">🚀 Continuar estudando</div>' +
      '<div class="quick-links">' +
        [["vocabulary","📖","Vocabulário"],["grammar","📐","Gramática"],["conversation","🗣️","Conversação"],
         ["flashcards","🃏","Flashcards"],["phonetics","🎤","Fonética"],["lab","⚗️","Laboratório"],
         ["culture","🎨","Cultura"],["tests","📋","Testes CEFR"],["literature","✒️","Literatura"],["immersion","🌊","Imersão"]]
        .map(function(l){ return '<button class="quick-link" onclick="Router.navigate(\'' + l[0] + '\')"><span class="ql-icon">' + l[1] + '</span><span class="ql-label">' + l[2] + '</span></button>'; }).join("") +
      '</div>' +
      '<div class="section-title">📅 Calendário (últimos 30 dias)</div>' +
      '<div class="calendar-grid" id="cal-grid"></div>';

    var cal = document.getElementById("cal-grid");
    var days = p.calendarDays || [];
    for (var i = 29; i >= 0; i--) {
      var d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      var div = document.createElement("div");
      div.className = "cal-day" + (days.includes(d) ? " studied" : "");
      div.title = d;
      cal.appendChild(div);
    }
  };

  /* ════════════════════════════════════════════════════
     FONÉTICA
  ════════════════════════════════════════════════════ */
  self.phonetics = function() {
    show("page-phonetics");
    var data = window.PHONETICS_DATA;
    if (!data) return;
    var el = document.getElementById("page-phonetics");
    var html = '<div class="page-header"><h1>🎤 Fonética e Pronúncia</h1></div><div class="tab-bar">';
    data.sections.forEach(function(s, i) {
      html += '<button class="tab-btn' + (i===0?' active':'') + '" onclick="Pages._phTab(' + i + ')">' + s.title + '</button>';
    });
    html += '</div>';
    data.sections.forEach(function(s, i) {
      html += '<div class="ph-section' + (i===0?'':' hidden') + '" id="ph-sec-' + i + '">' +
        '<p class="section-intro">' + s.intro + '</p>' +
        '<table class="ph-table"><thead><tr><th>Francês</th><th>IPA</th><th>Aprox. PT-BR</th><th>Nota / Exemplo</th><th>🔊</th></tr></thead><tbody>';
      s.items.forEach(function(item) {
        html += '<tr><td><b>' + item.fr + '</b></td><td><code>' + item.ipa + '</code></td>' +
          '<td>' + item.ptbr + '</td>' +
          '<td>' + (item.note || (item.ex_fr ? '<i>' + item.ex_fr + '</i> — ' + (item.ex_pt||'') : '—')) + '</td>' +
          '<td>' + speakBtn(item.ex_fr || item.fr, "🔊") + '</td></tr>';
        if (item.note && item.ex_fr) {
          html += '<tr class="ph-example-row"><td colspan="5"><i>Ex: ' + item.ex_fr + '</i> — ' + (item.ex_pt||'') + '</td></tr>';
        }
      });
      html += '</tbody></table></div>';
    });
    html += '<div class="section-title" style="margin-top:2rem">🎙️ Praticar pronúncia</div>' +
      '<div class="pron-practice">' +
        '<p>Ouça a palavra e repita. O app avaliará sua pronúncia.</p>' +
        '<div class="pron-word-display" id="pron-word"><div style="color:var(--text-muted)">Clique em "Nova palavra" para começar</div></div>' +
        '<div class="pron-controls">' +
          '<button class="btn-primary" onclick="Pages._nextPronWord()">Nova palavra 🔀</button>' +
          '<button class="btn-secondary" id="btn-pron-listen">🔊 Ouvir</button>' +
          '<button class="btn-primary" id="btn-pron-speak">🎤 Falar</button>' +
        '</div>' +
        '<div class="pron-feedback" id="pron-feedback"></div>' +
        '<div class="pron-history" id="pron-history"></div>' +
      '</div>';
    el.innerHTML = html;
    self._phCurrentWord = null;
    self._renderPronHistory();
    document.getElementById("btn-pron-listen").onclick = function(){ if (self._phCurrentWord) Speech.speak(self._phCurrentWord.fr); };
    document.getElementById("btn-pron-speak").onclick = function(){ self._startPronRecord(); };
  };

  self._phTab = function(i) {
    document.querySelectorAll(".ph-section").forEach(function(s, j){ s.classList.toggle("hidden", j !== i); });
    document.querySelectorAll("#page-phonetics .tab-btn").forEach(function(b, j){ b.classList.toggle("active", j === i); });
  };

  self._nextPronWord = function() {
    var vocab = window.VOCAB_DATA || [];
    if (!vocab.length) return;
    var w = vocab[Math.floor(Math.random() * vocab.length)];
    self._phCurrentWord = w;
    var el = document.getElementById("pron-word");
    if (!el) return;
    el.innerHTML = '<div class="pron-fr">' + w.fr + '</div>' +
      '<div class="pron-ipa"><code>' + w.ipa + '</code></div>' +
      '<div class="pron-pt">' + w.pt + '</div>' +
      '<div class="pron-approx">Aprox: <i>' + w.ptbr + '</i></div>';
    var fb = document.getElementById("pron-feedback");
    if (fb) fb.innerHTML = "";
  };

  self._startPronRecord = function() {
    var fb = document.getElementById("pron-feedback");
    if (!self._phCurrentWord || !fb) return;
    fb.innerHTML = '<span class="recording">🔴 Gravando… fale agora!</span>';
    Speech.startListening(function(transcript) {
      var result = Speech.scorePronunciation(transcript, self._phCurrentWord.fr);
      fb.innerHTML = '<div class="pron-result" style="color:' + result.color + '">' +
        '<b>' + result.label + '</b> (' + result.score + '%)<br>' +
        '<span>Você disse: "<i>' + transcript + '</i>"</span></div>';
      Storage.addPronunciationHistory({ word: self._phCurrentWord.fr, spoken: transcript, score: result.score });
      Storage.addXP(window.XP_REWARDS ? window.XP_REWARDS.pronunciationPractice : 10);
      App.updateXPBar();
      self._renderPronHistory();
    }, function(err) {
      fb.innerHTML = '<span class="fb-err">Erro: ' + err + '. Use Chrome com microfone ativado.</span>';
    });
  };

  self._renderPronHistory = function() {
    var el = document.getElementById("pron-history");
    if (!el) return;
    var h = Storage.getPronunciationHistory().slice(0, 5);
    if (!h.length) { el.innerHTML = ""; return; }
    el.innerHTML = '<b>Histórico recente:</b><ul>' +
      h.map(function(e){ return '<li><b>' + e.word + '</b> — "' + e.spoken + '" — ' + e.score + '%</li>'; }).join("") + '</ul>';
  };

  /* ════════════════════════════════════════════════════
     VOCABULÁRIO
  ════════════════════════════════════════════════════ */
  self.vocabulary = function() {
    show("page-vocabulary");
    var cats = window.VOCAB_CATEGORIES || [];
    var vocab = window.VOCAB_DATA || [];
    var learned = Storage.getLearnedWords();
    var activeCat = "";
    var activeLevel = "";

    function renderVocab() {
      var filtered = vocab.filter(function(w){ return (!activeCat || w.cat === activeCat) && (!activeLevel || w.level === activeLevel); });
      var cnt = document.getElementById("vocab-count");
      if (cnt) {
        var learnedCnt = filtered.filter(function(w){ return learned[w.id]; }).length;
        cnt.textContent = filtered.length + " palavras · " + learnedCnt + " aprendidas";
      }
      var container = document.getElementById("vocab-cards");
      if (!container) return;
      if (!filtered.length) { container.innerHTML = "<p>Nenhuma palavra encontrada.</p>"; return; }
      container.innerHTML = filtered.map(function(w) {
        return '<div class="vocab-card' + (learned[w.id] ? ' learned' : '') + '">' +
          '<div class="vc-fr">' + w.fr + '</div>' +
          '<div class="vc-pt">' + w.pt + '</div>' +
          '<div class="vc-ipa"><code>' + w.ipa + '</code> · <span class="vc-ptbr">' + w.ptbr + '</span></div>' +
          '<div class="vc-ex"><i>' + w.ex_fr + '</i><br><small>' + w.ex_pt + '</small></div>' +
          '<div class="vc-actions">' +
            '<button class="btn-listen" onclick="Speech.speak(\'' + w.fr.replace(/'/g,"\\'") + '\')">🔊</button>' +
            '<button class="btn-small' + (learned[w.id] ? ' btn-learned' : '') + '" onclick="Pages._learnWord(\'' + w.id + '\',this)">' + (learned[w.id] ? '✓ Aprendida' : 'Marcar aprendida') + '</button>' +
            '<button class="btn-small" onclick="Pages._addFlashcard(\'' + w.id + '\')">🃏 Flashcard</button>' +
          '</div></div>';
      }).join("");
    }

    var el = document.getElementById("page-vocabulary");
    el.innerHTML =
      '<div class="page-header"><h1>📖 Vocabulário</h1></div>' +
      '<div class="vocab-filters"><div class="filter-row">' +
        '<label>Categoria:</label>' +
        '<select id="cat-select"><option value="">— Todas —</option>' +
          cats.map(function(c){ return '<option value="' + c.id + '">' + c.icon + ' ' + c.label + '</option>'; }).join("") +
        '</select>' +
        '<label>Nível:</label>' +
        '<select id="level-select"><option value="">— Todos —</option>' +
          ["A0","A1","A2","B1","B2","C1","C2"].map(function(l){ return '<option>' + l + '</option>'; }).join("") +
        '</select>' +
      '</div><div class="vocab-count" id="vocab-count"></div></div>' +
      '<div class="vocab-grid" id="vocab-cards"></div>';

    document.getElementById("cat-select").onchange = function(e){ activeCat = e.target.value; renderVocab(); };
    document.getElementById("level-select").onchange = function(e){ activeLevel = e.target.value; renderVocab(); };
    renderVocab();
  };

  self._learnWord = function(id, btn) {
    Storage.markWordLearned(id);
    var card = btn.closest ? btn.closest(".vocab-card") : null;
    if (card) card.classList.add("learned");
    btn.textContent = "✓ Aprendida";
    btn.classList.add("btn-learned");
    Storage.addXP(5);
    App.updateXPBar();
    App.checkAchievements();
  };

  self._addFlashcard = function(id) {
    Storage.markWordLearned(id);
    App.showToast("🃏 Adicionado aos flashcards!", "success");
    Storage.addXP(3);
    App.updateXPBar();
  };

  /* ════════════════════════════════════════════════════
     GRAMÁTICA
  ════════════════════════════════════════════════════ */
  self.grammar = function() {
    show("page-grammar");
    var data = window.GRAMMAR_DATA || [];
    var groups = { basica:"Básica", intermediaria:"Intermediária", avancada:"Avançada", especialista:"Especialista" };
    var el = document.getElementById("page-grammar");
    var html = '<div class="page-header"><h1>📐 Gramática</h1></div>';
    Object.keys(groups).forEach(function(g) {
      var lessons = data.filter(function(l){ return l.group === g; });
      if (!lessons.length) return;
      html += '<div class="section-title">' + groups[g] + '</div><div class="lesson-list">';
      lessons.forEach(function(l) {
        var done = Storage.isCompleted("grammar", l.id);
        html += '<div class="lesson-item' + (done ? ' done' : '') + '" onclick="Pages._openGrammar(\'' + l.id + '\')">' +
          '<span class="lesson-badge">' + l.level + '</span>' +
          '<span class="lesson-title">' + l.title + '</span>' +
          (done ? '<span class="done-badge">✓</span>' : '') + '</div>';
      });
      html += '</div>';
    });
    html += '<div id="grammar-detail" class="detail-panel hidden"></div>';
    el.innerHTML = html;
  };

  self._openGrammar = function(id) {
    var l = (window.GRAMMAR_DATA || []).find(function(x){ return x.id === id; });
    if (!l) return;
    var panel = document.getElementById("grammar-detail");
    if (!panel) return;
    panel.classList.remove("hidden");
    panel.innerHTML =
      '<div class="detail-header">' +
        '<button class="btn-back" onclick="document.getElementById(\'grammar-detail\').classList.add(\'hidden\')">← Voltar</button>' +
        '<h2>' + l.title + ' <span class="level-badge">' + l.level + '</span></h2>' +
      '</div>' +
      '<div class="grammar-explanation">' + l.explanation + '</div>' +
      '<div class="section-title">Exemplos</div>' +
      '<div class="example-list">' +
        l.examples.map(function(e) {
          return '<div class="example-item"><div class="ex-fr">' + e.fr + ' ' + speakBtn(e.fr,"🔊") + '</div><div class="ex-pt">' + e.pt + '</div></div>';
        }).join("") +
      '</div>' +
      '<div class="section-title">Exercícios</div>' +
      '<div id="gram-ex-' + id + '"></div>' +
      '<div id="gram-res-' + id + '" class="lesson-result hidden"></div>';
    panel.scrollIntoView({ behavior: "smooth" });

    var exDiv = document.getElementById("gram-ex-" + id);
    if (exDiv) {
      exDiv.appendChild(mcqBlock(l.exercises, "gram_" + id, function(score, total) {
        var pct = Math.round(score / total * 100);
        Storage.markDone("grammar", id, { score: pct });
        Storage.addXP(20);
        App.updateXPBar();
        App.checkAchievements();
        var res = document.getElementById("gram-res-" + id);
        if (res) { res.innerHTML = '<div class="result-summary">Resultado: <b>' + score + '/' + total + '</b> (' + pct + '%) ' + (pct >= 70 ? '✓ Aprovado!' : '— Estude e tente novamente.') + '</div>'; res.classList.remove("hidden"); }
        self.grammar();
        var p2 = document.getElementById("grammar-detail");
        if (p2) { p2.classList.remove("hidden"); p2.scrollIntoView({behavior:"smooth"}); }
      }));
    }
  };

  /* ════════════════════════════════════════════════════
     CONVERSAÇÃO
  ════════════════════════════════════════════════════ */
  self.conversation = function() {
    show("page-conversation");
    var data = window.DIALOGUES_DATA || [];
    var el = document.getElementById("page-conversation");
    var html = '<div class="page-header"><h1>🗣️ Conversação</h1></div><div class="dialogue-list">';
    data.forEach(function(d) {
      var done = Storage.isCompleted("dialogue", d.id);
      html += '<div class="dialogue-item' + (done ? ' done' : '') + '" onclick="Pages._openDialogue(\'' + d.id + '\')">' +
        '<span class="dialogue-badge">' + d.level + '</span>' +
        '<div><b>' + d.title + '</b><br><small>' + d.situation + '</small></div>' +
        (done ? '<span class="done-badge">✓</span>' : '') + '</div>';
    });
    html += '</div><div id="dialogue-detail" class="detail-panel hidden"></div>';
    el.innerHTML = html;
  };

  self._openDialogue = function(id) {
    var d = (window.DIALOGUES_DATA || []).find(function(x){ return x.id === id; });
    if (!d) return;
    var panel = document.getElementById("dialogue-detail");
    if (!panel) return;
    panel.classList.remove("hidden");
    var linesHTML = d.lines.map(function(l, i) {
      var side = i % 2 === 0 ? "left" : "right";
      return '<div class="dialogue-bubble ' + side + '">' +
        '<div class="bubble-speaker">' + l.speaker + '</div>' +
        '<div class="bubble-fr">' + l.fr + ' ' + speakBtn(l.fr,"🔊") + '</div>' +
        '<div class="bubble-pt">' + l.pt + '</div>' +
        '</div>';
    }).join("");
    panel.innerHTML =
      '<div class="detail-header">' +
        '<button class="btn-back" onclick="document.getElementById(\'dialogue-detail\').classList.add(\'hidden\')">← Voltar</button>' +
        '<h2>' + d.title + ' <span class="level-badge">' + d.level + '</span></h2>' +
        '<p class="situation-label">📍 ' + d.situation + '</p>' +
      '</div>' +
      '<button class="btn-primary" onclick="Pages._playDialogue(\'' + id + '\')">▶ Ouvir diálogo completo</button>' +
      '<div class="dialogue-chat">' + linesHTML + '</div>' +
      '<div class="section-title">Compreensão</div>' +
      '<div id="dial-ex-' + id + '"></div>';
    panel.scrollIntoView({ behavior: "smooth" });

    var exDiv = document.getElementById("dial-ex-" + id);
    if (exDiv) {
      var qs = d.questions.map(function(q){ return { type:"mcq", q:q.q, options:q.options, answer:q.answer }; });
      exDiv.appendChild(mcqBlock(qs, "dial_" + id, function(score, total) {
        Storage.markDone("dialogue", id, { score: Math.round(score/total*100) });
        Storage.addXP(window.XP_REWARDS ? window.XP_REWARDS.dialogueComplete : 20);
        App.updateXPBar();
        App.checkAchievements();
        App.showToast("Diálogo concluído! +20 XP", "success");
      }));
    }
  };

  self._playDialogue = function(id) {
    var d = (window.DIALOGUES_DATA || []).find(function(x){ return x.id === id; });
    if (!d) return;
    var i = 0;
    function next() {
      if (i >= d.lines.length) return;
      Speech.speak(d.lines[i].fr, function(){ i++; setTimeout(next, 400); });
    }
    next();
  };

  /* ════════════════════════════════════════════════════
     LEITURA
  ════════════════════════════════════════════════════ */
  self.reading = function() {
    show("page-reading");
    var data = window.READINGS_DATA || [];
    var el = document.getElementById("page-reading");
    var html = '<div class="page-header"><h1>📄 Leitura Graduada</h1></div><div class="reading-list">';
    data.forEach(function(r) {
      var done = Storage.isCompleted("reading", r.id);
      html += '<div class="reading-item' + (done ? ' done' : '') + '" onclick="Pages._openReading(\'' + r.id + '\')">' +
        '<span class="level-badge">' + r.level + '</span>' +
        '<div><b>' + r.title + '</b></div>' +
        (done ? '<span class="done-badge">✓</span>' : '') + '</div>';
    });
    html += '</div><div id="reading-detail" class="detail-panel hidden"></div>';
    el.innerHTML = html;
  };

  self._openReading = function(id) {
    var r = (window.READINGS_DATA || []).find(function(x){ return x.id === id; });
    if (!r) return;
    var panel = document.getElementById("reading-detail");
    if (!panel) return;
    panel.classList.remove("hidden");
    var paras = r.text_fr.split("\n\n").map(function(p){ return '<p class="reading-para">' + p + ' ' + speakBtn(p,"🔊") + '</p>'; }).join("");
    var transParas = r.text_pt.split("\n\n").map(function(p){ return '<p>' + p + '</p>'; }).join("");
    panel.innerHTML =
      '<div class="detail-header">' +
        '<button class="btn-back" onclick="document.getElementById(\'reading-detail\').classList.add(\'hidden\')">← Voltar</button>' +
        '<h2>' + r.title + ' <span class="level-badge">' + r.level + '</span></h2>' +
      '</div>' +
      '<div class="reading-text">' + paras + '</div>' +
      '<details class="translation-details"><summary>🇧🇷 Ver tradução</summary>' +
        '<div class="translation-text">' + transParas + '</div></details>' +
      '<div class="section-title">Perguntas de compreensão</div>' +
      '<div id="read-ex-' + id + '"></div>';
    panel.scrollIntoView({ behavior: "smooth" });

    var exDiv = document.getElementById("read-ex-" + id);
    if (exDiv) {
      var qs = r.questions.map(function(q){ return { type:"mcq", q:q.q, options:q.options, answer:q.answer }; });
      exDiv.appendChild(mcqBlock(qs, "read_" + id, function(score, total) {
        Storage.markDone("reading", id, { score: Math.round(score/total*100) });
        Storage.addXP(window.XP_REWARDS ? window.XP_REWARDS.readingComplete : 25);
        App.updateXPBar();
        App.checkAchievements();
        App.showToast("Leitura concluída! +25 XP", "success");
      }));
    }
  };

  /* ════════════════════════════════════════════════════
     FLASHCARDS (SM-2)
  ════════════════════════════════════════════════════ */
  self.flashcards = function() {
    show("page-flashcards");
    var vocab = window.VOCAB_DATA || [];
    var allIds = vocab.map(function(w){ return w.id; });
    var due = Storage.getDueFlashcards(allIds);
    var el = document.getElementById("page-flashcards");

    if (!due.length) {
      el.innerHTML =
        '<div class="page-header"><h1>🃏 Flashcards</h1></div>' +
        '<div class="empty-state"><div class="empty-icon">🎉</div>' +
        '<h2>Nenhum card para revisar agora!</h2>' +
        '<p>Você está em dia. Volte mais tarde ou adicione palavras em Vocabulário.</p>' +
        '<button class="btn-primary" onclick="Router.navigate(\'vocabulary\')">Ir para Vocabulário</button></div>';
      return;
    }

    var shuffled = due.slice().sort(function(){ return Math.random()-0.5; }).slice(0, 20);
    self._fc_shuffled = shuffled;
    self._fc_idx = 0;

    function renderCard() {
      var idx = self._fc_idx;
      if (idx >= shuffled.length) {
        Storage.addXP(window.XP_REWARDS ? window.XP_REWARDS.flashcardSession : 15);
        App.updateXPBar();
        App.checkAchievements();
        document.getElementById("fc-card-area").innerHTML =
          '<div class="fc-done"><div class="empty-icon">🎉</div><h2>Sessão concluída!</h2>' +
          '<p>Revisados: <b>' + shuffled.length + '</b> cards</p>' +
          '<button class="btn-primary" onclick="Pages.flashcards()">Nova sessão</button></div>';
        document.getElementById("fc-buttons").innerHTML = "";
        document.getElementById("fc-rating").classList.add("hidden");
        return;
      }
      var wid = shuffled[idx];
      var w = window.VOCAB_BY_ID ? window.VOCAB_BY_ID[wid] : vocab.find(function(x){ return x.id === wid; });
      if (!w) { self._fc_idx++; renderCard(); return; }

      document.getElementById("fc-progress").textContent = (idx+1) + " / " + shuffled.length;
      document.getElementById("fc-rating").classList.add("hidden");
      document.getElementById("fc-card-area").innerHTML =
        '<div class="flashcard">' +
          '<div class="fc-front"><div class="fc-word">' + w.fr + '</div><div class="fc-hint">Clique em Revelar para ver a resposta</div></div>' +
          '<div class="fc-back hidden"><div class="fc-pt">' + w.pt + '</div>' +
            '<div class="fc-ipa"><code>' + w.ipa + '</code></div>' +
            '<div class="fc-ptbr">' + w.ptbr + '</div>' +
            '<div class="fc-ex"><i>' + w.ex_fr + '</i></div></div>' +
        '</div>';
      document.getElementById("fc-buttons").innerHTML =
        '<button class="btn-secondary" onclick="Pages._flipCard()">🔄 Revelar</button> ' +
        speakBtn(w.fr);
    }

    el.innerHTML =
      '<div class="page-header"><h1>🃏 Flashcards</h1></div>' +
      '<div class="fc-header"><div id="fc-progress">1 / ' + shuffled.length + '</div><div>Due: ' + due.length + ' cards</div></div>' +
      '<div id="fc-card-area"></div>' +
      '<div id="fc-buttons" class="fc-buttons"></div>' +
      '<div class="fc-rating hidden" id="fc-rating">' +
        '<p>Como você foi?</p>' +
        '<div class="rating-btns">' +
          '<button class="btn-rating r0" id="fc-r0">😞 Esqueci</button>' +
          '<button class="btn-rating r1" id="fc-r1">😰 Difícil</button>' +
          '<button class="btn-rating r2" id="fc-r2">😊 Bom</button>' +
          '<button class="btn-rating r3" id="fc-r3">🚀 Fácil</button>' +
        '</div></div>';

    renderCard();
    self._fc_renderCard = renderCard;
  };

  self._flipCard = function() {
    var back = document.querySelector("#fc-card-area .fc-back");
    var hint = document.querySelector("#fc-card-area .fc-hint");
    if (back) back.classList.remove("hidden");
    if (hint) hint.classList.add("hidden");
    document.getElementById("fc-buttons").innerHTML = speakBtn((self._fc_shuffled && window.VOCAB_BY_ID ? (window.VOCAB_BY_ID[self._fc_shuffled[self._fc_idx]]||{}).fr||"" : ""));
    var rating = document.getElementById("fc-rating");
    if (rating) {
      rating.classList.remove("hidden");
      var wid = self._fc_shuffled[self._fc_idx];
      [0,1,2,3].forEach(function(ri) {
        var btn = document.getElementById("fc-r"+ri);
        if (btn) btn.onclick = function(){ self._rateCard(ri, wid); };
      });
    }
  };

  self._rateCard = function(rating, wid) {
    Storage.reviewFlashcard(wid, rating);
    self._fc_idx++;
    if (self._fc_renderCard) self._fc_renderCard();
  };

  /* ════════════════════════════════════════════════════
     TESTES CEFR
  ════════════════════════════════════════════════════ */
  self.tests = function() {
    show("page-tests");
    var data = window.TESTS_DATA || [];
    var el = document.getElementById("page-tests");
    var html = '<div class="page-header"><h1>📋 Testes de Nível CEFR</h1></div>' +
      '<p class="intro-text">Avalie seu nível com testes baseados no CEFR (Quadro Europeu Comum de Referência).</p>' +
      '<div class="test-list">';
    data.forEach(function(t) {
      var prog = Storage.getModuleProgress("test");
      var passed = prog[t.id] && prog[t.id].passed;
      var score = prog[t.id] && prog[t.id].score;
      html += '<div class="test-item' + (passed ? ' passed' : '') + '" onclick="Pages._startTest(\'' + t.id + '\')">' +
        '<div class="test-badge">' + t.level + '</div>' +
        '<div><b>' + t.title + '</b><br><small>' + t.desc + '</small></div>' +
        (passed ? '<div class="test-score">✓ ' + score + '%</div>' : '') + '</div>';
    });
    html += '</div><div id="test-detail" class="detail-panel hidden"></div>';
    el.innerHTML = html;
  };

  self._startTest = function(id) {
    var t = (window.TESTS_DATA || []).find(function(x){ return x.id === id; });
    if (!t) return;
    var panel = document.getElementById("test-detail");
    if (!panel) return;
    panel.classList.remove("hidden");
    panel.innerHTML =
      '<div class="detail-header">' +
        '<button class="btn-back" onclick="document.getElementById(\'test-detail\').classList.add(\'hidden\')">← Voltar</button>' +
        '<h2>' + t.title + '</h2><p>' + t.desc + '</p>' +
      '</div>' +
      '<div id="test-q-' + id + '"></div>' +
      '<div id="test-res-' + id + '" class="test-result hidden"></div>';
    panel.scrollIntoView({ behavior: "smooth" });

    var exDiv = document.getElementById("test-q-" + id);
    if (exDiv) {
      var qs = t.questions.map(function(q){ return { type:q.type, q:q.q, options:q.options, answer:q.answer, explanation:q.explanation }; });
      exDiv.appendChild(mcqBlock(qs, "test_" + id, function(score, total) {
        var pct = Math.round(score / total * 100);
        var passed = pct >= 70;
        Storage.setModuleProgress("test", id, { done: true, passed: passed, score: pct });
        if (passed) {
          Storage.addXP(window.XP_REWARDS ? window.XP_REWARDS.testPass : 50);
          var achId = "test_" + t.level.toLowerCase().replace("+","");
          var isNew = Storage.unlockAchievement(achId);
          if (isNew) App.showAchievement(achId);
        }
        App.updateXPBar();
        var res = document.getElementById("test-res-" + id);
        if (res) {
          res.innerHTML = '<div class="result-summary ' + (passed?'passed':'failed') + '">' +
            '<h2>' + (passed ? '🎉 Aprovado!' : '📚 Não aprovado') + '</h2>' +
            '<p>Pontuação: <b>' + score + '/' + total + '</b> (' + pct + '%)</p>' +
            '<p>' + (passed ? 'Parabéns! Proficiência ' + t.level + ' demonstrada.' : 'Continue estudando e tente novamente!') + '</p>' +
            (passed ? '<div class="passport-stamp">' + t.level + '</div>' : '') +
          '</div>';
          res.classList.remove("hidden");
        }
      }));
    }
  };

  /* ════════════════════════════════════════════════════
     LABORATÓRIO
  ════════════════════════════════════════════════════ */
  self.lab = function() {
    show("page-lab");
    var verbKeys = Object.keys(window.IRREGULAR_VERBS || {});
    document.getElementById("page-lab").innerHTML =
      '<div class="page-header"><h1>⚗️ Laboratório de Língua</h1></div>' +
      '<div class="tab-bar">' +
        '<button class="tab-btn active" onclick="Pages._labTab(\'conjugator\')">Conjugador</button>' +
        '<button class="tab-btn" onclick="Pages._labTab(\'dictionary\')">Dicionário</button>' +
        '<button class="tab-btn" onclick="Pages._labTab(\'comparator\')">PT↔FR</button>' +
        '<button class="tab-btn" onclick="Pages._labTab(\'generator\')">Gerador</button>' +
      '</div>' +
      '<div id="lab-conjugator" class="lab-panel">' +
        '<h3>Conjugador de Verbos</h3>' +
        '<div class="lab-input-row">' +
          '<input type="text" id="verb-input" placeholder="Infinitivo (ex: parler, être)" list="verb-list">' +
          '<datalist id="verb-list">' + verbKeys.map(function(v){ return '<option value="' + v + '">'; }).join("") + '</datalist>' +
          '<button class="btn-primary" onclick="Pages._conjugate()">Conjugar</button>' +
        '</div><div id="conjugation-result"></div>' +
      '</div>' +
      '<div id="lab-dictionary" class="lab-panel hidden">' +
        '<h3>Dicionário FR↔PT</h3>' +
        '<div class="lab-input-row"><input type="text" id="dict-input" placeholder="Buscar em FR ou PT…">' +
        '<button class="btn-primary" onclick="Pages._dictSearch()">Buscar</button></div>' +
        '<div id="dict-result"></div>' +
      '</div>' +
      '<div id="lab-comparator" class="lab-panel hidden">' +
        '<h3>Comparador PT-BR ↔ Francês</h3>' +
        '<div class="lab-input-row"><input type="text" id="comp-input" placeholder="Digite uma palavra…">' +
        '<button class="btn-primary" onclick="Pages._compare()">Comparar</button></div>' +
        '<div id="comp-result"></div>' +
        '<div class="section-title">Falsos Cognatos</div><div id="faux-amis-list"></div>' +
      '</div>' +
      '<div id="lab-generator" class="lab-panel hidden">' +
        '<h3>Gerador de Frases</h3><p>Frases aleatórias combinando vocabulário do banco de dados.</p>' +
        '<button class="btn-primary" onclick="Pages._generateSentence()">🎲 Gerar frase</button>' +
        '<div id="gen-result" class="gen-result"></div>' +
      '</div>';
    self._renderFauxAmis();
  };

  self._labTab = function(tab) {
    ["conjugator","dictionary","comparator","generator"].forEach(function(t) {
      var el = document.getElementById("lab-" + t);
      if (el) el.classList.toggle("hidden", t !== tab);
    });
    document.querySelectorAll("#page-lab .tab-btn").forEach(function(b, i) {
      b.classList.toggle("active", ["conjugator","dictionary","comparator","generator"][i] === tab);
    });
  };

  self._conjugate = function() {
    var verbInput = document.getElementById("verb-input");
    if (!verbInput) return;
    var verb = verbInput.value.trim().toLowerCase();
    if (!verb) return;
    var res = document.getElementById("conjugation-result");
    if (!res) return;
    var irregular = window.IRREGULAR_VERBS && window.IRREGULAR_VERBS[verb];
    var pronouns = window.SUBJECT_PRONOUNS || ["je","tu","il/elle/on","nous","vous","ils/elles"];
    var tenses = ["presente","imparfait","futur","condicional","subjonctif"];
    var tenseLabels = { presente:"Présent", imparfait:"Imparfait", futur:"Futur simple", condicional:"Conditionnel présent", subjonctif:"Subjonctif présent" };
    Storage.recordConjugatorUse(verb);
    var data = null;
    if (irregular) {
      data = irregular;
    } else {
      var patterns = window.REGULAR_PATTERNS;
      if (patterns) {
        var type = null, stem = verb;
        if (verb.endsWith("er")) { type = "er"; stem = verb.slice(0,-2); }
        else if (verb.endsWith("ir")) { type = "ir"; stem = verb.slice(0,-2); }
        else if (verb.endsWith("re")) { type = "re"; stem = verb.slice(0,-2); }
        if (type) {
          var p = patterns[type];
          var futStem = type === "re" ? verb.slice(0,-1) : verb;
          data = {
            pt: "(verbo regular -" + type + ")", participe: stem + p.participe, aux: p.aux,
            presente: p.presente.map(function(s){ return stem + s; }),
            imparfait: p.imparfaitSuffix.map(function(s){ return stem + s; }),
            futur: p.futurSuffix.map(function(s){ return futStem + s; }),
            condicional: p.condicionalSuffix.map(function(s){ return futStem + s; }),
            subjonctif: p.subjonctifSuffix.map(function(s){ return stem + s; })
          };
        }
      }
    }
    if (!data) { res.innerHTML = '<p class="fb-err">Verbo não encontrado. Verifique a grafia.</p>'; return; }
    res.innerHTML =
      '<div class="conj-header"><span class="conj-verb">' + verb + '</span> ' + speakBtn(verb) +
        '<span class="conj-pt">' + data.pt + '</span></div>' +
      '<div class="conj-meta">Participe passé: <b>' + data.participe + '</b> | Auxiliaire: <b>' + data.aux + '</b></div>' +
      '<div class="conj-tables">' +
        tenses.map(function(t) {
          return '<div class="conj-table">' +
            '<div class="conj-tense-title">' + (tenseLabels[t]||t) + '</div>' +
            (data[t]||[]).map(function(form, i) {
              return '<div class="conj-row"><span class="conj-pron">' + pronouns[i] + '</span>' +
                '<span class="conj-form">' + form + '</span>' +
                speakBtn(pronouns[i].split("/")[0] + " " + form, "🔊") + '</div>';
            }).join("") + '</div>';
        }).join("") +
      '</div>';
  };

  self._dictSearch = function() {
    var inp = document.getElementById("dict-input");
    if (!inp) return;
    var q = inp.value.trim().toLowerCase();
    var vocab = window.VOCAB_DATA || [];
    var res = vocab.filter(function(w){ return w.fr.toLowerCase().includes(q) || w.pt.toLowerCase().includes(q); }).slice(0, 20);
    var el = document.getElementById("dict-result");
    if (!el) return;
    if (!res.length) { el.innerHTML = "<p>Nenhuma palavra encontrada.</p>"; return; }
    el.innerHTML = '<table class="dict-table"><thead><tr><th>Francês</th><th>Português</th><th>IPA</th><th>Exemplo</th><th>🔊</th></tr></thead><tbody>' +
      res.map(function(w) {
        return '<tr><td><b>' + w.fr + '</b></td><td>' + w.pt + '</td><td><code>' + w.ipa + '</code></td><td><i>' + w.ex_fr + '</i></td>' +
          '<td>' + speakBtn(w.fr,"🔊") + '</td></tr>';
      }).join("") + '</tbody></table>';
  };

  self._compare = function() {
    var inp = document.getElementById("comp-input");
    if (!inp) return;
    var q = inp.value.trim().toLowerCase();
    var vocab = window.VOCAB_DATA || [];
    var res = vocab.filter(function(w){ return w.fr.toLowerCase().startsWith(q) || w.pt.toLowerCase().startsWith(q); }).slice(0, 10);
    var el = document.getElementById("comp-result");
    if (!el) return;
    if (!res.length) { el.innerHTML = "<p>Nenhum resultado.</p>"; return; }
    el.innerHTML = res.map(function(w) {
      return '<div class="compare-item">' +
        '<div class="cmp-pair"><span class="cmp-fr">' + w.fr + '</span> ↔ <span>' + w.pt + '</span></div>' +
        '<div class="cmp-ipa">IPA: <code>' + w.ipa + '</code> | PT-BR: <i>' + w.ptbr + '</i></div>' +
        '<div class="cmp-ex">' + w.ex_fr + ' / ' + w.ex_pt + '</div>' +
      '</div>';
    }).join("");
  };

  self._renderFauxAmis = function() {
    var el = document.getElementById("faux-amis-list");
    if (!el || !window.IMMERSION_DATA) return;
    el.innerHTML = (window.IMMERSION_DATA.faux_amis || []).map(function(f) {
      return '<div class="faux-ami-item"><b>' + f.fr + '</b> — <span class="faux-wrong">NÃO é "' + f.faux + '"</span> — é "' + f.vrai + '"<div class="faux-note">' + f.note + '</div></div>';
    }).join("");
  };

  self._generateSentence = function() {
    var vocab = window.VOCAB_DATA || [];
    if (vocab.length < 5) return;
    function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    var subs = vocab.filter(function(w){ return ["familia","trabalho","estudos","viagens","natureza"].includes(w.cat); });
    var verbs = vocab.filter(function(w){ return w.cat === "verbos"; });
    var adjs = vocab.filter(function(w){ return w.cat === "adjetivos" || w.cat === "emocoes"; });
    var templates = [
      function(){ var s=rand(subs), v=rand(verbs); if (!s||!v) return null; return { fr:"Je " + v.fr + " avec " + s.fr + ".", pt:"Eu " + v.pt + " com " + s.pt + "."}; },
      function(){ var a=rand(adjs), s=rand(subs); if (!a||!s) return null; return { fr:"Le/La " + s.fr + " est très " + a.fr + ".", pt:"O/A " + s.pt + " é muito " + a.pt + "."}; },
      function(){ var v=rand(verbs), a=rand(adjs); if (!v||!a) return null; return { fr:"C'est " + a.fr + " de " + v.fr + ".", pt:"É " + a.pt + " " + v.pt + "."}; }
    ];
    var gen = rand(templates)();
    var el = document.getElementById("gen-result");
    if (!el) return;
    if (!gen) { el.innerHTML = "<p>Tente novamente.</p>"; return; }
    el.innerHTML = '<div class="gen-sentence"><div class="gen-fr">' + gen.fr + ' ' + speakBtn(gen.fr) + '</div><div class="gen-pt">' + gen.pt + '</div></div>';
  };

  /* ════════════════════════════════════════════════════
     CULTURA
  ════════════════════════════════════════════════════ */
  self.culture = function() {
    show("page-culture");
    var data = window.CULTURE_DATA;
    if (!data) return;
    var el = document.getElementById("page-culture");
    var html = '<div class="page-header"><h1>🎨 Cultura Francesa</h1></div><div class="culture-grid">';
    (data.modules || []).forEach(function(m) {
      var done = Storage.isCompleted("culture", m.id);
      html += '<div class="culture-card' + (done ? ' done-card' : '') + '" onclick="Pages._openCulture(\'' + m.id + '\')">' +
        '<div class="culture-icon">' + m.icon + '</div>' +
        '<div class="culture-title">' + m.title + '</div>' +
        (done ? '<div class="culture-done">✓</div>' : '') +
        '</div>';
    });
    html += '</div><div id="culture-detail" class="detail-panel hidden"></div>';
    el.innerHTML = html;
  };

  self._openCulture = function(id) {
    var m = ((window.CULTURE_DATA && window.CULTURE_DATA.modules) || []).find(function(x){ return x.id === id; });
    if (!m) return;
    var panel = document.getElementById("culture-detail");
    if (!panel) return;
    panel.classList.remove("hidden");
    panel.innerHTML =
      '<div class="detail-header">' +
        '<button class="btn-back" onclick="document.getElementById(\'culture-detail\').classList.add(\'hidden\')">← Voltar</button>' +
        '<h2>' + m.icon + ' ' + m.title + '</h2>' +
      '</div>' +
      m.content.map(function(c){ return '<h3>' + c.heading + '</h3><p>' + c.text + '</p>'; }).join("");
    panel.scrollIntoView({ behavior: "smooth" });
    Storage.markDone("culture", id);
    Storage.addXP(15);
    App.updateXPBar();
  };

  /* ════════════════════════════════════════════════════
     LITERATURA
  ════════════════════════════════════════════════════ */
  self.literature = function() {
    show("page-literature");
    var data = window.LITERATURE_DATA;
    if (!data) return;
    var el = document.getElementById("page-literature");
    var html = '<div class="page-header"><h1>✒️ Literatura Francesa</h1></div>' +
      '<p class="intro-text">Adaptações graduadas originais inspiradas nas grandes obras da literatura francesa.</p>' +
      '<div class="lit-list">';
    (data.authors || []).forEach(function(a) {
      var done = Storage.isCompleted("literature", a.id);
      html += '<div class="lit-item' + (done ? ' done' : '') + '" onclick="Pages._openLit(\'' + a.id + '\')">' +
        '<div class="lit-author">' + a.name + ' <span class="lit-years">(' + a.years + ')</span></div>' +
        '<div class="lit-work">' + a.work + '</div>' +
        '<div class="lit-level">Nível: <span class="level-badge">' + a.adaptation.level + '</span></div>' +
        (done ? '<span class="done-badge">✓ Lido</span>' : '') +
        '</div>';
    });
    html += '</div><div id="lit-detail" class="detail-panel hidden"></div>';
    el.innerHTML = html;
  };

  self._openLit = function(id) {
    var a = ((window.LITERATURE_DATA && window.LITERATURE_DATA.authors) || []).find(function(x){ return x.id === id; });
    if (!a) return;
    var panel = document.getElementById("lit-detail");
    if (!panel) return;
    panel.classList.remove("hidden");
    var paras = a.adaptation.text_fr.split("\n\n").map(function(p){ return '<p class="reading-para">' + p + ' ' + speakBtn(p,"🔊") + '</p>'; }).join("");
    var transParas = a.adaptation.text_pt.split("\n\n").map(function(p){ return '<p>' + p + '</p>'; }).join("");
    panel.innerHTML =
      '<div class="detail-header">' +
        '<button class="btn-back" onclick="document.getElementById(\'lit-detail\').classList.add(\'hidden\')">← Voltar</button>' +
        '<h2>' + a.name + '</h2><p><i>' + a.work + '</i> · Nível <span class="level-badge">' + a.adaptation.level + '</span></p>' +
      '</div>' +
      '<div class="bio-text"><b>Sobre o autor:</b> ' + a.bio_pt + '</div>' +
      '<div class="section-title">📖 Texto em francês</div>' +
      '<div class="reading-text">' + paras + '</div>' +
      '<details class="translation-details"><summary>🇧🇷 Ver tradução</summary>' +
        '<div class="translation-text">' + transParas + '</div></details>' +
      '<div class="lit-note">📝 ' + a.adaptation.note + '</div>';
    panel.scrollIntoView({ behavior: "smooth" });
    Storage.markDone("literature", id);
    Storage.addXP(20);
    App.updateXPBar();
  };

  /* ════════════════════════════════════════════════════
     IMERSÃO
  ════════════════════════════════════════════════════ */
  self.immersion = function() {
    show("page-immersion");
    var data = window.IMMERSION_DATA;
    if (!data) return;
    function card(content) { return '<div class="imm-card">' + content + '</div>'; }
    document.getElementById("page-immersion").innerHTML =
      '<div class="page-header"><h1>🌊 Modo Imersão</h1></div>' +
      '<div class="tab-bar">' +
        '<button class="tab-btn active" onclick="Pages._immTab(\'idioms\')">Expressões</button>' +
        '<button class="tab-btn" onclick="Pages._immTab(\'faux_amis\')">Falsos Amigos</button>' +
        '<button class="tab-btn" onclick="Pages._immTab(\'proverbes\')">Provérbios</button>' +
        '<button class="tab-btn" onclick="Pages._immTab(\'argot\')">Gírias</button>' +
        '<button class="tab-btn" onclick="Pages._immTab(\'curiosites\')">Curiosidades</button>' +
      '</div>' +
      '<div id="imm-idioms" class="imm-panel">' +
        (data.idioms||[]).map(function(i){ return card('<div class="imm-fr"><b>' + i.fr + '</b> ' + speakBtn(i.fr,"🔊") + '</div><div class="imm-pt">🇧🇷 ' + i.pt + '</div><div class="imm-ex"><i>' + i.ex_fr + '</i><br><small>' + i.ex_pt + '</small></div>'); }).join("") +
      '</div>' +
      '<div id="imm-faux_amis" class="imm-panel hidden">' +
        (data.faux_amis||[]).map(function(f){ return card('<div class="imm-fr"><b>' + f.fr + '</b> ' + speakBtn(f.fr,"🔊") + '</div><div class="imm-faux">❌ NÃO é "' + f.faux + '"</div><div class="imm-vrai">✓ É: "' + f.vrai + '"</div><div class="imm-note">' + f.note + '</div>'); }).join("") +
      '</div>' +
      '<div id="imm-proverbes" class="imm-panel hidden">' +
        (data.proverbes||[]).map(function(p){ return card('<div class="imm-fr"><b>' + p.fr + '</b> ' + speakBtn(p.fr,"🔊") + '</div><div class="imm-pt">🇧🇷 ' + p.pt + '</div><div class="imm-note">' + p.note + '</div>'); }).join("") +
      '</div>' +
      '<div id="imm-argot" class="imm-panel hidden">' +
        (data.argot||[]).map(function(a){ return card('<div class="imm-fr"><b>' + a.fr + '</b> ' + speakBtn(a.fr,"🔊") + '</div><div class="imm-formal">Formal: <i>' + a.formal + '</i></div><div class="imm-pt">🇧🇷 ' + a.pt + '</div><div class="imm-ex"><i>' + a.ex_fr + '</i><br><small>' + a.ex_pt + '</small></div>'); }).join("") +
      '</div>' +
      '<div id="imm-curiosites" class="imm-panel hidden">' +
        (data.curiosites||[]).map(function(c){ return card('<div class="imm-title">💡 ' + c.title + '</div><div class="imm-text">' + c.text + '</div>'); }).join("") +
      '</div>';
  };

  self._immTab = function(tab) {
    ["idioms","faux_amis","proverbes","argot","curiosites"].forEach(function(t) {
      var el = document.getElementById("imm-" + t);
      if (el) el.classList.toggle("hidden", t !== tab);
    });
    document.querySelectorAll("#page-immersion .tab-btn").forEach(function(b, i) {
      b.classList.toggle("active", ["idioms","faux_amis","proverbes","argot","curiosites"][i] === tab);
    });
  };

  /* ════════════════════════════════════════════════════
     CONQUISTAS
  ════════════════════════════════════════════════════ */
  self.achievements = function() {
    show("page-achievements");
    var p = Storage.getProfile();
    var unlocked = p.unlockedAchievements || [];
    var all = window.ACHIEVEMENTS || [];
    document.getElementById("page-achievements").innerHTML =
      '<div class="page-header"><h1>🏆 Conquistas</h1></div>' +
      '<p class="intro-text">' + unlocked.length + ' / ' + all.length + ' desbloqueadas</p>' +
      '<div class="achievements-grid">' +
        all.map(function(a) {
          var done = unlocked.includes(a.id);
          return '<div class="achievement-card ' + (done ? 'unlocked' : 'locked') + '">' +
            '<div class="ach-icon">' + (done ? a.icon : '🔒') + '</div>' +
            '<div class="ach-title">' + a.title + '</div>' +
            '<div class="ach-desc">' + a.desc + '</div>' +
            (done ? '<div class="ach-xp">+' + a.xp + ' XP</div>' : '') +
          '</div>';
        }).join("") +
      '</div>';
  };

  return self;
})();
