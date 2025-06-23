import React from 'react';

const ColorScheme = ({ colors }) => {
    return (
        <div className="color-scheme">
            {Object.entries(colors).map(([name, hex]) => (
                <div key={hex} className="color-swatch">
                    <div
                        className="color-preview"
                        style={{
                            backgroundColor: hex,
                            border: hex.toLowerCase() === '#f6f1e7' ? '1px solid #e2e8f0' : 'none'
                        }}
                    />
                    <div className="color-info">
                        <span className="color-name">{name}</span>
                        <span className="color-hex">{hex.toUpperCase()}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ColorScheme; 