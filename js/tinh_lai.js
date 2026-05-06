document.addEventListener("DOMContentLoaded", function () {
    // Elements
    const sliderAmount = document.getElementById("slider-amount");
    const sliderTerm = document.getElementById("slider-term");
    const sliderInterest = document.getElementById("slider-interest");
    const methodAnnuity = document.getElementById("method-annuity");
    const methodReducing = document.getElementById("method-reducing");

    const valAmount = document.getElementById("val-amount");
    const valTerm = document.getElementById("val-term");
    const valInterest = document.getElementById("val-interest");

    const resMonthly = document.getElementById("res-monthly");
    const resPrincipal = document.getElementById("res-principal");
    const resTotalInterest = document.getElementById("res-total-interest");
    const resTotalPayment = document.getElementById("res-total-payment");
    const txtResultHeader = document.getElementById("txt-result-header");

    const btnToggleSchedule = document.getElementById("btn-toggle-schedule");
    const scheduleBox = document.getElementById("schedule-box");
    const scheduleBody = document.getElementById("schedule-body");

    // Format Currency
    function formatVND(value) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value).replace('₫', 'đ');
    }

    // Calculation Logic
    function calculateLoan() {
        if (!sliderAmount || !sliderTerm || !sliderInterest) return;
        const amount = parseFloat(sliderAmount.value);
        const termMonths = parseInt(sliderTerm.value) * 12;
        const yearlyRate = parseFloat(sliderInterest.value) / 100;
        const monthlyRate = yearlyRate / 12;

        let totalInterest = 0;
        let scheduleHTML = "";

        if (methodAnnuity.checked) {
            // EMI / Gốc lãi đều
            txtResultHeader.textContent = "Cần trả cố định hàng tháng";
            const emi = amount * monthlyRate * Math.pow(1 + monthlyRate, termMonths) / (Math.pow(1 + monthlyRate, termMonths) - 1);
            
            resMonthly.textContent = formatVND(emi);
            resPrincipal.textContent = "Tính đều theo kỳ";
            
            let remainingBalance = amount;
            for (let i = 1; i <= termMonths; i++) {
                const interestPay = remainingBalance * monthlyRate;
                const principalPay = emi - interestPay;
                remainingBalance -= principalPay;
                totalInterest += interestPay;

                scheduleHTML += `<tr>
                    <td>Tháng ${i}</td>
                    <td>${formatVND(principalPay)}</td>
                    <td>${formatVND(interestPay)}</td>
                    <td>${formatVND(emi)}</td>
                    <td style="color: #888;">${formatVND(Math.max(0, remainingBalance))}</td>
                </tr>`;
            }

            resTotalInterest.textContent = formatVND(totalInterest);
            resTotalPayment.textContent = formatVND(amount + totalInterest);

        } else {
            // Dư nợ giảm dần
            txtResultHeader.textContent = "Cần trả tháng đầu tiên";
            const monthlyPrincipal = amount / termMonths;
            const firstMonthInterest = amount * monthlyRate;
            
            resMonthly.textContent = formatVND(monthlyPrincipal + firstMonthInterest);
            resPrincipal.textContent = formatVND(monthlyPrincipal);

            let remainingBalance = amount;
            for (let i = 1; i <= termMonths; i++) {
                const interestPay = remainingBalance * monthlyRate;
                const emi = monthlyPrincipal + interestPay;
                remainingBalance -= monthlyPrincipal;
                totalInterest += interestPay;

                scheduleHTML += `<tr>
                    <td>Tháng ${i}</td>
                    <td>${formatVND(monthlyPrincipal)}</td>
                    <td>${formatVND(interestPay)}</td>
                    <td>${formatVND(emi)}</td>
                    <td style="color: #888;">${formatVND(Math.max(0, remainingBalance))}</td>
                </tr>`;
            }

            resTotalInterest.textContent = formatVND(totalInterest);
            resTotalPayment.textContent = formatVND(amount + totalInterest);
        }

        if (scheduleBody) scheduleBody.innerHTML = scheduleHTML;

        // Update Visual Bar [NEW]
        updateVisualBar(amount, totalInterest);
    }

    // Visual Ratio Bar Update
    function updateVisualBar(principal, interest) {
        const total = principal + interest;
        if (total === 0) return;

        const principalPercent = (principal / total) * 100;
        const interestPercent = (interest / total) * 100;

        // Header Horizontal Bar (if exists)
        const barPrincipal = document.getElementById("bar-principal");
        const barInterest = document.getElementById("bar-interest");
        if (barPrincipal) barPrincipal.style.width = principalPercent + "%";
        if (barInterest) barInterest.style.width = interestPercent + "%";

        // Chart Elements
        const chartBarPrincipal = document.getElementById("chart-bar-principal");
        const chartBarInterest = document.getElementById("chart-bar-interest");
        const chartValPrincipal = document.getElementById("chart-val-principal");
        const chartValInterest = document.getElementById("chart-val-interest");

        // Update Widths
        if (chartBarPrincipal) chartBarPrincipal.style.width = principalPercent + "%";
        if (chartBarInterest) chartBarInterest.style.width = interestPercent + "%";
        
        // Update Labels with Money Format
        if (chartValInterest) {
            chartValInterest.innerHTML = `<span class="pct">${Math.round(interestPercent)}%</span> <span class="amt">(${formatVND(interest)})</span>`;
        }

        // Smart Analysis Update
        const smartTotalCost = document.getElementById("smart-total-cost");
        const smartDailyInterest = document.getElementById("smart-daily-interest");
        const smartMinIncome = document.getElementById("smart-min-income");

        if (smartTotalCost) smartTotalCost.textContent = formatVND(principal + interest);
        
        // Estimate daily interest (using term months from current context)
        const termSlider = document.getElementById("slider-term");
        const months = termSlider ? parseInt(termSlider.value) * 12 : 12;
        if (smartDailyInterest) smartDailyInterest.textContent = formatVND(interest / months / 30);

        // Safe income = Monthly payment / 0.4 (40% rule)
        const resMonthlyText = document.getElementById("res-monthly").textContent;
        // Parse raw number from formatted string (very rough but works for display)
        const monthlyAmount = parseInt(resMonthlyText.replace(/[^0-9]/g, ''));
        if (smartMinIncome) smartMinIncome.textContent = formatVND(monthlyAmount / 0.4);
    }

    // FAQ Toggle
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        if (question) {
            question.addEventListener("click", () => {
                // Close other open items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) otherItem.classList.remove("active");
                });
                item.classList.toggle("active");
            });
        }
    });

    // Update Labels & Inputs
    function updateLabels() {
        if (valAmount) valAmount.value = formatVND(sliderAmount.value);
        if (valTerm) valTerm.value = sliderTerm.value + " năm";
        if (valInterest) valInterest.value = sliderInterest.value + " %";
    }

    // Manual Input Listeners
    if (valAmount) {
        valAmount.addEventListener("change", function() {
            let value = parseInt(this.value.replace(/[^0-9]/g, ''));
            if (isNaN(value)) value = 1000000000;
            sliderAmount.value = value;
            updateLabels();
            calculateLoan();
        });
    }

    if (valTerm) {
        valTerm.addEventListener("change", function() {
            let value = parseInt(this.value.replace(/[^0-9]/g, ''));
            if (isNaN(value)) value = 15;
            sliderTerm.value = value;
            updateLabels();
            calculateLoan();
        });
    }

    if (valInterest) {
        valInterest.addEventListener("change", function() {
            let value = parseFloat(this.value.replace(/[^0-9.]/g, ''));
            if (isNaN(value)) value = 8.5;
            sliderInterest.value = value;
            updateLabels();
            calculateLoan();
        });
    }

    // Listeners for Sliders
    const inputs = [sliderAmount, sliderTerm, sliderInterest];
    inputs.forEach(el => {
        if (el) {
            el.addEventListener("input", () => {
                updateLabels();
                calculateLoan();
            });
        }
    });

    const radios = [methodAnnuity, methodReducing];
    radios.forEach(el => {
        if (el) el.addEventListener("change", calculateLoan);
    });

    // Toggle Schedule
    if (btnToggleSchedule) {
        btnToggleSchedule.addEventListener("click", () => {
            if (scheduleBox.style.display === "block") {
                scheduleBox.style.display = "none";
                btnToggleSchedule.innerHTML = '<i class="fas fa-calendar-alt"></i> Xem lịch trình thanh toán chi tiết';
            } else {
                scheduleBox.style.display = "block";
                btnToggleSchedule.innerHTML = '<i class="fas fa-chevron-up"></i> Thu gọn lịch trình';
            }
        });
    }

    // Init from URL
    const urlParams = new URLSearchParams(window.location.search);
    const amountParam = urlParams.get('amount');
    if (amountParam && sliderAmount) {
        sliderAmount.value = amountParam;
        const backBtn = document.getElementById('back-btn');
        if (backBtn) backBtn.style.display = 'inline-flex';
    }

    // Init
    updateLabels();
    calculateLoan();

    // ==========================================
    // NEWS SLIDER LOGIC
    // ==========================================
    const newsWrapper = document.querySelector('.trending-grid');
    const newsCards = document.querySelectorAll('.trending-card');
    const btnNext = document.querySelector('.next-news');
    const btnPrev = document.querySelector('.prev-news');
    const viewport = document.querySelector('.trending-slider-viewport');

    if (newsWrapper && newsCards.length > 0) {
        let currentIndex = 0;
        const totalCards = newsCards.length;
        
        function getCardsPerView() {
            if (window.innerWidth <= 600) return 1;
            if (window.innerWidth <= 992) return 2;
            return 3;
        }

        function updateSlider() {
            const cardsPerView = getCardsPerView();
            const maxIndex = Math.max(0, totalCards - cardsPerView);
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            
            const gap = 15;
            const cardWidth = 320; // Exact width from main.css
            const moveX = currentIndex * (cardWidth + gap);
            newsWrapper.style.transform = `translateX(-${moveX}px)`;

            // Button States (Always clear as requested)
            if (btnPrev) btnPrev.style.pointerEvents = currentIndex === 0 ? "none" : "auto";
            if (btnNext) btnNext.style.pointerEvents = currentIndex >= maxIndex ? "none" : "auto";
            
            if (btnPrev) btnPrev.style.opacity = "1";
            if (btnNext) btnNext.style.opacity = "1";
        }

        if (btnNext) {
            btnNext.addEventListener('click', () => {
                const maxIndex = Math.max(0, totalCards - getCardsPerView());
                if (currentIndex < maxIndex) {
                    currentIndex++;
                    updateSlider();
                }
            });
        }

        if (btnPrev) {
            btnPrev.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateSlider();
                }
            });
        }

        // Swipe Support
        let startX = 0;
        let isDragging = false;

        if (viewport) {
            viewport.addEventListener('mousedown', (e) => {
                startX = e.pageX;
                isDragging = true;
            });

            window.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                const x = e.pageX;
                const walk = startX - x;
                if (Math.abs(walk) > 100) {
                    if (walk > 0) btnNext.click();
                    else btnPrev.click();
                    isDragging = false;
                }
            });

            window.addEventListener('mouseup', () => isDragging = false);

            // Touch Support
            viewport.addEventListener('touchstart', (e) => {
                startX = e.touches[0].pageX;
            }, { passive: true });

            viewport.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].pageX;
                const walk = startX - endX;
                if (Math.abs(walk) > 50) {
                    if (walk > 0) btnNext.click();
                    else btnPrev.click();
                }
            }, { passive: true });
        }

        window.addEventListener('resize', updateSlider);
        updateSlider();
    }
});

// Global Function for CTA
window.openPopup = function() {
    const popupOverlay = document.getElementById('luxuryPopupOverlay');
    if (popupOverlay) popupOverlay.classList.add('active');
};
