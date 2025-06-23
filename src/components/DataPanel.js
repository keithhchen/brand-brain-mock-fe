import React from 'react';
import { Sparkles } from 'lucide-react';

const DataPanel = ({ responses }) => {
    const handleInspirationClick = (question) => {
        // This will be handled by the parent component through a callback
        if (window.sendMessage) {
            window.sendMessage(question);
        }
    };

    const isEmpty = !responses || Object.keys(responses).length === 0;

    return (
        <div className="data-panel">
            <h2>灵感</h2>
            {isEmpty ? (
                <div className="empty-state">
                    <Sparkles size={24} strokeWidth={1} className="empty-icon" />
                    <div className="empty-text">对话开始后，自动探索全网灵感</div>
                </div>
            ) : (
                <div className="inspiration-list">
                    {Object.keys(responses).map((question, index) => (
                        <div
                            key={index}
                            className="inspiration-item"
                            onClick={() => handleInspirationClick(question)}
                        >
                            <div className="inspiration-title">{question}</div>
                            <div className="inspiration-desc">点击查看详细分析</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DataPanel; 