/**
 * Tiện ích hỗ trợ cho toàn bộ site NGỌC NN
 */
const Utils = {
    // Kiểm tra định dạng số điện thoại Việt Nam
    validatePhone: (phone) => {
        const re = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        return re.test(phone);
    },

    // Cuộn mượt lên đầu trang
    scrollToTop: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};