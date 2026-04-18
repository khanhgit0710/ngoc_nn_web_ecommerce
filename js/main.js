// Page Contact
document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Chỉ định các khối sẽ có hiệu ứng reveal
    const revealElements = document.querySelectorAll(
        '.contact__grid, .social, .location__map, .footer-contact, .hero__content'
    );

    revealElements.forEach(el => {
        el.classList.add('reveal'); // Tự động gán class ẩn ban đầu
        observer.observe(el);
    });
});

//Page Ký gửi
document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Danh sách các khối cần Animation trên cả 2 trang
    const revealElements = document.querySelectorAll(
        '.kygui-intro__header, .kygui-intro__grid, .why-us__grid, ' +
        '.form-container, .footer-grid, .social, .contact__grid, .hero__content'
    );

    revealElements.forEach(el => {
        el.classList.add('reveal'); // Ẩn ban đầu
        observer.observe(el);
    });
});

// ============================================================

// Deals Grid Slider
document.addEventListener("DOMContentLoaded", function () {
    const dealsGrid = document.querySelector('.deals-grid');
    const prevBtn = document.getElementById('deals-prev');
    const nextBtn = document.getElementById('deals-next');

    if (dealsGrid && prevBtn && nextBtn) {
        const isActive = () => window.innerWidth <= 768;

        nextBtn.addEventListener('click', () => {
            if (!isActive()) return;
            const card = dealsGrid.querySelector('.deal-card');
            if (!card) return;
            const cardWidth = card.offsetWidth + parseInt(getComputedStyle(dealsGrid).gap || 15);
            dealsGrid.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            if (!isActive()) return;
            const card = dealsGrid.querySelector('.deal-card');
            if (!card) return;
            const cardWidth = card.offsetWidth + parseInt(getComputedStyle(dealsGrid).gap || 15);
            dealsGrid.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });

        const toggleButtons = () => {
            if (!isActive()) return;
            prevBtn.style.opacity = dealsGrid.scrollLeft <= 0 ? '0.3' : '1';
            nextBtn.style.opacity = dealsGrid.scrollLeft + dealsGrid.offsetWidth >= dealsGrid.scrollWidth - 5 ? '0.3' : '1';
        };

        dealsGrid.addEventListener('scroll', toggleButtons);
        window.addEventListener('resize', toggleButtons);
        toggleButtons();
    }
});

// Moments Grid Slider
document.addEventListener("DOMContentLoaded", function () {
    const momentsGrid = document.querySelector('.moments-grid');
    const prevBtn = document.getElementById('moments-prev');
    const nextBtn = document.getElementById('moments-next');

    if (momentsGrid && prevBtn && nextBtn) {
        const isActive = () => window.innerWidth <= 768;

        nextBtn.addEventListener('click', () => {
            if (!isActive()) return;
            const card = momentsGrid.querySelector('.moment-item');
            if (!card) return;
            const cardWidth = card.offsetWidth + parseInt(getComputedStyle(momentsGrid).gap || 15);
            momentsGrid.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            if (!isActive()) return;
            const card = momentsGrid.querySelector('.moment-item');
            if (!card) return;
            const cardWidth = card.offsetWidth + parseInt(getComputedStyle(momentsGrid).gap || 15);
            momentsGrid.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });

        const toggleButtons = () => {
            if (!isActive()) return;
            prevBtn.style.opacity = momentsGrid.scrollLeft <= 5 ? '0.3' : '1';
            nextBtn.style.opacity = momentsGrid.scrollLeft + momentsGrid.offsetWidth >= momentsGrid.scrollWidth - 5 ? '0.3' : '1';
        };

        momentsGrid.addEventListener('scroll', toggleButtons);
        window.addEventListener('resize', toggleButtons);
        toggleButtons();
    }
});


// ============================================================
// HEADER SCROLL REVEAL/HIDE LOGIC
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            // Scrolling down
            header.classList.add("header--hidden");
        } else {
            // Scrolling up
            header.classList.remove("header--hidden");
        }
        
        lastScrollY = window.scrollY;
        
        // Background glassmorphism effect on scroll
        if (window.scrollY > 50) {
            header.classList.add("header--scrolled");
        } else {
            header.classList.remove("header--scrolled");
        }
    });
});

// ============================================================
// MOBILE MENU BRANDING INJECTION (STRICT ISO)
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector('.header__nav');
    const logoGroup = document.querySelector('.header__logo-group');
    
    // CHỈ CHẠY TRÊN MOBILE ĐỂ TRÁNH DOUBLE LOGO TRÊN PC
    if (nav && logoGroup && window.innerWidth <= 768) {
        // Chỉ thực hiện nếu chưa có header (tránh duplicate khi page load)
        if (!nav.querySelector('.nav-menu-header')) {
            const menuHeader = document.createElement('div');
            menuHeader.className = 'nav-menu-header';
            
            // Clone logo để hiển thị trong menu
            const logoClone = logoGroup.cloneNode(true);
            menuHeader.appendChild(logoClone);
            
            // Chèn vào đầu menu
            nav.insertBefore(menuHeader, nav.firstChild);
        }
    }
});


// ============================================================
// MOBILE "SEE MORE" TOGGLE LOGIC
// ============================================================
function toggleSection(targetClass, btn) {
    const grid = document.querySelector('.' + targetClass);
    if (!btn) btn = window.event.currentTarget; // Fallback
    
    const textNode = btn.querySelector('.text');
    
    if (grid) {
        grid.classList.toggle('is-expanded');
        btn.classList.toggle('is-active');
        
        if (grid.classList.contains('is-expanded')) {
            textNode.innerText = 'THU GỌN';
        } else {
            // Trả lại text ban đầu tùy theo khối
            if (targetClass === 'moments-grid') {
                textNode.innerText = 'XEM THÊM KHOẢNH KHẮC';
            } else if (targetClass === 'commit-grid') {
                textNode.innerText = 'XEM THÊM CAM KẾT';
            }
            
            // Cuộn nhẹ về đầu khối khi thu gọn để không bị mất dấu
            grid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

// Đảm bảo hàm toggleSection có mặt ở Global Scope
window.toggleSection = function(targetClass, btn) {
    const grid = document.querySelector('.' + targetClass);
    if (!grid) return;
    
    // Toggle class mở rộng
    grid.classList.toggle('is-expanded');
    
    // Toggle trạng thái nút bấm
    if (btn) {
        btn.classList.toggle('is-active');
        const textNode = btn.querySelector('.text');
        if (textNode) {
            if (grid.classList.contains('is-expanded')) {
                textNode.innerText = 'THU GỌN';
            } else {
                textNode.innerText = targetClass === 'moments-grid' ? 'XEM THÊM KHOẢNH KHẮC' : 'XEM THÊM CAM KẾT';
                // Cuộn về đầu khối khi thu gọn
                grid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }
};

// ============================================================
// NUCLEAR FOOTER ACCORDION (1200px DELEGATION)
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
    // Sử dụng event delegation cấp cao nhất cho Footer
    document.addEventListener('click', function(e) {
        // Chỉ xử lý khi click vào h4 của footer__column
        const header = e.target.closest('.footer__column h4');
        if (!header || window.innerWidth > 1200) return;

        const column = header.parentElement;
        const isActive = column.classList.contains('active');

        // Accordion mode: Đóng các cột khác
        document.querySelectorAll('.footer__column').forEach(col => {
            col.classList.remove('active');
        });

        // Toggle cột hiện tại
        if (!isActive) {
            column.classList.add('active');
        }
    });
});

// BUTTON TRENDING NEWS
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.trending-grid');
    const cards = document.querySelectorAll('.trending-card');
    const nextBtn = document.querySelector('.next-btn--trending-news');
    const prevBtn = document.querySelector('.prev-btn--trending-news');

    let index = 0;

    function updateSlider() {
        const cardWidth = cards[0].offsetWidth + 20; // 20 là gap
        grid.style.transform = `translateX(${-index * cardWidth}px)`;
        
        // Disable nút khi hết card (optional)
        prevBtn.style.opacity = index === 0 ? "0.5" : "1";
        prevBtn.style.pointerEvents = index === 0 ? "none" : "auto";
        
        // Tính toán số card hiển thị dựa trên màn hình
        let visibleCards = window.innerWidth > 992 ? 3 : (window.innerWidth > 600 ? 2 : 1);
        
        nextBtn.style.opacity = index >= cards.length - visibleCards ? "0.5" : "1";
        nextBtn.style.pointerEvents = index >= cards.length - visibleCards ? "none" : "auto";
    }

    nextBtn.addEventListener('click', () => {
        let visibleCards = window.innerWidth > 992 ? 3 : (window.innerWidth > 600 ? 2 : 1);
        if (index < cards.length - visibleCards) {
            index++;
            updateSlider();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (index > 0) {
            index--;
            updateSlider();
        }
    });

    // Cập nhật lại khi xoay màn hình hoặc resize
    window.addEventListener('resize', updateSlider);
});

/* ==========================================
   LOGIC MODAL GALLERY - NGOC NN PROJECTS
   ========================================== */


/* ============================================================
   BLOCK: LUXURY POLISH LOGIC (PRELOADER, CURSOR, BACK TO TOP)
   ============================================================ */

// 1. PRELOADER HANDLER
window.addEventListener("load", function() {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add("preloader--hidden");
        }, 1000); // 1s delay for luxury feeling
    }
});

// 2. BACK TO TOP HANDLER
document.addEventListener("DOMContentLoaded", function() {
    const backToTop = document.querySelector(".back-to-top");
    
    if (backToTop) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        });

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});

// 3. CUSTOM CURSOR ENGINE (PC ONLY)
document.addEventListener("DOMContentLoaded", function() {
    if (window.innerWidth > 1024) {
        const cursor = document.querySelector(".custom-cursor");
        const follower = document.querySelector(".cursor-follower");
        
        if (cursor && follower) {
            document.addEventListener("mousemove", e => {
                cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
                
                // Add a micro-delay for the follower (Luxury lag effect)
                setTimeout(() => {
                    follower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
                }, 50);
            });

            // Hover effects for interactive elements
            const hoverables = document.querySelectorAll("a, button, .contact-bubble, .header__hamburger, .deal-card");
            
            hoverables.forEach(el => {
                el.addEventListener("mouseenter", () => {
                    document.body.classList.add("cursor-hover");
                });
                el.addEventListener("mouseleave", () => {
                    document.body.classList.remove("cursor-hover");
                });
            });
        }
    }
});


// 4. SCROLL PROGRESS HANDLER
window.addEventListener("scroll", () => {
    const progressBar = document.querySelector(".scroll-progress-bar");
    if (progressBar) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    }
});

// 5. ANIMATED COUNTER ENGINE
document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".count");
    const speed = 200; // The lower the slower

    const animate = (counter) => {
        const target = +counter.innerText;
        const count = +counter.getAttribute("data-current") || 0;
        const inc = target / speed;

        if (count < target) {
            const nextCount = Math.ceil(count + inc);
            counter.innerText = nextCount;
            counter.setAttribute("data-current", nextCount);
            setTimeout(() => animate(counter), 1);
        } else {
            counter.innerText = target;
        }
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                if (!counter.classList.contains("animated")) {
                    // Store final value and reset to 0
                    const finalValue = counter.innerText.replace("+", "");
                    counter.innerText = "0";
                    counter.setAttribute("data-target", finalValue);
                    
                    // Run animation
                    const runAnim = (c) => {
                        const target = +c.getAttribute("data-target");
                        const curr = +c.innerText;
                        const increment = target / 50;

                        if (curr < target) {
                            c.innerText = Math.ceil(curr + increment);
                            setTimeout(() => runAnim(c), 30);
                        } else {
                            c.innerText = target;
                        }
                    };
                    
                    runAnim(counter);
                    counter.classList.add("animated");
                }
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

