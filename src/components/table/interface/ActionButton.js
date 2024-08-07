import React from 'react'
import PropTypes from 'prop-types'

const ActionButton = props => {
  return (
    <button
        className='py-1 px-2 border rounded-full bg-primary border-secondary
        hover:opacity-70 transition-all'
        onClick={props.onClick}
    >
        <label
            className='uppercase font-semibold text-secondary'
        >
            {props.label}
        </label>
    </button>
  )
}

ActionButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default ActionButton
