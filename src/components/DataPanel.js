import React, { useState, useEffect } from 'react';
import { Tooltip, styled } from '@mui/material';
import WordCloud from './WordCloud';
import ColorScheme from './ColorScheme';

// Custom styled Tooltip
const StyledTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    '& .MuiTooltip-tooltip': {
        backgroundColor: 'rgba(45, 55, 72, 0.95)',
        color: '#fff',
        fontSize: '12px',
        padding: '12px 16px',
        borderRadius: '8px',
        maxWidth: '280px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lineHeight: '1.6'
    },
    '& .MuiTooltip-arrow': {
        color: 'rgba(45, 55, 72, 0.95)',
    }
});

const DataPanel = ({ responses }) => {
    const [brandData, setBrandData] = useState(null);

    useEffect(() => {
        fetch('/brand.json')
            .then(response => response.json())
            .then(data => setBrandData(data))
            .catch(error => console.error('Error loading brand data:', error));
    }, []);

    if (!brandData) return null;

    // Helper function to render simple key-value pairs
    const renderSimplePairs = (obj) => {
        return Object.entries(obj).map(([key, value]) => {
            // Skip nested objects and special fields
            if ((typeof value === 'object' && !Array.isArray(value)) || key === 'hex') return null;
            if (['last_updated', 'update_source', '用户印象'].includes(key)) return null;

            return (
                <div key={key} className="brand-item">
                    <span className="brand-tag">{key}</span>
                    <div className="brand-value">
                        {Array.isArray(value) ? (
                            <div className="brand-array-value">
                                {value.map((item, index) => (
                                    <span key={index} className={item.length > 5 ? "array-item" : "array-item-tag"}>
                                        {typeof item === 'object' ? null : item}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            value
                        )}
                    </div>
                </div>
            );
        });
    };

    // Render a section with its timestamp and tooltip
    const renderSection = (title, data) => {
        if (!data) return null;

        return (
            <div className="brand-section">
                <div className="section-header">
                    <h3>{title}</h3>
                    {data.last_updated && (
                        <StyledTooltip
                            title={data.update_source || ''}
                            placement="top"
                            arrow
                            enterDelay={200}
                            leaveDelay={150}
                            TransitionProps={{ timeout: 200 }}
                        >
                            <div className="timestamp">
                                最后更新：{new Date(data.last_updated).toLocaleString('zh-CN', {
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false
                                }).replace('/', '-')}
                            </div>
                        </StyledTooltip>
                    )}
                </div>
                <div className="section-content">
                    {renderSimplePairs(data)}
                    {data['用户印象'] && (
                        <div className="brand-item">
                            <span className="brand-tag">用户印象</span>
                            <WordCloud
                                words={data['用户印象'].map(item => ({
                                    text: item.text,
                                    value: item.weight
                                }))}
                            />
                        </div>
                    )}
                    {data.hex && (
                        <div className="brand-item">
                            <span className="brand-tag">配色方案</span>
                            <ColorScheme colors={data.hex} />
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="data-panel">
            {/* <h2>品牌大脑</h2> */}
            <div className="brand-sections">
                {renderSection('品牌核心', brandData['品牌核心'])}
                {renderSection('消费者洞察', brandData['消费者洞察'])}
                {renderSection('市场格局', brandData['市场格局'])}
                {renderSection('价值主张', brandData['价值主张'])}
                {renderSection('品牌人格', brandData['品牌人格'])}
                {renderSection('视觉', brandData['视觉'])}
            </div>
        </div>
    );
};

export default DataPanel; 