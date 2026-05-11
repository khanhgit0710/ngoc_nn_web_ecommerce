/**
 * LOCAL CHATBOT DATA
 * Expanded with more keywords, smart fallbacks and lead generation
 * Pronouns: Bạn & Mình
 */

const chatData = {
    "default": "Chào bạn! Mình là trợ lý ảo của Ngọc NN. Bạn cần mình hỗ trợ về 'lãi suất', 'thủ tục ký gửi' hay 'xem nhà' ạ?",
    
    "keywords": [
        {
            "keys": ["lãi suất", "vay", "ngân hàng", "tính lãi", "mượn nợ", "trả góp"],
            "response": "Dạ, hiện tại bên mình hỗ trợ gói vay ưu đãi chỉ từ 5.5%/năm. Bạn có thể sử dụng công cụ <a href='./tinh-lai.html' style='color:var(--chat-primary); font-weight:700;'>Tính Lãi</a> trên web để xem lịch trả nợ chi tiết nhé!"
        },
        {
            "keys": ["ký gửi", "bán nhà", "thủ tục", "nhờ bán", "đăng tin"],
            "response": "Để ký gửi nhà đất, bạn chỉ cần chuẩn bị Sổ Hồng và ảnh thực tế. Ngọc NN sẽ hỗ trợ marketing và ra hàng nhanh nhất cho bạn ạ! Bạn xem thêm tại đây: <a href='./ky-gui.html' style='color:var(--chat-primary); font-weight:700;'>Thủ tục Ký gửi</a>"
        },
        {
            "keys": ["xem nhà", "đặt lịch", "tham quan", "coi nhà", "gặp mặt"],
            "response": "Bạn muốn xem căn nào ạ? Bạn cứ để lại số điện thoại hoặc nhắn tin qua <a href='https://zalo.me/0888819198' target='_blank' style='color:#0068ff; font-weight:700;'>Zalo 0888.819.198</a>, mình sẽ sắp xếp lịch đón bạn ngay trong ngày!"
        },
        {
            "keys": ["giá", "bao nhiêu", "tỷ", "triệu", "nhiêu tiền", "tầm tài chính"],
            "response": "Các căn bên mình phân phối thường có mức giá từ 5 tỷ trở lên tại khu vực Thủ Đức và lân cận. Bạn quan tâm tầm giá nào để mình lọc căn ạ?"
        },
        {
            "keys": ["pháp lý", "sổ hồng", "quy hoạch", "tranh chấp", "sổ đỏ", "công chứng"],
            "response": "Tất cả sản phẩm của Ngọc NN đều cam kết sổ hồng riêng, pháp lý sạch và không dính quy hoạch. Bạn hoàn toàn yên tâm giao dịch ạ!"
        },
        {
            "keys": ["liên hệ", "số điện thoại", "hotline", "gặp trực tiếp", "địa chỉ", "văn phòng"],
            "response": "Bạn có thể gọi trực tiếp Hotline: <strong style='color:var(--chat-primary);'>0888.819.198</strong> để gặp anh Ngọc hỗ trợ nhanh nhất ạ!"
        },
        {
            "keys": ["quảng cáo", "marketing", "dịch vụ", "đối tác"],
            "response": "Ngọc NN cung cấp gói dịch vụ quảng cáo BĐS chuyên nghiệp. Bạn tham khảo tại đây nhé: <a href='./quang-cao.html' style='color:var(--chat-primary); font-weight:700;'>Dịch vụ Quảng cáo</a>"
        },
        {
            "keys": ["tin tức", "thị trường", "biến động", "quy hoạch mới"],
            "response": "Cập nhật những thông tin mới nhất về thị trường BĐS Thủ Đức tại đây ạ: <a href='./tin-tuc.html' style='color:var(--chat-primary); font-weight:700;'>Tin tức BĐS</a>"
        },
        {
            "keys": ["chào", "hi", "hello", "xin chào", "hey"],
            "response": "Dạ mình chào bạn! Chúc bạn một ngày tốt lành. Bạn cần mình hỗ trợ gì về nhà đất không ạ?"
        },
        {
            "keys": ["cảm ơn", "thanks", "ok", "được rồi", "tốt"],
            "response": "Dạ không có gì ạ! Rất vui được hỗ trợ bạn. Bạn cần gì cứ nhắn mình nhé!"
        }
    ],

    "suggestions": [
        { "label": "💰 Tính lãi vay", "value": "lãi suất" },
        { "label": "🏠 Thủ tục ký gửi", "value": "ký gửi" },
        { "label": "📞 Gọi Hotline", "value": "liên hệ" },
        { "label": "💬 Chat Zalo", "url": "https://zalo.me/0888819198" }
    ],

    "fallbacks": [
        "Câu hỏi của bạn rất hay, nhưng để có thông tin chính xác nhất cho trường hợp này, Ngọc NN cần trao đổi trực tiếp với bạn thêm một chút. Bạn có muốn kết nối Zalo ngay không?",
        "Dạ, hiện tại mình chưa có thông tin chi tiết về ý này. Nhưng bạn có thể quan tâm đến các dịch vụ bên dưới ạ. Bạn bấm xem thử nhé!",
        "Ngọc NN sẽ tìm hiểu kỹ và phản hồi lại câu hỏi này cho bạn sau 5 phút. Bạn để lại số điện thoại hoặc tin nhắn Zalo tại đây để mình báo anh Ngọc gọi lại nhé!"
    ],

    "lead_capture": "Dạ cảm ơn bạn! Mình đã nhận được số điện thoại. Anh Ngọc sẽ chủ động gọi lại cho bạn ngay khi nhận được thông tin ạ. Chúc bạn sớm tìm được căn nhà ưng ý!"
};