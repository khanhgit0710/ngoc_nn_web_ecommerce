document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Thêm class active và ngừng quan sát để animation mượt mà, không bị lặp lại gây giật
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Quét toàn bộ các phần tử có class .reveal để bắt đầu quan sát
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
});