import React from 'react'
import PropTypes from 'prop-types'
import BlindChip from '../generic/chips/BlindChip';

const Player = props => {
    const isUserPos = props.seat === 0;
    const blindType = props.isBigBlind ? 'BIG' : props.isSmallBlind ? 'SMALL' : null;
  return (
    <div
        className={`absolute flex flex-col seat-${props.seat}
        justify-center items-center space-y-1 h-fit w-fit`}
    >
        <div
            className='relative'
        >
            <div
                className={`rounded-full border md:border-2 border-white overflow-hidden
                    ${isUserPos ? 'size-14 md:size-20' : 'size-10 md:size-14'}
                    `}
            >
                <img
                    className={`h-full w-full`}
                    alt='player-image'
                    src={props.image}
                />
            </div>
            {blindType && <BlindChip
                type={blindType}
            />}
        </div>
        <div
            className='flex flex-col justify-center text-center absolute -bottom-16'
        >
            <label
                className='text-white font-medium text-xs text-center whitespace-nowrap'
            >
                {props.name} - {props.seat}
            </label>
            <label
                className='text-sx text-white font-semibold'
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
        </div>
        <div
            className='absolute -top-10'
        >${props.currentBet.toLocaleString()}</div>
        <div>{props.action}</div>
    </div>
  )
}

Player.propTypes = {
    seat: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    money: PropTypes.number.isRequired,
    action: PropTypes.string.isRequired,
    currentBet: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    isSmallBlind: PropTypes.bool.isRequired,
    isBigBlind: PropTypes.bool.isRequired,
}

export default Player
