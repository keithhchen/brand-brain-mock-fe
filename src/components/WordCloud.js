import React, { useRef, useEffect, useState } from 'react';
import ReactWordcloud from 'react-wordcloud';

const WordCloud = ({ words }) => {
    const containerRef = useRef(null);
    const [size, setSize] = useState([300, 200]);

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                setSize([width - 32, 200]); // Subtract padding
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const options = {
        colors: ['#667eea', '#764ba2', '#8a5cf6', '#9333ea', '#a855f7'],
        enableTooltip: false,
        deterministic: true,
        fontFamily: 'inter',
        fontSizes: [14, 28],
        fontStyle: 'normal',
        fontWeight: 'normal',
        padding: 2,
        rotations: 2,
        rotationAngles: [0, 0],
        scale: 'sqrt',
        spiral: 'archimedean',
        transitionDuration: 1000,
    };

    return (
        <div className="word-cloud-container" ref={containerRef}>
            <ReactWordcloud
                words={words}
                options={options}
                size={size}
            />
        </div>
    );
};

export default WordCloud; 