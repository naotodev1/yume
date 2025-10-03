// Configuração do ChatBot Yume para GitHub Pages
class ChatBotGenius {
    constructor() {
        this.messagesCount = 0;
        this.sessionStart = new Date();
        this.isTyping = false;
        this.theme = localStorage.getItem('chatbot-theme') || 'light';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.applyTheme();
        this.updateStats();
        this.setInitialTime();
        this.startSessionTimer();
    }

    setupEventListeners() {
        // Elementos DOM
        this.elements = {
            messageInput: document.getElementById('messageInput'),
            sendBtn: document.getElementById('sendBtn'),
            clearBtn: document.getElementById('clearBtn'),
            chatMessages: document.getElementById('chatMessages'),
            typingIndicator: document.getElementById('typingIndicator'),
            themeToggle: document.getElementById('themeToggle'),
            messagesCount: document.getElementById('messagesCount'),
            sessionTime: document.getElementById('sessionTime'),
            quickButtons: document.querySelectorAll('.quick-btn'),
            privacyBtn: document.getElementById('privacyBtn'),
            aboutBtn: document.getElementById('aboutBtn'),
            closeModal: document.getElementById('closeModal'),
            infoModal: document.getElementById('infoModal'),
            modalTitle: document.getElementById('modalTitle'),
            modalContent: document.getElementById('modalContent')
        };

        // Event Listeners
        this.elements.messageInput.addEventListener('input', this.handleInput.bind(this));
        this.elements.messageInput.addEventListener('keypress', this.handleKeyPress.bind(this));
        this.elements.sendBtn.addEventListener('click', this.sendMessage.bind(this));
        this.elements.clearBtn.addEventListener('click', this.clearChat.bind(this));
        this.elements.themeToggle.addEventListener('click', this.toggleTheme.bind(this));
        this.elements.closeModal.addEventListener('click', this.closeModal.bind(this));
        this.elements.privacyBtn.addEventListener('click', (e) => this.showModal(e, 'Privacidade'));
        this.elements.aboutBtn.addEventListener('click', (e) => this.showModal(e, 'Sobre'));

        // Quick actions
        this.elements.quickButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const message = e.target.getAttribute('data-message');
                this.elements.messageInput.value = message;
                this.handleInput();
                this.sendMessage();
            });
        });

        // Fechar modal clicando fora
        this.elements.infoModal.addEventListener('click', (e) => {
            if (e.target === this.elements.infoModal) {
                this.closeModal();
            }
        });
    }

    handleInput() {
        const hasText = this.elements.messageInput.value.trim().length > 0;
        this.elements.sendBtn.disabled = !hasText;
    }

    handleKeyPress(e) {
        if (e.key === 'Enter' && !this.elements.sendBtn.disabled) {
            this.sendMessage();
        }
    }

    async sendMessage() {
        const message = this.elements.messageInput.value.trim();
        if (!message || this.isTyping) return;

        // Adiciona mensagem do usuário
        this.addMessage(message, 'user');
        this.elements.messageInput.value = '';
        this.handleInput();
        
        // Mostra indicador de digitação
        this.showTypingIndicator(true);

        try {
            // Simula processamento da IA (substitua pela sua API real)
            const response = await this.simulateAIResponse(message);
            
            // Remove indicador e adiciona resposta
            this.showTypingIndicator(false);
            this.addMessage(response, 'bot');
            
        } catch (error) {
            console.error('Erro:', error);
            this.showTypingIndicator(false);
            this.addMessage('Desculpe, ocorreu um erro. Tente novamente.', 'bot');
        }
    }

    async simulateAIResponse(userMessage) {
        // Simula delay de processamento
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

        // Respostas inteligentes baseadas no conteúdo da mensagem
        const lowerMessage = userMessage.toLowerCase();

        if (lowerMessage.includes('oi') || lowerMessage.includes('olá') || lowerMessage.includes('hello')) {
            return 'Olá! É um prazer conversar com você! Como posso ajudá-lo hoje?';
        }

        if (lowerMessage.includes('como você funciona') || lowerMessage.includes('como funciona')) {
            return 'Sou um chatbot inteligente que utiliza processamento de linguagem natural para entender e responder suas perguntas. Funciono 24/7 e estou sempre aprendendo! 🧠';
        }

        if (lowerMessage.includes('recursos') || lowerMessage.includes('funcionalidades')) {
            return 'Meus recursos incluem:\n• Respostas em tempo real\n• Suporte contínuo\n• Processamento de linguagem natural\n• Interface moderna e responsiva\n• Tema claro/escuro\n• E muito mais! 💫';
        }

        if (lowerMessage.includes('problema') || lowerMessage.includes('ajuda') || lowerMessage.includes('suporte')) {
            return 'Entendo que você precisa de ajuda. Para melhor atendimento, por favor descreva detalhadamente o problema que está enfrentando. Estou aqui para ajudar! 🔧';
        }

        if (lowerMessage.includes('nome')) {
            return 'Meu nome é Yume! Fui criado para ser seu assistente virtual inteligente. 😊';
        }

        if (lowerMessage.includes('obrigado') || lowerMessage.includes('thanks')) {
            return 'De nada! Fico feliz em poder ajudar. Se tiver mais alguma dúvida, estou à disposição! 🙏';
        }

        // Resposta padrão para outras mensagens
        const defaultResponses = [
            'Interessante! Conte-me mais sobre isso.',
            'Entendo. Como posso ajudar você com isso?',
            'Ótima pergunta! Deixe-me pensar sobre isso...',
            'Obrigado por compartilhar. O que mais gostaria de saber?',
            'Fascinante! Há algo específico que gostaria de explorar?'
        ];

        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'user' ? '👤' : '🤖';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = content;
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = new Date().toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageContent.appendChild(messageText);
        messageContent.appendChild(messageTime);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        this.elements.chatMessages.appendChild(messageDiv);
        
        // Scroll para a última mensagem
        this.elements.chatMessages.scrollTop = this.elements.chatMessages.scrollHeight;
        
        // Atualiza estatísticas
        if (sender === 'user') {
            this.messagesCount++;
            this.updateStats();
        }
    }

    showTypingIndicator(show = true) {
        this.isTyping = show;
        this.elements.typingIndicator.style.display = show ? 'flex' : 'none';
        
        if (show) {
            this.elements.chatMessages.scrollTop = this.elements.chatMessages.scrollHeight;
        }
    }

    clearChat() {
        this.elements.chatMessages.innerHTML = `
            <div class="message bot-message welcome-message">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="message-text">
                        <strong>Chat limpo! 🧹</strong><br><br>
                        Estou pronto para uma nova conversa. Como posso ajudá-lo?
                    </div>
                    <div class="message-time">${new Date().toLocaleTimeString()}</div>
                </div>
            </div>
        `;
        
        this.messagesCount = 0;
        this.updateStats();
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        localStorage.setItem('chatbot-theme', this.theme);
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        
        const themeIcon = this.elements.themeToggle.querySelector('.theme-icon');
        const themeText = this.elements.themeToggle.querySelector('.theme-text');
        
        if (this.theme === 'dark') {
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Modo Claro';
        } else {
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Modo Escuro';
        }
    }

    updateStats() {
        this.elements.messagesCount.textContent = this.messagesCount;
    }

    setInitialTime() {
        document.getElementById('initialTime').textContent = 
            new Date().toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
    }

    startSessionTimer() {
        setInterval(() => {
            const now = new Date();
            const diff = Math.floor((now - this.sessionStart) / 1000);
            const minutes = Math.floor(diff / 60);
            const seconds = diff % 60;
            this.elements.sessionTime.textContent = 
                `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    showModal(e, type) {
        e.preventDefault();
        
        this.elements.modalTitle.textContent = type;
        
        if (type === 'Privacidade') {
            this.elements.modalContent.innerHTML = `
                <h4>🔒 Nossa Política de Privacidade</h4>
                <p>O ChatBot Genius respeita sua privacidade:</p>
                <ul>
                    <li>✅ Não armazenamos suas mensagens permanentemente</li>
                    <li>✅ Suas conversas são processadas localmente</li>
                    <li>✅ Não coletamos dados pessoais</li>
                    <li>✅ Todo o processamento é seguro</li>
                    <li>✅ Você tem controle total sobre seus dados</li>
                </ul>
                <p><strong>Transparência e segurança são nossas prioridades!</strong></p>
            `;
        } else {
            this.elements.modalContent.innerHTML = `
                <h4>🧠 Sobre o ChatBot Genius</h4>
                <p><strong>ChatBot Genius</strong> é um assistente virtual inteligente desenvolvido com as mais modernas tecnologias web.</p>
                
                <h5>🎯 Missão</h5>
                <p>Fornecer assistência inteligente e acessível para todos os usuários, com interface moderna e recursos avançados.</p>
                
                <h5>🚀 Tecnologias</h5>
                <div class="tech-tags" style="margin: 10px 0;">
                    <span class="tech-tag">JavaScript ES6+</span>
                    <span class="tech-tag">HTML5</span>
                    <span class="tech-tag">CSS3</span>
                    <span class="tech-tag">GitHub Pages</span>
                </div>
                
                <h5>🌟 Características</h5>
                <ul>
                    <li>Interface responsiva e moderna</li>
                    <li>Tema claro/escuro</li>
                    <li>Respostas inteligentes contextualizadas</li>
                    <li>Estatísticas em tempo real</li>
                    <li>Totalmente gratuito</li>
                </ul>
                
                <p><em>Desenvolvido com ❤️ para a comunidade.</em></p>
            `;
        }
        
        this.elements.infoModal.classList.add('show');
    }

    closeModal() {
        this.elements.infoModal.classList.remove('show');
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new ChatBotGenius();
});

// Service Worker para funcionalidade offline (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}