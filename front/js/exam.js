// فقط اعداد انگلیسی مجاز
const startInput = document.getElementById('startRange');
const endInput = document.getElementById('endRange');
const countInput = document.getElementById('wordCount');

// اعتبارسنجی ورودی‌ها
[startInput, endInput, countInput].forEach(input => {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/[^0-9]/g, '');
  });
});

function startExam() {
  const start = startInput.value;
  const end = endInput.value;
  const count = countInput.value;

  if(!start || !end || !count) {
    alert('لطفا همه فیلدها را پر کنید.');
    return;
  }

  if(Number(start) > Number(end)) {
    alert('عدد شروع بازه نمی‌تواند بزرگتر از عدد پایان باشد.');
    return;
  }

  alert(`امتحان با بازه ${start} تا ${end} و تعداد ${count} کلمه شروع شد.`);
  // برای ریدایرکت یا ارسال دیتا به Back-end:
  // window.location.href = `exam_session?start=${start}&end=${end}&count=${count}`;
}

// --- منوی همبرگری ---
function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('hidden');
}
