import React from 'react';
import PropTypes from 'prop-types';
import Player from './Player';

const generateMockedPlayers = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `mocked-${index}`,
    name: `Mock Player`,
    money: Math.floor(Math.random() * 1000), // Random money amount
    image: 'https://api.dicebear.com/9.x/adventurer/svg?seed=' + index // Placeholder image URL
  }));
};

const Table = (props) => {
  const playerId = props.user.uid;
  const playerIndex = props.players?.findIndex(player => player.id === playerId);

  const requiredMockPlayers = Math.max(0, 10 - props.players?.length || 0);
  const mockedPlayers = generateMockedPlayers(requiredMockPlayers);

  const rotatedPlayers = [
    ...props.players.slice(playerIndex),
    ...props.players.slice(0, playerIndex)
  ];

  const allPlayers = [
    ...rotatedPlayers,
    // ...mockedPlayers
  ];


  return (
    <div
      className='bg-tableGreen
        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        rounded-[350px] relative
        border-[50px]
        bg-gradient-to-tl from-green-700 to-green-800
        border-gray-900/80
        h-2/3
        w-4/5
      '
    >
      <div
        className='absolute'
      >
        ${props.game.pot.toLocaleString()}
      </div>
      {allPlayers?.map((player, index) => (
        <Player
          key={player.id}
          seat={index}
          name={player.name}
          money={player.money}
          image={player.image}
          action={player.action}
          currentBet={player.currentBet}
          isSmallBlind={props.game.blinds.small.playerId === player.id}
          isBigBlind={props.game.blinds.big.playerId === player.id}
          playerHand={props.playerHand}
          isCurrentPlayer={props.currentPlayerId === player.id}
        />
      ))}
    </div>
  );
};

Table.propTypes = {
  game: PropTypes.any,
  players: PropTypes.array,
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired
  }).isRequired,
  playerHand: PropTypes.array,
  currentPlayerId: PropTypes.string.isRequired,
};

export default Table;
