document.addEventListener("DOMContentLoaded", function () {
    // 1. Accordion Logic
    const faqItems = document.querySelectorAll(".faq-item");
    
    function initAccordions() {
        faqItems.forEach(item => {
            const question = item.querySelector(".faq-question");
            if (question) {
                // Remove old listeners if any (though this is a fresh page load)
                const newQuestion = question.cloneNode(true);
                question.parentNode.replaceChild(newQuestion, question);
                
                newQuestion.addEventListener("click", () => {
                    const isActive = item.classList.contains("active");
                    
                    // Close all others in the SAME group
                    const group = item.closest(".faq-group");
                    group.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));
                    
                    if (!isActive) {
                        item.classList.add("active");
                    }
                });
            }
        });
    }

    // 2. Category Filtering
    const categoryBtns = document.querySelectorAll(".faq-category-btn");
    const faqGroups = document.querySelectorAll(".faq-group");


    categoryBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.getAttribute("data-category");
            
            // UI Update
            categoryBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            // Group Update
            faqGroups.forEach(group => {
                if (target === "all" || group.getAttribute("id") === target) {
                    group.classList.add("active");
                } else {
                    group.classList.remove("active");
                }
            });

            // Reset search when switching categories (optional, but cleaner)
            // searchInput.value = "";
            // clearHighlights();
        });
    });

    // 3. Search Filtering
    const searchInput = document.getElementById("faq-search");
    
    if (searchInput) {
        searchInput.addEventListener("input", function() {
            const term = this.value.toLowerCase().trim();
            const emptyState = document.getElementById("faq-empty-state");
            const promoBanner = document.querySelector(".faq-promo-mid");
            let hasResults = false;

            if (term.length < 2) {
                // Reset to category view if search is too short
                const activeCategory = document.querySelector(".faq-category-btn.active").getAttribute("data-category");
                faqGroups.forEach(group => {
                    if (activeCategory === "all" || group.getAttribute("id") === activeCategory) {
                        group.classList.add("active");
                        group.querySelectorAll(".faq-item").forEach(item => item.style.display = "block");
                    } else {
                        group.classList.remove("active");
                    }
                });
                if (emptyState) emptyState.style.display = "none";
                if (promoBanner) promoBanner.style.display = "block";
                return;
            }

            // Perform Search across ALL items
            faqGroups.forEach(group => {
                let groupHasMatch = false;
                const items = group.querySelectorAll(".faq-item");
                
                items.forEach(item => {
                    const question = item.querySelector(".faq-question").textContent.toLowerCase();
                    const answer = item.querySelector(".faq-answer").textContent.toLowerCase();
                    
                    if (question.includes(term) || answer.includes(term)) {
                        item.style.display = "block";
                        groupHasMatch = true;
                        hasResults = true;
                    } else {
                        item.style.display = "none";
                    }
                });

                if (groupHasMatch) {
                    group.classList.add("active");
                } else {
                    group.classList.remove("active");
                }
            });

            // Toggle UI elements
            if (emptyState) emptyState.style.display = hasResults ? "none" : "block";
            if (promoBanner) promoBanner.style.display = "none";
        });
    }

    // 4. Drawer Toggle Logic
    const toggleBtn = document.getElementById("toggle-faq-form");
    const drawer = document.getElementById("faq-form-drawer");

    if (toggleBtn && drawer) {
        toggleBtn.addEventListener("click", () => {
            const isActive = drawer.classList.contains("active");
            
            if (isActive) {
                drawer.classList.remove("active");
                toggleBtn.classList.remove("active");
            } else {
                drawer.classList.add("active");
                toggleBtn.classList.add("active");
                
                // Precise scroll logic to match user screenshot
                setTimeout(() => {
                    const formHeader = drawer.querySelector('.section-title') || drawer;
                    const yOffset = -150; // Adjust this to match the screenshot precisely (negative means scroll a bit less)
                    const y = formHeader.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }, 500); // 500ms for CSS transition to settle
            }
        });
    }

    // Initialize
    initAccordions();
});
