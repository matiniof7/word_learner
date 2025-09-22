const sessionLabel = document.getElementById('session-label');
const sessionInput = document.getElementById('session-number');
const prevSessionBtn = document.getElementById('prev-session');
const nextSessionBtn = document.getElementById('next-session');

const wordElement = document.getElementById('word');
const translationElement = document.getElementById('translation');
const prevWordBtn = document.getElementById('prev-word');
const nextWordBtn = document.getElementById('next-word');

let currentSession = parseInt(sessionInput.value || 1, 10);
let currentWordIndex = 0;

// مثال: فقط داده‌های جلسه فعلی موجود است
const exampleWords = JSON.parse('{{ words_json|escapejs }}');

// دسترسی به کلمات جلسه فعلی
function getCurrentWords() {
    return exampleWords; // چون JSON فقط جلسه فعلی است
}

// نمایش کلمه فعلی
function showWord() {
    const words = getCurrentWords();
    if (words.length === 0) {
        wordElement.textContent = "---";
        translationElement.textContent = "No words in this session.";
        return;
    }
    const wordObj = words[currentWordIndex];
    wordElement.textContent = wordObj.w;
    translationElement.textContent = wordObj.t;
}

// بارگذاری جلسه
function loadSession(sessionNum) {
    currentSession = sessionNum;
    currentWordIndex = 0;
    sessionLabel.textContent = `Current Session: ${currentSession}`;
    sessionInput.value = currentSession;
    showWord();
}

// کنترل input (فقط اعداد 1 تا 60)
sessionInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
    if (parseInt(this.value) > 60) this.value = 60;
});

// دکمه‌های جلسه بعد و قبل
nextSessionBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loadSession(currentSession + 1 > 60 ? 1 : currentSession + 1);
});

prevSessionBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loadSession(currentSession - 1 < 1 ? 60 : currentSession - 1);
});

// دکمه‌های کلمه بعد و قبل
nextWordBtn.addEventListener('click', () => {
    const words = getCurrentWords();
    if (words.length === 0) return;
    currentWordIndex = (currentWordIndex + 1) % words.length;
    showWord();
});

prevWordBtn.addEventListener('click', () => {
    const words = getCurrentWords();
    if (words.length === 0) return;
    currentWordIndex = (currentWordIndex - 1 + words.length) % words.length;
    showWord();
});

// بارگذاری اولیه
loadSession(currentSession);
