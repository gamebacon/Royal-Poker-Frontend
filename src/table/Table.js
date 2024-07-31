import React from 'react'
import PropTypes from 'prop-types'
import PlayerPosition from './PlayerPosition'

const Table = props => {
  const playerId = props.user.uid;
  const playerIndex = props.players?.findIndex(player => player.id === playerId);
  const rotatedPlayers = [
    ...props.players?.slice(playerIndex),
    ...props.players?.slice(0, playerIndex)
  ];

  return (
    <div
        className='bg-tableGreen
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
         rounded-[350px] relative
         border-[60px]
         bg-gradient-to-tl from-green-900 to-green-1000
         border-black
        h-2/3
        w-4/5
         '
    >
        {rotatedPlayers?.map((player, index) => (
          <PlayerPosition
            key={index}
            seat={index}
            name={player.name}
            image={player.image}
          />
      ))}
    </div>
  )
}

Table.propTypes = {
  players: PropTypes.any,
}

export default Table
