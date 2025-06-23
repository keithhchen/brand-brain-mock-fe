import React, { useState, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

const ChatInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleInput = (e) => {
        setMessage(e.target.value);
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    };

    return (
        <div className="chat-input-container">
            <div className="chat-input-wrapper">
                <textarea
                    ref={textareaRef}
                    className="chat-input"
                    placeholder="请提问，回答基于品牌大脑..."
                    value={message}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    rows="1"
                />
                <button
                    className="send-button"
                    onClick={handleSend}
                    disabled={!message.trim()}
                >
                    <ArrowUp size={20} strokeWidth={2} />
                </button>
            </div>
        </div>
    );
};

export default ChatInput; 