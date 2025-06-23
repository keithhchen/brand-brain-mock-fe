import React, { useState, useRef, useEffect, useCallback } from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import ChatInput from './ChatInput';
import QuickActions from './QuickActions';

const ChatContainer = ({ responses }) => {
    const [messages, setMessages] = useState([
        {
            type: 'assistant',
            response: '您好，我是本养派的品牌大脑，可以分析市场趋势、优化产品策略、解读消费者洞察，请问您想了解什么？'
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const sendMessage = useCallback(async (messageText) => {
        if (!messageText.trim()) return;

        // Add user message
        const userMessage = {
            type: 'user',
            question: messageText
        };
        setMessages(prev => [...prev, userMessage]);

        // Show typing indicator
        setIsTyping(true);

        // Check if we have a response for this message
        if (!responses[messageText]) {
            setIsTyping(false);
            setMessages(prev => [...prev, {
                type: 'assistant',
                response: '抱歉，我还不知道如何回答这个问题。'
            }]);
            return;
        }

        // Generate AI response
        const response = responses[messageText];

        // Create assistant message with thinking steps
        const assistantMessage = {
            type: 'assistant',
            thought: response.thought,
            action: response.action,
            data_source: response.data_source,
            response: response.response
        };

        setIsTyping(false);
        setMessages(prev => [...prev, assistantMessage]);
    }, [responses]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Make sendMessage available globally for DataPanel
    useEffect(() => {
        window.sendMessage = sendMessage;
        return () => {
            delete window.sendMessage;
        };
    }, [sendMessage]);

    return (
        <div className="chat-container">
            <div className="chat-header">
                <div className="chat-title">AI 助手</div>
                <div className="chat-subtitle">品牌人格 · 智能分析 · 策略决策</div>
            </div>

            <div className="chat-messages">
                {messages.map((message, index) => (
                    <Message key={index} message={message} />
                ))}

                <QuickActions onActionClick={sendMessage} />

                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
            </div>

            <ChatInput onSendMessage={sendMessage} />
        </div>
    );
};

export default ChatContainer; 