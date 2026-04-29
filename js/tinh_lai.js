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
    }

    // Update Labels
    function updateLabels() {
        if (valAmount) valAmount.textContent = formatVND(sliderAmount.value);
        if (valTerm) valTerm.textContent = sliderTerm.value + " năm (" + (sliderTerm.value * 12) + " tháng)";
        if (valInterest) valInterest.textContent = sliderInterest.value + " %/năm";
    }

    // Listeners
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

    // Init
    updateLabels();
    calculateLoan();
});
