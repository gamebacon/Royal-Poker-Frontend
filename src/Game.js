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
        console.log(msg);
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
    <div
      className='bg-blue- 500'
    >
      <h1>Game</h1>
      <div
        className='flex'
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='border p-1 rounded-sm'
        />
        <button 
          className='border p-2 rounded-sm'
        onClick={sendMessage}>Send</button>
      </div>
      <div>
        <ol>
        {messages.map((msg, index) => (
          <li>
            <div 
              className='flex items-center space-x-2'
              key={index}
            >
              <img
                className='rounded-full h-6'
                src={msg.user.image}
                alt='profile-image'
              />
              <strong>{msg.user.displayName}:</strong>
              <span
                className='text-blue-400'
              >
               {msg.text}
              </span>
            </div>
          </li>
        ))}
        </ol>
      </div>
    </div>
  );
};

export default Game;
