// src/App.js
import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { SocketProvider, useSocket } from './SocketContext';
import Game from './Game';

const App = () => {
  const [user, setUser] = useState(null);
  const socket = useSocket();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        console.log('User authenticated:', user);
        console.log('Auth token:', token);

        if (socket) {
          console.log('Setting socket auth and connecting');
        console.log('con 2')
          socket.auth = { token };
          socket.connect();
        }
        setUser(user);
      }
    });
    return () => unsubscribe();
  }, [socket]);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      const token = await result.user.getIdToken();
      console.log('Signed in user:', result.user);
      console.log('Auth token:', token);

      if (socket) {
        console.log('Setting socket auth and connecting');
        console.log('con 1')
        socket.auth = { token };
        socket.connect();
      }
    } catch (error) {
      console.error('Error signing in with Google: ', error);
    }
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
