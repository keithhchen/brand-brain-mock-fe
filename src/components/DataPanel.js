import React from 'react';

const DataPanel = ({ responses }) => {
    const handleInspirationClick = (question) => {
        // This will be handled by the parent component through a callback
        if (window.sendMessage) {
            window.sendMessage(question);
        }
    };

    return (
        <div className="data-panel">
            <h2>灵感</h2>
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
        </div>
    );
};

export default DataPanel; 