import React from 'react';
import './ThinkingStep.css';

const ThinkingStep = ({ iconSvg, label, items, show, isThinking = false }) => {
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

    const renderContent = (content, isDataSource = false, itemIndex = 0) => {
        if (typeof content !== 'string') return content;

        const lines = content.split('\n');
        const baseDelay = itemIndex * 300; // Base delay for each item

        if (isDataSource) {
            return (
                <div className="data-source-links">
                    {lines.map((line, lineIndex) => (
                        <a
                            key={lineIndex}
                            href="#"
                            className="data-source-link"
                            onClick={(e) => e.preventDefault()}
                            style={{
                                animationDelay: `${baseDelay + (lineIndex * 150)}ms`,
                            }}
                        >
                            {line.trim()}
                        </a>
                    ))}
                </div>
            );
        }

        return (
            <div className="content-lines">
                {lines.map((line, lineIndex) => (
                    <div
                        key={lineIndex}
                        className="content-line"
                        style={{
                            animationDelay: `${baseDelay + (lineIndex * 150)}ms`,
                        }}
                    >
                        {line}
                    </div>
                ))}
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
                            opacity: show ? 1 : 0,
                        }}
                    >
                        {item.tool ? (
                            <div style={{ animationDelay: `${index * 300}ms` }} className="animate-in">
                                {renderActionTags(item)}
                            </div>
                        ) : (
                            <div className="item-content">
                                {renderContent(typeof item === 'string' ? item : item.content, label === "数据来源", index)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThinkingStep; 