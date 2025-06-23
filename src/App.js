import React, { useState, useEffect } from 'react';
import './App.css';
import ChatContainer from './components/ChatContainer';
import DataPanel from './components/DataPanel';
import { Monitor } from 'lucide-react';

const MobileBlocker = () => (
    <div className="mobile-blocker">
        <Monitor size={48} strokeWidth={1} />
        <h2>请在电脑端访问</h2>
        <p>为了获得最佳体验，请使用桌面电脑访问本页面</p>
    </div>
);

function App() {
    const [mockResponses, setMockResponses] = useState(null);
    const [activeResponses, setActiveResponses] = useState({});
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

                setMockResponses(responsesMap);
            } catch (error) {
                console.error('Failed to load responses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResponses();
    }, []);

    const handleNewMessage = (question, response) => {
        setActiveResponses(prev => ({
            ...prev,
            [question]: response
        }));
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>加载中...</p>
            </div>
        );
    }

    return (
        <>
            <MobileBlocker />
            <div className="body-wrapper">
                <div className="page-title">
                    <h1>品牌大脑</h1>
                </div>
                <div className="main-container">
                    <div className="content-container">
                        <DataPanel responses={activeResponses} />
                        <ChatContainer
                            responses={mockResponses}
                            onNewMessage={handleNewMessage}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App; 