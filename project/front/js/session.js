const sessionInput = document.getElementById('sessionInput');

// فقط اعداد انگلیسی
sessionInput.addEventListener('input', () => {
  sessionInput.value = sessionInput.value.replace(/[^0-9]/g, '');
});

function goToSession() {
  const sessionNumber = sessionInput.value;
  if(sessionNumber) {
    alert('وارد جلسه شماره ' + sessionNumber + ' می‌شوید.');
    // window.location.href = `session${sessionNumber}.html`;
  } else {
    alert('لطفا شماره جلسه را وارد کنید.');
  }
}

// باز و بسته کردن منوی همبرگری
function toggleMenu() {
  document.getElementById('menu').classList.toggle('hidden');
}
