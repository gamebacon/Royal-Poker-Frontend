// src/Game.js
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Chat from '../chat/Chat';
import LogoutButton from '../generic/LogoutButton';
import Table from '../table/Table';

const Game = ({ signOut, socket, user }) => {
  const [game, setGame] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket) {
      console.info('Socket initialized in Game');

      const handleConnect = () => {
        console.info('Connected to backend');
      };

      const handleConnectError = (error) => {
        console.info('Connection error:', error);
      };

      const handleDisconnect = () => {
        console.info('Disconnected from backend');
      };

      const handleChatUpdate = (newMessages) => {
        setMessages(newMessages);
      };

      const handleUserJoined = (user) => {
        // setMessages(prevMessages => [...prevMessages, joinMessage]);
      };

      const handleGameUpdate = (gameUpdate) => {
        setGame(gameUpdate);
      };

      socket.on('connect', handleConnect);
      socket.on('connect_error', handleConnectError);
      socket.on('disconnect', handleDisconnect);
      socket.on('chatUpdate', handleChatUpdate);
      socket.on('userJoined', handleUserJoined);
      socket.on('gameUpdate', handleGameUpdate);

      return () => {
        socket.off('connect', handleConnect);
        socket.off('connect_error', handleConnectError);
        socket.off('disconnect', handleDisconnect);
        socket.off('chatUpdate', handleChatUpdate);
        socket.off('userJoined', handleUserJoined);
        socket.off('gameUpdate', handleGameUpdate);
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
      {game && <Table
        user={user}
        players={game?.players}
      />}
      <LogoutButton
        onClick={signOut}
      />
    </div>
  );
};

Game.propTypes = {
  signOut: propTypes.func.isRequired,
  socket: propTypes.any.isRequired,
  user: propTypes.any.isRequired,
};

export default Game;
