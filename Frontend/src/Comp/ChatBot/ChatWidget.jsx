import React, { useState, useRef, useEffect } from 'react';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    // CHANGE 1: Use an array to store the conversation history
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // Auto-scroll ref
    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!query.trim()) return;

        // 1. Add User Message to History immediately
        const userMessage = { role: 'user', text: query };
        setMessages(prev => [...prev, userMessage]);

        setLoading(true);
        setQuery(''); // Clear input

        try {
            const res = await fetch('https://daily-pantry-ai-8f5z.onrender.com/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: query }),
            });

            const data = await res.json();

            // 2. Add AI Response to History
            const botMessage = { role: 'bot', text: data.reply };
            setMessages(prev => [...prev, botMessage]);

        } catch (error) {
            const errorMessage = { role: 'bot', text: "Error: Could not connect to server." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>

            {isOpen && (
                <div style={{
                    width: '350px',
                    height: '450px', // Fixed spelling: height
                    backgroundColor: "white",
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    display: "flex",
                    flexDirection: 'column',
                    marginBottom: '10px',
                    overflow: 'hidden'
                }}>
                    {/* Header */}
                    <div style={{ background: '#222', color: '#fff', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>AI Assistant</span>
                        <button onClick={toggleChat} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>X</button>
                    </div>

                    {/* Response Area (Chat History) */}
                    <div style={{ flex: 1, padding: '15px', overflowY: 'auto', background: '#f9f9f9', fontSize: '14px' }}>

                        {messages.length === 0 && (
                            <p style={{ color: '#888', fontStyle: 'italic', textAlign: 'center', marginTop: '50%' }}>
                                Ask me about our fresh products...
                            </p>
                        )}

                        {/* CHANGE 2: Map through messages array */}
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                    marginBottom: '10px'
                                }}
                            >
                                <div style={{
                                    maxWidth: '80%',
                                    padding: '10px',
                                    borderRadius: '10px',
                                    backgroundColor: msg.role === 'user' ? '#28a745' : '#e0e0e0', // Green for user, Gray for bot
                                    color: msg.role === 'user' ? 'white' : 'black',
                                    whiteSpace: 'pre-wrap',
                                    lineHeight: '1.4'
                                }}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div style={{ textAlign: 'left', color: '#888', fontStyle: 'italic', marginLeft: '10px' }}>
                                Typing...
                            </div>
                        )}

                        {/* Invisible div to auto-scroll to */}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div style={{ padding: '10px', borderTop: '1px solid #ddd', display: 'flex' }}>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Ask anything..."
                            style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '5px' }}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button
                            onClick={handleSend}
                            disabled={loading}
                            style={{ background: '#28a745', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={toggleChat}
                style={{
                    width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#28a745',
                    color: 'white', border: 'none', boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                    cursor: 'pointer', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
            >
                💬
            </button>
        </div>
    );
};

export default ChatWidget;