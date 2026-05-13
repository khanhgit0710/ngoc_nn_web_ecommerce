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
                    const isOpen = item.classList.contains("is-open");
                    
                    // Close all others in the SAME group
                    const group = item.closest(".faq-group");
                    group.querySelectorAll(".faq-item").forEach(i => {
                        i.classList.remove("is-open");
                    });
                    
                    if (!isOpen) {
                        item.classList.add("is-open");
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

            // Promo Update
            const promos = document.querySelectorAll(".faq-promo-mid");
            promos.forEach(promo => {
                const promoCat = promo.getAttribute("data-category");
                if (target === "all" || promoCat === target) {
                    promo.style.display = "block";
                } else {
                    promo.style.display = "none";
                }
            });

            // Smooth Scroll to specific category OR top
            if (target === "all") {
                const contentTop = document.querySelector(".faq-main-content");
                if (contentTop) {
                    const yOffset = -180;
                    const y = contentTop.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            } else {
                const activeGroup = document.getElementById(target);
                if (activeGroup) {
                    const yOffset = -180; // Adjusted to not hide under sticky categories
                    const y = activeGroup.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }
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
                if (promoBanner) {
                    const promoCat = promoBanner.getAttribute("data-category");
                    if (activeCategory === "all" || promoCat === activeCategory) {
                        promoBanner.style.display = "block";
                    } else {
                        promoBanner.style.display = "none";
                    }
                }
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

    // 5. Load More Logic
    const loadMoreBtns = document.querySelectorAll(".btn-faq-load-more");

    loadMoreBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const group = btn.closest(".faq-group");
            const isExpanding = !group.classList.contains("is-expanded");

            if (isExpanding) {
                group.classList.add("is-expanded");
                btn.classList.add("active");
            } else {
                group.classList.remove("is-expanded");
                btn.classList.remove("active");
                
                // Scroll back to group title if we're collapsing
                const groupTitle = group.querySelector(".faq-group-title");
                if (groupTitle) {
                    const yOffset = -180;
                    const y = groupTitle.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }
        });
    });

    // 6. Like/Dislike Logic
    const feedbackBtns = document.querySelectorAll(".btn-feedback");

    feedbackBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent accordion from toggling
            
            const parent = btn.closest(".faq-feedback");
            const countSpan = btn.querySelector(".count");
            let count = parseInt(countSpan.textContent);
            
            const isLike = btn.classList.contains("like");
            const otherBtn = isLike ? parent.querySelector(".dislike") : parent.querySelector(".like");
            
            if (btn.classList.contains("active")) {
                // Untoggle current
                btn.classList.remove("active");
                countSpan.textContent = count - 1;
                
                // Reset icon
                const icon = btn.querySelector("i");
                icon.classList.replace("fas", "far");
            } else {
                // Toggle current
                btn.classList.add("active");
                countSpan.textContent = count + 1;
                
                // Change icon to solid
                const icon = btn.querySelector("i");
                icon.classList.replace("far", "fas");
                
                // If other button is active, untoggle it
                if (otherBtn.classList.contains("active")) {
                    otherBtn.classList.remove("active");
                    const otherCountSpan = otherBtn.querySelector(".count");
                    otherCountSpan.textContent = parseInt(otherCountSpan.textContent) - 1;
                    
                    const otherIcon = otherBtn.querySelector("i");
                    otherIcon.classList.replace("fas", "far");
                }
            }
        });
    });

    // Initialize
    initAccordions();
});
