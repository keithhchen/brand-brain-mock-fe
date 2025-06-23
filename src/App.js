import React, { useState, useEffect } from 'react';
import './App.css';
import ChatContainer from './components/ChatContainer';
import DataPanel from './components/DataPanel';

function App() {
    const [responses, setResponses] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const response = await fetch('/mock_responses.json');
                const data = await response.json();

                // Convert array to question-keyed object for easier lookup
                const responsesMap = {};
                data.forEach(item => {
                    responsesMap[item.question] = item;
                });

                setResponses(responsesMap);
            } catch (error) {
                console.error('Failed to load responses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResponses();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>加载中...</p>
            </div>
        );
    }

    return (
        <div className="body-wrapper">
            <div className="page-title">
                <h1>品牌大脑</h1>
            </div>
            <div className="main-container">
                <div className="content-container">
                    <DataPanel responses={responses} />
                    <ChatContainer responses={responses} />
                </div>
            </div>
        </div>
    );
}

export default App; 