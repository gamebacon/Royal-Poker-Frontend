// src/App.js
import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useSocket } from './SocketContext';
import Game from './game/Game';
import LoginModal from './login/LoginModal';
import { LuLoader2 } from 'react-icons/lu';

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      console.info('Socket initialized in App');
    } else {
      console.info('Socket not yet initialized');
    }
  }, [socket]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setLoading(true);
        const token = await user.getIdToken();
        setLoading(false);
        console.info('User authenticated:', user.name);
        if (socket) {
          console.info('Setting socket auth and connecting');
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
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      setLoading(false);
      setUser(result.user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };


  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setLoading(false);
      setUser(null);
      if (socket) {
        socket.disconnect();
      }
      console.info('User signed out successfully');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div
      className='relative h-screen w-screen p-10'
    >
      <div
        className='bg-gradient-to-br from-[#354c7c] to-[#022954] rounded-3xl w-full h-full'
      >
      {user ? (
        <Game 
          signOut={handleSignOut}
          socket={socket}
          user={user}
        />
      ) : (
          !isLoading ?
          <LoginModal
            onSubmit={signInWithGoogle}
          /> : 
          <LuLoader2
          className='animate-spin absolute top-1/2 left-1/2 text-white'
            size={64}
          />
      )
    }
      </div>
  </div>
  );
};

export default App;
