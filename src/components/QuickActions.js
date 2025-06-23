import React from 'react';

const QuickActions = ({ onActionClick }) => {
    const quickActions = [
        '分析我的主粮品牌本月表现',
        '哪些主粮SKU投放效果最好？',
        '最近宠物主评论有什么变化？',
        '帮我分析竞品主粮策略'
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