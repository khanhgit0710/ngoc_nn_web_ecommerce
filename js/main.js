document.addEventListener('DOMContentLoaded', () => {
    // 1. Hiệu ứng Hiện dần (Reveal Animation)
    const observerOptions = { threshold: 0.15 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal--visible');
                revealObserver.unobserve(entry.target); // Chỉ chạy 1 lần
            }
        });
    }, observerOptions);

    // Áp dụng cho các thành phần chính
    document.querySelectorAll('.contact__grid, .social__card, .location__map, .hero__content').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // 2. Xử lý Form đơn giản
    const form = document.querySelector('.form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.form__button');
            btn.textContent = 'ĐANG GỬI...';
            setTimeout(() => {
                alert('Cảm ơn bạn! Ngọc NN sẽ liên hệ sớm nhất.');
                form.reset();
                btn.textContent = 'GỬI ĐI';
            }, 1000);
        });
    }
});