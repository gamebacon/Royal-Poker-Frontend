// src/App.js
import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useSocket } from './SocketContext';
import Game from './Game';

const App = () => {
  const [user, setUser] = useState(null);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      console.log('Socket initialized in App:', socket);
    } else {
      console.log('Socket not yet initialized');
    }
  }, [socket]);

  useEffect(() => {
    if (socket && user) {
      const authenticateSocket = async () => {
        const token = await user.getIdToken();
        console.log('User authenticated:', user);
        console.log('Setting socket auth and connecting');
        socket.auth = { token };
        socket.connect();
      };
      authenticateSocket();
    }
  }, [socket, user]);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div>
      {user ? (
        <Game />
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
};

export default App;
