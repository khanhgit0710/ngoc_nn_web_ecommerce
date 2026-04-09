document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Sau khi hiện xong thì ngừng quan sát để tiết kiệm tài nguyên
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Áp dụng hiệu ứng cho các Block lớn theo chuẩn BEM
    const blocksToAnimate = document.querySelectorAll('.hero__content, .contact__content, .form, .footer__grid');
    
    blocksToAnimate.forEach(block => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(30px)';
        block.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        scrollObserver.observe(block);
    });
});

// Thêm class bổ trợ qua CSS để JS kích hoạt
const style = document.createElement('style');
style.innerHTML = `
    .is-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);