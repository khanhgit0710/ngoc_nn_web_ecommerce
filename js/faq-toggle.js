/* ============================================================
   FAQ TOGGLE SYSTEM (SPECIALIZED)
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {
    // 1. Initialize FAQ Grids
    const faqGrids = document.querySelectorAll(".faq-grid");
    const isTinhLaiPage = window.location.pathname.includes("tinh-lai.html");

    faqGrids.forEach(grid => {
        const items = grid.querySelectorAll(".faq-item");
        if (items.length > 3 && !grid.parentNode.classList.contains("faq-grid-wrapper") && !isTinhLaiPage) {
            // Create wrapper
            const wrapper = document.createElement("div");
            wrapper.className = "faq-grid-wrapper";
            grid.parentNode.insertBefore(wrapper, grid);
            wrapper.appendChild(grid);
            
            // Create faded overlay
            const faded = document.createElement("div");
            faded.className = "faq-grid-faded";
            faded.innerHTML = `<button class="btn-faq-show-more"><i class="fas fa-chevron-down"></i></button>`;
            wrapper.appendChild(faded);
        }
    });

    // 2. Global Toggle Logic
    document.addEventListener("click", function(e) {
        const btn = e.target.closest(".btn-faq-show-more");
        if (btn) {
            const wrapper = btn.closest(".faq-grid-wrapper");
            if (wrapper) {
                const isExpanded = wrapper.classList.toggle("is-expanded");
                btn.innerHTML = isExpanded 
                    ? `<i class="fas fa-chevron-up"></i>` 
                    : `<i class="fas fa-chevron-down"></i>`;
                
                if (!isExpanded) {
                    // Force close ALL items within this wrapper when collapsing
                    wrapper.querySelectorAll(".faq-item").forEach(item => {
                        item.classList.remove("is-open");
                    });
                    wrapper.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        }
    });

    // 3. Specialized Accordion for Individual Items
    const isFaqPage = window.location.pathname.includes("faq.html");
    if (!isFaqPage) {
        const faqItems = document.querySelectorAll(".faq-item");
        faqItems.forEach(item => {
            const question = item.querySelector(".faq-question");
            if (question) {
                question.addEventListener("click", () => {
                    const isOpen = item.classList.contains("is-open");
                    faqItems.forEach(i => {
                        i.classList.remove("is-open");
                    });
                    if (!isOpen) {
                        item.classList.add("is-open");
                    }
                });
            }
        });
    }
});
