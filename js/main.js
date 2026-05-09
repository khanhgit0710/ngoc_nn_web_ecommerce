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

// Deals Grid Slider - Upgraded to Swiper for Infinite Auto-sliding
document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector('.dealsSwiper')) {
        const dealsSwiper = new Swiper('.dealsSwiper', {
            slidesPerView: 2,
            spaceBetween: 8,
            loop: true,
            loopedSlides: 8,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            speed: 800,
            pagination: {
                el: '.deals-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 8,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 8,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 8,
                },
            }
        });
    }

    // Feedback Slider - Duo View (Hiện 2 ảnh - To tắp lự)
    if (document.querySelector('.feedbackSwiper')) {
        const feedbackSwiper = new Swiper('.feedbackSwiper', {
            slidesPerView: 'auto', // Để width tự lấy từ CSS (110px)
            spaceBetween: 5,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },

            speed: 1000,
            breakpoints: {
                1024: {
                    slidesPerView: 'auto',
                    spaceBetween: 8,
                }
            }
        });
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

// Logic clone logo vào menu đã được loại bỏ theo yêu cầu tinh giản


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
window.toggleSection = function (targetClass, btn) {
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
    document.addEventListener('click', function (e) {
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

// BUTTON TRENDING NEWS - UPGRADED WITH MOBILE AUTO-SLIDE
document.addEventListener('DOMContentLoaded', () => {
    const viewport = document.querySelector('.trending-slider-viewport');
    const grid = document.querySelector('.trending-grid');
    const cards = document.querySelectorAll('.trending-card');
    const nextBtn = document.querySelector('.next-btn--trending-news');
    const prevBtn = document.querySelector('.prev-btn--trending-news');

    if (!grid || !cards.length) return;

    let index = 0;
    let autoSlideInterval;

    function updateSlider() {
        if (window.innerWidth <= 768) return; // Skip transform on mobile (uses native scroll)

        const cardWidth = cards[0].offsetWidth + 20; // 20 là gap
        grid.style.transform = `translateX(${-index * cardWidth}px)`;

        if (prevBtn && nextBtn) {
            prevBtn.style.opacity = index === 0 ? "0.5" : "1";
            prevBtn.style.pointerEvents = index === 0 ? "none" : "auto";

            let visibleCards = window.innerWidth > 992 ? 3 : 2;
            nextBtn.style.opacity = index >= cards.length - visibleCards ? "0.5" : "1";
            nextBtn.style.pointerEvents = index >= cards.length - visibleCards ? "none" : "auto";
        }
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            let visibleCards = window.innerWidth > 992 ? 3 : 2;
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
    }

    // PC MOUSE DRAG SLIDER FUNCTIONALITY
    let isDown = false;
    let startX;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let dragged = false;

    viewport.addEventListener('mousedown', (e) => {
        if (window.innerWidth <= 768) return;
        isDown = true;
        dragged = false;
        startX = e.pageX - viewport.offsetLeft;
        const cardWidth = cards[0].offsetWidth + 20;
        prevTranslate = -index * cardWidth;
        currentTranslate = prevTranslate;
        grid.style.transition = 'none';
        viewport.style.cursor = 'grabbing';
    });

    viewport.addEventListener('mouseleave', () => {
        if (!isDown) return;
        isDown = false;
        viewport.style.cursor = 'grab';
        snapToGrid();
    });

    viewport.addEventListener('mouseup', () => {
        if (!isDown) return;
        isDown = false;
        viewport.style.cursor = 'grab';
        snapToGrid();
    });

    viewport.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - viewport.offsetLeft;
        const walk = x - startX;

        if (Math.abs(walk) > 5) {
            dragged = true;
        }

        currentTranslate = prevTranslate + walk;

        // Limit boundaries
        const cardWidth = cards[0].offsetWidth + 20;
        const visibleCards = window.innerWidth > 992 ? 3 : 2;
        const maxTranslate = 0;
        const minTranslate = -(cards.length - visibleCards) * cardWidth;

        if (currentTranslate > maxTranslate) currentTranslate = maxTranslate;
        if (currentTranslate < minTranslate) currentTranslate = minTranslate;

        grid.style.transform = `translateX(${currentTranslate}px)`;
    });

    // Prevent navigation if dragged
    viewport.addEventListener('click', (e) => {
        if (dragged) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);

    function snapToGrid() {
        const cardWidth = cards[0].offsetWidth + 20;
        grid.style.transition = 'transform 0.3s ease-out';

        index = Math.round(-currentTranslate / cardWidth);
        const visibleCards = window.innerWidth > 992 ? 3 : 2;
        if (index > cards.length - visibleCards) index = cards.length - visibleCards;
        if (index < 0) index = 0;

        updateSlider();
    }

    // Set cursor to grab by default for PC
    if (window.innerWidth > 768) {
        viewport.style.cursor = 'grab';
    }

    // MOBILE AUTO-SLIDE LOGIC
    function startAutoSlide() {
        if (window.innerWidth > 768) return;

        autoSlideInterval = setInterval(() => {
            if (viewport.scrollLeft + viewport.offsetWidth >= viewport.scrollWidth - 10) {
                viewport.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                const scrollAmount = cards[0].offsetWidth + 10; // card + gap
                viewport.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }, 3000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    if (window.innerWidth <= 768) {
        startAutoSlide();
        viewport.addEventListener('touchstart', stopAutoSlide);
        viewport.addEventListener('touchend', startAutoSlide);
    }

    window.addEventListener('resize', () => {
        updateSlider();
        stopAutoSlide();
        if (window.innerWidth <= 768) startAutoSlide();
    });
});

/* ==========================================
   LOGIC MODAL GALLERY - NGOC NN PROJECTS
   ========================================== */


/* ============================================================
   BLOCK: LUXURY POLISH LOGIC (PRELOADER, CURSOR, BACK TO TOP)
   ============================================================ */

// 1. PRELOADER HANDLER REMOVED PER USER REQUEST

// 2. BACK TO TOP HANDLER
document.addEventListener("DOMContentLoaded", function () {
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

// 3. CUSTOM CURSOR REMOVED PER USER REQUEST


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


    // Khởi tạo data-target chứa số gốc trên HTML trước khi bị thay đổi
    counters.forEach(counter => {
        const text = counter.innerText.replace(/[^0-9]/g, "");
        const target = parseInt(text, 10);
        if (!isNaN(target)) {
            counter.setAttribute("data-target", target);
            counter.innerText = "0"; // Đặt sẵn về 0
        }
    });

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute("data-target"), 10);

            if (isNaN(target)) return;

            if (entry.isIntersecting) {
                // Khách hàng cuộn tới -> Bắt đầu đếm
                if (!counter.classList.contains("is-counting")) {
                    counter.classList.add("is-counting");
                    counter.innerText = "0";

                    setTimeout(() => {
                        const duration = 2000; // Đếm mượt mà trong 2s
                        const start = performance.now();

                        const animate = (currentTime) => {
                            if (!counter.classList.contains("is-counting")) return; // Dừng nếu đã cuộn qua

                            const elapsed = currentTime - start;
                            const progress = Math.min(elapsed / duration, 1);

                            // Cubic ease-out cho cảm giác số chậm dần cực kỳ Luxury
                            const easeProgress = 1 - Math.pow(1 - progress, 3);

                            counter.innerText = Math.floor(easeProgress * target);

                            if (progress < 1) {
                                requestAnimationFrame(animate);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        requestAnimationFrame(animate);
                    }, 200); // Trì hoãn nhẹ 200ms để hiệu ứng gộp tự nhiên
                }
            } else {
                // Khách hàng cuộn qua -> Trả về 0 chờ lần sau
                counter.classList.remove("is-counting");
                counter.innerText = "0";
            }
        });
    }, { threshold: 0.1 });
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// ============================================================
// FOOTER ACCORDION TOGGLE (MOBILE & TABLET)
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
    const footerHeaders = document.querySelectorAll('.footer__column h4');

    footerHeaders.forEach(header => {
        header.addEventListener('click', function () {
            // Chỉ chạy khi màn hình <= 768px
            if (window.innerWidth > 768) return;

            const parent = this.closest('.footer__column');
            if (parent) {
                // Đóng các cái khác nếu đang mở (Tùy chọn: nếu muốn kiểu Accordion chuẩn)
                // document.querySelectorAll('.footer__column').forEach(col => {
                //     if (col !== parent) col.classList.remove('is-active');
                // });

                parent.classList.toggle('is-active');
            }
        });
    });
});

// ============================================================
// INJECT BOTTOM NAVIGATION DOCK (MOBILE & TABLET)
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
    if (!document.querySelector('.bottom-nav-dock')) {
        const dock = document.createElement('div');
        dock.className = 'bottom-nav-dock';
        dock.innerHTML = `
            <a href="about_me.html" class="bottom-nav-item">
                <i class="fas fa-home"></i>
                <span>Xem Nhà</span>
            </a>
            <a href="ky_gui.html" class="bottom-nav-item">
                <i class="fas fa-hand-holding-usd"></i>
                <span>Ký Gửi</span>
            </a>
            <a href="tim_nha.html" class="bottom-nav-item bottom-nav-item--center">
                <i class="fas fa-map-marked-alt"></i>
                <span>Đặt Nhà</span>
            </a>
            <a href="tinh_lai.html" class="bottom-nav-item">
                <i class="fas fa-calculator"></i>
                <span>Tính Lãi</span>
            </a>
            <a href="quang_cao.html" class="bottom-nav-item">
                <i class="fas fa-tv"></i>
                <span>Quảng Cáo</span>
            </a>
        `;
        document.body.appendChild(dock);

        // Đánh dấu active cho trang hiện tại
        const currentPath = window.location.pathname;
        const navItems = dock.querySelectorAll('.bottom-nav-item');

        navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href && href !== '#' && href !== 'javascript:void(0)' && currentPath.includes(href)) {
                item.classList.add('active');
            }
        });
    }
});

// ============================================================
// LUXURY POPUP LOGIC
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
    let popupOverlay = document.getElementById('luxuryPopupOverlay');
    
    // Tự động tiêm HTML Popup vào toàn trang nếu chưa có
    if (!popupOverlay) {
        const popupHTML = `
        <div class="luxury-popup-overlay" id="luxuryPopupOverlay">
            <div class="luxury-popup">
                <button class="luxury-popup__close" id="closeLuxuryPopup" aria-label="Đóng">&times;</button>
                <h2 class="luxury-popup__title">NHẬN TƯ VẤN TỪ <span style="color: var(--color-primary);">NGỌC NN</span></h2>
                <p class="luxury-popup__subtitle">Để lại thông tin, Ngọc NN sẽ liên hệ hỗ trợ bạn tìm căn nhà ưng ý nhất.</p>
                <form class="luxury-popup__form" id="luxuryPopupForm">
                    <label class="label-top">Có dấu (*) là thông tin cần thiết</label>
                    <input type="text" id="popupName" class="input-final--strong" placeholder="*Họ tên của bạn" required>
                    <input type="tel" id="popupPhone" class="input-final--strong" placeholder="*Số điện thoại" required>
                    <button type="submit" class="btn-final">NHẬN TƯ VẤN MIỄN PHÍ</button>
                </form>
                <div class="luxury-popup__footer">
                    <span class="hotline-text">Hoặc gọi trực tiếp: <a href="tel:0888819198">0888819198</a></span>
                </div>
            </div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', popupHTML);
        popupOverlay = document.getElementById('luxuryPopupOverlay');
    }

    const closeBtn = document.getElementById('closeLuxuryPopup');
    const popupForm = document.getElementById('luxuryPopupForm');

    if (!popupOverlay || !closeBtn || !popupForm) return;

    // Đóng popup khi bấm nút X hoặc bấm ra ngoài
    document.addEventListener('click', function(e) {
        if (e.target.closest('#closeLuxuryPopup') || e.target.matches('#luxuryPopupOverlay')) {
            popupOverlay.classList.remove('active');
        }
    });

    // Xử lý submit form (Demo)
    popupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('popupName').value;
        const phone = document.getElementById('popupPhone').value;

        alert(`Cảm ơn ${name}! Ngọc NN sẽ liên hệ với bạn qua số ${phone} trong thời gian sớm nhất.`);
        popupOverlay.classList.remove('active');
    });

    // Gán popup cho nút Hotline (Tạm thời để bàn giao)
    const hotlineBtn = document.querySelector('.contact-bubble--hotline');
    if (hotlineBtn) {
        hotlineBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Ngăn hành động gọi điện
            popupOverlay.classList.add('active');
        });
    }

    // Chỉ tự động hiện popup (15s / 50% scroll) ở trang tim_nha.html
    if (!window.location.pathname.includes('tim_nha.html')) return;

    // Kiểm tra xem đã hiện popup trong session này chưa
    if (sessionStorage.getItem('luxuryPopupShown')) return;

    let popupTriggered = false;

    function showPopup() {
        if (popupTriggered) return;
        popupTriggered = true;
        sessionStorage.setItem('luxuryPopupShown', 'true');
        popupOverlay.classList.add('active');
    }

    // Logic 1: Hiện sau 15 giây
    const timer = setTimeout(showPopup, 15000);

    // Logic 2: Hiện khi cuộn xuống 50%
    function handleScroll() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (height <= 0) return;

        const scrolled = (winScroll / height) * 100;

        if (scrolled >= 50) {
            showPopup();
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        }
    }
    window.addEventListener('scroll', handleScroll);




});

// ============================================================
// ACTIVE NAV LINK DETECTOR
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.header__nav-link');

    navLinks.forEach(link => {
        link.classList.remove('header__nav-link--active');

        const href = link.getAttribute('href');
        if (href && href !== '#' && href !== 'javascript:void(0)') {
            const filename = href.split('/').pop();
            if (currentPath.includes(filename)) {
                link.classList.add('header__nav-link--active');
            }
        }
    });

    // Đặc biệt cho trang chủ (about_me.html)
    if (currentPath.endsWith('/') || currentPath.endsWith('index.html') || currentPath.includes('about_me.html')) {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes('about_me.html')) {
                link.classList.add('header__nav-link--active');
            }
        });
    }
});

// ============================================================
// CLICK OUTSIDE TO CLOSE MOBILE MENU
// ============================================================
document.addEventListener('click', function (event) {
    const menuToggle = document.getElementById('menu-toggle');

    if (menuToggle && menuToggle.checked) {
        // Bỏ qua nếu click vào chính checkbox (tránh sự kiện phụ do browser tự kích hoạt)
        if (event.target === menuToggle) return;

        const clickedOutsideMenu = !event.target.closest('.header__nav');
        const clickedOutsideHamburger = !event.target.closest('.header__hamburger');

        if (clickedOutsideMenu && clickedOutsideHamburger) {
            menuToggle.checked = false;
        }
    }
});


