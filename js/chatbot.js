/**
 * LOCAL CHATBOT LOGIC (PRO)
 * Handles UI interactions, rule-based matching, suggestions and lead capture
 */

class LocalChatbot {
    constructor() {
        this.trigger = document.querySelector('.chatbot-trigger');
        this.window = document.querySelector('.chatbot-window');
        this.input = document.querySelector('.chatbot-input input');
        this.sendBtn = document.querySelector('.chatbot-send');
        this.messagesArea = document.querySelector('.chatbot-messages');
        this.typingIndicator = document.querySelector('.typing');
        
        this.isTyping = false;
        this.fallbackCount = 0;
        this.init();
    }

    init() {
        if (!this.trigger) return;

        // Add Close Button to Header dynamically
        const header = document.querySelector('.chatbot-header');
        const closeBtn = document.createElement('button');
        closeBtn.className = 'chatbot-close-v2';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.style.cssText = 'background:none; border:none; color:white; font-size:20px; cursor:pointer; padding:5px; margin-left:10px; opacity:0.7; transition:0.3s;';
        closeBtn.onmouseover = () => closeBtn.style.opacity = '1';
        closeBtn.onmouseout = () => closeBtn.style.opacity = '0.7';
        closeBtn.onclick = (e) => {
            e.stopPropagation();
            this.toggleChat();
        };
        header.appendChild(closeBtn);

        // Toggle chat window
        this.trigger.addEventListener('click', () => this.toggleChat());

        // Send message on button click
        this.sendBtn.addEventListener('click', () => this.handleUserInput());

        // Send message on Enter key
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserInput();
        });

        // Initial Greeting
        setTimeout(() => {
            this.addMessage(chatData.default, 'bot');
            this.showSuggestions();
        }, 1000);
    }

    toggleChat() {
        this.trigger.classList.toggle('active');
        this.window.classList.toggle('active');
        if (this.window.classList.contains('active')) {
            this.input.focus();
        }
    }

    handleUserInput() {
        const text = this.input.value.trim();
        if (!text || this.isTyping) return;

        this.addMessage(text, 'user');
        this.input.value = '';

        // Check for phone number (Lead Capture)
        const phoneRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/;
        if (phoneRegex.test(text)) {
            this.isTyping = true;
            this.showTyping();
            setTimeout(() => {
                this.hideTyping();
                this.addMessage(chatData.lead_capture, 'bot');
                this.isTyping = false;
            }, 1500);
            return;
        }

        this.showResponse(text);
    }

    addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        
        // Handle HTML in bot responses (links)
        if (sender === 'bot') {
            msgDiv.innerHTML = text;
        } else {
            msgDiv.textContent = text;
        }
        
        this.messagesArea.appendChild(msgDiv);
        this.scrollToBottom();
    }

    showSuggestions() {
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'chatbot-suggestions';
        suggestionsDiv.style.cssText = 'display:flex; flex-wrap:wrap; gap:8px; padding-bottom:10px; margin-top:-5px;';

        chatData.suggestions.forEach(item => {
            const btn = document.createElement('button');
            btn.className = 'suggestion-btn';
            btn.textContent = item.label;
            btn.style.cssText = 'background:#fff; border:1px solid #ddd; padding:6px 12px; border-radius:15px; font-size:12px; cursor:pointer; transition:all 0.3s; color:#666; font-weight:500;';
            
            btn.addEventListener('click', () => {
                if (item.url) {
                    window.open(item.url, '_blank');
                } else {
                    this.input.value = item.value;
                    this.handleUserInput();
                }
            });
            
            // Hover effects
            btn.onmouseover = () => { btn.style.borderColor = '#b77246'; btn.style.color = '#b77246'; };
            btn.onmouseout = () => { btn.style.borderColor = '#ddd'; btn.style.color = '#666'; };
            
            suggestionsDiv.appendChild(btn);
        });

        this.messagesArea.appendChild(suggestionsDiv);
        this.scrollToBottom();
    }

    showTyping() {
        this.typingIndicator.style.display = 'flex';
        this.scrollToBottom();
    }

    hideTyping() {
        this.typingIndicator.style.display = 'none';
    }

    showResponse(userInput) {
        this.isTyping = true;
        this.showTyping();

        // Simulate thinking time
        setTimeout(() => {
            const response = this.findResponse(userInput);
            this.hideTyping();
            this.addMessage(response, 'bot');
            this.isTyping = false;
            
            // If it's a fallback, show suggestions again to lead the user
            if (this.isFallback(response)) {
                this.showSuggestions();
            }
        }, 1200);
    }

    findResponse(input) {
        const lowerInput = input.toLowerCase();
        
        // 1. Precise keyword matching
        for (const item of chatData.keywords) {
            for (const key of item.keys) {
                if (lowerInput.includes(key)) {
                    this.fallbackCount = 0; // Reset fallback on success
                    return item.response;
                }
            }
        }

        // 2. Smart Fallbacks (Layered)
        const fallback = chatData.fallbacks[this.fallbackCount % chatData.fallbacks.length];
        this.fallbackCount++;
        return fallback;
    }

    isFallback(text) {
        return chatData.fallbacks.includes(text);
    }

    scrollToBottom() {
        this.messagesArea.scrollTop = this.messagesArea.scrollHeight;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LocalChatbot();
});
