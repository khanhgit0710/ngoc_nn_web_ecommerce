/* 
   LANDING PAGE LOGIC 
   Property Showcase Interactions & Gallery Lightbox
*/

const galleryImages = [
    { src: './assets/images/handover.png', title: 'Không gian phòng khách sang trọng' },
    { src: 'https://images2.thanhnien.vn/528068263637045248/2025/5/8/bcons-solary-1-1746707968497895317632.jpg', title: 'Kiến trúc hiện đại Thủ Đức' },
    { src: 'https://hoangphucphoto.com/wp-content/uploads/2024/11/anh-bds-4.webp', title: 'Nội thất nhập khẩu cao cấp' },
    { src: 'https://images.pexels.com/photos/34973979/pexels-photo-34973979.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000', title: 'Góc nhìn ban công thoáng mát' },
    { src: 'https://images.pexels.com/photos/33639465/pexels-photo-33639465/free-photo-of-hinh-nh-tren-khong-c-a-can-h-cao-c-p-t-i-vi-t-nam.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000', title: 'Tổng quan hẻm xe hơi 8m' },
    { src: 'https://vcdn1-vnexpress.vnecdn.net/2026/01/17/DJI-20251211135501-0113-D-4716-1768629318.jpg?w=1000&h=0&q=100&dpr=2&fit=crop&s=H5hsy4yikqAyrUZfqRu30A', title: 'Căn nhà lung linh về đêm' },
    { src: 'https://thietkenoithatatz.com/wp-content/uploads/2021/11/3-4.jpg', title: 'Phòng ngủ Master rộng rãi' },
    { src: 'https://tq4.mediacdn.vn/2020/7/21/hinh-9-1595295532400867517071-crop-15952955421051108753658.jpg', title: 'Sân thượng view triệu đô' }
];

let currentSlide = 0;
let touchStartX = 0;
let touchEndX = 0;

function openGallery(index) {
    const modal = document.getElementById('galleryModal');
    const slider = modal.querySelector('.gallery-modal__slider');
    
    // Always rebuild to ensure correct start
    slider.innerHTML = galleryImages.map((img, i) => `
        <div class="gallery-modal__slide">
            <img src="${img.src}" alt="${img.title}">
        </div>
    `).join('');

    currentSlide = index;
    modal.classList.add('show');
    showSlide(currentSlide);
    document.body.style.overflow = 'hidden'; 

    // Setup Swipe
    const sliderContent = modal.querySelector('.gallery-modal__content');
    sliderContent.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    sliderContent.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
}

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        changeSlide(1); // Swipe left -> Next
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        changeSlide(-1); // Swipe right -> Prev
    }
}

function closeGallery() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('show');
    document.body.style.overflow = ''; 
}

function showSlide(index) {
    const slides = document.querySelectorAll('.gallery-modal__slide');
    const caption = document.getElementById('galleryCaption');
    
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === currentSlide) slide.classList.add('active');
    });

    if (caption) {
        caption.innerText = galleryImages[currentSlide].title + ` (${currentSlide + 1} / ${galleryImages.length})`;
    }
}

function changeSlide(n) {
    showSlide(currentSlide + n);
}

// Close on escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeGallery();
});

document.addEventListener("DOMContentLoaded", function() {
    // SMOOTH SCROLL FOR ANCHOR LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
