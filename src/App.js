// src/App.js
import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useSocket } from './SocketContext';
import Game from './Game';
import LoginModal from './login/LoginModal';

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
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        console.log('User authenticated:', user);
        if (socket) {
          console.log('Setting socket auth and connecting');
          socket.auth = { token };
          socket.connect();
        }
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [socket]);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };


  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      if (socket) {
        socket.disconnect();
      }
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div
      className='h-screen w-screen relative'
    >
      {user ? (
        <Game 
          signOut={handleSignOut}
        />
      ) : (
        <LoginModal
          onSubmit={signInWithGoogle}
        />
      )}
    </div>
  );
};

export default App;
