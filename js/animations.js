document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        threshold: 0.05,
        rootMargin: "0px 0px 50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active", "revealed");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Quét toàn bộ các phần tử có class .reveal để bắt đầu quan sát
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
});