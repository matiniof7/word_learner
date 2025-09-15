// آرایه ای از کلمات و معنی آنها
const words = [
  {text: "Hello", meaning: "سلام"},
  {text: "World", meaning: "جهان"},
  {text: "Apple", meaning: "سیب"},
  {text: "Computer", meaning: "کامپیوتر"},
  {text: "Programming", meaning: "برنامه نویسی"},
  {text: "Language", meaning: "زبان"}
];

let index = 0;

function nextWord() {
  index = (index + 1) % words.length;
  document.getElementById("word").textContent = words[index].text;
  document.getElementById("meaning").textContent = words[index].meaning;
}

// --- منوی همبرگری ---
function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('hidden');
}
