document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Giả lập hiệu ứng gửi
            const btn = contactForm.querySelector('.btn-submit');
            btn.innerText = 'ĐANG GỬI...';
            btn.disabled = true;

            const formData = new FormData(contactForm);
            console.log('Dữ liệu khách hàng:', Object.fromEntries(formData));

            setTimeout(() => {
                alert('Cảm ơn bạn! Ngọc NN sẽ liên hệ lại sớm nhất.');
                contactForm.reset();
                btn.innerText = 'GỬI ĐI';
                btn.disabled = false;
            }, 1500);
        });
    }
});