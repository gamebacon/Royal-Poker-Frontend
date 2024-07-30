// src/Game.js
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Chat from '../chat/Chat';
import LogoutButton from '../generic/LogoutButton';
import Table from '../table/Table';

const Game = ({ signOut, socket }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket) {
      console.log('Socket initialized in Game:', socket);

      const handleConnect = () => {
        console.log('Connected to backend');
      };

      const handleConnectError = (error) => {
        console.log('Connection error:', error);
      };

      const handleDisconnect = () => {
        console.log('Disconnected from backend');
      };

      const handleChatUpdate = (newMessages) => {
        setMessages(newMessages);
      };

      const handleUserJoined = (joinMessage) => {
        setMessages(prevMessages => [...prevMessages, joinMessage]);
      };

      socket.on('connect', handleConnect);
      socket.on('connect_error', handleConnectError);
      socket.on('disconnect', handleDisconnect);
      socket.on('chatUpdate', handleChatUpdate);
      socket.on('userJoined', handleUserJoined);

      return () => {
        socket.off('connect', handleConnect);
        socket.off('connect_error', handleConnectError);
        socket.off('disconnect', handleDisconnect);
        socket.off('chatUpdate', handleChatUpdate);
        socket.off('userJoined', handleUserJoined);
      };
    }
  }, [socket]);

  return (
    <div
      className='w-full h-full'
    >
      <Chat
        socket={socket}
        messages={messages}
      />
      <Table/>
      <LogoutButton
        onClick={signOut}
      />
    </div>
  );
};

Game.propTypes = {
  signOut: propTypes.func.isRequired,
  socket: propTypes.any.isRequired,
};

export default Game;
