import React from 'react'
import PropTypes from 'prop-types'

const Player = props => {
    const isUserPos = props.seat === 0;

  return (
    <div
        className={`absolute flex flex-col seat-${props.seat}
        justify-center items-center space-y-1`}
    >
        <img
            className={`rounded-full border-[3px] border-white p-1
                ${isUserPos ? 'size-20' : 'size-12'}`}
            alt='player-image'
            src={props.image}
        />
        <div
            className='flex flex-col justify-center text-center'
        >
            <label
                className='text-sx text-green-700'
            >
                <span
                    className='text-xs'
                >
                    $
                </span>
                <span
                    className='text-xs'
                >{props.money.toLocaleString()}</span>
            </label>
            <label
                className='text-white font-medium text-xs text-center'
            >{props.name}</label>
        </div>
    </div>
  )
}

Player.propTypes = {
    seat: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    money: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
}

export default Player
