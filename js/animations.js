document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            } else {
                entry.target.classList.remove("active");
            }
        });
    }, observerOptions);

    // Quét toàn bộ các phần tử có class .reveal để bắt đầu quan sát
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
});