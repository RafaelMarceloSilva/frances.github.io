/* ==========================================================================
   FRANÇAIS COMPLET — speech.js v2
   TTS (síntese de voz) + STT (reconhecimento) + speakSlow
   ========================================================================== */
var Speech = (function () {
  var self = {};
  var frVoice = null;
  var supported = false;
  var recognizing = false;
  var recognition = null;

  self.init = function() {
    if (!window.speechSynthesis) return;
    supported = true;
    function findVoice() {
      var voices = window.speechSynthesis.getVoices();
      frVoice = voices.find(function(v){ return v.lang.startsWith("fr"); }) || null;
    }
    findVoice();
    window.speechSynthesis.onvoiceschanged = findVoice;
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SR) {
      recognition = new SR();
      recognition.lang = "fr-FR";
      recognition.continuous = false;
      recognition.interimResults = false;
    }
  };

  function _speak(text, rate, onEnd) {
    if (!supported || !window.speechSynthesis) { if (onEnd) onEnd(false); return; }
    window.speechSynthesis.cancel();
    var utt = new SpeechSynthesisUtterance(text);
    utt.lang = "fr-FR";
    utt.rate = rate || 0.85;
    utt.pitch = 1;
    if (frVoice) utt.voice = frVoice;
    if (onEnd) utt.onend = function(){ onEnd(true); };
    window.speechSynthesis.speak(utt);
  }

  self.speak = function(text, onEnd) { _speak(text, 0.85, onEnd); };
  self.speakSlow = function(text, onEnd) { _speak(text, 0.55, onEnd); };

  self.stop = function() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (recognizing && recognition) recognition.stop();
    recognizing = false;
  };

  self.isSupported = function() { return supported; };
  self.hasFrenchVoice = function() { return !!frVoice; };

  self.startListening = function(onResult, onError) {
    if (!recognition) { if (onError) onError("STT não suportado neste navegador."); return; }
    if (recognizing) recognition.stop();
    recognizing = true;
    recognition.onresult = function(e) {
      recognizing = false;
      var transcript = e.results[0][0].transcript.toLowerCase().trim();
      if (onResult) onResult(transcript, e.results[0][0].confidence);
    };
    recognition.onerror = function(e) { recognizing = false; if (onError) onError(e.error); };
    recognition.onend = function() { recognizing = false; };
    try { recognition.start(); } catch(e) { recognizing = false; if (onError) onError(e.message); }
  };

  self.scorePronunciation = function(spoken, target) {
    var s = spoken.toLowerCase().replace(/[.,!?;:]/g,"").trim();
    var t = target.toLowerCase().replace(/[.,!?;:]/g,"").trim();
    if (s === t) return { score:100, label:"Excellent ! 🎯", color:"var(--vert-valide)" };
    var longer = s.length > t.length ? s : t;
    var shorter = s.length <= t.length ? s : t;
    var matches = 0;
    var used = new Array(longer.length).fill(false);
    for (var i = 0; i < shorter.length; i++) {
      for (var j = 0; j < longer.length; j++) {
        if (!used[j] && shorter[i] === longer[j]) { used[j] = true; matches++; break; }
      }
    }
    var score = Math.round((matches / longer.length) * 100);
    if (score >= 85) return { score:score, label:"Très bien ! 👍", color:"var(--vert-valide)" };
    if (score >= 65) return { score:score, label:"Bom — continue praticando! 💪", color:"var(--or)" };
    return { score:score, label:"Precisa melhorar — tente novamente. 🔄", color:"var(--rouge)" };
  };

  return self;
})();
