import React from 'react'
import PropTypes from 'prop-types'

const PlayerPosition = props => {
    const isUserPos = props.seat === 0;

  return (
    <div
        className={`absolute flex flex-col seat-${props.seat}
        justify-center items-center space-y-2`}
    >
        <img
            className={`rounded-full border-[3px] border-white p-1
                ${isUserPos ? 'size-20' : 'size-12'}`}
            alt='player-image'
            src={props.image}
        />
        <label
            className='text-white font-medium text-xs text-center'
        >{props.name}</label>
    </div>
  )
}

PlayerPosition.propTypes = {
    seat: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
}

export default PlayerPosition
