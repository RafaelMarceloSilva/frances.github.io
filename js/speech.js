/* ==========================================================================
   FRANÇAIS COMPLET — speech.js
   TTS (Text-to-Speech) via Web Speech API — voz francesa com fallback para IPA.
   STT (Speech-to-Text) para prática de pronúncia com pontuação.
   ========================================================================== */
var Speech = (() => {
  let frVoice = null;
  let supported = false;
  let recognizing = false;
  let recognition = null;

  /* ── Inicialização ── */
  function init() {
    if (!window.speechSynthesis) return;
    supported = true;

    function findVoice() {
      const voices = window.speechSynthesis.getVoices();
      frVoice = voices.find(v => v.lang.startsWith("fr")) || null;
    }
    findVoice();
    window.speechSynthesis.onvoiceschanged = findVoice;

    // STT
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.lang = "fr-FR";
      recognition.continuous = false;
      recognition.interimResults = false;
    }
  }

  /* ── TTS ── */
  function speak(text, onEnd) {
    if (!supported || !window.speechSynthesis) { onEnd && onEnd(false); return; }
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = "fr-FR";
    utt.rate = 0.85;
    utt.pitch = 1;
    if (frVoice) utt.voice = frVoice;
    if (onEnd) utt.onend = () => onEnd(true);
    window.speechSynthesis.speak(utt);
  }

  function stop() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (recognizing && recognition) recognition.stop();
    recognizing = false;
  }

  function isSupported() { return supported; }
  function hasFrenchVoice() { return !!frVoice; }

  /* ── STT / Prática de pronúncia ── */
  function startListening(onResult, onError) {
    if (!recognition) { onError && onError("STT não suportado neste navegador."); return; }
    if (recognizing) recognition.stop();
    recognizing = true;

    recognition.onresult = (e) => {
      recognizing = false;
      const transcript = e.results[0][0].transcript.toLowerCase().trim();
      const confidence = e.results[0][0].confidence;
      onResult && onResult(transcript, confidence);
    };

    recognition.onerror = (e) => {
      recognizing = false;
      onError && onError(e.error);
    };

    recognition.onend = () => { recognizing = false; };

    try { recognition.start(); } catch(e) { recognizing = false; onError && onError(e.message); }
  }

  /* ── Pontuação de pronúncia ── */
  function scorePronunciation(spoken, target) {
    const s = spoken.toLowerCase().replace(/[.,!?;:]/g, "").trim();
    const t = target.toLowerCase().replace(/[.,!?;:]/g, "").trim();

    if (s === t) return { score: 100, label: "Excellent !", color: "var(--vert-valide)" };

    // Similaridade simples de caracteres (normalizado)
    const longer = s.length > t.length ? s : t;
    const shorter = s.length <= t.length ? s : t;
    let matches = 0;
    const used = new Array(longer.length).fill(false);
    for (let i = 0; i < shorter.length; i++) {
      for (let j = 0; j < longer.length; j++) {
        if (!used[j] && shorter[i] === longer[j]) { used[j] = true; matches++; break; }
      }
    }
    const score = Math.round((matches / longer.length) * 100);

    if (score >= 85) return { score, label: "Très bien !", color: "var(--vert-valide)" };
    if (score >= 65) return { score, label: "Bom — continue praticando!", color: "var(--or)" };
    return { score, label: "Precisa melhorar — tente novamente.", color: "var(--rouge)" };
  }

  return { init, speak, stop, isSupported, hasFrenchVoice, startListening, scorePronunciation };
})();
