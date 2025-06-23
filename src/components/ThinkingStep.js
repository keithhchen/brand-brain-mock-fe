import React, { useState, useEffect } from 'react';

const ThinkingStep = ({ iconSvg, label, items, show, showSourceTag = false }) => {
    const [displayedItems, setDisplayedItems] = useState([]);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (show && items && items.length > 0) {
            // Reset state when show becomes true
            setDisplayedItems([]);
            setIsComplete(false);

            let currentIndex = 0;
            const timer = setInterval(() => {
                if (currentIndex < items.length) {
                    setDisplayedItems(prevItems => [...prevItems, items[currentIndex]]);
                    currentIndex++;
                } else {
                    clearInterval(timer);
                    setIsComplete(true);
                }
            }, 300);

            return () => clearInterval(timer);
        }
    }, [show, items]);

    // Reset when items change
    useEffect(() => {
        setDisplayedItems([]);
        setIsComplete(false);
    }, [items]);

    if (!show) return null;

    return (
        <div className="thinking-step">
            <div className={`step-icon ${label.toLowerCase().replace(' ', '')}`}>
                {iconSvg}
            </div>
            <div className="step-content">
                <div className="step-label">{label}</div>
                <div className="step-text">
                    {displayedItems.map((item, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && <br />}• {item}
                        </React.Fragment>
                    ))}
                    {showSourceTag && isComplete && (
                        <div className="data-source-tag">来源</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ThinkingStep; 