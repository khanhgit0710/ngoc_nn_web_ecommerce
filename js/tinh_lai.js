document.addEventListener("DOMContentLoaded", function () {
    // 1. Elements
    const sliderAmount = document.getElementById("slider-amount");
    const sliderTerm = document.getElementById("slider-term");
    const sliderInterest = document.getElementById("slider-interest");
    const sliderInterestPeriod = document.getElementById("slider-interest-period");
    const sliderInterestFloat = document.getElementById("slider-interest-float");
    const sliderGrace = document.getElementById("slider-grace");

    const valAmount = document.getElementById("val-amount");
    const valTerm = document.getElementById("val-term");
    const valInterest = document.getElementById("val-interest");
    const valInterestPeriod = document.getElementById("val-interest-period");
    const valInterestFloat = document.getElementById("val-interest-float");
    const valGrace = document.getElementById("val-grace");

    const methodAnnuity = document.getElementById("method-annuity");
    const methodReducing = document.getElementById("method-reducing");

    const resMonthly = document.getElementById("res-monthly");
    const resPrincipal = document.getElementById("res-principal");
    const resTotalInterest = document.getElementById("res-total-interest");
    const resTotalPayment = document.getElementById("res-total-payment");
    const txtResultHeader = document.getElementById("txt-result-header");

    const btnToggleSchedule = document.getElementById("btn-toggle-schedule");
    const scheduleBox = document.getElementById("schedule-box");
    const scheduleBody = document.getElementById("schedule-body");

    // 2. Format Currency
    function formatVND(value) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value).replace('₫', 'đ');
    }

    // 3. Calculation Logic
    function calculateLoan() {
        if (!sliderAmount || !sliderTerm || !sliderInterest) return;

        const amount = Number(sliderAmount.value);
        const termMonths = Number(sliderTerm.value) * 12;
        const promoRateYearly = Number(sliderInterest.value) / 100;
        
        // Default to constant rate if promo/float inputs are missing
        const promoMonths = sliderInterestPeriod ? Number(sliderInterestPeriod.value) : 9999;
        const floatRateYearly = sliderInterestFloat ? Number(sliderInterestFloat.value) / 100 : promoRateYearly;

        const graceMonths = sliderGrace ? Number(sliderGrace.value) : 0;
        const postGraceTerm = termMonths - graceMonths;

        let totalInterest = 0;
        let scheduleHTML = "";
        let peakMonthly = 0;
        let emiAfterGrace = 0;

        // Helper to get rate for specific month index i (1-indexed)
        function getRateForMonth(monthIdx) {
            return (monthIdx <= promoMonths) ? (promoRateYearly / 12) : (floatRateYearly / 12);
        }

        let remainingBalance = amount;

        // --- CALCULATION LOOP ---
        for (let i = 1; i <= termMonths; i++) {
            const mRate = getRateForMonth(i);
            const interestPay = remainingBalance * mRate;
            let principalPay = 0;
            let currentTotal = 0;

            if (methodAnnuity && methodAnnuity.checked) {
                // ANNUITY (GỐC LÃI ĐỀU)
                if (i <= graceMonths) {
                    principalPay = 0;
                    currentTotal = interestPay;
                } else {
                    // Recalculate EMI if first month after grace or rate changes
                    if (i === graceMonths + 1 || i === promoMonths + 1) {
                        const remTerm = termMonths - i + 1;
                        if (remTerm > 0) {
                            emiAfterGrace = remainingBalance * mRate * Math.pow(1 + mRate, remTerm) / (Math.pow(1 + mRate, remTerm) - 1);
                        } else {
                            emiAfterGrace = remainingBalance + interestPay;
                        }
                    }
                    currentTotal = emiAfterGrace;
                    principalPay = currentTotal - interestPay;
                }
            } else {
                // REDUCING BALANCE (DƯ NỢ GIẢM DẦN)
                if (i <= graceMonths) {
                    principalPay = 0;
                    currentTotal = interestPay;
                } else {
                    principalPay = amount / postGraceTerm;
                    currentTotal = principalPay + interestPay;
                }
            }

            // Safeguard: Principal cannot exceed remaining balance
            if (principalPay > remainingBalance) {
                principalPay = remainingBalance;
                currentTotal = principalPay + interestPay;
            }

            remainingBalance -= principalPay;
            totalInterest += interestPay;

            if (currentTotal > peakMonthly) peakMonthly = currentTotal;

            // Result labels update (only once based on first months)
            if (i === 1) {
                if (graceMonths > 0) {
                    txtResultHeader.innerHTML = `Giai đoạn ân hạn (Trả lãi): <br> <small style="font-weight: 400; opacity: 0.7; text-transform: none;">Từ tháng ${graceMonths + 1} trả ước tính: ${formatVND(emiAfterGrace || (amount/postGraceTerm + amount*mRate))}</small>`;
                    resMonthly.textContent = formatVND(currentTotal);
                } else {
                    txtResultHeader.textContent = methodAnnuity.checked ? "Cần trả cố định hàng tháng" : "Thanh toán tháng đầu tiên";
                    resMonthly.textContent = formatVND(currentTotal);
                }
                if (resPrincipal) {
                    resPrincipal.textContent = (i <= graceMonths) ? "0 đ" : formatVND(principalPay);
                }
            }

            scheduleHTML += `<tr><td>Tháng ${i}${i <= graceMonths ? ' <span class="badge badge--grace">ÂN HẠN</span>' : ''}</td><td>${formatVND(principalPay)}</td><td>${formatVND(interestPay)}</td><td>${formatVND(currentTotal)}</td><td>${formatVND(Math.max(0, remainingBalance))}</td></tr>`;
        }

        if (resTotalInterest) resTotalInterest.textContent = formatVND(totalInterest);
        if (resTotalPayment) resTotalPayment.textContent = formatVND(amount + totalInterest);
        if (scheduleBody) scheduleBody.innerHTML = scheduleHTML;

        updateVisualBar(amount, totalInterest, peakMonthly);
    }

    // 4. UI Update
    function updateVisualBar(principal, interest, peakMonthly) {
        const total = Number(principal) + Number(interest);
        if (total === 0) return;

        const pPct = (principal / total) * 100;
        const iPct = (interest / total) * 100;

        const barP = document.getElementById("bar-principal");
        const barI = document.getElementById("bar-interest");
        if (barP) barP.style.width = pPct + "%";
        if (barI) barI.style.width = iPct + "%";

        const cBarP = document.getElementById("chart-bar-principal");
        const cBarI = document.getElementById("chart-bar-interest");
        const cValP = document.getElementById("chart-val-principal");
        const cValI = document.getElementById("chart-val-interest");

        if (cBarP) cBarP.style.width = pPct + "%";
        if (cBarI) cBarI.style.width = iPct + "%";
        if (cValP) cValP.innerHTML = `${Math.round(pPct)}% <small style="font-weight:400; color:#888;">(${formatVND(principal)})</small>`;
        if (cValI) cValI.innerHTML = `${Math.round(iPct)}% <small style="font-weight:400; color:#888;">(${formatVND(interest)})</small>`;

        const sTotal = document.getElementById("smart-total-cost");
        const sDaily = document.getElementById("smart-daily-interest");
        const sIncome = document.getElementById("smart-min-income");
        const sGrace = document.getElementById("smart-grace-cost");

        if (sTotal) sTotal.textContent = formatVND(total);
        const yRate = Number(sliderInterest.value) / 100;
        if (sDaily) sDaily.textContent = formatVND((principal * yRate) / 365);
        // Thu nhập đề xuất = Đỉnh thanh toán hàng tháng x 2.5 (quản trị rủi ro)
        if (sIncome) sIncome.textContent = formatVND(peakMonthly * 2.5);

        // Grace Cost Calc (Simplified diff)
        const gMonths = Number(sliderGrace.value);
        if (gMonths > 0) {
            // Calculate what interest would have been without grace (simplified approach)
            // Roughly: Grace Months * (Initial Monthly Interest - Average Monthly Interest saved if paying principal)
            const mRate = Number(sliderInterest.value) / 100 / 12;
            const extraInterest = principal * mRate * gMonths;
            sGrace.textContent = formatVND(extraInterest);
        } else {
            if (sGrace) sGrace.textContent = "0 đ";
        }
    }

    function updateLabels() {
        if (valAmount) valAmount.value = formatVND(sliderAmount.value);
        if (valTerm) valTerm.value = sliderTerm.value + " năm";
        if (valInterest) valInterest.value = sliderInterest.value + " %";
        if (valInterestPeriod && sliderInterestPeriod) valInterestPeriod.value = sliderInterestPeriod.value + " tháng";
        if (valInterestFloat && sliderInterestFloat) valInterestFloat.value = sliderInterestFloat.value + " %";
        if (valGrace) {
            const g = Number(sliderGrace.value);
            valGrace.value = g === 0 ? "Không chọn" : g + " tháng";
        }
    }

    // 5. Listeners
    [sliderAmount, sliderTerm, sliderInterest, sliderInterestPeriod, sliderInterestFloat, sliderGrace].forEach(el => {
        if (el) el.addEventListener("input", () => { updateLabels(); calculateLoan(); });
    });

    if (valAmount) {
        valAmount.addEventListener("input", function () {
            let v = parseInt(this.value.replace(/[^0-9]/g, ''));
            if (!isNaN(v)) { sliderAmount.value = v; calculateLoan(); }
        });
        valAmount.addEventListener("blur", updateLabels);
    }
    if (valTerm) {
        valTerm.addEventListener("input", function () {
            let v = parseInt(this.value.replace(/[^0-9]/g, ''));
            if (!isNaN(v)) { sliderTerm.value = v; calculateLoan(); }
        });
        valTerm.addEventListener("blur", updateLabels);
    }
    if (valInterest) {
        valInterest.addEventListener("input", function () {
            let v = parseFloat(this.value.replace(/[^0-9.]/g, ''));
            if (!isNaN(v)) { sliderInterest.value = v; calculateLoan(); }
        });
        valInterest.addEventListener("blur", updateLabels);
    }
    if (valInterestPeriod) {
        valInterestPeriod.addEventListener("input", function () {
            let v = parseInt(this.value.replace(/[^0-9]/g, ''));
            if (!isNaN(v)) { sliderInterestPeriod.value = v; calculateLoan(); }
        });
        valInterestPeriod.addEventListener("blur", updateLabels);
    }
    if (valInterestFloat) {
        valInterestFloat.addEventListener("input", function () {
            let v = parseFloat(this.value.replace(/[^0-9.]/g, ''));
            if (!isNaN(v)) { sliderInterestFloat.value = v; calculateLoan(); }
        });
        valInterestFloat.addEventListener("blur", updateLabels);
    }

    if (btnToggleSchedule) {
        btnToggleSchedule.addEventListener("click", () => {
            const isHidden = scheduleBox.style.display !== "block";
            scheduleBox.style.display = isHidden ? "block" : "none";
            btnToggleSchedule.innerHTML = isHidden ? '<i class="fas fa-chevron-up"></i> Thu gọn lịch trình' : '<i class="fas fa-calendar-alt"></i> Xem lịch trình thanh toán chi tiết';
        });
    }

    document.querySelectorAll(".mark-item").forEach(item => {
        item.addEventListener("click", function () {
            sliderGrace.value = this.getAttribute("data-val");
            updateLabels(); calculateLoan();
        });
    });

    // FAQ Toggle
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        if (question) {
            question.addEventListener("click", () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) otherItem.classList.remove("active");
                });
                item.classList.toggle("active");
            });
        }
    });

    // News Slider Logic
    const newsWrapper = document.querySelector('.trending-grid');
    const newsCards = document.querySelectorAll('.trending-card');
    const btnNext = document.querySelector('.next-news');
    const btnPrev = document.querySelector('.prev-news');

    if (newsWrapper && newsCards.length > 0) {
        let currentIndex = 0;
        function updateSlider() {
            const cardsPerView = window.innerWidth <= 600 ? 1 : (window.innerWidth <= 992 ? 2 : 3);
            const maxIdx = Math.max(0, newsCards.length - cardsPerView);
            if (currentIndex > maxIdx) currentIndex = maxIdx;
            const moveX = currentIndex * (320 + 5);
            newsWrapper.style.transform = `translateX(-${moveX}px)`;
            if (btnPrev) btnPrev.style.opacity = currentIndex === 0 ? "0.3" : "1";
            if (btnNext) btnNext.style.opacity = currentIndex >= maxIdx ? "0.3" : "1";
        }
        if (btnNext) btnNext.addEventListener('click', () => { if (currentIndex < newsCards.length - (window.innerWidth <= 992 ? 2 : 3)) { currentIndex++; updateSlider(); } });
        if (btnPrev) btnPrev.addEventListener('click', () => { if (currentIndex > 0) { currentIndex--; updateSlider(); } });
        window.addEventListener('resize', updateSlider);
        updateSlider();
    }

    // Listen for method changes
    [methodAnnuity, methodReducing].forEach(radio => {
        radio.addEventListener("input", calculateLoan);
    });

    // Initial calculation
    updateLabels();
    calculateLoan();
});

window.openPopup = function () {
    const p = document.getElementById('luxuryPopupOverlay');
    if (p) p.classList.add('active');
};
