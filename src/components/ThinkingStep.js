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

    const renderContent = (content, isDataSource = false) => {
        if (typeof content !== 'string') return content;

        if (isDataSource) {
            const lines = content.split('\n');
            return (
                <div className="data-source-links">
                    {lines.map((line, index) => (
                        <a
                            key={index}
                            href="#"
                            className="data-source-link"
                            onClick={(e) => e.preventDefault()}
                        >
                            {line.trim()}
                        </a>
                    ))}
                </div>
            );
        }

        return <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} />;
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
                        {item.tool ? (
                            renderActionTags(item)
                        ) : (
                            <div className="item-content">
                                {renderContent(typeof item === 'string' ? item : item.content, label === "数据来源")}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThinkingStep; 