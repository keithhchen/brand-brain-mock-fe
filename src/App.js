import React, { useState, useEffect } from 'react';
import './App.css';
import ChatContainer from './components/ChatContainer';
import DataPanel from './components/DataPanel';
import { loadResponses } from './utils/yamlLoader';

function App() {
    const [responses, setResponses] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeApp = async () => {
            try {
                const responseData = await loadResponses();
                setResponses(responseData);
            } catch (error) {
                console.error('Failed to load responses:', error);
            } finally {
                setLoading(false);
            }
        };

        initializeApp();
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