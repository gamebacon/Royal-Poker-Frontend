// src/Game.js
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Chat from '../components/chat/Chat';
import LogoutButton from '../components/generic/LogoutButton';
import Table from '../components/table/Table';
import ActionPanel from '../components/table/interface/ActionPanel';
import soundService from '../util/SoundService';

const Game = ({ signOut, socket, user }) => {
  const [game, setGame] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(false);
  const [playerHand, setPlayerHand] = useState([]);

  const onAction = (action, amount = -1) => {
    socket.emit('makeMove', {
      action: action,
      amount: amount,
    })
    soundService.play(action);
  }


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

      const handleUserJoined = (user) => {
      };

      const handleGameUpdate = (gameUpdate) => {
        setGame(gameUpdate);
        setCurrentPlayer(gameUpdate.currentPlayerId === user.uid);
      };

      const handleGameStart = () => {
        console.log('game start!')
      };

      const handlePlayerHand = (hand) => {
        setPlayerHand(hand.cards);
      };

      socket.on('connect', handleConnect);
      socket.on('connect_error', handleConnectError);
      socket.on('disconnect', handleDisconnect);
      socket.on('userJoined', handleUserJoined);
      socket.on('gameStart', handleGameStart);
      socket.on('gameUpdate', handleGameUpdate);
      socket.on('playerHand', handlePlayerHand);

      return () => {
        socket.off('connect', handleConnect);
        socket.off('connect_error', handleConnectError);
        socket.off('disconnect', handleDisconnect);
        socket.off('userJoined', handleUserJoined);
        socket.off('gameUpdate', handleGameUpdate);
        socket.off('gameStart', handleGameStart);
        socket.off('playerHand', handlePlayerHand);
      };
    }
  }, [socket]);

  return (
    <div
      className='w-full h-full'
    >
      <Chat
        socket={socket}
      />
      {game && <Table
        user={user}
        players={game?.players}
        game={game}
        playerHand={playerHand}
        currentPlayerId={game.currentPlayerId}
      />}
      {currentPlayer && 
      <ActionPanel
        onAction={onAction}
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
