// src/Game.js
import React, { useState, useEffect } from 'react';
import { useSocket } from './SocketContext';

const Game = () => {
  const socket = useSocket();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);



  useEffect(() => {
    if (socket) {
      console.log('Socket initialized in Game:', socket);

      socket.on('connect', () => {
        console.log('Connected to backend');
      });

      socket.on('connect_error', (error) => {
        console.log('Connection error:', error);
      });

      socket.on('message', (msg) => {
        console.log('New message received:', msg); // Log received messages
        setMessages((prev) => [...prev, msg]);
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from backend');
      });

      return () => {
        socket.off('message');
        socket.off('connect');
        socket.off('disconnect');
      };
    }
  }, [socket]);

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', message);
      console.log('Message sent:', message); // Log the message sent
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Game</h1>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user.displayName}:</strong> {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
