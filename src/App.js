// src/App.js
import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { SocketProvider, useSocket } from './SocketContext';

const Game = () => {
  const socket = useSocket();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on('message', (msg) => setMessages((prev) => [...prev, msg]));
    }
  }, [socket]);

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', message);
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
          <div key={index}>user: {msg}</div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, []);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <SocketProvider>
      <div>
        {user ? (
          <Game />
        ) : (
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        )}
      </div>
    </SocketProvider>
  );
};

export default App;
