// components/ChatBox.js
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function ChatBox({ user }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Seller', text: 'Hello, how can I help you?', time: '10:00 AM' },
    { id: 2, sender: 'Buyer', text: 'Is the iPhone still available?', time: '10:02 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const msg = {
      id: Date.now(),
      sender: user || 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    // Update locally
    setMessages((prev) => [...prev, msg]);
    
    // Send to backend via socket.io
    socket.emit('sendMessage', msg);
    
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-96 bg-white dark:bg-gray-800 rounded-lg shadow">
      {/* Chat Header */}
      <div className="p-4 border-b dark:border-gray-700 font-semibold">
        Chat with {user === 'Buyer' ? 'Seller' : 'Buyer'}
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === user ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-2 rounded-lg ${
                msg.sender === user
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-xs text-gray-300 block mt-1">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-4 border-t dark:border-gray-700 flex space-x-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded focus:ring focus:ring-blue-300"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
