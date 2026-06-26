/* ==========================================================================
   FRANÇAIS COMPLET — router.js + app.js
   Roteador hash simples e inicialização geral do app.
   ========================================================================== */

/* ── Router ── */
var Router = (() => {
  const routes = {};
  let current = null;

  function on(hash, fn) { routes[hash] = fn; }

  function navigate(hash) {
    window.location.hash = hash;
  }

  function resolve() {
    const hash = window.location.hash.slice(1) || "dashboard";
    const [page, ...params] = hash.split("/");
    // Oculta todas as seções
    document.querySelectorAll(".page").forEach(el => el.classList.add("hidden"));
    // Atualiza nav ativo
    document.querySelectorAll(".nav-item").forEach(el => {
      el.classList.toggle("active", el.dataset.page === page);
    });
    current = page;
    if (routes[page]) routes[page](params);
    else if (routes["404"]) routes["404"]();
    // Scroll topo
    window.scrollTo(0, 0);
  }

  function init() {
    window.addEventListener("hashchange", resolve);
    resolve();
  }

  function getCurrent() { return current; }

  return { on, navigate, init, getCurrent };
})();

/* ── App Principal ── */
var App = (() => {
  function showToast(msg, type = "info", duration = 3000) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.className = "toast show " + type;
    clearTimeout(App._toastTimer);
    App._toastTimer = setTimeout(() => toast.classList.remove("show"), duration);
  }

  function showAchievement(id) {
    if (!window.ACHIEVEMENTS) return;
    const a = window.ACHIEVEMENTS.find(x => x.id === id);
    if (!a) return;
    const el = document.getElementById("achievement-popup");
    if (!el) return;
    el.querySelector(".ach-icon").textContent = a.icon;
    el.querySelector(".ach-title").textContent = a.title;
    el.querySelector(".ach-desc").textContent = a.desc;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 4000);
  }

  function checkAchievements() {
    const p = Storage.getProfile();
    const learned = Object.keys(Storage.getLearnedWords()).length;
    const checks = [
      ["vocab100",  learned >= 100],
      ["vocab300",  learned >= 300],
      ["streak3",   p.streak >= 3],
      ["streak7",   p.streak >= 7],
      ["streak30",  p.streak >= 30],
    ];
    checks.forEach(([id, cond]) => {
      if (cond) {
        const isNew = Storage.unlockAchievement(id);
        if (isNew) showAchievement(id);
      }
    });
  }

  function updateXPBar() {
    const p = Storage.getProfile();
    const el = document.getElementById("xp-bar-fill");
    const lvlEl = document.getElementById("header-level");
    const xpEl = document.getElementById("header-xp");
    if (!el || !window.XP_LEVELS) return;
    const cur = window.XP_LEVELS.find(l => l.level === p.level);
    const next = window.XP_LEVELS.find(l => l.level === p.level + 1);
    const base = cur ? cur.xpRequired : 0;
    const cap = next ? next.xpRequired : base + 100;
    const pct = Math.min(100, ((p.xp - base) / (cap - base)) * 100);
    el.style.width = pct + "%";
    if (lvlEl) lvlEl.textContent = "Nv. " + p.level;
    if (xpEl) xpEl.textContent = p.xp + " XP";
  }

  function init() {
    Speech.init();
    Storage.updateStreak();
    checkAchievements();
    updateXPBar();

    // Tema claro/escuro
    const savedTheme = localStorage.getItem("fc_theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    const themeBtn = document.getElementById("btn-theme");
    if (themeBtn) {
      themeBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
      themeBtn.addEventListener("click", () => {
        const t = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", t);
        localStorage.setItem("fc_theme", t);
        themeBtn.textContent = t === "dark" ? "☀️" : "🌙";
      });
    }

    // Tamanho de fonte
    const fsBtns = document.querySelectorAll("[data-font]");
    fsBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const sizes = { small: "14px", medium: "16px", large: "19px" };
        document.documentElement.style.fontSize = sizes[btn.dataset.font] || "16px";
        localStorage.setItem("fc_font", btn.dataset.font);
        fsBtns.forEach(b => b.classList.toggle("active", b === btn));
      });
    });
    const savedFont = localStorage.getItem("fc_font");
    if (savedFont) {
      const sizes = { small: "14px", medium: "16px", large: "19px" };
      document.documentElement.style.fontSize = sizes[savedFont] || "16px";
    }

    // Nav mobile
    const hamburger = document.getElementById("hamburger");
    const sidebar = document.getElementById("sidebar");
    if (hamburger && sidebar) {
      hamburger.addEventListener("click", () => sidebar.classList.toggle("open"));
      document.addEventListener("click", e => {
        if (!sidebar.contains(e.target) && e.target !== hamburger) {
          sidebar.classList.remove("open");
        }
      });
    }

    // Nav links
    document.querySelectorAll(".nav-item").forEach(el => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        Router.navigate(el.dataset.page);
        if (sidebar) sidebar.classList.remove("open");
      });
    });

    // Roteador
    Router.on("dashboard",   () => { Pages.dashboard(); });
    Router.on("phonetics",   () => { Pages.phonetics(); });
    Router.on("vocabulary",  () => { Pages.vocabulary(); });
    Router.on("grammar",     () => { Pages.grammar(); });
    Router.on("conversation",() => { Pages.conversation(); });
    Router.on("reading",     () => { Pages.reading(); });
    Router.on("flashcards",  () => { Pages.flashcards(); });
    Router.on("tests",       () => { Pages.tests(); });
    Router.on("lab",         () => { Pages.lab(); });
    Router.on("culture",     () => { Pages.culture(); });
    Router.on("literature",  () => { Pages.literature(); });
    Router.on("immersion",   () => { Pages.immersion(); });
    Router.on("achievements",() => { Pages.achievements(); });
    Router.on("404",         () => { Router.navigate("dashboard"); });

    Router.init();
  }

  return { init, showToast, showAchievement, checkAchievements, updateXPBar };
})();
