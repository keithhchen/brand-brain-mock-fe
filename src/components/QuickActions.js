import React from 'react';

const QuickActions = ({ onActionClick }) => {
    const quickActions = [
        '我们的品牌内容总说不清楚，怎么调整表达？',
        '我们的目标用户和实际购买人不一致怎么办？',
        '我们铺了几个平台，怎么判断哪个是我们的核心主场？',
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