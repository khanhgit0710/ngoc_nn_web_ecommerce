// Page Contact
document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
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
                entry.target.classList.add('revealed');
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
    const bottomDock = document.querySelector('.bottom-nav-dock');
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;
        const scrollDelta = Math.abs(currentScroll - lastScrollY);
        const dock = document.querySelector('.bottom-nav-dock');

        if (scrollDelta > 5) {
            if (currentScroll > lastScrollY && currentScroll > 100) {
                // Scrolling down
                header.classList.add("header--hidden");
                if (dock) dock.classList.add("bottom-nav-dock--hidden");
            } else {
                // Scrolling up
                header.classList.remove("header--hidden");
                if (dock) dock.classList.remove("bottom-nav-dock--hidden");
            }
        }

        lastScrollY = currentScroll;

        // Background glassmorphism effect on scroll
        if (currentScroll > 50) {
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
        if (window.innerWidth <= 1024) return; // Skip transform on mobile (uses native scroll)

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
        if (window.innerWidth <= 1024) return;
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
    if (window.innerWidth > 1024) {
        viewport.style.cursor = 'grab';
    }

    // MOBILE AUTO-SLIDE LOGIC
    function startAutoSlide() {
        if (window.innerWidth > 1024) return;

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

    if (window.innerWidth <= 1024) {
        startAutoSlide();
        viewport.addEventListener('touchstart', stopAutoSlide);
        viewport.addEventListener('touchend', startAutoSlide);
    }

    window.addEventListener('resize', () => {
        updateSlider();
        stopAutoSlide();
        if (window.innerWidth <= 1024) startAutoSlide();
    });
});

/* ==========================================
   ADVANCED LUXURY LIGHTBOX LOGIC
   ========================================== */
document.addEventListener("DOMContentLoaded", function () {
    const lb = document.getElementById('lb-master');
    const lbImgMain = document.getElementById('lb-img-main');
    const lbImgPrev = document.querySelector('.lb-side--prev img');
    const lbImgNext = document.querySelector('.lb-side--next img');
    const lbCounter = document.querySelector('.lb-counter');
    const lbCaption = document.getElementById('lb-caption-text');
    const closeBtn = document.querySelector('.lb-close-advanced');

    if (!lb || !lbImgMain) return;

    let galleryData = [];
    let currentIndex = 0;

    function refreshGallery() {
        // Collect images from Deals, Moments, and Feedback sections
        galleryData = Array.from(document.querySelectorAll('.deal-card img, .moment-item img, .feedback-img img, .swiper-slide img')).map(img => ({
            src: img.src,
            alt: img.alt || "Luxury Property View"
        }));

        // Remove duplicates if any (e.g. from swiper clones)
        const unique = [];
        const seen = new Set();
        galleryData.forEach(item => {
            if (!seen.has(item.src)) {
                seen.add(item.src);
                unique.push(item);
            }
        });
        galleryData = unique;
    }

    let isAnimating = false;

    function updateLightbox(direction) {
        if (galleryData.length === 0) return;

        const current = galleryData[currentIndex];

        // Nếu không có direction (open lần đầu), chỉ set ảnh trực tiếp
        if (!direction) {
            lbImgMain.src = current.src;
            lbCounter.innerText = `${currentIndex + 1} / ${galleryData.length}`;
            lbCaption.innerText = current.alt;
            return;
        }

        // Slide animation: tạo ảnh mới bay vào, ảnh cũ bay ra
        if (isAnimating) return;
        isAnimating = true;

        const lbMain = lbImgMain.closest('.lb-main') || lbImgMain.parentElement;

        // Tạo thẻ img mới
        const newImg = document.createElement('img');
        newImg.src = current.src;
        newImg.alt = current.alt;
        newImg.style.cssText = lbImgMain.style.cssText;
        newImg.className = lbImgMain.className.replace('is-zoomed', '');
        newImg.id = '';
        newImg.style.position = 'absolute';
        newImg.style.top = '0';
        newImg.style.left = '0';
        newImg.style.width = '100%';
        newImg.style.height = '100%';
        newImg.style.objectFit = 'contain';
        newImg.style.borderRadius = '4px';
        newImg.style.willChange = 'transform, opacity';
        newImg.style.transition = 'none';
        newImg.style.transform = direction === 'next' ? 'translateX(60px)' : 'translateX(-60px)';
        newImg.style.opacity = '0';

        // Cũng set style cho ảnh cũ chuẩn bị bay ra
        lbImgMain.style.position = 'absolute';
        lbImgMain.style.top = '0';
        lbImgMain.style.left = '0';
        lbImgMain.style.width = '100%';
        lbImgMain.style.height = '100%';
        lbImgMain.style.willChange = 'transform, opacity';
        lbImgMain.style.transition = 'none';

        // Đảm bảo container relative
        lbMain.style.position = 'relative';

        lbMain.appendChild(newImg);

        // Force reflow rồi bắt đầu animate
        void newImg.offsetWidth;

        const DURATION = 320;
        const EASING = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        // Ảnh cũ bay ra
        lbImgMain.style.transition = `transform ${DURATION}ms ${EASING}, opacity ${DURATION}ms ease`;
        lbImgMain.style.transform = direction === 'next' ? 'translateX(-60px)' : 'translateX(60px)';
        lbImgMain.style.opacity = '0';

        // Ảnh mới bay vào
        newImg.style.transition = `transform ${DURATION}ms ${EASING}, opacity ${DURATION}ms ease`;
        newImg.style.transform = 'translateX(0)';
        newImg.style.opacity = '1';

        setTimeout(() => {
            // Swap: xóa ảnh cũ, gán id + ref cho ảnh mới
            lbMain.removeChild(lbImgMain);
            newImg.id = 'lb-img-main';
            newImg.style.position = '';
            newImg.style.top = '';
            newImg.style.left = '';
            newImg.style.width = '';
            newImg.style.height = '';
            newImg.style.willChange = '';
            newImg.style.transition = '';
            newImg.style.transform = '';
            newImg.style.opacity = '';

            // Cập nhật reference
            lbMain.style.position = '';

            // Cập nhật biến lbImgMain toàn cục bằng cách reassign cho closure
            // Dùng thủ thuật: ghi đè pointer events block
            newImg.style.pointerEvents = 'none';
            newImg.style.userSelect = 'none';

            lbCounter.innerText = `${currentIndex + 1} / ${galleryData.length}`;
            lbCaption.innerText = current.alt;

            isAnimating = false;
        }, DURATION + 20);
    }

    function openLightbox(index) {
        refreshGallery();
        currentIndex = index;
        // Lấy lại reference mới nhất của lbImgMain
        const freshImg = document.getElementById('lb-img-main');
        if (freshImg) {
            freshImg.src = galleryData[currentIndex].src;
            freshImg.style.transform = '';
            freshImg.style.opacity = '';
        }
        lbCounter.innerText = `${currentIndex + 1} / ${galleryData.length}`;
        if (lbCaption) lbCaption.innerText = galleryData[currentIndex].alt;

        document.body.classList.add('lb-open');
        document.documentElement.classList.add('lb-open');

        lb.classList.add('active');
    }

    function closeLightbox() {
        lb.classList.remove('active');

        document.body.classList.remove('lb-open');
        document.documentElement.classList.remove('lb-open');
        isAnimating = false;
    }

    function showNext() {
        if (isAnimating) return;
        currentIndex = (currentIndex + 1) % galleryData.length;
        const currentImg = document.getElementById('lb-img-main');
        navigateTo(currentIndex, 'next', currentImg);
    }

    function showPrev() {
        if (isAnimating) return;
        currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
        const currentImg = document.getElementById('lb-img-main');
        navigateTo(currentIndex, 'prev', currentImg);
    }

    function navigateTo(index, direction, oldImg) {
        if (galleryData.length === 0 || !oldImg) return;
        if (isAnimating) return;
        isAnimating = true;

        const current = galleryData[index];
        const lbMain = oldImg.parentElement;

        const newImg = document.createElement('img');
        newImg.src = current.src;
        newImg.alt = current.alt;
        newImg.style.cssText = '';
        newImg.className = 'lb-slide-in';
        newImg.style.position = 'absolute';
        newImg.style.inset = '0';
        newImg.style.width = '100%';
        newImg.style.height = '100%';
        newImg.style.maxHeight = '80vh';
        newImg.style.objectFit = 'contain';
        newImg.style.borderRadius = '4px';
        newImg.style.boxShadow = '0 30px 60px rgba(0,0,0,0.5)';
        newImg.style.willChange = 'transform, opacity';
        newImg.style.pointerEvents = 'none';
        newImg.style.userSelect = 'none';
        newImg.style.webkitUserDrag = 'none';
        newImg.style.transition = 'none';
        newImg.style.transform = direction === 'next' ? 'translateX(55px)' : 'translateX(-55px)';
        newImg.style.opacity = '0';

        lbMain.style.position = 'relative';
        lbMain.style.overflow = 'hidden';

        oldImg.style.willChange = 'transform, opacity';
        oldImg.style.transition = 'none';

        lbMain.appendChild(newImg);
        void newImg.offsetWidth; // force reflow

        const DURATION = 300;
        const EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
        const trans = `transform ${DURATION}ms ${EASE}, opacity ${DURATION}ms ease`;

        oldImg.style.transition = trans;
        oldImg.style.transform = direction === 'next' ? 'translateX(-55px)' : 'translateX(55px)';
        oldImg.style.opacity = '0';

        newImg.style.transition = trans;
        newImg.style.transform = 'translateX(0)';
        newImg.style.opacity = '1';

        setTimeout(() => {
            lbMain.removeChild(oldImg);
            newImg.id = 'lb-img-main';
            newImg.style.position = '';
            newImg.style.inset = '';
            newImg.style.width = '';
            newImg.style.height = '';
            newImg.style.willChange = '';
            newImg.style.transition = '';
            newImg.style.transform = '';
            newImg.style.opacity = '';
            lbMain.style.position = '';
            lbMain.style.overflow = '';

            lbCounter.innerText = `${currentIndex + 1} / ${galleryData.length}`;
            if (lbCaption) lbCaption.innerText = current.alt;

            isAnimating = false;
        }, DURATION + 30);
    }

    // Swipe/Drag Logic for Mobile & PC
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    let isDragging = false;

    // Touch Events
    lb.addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].screenX;
        startY = e.changedTouches[0].screenY;
    }, { passive: true });

    lb.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].screenX;
        endY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    // Mouse Events for PC Swipe
    lb.addEventListener('mousedown', (e) => {
        startX = e.screenX;
        startY = e.screenY;
        isDragging = true;
    });

    lb.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        endX = e.screenX;
        endY = e.screenY;
        isDragging = false;
        handleSwipe();
    });

    lb.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    function handleSwipe() {
        const threshold = 50;
        const diffX = endX - startX;
        const diffY = endY - startY;

        // If vertical swipe (Up or Down) is dominant and exceeds threshold, close the lightbox
        if (Math.abs(diffY) > threshold && Math.abs(diffY) > Math.abs(diffX)) {
            closeLightbox();
            return;
        }

        // Horizontal swipe (Left or Right) for navigating images
        if (diffX < -threshold) showNext();
        if (diffX > threshold) showPrev();
    }

    // Container-aware Event Delegation for clicks
    document.addEventListener('click', function (e) {
        // Find the parent container first
        const container = e.target.closest('.deal-card, .moment-item, .swiper-slide, .feedback-img');
        if (container) {
            const img = container.querySelector('img');
            if (img) {
                e.preventDefault();
                e.stopPropagation();
                refreshGallery();

                // Find index by src
                const index = galleryData.findIndex(item => item.src === img.src);
                if (index !== -1) {
                    openLightbox(index);
                }
            }
        }
    });

    // Control Buttons
    if (closeBtn) closeBtn.onclick = closeLightbox;
    document.querySelector('.lb-next-btn').onclick = (e) => { e.stopPropagation(); showNext(); };
    document.querySelector('.lb-prev-btn').onclick = (e) => { e.stopPropagation(); showPrev(); };

    // Fullscreen Toggle
    const fsBtn = document.getElementById('lb-fs-btn');
    if (fsBtn) {
        fsBtn.onclick = () => {
            if (!document.fullscreenElement) {
                lb.requestFullscreen().catch(err => console.log(err));
            } else {
                document.exitFullscreen();
            }
        };
    }

    // Zoom Logic (Simple toggle)
    const zoomBtn = document.getElementById('lb-zoom-btn');
    if (zoomBtn) {
        zoomBtn.onclick = () => {
            lbImgMain.classList.toggle('is-zoomed');
            const icon = zoomBtn.querySelector('i');
            if (lbImgMain.classList.contains('is-zoomed')) {
                icon.className = 'fas fa-search-minus';
            } else {
                icon.className = 'fas fa-search-plus';
            }
        };
    }

    // Share Logic
    const shareBtn = document.getElementById('lb-share-btn');
    if (shareBtn) {
        shareBtn.onclick = () => {
            const url = lbImgMain.src;
            navigator.clipboard.writeText(url).then(() => {
                alert('Đã sao chép liên kết ảnh!');
            });
        };
    }

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (lb.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        }
    });

    // Close on background click (clicking anywhere except the image, nav buttons, toolbar, or caption container)
    lb.onclick = (e) => {
        if (e.target.closest('#lb-img-main') ||
            e.target.closest('.lb-nav') ||
            e.target.closest('.lb-toolbar') ||
            e.target.closest('.lb-caption-container')) {
            return;
        }
        closeLightbox();
    };
});


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
// HUB-CARD MOBILE ACCORDION (FOOTER-HUB COMPACT)
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
    const hubCards = document.querySelectorAll('.hub-card');
    if (!hubCards.length) return;

    hubCards.forEach(card => {
        card.addEventListener('click', function (e) {
            // Chỉ chạy trên mobile (≤768px)
            if (window.innerWidth > 768) return;

            // Nếu click vào link thì cho đi bình thường
            if (e.target.closest('a')) return;

            e.preventDefault();
            e.stopPropagation();

            const isExpanded = this.classList.contains('expanded');

            // Accordion: đóng tất cả card khác
            hubCards.forEach(c => c.classList.remove('expanded'));

            // Toggle card hiện tại
            if (!isExpanded) {
                this.classList.add('expanded');
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
            <a href="./gioi-thieu.html" class="bottom-nav-item">
                <i class="fas fa-home"></i>
                <span>Xem Nhà</span>
            </a>
            <a href="./ky-gui.html" class="bottom-nav-item">
                <i class="fas fa-hand-holding-usd"></i>
                <span>Ký Gửi</span>
            </a>
            <a href="./tim-nha.html" class="bottom-nav-item bottom-nav-item--center">
                <i class="fas fa-map-marked-alt"></i>
                <span>Đặt Nhà</span>
            </a>
            <a href="./tinh-lai.html" class="bottom-nav-item">
                <i class="fas fa-calculator"></i>
                <span>Tính Lãi</span>
            </a>
            <a href="./quang-cao.html" class="bottom-nav-item">
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
                <div class="luxury-popup__title">NHẬN TƯ VẤN TỪ <span style="color: var(--color-primary);">NGỌC NN</span></div>
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
    document.addEventListener('click', function (e) {
        if (e.target.closest('#closeLuxuryPopup') || e.target.matches('#luxuryPopupOverlay')) {
            popupOverlay.classList.remove('active');
        }
    });

    // Xử lý submit form (sẽ do hệ thống Global Form Validator xử lý để đảm bảo đồng bộ)

    // Gán popup cho nút Hotline (Tạm thời để bàn giao)
    const hotlineBtn = document.querySelector('.contact-bubble--hotline');
    if (hotlineBtn) {
        hotlineBtn.addEventListener('click', function (e) {
            e.preventDefault(); // Ngăn hành động gọi điện
            popupOverlay.classList.add('active');
        });
    }

    // Chỉ tự động hiện popup (15s / 50% scroll) ở trang tim-nha.html
    if (!window.location.pathname.includes('tim-nha.html')) return;

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

    // Đặc biệt cho trang chủ (gioi-thieu.html)
    if (currentPath.endsWith('/') || currentPath.endsWith('index.html') || currentPath.includes('gioi-thieu.html')) {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes('gioi-thieu.html')) {
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



// ============================================================
// AUTO-SYNC TITLE WITH H1 CONTENT
document.addEventListener('DOMContentLoaded', function () {
    const h1 = document.querySelector('h1');
    if (h1) {
        const updateTitle = () => {
            const h1Text = h1.textContent.replace(/\s+/g, ' ').trim();
            if (h1Text) {
                if (h1Text.includes('Ngọc NN')) {
                    document.title = h1Text;
                } else {
                    document.title = h1Text + ' | Ngọc NN';
                }
            }
        };
        updateTitle();
        const observer = new MutationObserver(updateTitle);
        observer.observe(h1, { childList: true, characterData: true, subtree: true });
    }
});

// ============================================================
// LUXURY FOOTER CINEMATIC REVEAL ANIMATION
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
    const footer = document.querySelector('.footer-signature-center');
    if (!footer) return;

    const revealItems = footer.querySelectorAll('.signature-logo-v3, .signature-quick-nav, .signature-line-v3, .signature-main-nav, .signature-social-v3, .signature-policies-v3, .signature-copyright-v3');

    // Tự động gán class và tính toán độ trễ (stagger)
    revealItems.forEach((el, index) => {
        el.classList.add('footer-reveal-item');
        el.style.transitionDelay = `${index * 0.12}s`;
    });

    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px 50px 0px" });

    footerObserver.observe(footer);
});

// ============================================================
// GLOBAL PREMIUM FORM VALIDATOR & LUXURY ALERT DIALOG
// ============================================================
function showLuxuryAlert(message, isSuccess = false) {
    // Remove existing luxury alert if any
    const existing = document.getElementById('luxury-alert-modal');
    if (existing) existing.remove();

    // Inject luxury keyframe styles if not present
    let styleTag = document.getElementById('luxury-alert-styles');
    if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = 'luxury-alert-styles';
        styleTag.textContent = `
            @keyframes luxuryPulseRed {
                0% { box-shadow: 0 0 0 0 rgba(219, 0, 0, 0.4); transform: scale(1); }
                50% { box-shadow: 0 0 0 15px rgba(219, 0, 0, 0); transform: scale(1.05); }
                100% { box-shadow: 0 0 0 0 rgba(219, 0, 0, 0); transform: scale(1); }
            }
            @keyframes luxuryPulseGreen {
                0% { box-shadow: 0 0 0 0 rgba(39, 174, 96, 0.4); transform: scale(1); }
                50% { box-shadow: 0 0 0 15px rgba(39, 174, 96, 0); transform: scale(1.05); }
                100% { box-shadow: 0 0 0 0 rgba(39, 174, 96, 0); transform: scale(1); }
            }
        `;
        document.head.appendChild(styleTag);
    }

    const modal = document.createElement('div');
    modal.id = 'luxury-alert-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(10, 5, 5, 0.55);
        backdrop-filter: blur(12px) saturate(180%);
        -webkit-backdrop-filter: blur(12px) saturate(180%);
        z-index: 100000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    `;

    const box = document.createElement('div');
    box.style.cssText = `
        background: #ffffff;
        border-top: 5px solid ${isSuccess ? '#27ae60' : '#DB0000'};
        border-bottom: 1px solid rgba(183, 114, 70, 0.12);
        border-left: 1px solid rgba(183, 114, 70, 0.12);
        border-right: 1px solid rgba(183, 114, 70, 0.12);
        padding: 45px 35px 35px;
        border-radius: 16px;
        max-width: 440px;
        width: 90%;
        text-align: center;
        box-shadow: 0 30px 70px rgba(0, 0, 0, 0.22);
        transform: scale(0.85);
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease;
    `;

    const iconContainer = document.createElement('div');
    iconContainer.style.cssText = `
        width: 82px;
        height: 82px;
        margin: 0 auto 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${isSuccess ? 'rgba(39, 174, 96, 0.08)' : 'rgba(219, 0, 0, 0.08)'};
        border-radius: 50%;
        animation: ${isSuccess ? 'luxuryPulseGreen 2s infinite ease-in-out' : 'luxuryPulseRed 2s infinite ease-in-out'};
    `;

    const icon = document.createElement('i');
    icon.className = isSuccess ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle';
    icon.style.cssText = `
        font-size: 38px;
        color: ${isSuccess ? '#27ae60' : '#DB0000'};
    `;
    iconContainer.appendChild(icon);

    const categoryTitle = document.createElement('div');
    categoryTitle.innerText = isSuccess ? 'THÀNH CÔNG' : 'THÔNG BÁO';
    categoryTitle.style.cssText = `
        font-family: 'Montserrat', 'Inter', sans-serif;
        font-size: 15px;
        font-weight: 700;
        letter-spacing: 3px;
        color: ${isSuccess ? '#27ae60' : 'var(--color-primary, #b77246)'};
        margin-bottom: 12px;
        text-transform: uppercase;
    `;

    const titleText = document.createElement('h3');
    titleText.innerText = message;
    titleText.style.cssText = `
        font-family: 'Montserrat', 'Inter', sans-serif;
        font-size: 18px;
        font-weight: 700;
        line-height: 1.5;
        color: #111;
        margin: 0 0 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    `;

    const subtitleText = document.createElement('p');
    subtitleText.innerText = isSuccess 
        ? 'Thông tin của bạn đã được tiếp nhận. Ngọc sẽ sớm liên hệ lại.' 
        : 'Vui lòng hoàn thành đầy đủ thông tin bắt buộc và điền đúng định dạng trước khi gửi lại.';
    subtitleText.style.cssText = `
        font-family: 'Montserrat', 'Inter', sans-serif;
        font-size: 13.5px;
        font-weight: 500;
        line-height: 1.6;
        color: #666;
        margin: 0 0 28px;
    `;

    const btn = document.createElement('button');
    btn.innerText = 'ĐỒNG Ý';
    btn.style.cssText = `
        background: ${isSuccess ? 'linear-gradient(135deg, #27ae60 0%, #1e8449 100%)' : 'linear-gradient(135deg, #DB0000 0%, #a80000 100%)'};
        color: #fff;
        border: none;
        padding: 14px 48px;
        font-size: 16px;
        font-weight: 300;
        font-family: 'Montserrat', 'Inter', sans-serif;
        border-radius: 8px;
        cursor: pointer;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        box-shadow: ${isSuccess ? '0 8px 20px rgba(39, 174, 96, 0.3)' : '0 8px 20px rgba(219, 0, 0, 0.35)'};
    `;

    btn.onmouseover = () => {
        btn.style.transform = 'translateY(-2px) scale(1.03)';
        btn.style.boxShadow = isSuccess ? '0 12px 25px rgba(39, 174, 96, 0.4)' : '0 12px 25px rgba(219, 0, 0, 0.45)';
    };
    btn.onmouseout = () => {
        btn.style.transform = 'translateY(0) scale(1)';
        btn.style.boxShadow = isSuccess ? '0 8px 20px rgba(39, 174, 96, 0.3)' : '0 8px 20px rgba(219, 0, 0, 0.35)';
    };

    box.appendChild(iconContainer);
    box.appendChild(categoryTitle);
    box.appendChild(titleText);
    box.appendChild(subtitleText);
    box.appendChild(btn);
    modal.appendChild(box);
    document.body.appendChild(modal);

    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        box.style.transform = 'scale(1)';
    }, 50);

    const closeAlert = () => {
        modal.style.opacity = '0';
        box.style.transform = 'scale(0.85)';
        setTimeout(() => modal.remove(), 400);
    };

    btn.onclick = closeAlert;
    modal.onclick = (e) => {
        if (e.target === modal) closeAlert();
    };
}

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------
    // REAL-TIME INPUT FIELD VALIDATION FUNCTION
    // --------------------------------------------------------
    function validateInputField(input) {
        // Do not validate if calculator input
        const form = input.closest('form');
        if (form && (form.classList.contains('loan-calculator-form') || form.id === 'calc-form')) {
            return true;
        }

        const val = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        // 1. Check required
        const isRequired = input.hasAttribute('required') || 
                           (input.tagName === 'INPUT' && (input.type === 'text' || input.type === 'tel' || input.type === 'email')) ||
                           (input.placeholder && input.placeholder.trim().startsWith('*')) ||
                           (input.previousElementSibling && input.previousElementSibling.textContent.includes('*')) ||
                           (input.parentElement && input.parentElement.querySelector('label') && input.parentElement.querySelector('label').textContent.includes('*'));

        if (isRequired && val === '') {
            isValid = false;
            errorMessage = 'Vui lòng điền thông tin này';
        } else if (val !== '') {
            // 2. Validate Phone Number (SDT)
            const isPhoneInput = input.type === 'tel' || 
                                input.id.toLowerCase().includes('phone') || 
                                input.id.toLowerCase().includes('sdt') || 
                                input.name.toLowerCase().includes('phone') || 
                                input.name.toLowerCase().includes('sdt') ||
                                input.placeholder.toLowerCase().includes('số điện thoại') ||
                                input.placeholder.toLowerCase().includes('sđt');

            if (isPhoneInput) {
                const hasLetters = /[a-zA-Z]/g.test(val);
                const digitsOnly = val.replace(/[^0-9]/g, '');

                if (hasLetters || digitsOnly.length < 9 || digitsOnly.length > 10 || /[^0-9\s\-\+\(\)]/.test(val)) {
                    isValid = false;
                    errorMessage = 'SĐT quy định 9-10 chữ số, không chứa chữ';
                }
            }

            // 3. Validate Email
            const isEmailInput = input.type === 'email' || 
                                input.id.toLowerCase().includes('email') || 
                                input.name.toLowerCase().includes('email') ||
                                input.placeholder.toLowerCase().includes('email');

            if (isEmailInput) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(val)) {
                    isValid = false;
                    errorMessage = 'Email sai cấu trúc (Ví dụ: name@example.com)';
                }
            }
        }

        // Toggle error element display dynamically
        let errorEl = input.nextElementSibling;
        if (!errorEl || !errorEl.classList.contains('luxury-error-inline')) {
            errorEl = document.createElement('div');
            errorEl.className = 'luxury-error-inline';
            errorEl.style.cssText = `
                color: #DB0000;
                font-size: 12px;
                font-family: 'Montserrat', 'Inter', sans-serif;
                font-weight: 600;
                margin-top: 4px;
                margin-bottom: 8px;
                text-align: left;
                display: block;
                opacity: 0;
                transform: translateY(-5px);
                transition: all 0.3s ease;
            `;
            input.insertAdjacentElement('afterend', errorEl);
        }

        if (!isValid) {
            input.style.borderColor = '#DB0000';
            input.style.boxShadow = '0 0 5px rgba(219, 0, 0, 0.2)';
            errorEl.innerText = errorMessage;
            // Force reflow
            errorEl.offsetHeight;
            errorEl.style.opacity = '1';
            errorEl.style.transform = 'translateY(0)';
        } else {
            input.style.borderColor = '';
            input.style.boxShadow = '';
            errorEl.style.opacity = '0';
            errorEl.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                if (errorEl.style.opacity === '0') {
                    errorEl.innerText = '';
                }
            }, 300);
        }

        return isValid;
    }

    // Disable native HTML5 bubble tooltips globally for customer forms
    function setupFormNoValidate(form) {
        if (form.classList.contains('loan-calculator-form') || form.id === 'calc-form') {
            return;
        }
        form.setAttribute('novalidate', 'true');
    }

    // Attach real-time validation to all customer inputs on focus/input/blur/change
    function setupRealTimeValidation(form) {
        if (form.classList.contains('loan-calculator-form') || form.id === 'calc-form') {
            return;
        }
        setupFormNoValidate(form);
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => validateInputField(input));
            input.addEventListener('blur', () => validateInputField(input));
            input.addEventListener('change', () => validateInputField(input));
        });
    }

    // Setup for forms already present in DOM
    document.querySelectorAll('form').forEach(form => setupRealTimeValidation(form));

    // Handle dynamically added/injected forms (like popup overlay form if active later)
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.tagName === 'FORM') {
                    setupRealTimeValidation(node);
                } else if (node.querySelectorAll) {
                    node.querySelectorAll('form').forEach(form => setupRealTimeValidation(form));
                }
            });
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Intercept form submissions
    document.addEventListener('submit', function (e) {
        const form = e.target.closest('form');
        if (!form) return;

        // Skip calculator form
        if (form.classList.contains('loan-calculator-form') || form.id === 'calc-form') {
            return;
        }

        e.preventDefault();

        let formIsValid = true;
        let missingRequired = false;
        let firstInvalidField = null;

        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            const fieldValid = validateInputField(input);
            if (!fieldValid) {
                formIsValid = false;
                if (!firstInvalidField) {
                    firstInvalidField = input;
                }
                const val = input.value.trim();
                const isRequired = input.hasAttribute('required') || 
                                   (input.tagName === 'INPUT' && (input.type === 'text' || input.type === 'tel' || input.type === 'email')) ||
                                   (input.placeholder && input.placeholder.trim().startsWith('*')) ||
                                   (input.previousElementSibling && input.previousElementSibling.textContent.includes('*')) ||
                                   (input.parentElement && input.parentElement.querySelector('label') && input.parentElement.querySelector('label').textContent.includes('*'));
                if (isRequired && val === '') {
                    missingRequired = true;
                }
            }
        });

        if (!formIsValid) {
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
            return;
        }

        // Form is successfully submitted!
        form.reset();

        // Clear all success status and hide error elements
        inputs.forEach(input => {
            input.style.borderColor = '';
            input.style.boxShadow = '';
            const errorEl = input.nextElementSibling;
            if (errorEl && errorEl.classList.contains('luxury-error-inline')) {
                errorEl.style.opacity = '0';
                errorEl.style.transform = 'translateY(-5px)';
                setTimeout(() => { errorEl.innerText = ''; }, 300);
            }
        });

        // Show a beautiful inline green success message under the submit button
        const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('.btn-final') || form.querySelector('.form__btn-submit');
        if (submitBtn) {
            let successEl = submitBtn.nextElementSibling;
            if (!successEl || !successEl.classList.contains('luxury-success-inline')) {
                successEl = document.createElement('div');
                successEl.className = 'luxury-success-inline';
                successEl.style.cssText = `
                    color: #27ae60;
                    font-size: 14px;
                    font-family: 'Montserrat', 'Inter', sans-serif;
                    font-weight: 700;
                    margin-top: 12px;
                    text-align: center;
                    display: block;
                    opacity: 0;
                    transform: translateY(-5px);
                    transition: all 0.3s ease;
                `;
                submitBtn.insertAdjacentElement('afterend', successEl);
            }

            successEl.innerHTML = '<i class="fas fa-check-circle" style="margin-right: 6px;"></i> ĐÃ GỬI THÔNG TIN THÀNH CÔNG';
            // Force reflow
            successEl.offsetHeight;
            successEl.style.opacity = '1';
            successEl.style.transform = 'translateY(0)';

            // Hide after 5 seconds
            setTimeout(() => {
                successEl.style.opacity = '0';
                successEl.style.transform = 'translateY(-5px)';
            }, 5000);
        }

        // Close popup overlay after success if it is the luxury popup form
        const popupOverlay = document.getElementById('luxuryPopupOverlay');
        if (popupOverlay && form.id === 'luxuryPopupForm') {
            setTimeout(() => {
                popupOverlay.classList.remove('active');
            }, 2500);
        }
    });
});
