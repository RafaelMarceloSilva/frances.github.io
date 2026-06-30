/* ==========================================================================
   FRANÇAIS COMPLET — pages.js v2
   Todos os módulos: dashboard, perfil, missões, vocab+frases, gramática,
   conversação, leitura, flashcards (3 modos), testes, lab, cultura,
   literatura, imersão, fonética, conquistas
   Padrão: var self = {} — todos os métodos sobrevivem ao return do IIFE
   ========================================================================== */
var Pages = (function () {
  var self = {};
  self._activeQuestions = {};

  /* ── Helpers ── */
  function show(id) {
    document.querySelectorAll(".page").forEach(function(p){ p.classList.add("hidden"); });
    var el = document.getElementById(id);
    if (el) el.classList.remove("hidden");
  }

  function speakBtn(text, label) {
    label = label || "🔊";
    var safe = (text || "").replace(/\\/g,"\\\\").replace(/'/g,"\\'");
    return '<button class="btn-listen" onclick="Speech.speak(\'' + safe + '\')" title="Ouvir">' + label + '</button>';
  }

  function speakBtnSlow(text) {
    var safe = (text || "").replace(/\\/g,"\\\\").replace(/'/g,"\\'");
    return '<button class="btn-listen btn-slow" onclick="Speech.speakSlow(\'' + safe + '\')" title="Ouvir devagar">🐢</button>';
  }

  function levelBadge(level) {
    return '<span class="level-badge level-' + (level||"").toLowerCase().replace("+","plus") + '">' + level + '</span>';
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
    var state = self._activeQuestions[prefix]; if (!state) return;
    var q = state.questions[i];
    var fbEl = document.getElementById(prefix+"_f"+i);
    var qDiv = document.getElementById(prefix+"_q"+i);
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
    fbEl.innerHTML = ok
      ? '<span class="fb-ok">✓ Correto!</span>'
      : '<span class="fb-err">✗ Resposta: <b>' + q.answer + '</b></span>';
    if (q.explanation) fbEl.innerHTML += ' <span class="fb-exp">' + q.explanation + '</span>';
    Storage.recordExercise(ok);
    if (ok) { Storage.addXP(window.XP_REWARDS ? window.XP_REWARDS.exerciseCorrect : 10); Storage.progressMission("grammar", 1); }
    App.updateXPBar();
    if (state.answered === state.total && state.onDone) state.onDone(state.score, state.total);
  };

  self._checkFill = function(prefix, i) {
    var state = self._activeQuestions[prefix]; if (!state) return;
    var q = state.questions[i];
    var inp = document.getElementById(prefix+"_i"+i);
    var fbEl = document.getElementById(prefix+"_f"+i);
    var qDiv = document.getElementById(prefix+"_q"+i);
    if (!inp || !fbEl || qDiv.dataset.answered) return;
    qDiv.dataset.answered = "1"; inp.disabled = true;
    var ok = inp.value.trim().toLowerCase() === q.answer.toLowerCase();
    if (ok) state.score++;
    state.answered++;
    fbEl.innerHTML = ok
      ? '<span class="fb-ok">✓ Correto!</span>'
      : '<span class="fb-err">✗ Resposta: <b>' + q.answer + '</b></span>';
    if (q.explanation) fbEl.innerHTML += ' <span class="fb-exp">' + q.explanation + '</span>';
    Storage.recordExercise(ok);
    if (ok) { Storage.addXP(10); Storage.progressMission("grammar", 1); }
    App.updateXPBar();
    if (state.answered === state.total && state.onDone) state.onDone(state.score, state.total);
  };

  /* ══════════════════════════════════════
     DASHBOARD
  ══════════════════════════════════════ */
  self.dashboard = function() {
    show("page-dashboard");
    var p = Storage.getProfile();
    var pct = p.exercisesDone > 0 ? Math.round((p.correctAnswers/p.exercisesDone)*100) : 0;
    var learnedW = Object.keys(Storage.getLearnedWords()).length;
    var learnedP = Object.keys(Storage.getLearnedPhrases()).length;
    var lvl = (window.XP_LEVELS||[]).find(function(l){ return l.level===p.level; })||{};
    var summary = Storage.getMissionSummary();

    document.getElementById("page-dashboard").innerHTML =
      '<div class="page-header"><h1>🗺️ Carnet de bord</h1></div>' +
      '<div class="stats-grid">' +
        statCard((p.xp||0)+" XP", "Total XP", "", false) +
        statCard((lvl.icon||"🌱")+" "+p.level, "Nível · "+(lvl.title||"Débutant"), "", false) +
        statCard("🔥 "+(p.streak||0), "Dias seguidos", "", true) +
        statCard(learnedW, "Palavras aprendidas", "", false) +
        statCard(learnedP, "Frases aprendidas", "", false) +
        statCard(pct+"%", "Precisão geral", "", false) +
      '</div>' +

      '<div class="section-title">🎯 Missões de hoje</div>' +
      '<div class="mission-dash" onclick="Router.navigate(\'missions\')">' +
        '<div class="mission-progress-bar"><div class="mission-progress-fill" style="width:'+summary.pct+'%"></div></div>' +
        '<div class="mission-dash-info">' +
          '<span>'+summary.done+' / '+summary.total+' concluídas</span>' +
          '<span class="mission-xp-total">+'+summary.totalXP+' XP ganhos</span>' +
        '</div>' +
        '<button class="btn-primary btn-sm" style="margin-top:10px">Ver missões →</button>' +
      '</div>' +

      '<div class="section-title">🚀 Continuar estudando</div>' +
      '<div class="quick-links">' +
        [["vocabulary","📖","Vocabulário"],["phrases","💬","Frases"],["grammar","📐","Gramática"],
         ["conversation","🗣️","Conversação"],["flashcards","🃏","Flashcards"],["phonetics","🎤","Fonética"],
         ["lab","⚗️","Laboratório"],["culture","🎨","Cultura"],["tests","📋","Testes"],
         ["immersion","🌊","Imersão"],["literature","✒️","Literatura"],["profile","👤","Perfil"]]
        .map(function(l){ return '<button class="quick-link" onclick="Router.navigate(\''+l[0]+'\')"><span class="ql-icon">'+l[1]+'</span><span class="ql-label">'+l[2]+'</span></button>'; }).join("") +
      '</div>' +

      '<div class="section-title">📅 Calendário (últimos 30 dias)</div>' +
      '<div class="calendar-grid" id="cal-grid"></div>';

    var cal = document.getElementById("cal-grid");
    var days = p.calendarDays || [];
    for (var i = 29; i >= 0; i--) {
      var d = new Date(Date.now() - i*86400000).toISOString().slice(0,10);
      var div = document.createElement("div");
      div.className = "cal-day" + (days.includes(d) ? " studied" : "");
      div.title = d; cal.appendChild(div);
    }
  };

  function statCard(val, label, unit, accent) {
    return '<div class="stat-card'+(accent?' accent':'')+'"><div class="stat-val">'+val+'<span class="stat-unit">'+unit+'</span></div><div class="stat-label">'+label+'</div></div>';
  }

  /* ══════════════════════════════════════
     PERFIL
  ══════════════════════════════════════ */
  self.profile = function() {
    show("page-profile");
    var p = Storage.getProfile();
    var learnedW = Object.keys(Storage.getLearnedWords()).length;
    var learnedP = Object.keys(Storage.getLearnedPhrases()).length;
    var pct = p.exercisesDone > 0 ? Math.round((p.correctAnswers/p.exercisesDone)*100) : 0;
    var lvl = (window.XP_LEVELS||[]).find(function(l){ return l.level===p.level; })||{};

    var avatarOptions = ["🧑‍🎓","👩‍🎓","🧑‍💼","👩‍💼","🧑‍🏫","👨‍🎨","🧑","👤"];
    document.getElementById("page-profile").innerHTML =
      '<div class="page-header"><h1>👤 Meu Perfil</h1></div>' +

      '<div class="profile-card">' +
        '<div class="profile-avatar-row">' +
          '<div class="profile-avatar" id="profile-avatar">'+p.avatar+'</div>' +
          '<div class="avatar-picker" id="avatar-picker">' +
            avatarOptions.map(function(a){ return '<button class="avatar-opt'+(a===p.avatar?' selected':'')+'" onclick="Pages._setAvatar(\''+a+'\')">'+a+'</button>'; }).join("") +
          '</div>' +
        '</div>' +
        '<div class="profile-info">' +
          '<div class="profile-name-row">' +
            '<input id="profile-name-input" class="profile-name-input" value="'+p.name+'" placeholder="Seu nome">' +
            '<button class="btn-small" onclick="Pages._saveName()">Salvar</button>' +
          '</div>' +
          '<div class="profile-level">'+lvl.icon+' Nível '+p.level+' — '+lvl.title+'</div>' +
          '<div class="profile-xp-bar"><div class="profile-xp-fill" id="profile-xp-fill"></div></div>' +
          '<div class="profile-xp-text" id="profile-xp-text"></div>' +
        '</div>' +
      '</div>' +

      '<div class="section-title">📊 Estatísticas</div>' +
      '<div class="stats-grid">' +
        statCard(p.xp||0, "XP Total", "", false) +
        statCard("🔥 "+(p.streak||0), "Streak atual", " dias", false) +
        statCard(learnedW, "Palavras", "", false) +
        statCard(learnedP, "Frases", "", false) +
        statCard(p.exercisesDone||0, "Exercícios", "", false) +
        statCard(pct+"%", "Precisão", "", false) +
        statCard(p.lessonsCompleted||0, "Lições", "", false) +
        statCard((p.unlockedAchievements||[]).length, "Conquistas", "", false) +
        statCard(Math.round((p.totalMinutes||0)/60*10)/10, "Horas estudadas", " h", false) +
        statCard("🇫🇷", "Idioma", " Francês", false) +
      '</div>' +
      '<div class="section-title">📆 Atividade semanal</div>' +
      '<div class="weekly-chart" id="weekly-chart"></div>' +
      '<div class="section-title">📈 Progresso mensal</div>' +
      '<div class="monthly-chart" id="monthly-chart"></div>' +

      '<div class="section-title">🎯 Meta diária</div>' +
      '<div class="goal-row">' +
        '<span>XP por dia:</span>' +
        '<select id="daily-goal-select" onchange="Pages._saveDailyGoal(this.value)">' +
          [20,50,100,150,200].map(function(g){ return '<option value="'+g+'"'+(p.dailyGoalXP===g?' selected':'')+'>'+g+' XP</option>'; }).join("") +
        '</select>' +
      '</div>' +

      '<div class="section-title danger-section">⚠️ Zona de perigo</div>' +
      '<div class="danger-zone">' +
        '<p>Reiniciar apaga todo o progresso: XP, nível, palavras aprendidas, flashcards, conquistas e missões. Seu perfil (nome, avatar) é mantido.</p>' +
        '<button class="btn-danger" onclick="Pages._confirmReset()">🗑️ Reiniciar progresso</button>' +
      '</div>';

    // Atualiza barra XP no perfil
    var cur = (window.XP_LEVELS||[]).find(function(l){ return l.level===p.level; })||{xpRequired:0};
    var next = (window.XP_LEVELS||[]).find(function(l){ return l.level===p.level+1; });
    var base = cur.xpRequired, cap = next ? next.xpRequired : base+100;
    var pctXP = Math.min(100, Math.round(((p.xp-base)/(cap-base))*100));
    var fill = document.getElementById("profile-xp-fill");
    var txt = document.getElementById("profile-xp-text");
    if (fill) fill.style.width = pctXP + "%";
    if (txt) txt.textContent = (p.xp||0) + " / " + cap + " XP para o próximo nível";

    // Weekly chart
    var wc = document.getElementById("weekly-chart");
    if (wc) {
      var week = Storage.getWeeklyActivity();
      wc.innerHTML = week.map(function(d) {
        return '<div class="week-bar-wrap">' +
          '<div class="week-bar '+(d.studied?'active':'')+'"></div>' +
          '<div class="week-label">'+d.label+'</div>' +
        '</div>';
      }).join("");
    }

    // Monthly calendar
    var mc = document.getElementById("monthly-chart");
    if (mc) {
      var calDays = (Storage.getProfile().calendarDays || []);
      var html = '<div class="monthly-grid">';
      for (var mi = 29; mi >= 0; mi--) {
        var md = new Date(Date.now()-mi*86400000).toISOString().slice(0,10);
        html += '<div class="month-cell'+(calDays.includes(md)?' studied':'')+'" title="'+md+'"></div>';
      }
      mc.innerHTML = html + '</div>';
    }
  };

  self._setAvatar = function(a) {
    Storage.updateProfile({ avatar: a });
    document.querySelectorAll(".avatar-opt").forEach(function(btn){ btn.classList.toggle("selected", btn.textContent === a); });
    var av = document.getElementById("profile-avatar");
    if (av) av.textContent = a;
  };

  self._saveName = function() {
    var inp = document.getElementById("profile-name-input");
    if (!inp) return;
    Storage.updateProfile({ name: inp.value.trim() || "Aprendiz" });
    App.showToast("Nome salvo!", "success");
  };

  self._saveDailyGoal = function(val) {
    Storage.updateProfile({ dailyGoalXP: parseInt(val) });
    App.showToast("Meta atualizada!", "success");
  };

  self._confirmReset = function() {
    var modal = document.getElementById("reset-modal");
    if (modal) modal.classList.add("visible");
  };

  self._cancelReset = function() {
    var modal = document.getElementById("reset-modal");
    if (modal) modal.classList.remove("visible");
  };

  self._executeReset = function() {
    Storage.resetProgress();
    self._cancelReset();
    App.showToast("Progresso reiniciado.", "info");
    App.updateXPBar();
    self.profile();
  };

  /* ══════════════════════════════════════
     MISSÕES DIÁRIAS
  ══════════════════════════════════════ */
  self.missions = function() {
    show("page-missions");
    var summary = Storage.getMissionSummary();
    var missions = summary.missions;
    var el = document.getElementById("page-missions");

    var allDone = summary.done === summary.total;
    el.innerHTML =
      '<div class="page-header"><h1>🎯 Missões do dia</h1></div>' +
      (allDone ?
        '<div class="missions-complete"><div class="complete-icon">🎉</div>' +
        '<h2>Missões concluídas!</h2><p>Você ganhou <b>'+summary.totalXP+' XP</b> hoje.<br>Bônus de conclusão: <b>+150 XP 🎉</b></p></div>' : ""
      ) +
      '<div class="missions-header">' +
        '<div class="missions-pct">'+summary.pct+'% concluído</div>' +
        '<div class="missions-xp">'+summary.totalXP+' XP ganhos hoje</div>' +
      '</div>' +
      '<div class="mission-progress-bar large"><div class="mission-progress-fill" style="width:'+summary.pct+'%"></div></div>' +
      '<div class="missions-list">' +
        missions.map(function(m) {
          var pct = Math.round(((m.progress||0)/m.target)*100);
          return '<div class="mission-item' + (m.done?' done':'') + '">' +
            '<div class="mi-check">'+(m.done?'✓':'○')+'</div>' +
            '<div class="mi-body">' +
              '<div class="mi-title">'+m.title+'</div>' +
              '<div class="mi-desc">'+m.desc+'</div>' +
              '<div class="mi-bar"><div class="mi-bar-fill" style="width:'+pct+'%"></div></div>' +
              '<div class="mi-meta"><span>'+(m.progress||0)+'/'+m.target+'</span>' +
              '<span class="mi-xp">+'+m.xp+' XP</span>' +
              '<span class="mi-coins">🪙 '+Math.round(m.xp/5)+'</span>' +
            '</div>' +
            '</div>' +
            '<button class="btn-small mi-go" onclick="Router.navigate(\''+m.action+'\')">Ir →</button>' +
          '</div>';
        }).join("") +
      '</div>' +
      '<p class="missions-note">💡 Novas missões são geradas automaticamente todo dia à meia-noite.</p>';
  };

  /* ══════════════════════════════════════
     FONÉTICA
  ══════════════════════════════════════ */
  self.phonetics = function() {
    show("page-phonetics");
    var data = window.PHONETICS_DATA;
    if (!data) return;
    var el = document.getElementById("page-phonetics");
    var html = '<div class="page-header"><h1>🎤 Fonética e Pronúncia</h1></div><div class="tab-bar">';
    data.sections.forEach(function(s, i) {
      html += '<button class="tab-btn'+(i===0?' active':'')+'" onclick="Pages._phTab('+i+')">'+s.title+'</button>';
    });
    html += '</div>';
    data.sections.forEach(function(s, i) {
      html += '<div class="ph-section'+(i===0?'':' hidden')+'" id="ph-sec-'+i+'"><p class="section-intro">'+s.intro+'</p>' +
        '<table class="ph-table"><thead><tr><th>Francês</th><th>IPA</th><th>Aprox. PT-BR</th><th>Nota / Exemplo</th><th>🔊</th></tr></thead><tbody>';
      s.items.forEach(function(item) {
        html += '<tr><td><b>'+item.fr+'</b></td><td><code>'+item.ipa+'</code></td><td>'+item.ptbr+'</td>' +
          '<td>'+(item.note||(item.ex_fr?'<i>'+item.ex_fr+'</i> — '+(item.ex_pt||''):'—'))+'</td>' +
          '<td>'+speakBtn(item.ex_fr||item.fr,"🔊")+'</td></tr>';
        if (item.note && item.ex_fr)
          html += '<tr class="ph-example-row"><td colspan="5"><i>Ex: '+item.ex_fr+'</i> — '+(item.ex_pt||'')+'</td></tr>';
      });
      html += '</tbody></table></div>';
    });
    html += '<div class="section-title" style="margin-top:2rem">🎙️ Praticar pronúncia</div>' +
      '<div class="pron-practice">' +
        '<p>Ouça a palavra e repita. O app avaliará sua pronúncia.</p>' +
        '<div class="pron-word-display" id="pron-word"><div style="color:var(--text-muted)">Clique em "Nova palavra"</div></div>' +
        '<div class="pron-controls">' +
          '<button class="btn-primary" onclick="Pages._nextPronWord()">🔀 Nova palavra</button>' +
          '<button class="btn-secondary" id="btn-pron-listen">🔊 Ouvir</button>' +
          '<button class="btn-secondary" id="btn-pron-slow">🐢 Devagar</button>' +
          '<button class="btn-primary" id="btn-pron-speak">🎤 Falar</button>' +
        '</div>' +
        '<div class="pron-feedback" id="pron-feedback"></div>' +
        '<div class="pron-history" id="pron-history"></div>' +
      '</div>';
    el.innerHTML = html;
    self._phCurrentWord = null;
    self._renderPronHistory();
    document.getElementById("btn-pron-listen").onclick = function(){ if (self._phCurrentWord) Speech.speak(self._phCurrentWord.fr); };
    document.getElementById("btn-pron-slow").onclick = function(){ if (self._phCurrentWord) Speech.speakSlow(self._phCurrentWord.fr); };
    document.getElementById("btn-pron-speak").onclick = function(){ self._startPronRecord(); };
  };

  self._phTab = function(i) {
    document.querySelectorAll(".ph-section").forEach(function(s,j){ s.classList.toggle("hidden", j!==i); });
    document.querySelectorAll("#page-phonetics .tab-btn").forEach(function(b,j){ b.classList.toggle("active", j===i); });
  };

  self._nextPronWord = function() {
    var vocab = window.VOCAB_DATA||[]; if (!vocab.length) return;
    var w = vocab[Math.floor(Math.random()*vocab.length)];
    self._phCurrentWord = w;
    var el = document.getElementById("pron-word"); if (!el) return;
    el.innerHTML = '<div class="pron-fr">'+w.fr+'</div>' +
      '<div class="pron-ipa"><code>'+w.ipa+'</code></div>' +
      '<div class="pron-pt">'+w.pt+'</div>' +
      '<div class="pron-approx">Aprox: <i>'+w.ptbr+'</i></div>';
    var fb = document.getElementById("pron-feedback"); if (fb) fb.innerHTML = "";
  };

  self._startPronRecord = function() {
    var fb = document.getElementById("pron-feedback");
    if (!self._phCurrentWord || !fb) return;
    fb.innerHTML = '<span class="recording">🔴 Gravando… fale agora!</span>';
    Speech.startListening(function(transcript) {
      var result = Speech.scorePronunciation(transcript, self._phCurrentWord.fr);
      fb.innerHTML = '<div class="pron-result" style="color:'+result.color+'"><b>'+result.label+'</b> ('+result.score+'%)<br><span>Você disse: "<i>'+transcript+'</i>"</span></div>';
      Storage.addPronunciationHistory({ word: self._phCurrentWord.fr, spoken: transcript, score: result.score });
      Storage.addXP(window.XP_REWARDS ? window.XP_REWARDS.pronunciationPractice : 10);
      Storage.progressMission("phonetics", 1);
      App.updateXPBar();
      self._renderPronHistory();
    }, function(err) {
      fb.innerHTML = '<span class="fb-err">Erro: '+err+'. Use Chrome com microfone ativado.</span>';
    });
  };

  self._renderPronHistory = function() {
    var el = document.getElementById("pron-history"); if (!el) return;
    var h = Storage.getPronunciationHistory().slice(0,5);
    if (!h.length) { el.innerHTML = ""; return; }
    el.innerHTML = '<b>Histórico:</b><ul>'+h.map(function(e){ return '<li><b>'+e.word+'</b> — "'+e.spoken+'" — '+e.score+'%</li>'; }).join("")+'</ul>';
  };

  /* ══════════════════════════════════════
     VOCABULÁRIO
  ══════════════════════════════════════ */
  self.vocabulary = function() {
    show("page-vocabulary");
    var cats = window.VOCAB_CATEGORIES||[];
    var vocab = window.VOCAB_DATA||[];
    var learned = Storage.getLearnedWords();
    var favs = Storage.getFavoriteWords();
    var activeCat = "";
    var activeLevel = "";
    var activeFilter = "all"; // all | learned | favorites
    var searchQ = "";

    var sortMode = "default";
    function getFiltered() {
      var results = vocab.filter(function(w) {
        if (activeCat && w.cat !== activeCat) return false;
        if (activeLevel && w.level !== activeLevel) return false;
        if (activeFilter === "learned" && !learned[w.id]) return false;
        if (activeFilter === "favorites" && !favs[w.id]) return false;
        if (activeFilter === "recent") {
          var lw = Storage.getLearnedWords();
          if (!lw[w.id]) return false;
        }
        if (searchQ && !w.fr.toLowerCase().includes(searchQ) && !w.pt.toLowerCase().includes(searchQ)) return false;
        return true;
      });
      if (sortMode === "az") results = results.slice().sort(function(a,b){ return a.fr.localeCompare(b.fr); });
      else if (sortMode === "za") results = results.slice().sort(function(a,b){ return b.fr.localeCompare(a.fr); });
      else if (activeFilter === "recent") {
        var lw2 = Storage.getLearnedWords();
        results = results.slice().sort(function(a,b){ return (lw2[b.id]||0)-(lw2[a.id]||0); });
      }
      return results;
    }

    function renderVocab() {
      var filtered = getFiltered();
      var cnt = document.getElementById("vocab-count");
      if (cnt) {
        var lc = filtered.filter(function(w){ return learned[w.id]; }).length;
        cnt.textContent = filtered.length + " palavras · " + lc + " aprendidas";
      }
      var container = document.getElementById("vocab-cards"); if (!container) return;
      if (!filtered.length) { container.innerHTML = '<div class="empty-state"><div class="empty-icon">🔍</div><p>Nenhuma palavra encontrada com esses filtros.</p></div>'; return; }
      container.innerHTML = filtered.map(function(w) {
        var isFav = !!favs[w.id];
        var isLearned = !!learned[w.id];
        return '<div class="vocab-card'+(isLearned?' learned':'')+(isFav?' fav':'')+'" id="vc-'+w.id+'">' +
          '<div class="vc-header"><div class="vc-fr">'+w.fr+'</div>' +
            '<div class="vc-badges">'+levelBadge(w.level)+'<button class="btn-fav'+(isFav?' active':'')+'" onclick="Pages._toggleFavWord(\''+w.id+'\')" title="Favorito">♥</button></div>' +
          '</div>' +
          '<div class="vc-pt">'+w.pt+'</div>' +
          '<div class="vc-ipa"><code>'+w.ipa+'</code> · <span class="vc-ptbr">'+w.ptbr+'</span></div>' +
          '<div class="vc-ex"><i>'+w.ex_fr+'</i><br><small>'+w.ex_pt+'</small></div>' +
          '<div class="vc-actions">' +
            speakBtn(w.fr,"🔊") + speakBtnSlow(w.fr) +
            '<button class="btn-small'+(isLearned?' btn-learned':'')+'" onclick="Pages._learnWord(\''+w.id+'\',this)">'+(isLearned?'✓ Aprendida':'Aprendida')+'</button>' +
            '<button class="btn-small" onclick="Pages._addFlashcard(\''+w.id+'\')">🃏</button>' +
          '</div></div>';
      }).join("");
    }

    var el = document.getElementById("page-vocabulary");
    el.innerHTML =
      '<div class="page-header"><h1>📖 Vocabulário</h1></div>' +
      '<div class="vocab-toolbar">' +
        '<div class="search-bar"><input type="search" id="vocab-search" placeholder="🔍 Buscar palavra…"><button onclick="Pages._vocabSearch()">Buscar</button></div>' +
        '<div class="filter-row">' +
          '<select id="cat-select"><option value="">— Categoria —</option>' +
            cats.map(function(c){ return '<option value="'+c.id+'">'+c.icon+' '+c.label+'</option>'; }).join("") + '</select>' +
          '<select id="level-select"><option value="">— Nível —</option>' +
            ["A0","A1","A2","B1","B2","C1","C2"].map(function(l){ return '<option>'+l+'</option>'; }).join("") + '</select>' +
        '</div>' +
        '<div class="filter-chips">' +
          '<button class="chip active" data-filter="all" onclick="Pages._vocabFilter(\'all\',this)">Todas</button>' +
          '<button class="chip" data-filter="learned" onclick="Pages._vocabFilter(\'learned\',this)">✓ Aprendidas</button>' +
          '<button class="chip" data-filter="favorites" onclick="Pages._vocabFilter(\'favorites\',this)">♥ Favoritas</button>' +
        '</div>' +
        '<div class="vocab-count" id="vocab-count"></div>' +
      '</div>' +
      '<div class="vocab-grid" id="vocab-cards"></div>';

    document.getElementById("cat-select").onchange = function(e){ activeCat = e.target.value; renderVocab(); };
    document.getElementById("level-select").onchange = function(e){ activeLevel = e.target.value; renderVocab(); };
    var searchInput = document.getElementById("vocab-search");
    searchInput.onkeyup = function(e){ if (e.key==="Enter"){ searchQ = searchInput.value.trim().toLowerCase(); renderVocab(); } };

    self._vocabSort = function(mode, btn) {
      sortMode = mode;
      document.querySelectorAll("#page-vocabulary .chip").forEach(function(b){ b.classList.remove("active"); });
      if (btn) btn.classList.add("active");
      renderVocab();
    };
    self._vocabSearch = function() { searchQ = (document.getElementById("vocab-search")||{}).value.trim().toLowerCase(); renderVocab(); };
    self._vocabFilter = function(f, btn) {
      activeFilter = f; learned = Storage.getLearnedWords(); favs = Storage.getFavoriteWords();
      document.querySelectorAll("#page-vocabulary .chip").forEach(function(b){ b.classList.remove("active"); });
      if (btn) btn.classList.add("active");
      renderVocab();
    };

    renderVocab();
  };

  self._learnWord = function(id, btn) {
    Storage.markWordLearned(id);
    var card = document.getElementById("vc-"+id);
    if (card) card.classList.add("learned");
    if (btn) { btn.textContent = "✓ Aprendida"; btn.classList.add("btn-learned"); }
    Storage.addXP(5);
    Storage.progressMission("vocab", 1);
    App.updateXPBar();
    App.checkAchievements();
    App.showToast("+5 XP — palavra marcada!", "success");
  };

  self._toggleFavWord = function(id) {
    var isFav = Storage.toggleFavoriteWord(id);
    var btn = document.querySelector("#vc-"+id+" .btn-fav");
    if (btn) btn.classList.toggle("active", isFav);
    var card = document.getElementById("vc-"+id);
    if (card) card.classList.toggle("fav", isFav);
    App.showToast(isFav ? "♥ Adicionada aos favoritos" : "Removida dos favoritos", "info");
  };

  self._addFlashcard = function(id) {
    Storage.markWordLearned(id);
    App.showToast("🃏 Adicionado aos flashcards!", "success");
    Storage.addXP(3); App.updateXPBar();
  };

  /* ══════════════════════════════════════
     FRASES
  ══════════════════════════════════════ */
  self.phrases = function() {
    show("page-phrases");
    var cats = window.PHRASE_CATEGORIES||[];
    var phrases = window.PHRASES_DATA||[];
    var learnedP = Storage.getLearnedPhrases();
    var favsP = Storage.getFavoritePhrases();
    var activeCat = "";
    var activeLevel = "";
    var activeFilter = "all";
    var searchQ = "";

    function getFiltered() {
      return phrases.filter(function(p) {
        if (activeCat && p.cat !== activeCat) return false;
        if (activeLevel && p.level !== activeLevel) return false;
        if (activeFilter === "learned" && !learnedP[p.id]) return false;
        if (activeFilter === "favorites" && !favsP[p.id]) return false;
        if (searchQ && !p.fr.toLowerCase().includes(searchQ) && !p.pt.toLowerCase().includes(searchQ)) return false;
        return true;
      });
    }

    function renderPhrases() {
      var filtered = getFiltered();
      var cnt = document.getElementById("phrase-count");
      if (cnt) { var lc = filtered.filter(function(p){ return learnedP[p.id]; }).length; cnt.textContent = filtered.length + " frases · " + lc + " aprendidas"; }
      var container = document.getElementById("phrase-cards"); if (!container) return;
      if (!filtered.length) { container.innerHTML = '<div class="empty-state"><div class="empty-icon">🔍</div><p>Nenhuma frase encontrada.</p></div>'; return; }
      container.innerHTML = filtered.map(function(ph) {
        var isL = !!learnedP[ph.id]; var isF = !!favsP[ph.id];
        var lvlClass = ph.level === "easy" ? "easy" : ph.level === "medium" ? "medium" : "hard";
        return '<div class="phrase-card'+(isL?' learned':'')+(isF?' fav':'')+'" id="ph-'+ph.id+'">' +
          '<div class="ph-header">' +
            '<span class="ph-level '+lvlClass+'">'+({easy:"Fácil",medium:"Médio",hard:"Difícil"}[ph.level]||ph.level)+'</span>' +
            '<button class="btn-fav'+(isF?' active':'')+'" onclick="Pages._toggleFavPhrase(\''+ph.id+'\')" title="Favorito">♥</button>' +
          '</div>' +
          '<div class="ph-fr">'+ph.fr+'</div>' +
          '<div class="ph-pt">'+ph.pt+'</div>' +
          (ph.literal ? '<div class="ph-literal">Literal: <i>'+ph.literal+'</i></div>' : '') +
          (ph.note ? '<div class="ph-note">💡 '+ph.note+'</div>' : '') +
          '<div class="ph-actions">' +
            speakBtn(ph.fr,"🔊 Ouvir") + speakBtnSlow(ph.fr) +
            '<button class="btn-small'+(isL?' btn-learned':'')+'" onclick="Pages._learnPhrase(\''+ph.id+'\',this)">'+(isL?'✓ Aprendida':'Aprendida')+'</button>' +
          '</div></div>';
      }).join("");
    }

    var el = document.getElementById("page-phrases");
    el.innerHTML =
      '<div class="page-header"><h1>💬 Biblioteca de Frases</h1></div>' +
      '<div class="vocab-toolbar">' +
        '<div class="search-bar"><input type="search" id="phrase-search" placeholder="🔍 Buscar frase…"><button onclick="Pages._phraseSearch()">Buscar</button></div>' +
        '<div class="filter-row">' +
          '<select id="pcat-select"><option value="">— Contexto —</option>' +
            cats.map(function(c){ return '<option value="'+c.id+'">'+c.icon+' '+c.label+'</option>'; }).join("") + '</select>' +
          '<select id="plevel-select"><option value="">— Dificuldade —</option>' +
            [["easy","Fácil"],["medium","Médio"],["hard","Difícil"]].map(function(l){ return '<option value="'+l[0]+'">'+l[1]+'</option>'; }).join("") + '</select>' +
        '</div>' +
        '<div class="filter-chips">' +
          '<button class="chip active" onclick="Pages._phraseFilter(\'all\',this)">Todas</button>' +
          '<button class="chip" onclick="Pages._phraseFilter(\'learned\',this)">✓ Aprendidas</button>' +
          '<button class="chip" onclick="Pages._phraseFilter(\'favorites\',this)">♥ Favoritas</button>' +
        '</div>' +
        '<div class="vocab-count" id="phrase-count"></div>' +
      '</div>' +
      '<div class="phrase-grid" id="phrase-cards"></div>';

    document.getElementById("pcat-select").onchange = function(e){ activeCat = e.target.value; renderPhrases(); };
    document.getElementById("plevel-select").onchange = function(e){ activeLevel = e.target.value; renderPhrases(); };
    document.getElementById("phrase-search").onkeyup = function(e){ if (e.key==="Enter"){ searchQ = this.value.trim().toLowerCase(); renderPhrases(); } };

    self._phraseSearch = function() { searchQ = (document.getElementById("phrase-search")||{}).value.trim().toLowerCase(); renderPhrases(); };
    self._phraseFilter = function(f, btn) {
      activeFilter = f; learnedP = Storage.getLearnedPhrases(); favsP = Storage.getFavoritePhrases();
      document.querySelectorAll("#page-phrases .chip").forEach(function(b){ b.classList.remove("active"); });
      if (btn) btn.classList.add("active");
      renderPhrases();
    };

    renderPhrases();
  };

  self._learnPhrase = function(id, btn) {
    Storage.markPhraseLearned(id);
    var card = document.getElementById("ph-"+id);
    if (card) card.classList.add("learned");
    if (btn) { btn.textContent = "✓ Aprendida"; btn.classList.add("btn-learned"); }
    Storage.addXP(8); Storage.progressMission("phrases", 1);
    App.updateXPBar(); App.checkAchievements();
    App.showToast("+8 XP — frase aprendida!", "success");
  };

  self._toggleFavPhrase = function(id) {
    var isF = Storage.toggleFavoritePhrase(id);
    var btn = document.querySelector("#ph-"+id+" .btn-fav");
    if (btn) btn.classList.toggle("active", isF);
    var card = document.getElementById("ph-"+id);
    if (card) card.classList.toggle("fav", isF);
    App.showToast(isF ? "♥ Adicionada aos favoritos" : "Removida dos favoritos", "info");
  };

  /* ══════════════════════════════════════
     GRAMÁTICA
  ══════════════════════════════════════ */
  self.grammar = function() {
    show("page-grammar");
    var data = window.GRAMMAR_DATA||[];
    var groups = { basica:"Básica", intermediaria:"Intermediária", avancada:"Avançada", especialista:"Especialista" };
    var el = document.getElementById("page-grammar");
    var html = '<div class="page-header"><h1>📐 Gramática</h1></div>';
    Object.keys(groups).forEach(function(g) {
      var lessons = data.filter(function(l){ return l.group===g; });
      if (!lessons.length) return;
      html += '<div class="section-title">'+groups[g]+'</div><div class="lesson-list">';
      lessons.forEach(function(l) {
        var done = Storage.isCompleted("grammar", l.id);
        html += '<div class="lesson-item'+(done?' done':'')+'" onclick="Pages._openGrammar(\''+l.id+'\')">'+
          levelBadge(l.level)+'<span class="lesson-title">'+l.title+'</span>'+(done?'<span class="done-badge">✓</span>':'')+'</div>';
      });
      html += '</div>';
    });
    html += '<div id="grammar-detail" class="detail-panel hidden"></div>';
    el.innerHTML = html;
  };

  self._openGrammar = function(id) {
    var l = (window.GRAMMAR_DATA||[]).find(function(x){ return x.id===id; }); if (!l) return;
    var panel = document.getElementById("grammar-detail"); if (!panel) return;
    panel.classList.remove("hidden");
    panel.innerHTML =
      '<div class="detail-header">' +
        '<button class="btn-back" onclick="document.getElementById(\'grammar-detail\').classList.add(\'hidden\')">← Voltar</button>' +
        '<h2>'+l.title+' '+levelBadge(l.level)+'</h2></div>' +
      '<div class="grammar-explanation">'+l.explanation+'</div>' +
      '<div class="section-title">Exemplos</div>' +
      '<div class="example-list">'+l.examples.map(function(e){ return '<div class="example-item"><div class="ex-fr">'+e.fr+' '+speakBtn(e.fr,"🔊")+'</div><div class="ex-pt">'+e.pt+'</div></div>'; }).join("")+'</div>' +
      '<div class="section-title">Exercícios</div><div id="gram-ex-'+id+'"></div>' +
      '<div id="gram-res-'+id+'" class="lesson-result hidden"></div>';
    panel.scrollIntoView({behavior:"smooth"});
    var exDiv = document.getElementById("gram-ex-"+id);
    if (exDiv) exDiv.appendChild(mcqBlock(l.exercises, "gram_"+id, function(score, total) {
      var pct = Math.round(score/total*100);
      Storage.markDone("grammar", id, {score:pct}); Storage.addXP(20);
      Storage.progressMission("grammar_quiz", 1);
      App.updateXPBar(); App.checkAchievements();
      var res = document.getElementById("gram-res-"+id);
      if (res) { res.innerHTML='<div class="result-summary">Resultado: <b>'+score+'/'+total+'</b> ('+pct+'%) '+(pct>=70?'✓ Aprovado!':'— Revise e tente novamente.')+'</div>'; res.classList.remove("hidden"); }
      self.grammar();
      var p2 = document.getElementById("grammar-detail");
      if (p2) { p2.classList.remove("hidden"); p2.scrollIntoView({behavior:"smooth"}); }
    }));
  };

  /* ══════════════════════════════════════
     CONVERSAÇÃO
  ══════════════════════════════════════ */
  self.conversation = function() {
    show("page-conversation");
    var data = window.DIALOGUES_DATA||[];
    var el = document.getElementById("page-conversation");
    var html = '<div class="page-header"><h1>🗣️ Conversação</h1></div><div class="dialogue-list">';
    data.forEach(function(d) {
      var done = Storage.isCompleted("dialogue",d.id);
      html += '<div class="dialogue-item'+(done?' done':'')+'" onclick="Pages._openDialogue(\''+d.id+'\')">'+
        levelBadge(d.level)+'<div><b>'+d.title+'</b><br><small>'+d.situation+'</small></div>'+(done?'<span class="done-badge">✓</span>':'')+'</div>';
    });
    html += '</div><div id="dialogue-detail" class="detail-panel hidden"></div>';
    el.innerHTML = html;
  };

  self._openDialogue = function(id) {
    var d = (window.DIALOGUES_DATA||[]).find(function(x){ return x.id===id; }); if (!d) return;
    var panel = document.getElementById("dialogue-detail"); if (!panel) return;
    panel.classList.remove("hidden");
    var linesHTML = d.lines.map(function(l,i) {
      return '<div class="dialogue-bubble '+(i%2===0?'left':'right')+'">' +
        '<div class="bubble-speaker">'+l.speaker+'</div>' +
        '<div class="bubble-fr">'+l.fr+' '+speakBtn(l.fr,"🔊")+'</div>' +
        '<div class="bubble-pt">'+l.pt+'</div></div>';
    }).join("");
    panel.innerHTML =
      '<div class="detail-header"><button class="btn-back" onclick="document.getElementById(\'dialogue-detail\').classList.add(\'hidden\')">← Voltar</button>' +
      '<h2>'+d.title+' '+levelBadge(d.level)+'</h2><p class="situation-label">📍 '+d.situation+'</p></div>' +
      '<button class="btn-primary" onclick="Pages._playDialogue(\''+id+'\')">▶ Ouvir diálogo completo</button>' +
      '<div class="dialogue-chat">'+linesHTML+'</div>' +
      '<div class="section-title">Compreensão</div><div id="dial-ex-'+id+'"></div>';
    panel.scrollIntoView({behavior:"smooth"});
    var exDiv = document.getElementById("dial-ex-"+id);
    if (exDiv) {
      var qs = d.questions.map(function(q){ return {type:"mcq",q:q.q,options:q.options,answer:q.answer}; });
      exDiv.appendChild(mcqBlock(qs, "dial_"+id, function(score, total) {
        Storage.markDone("dialogue",id,{score:Math.round(score/total*100)});
        Storage.addXP(window.XP_REWARDS?window.XP_REWARDS.dialogueComplete:20);
        Storage.progressMission("dialogue", 1);
        App.updateXPBar(); App.checkAchievements();
        App.showToast("Diálogo concluído! +20 XP","success");
      }));
    }
  };

  self._playDialogue = function(id) {
    var d = (window.DIALOGUES_DATA||[]).find(function(x){ return x.id===id; }); if (!d) return;
    var i=0; function next(){ if (i>=d.lines.length) return; Speech.speak(d.lines[i].fr, function(){ i++; setTimeout(next,400); }); }
    next();
  };

  /* ══════════════════════════════════════
     LEITURA
  ══════════════════════════════════════ */
  self.reading = function() {
    show("page-reading");
    var data = window.READINGS_DATA||[];
    var el = document.getElementById("page-reading");
    var html = '<div class="page-header"><h1>📄 Leitura Graduada</h1></div><div class="reading-list">';
    data.forEach(function(r) {
      var done = Storage.isCompleted("reading",r.id);
      html += '<div class="reading-item'+(done?' done':'')+'" onclick="Pages._openReading(\''+r.id+'\')">'+
        levelBadge(r.level)+'<div><b>'+r.title+'</b></div>'+(done?'<span class="done-badge">✓</span>':'')+'</div>';
    });
    html += '</div><div id="reading-detail" class="detail-panel hidden"></div>';
    el.innerHTML = html;
  };

  self._openReading = function(id) {
    var r = (window.READINGS_DATA||[]).find(function(x){ return x.id===id; }); if (!r) return;
    var panel = document.getElementById("reading-detail"); if (!panel) return;
    panel.classList.remove("hidden");
    var paras = r.text_fr.split("\n\n").map(function(p){ return '<p class="reading-para">'+p+' '+speakBtn(p,"🔊")+'</p>'; }).join("");
    panel.innerHTML =
      '<div class="detail-header"><button class="btn-back" onclick="document.getElementById(\'reading-detail\').classList.add(\'hidden\')">← Voltar</button>' +
      '<h2>'+r.title+' '+levelBadge(r.level)+'</h2></div>' +
      '<div class="reading-text">'+paras+'</div>' +
      '<details class="translation-details"><summary>🇧🇷 Ver tradução</summary>' +
        '<div class="translation-text">'+r.text_pt.split("\n\n").map(function(p){ return '<p>'+p+'</p>'; }).join("")+'</div></details>' +
      '<div class="section-title">Perguntas</div><div id="read-ex-'+id+'"></div>';
    panel.scrollIntoView({behavior:"smooth"});
    var exDiv = document.getElementById("read-ex-"+id);
    if (exDiv) {
      var qs = r.questions.map(function(q){ return {type:"mcq",q:q.q,options:q.options,answer:q.answer}; });
      exDiv.appendChild(mcqBlock(qs,"read_"+id, function(score,total) {
        Storage.markDone("reading",id,{score:Math.round(score/total*100)});
        Storage.addXP(window.XP_REWARDS?window.XP_REWARDS.readingComplete:25);
        Storage.progressMission("reading", 1);
        App.updateXPBar(); App.checkAchievements();
        App.showToast("Leitura concluída! +25 XP","success");
      }));
    }
  };

  /* ══════════════════════════════════════
     FLASHCARDS — 3 modos: words / phrases / mixed
  ══════════════════════════════════════ */
  self.flashcards = function() {
    show("page-flashcards");
    var el = document.getElementById("page-flashcards");
    el.innerHTML =
      '<div class="page-header"><h1>🃏 Flashcards</h1></div>' +
      '<div class="fc-mode-selector">' +
        '<button class="fc-mode-btn active" id="fcm-words" onclick="Pages._startFcSession(\'words\')">📖 Palavras</button>' +
        '<button class="fc-mode-btn" id="fcm-phrases" onclick="Pages._startFcSession(\'phrases\')">💬 Frases</button>' +
        '<button class="fc-mode-btn" id="fcm-mixed" onclick="Pages._startFcSession(\'mixed\')">🔀 Misto</button>' +
      '</div>' +
      '<div id="fc-session-area"><div class="fc-start-hint"><p>Escolha um modo acima para começar sua revisão com repetição espaçada.</p>' +
        '<p><b>SM-2:</b> o app decide automaticamente quais cards precisam de revisão hoje.</p></div></div>';
  };

  self._startFcSession = function(mode) {
    document.querySelectorAll(".fc-mode-btn").forEach(function(b){ b.classList.remove("active"); });
    var active = document.getElementById("fcm-"+mode); if (active) active.classList.add("active");

    var vocab = window.VOCAB_DATA||[];
    var phrases = window.PHRASES_DATA||[];
    var items = [];

    if (mode === "words" || mode === "mixed") {
      var wordIds = vocab.map(function(w){ return "w:"+w.id; });
      var dueWords = Storage.getDueFlashcards(wordIds);
      dueWords.forEach(function(wid) {
        var w = window.VOCAB_BY_ID ? window.VOCAB_BY_ID[wid.slice(2)] : vocab.find(function(x){ return x.id===wid.slice(2); });
        if (w) var favWds = Storage.getFavoriteWords();
        items.push({ id:wid, type:"word", fav:!!favWds[w.id], front:w.fr, backTitle:w.pt, backSub:'<code>'+w.ipa+'</code> · '+w.ptbr, backEx:w.ex_fr });
      });
    }
    if (mode === "phrases" || mode === "mixed") {
      var phrIds = phrases.map(function(p){ return "p:"+p.id; });
      var duePhrases = Storage.getDueFlashcards(phrIds);
      duePhrases.forEach(function(pid) {
        var ph = phrases.find(function(x){ return x.id===pid.slice(2); });
        if (ph) var favPhs = Storage.getFavoritePhrases();
        items.push({ id:pid, type:"phrase", fav:!!favPhs[ph.id], front:ph.fr, backTitle:ph.pt, backSub:ph.literal?'Literal: '+ph.literal:'', backEx:ph.note||'' });
      });
    }

    items = items.sort(function(){ return Math.random()-0.5; }).slice(0,20);

    if (!items.length) {
      document.getElementById("fc-session-area").innerHTML =
        '<div class="empty-state"><div class="empty-icon">🎉</div>' +
        '<h2>Nenhum card para revisar agora!</h2>' +
        '<p>Você está em dia. Aprenda mais palavras e frases para adicionar ao sistema.</p>' +
        '<button class="btn-primary" onclick="Router.navigate(\'vocabulary\')">Ir para Vocabulário</button>' +
        '<button class="btn-secondary" style="margin-left:8px" onclick="Router.navigate(\'phrases\')">Ir para Frases</button></div>';
      return;
    }

    self._fc_items = items;
    self._fc_idx = 0;
    self._fc_mode = mode;
    self._renderFcCard();
  };

  self._renderFcCard = function() {
    var items = self._fc_items;
    var idx = self._fc_idx;
    var area = document.getElementById("fc-session-area"); if (!area) return;

    if (idx >= items.length) {
      Storage.addXP(window.XP_REWARDS?window.XP_REWARDS.flashcardSession:15);
      Storage.progressMission("flashcard_session", items.length);
      App.updateXPBar(); App.checkAchievements();
      area.innerHTML = '<div class="fc-done"><div class="empty-icon">🎉</div><h2>Sessão concluída!</h2>' +
        '<p>Revisados: <b>'+items.length+'</b> cards</p>' +
        '<button class="btn-primary" onclick="Pages._startFcSession(\''+self._fc_mode+'\')">Nova sessão</button></div>';
      return;
    }

    var item = items[idx];
    area.innerHTML =
      '<div class="fc-progress-bar"><div class="fc-progress-fill" style="width:'+(Math.round(idx/items.length*100))+'%"></div></div>' +
      '<div class="fc-counter">'+( idx+1)+' / '+items.length+' · <span class="fc-type-badge">'+({word:"📖 Palavra",phrase:"💬 Frase"}[item.type]||item.type)+'</span></div>' +
      '<div class="flashcard" id="fc-main-card">' +
        '<div class="fc-card-inner" id="fc-card-inner">' +
          '<div class="fc-face fc-front">' +
            '<div class="fc-card-meta">' +
              ({word:"📖 Palavra",phrase:"💬 Frase"}[item.type]||item.type) +
              (item.fav ? ' <span class="fc-fav-badge">♥</span>' : '') +
            '</div>' +
            '<div class="fc-word">'+item.front+'</div>' +
            '<div class="fc-hint">Clique em Revelar para ver a resposta</div>' +
            speakBtn(item.front,"🔊 Ouvir") + speakBtnSlow(item.front) +
          '</div>' +
          '<div class="fc-face fc-back">' +
            '<div class="fc-pt">'+item.backTitle+'</div>' +
            '<div class="fc-ipa">'+item.backSub+'</div>' +
            '<div class="fc-ex"><i>'+item.backEx+'</i></div>' +
            speakBtn(item.front,"🔊 Ouvir") +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="fc-flip-btn"><button class="btn-secondary" onclick="Pages._flipFcCard()">🔄 Revelar resposta</button></div>' +
      '<div class="fc-rating hidden" id="fc-rating">' +
        '<p>Como você foi?</p>' +
        '<div class="rating-btns">' +
          '<button class="btn-rating r0" id="fc-r0">😞 Esqueci</button>' +
          '<button class="btn-rating r1" id="fc-r1">😰 Difícil</button>' +
          '<button class="btn-rating r2" id="fc-r2">😊 Bom</button>' +
          '<button class="btn-rating r3" id="fc-r3">🚀 Fácil</button>' +
        '</div>' +
      '</div>';

    [0,1,2,3].forEach(function(ri) {
      var btn = document.getElementById("fc-r"+ri);
      if (btn) btn.onclick = function(){ self._rateFcCard(ri, item.id); };
    });
  };

  self._flipFcCard = function() {
    var inner = document.getElementById("fc-card-inner");
    if (inner) inner.classList.toggle("flipped");
    var rating = document.getElementById("fc-rating");
    if (rating) rating.classList.remove("hidden");
    var flipDiv = document.querySelector(".fc-flip-btn");
    if (flipDiv) flipDiv.innerHTML = speakBtn(self._fc_items[self._fc_idx].front);
  };

  self._rateFcCard = function(rating, id) {
    Storage.reviewFlashcard(id, rating);
    self._fc_idx++;
    self._renderFcCard();
  };

  /* ══════════════════════════════════════
     TESTES CEFR
  ══════════════════════════════════════ */
  self.tests = function() {
    show("page-tests");
    var data = window.TESTS_DATA||[];
    var el = document.getElementById("page-tests");
    var html = '<div class="page-header"><h1>📋 Testes de Nível CEFR</h1></div>' +
      '<p class="intro-text">Avalie seu francês com testes baseados no Quadro Europeu Comum de Referência.</p>' +
      '<div class="test-list">';
    data.forEach(function(t) {
      var prog = Storage.getModuleProgress("test");
      var passed = prog[t.id] && prog[t.id].passed;
      var score = prog[t.id] && prog[t.id].score;
      html += '<div class="test-item'+(passed?' passed':'')+'" onclick="Pages._startTest(\''+t.id+'\')">'+
        '<div class="test-badge">'+t.level+'</div>' +
        '<div><b>'+t.title+'</b><br><small>'+t.desc+'</small></div>' +
        (passed?'<div class="test-score">✓ '+score+'%</div>':'')+'</div>';
    });
    html += '</div><div id="test-detail" class="detail-panel hidden"></div>';
    el.innerHTML = html;
  };

  self._startTest = function(id) {
    var t = (window.TESTS_DATA||[]).find(function(x){ return x.id===id; }); if (!t) return;
    var panel = document.getElementById("test-detail"); if (!panel) return;
    panel.classList.remove("hidden");
    panel.innerHTML =
      '<div class="detail-header"><button class="btn-back" onclick="document.getElementById(\'test-detail\').classList.add(\'hidden\')">← Voltar</button>' +
      '<h2>'+t.title+'</h2><p>'+t.desc+'</p></div>' +
      '<div id="test-q-'+id+'"></div><div id="test-res-'+id+'" class="test-result hidden"></div>';
    panel.scrollIntoView({behavior:"smooth"});
    var exDiv = document.getElementById("test-q-"+id);
    if (exDiv) exDiv.appendChild(mcqBlock(t.questions, "test_"+id, function(score, total) {
      var pct = Math.round(score/total*100); var passed = pct>=70;
      Storage.setModuleProgress("test",id,{done:true,passed:passed,score:pct});
      if (passed) { Storage.addXP(window.XP_REWARDS?window.XP_REWARDS.testPass:50); Storage.unlockAchievement("test_"+t.level.toLowerCase()); }
      App.updateXPBar();
      var res = document.getElementById("test-res-"+id);
      if (res) {
        res.innerHTML='<div class="result-summary '+(passed?'passed':'failed')+'"><h2>'+(passed?'🎉 Aprovado!':'📚 Não aprovado')+'</h2>' +
          '<p>Pontuação: <b>'+score+'/'+total+'</b> ('+pct+'%)</p>' +
          '<p>'+(passed?'Parabéns! Nível '+t.level+' confirmado.':'Continue estudando e tente novamente!')+'</p>' +
          (passed?'<div class="passport-stamp">'+t.level+'</div>':'')+
        '</div>';
        res.classList.remove("hidden");
      }
    }));
  };

  /* ══════════════════════════════════════
     LABORATÓRIO
  ══════════════════════════════════════ */
  self.lab = function() {
    show("page-lab");
    var verbKeys = Object.keys(window.IRREGULAR_VERBS||{});
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
        '<div class="lab-input-row"><input type="text" id="verb-input" placeholder="Infinitivo (ex: parler, être)" list="verb-list">' +
          '<datalist id="verb-list">'+verbKeys.map(function(v){ return '<option value="'+v+'">'; }).join("")+'</datalist>' +
          '<button class="btn-primary" onclick="Pages._conjugate()">Conjugar</button></div>' +
        '<div id="conjugation-result"></div>' +
      '</div>' +
      '<div id="lab-dictionary" class="lab-panel hidden">' +
        '<h3>Dicionário FR↔PT</h3>' +
        '<div class="lab-input-row"><input type="text" id="dict-input" placeholder="Buscar em FR ou PT…"><button class="btn-primary" onclick="Pages._dictSearch()">Buscar</button></div>' +
        '<div id="dict-result"></div>' +
      '</div>' +
      '<div id="lab-comparator" class="lab-panel hidden">' +
        '<h3>Comparador PT-BR ↔ Francês</h3>' +
        '<div class="lab-input-row"><input type="text" id="comp-input" placeholder="Digite uma palavra…"><button class="btn-primary" onclick="Pages._compare()">Comparar</button></div>' +
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
      var el = document.getElementById("lab-"+t); if (el) el.classList.toggle("hidden", t!==tab);
    });
    document.querySelectorAll("#page-lab .tab-btn").forEach(function(b,i){ b.classList.toggle("active",["conjugator","dictionary","comparator","generator"][i]===tab); });
  };

  self._conjugate = function() {
    var inp = document.getElementById("verb-input"); if (!inp) return;
    var verb = inp.value.trim().toLowerCase(); if (!verb) return;
    var res = document.getElementById("conjugation-result"); if (!res) return;
    var data = window.IRREGULAR_VERBS&&window.IRREGULAR_VERBS[verb];
    var pronouns = window.SUBJECT_PRONOUNS||["je","tu","il/elle/on","nous","vous","ils/elles"];
    var tenses = ["presente","imparfait","futur","condicional","subjonctif"];
    var tenseLabels = {presente:"Présent",imparfait:"Imparfait",futur:"Futur simple",condicional:"Conditionnel",subjonctif:"Subjonctif"};
    Storage.recordConjugatorUse(verb);
    if (!data) {
      var pt = window.REGULAR_PATTERNS;
      if (pt) {
        var type=null, stem=verb;
        if (verb.endsWith("er")){type="er";stem=verb.slice(0,-2);}
        else if (verb.endsWith("ir")){type="ir";stem=verb.slice(0,-2);}
        else if (verb.endsWith("re")){type="re";stem=verb.slice(0,-2);}
        if (type) {
          var p=pt[type], futStem=type==="re"?verb.slice(0,-1):verb;
          data={pt:"(regular -"+type+")",participe:stem+p.participe,aux:p.aux,
            presente:p.presente.map(function(s){return stem+s;}),
            imparfait:p.imparfaitSuffix.map(function(s){return stem+s;}),
            futur:p.futurSuffix.map(function(s){return futStem+s;}),
            condicional:p.condicionalSuffix.map(function(s){return futStem+s;}),
            subjonctif:p.subjonctifSuffix.map(function(s){return stem+s;})};
        }
      }
    }
    if (!data){res.innerHTML='<p class="fb-err">Verbo não encontrado.</p>';return;}
    res.innerHTML='<div class="conj-header"><span class="conj-verb">'+verb+'</span> '+speakBtn(verb)+'<span class="conj-pt">'+data.pt+'</span></div>'+
      '<div class="conj-meta">Participe: <b>'+data.participe+'</b> | Aux: <b>'+data.aux+'</b></div>' +
      '<div class="conj-tables">'+tenses.map(function(t){
        return '<div class="conj-table"><div class="conj-tense-title">'+(tenseLabels[t]||t)+'</div>'+
          (data[t]||[]).map(function(form,i){
            return '<div class="conj-row conj-row-'+(i%2===0?'even':'odd')+'">' +
              '<span class="conj-pron">'+pronouns[i]+'</span><span class="conj-form">'+form+'</span>' +
              speakBtn(pronouns[i].split("/")[0]+" "+form,"🔊")+'</div>';
          }).join("")+'</div>';
      }).join("")+'</div>';
  };

  self._dictSearch = function() {
    var inp=document.getElementById("dict-input"); if (!inp) return;
    var q=inp.value.trim().toLowerCase();
    var res=(window.VOCAB_DATA||[]).filter(function(w){ return w.fr.toLowerCase().includes(q)||w.pt.toLowerCase().includes(q); }).slice(0,20);
    var el=document.getElementById("dict-result"); if (!el) return;
    if (!res.length){el.innerHTML="<p>Nenhuma palavra encontrada.</p>";return;}
    el.innerHTML='<table class="dict-table"><thead><tr><th>Francês</th><th>Português</th><th>IPA</th><th>Exemplo</th><th></th></tr></thead><tbody>'+
      res.map(function(w){ return '<tr><td><b>'+w.fr+'</b></td><td>'+w.pt+'</td><td><code>'+w.ipa+'</code></td><td><i>'+w.ex_fr+'</i></td><td>'+speakBtn(w.fr,"🔊")+'</td></tr>'; }).join("")+'</tbody></table>';
  };

  self._compare = function() {
    var inp=document.getElementById("comp-input"); if (!inp) return;
    var q=inp.value.trim().toLowerCase();
    var res=(window.VOCAB_DATA||[]).filter(function(w){ return w.fr.toLowerCase().startsWith(q)||w.pt.toLowerCase().startsWith(q); }).slice(0,10);
    var el=document.getElementById("comp-result"); if (!el) return;
    if (!res.length){el.innerHTML="<p>Nenhum resultado.</p>";return;}
    el.innerHTML=res.map(function(w){ return '<div class="compare-item"><div class="cmp-pair"><span class="cmp-fr">'+w.fr+'</span> ↔ <span>'+w.pt+'</span></div><div class="cmp-ipa">IPA: <code>'+w.ipa+'</code> · <i>'+w.ptbr+'</i></div><div class="cmp-ex">'+w.ex_fr+' / '+w.ex_pt+'</div></div>'; }).join("");
  };

  self._renderFauxAmis = function() {
    var el=document.getElementById("faux-amis-list"); if (!el||!window.IMMERSION_DATA) return;
    el.innerHTML=(window.IMMERSION_DATA.faux_amis||[]).map(function(f){ return '<div class="faux-ami-item"><b>'+f.fr+'</b> — <span class="faux-wrong">NÃO é "'+f.faux+'"</span> — é "'+f.vrai+'"<div class="faux-note">'+f.note+'</div></div>'; }).join("");
  };

  self._generateSentence = function() {
    var vocab=window.VOCAB_DATA||[]; if (vocab.length<5) return;
    function rand(arr){return arr[Math.floor(Math.random()*arr.length)];}
    var subs=vocab.filter(function(w){return["familia","trabalho","estudos","viagens","natureza"].includes(w.cat);});
    var verbs=vocab.filter(function(w){return w.cat==="verbos";});
    var adjs=vocab.filter(function(w){return w.cat==="adjetivos"||w.cat==="emocoes";});
    var templates=[
      function(){var s=rand(subs),v=rand(verbs);if(!s||!v)return null;return{fr:"Je "+v.fr+" avec "+s.fr+".",pt:"Eu "+v.pt+" com "+s.pt+"."};},
      function(){var a=rand(adjs),s=rand(subs);if(!a||!s)return null;return{fr:"Le/La "+s.fr+" est très "+a.fr+".",pt:"O/A "+s.pt+" é muito "+a.pt+"."};},
      function(){var v=rand(verbs),a=rand(adjs);if(!v||!a)return null;return{fr:"C'est "+a.fr+" de "+v.fr+".",pt:"É "+a.pt+" "+v.pt+"."};},
    ];
    var gen=rand(templates)();
    var el=document.getElementById("gen-result"); if (!el) return;
    if (!gen){el.innerHTML="<p>Tente novamente.</p>";return;}
    el.innerHTML='<div class="gen-sentence"><div class="gen-fr">'+gen.fr+' '+speakBtn(gen.fr)+'</div><div class="gen-pt">'+gen.pt+'</div></div>';
  };

  /* ══════════════════════════════════════
     CULTURA
  ══════════════════════════════════════ */
  self.culture = function() {
    show("page-culture");
    var data=window.CULTURE_DATA; if (!data) return;
    var el=document.getElementById("page-culture");
    var html='<div class="page-header"><h1>🎨 Cultura Francesa</h1></div><div class="culture-grid">';
    (data.modules||[]).forEach(function(m) {
      var done=Storage.isCompleted("culture",m.id);
      html+='<div class="culture-card'+(done?' done-card':'')+'" onclick="Pages._openCulture(\''+m.id+'\')"><div class="culture-icon">'+m.icon+'</div><div class="culture-title">'+m.title+'</div>'+(done?'<div class="culture-done">✓</div>':'')+'</div>';
    });
    html+='</div><div id="culture-detail" class="detail-panel hidden"></div>';
    el.innerHTML=html;
  };

  self._openCulture = function(id) {
    var m=((window.CULTURE_DATA&&window.CULTURE_DATA.modules)||[]).find(function(x){return x.id===id;}); if (!m) return;
    var panel=document.getElementById("culture-detail"); if (!panel) return;
    panel.classList.remove("hidden");
    panel.innerHTML='<div class="detail-header"><button class="btn-back" onclick="document.getElementById(\'culture-detail\').classList.add(\'hidden\')">← Voltar</button><h2>'+m.icon+' '+m.title+'</h2></div>'+
      m.content.map(function(c){return'<h3>'+c.heading+'</h3><p>'+c.text+'</p>';}).join("");
    panel.scrollIntoView({behavior:"smooth"});
    Storage.markDone("culture",id); Storage.addXP(15);
    Storage.progressMission("culture",1);
    App.updateXPBar();
  };

  /* ══════════════════════════════════════
     LITERATURA
  ══════════════════════════════════════ */
  self.literature = function() {
    show("page-literature");
    var data=window.LITERATURE_DATA; if (!data) return;
    var el=document.getElementById("page-literature");
    var html='<div class="page-header"><h1>✒️ Literatura Francesa</h1></div><p class="intro-text">Adaptações graduadas originais inspiradas nas grandes obras da literatura francesa.</p><div class="lit-list">';
    (data.authors||[]).forEach(function(a) {
      var done=Storage.isCompleted("literature",a.id);
      html+='<div class="lit-item'+(done?' done':'')+'" onclick="Pages._openLit(\''+a.id+'\')"><div class="lit-author">'+a.name+' <span class="lit-years">('+a.years+')</span></div><div class="lit-work">'+a.work+'</div><div class="lit-level">Nível: '+levelBadge(a.adaptation.level)+'</div>'+(done?'<span class="done-badge">✓ Lido</span>':'')+'</div>';
    });
    html+='</div><div id="lit-detail" class="detail-panel hidden"></div>';
    el.innerHTML=html;
  };

  self._openLit = function(id) {
    var a=((window.LITERATURE_DATA&&window.LITERATURE_DATA.authors)||[]).find(function(x){return x.id===id;}); if (!a) return;
    var panel=document.getElementById("lit-detail"); if (!panel) return;
    panel.classList.remove("hidden");
    var paras=a.adaptation.text_fr.split("\n\n").map(function(p){return'<p class="reading-para">'+p+' '+speakBtn(p,"🔊")+'</p>';}).join("");
    panel.innerHTML='<div class="detail-header"><button class="btn-back" onclick="document.getElementById(\'lit-detail\').classList.add(\'hidden\')">← Voltar</button><h2>'+a.name+'</h2><p><i>'+a.work+'</i> · '+levelBadge(a.adaptation.level)+'</p></div>'+
      '<div class="bio-text"><b>Sobre o autor:</b> '+a.bio_pt+'</div>' +
      '<div class="section-title">📖 Texto em francês</div><div class="reading-text">'+paras+'</div>' +
      '<details class="translation-details"><summary>🇧🇷 Ver tradução</summary><div class="translation-text">'+a.adaptation.text_pt.split("\n\n").map(function(p){return'<p>'+p+'</p>';}).join("")+'</div></details>' +
      '<div class="lit-note">📝 '+a.adaptation.note+'</div>';
    panel.scrollIntoView({behavior:"smooth"});
    Storage.markDone("literature",id); Storage.addXP(20); App.updateXPBar();
  };

  /* ══════════════════════════════════════
     IMERSÃO
  ══════════════════════════════════════ */
  self.immersion = function() {
    show("page-immersion");
    var data=window.IMMERSION_DATA; if (!data) return;
    function card(content){return'<div class="imm-card">'+content+'</div>';}
    document.getElementById("page-immersion").innerHTML=
      '<div class="page-header"><h1>🌊 Modo Imersão</h1></div>' +
      '<div class="tab-bar">' +
        '<button class="tab-btn active" onclick="Pages._immTab(\'idioms\')">Expressões</button>' +
        '<button class="tab-btn" onclick="Pages._immTab(\'faux_amis\')">Falsos Amigos</button>' +
        '<button class="tab-btn" onclick="Pages._immTab(\'proverbes\')">Provérbios</button>' +
        '<button class="tab-btn" onclick="Pages._immTab(\'argot\')">Gírias</button>' +
        '<button class="tab-btn" onclick="Pages._immTab(\'curiosites\')">Curiosidades</button>' +
      '</div>' +
      '<div id="imm-idioms" class="imm-panel">'+(data.idioms||[]).map(function(i){return card('<div class="imm-fr"><b>'+i.fr+'</b> '+speakBtn(i.fr,"🔊")+'</div><div class="imm-pt">🇧🇷 '+i.pt+'</div><div class="imm-ex"><i>'+i.ex_fr+'</i><br><small>'+i.ex_pt+'</small></div>');}).join("")+'</div>' +
      '<div id="imm-faux_amis" class="imm-panel hidden">'+(data.faux_amis||[]).map(function(f){return card('<div class="imm-fr"><b>'+f.fr+'</b> '+speakBtn(f.fr,"🔊")+'</div><div class="imm-faux">❌ NÃO é "'+f.faux+'"</div><div class="imm-vrai">✓ É: "'+f.vrai+'"</div><div class="imm-note">'+f.note+'</div>');}).join("")+'</div>' +
      '<div id="imm-proverbes" class="imm-panel hidden">'+(data.proverbes||[]).map(function(p){return card('<div class="imm-fr"><b>'+p.fr+'</b> '+speakBtn(p.fr,"🔊")+'</div><div class="imm-pt">🇧🇷 '+p.pt+'</div><div class="imm-note">'+p.note+'</div>');}).join("")+'</div>' +
      '<div id="imm-argot" class="imm-panel hidden">'+(data.argot||[]).map(function(a){return card('<div class="imm-fr"><b>'+a.fr+'</b> '+speakBtn(a.fr,"🔊")+'</div><div class="imm-formal">Formal: <i>'+a.formal+'</i></div><div class="imm-pt">🇧🇷 '+a.pt+'</div><div class="imm-ex"><i>'+a.ex_fr+'</i><br><small>'+a.ex_pt+'</small></div>');}).join("")+'</div>' +
      '<div id="imm-curiosites" class="imm-panel hidden">'+(data.curiosites||[]).map(function(c){return card('<div class="imm-title">💡 '+c.title+'</div><div class="imm-text">'+c.text+'</div>');}).join("")+'</div>';
  };

  self._immTab = function(tab) {
    ["idioms","faux_amis","proverbes","argot","curiosites"].forEach(function(t){ var el=document.getElementById("imm-"+t); if (el) el.classList.toggle("hidden",t!==tab); });
    document.querySelectorAll("#page-immersion .tab-btn").forEach(function(b,i){ b.classList.toggle("active",["idioms","faux_amis","proverbes","argot","curiosites"][i]===tab); });
  };

  /* ══════════════════════════════════════
     CONQUISTAS
  ══════════════════════════════════════ */
  self.achievements = function() {
    show("page-achievements");
    var p=Storage.getProfile();
    var unlocked=p.unlockedAchievements||[];
    var all=window.ACHIEVEMENTS||[];
    document.getElementById("page-achievements").innerHTML=
      '<div class="page-header"><h1>🏆 Conquistas</h1></div>' +
      '<p class="intro-text">'+unlocked.length+' / '+all.length+' desbloqueadas</p>' +
      '<div class="achievements-grid">'+
        all.map(function(a){
          var done=unlocked.includes(a.id);
          return'<div class="achievement-card '+(done?'unlocked':'locked')+'">' +
            '<div class="ach-icon">'+(done?a.icon:'🔒')+'</div>' +
            '<div class="ach-title">'+a.title+'</div>' +
            '<div class="ach-desc">'+a.desc+'</div>' +
            (done?'<div class="ach-xp">+'+a.xp+' XP</div>':'')+'</div>';
        }).join("")+
      '</div>';
  };


  /* Stubs iniciais — sobrescritos quando a página é aberta pela primeira vez */
  self._vocabSort   = function(mode,btn){ if(typeof sortMode!=='undefined') return; };
  self._phraseFilter= function(f,btn){ };
  self._phraseSearch= function(){ };
  self._vocabSearch = function(){ };

  return self;
})();
