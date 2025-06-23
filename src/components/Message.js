import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ThinkingStep from './ThinkingStep';
import { Sparkles, Search, Database } from 'lucide-react';

const Message = ({ message }) => {
    const [showThinkingSteps, setShowThinkingSteps] = useState({
        thought: false,
        action: false,
        data_source: false
    });
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        if (message.type === 'assistant' && (message.thought || message.action || message.data_source)) {
            // Show thinking steps in sequence
            const thoughtDelay = 500;
            const stepDuration = 1000; // Time to show each step

            // Show thought process first
            if (message.thought) {
                setTimeout(() => {
                    setShowThinkingSteps(prev => ({ ...prev, thought: true }));
                }, thoughtDelay);
            }

            // Show action after thought
            if (message.action) {
                setTimeout(() => {
                    setShowThinkingSteps(prev => ({ ...prev, action: true }));
                }, thoughtDelay + stepDuration);
            }

            // Show data source after action
            if (message.data_source) {
                setTimeout(() => {
                    setShowThinkingSteps(prev => ({ ...prev, data_source: true }));
                }, thoughtDelay + (stepDuration * 2));
            }

            // Show final content after all steps
            const totalSteps = [message.thought, message.action, message.data_source].filter(Boolean).length;
            const contentTimer = setTimeout(() => {
                setShowContent(true);
            }, thoughtDelay + (stepDuration * totalSteps));

            return () => {
                clearTimeout(contentTimer);
            };
        } else if (message.type === 'assistant' && message.response) {
            // If no thinking steps, show content immediately
            setShowContent(true);
        }
    }, [message]);

    if (message.type === 'user') {
        return (
            <div className="message user">
                <div className="message-content">
                    {message.question}
                </div>
            </div>
        );
    }

    return (
        <div className="message assistant">
            <div className="message-content">
                {message.thought && (
                    <ThinkingStep
                        iconSvg={<Sparkles size={20} strokeWidth={1} />}
                        label="思考"
                        items={[message.thought]}
                        show={showThinkingSteps.thought}
                        isThinking={true}
                    />
                )}

                {message.action && (
                    <ThinkingStep
                        iconSvg={<Search size={20} strokeWidth={1} />}
                        label="工具调用"
                        items={message.action}
                        show={showThinkingSteps.action}
                        isThinking={true}
                    />
                )}

                {message.data_source && (
                    <ThinkingStep
                        iconSvg={<Database size={20} strokeWidth={1} />}
                        label="数据来源"
                        items={message.data_source}
                        show={showThinkingSteps.data_source}
                        isThinking={true}
                    />
                )}

                {message.response && showContent && (
                    <div className="thinking-step">
                        <div className="answer-content">
                            <div className="content-section">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        // Override default link rendering to open in new tab
                                        a: ({ node, children, ...props }) => (
                                            <a target="_blank" rel="noopener noreferrer" {...props}>
                                                {children}
                                            </a>
                                        ),
                                        // Ensure code blocks are properly styled
                                        code: ({ node, inline, ...props }) => (
                                            <code className={inline ? 'inline-code' : 'code-block'} {...props} />
                                        )
                                    }}
                                >
                                    {message.response}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Message; 