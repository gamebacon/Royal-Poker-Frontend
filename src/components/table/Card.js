
import React from 'react'
import PropTypes from 'prop-types'

const Card = props => {
  return (
    <div
        className='w-8 h-16 bg-white rounded-lg border p-1 relative border-black'
    >
        <div
            className='absoltute top-0 left-0 flex justify-between w-fit text-xs'
        >
            <div>{props.suitSymbol}</div>
            <div>{props.valueSymbol}</div>
        </div>
    </div>
  )
}

Card.propTypes = {
    suit: PropTypes.string.isRequired,
    suitSymbol: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    valueSymbol: PropTypes.string.isRequired,
}

export default Card
