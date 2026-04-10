document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Toggle class 'active' dựa trên việc phần tử có lọt vào mắt (intersecting) hay không
            // Điều này thay thế cho cả if/else giúp code cực gọn
            entry.target.classList.toggle("active", entry.isIntersecting);
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    // Quét một lượt tất cả phần tử và quan sát
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
});