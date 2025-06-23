import React, { useState, useEffect } from 'react';
import ThinkingStep from './ThinkingStep';

const Message = ({ message }) => {
    const [showThinkingSteps, setShowThinkingSteps] = useState(false);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        if (message.type === 'assistant' && (message.thought || message.action || message.data_source)) {
            // Show thinking steps after a short delay
            const timer = setTimeout(() => {
                setShowThinkingSteps(true);
            }, 500);

            // Calculate total animation time for thinking steps
            const thoughtItems = message.thought ? message.thought.length : 0;
            const actionItems = message.action ? message.action.length : 0;
            const dataItems = message.data_source ? message.data_source.length : 0;
            const totalItems = thoughtItems + actionItems + dataItems;
            const totalAnimationTime = totalItems * 300 + 500; // 300ms per item + initial delay

            // Show content after all thinking steps are complete
            const contentTimer = setTimeout(() => {
                setShowContent(true);
            }, totalAnimationTime);

            return () => {
                clearTimeout(timer);
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
                        show={showThinkingSteps}
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
                        show={showThinkingSteps}
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
                        show={showThinkingSteps}
                        showSourceTag={true}
                    />
                )}

                {message.content && showContent && (
                    <div className="thinking-step">
                        <div className="step-content">
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