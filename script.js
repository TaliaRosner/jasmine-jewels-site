const questions = [
  {
    text: "It’s Friday night. What’s the move?",
    choices: [
      { text: "Cozy night in with snacks and a face mask", cut: "Round" },
      { text: "Dramatic dinner entrance, full glam", cut: "Princess" },
      {
        text: "Dinner at the trendiest spot you bribed the host for",
        cut: "Emerald",
      },
      {
        text: "You forgot it was Friday. Still in pajamas from Tuesday",
        cut: "Cushion",
      },
    ],
    jasline:
      "I respect all lifestyles. But if your idea of a wild Friday is alphabetizing candles… we need to talk.",
  },
  {
    text: "Pick your toxic trait.",
    choices: [
      { text: "Overcommitting then ghosting", cut: "Pear" },
      {
        text: "Needing to be right (even whisper-fighting in public)",
        cut: "Princess",
      },
      {
        text: "Pretending you’re chill but rage-texting later",
        cut: "Emerald",
      },
      { text: "Crying because someone said ‘K’", cut: "Cushion" },
    ],
    jasline:
      "No judgment — I once broke up with someone over guac preferences.",
  },
  {
    text: "What’s your dream job?",
    choices: [
      { text: "Celebrity therapist leaking to gossip mags", cut: "Marquise" },
      {
        text: "Luxury travel influencer with zero responsibilities",
        cut: "Oval",
      },
      { text: "Billionaire CEO with revenge outfits", cut: "Emerald" },
      { text: "Etsy store + emotional support teacup pig", cut: "Round" },
    ],
    jasline: "If your dream job involves no actual work — same.",
  },
  {
    text: "Your group chat is planning a trip. What’s your role?",
    choices: [
      {
        text: "Spreadsheet master & passive-aggressive emoji user",
        cut: "Round",
      },
      { text: "The 'just tell me when and where' ghost", cut: "Cushion" },
      { text: "Suggests expensive things then bails", cut: "Princess" },
      {
        text: "Plans everything then cries when no one thanks them",
        cut: "Pear",
      },
    ],
    jasline: "If you didn’t fight about the Airbnb… did it even happen?",
  },
  {
    text: "How do you handle confrontation?",
    choices: [
      { text: "Kill 'em with kindness, then block", cut: "Pear" },
      { text: "Direct and terrifyingly calm", cut: "Emerald" },
      { text: "Screams internally while smiling", cut: "Cushion" },
      { text: "Cries — but beautifully", cut: "Oval" },
    ],
    jasline: "Nothing says 'I'm fine' like a dramatic exit in slow motion.",
  },
];

const results = {
  Cushion: {
    description:
      "Soft, classic, and lowkey chaotic under pressure. You're basically me when my iced coffee melts. Loveable. Slightly unstable.",
    image: "assets/images/cushion-cut.png",
  },
  Princess: {
    description:
      "Dramatic in the best way. The human version of a confetti cannon in a library. Adore you. Fear you.",
    image: "assets/images/princess-cut.png",
  },
  Emerald: {
    description:
      "Elegant, calculated, emotionally elusive. You ghost with grace and never return shopping carts. Respect.",
    image: "assets/images/emerald-cut.png",
  },
  Round: {
    description:
      "Reliable, sweet, secretly the puppet master. You cry at proposal videos and control the group chat. Icon.",
    image: "assets/images/round-cut.png",
  },
  Pear: {
    description:
      "Empathic and closure-obsessed. You say you're fine but you’re spiral-texting your ex’s cousin. Classic.",
    image: "assets/images/pear-cut.png",
  },
  Oval: {
    description:
      "Trendy, sweet, and deeply suspicious of compliments. You say 'I'm chill' and then flip a table.",
    image: "assets/images/oval-cut.png",
  },
  Marquise: {
    description:
      "Fabulous, intimidating, and *too* aware of your angles. You’re a glittery red flag — and I love it.",
    image: "assets/images/marquise-cut.png",
  },
};

const quizEl = document.querySelector(".quiz-content");
let current = 0;
const tally = {};
let userName = "";

function askForName() {
  quizEl.innerHTML = `
    <div class="name-entry">
      <form onsubmit="handleNameSubmit(event)">
        <h3>Before we get shady... what's your name?</h3>
        <input type="text" id="nameInput" placeholder="Type your name here..." required />
        <br>
        <button type="submit">Start Quiz</button>
      </form>
    </div>
  `;
}

function handleNameSubmit(event) {
  event.preventDefault();
  const input = document.getElementById("nameInput");
  const name = input.value.trim();
  if (!name) {
    alert("Come on now... Jas needs *something* to work with.");
    return;
  }
  userName = name;
  renderQuestion();
}

function renderQuestion() {
  const q = questions[current];
  let html = `<div class='question'><h3>${q.text}</h3><div class='choices'>`;
  q.choices.forEach((choice) => {
    html += `<button onclick="answer('${choice.cut}')">${choice.text}</button>`;
  });
  html += `</div></div>`;
  quizEl.innerHTML = html;
}

function showJasline(jasline) {
  const html = `
    <div class="jasline-popup">
      <p>${jasline}</p>
      <button id="continueBtn" onclick="continueQuiz()">Continue</button>
    </div>
  `;
  quizEl.innerHTML = html;

  // Add an event listener to listen for the 'Enter' key
  document.addEventListener("keydown", handleEnterKey);
}

function handleEnterKey(event) {
  if (event.key === "Enter") {
    // Trigger the "Continue" button click event if Enter is pressed
    const continueBtn = document.getElementById("continueBtn");
    if (continueBtn) {
      continueBtn.click();
    }
  }
}

function continueQuiz() {
  current++;
  if (current < questions.length) {
    renderQuestion();
  } else {
    showLoadingPhase();
  }
}

function answer(cut) {
  tally[cut] = (tally[cut] || 0) + 1;
  const jasline = questions[current].jasline;
  quizEl.innerHTML = "";
  showJasline(jasline);
}

function showResult() {
  const top = Object.keys(tally).reduce((a, b) =>
    tally[a] > tally[b] ? a : b
  );
  const article = /^[aeiou]/i.test(top) ? "an" : "a";

  const result = results[top];

  quizEl.innerHTML = `
    <div id="result">
      <img src="${result.image}" alt="${top} Cut" class="result-image" />
      <h3>${userName}, you’re ${article} ${top} Cut!</h3>
      <p>${result.description}</p>
      <button class="play-again" onclick="restartQuiz()">Play Again</button>
    </div>
  `;
}

function showLoadingPhase() {
  const sassLines = [
    "Hold tight, drama queen... Jas is calculating your result while yelling at her DoorDash driver 🍟",
    "Just a sec... Jas is reapplying lip gloss and judgment 💄",
    "Be patient. Even shady brilliance takes a moment ✨",
    "Loading your chaos score... this could take a snack break 🧃",
    "Jas is buffering... emotionally and literally 🙃",
    "Don’t rush her. She’s trying to remember your name 🧠",
  ];

  const line = sassLines[Math.floor(Math.random() * sassLines.length)];

  const html = `
    <div class="jasline-popup">
      <p>${line}</p>
      <div class="loading-spinner"></div>
    </div>
  `;
  quizEl.innerHTML = html;

  setTimeout(showResult, 4500);
}

function restartQuiz() {
  current = 0;
  for (let key in tally) {
    tally[key] = 0;
  }
  askForName();
}

askForName();
