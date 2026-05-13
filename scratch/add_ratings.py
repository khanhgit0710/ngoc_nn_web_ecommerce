import re

path = r'd:\Learn\Journey_FE\ngoc_nn_web_ecommerce\faq.html'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

def add_rating(match):
    answer_text = match.group(1)
    if 'faq-rating' in answer_text:
        return match.group(0)
    
    rating_html = """
                                <div class="faq-rating">
                                    <div class="stars">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <span>(5.0/5 - 42 đánh giá)</span>
                                </div>"""
    return f'<div class="faq-answer">{answer_text}{rating_html}\n                            </div>'

# Target: <div class="faq-answer">...</div>
new_content = re.sub(r'<div class="faq-answer">(.*?)</div>', add_rating, content, flags=re.DOTALL)

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)
