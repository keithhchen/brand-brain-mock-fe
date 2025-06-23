import React from 'react';

const QuickActions = ({ onActionClick }) => {
    const quickActions = [
        '与我品牌调性最匹配的 TOP10 达人是哪些？',
        '有哪些平台上的评论正在影响我品牌认知？',
        '我的商品最受欢迎的卖点是什么？',
    ];

    return (
        <div className="quick-actions">
            {quickActions.map((action, index) => (
                <div
                    key={index}
                    className="quick-action"
                    onClick={() => onActionClick(action)}
                >
                    {action}
                </div>
            ))}
        </div>
    );
};

export default QuickActions; 