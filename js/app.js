/* ==========================================================================
   FRANÇAIS COMPLET — app.js v2
   Router hash, App init, gamificação, sidebar responsiva
   ========================================================================== */

/* ── Router ── */
var Router = (function () {
  var self = {};
  var routes = {};
  var current = null;

  self.on = function(hash, fn) { routes[hash] = fn; };
  self.navigate = function(hash) { window.location.hash = hash; };

  self.resolve = function() {
    var raw = window.location.hash.slice(1) || "dashboard";
    var parts = raw.split("/");
    var page = parts[0];
    document.querySelectorAll(".page").forEach(function(el){ el.classList.add("hidden"); });
    document.querySelectorAll(".nav-item").forEach(function(el){
      el.classList.toggle("active", el.dataset.page === page);
    });
    current = page;
    if (routes[page]) routes[page](parts.slice(1));
    else if (routes["404"]) routes["404"]();
    window.scrollTo(0, 0);
    // Fecha sidebar mobile ao navegar
    var sb = document.getElementById("sidebar");
    if (sb) sb.classList.remove("open");
  };

  self.init = function() {
    window.addEventListener("hashchange", self.resolve);
    self.resolve();
  };
  self.getCurrent = function() { return current; };
  return self;
})();

/* ── App ── */
var App = (function () {
  var self = {};
  self._toastTimer = null;

  self.showToast = function(msg, type, duration) {
    type = type || "info"; duration = duration || 3000;
    var toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.className = "toast show " + type;
    clearTimeout(self._toastTimer);
    self._toastTimer = setTimeout(function(){ toast.classList.remove("show"); }, duration);
  };

  self.showAchievement = function(id) {
    if (!window.ACHIEVEMENTS) return;
    var a = window.ACHIEVEMENTS.find(function(x){ return x.id === id; });
    if (!a) return;
    var el = document.getElementById("achievement-popup");
    if (!el) return;
    el.querySelector(".ach-icon").textContent = a.icon;
    el.querySelector(".ach-title").textContent = a.title;
    el.querySelector(".ach-desc").textContent = a.desc;
    el.classList.add("show");
    setTimeout(function(){ el.classList.remove("show"); }, 4500);
  };

  self.checkAchievements = function() {
    var p = Storage.getProfile();
    var learned = Object.keys(Storage.getLearnedWords()).length;
    var checks = [
      ["first_lesson",   true],
      ["vocab100",       learned >= 100],
      ["vocab300",       learned >= 300],
      ["streak3",        (p.streak||0) >= 3],
      ["streak7",        (p.streak||0) >= 7],
      ["streak30",       (p.streak||0) >= 30],
      ["dialogue5",      Object.keys(Storage.getModuleProgress("dialogue")).length >= 5],
      ["dialogue20",     Object.keys(Storage.getModuleProgress("dialogue")).length >= 20],
      ["reading_all",    Object.keys(Storage.getModuleProgress("reading")).length >= 6],
    ];
    checks.forEach(function(pair) {
      if (pair[1]) {
        var isNew = Storage.unlockAchievement(pair[0]);
        if (isNew) self.showAchievement(pair[0]);
      }
    });
  };

  self.updateXPBar = function() {
    var p = Storage.getProfile();
    var fillEl = document.getElementById("xp-bar-fill");
    var lvlEl = document.getElementById("header-level");
    var xpEl = document.getElementById("header-xp");
    if (!window.XP_LEVELS) return;
    var cur  = window.XP_LEVELS.find(function(l){ return l.level === p.level; }) || { xpRequired:0 };
    var next = window.XP_LEVELS.find(function(l){ return l.level === p.level + 1; });
    var base = cur.xpRequired;
    var cap  = next ? next.xpRequired : base + 100;
    var pct  = Math.min(100, Math.max(0, ((p.xp - base) / (cap - base)) * 100));
    if (fillEl) fillEl.style.width = pct + "%";
    if (lvlEl) lvlEl.textContent = "Nv. " + p.level;
    if (xpEl) xpEl.textContent = (p.xp || 0) + " XP";
    // Atualiza badge de missões no nav
    self.updateMissionBadge();
  };

  self.updateMissionBadge = function() {
    var badge = document.getElementById("mission-badge");
    if (!badge) return;
    var summary = Storage.getMissionSummary();
    var remaining = summary.total - summary.done;
    if (remaining > 0) {
      badge.textContent = remaining;
      badge.style.display = "inline-flex";
    } else {
      badge.style.display = "none";
    }
  };

  self.init = function() {
    Speech.init();
    Storage.updateStreak();
    self.updateXPBar();

    // ── Tema ──
    var savedTheme = localStorage.getItem("fc_theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    var themeBtn = document.getElementById("btn-theme");
    if (themeBtn) {
      themeBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
      themeBtn.addEventListener("click", function() {
        var t = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", t);
        localStorage.setItem("fc_theme", t);
        themeBtn.textContent = t === "dark" ? "☀️" : "🌙";
      });
    }

    // ── Tamanho de fonte ──
    var savedFont = localStorage.getItem("fc_font") || "medium";
    var fontSizes = { small:"14px", medium:"16px", large:"19px" };
    document.documentElement.style.fontSize = fontSizes[savedFont] || "16px";
    document.querySelectorAll("[data-font]").forEach(function(btn) {
      btn.classList.toggle("active", btn.dataset.font === savedFont);
      btn.addEventListener("click", function() {
        var sz = btn.dataset.font;
        document.documentElement.style.fontSize = fontSizes[sz] || "16px";
        localStorage.setItem("fc_font", sz);
        document.querySelectorAll("[data-font]").forEach(function(b){ b.classList.toggle("active", b === btn); });
      });
    });

    // ── Sidebar ──
    var hamburger = document.getElementById("hamburger");
    var sidebar = document.getElementById("sidebar");
    var overlay = document.getElementById("sidebar-overlay");

    function openSidebar() {
      if (sidebar) sidebar.classList.add("open");
      if (overlay) overlay.classList.add("visible");
      document.body.classList.add("sidebar-open");
    }
    function closeSidebar() {
      if (sidebar) sidebar.classList.remove("open");
      if (overlay) overlay.classList.remove("visible");
      document.body.classList.remove("sidebar-open");
    }

    if (hamburger) hamburger.addEventListener("click", function(e) {
      e.stopPropagation();
      sidebar && sidebar.classList.contains("open") ? closeSidebar() : openSidebar();
    });
    if (overlay) overlay.addEventListener("click", closeSidebar);

    // ── Nav links ──
    document.querySelectorAll(".nav-item").forEach(function(el) {
      el.addEventListener("click", function() { Router.navigate(el.dataset.page); closeSidebar(); });
      el.addEventListener("keydown", function(e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); Router.navigate(el.dataset.page); closeSidebar(); }
      });
    });

    // ── Scroll to top ──
    window.addEventListener("scroll", function() {
      var btn = document.getElementById("btn-top");
      if (btn) btn.classList.toggle("visible", window.scrollY > 300);
    });

    // ── Rotas ──
    Router.on("dashboard",    function(){ Pages.dashboard(); });
    Router.on("phonetics",    function(){ Pages.phonetics(); });
    Router.on("vocabulary",   function(){ Pages.vocabulary(); });
    Router.on("phrases",      function(){ Pages.phrases(); });
    Router.on("grammar",      function(){ Pages.grammar(); });
    Router.on("conversation", function(){ Pages.conversation(); });
    Router.on("reading",      function(){ Pages.reading(); });
    Router.on("flashcards",   function(){ Pages.flashcards(); });
    Router.on("tests",        function(){ Pages.tests(); });
    Router.on("lab",          function(){ Pages.lab(); });
    Router.on("culture",      function(){ Pages.culture(); });
    Router.on("literature",   function(){ Pages.literature(); });
    Router.on("immersion",    function(){ Pages.immersion(); });
    Router.on("achievements", function(){ Pages.achievements(); });
    Router.on("missions",     function(){ Pages.missions(); });
    Router.on("profile",      function(){ Pages.profile(); });
    Router.on("404",          function(){ Router.navigate("dashboard"); });

    Router.init();

    // ── Conquista de primeiro acesso (com delay) ──
    setTimeout(function() {
      Storage.unlockAchievement("first_lesson");
      self.checkAchievements();
    }, 1800);
  };

  return self;
})();
