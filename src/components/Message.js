import React, { useState, useEffect } from 'react';
import ThinkingStep from './ThinkingStep';

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
        } else if (message.type === 'assistant' && message.content) {
            // If no thinking steps, show content immediately
            setShowContent(true);
        }
    }, [message]);

    if (message.type === 'user') {
        return (
            <div className="message user">
                <div className="message-content">
                    {message.content}
                </div>
            </div>
        );
    }

    return (
        <div className="message assistant">
            <div className="message-content">
                {message.thought && (
                    <ThinkingStep
                        iconSvg={
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M9.25 12a2.75 2.75 0 1 1 5.5 0 2.75 2.75 0 0 1-5.5 0z" />
                                <path d="M12 19.25V15" />
                                <path d="M12 9V4.75" />
                                <path d="M18.25 12H15" />
                                <path d="M9 12H4.75" />
                            </svg>
                        }
                        label="Thought Process"
                        items={message.thought}
                        show={showThinkingSteps.thought}
                        isThinking={true}
                    />
                )}

                {message.action && (
                    <ThinkingStep
                        iconSvg={
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M20 12a8 8 0 1 0-16 0" />
                                <path d="M12 4v8" />
                                <path d="m9 10 3 2 3-2" />
                            </svg>
                        }
                        label="Action Taken"
                        items={message.action}
                        show={showThinkingSteps.action}
                        isThinking={true}
                    />
                )}

                {message.data_source && (
                    <ThinkingStep
                        iconSvg={
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M12 4v16m-8-8h16" />
                            </svg>
                        }
                        label="Data Source"
                        items={message.data_source}
                        show={showThinkingSteps.data_source}
                        showSourceTag={true}
                        isThinking={true}
                    />
                )}

                {message.content && showContent && (
                    <div className="thinking-step">
                        <div className="answer-content">
                            <div
                                className="content-section"
                                dangerouslySetInnerHTML={{ __html: message.content }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Message; 