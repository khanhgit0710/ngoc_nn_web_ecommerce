import re
import os

path = r'd:\Learn\Journey_FE\ngoc_nn_web_ecommerce\faq.html'

with open(path, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# 1. Restore the banner and add cat-muaban
# Find the block between <!-- MID-PAGE PROMO BANNER --> and <!-- GROUP: KY G
# Note: The marker might have weird characters in the middle if it's corrupted.
# We'll use a more flexible regex.

banner_pattern = re.compile(r'<!-- MID-PAGE PROMO BANNER -->.*?<!-- GROUP: KY G', re.DOTALL)

new_content = """<!-- GROUP: MUA BAN -->
                <div class="faq-group" id="cat-muaban">
                    <h2 class="faq-group-title"><i class="fas fa-shopping-cart"></i> Quy trình Mua bán & Thủ tục</h2>
                    <div class="faq-grid">
                        <div class="faq-item">
                            <div class="faq-question">Quy trình đặt cọc diễn ra như thế nào? <i class="fas fa-chevron-down"></i></div>
                            <div class="faq-answer">Sau khi chốt giá, hai bên ký Hợp đồng đặt cọc (thường 10% giá trị). Nên thực hiện tại văn phòng công chứng hoặc có người làm chứng uy tín để đảm bảo an toàn.</div>
                            <div class="faq-feedback">
                                <span>Câu hỏi này có hữu ích không?</span>
                                <div class="feedback-btns">
                                    <button class="feedback-btn like-btn" title="Hữu ích">
                                        <i class="far fa-thumbs-up"></i>
                                        <span class="feedback-count">1.345</span>
                                    </button>
                                    <button class="feedback-btn dislike-btn" title="Không hữu ích">
                                        <i class="far fa-thumbs-down"></i>
                                        <span class="feedback-count">0</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="faq-item">
                            <div class="faq-question">Các loại thuế phí phải nộp khi sang tên? <i class="fas fa-chevron-down"></i></div>
                            <div class="faq-answer">Bao gồm: Thuế thu nhập cá nhân (2% giá bán - thường bên bán trả), Lệ phí trước bạ (0.5% - thường bên mua trả), và phí công chứng, phí thẩm định hồ sơ.</div>
                            <div class="faq-feedback">
                                <span>Câu hỏi này có hữu ích không?</span>
                                <div class="feedback-btns">
                                    <button class="feedback-btn like-btn" title="Hữu ích">
                                        <i class="far fa-thumbs-up"></i>
                                        <span class="feedback-count">822</span>
                                    </button>
                                    <button class="feedback-btn dislike-btn" title="Không hữu ích">
                                        <i class="far fa-thumbs-down"></i>
                                        <span class="feedback-count">4</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="faq-item">
                            <div class="faq-question">Thời gian từ lúc đặt cọc đến lúc công chứng là bao lâu? <i class="fas fa-chevron-down"></i></div>
                            <div class="faq-answer">Thông thường từ 15 đến 30 ngày tùy theo thỏa thuận. Thời gian này giúp bên mua chuẩn bị tài chính và bên bán chuẩn bị hồ sơ pháp lý, xóa thế chấp ngân hàng nếu có.</div>
                            <div class="faq-feedback">
                                <span>Câu hỏi này có hữu ích không?</span>
                                <div class="feedback-btns">
                                    <button class="feedback-btn like-btn" title="Hữu ích">
                                        <i class="far fa-thumbs-up"></i>
                                        <span class="feedback-count">1.098</span>
                                    </button>
                                    <button class="feedback-btn dislike-btn" title="Không hữu ích">
                                        <i class="far fa-thumbs-down"></i>
                                        <span class="feedback-count">1</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MID-PAGE PROMO BANNER -->
                <div class="faq-promo-mid reveal reveal-top">
                    <div class="promo-mid-content">
                        <div class="promo-mid-text">
                            <h3>Bạn cần kiểm tra quy hoạch nhanh?</h3>
                            <p>Gửi ngay tọa độ hoặc ảnh sổ đỏ qua Zalo, Ngọc NN sẽ phản hồi thông tin quy hoạch chính xác trong 15 phút.</p>
                            <a href="https://zalo.me/0888819198" target="_blank" class="btn-promo-inline">GỬI SỔ QUA ZALO NGAY</a>
                        </div>
                    </div>
                </div>

                <!-- GROUP: KY G"""

fixed_content = banner_pattern.sub(new_content, content)

# 2. Ensure all faq-items have the correct feedback structure (if not already present or if counts are missing)
# We'll just look for feedback-btns and add classes like-btn and dislike-btn if they are missing
fixed_content = fixed_content.replace('button class="feedback-btn"', 'button class="feedback-btn"') # No-op just to find

# Update existing buttons to have classes for JS targeting
fixed_content = re.sub(r'button class="feedback-btn" title="Hữu ích"', r'button class="feedback-btn like-btn" title="Hữu ích"', fixed_content)
fixed_content = re.sub(r'button class="feedback-btn" title="H?u ch"', r'button class="feedback-btn like-btn" title="Hữu ích"', fixed_content)
fixed_content = re.sub(r'button class="feedback-btn" title="Không hữu ích"', r'button class="feedback-btn dislike-btn" title="Không hữu ích"', fixed_content)
fixed_content = re.sub(r'button class="feedback-btn" title="Khng h?u ch"', r'button class="feedback-btn dislike-btn" title="Không hữu ích"', fixed_content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(fixed_content)

print("Successfully fixed faq.html structure and banner.")
