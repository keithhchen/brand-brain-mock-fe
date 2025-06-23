import React from 'react';
import './ThinkingStep.css';

const ThinkingStep = ({ iconSvg, label, items, show, isThinking = false, showSourceTag = false }) => {
    if (!show || !items || items.length === 0) return null;

    const renderActionTags = (item) => {
        if (!item.tool) return null;
        return (
            <div className="action-tags">
                <span className="action-tag tool">{item.tool}</span>
                <span className="action-tag scope">{item.scope}</span>
                <span className="action-tag count">{item.count}</span>
            </div>
        );
    };

    return (
        <div className="thinking-step">
            <div className="step-header">
                <div className="step-icon">
                    {iconSvg}
                </div>
                <div className="step-label">{label}</div>
            </div>
            <div className={`${isThinking ? 'step-content' : 'answer-content'}`}>
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="step-item"
                        style={{
                            animationDelay: `${index * 300}ms`,
                            opacity: show ? 1 : 0,
                        }}
                    >
                        {showSourceTag && (
                            <span className="source-tag">{item}</span>
                        )}
                        {item.tool ? (
                            renderActionTags(item)
                        ) : (
                            <div className="item-content">
                                {typeof item === 'string' ? item : item.content}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThinkingStep; 