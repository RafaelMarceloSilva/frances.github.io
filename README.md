# 🇫🇷 Français Complet — A0 até C2

Aplicativo de aprendizado de francês completo, funciona **100% offline** — basta abrir o `index.html` no navegador.

---

## 🚀 Como usar

1. **Extraia** o arquivo ZIP em qualquer pasta.
2. **Abra o arquivo `index.html`** com Google Chrome, Firefox ou Edge.
3. Nenhuma instalação, servidor ou conexão com internet é necessária.

> ⚠️ **Recomendado: Google Chrome ou Microsoft Edge.**  
> O recurso de síntese de voz (TTS) e reconhecimento de fala (STT) funciona melhor nesses navegadores.  
> Para o STT (prática de pronúncia), é preciso permitir o acesso ao microfone quando solicitado.

---

## 📁 Estrutura do projeto

```
frances-completo/
│
├── index.html              ← Ponto de entrada — abra este arquivo
│
├── css/
│   └── styles.css          ← Todo o design (tema escuro/claro, responsivo)
│
├── data/                   ← Bancos de dados de conteúdo (arquivos .js)
│   ├── vocabulary.js       ← 400+ palavras com IPA, tradução e exemplos
│   ├── grammar.js          ← 27 lições A0→C2 com exercícios
│   ├── dialogues.js        ← 20 diálogos situacionais com áudio e perguntas
│   ├── readings.js         ← 6 textos graduados A1→C2 com perguntas
│   ├── phonetics.js        ← 9 seções de fonética com prática de pronúncia
│   ├── culture.js          ← 8 módulos de cultura francesa
│   ├── literature.js       ← 5 adaptações literárias (Hugo, Dumas, Verne, Camus, Proust)
│   ├── verbs.js            ← 20 verbos irregulares completos + motor de conjugação regular
│   ├── achievements.js     ← Sistema de gamificação: XP, níveis, conquistas, missões
│   ├── tests.js            ← Testes de nível CEFR A1→C1
│   └── immersion.js        ← Expressões, falsos cognatos, provérbios, gírias, curiosidades
│
└── js/                     ← Motor da aplicação
    ├── storage.js          ← localStorage + algoritmo SM-2 de repetição espaçada
    ├── speech.js           ← TTS (síntese de voz) e STT (reconhecimento de fala)
    ├── pages.js            ← Todos os módulos de UI e interatividade
    └── app.js              ← Router, inicialização, gamificação, tema
```

---

## 🎓 Módulos do app

| Módulo | Conteúdo |
|---|---|
| **Dashboard** | XP, nível, streak, calendário de estudos, missão do dia, atalhos |
| **Fonética** | Alfabeto, sons ausentes no PT, nasais, liaison, elisão, fala informal + prática com microfone |
| **Vocabulário** | 400+ palavras com IPA, aprox. PT-BR, exemplos e áudio — filtráveis por categoria e nível |
| **Gramática** | 27 lições A0→C2 com explicação, exemplos em áudio e exercícios |
| **Conversação** | 20 diálogos (restaurante, hotel, hospital, entrevista, congresso científico…) com áudio e compreensão |
| **Leitura** | 6 textos graduados A1→C2, tradução toggle, áudio por parágrafo, perguntas |
| **Flashcards** | Revisão espaçada SM-2 (Esqueci / Difícil / Bom / Fácil), só mostra o que é hora de revisar |
| **Testes CEFR** | Testes mistos A1→C1 com 12 questões cada — aprovação gera "carimbo de passaporte" |
| **Laboratório** | Conjugador (qualquer verbo) · Dicionário FR↔PT · Comparador · Gerador de frases |
| **Cultura** | 8 módulos: história, Revolução Francesa, gastronomia, cinema, arte, música, filosofia, Francofonia |
| **Literatura** | Adaptações graduadas de Hugo, Dumas, Verne, Camus e Proust com tradução e áudio |
| **Imersão** | Expressões idiomáticas · Falsos cognatos · Provérbios · Gírias (argot) · Curiosidades |
| **Conquistas** | 20 medalhas desbloqueáveis, missões diárias, barra de XP, 10 níveis |

---

## 🗣️ Sobre áudio e reconhecimento de fala

O app usa a **Web Speech API** do navegador — gratuita, sem necessidade de chave de API.

- **Síntese de voz (TTS)**: botão 🔊 em todas as palavras, exemplos e diálogos. Usa a voz francesa do sistema operacional/navegador se disponível; caso contrário, o botão ainda aparece mas pode soar em inglês (dependendo das vozes instaladas).
- **Reconhecimento de fala (STT)**: disponível na seção Fonética para praticar pronúncia. **Funciona apenas em Chrome/Edge** com microfone habilitado.

Para instalar vozes francesas no Windows: `Configurações → Hora e Idioma → Fala → Adicionar vozes → Francês`.

---

## 💾 Como os dados são salvos

Todo o progresso fica no **localStorage** do navegador, na mesma máquina/navegador onde você estuda. Isso inclui:
- XP, nível, streak
- Palavras aprendidas
- Progresso de lições e diálogos
- Flashcards com datas de próxima revisão (SM-2)
- Conquistas desbloqueadas
- Missão do dia

> Se você limpar os dados do navegador ("Limpar histórico e cookies"), o progresso será perdido.

---

## ➕ Como adicionar conteúdo

Os arquivos `data/*.js` seguem estrutura simples. Para adicionar vocabulário, abra `data/vocabulary.js` e inclua entradas no array seguindo o padrão:

```js
{
  id: "v401",
  fr: "l'innovation",
  pt: "a inovação",
  ipa: "/li.nɔ.va.sjɔ̃/",
  ptbr: "li-no-va-SION",
  cat: "trabalho",
  level: "B1",
  ex_fr: "L'innovation est au cœur de notre stratégie.",
  ex_pt: "A inovação está no centro da nossa estratégia."
}
```

Categorias disponíveis: `saudacoes · numeros · cores · tempo · familia · comida · casa · corpo · roupas · trabalho · estudos · ciencia · tecnologia · engenharia · medicina · viagens · natureza · politica · filosofia · psicologia · economia · emocoes · verbos · adjetivos`

---

## 🛠️ Decisão técnica: por que `.js` em vez de `.json`?

Os bancos de dados são arquivos `.js` (que atribuem `window.NOME_DO_DADO = [...]`) em vez de `.json` convencionais. Isso foi intencional: navegadores **bloqueiam `fetch()` de arquivos locais** via protocolo `file://` por questões de segurança (CORS), o que quebraria o app ao abri-lo com duplo-clique. Com arquivos `.js`, basta um `<script src="...">` e tudo funciona sem servidor.

---

## 📜 Licença e conteúdo

- Todo o **código** (HTML/CSS/JS) é original, livre para uso pessoal e educacional.
- Os **textos de adaptação literária** (`data/literature.js`) são textos originais inspirados nos temas e estilos dos autores — **não** são transcrições das obras originais. As obras de Hugo, Dumas, Verne e Camus estão em domínio público; o texto de Proust também. Mesmo assim, optou-se por adaptações originais por clareza pedagógica.
- O vocabulário, os diálogos, os textos de leitura e os exercícios de gramática são todos conteúdo original criado para este app.
