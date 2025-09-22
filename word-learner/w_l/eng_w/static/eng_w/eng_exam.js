document.addEventListener("DOMContentLoaded", function() {
    const checkBtn = document.getElementById("check-answers");
    if (!checkBtn) return;

    checkBtn.addEventListener("click", function() {
        const examItems = document.querySelectorAll(".exam-item");
        examItems.forEach(item => {
            const input = item.querySelector(".answer-input");
            const translation = item.querySelector(".translation");
            const correct = translation.textContent.trim().toLowerCase();
            const userAnswer = input.value.trim().toLowerCase();

            // نمایش ترجمه
            translation.classList.remove("hidden");

            // رنگ سبز/قرمز
            if (userAnswer === correct) {
                input.style.backgroundColor = "#d4edda"; // سبز
                input.style.color = "#155724";
            } else {
                input.style.backgroundColor = "#f8d7da"; // قرمز
                input.style.color = "#721c24";
            }

            // input رو غیرقابل تغییر کنیم
            input.disabled = true;
        });

        // بعد از چک کردن، دکمه غیر فعال شود
        checkBtn.disabled = true;
    });
});
