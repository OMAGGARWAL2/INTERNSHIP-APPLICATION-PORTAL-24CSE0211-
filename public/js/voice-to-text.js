// Voice-to-text functionality for hands-free posting
class VoiceToText {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.finalTranscript = '';
        this.interimTranscript = '';
        this.textarea = null;
        this.button = null;
        this.init();
    }

    init() {
        // Check for speech recognition support
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.setupRecognition();
        } else {
            console.warn('Speech recognition not supported in this browser');
        }
    }

    setupRecognition() {
        // Configure recognition settings
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        // Event handlers
        this.recognition.onstart = () => {
            this.isListening = true;
            this.updateButtonState();
            console.log('Voice recognition started');
        };

        this.recognition.onresult = (event) => {
            this.handleRecognitionResult(event);
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            this.stopListening();
            this.showError(`Error: ${event.error}`);
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.updateButtonState();
            console.log('Voice recognition ended');
            
            // If button is still in "stop" state, restart recognition
            if (this.button && this.button.classList.contains('listening')) {
                this.startListening();
            }
        };
    }

    handleRecognitionResult(event) {
        this.finalTranscript = '';
        this.interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            
            if (event.results[i].isFinal) {
                this.finalTranscript += transcript + ' ';
            } else {
                this.interimTranscript += transcript;
            }
        }

        // Update textarea with combined text
        if (this.textarea) {
            const currentText = this.textarea.value;
            const newText = currentText + this.finalTranscript + this.interimTranscript;
            this.textarea.value = newText;
            
            // Move cursor to end
            this.textarea.focus();
            this.textarea.setSelectionRange(newText.length, newText.length);
        }

        // Update button text with interim results for feedback
        if (this.button) {
            const displayText = this.interimTranscript || this.finalTranscript || 'Listening...';
            this.button.title = displayText;
        }
    }

    attachToTextarea(textareaId, buttonId) {
        this.textarea = document.getElementById(textareaId);
        this.button = document.getElementById(buttonId);

        if (this.textarea && this.button && this.recognition) {
            this.button.addEventListener('click', () => {
                if (this.isListening) {
                    this.stopListening();
                } else {
                    this.startListening();
                }
            });
            
            // Add visual feedback
            this.updateButtonState();
        } else {
            console.warn('Could not attach voice-to-text: missing elements or recognition support');
        }
    }

    startListening() {
        if (this.recognition && !this.isListening) {
            try {
                this.finalTranscript = '';
                this.interimTranscript = '';
                this.recognition.start();
            } catch (error) {
                console.error('Error starting speech recognition', error);
                this.showError('Could not start voice recognition');
            }
        }
    }

    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
    }

    updateButtonState() {
        if (this.button) {
            if (this.isListening) {
                this.button.classList.add('listening');
                this.button.innerHTML = '<i class="fas fa-microphone"></i> Stop';
                this.button.title = 'Click to stop listening';
                this.button.style.background = 'var(--primary-gradient)';
            } else {
                this.button.classList.remove('listening');
                this.button.innerHTML = '<i class="fas fa-microphone"></i> Voice to Text';
                this.button.title = 'Click to start voice recognition';
                this.button.style.background = '';
            }
        }
    }

    showError(message) {
        if (this.button) {
            const originalHTML = this.button.innerHTML;
            const originalTitle = this.button.title;
            
            this.button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
            this.button.title = message;
            this.button.style.background = '#ef4444';
            
            // Revert after 3 seconds
            setTimeout(() => {
                this.button.innerHTML = originalHTML;
                this.button.title = originalTitle;
                this.updateButtonState();
            }, 3000);
        }
        
        // Also show alert for critical errors
        if (message.includes('not supported') || message.includes('blocked')) {
            alert(message);
        }
    }

    // Method to add voice-to-text to any textarea
    addVoiceToText(textareaId) {
        const textarea = document.getElementById(textareaId);
        if (!textarea) return;

        // Create voice button
        const voiceButton = document.createElement('button');
        voiceButton.id = `${textareaId}-voice-btn`;
        voiceButton.type = 'button';
        voiceButton.className = 'action-btn';
        voiceButton.innerHTML = '<i class="fas fa-microphone"></i> Voice';
        voiceButton.title = 'Voice to text';
        
        // Add to textarea's parent or nearby
        const parent = textarea.parentElement;
        if (parent) {
            // Insert button after textarea
            parent.insertBefore(voiceButton, textarea.nextSibling);
            
            // Add some spacing
            const spacer = document.createElement('div');
            spacer.style.margin = '0.5rem 0';
            parent.insertBefore(spacer, voiceButton.nextSibling);
        }

        // Attach functionality
        this.attachToTextarea(textareaId, voiceButton.id);
    }
}

// Initialize voice-to-text when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.voiceToText = new VoiceToText();
    
    // Auto-attach to post textarea if it exists
    if (document.getElementById('postContent')) {
        window.voiceToText.addVoiceToText('postContent');
    }
    
    // Also attach to comment textareas when they're created
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('post-action') && e.target.textContent.includes('Comment')) {
            // Wait for comment modal to be created
            setTimeout(() => {
                const commentText = document.getElementById('commentText');
                if (commentText && !document.getElementById('commentText-voice-btn')) {
                    window.voiceToText.addVoiceToText('commentText');
                }
            }, 100);
        }
    });
});