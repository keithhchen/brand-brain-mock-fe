import React from 'react';
import './ThinkingStep.css';

const ThinkingStep = ({ iconSvg, label, items, show, showSourceTag = false }) => {
    if (!show || !items || items.length === 0) return null;

    return (
        <div className="thinking-step">
            <div className="step-header">
                <div className="step-icon">
                    {iconSvg}
                </div>
                <div className="step-label">{label}</div>
            </div>
            <div className="step-content">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="step-item"
                        style={{
                            animationDelay: `${index * 300}ms`,
                            opacity: show ? 1 : 0,
                        }}
                    >
                        {showSourceTag && item.source && (
                            <span className="source-tag">{item.source}</span>
                        )}
                        <div className="item-content">
                            {typeof item === 'string' ? item : item.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThinkingStep; 